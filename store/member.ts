import { defineStore } from "pinia";
import type { IResponse } from "~/types/common";
import type { IUser } from "~/types/tasks";

export type TMember = Pick<IUser, "id"| "last_name" |"first_name"|"avatar" > 

export const useMemberStore = defineStore('member', {
  state: () => {
    return {
      members: []
    }
  },
  actions: {
    async fetchMembers () {
      const { data } = await useFetch('/api/members');

      if(data.value) {
        const response:IResponse<TMember> = data.value as IResponse<TMember>;
        const _data = response.data
      
        if (_data) {
          let _payload:any = Object.values(_data)
          // assign
          this.members = _payload ?? [];
        }

      }
    }
  },
  persist: true
})