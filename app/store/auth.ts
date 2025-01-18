import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticated: false,
      user: null,
      permissions: [] as Array<string>
    }
  },
  getters: {

  },
  actions: {
    async setPermissions (payload: Array<string>) {
      this.permissions = payload
    },
    async setAuth (payload: boolean) {
      this.authenticated = payload
    }
  },
  persist: true
})