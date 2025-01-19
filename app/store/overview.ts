import dayjs from "dayjs";
import _ from "lodash";
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
      start_date: dayjs().subtract(2,'day').format('YYYY-MM-DD'),
      end_date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
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
      const filteredData = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id));
      return filteredData.reduce((accumulator:number, currentValue:TaskReport) => accumulator + currentValue.total_spent, 0)
    },
    totalTimeSpentOnInternal: (state) => {
      const filteredData = state.raw_data.filter(item => state.excludedClientIds.includes(item.client_id));
      return filteredData.reduce((accumulator:number, currentValue:TaskReport) => accumulator + currentValue.total_spent, 0)
    },
    totalTimeSpentOnNonProjects: (state) => {
      const filteredData = state.raw_data.filter(item => !item.project || !item.client );
      return filteredData.reduce((accumulator:number, currentValue:TaskReport) => accumulator + currentValue.total_spent, 0)
    },
    topTenProjectByTimeSpent: (state) => {
      const filteredData = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id));
      // Group by project and calculate hours
      const projectSummary:ProjectSummary = {};

      filteredData.forEach(item => {
          const project_name = item.project ?? 'n/a';
          projectSummary[project_name] = {
            name: project_name,
            hours: 0
          };
          projectSummary[project_name].hours += item.total_spent;
        }
      )

      // Transform into two arrays
      const transformedData: ProjectSummaryItem[] = []

      //Sort by hours before splitting into arrays
      Object.values(projectSummary)
          .sort((a:ProjectSummaryItem, b:ProjectSummaryItem) => b.hours - a.hours)
          .forEach(project => {
            transformedData.push({ name: project.name, hours: Number(project.hours.toFixed(2))} );
          });
      return transformedData;
    },
    projectsAnalysis: (state) => {
      const filteredData = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id));
      const projectAnalysis = _(filteredData).groupBy('project')
      .map((tasks, project) => ({
        project,
        pid: tasks[0]?.project_id,
        client: tasks[0]?.client ?? 'n/a',
        totalHours: Number((_.sumBy(tasks, 'total_spent'))), // converted to hours
        memberCount: _.uniqBy(tasks, 'member').length,
        taskCount: tasks.length,
        averageTaskDuration: Number((_.meanBy(tasks, 'total_spent'))),
        // startDate: _.minBy(tasks, '_date')?.due_date,
        // endDate: _.maxBy(tasks, 'due_date')?.due_date
      }))
      .orderBy(['totalHours'], ['desc'])
      .value()

      // console.log(projectAnalysis)


      return {
        projects: projectAnalysis,
        summary: {
          totalProjects: projectAnalysis.length,
          totalHours: _.sumBy(projectAnalysis, 'totalHours'),
          averageProjectDuration: _.meanBy(projectAnalysis, 'totalHours'),
          largestProjects: projectAnalysis.slice(0, 5) // get 5 projects
        }
      }
    },
    memberPickedList: (state) => {
      const membersList = useMembersStore();
      return membersList.members.filter(member => state.selected_members.includes(member.id));
    }
  },
  actions: {
    async initialize () {
      this.start_date = dayjs().subtract(2,'day').format('YYYY-MM-DD');
      this.end_date = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
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
      const {data, status } = await useFetch('/api/reports/tracking', {
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
      
    }
  },

  persist: true
})