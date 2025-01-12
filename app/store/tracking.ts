import { defineStore } from "pinia";
import type { IResponse } from "~~/types/common";
import type { ITrackingTask } from "~~/types/tasks";


export const useTrackingStore = defineStore('tracking', {
  state: () => {
    return {
      currentTask: null as ITrackingTask | null,
      counter: 0,
    }
  },
  getters: {
    isTracking: (state) => {
      if (state.currentTask) {
        return Object.keys(state.currentTask).length > 0 ? true : false
      }
      return false
    }
  },
  actions: {
    async fetchCurrentTracking () {
      const { data } = await useFetch('/api/tracking/current', {
        query: {
          isWorking: true
        }
      })
      
      if(data.value) {
        const response: IResponse<ITrackingTask> = data.value as IResponse<ITrackingTask>
        if (response.data) {
          this.currentTask = response.data ? Object.assign({}, response.data): null
        }
      }

    }
  },
  persist: true
})