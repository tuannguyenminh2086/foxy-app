import { defineStore } from "pinia";
import type { ITask } from "~/types/tasks";

interface TasksState {
  tasks: ITask[];
  overdue: ITask[];
  doing: ITask[];
  currentTask: any;
  isTracking: boolean;
}

export const useTasksStore = defineStore('tasks', {
  state: ():TasksState => {
    return {
      tasks: [],
      overdue: [],
      doing: [],
      currentTask: null,
      isTracking: false
    }
  },
  actions: {
    async fetchTasks () {
      const tasks = await $fetch('/api/tasks/list')
      console.log(tasks)
    }
  },
  persist: true
})