import dayjs from "dayjs";
import _ from "lodash";
import { defineStore } from "pinia";
import { useMembersStore } from './members'
import type { IResponse } from "~~/types/common";
import type { TaskReport } from "~/lib/zod/report";
import type { ProjectSummary, ProjectSummaryItem } from "~/lib/types";
import type { DueStatus } from "~~/types/tasks";

interface OverviewState {
  selected_members: number[],
  start_date: string;
  end_date: string;
  raw_data: TaskReport[],
  excludedClientIds: number[],
  isLoading: boolean,
  error: string | null;
}


export const useOverviewStore = defineStore('overview', {
  state:():OverviewState => {
    return {
      excludedClientIds: [152, 2],
      start_date: dayjs().subtract(6,'day').format('YYYY-MM-DD'),
      end_date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      selected_members: [],
      raw_data: [],
      isLoading: false,
      error: null
    }
  },
  getters: {
    memberPickedList: (state) => {
      const membersList = useMembersStore();
      return membersList.members.filter(member => state.selected_members.includes(member.id));
    },
    filteredClientData(state): TaskReport[] {
      return state.raw_data.filter(item => !this.excludedClientIds.includes(item.client_id));
    },
    filteredInternalData(): TaskReport[] {
      return this.raw_data.filter(item => this.excludedClientIds.includes(item.client_id));
    },
    totalTimeSpent: (state) => {
      return state.raw_data.reduce((accumulator:number, currentValue:TaskReport) => accumulator + currentValue.total_spent, 0)
    },
    getRawData: (state) =>{
      return state.raw_data;
    },
    totalTimeSpentOnClient(state) {
      return _.sumBy(state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id)), 'total_spent');
    },
    totalTimeSpentOnInternal (state) {
      return _.sumBy(state.raw_data.filter(item => state.excludedClientIds.includes(item.client_id)), 'total_spent');
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
            pid: item.project_id,
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
      }))
      .orderBy(['totalHours'], ['desc'])
      .value()
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
    teamWorkloadAnalysis: (state) => {
      const filteredData = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id));

      const teamAnalysis = _(filteredData).groupBy('member')
      .map((tasks, member) => ({
        member,
        totalHours: Number((_.sumBy(tasks, 'total_spent') / 3600).toFixed(2)),
        projectCount: _.uniqBy(tasks, 'project').length,
        projects: _.uniqBy(tasks, 'project').map(t => t.project),
        taskCount: tasks.length,
        averageTaskDuration: Number((_.meanBy(tasks, 'total_spent') / 3600).toFixed(2)),
        activeProjects: _.uniqBy(
          tasks.filter(t => t.state < 5),
          'project'
        ).length
      }))
      .orderBy(['totalHours'], ['desc'])
      .value()

      return {
        members: teamAnalysis,
        summary: {
          totalMembers: teamAnalysis.length,
          averageProjectsPerMember: _.meanBy(teamAnalysis, 'projectCount'),
          mostDiverseMembers: _.orderBy(teamAnalysis, ['projectCount'], ['desc']).slice(0, 5),
          mostFocusedMembers: _.orderBy(teamAnalysis, ['projectCount'], ['asc']).slice(0, 5)
        }
      };

    },
   
    // Team Overview
    taskStateAnalysis (state) {      
      const filteredTasks = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id));
      const stateStats: { [key: number]: { count: number; totalSpent: number; tasks: TaskReport[] } } = {};

      filteredTasks.forEach(task => {

        if (!stateStats[task.state]) {
          stateStats[task.state] = {
            count: 0,
            totalSpent: 0,
            tasks: []
          };
        }

        stateStats[task.state]!.count++;
        stateStats[task.state]!.totalSpent += task.total_spent;
        stateStats[task.state]!.tasks.push(task);
      });

      // Calculate percentages and averages
      const totalTasks = filteredTasks.length;
      const stateResults = Object.entries(stateStats).map(([state, stats]) => ({
        state: parseInt(state),
        count: stats.count,
        percentage: (stats.count / totalTasks * 100).toFixed(1),
        avgTimeSpent: (stats.totalSpent / stats.count)
      }));

      // Calculate overall productivity stats
      const totalTimeSpent = filteredTasks.reduce((sum, task) => sum + task.total_spent, 0);
      const totalEstTime = filteredTasks.reduce((sum, task) => sum + (task.est_time || 0), 0);
      const completedTasks = filteredTasks.filter(task => task.state === 5).length;

      const productivityStats = {
        avgTimePerTask: (totalTimeSpent / totalTasks),
        completionRate: ((completedTasks / totalTasks) * 100).toFixed(1),
        timeEfficiency: totalEstTime ? ((totalTimeSpent / totalEstTime) * 100).toFixed(1) : 'N/A'
      };

      const stateNames = {
        1: 'New',
        2: 'In Progress',
        3: 'Review',
        4: 'Testing',
        5: 'Completed'
      };

      return {
        stateResults: stateResults.map(state => ({
          ...state,
          name: stateNames[state.state as keyof typeof stateNames]
        })),
        productivityStats
      };
    },
    dueDateAnalysis (state) {
      const now = new Date();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const filteredTasks = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id) && item.state !== 5).map(task => ({
          task_id: task.task_id,
          task: task.task,
          state: task.state,
          est_time: task.est_time,
          client_id: task.client_id,
          client: task.client,
          total_spent: task.total_spent,
          member: task.member,
          due_date: task.due_date
        }));

        return filteredTasks.reduce((acc: DueStatus, task) => {
          if (!task.due_date) {
            acc.incoming.push(task);
            return acc;
          }
    
          const dueDate = new Date(task.due_date);
          const timeRemaining = dueDate.getTime() - now.getTime();
    
          if (timeRemaining < 0) {
            acc.overdue.push(task);
          } else if (timeRemaining <= oneWeek) {
            acc.dueSoon.push(task);
          } else {
            acc.incoming.push(task);
          }
    
          return acc;
        }, { overdue: [], dueSoon: [], incoming: [] });

    },
    calculateTeamEfficiency(state)  {
      const filteredTasks = state.raw_data.filter(item => !state.excludedClientIds.includes(item.client_id));
      const completedTasks = filteredTasks.filter(task => task.state === 4 || task.state === 5);
      const tasksWithEstimates = filteredTasks.filter(task => task.est_time > 0);

      return {
        completionRate: completedTasks.length / filteredTasks.length,
        estimateAccuracy: tasksWithEstimates.length > 0 
          ? _.meanBy(tasksWithEstimates, task => 
              Math.abs(1 - (task.total_spent / task.est_time))) : 0,
        averageCycleTime: completedTasks.length > 0 ? ((_.meanBy(completedTasks, 'total_spent') / 3600) * 100).toFixed(1): 0,
        throughput: completedTasks.length / 
          (filteredTasks && filteredTasks.length > 0 && filteredTasks[0] && filteredTasks[0].due_date ? Math.ceil((new Date().getTime() - new Date(filteredTasks[0].due_date).getTime()) / (1000 * 60 * 60 * 24)) : 1)
      };
    },
    teamAnalysis (state) {
        
        const groupedByMember = _.groupBy(state.raw_data, 'member');
        const userStats = _.map(groupedByMember, (tasks, member) => {
          const uniqueProjects = _.uniqBy(tasks, 'project_id').length;
          const totalSpent = _.sumBy(tasks, 'total_spent');
          
          const clientTasks = tasks.filter(t => t.project_id && t.client_id && !state.excludedClientIds.includes(t.client_id));
          const internalTasks = tasks.filter(t => state.excludedClientIds.includes(t.client_id));
          const nonProjectTasks = tasks.filter(t => !t.project_id || !t.client_id);
          
          return {
            name: member,
            taskCount: tasks.length,
            projectCount: uniqueProjects,
            totalTimeSpent: totalSpent,
            clientTimeSpent: _.sumBy(clientTasks, 'total_spent'),
            nonProjectTimeSpent: _.sumBy(nonProjectTasks, 'total_spent'),
            internalTimeSpent: _.sumBy(internalTasks, 'total_spent')
          };
        });



      return userStats;
    }
  },

  actions: {
    async initialize () {
      this.start_date = dayjs().subtract(6,'day').format('YYYY-MM-DD');
      this.end_date = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

      const req = await $fetch('/api/members/list');
      if (req && req.status == 'success') {
        if ('data' in req) {
          const response = req;
          const _payload = Array.isArray(response.data) ? response.data : [];
          this.selected_members = _payload ? _payload.map(item => item.id) : [];
        }
      }

    },
    pickMember (ids: Array<number>) {
      this.selected_members = [...ids];
    },
    pickDate (start: string, end: string) {
      this.start_date = dayjs(start).format('YYYY-MM-DD');
      this.end_date = dayjs(end).format('YYYY-MM-DD')
    },
    async fetch (params:any) {
      const ret = await $fetch('/api/reports/tracking', {
        method: 'POST',
        body: {
          start_date: this.start_date,
          end_date: this.end_date,
          assignee_ids: [...this.selected_members],
          ...params
        }
      })
    
      if (ret && ret.status == 'success') {
        if ('data' in ret) {
          const response:IResponse<Array<TaskReport>> = ret;
          this.raw_data = response.data ?? [];
        }
        
      }
      
    },
  },  

  persist: {
    pick: ['selected_members', 'start_date', 'end_date', 'excludedClientIds']
  }

})