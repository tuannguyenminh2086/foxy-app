import { defineStore } from "pinia";
import type { User } from "~/lib/zod/user";
import type { IResponse } from "~~/types/common";

interface MembersState {
  members: User[];
}

interface AllMember {
  id: number
  name: string
}


export const useMembersStore = defineStore('members', {
  state:():MembersState => {
    return {
      members: []
    }
  },
  getters: {
    getAllMembers: (state) => {
      const allMemberItem:AllMember = {
        name: 'All members',
        id: -1
      }
      const simplifiedMembers = state.members.map(member => ({
        id: member.id,
        name: member.first_name + ' ' + member.last_name
      }));
      return [allMemberItem, ...simplifiedMembers];
    }
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