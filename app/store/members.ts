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
    },
    getMembers:(state) => {
      return [...state.members]
    }
  },
  actions: {
    async fetchAll () {
      const req = await $fetch('/api/members/list');

     
      if (req && req.status == 'success') {
        if ('data' in req) {
          const response = req;
          const _payload = Array.isArray(response.data) ? response.data : [];
          this.members = _payload ? _payload.map(item => ({
            ...item,
            name: `${item.first_name} ${item.last_name}`
          })) : [];
        }
      }
    },
  },

  persist: true
})