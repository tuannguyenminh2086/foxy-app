import { defineStore } from "pinia";
import type { User } from "~/lib/zod/user";
import type { IResponse } from "~~/types/common";

interface MembersState {
  members: User[];
}


export const useMembersStore = defineStore('members', {
  state:():MembersState => {
    return {
      members: []
    }
  },
  getters: {
    getAllMembers: (state) => state.members,
  },
  actions: {
    async fetchAll () {
      const { data } = await useFetch('/api/members/list');
      if(data.value) {
        const response:IResponse<User> = data.value;
        if (response.data) {
          const _payload = Array.isArray(response.data) ? response.data : [];
          this.members = _payload ?? [];
        }
      }
    },
  },

  persist: true
})