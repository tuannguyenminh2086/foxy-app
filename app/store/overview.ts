import dayjs from "dayjs";
import { defineStore } from "pinia";
import { useMembersStore } from './members'
import type { IResponse } from "~~/types/common";
import type { TaskReport } from "~/lib/zod/report";
import type { ProjectSummary, ProjectSummaryItem } from "~/lib/types";

interface OverviewState {
  selected_members: number[],
  start_date: string;
  end_date: string;
  raw_data: TaskReport[],
  excludedClientIds: number[]
}


export const useOverviewStore = defineStore('overview', {
  state:():OverviewState => {
    return {
      excludedClientIds: [152, 2],
      start_date: '',
      end_date: '',
      selected_members: [],
      raw_data: []
    }
  },
  getters: {
    totalTimeSpent: (state) => {
      return state.raw_data.reduce((accumulator:number, currentValue:TaskReport) => accumulator + currentValue.total_spent, 0)
    },
    getRawData: (state) =>{
      return state.raw_data;
    },
    totalTimeSpentOnClient: (state) => {
      const filtered = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id));
      return filtered.reduce((accumulator:number, currentValue:TaskReport) => accumulator + currentValue.total_spent, 0)
    },
    totalTimeSpentOnInternal: (state) => {
      const filtered = state.raw_data.filter(item => state.excludedClientIds.includes(item.client_id));
      return filtered.reduce((accumulator:number, currentValue:TaskReport) => accumulator + currentValue.total_spent, 0)
    },
    totalTimeSpentOnNonProjects: (state) => {
      const filtered = state.raw_data.filter(item => !item.project || !item.client );
      return filtered.reduce((accumulator:number, currentValue:TaskReport) => accumulator + currentValue.total_spent, 0)
    },
    topTenProjectByTimeSpent: (state) => {
      const filtered = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id));
      
      // Group by project and calculate hours
      const projectSummary:ProjectSummary = {};
      filtered.forEach(item => {
          const project_name = item.project ?? 'n/a';
          projectSummary[project_name] = {
            name: project_name,
            hours: 0
          };

          projectSummary[project_name].hours += item.total_spent / 3600;
        }
      )

      console.log(projectSummary);

      // Transform into two arrays
      const transformedData: ProjectSummaryItem[] = []

        //Sort by hours before splitting into arrays
      Object.values(projectSummary)
          .sort((a:ProjectSummaryItem, b:ProjectSummaryItem) => b.hours - a.hours)
          .forEach(project => {
            transformedData.push({ name: project.name, hours: Number(project.hours.toFixed(2))} );
          });

      return transformedData;
    }
  },
  actions: {
    async initialize () {
      this.start_date = dayjs().add(-2,'day').format('YYYY-MM-DD');
      this.end_date = dayjs().add(-1,'day').format('YYYY-MM-DD');
      const membersList = useMembersStore();
      this.selected_members = membersList.members.map(member => (member.id));
    },
    pickMember (ids: Array<number>) {
      this.selected_members = [...ids];
    },
    pickDate (start: string, end: string) {
      this.start_date = dayjs(start).format('YYYY-MM-DD');
      this.end_date = dayjs(end).format('YYYY-MM-DD')
    },
    async fetch (params:any) {

      const { data ,status} = await useFetch('/api/reports/tracking', {
        method: 'POST',
        body: {
          start_date: this.start_date,
          end_date: this.end_date,
          assignee_ids: [...this.selected_members],
          ...params
        }
      })

      if (status.value == 'success') {
        if(data.value) {
          const response:IResponse<Array<TaskReport>> = data.value;
          this.raw_data = response.data ?? [];
        }
        
      }
      // console.log(data, 'data');
    }
  },

  persist: true
})