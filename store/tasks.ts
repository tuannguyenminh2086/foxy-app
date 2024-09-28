import { defineStore } from "pinia";
import dayjs from 'dayjs';
import type { ITask } from "~/types/tasks";

interface TasksState {
  tasks: ITask[];
  currentTask: any;
  isTracking: boolean;
}

interface IResponse {
  status: string,
  data?: any
}


export const useTasksStore = defineStore('tasks', {
  state: ():TasksState => {
    return {
      tasks: [],
      currentTask: null,
      isTracking: false
    }
  },
  getters: {
    tasksInProgress: (state) => state.tasks.filter(item => item.state === 2),
    tasksTodo:(state) => state.tasks.filter(item => item.state === 1),
    tasksDueDate: (state) => state.tasks.filter(item => {
      if(item.due_date && item.state !== 3 && item.state !== 4 ) {
        const _duedate = dayjs(item.due_date);
        const today = dayjs();
        const diff = _duedate.diff(today, 'day');
        // console.log(diff, 'diff');
        // console.log(today);
        if (diff >= 0) {
          return item
        }
      }
    })
  },
  actions: {
    async fetchTasks () {
      const { data } = await useFetch('/api/tasks/list')
      if(data.value) {
        const response:IResponse = data.value  as IResponse;
        const _tasks = response.data
      
        if (_tasks) {
          let _payload:ITask[] = Object.values(_tasks)
          // assign tasks
          this.tasks = _payload ?? [];
        }

      }
    },
    async updateTask (tid:number, payload: any) {
      const data = await $fetch('/api/tasks/update', {
        method: 'post',
        body: {
          tid,
          payload
        }
      })

      if(data?.status == 'success') {
        await this.fetchTasks()
      }
    }
  },
  persist: true
})