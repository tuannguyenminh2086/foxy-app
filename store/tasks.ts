import { defineStore } from "pinia";
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
    }
  },
  persist: true
})