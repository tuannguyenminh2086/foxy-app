import { defineStore } from "pinia";

export const useProjectsStore = defineStore('projects', {
  state: () => {
    return {
      projects: []
    }
  },
  persist: true
})