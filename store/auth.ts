import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticated: false,
      user: null
    }
  },
  persist: true
})