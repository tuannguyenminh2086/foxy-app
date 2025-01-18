import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticated: false,
      user: null,
      token: ''
    }
  },
  actions: {
    async setToken (token:string) {
      this.token = token
    }
  },
  persist: true
})