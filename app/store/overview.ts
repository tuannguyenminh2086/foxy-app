import dayjs from "dayjs";
import { defineStore } from "pinia";
import type { IResponse } from "~~/types/common";

interface OverviewState {
  selectedMembers: number[],
  start_date: string;
  end_date: string;
  data: any[]
}

export const useOverviewStore = defineStore('overview', {
  state:():OverviewState => {
    return {
      start_date: '',
      end_date: '',
      selectedMembers: [-1],
      data: []
    }
  },
  getters: {

  },
  actions: {
    async initialize () {
      console.log('ad')
    }
  },

  persist: true
})