import { useMemberStore, type TMember } from "./member";
import type { IResponse } from "~/types/common";
interface TimelineItem {
  start: string;
  end?: string;
  content: string;
  id: string;
  iid: string;
  group?: string;
  className?: string;
  title?: string;
}

interface TimelineGroup {
  content: string;
  id: string;
  title: string;
}


export const useSchedulerStore = defineStore('scheduler',{
  state: () => {
    return {
      resources_items: [] as TimelineItem[],
      resources_groups: [] as TimelineGroup[],
      projects_items: [] as TimelineItem[],
      projects_groups: [] as TimelineGroup[]
    }
  },
  getters: {
    workingGroups: (state) => {
      return state.resources_groups
    },
    workingItems: (state) => {
      return state.resources_items
    }
  },
  actions: {
    async fetchResourcesItems () {
      const { data } = await useFetch('/api/scheduler/resource', {
        method: 'GET',
      });

      if (data.value) {
        const response:IResponse<Array<TimelineItem>> = data.value as IResponse<Array<TimelineItem>>;
        const _data = response.data
      
        if (_data) {
          _data.forEach((item:TimelineItem) => {

            const _item = Object.assign({},{
              ...item,
              id: item.iid
            })

            const exist = this.resources_items.findIndex(item => item.id === _item.id.toString())
            if (exist === -1) {
              this.resources_items.push(_item)
            }
          })
        }
      }

    },
    async addResourceItem (item:TimelineItem) {
      try {
        const { data } = await useFetch('/api/scheduler/resource', {
          method: 'POST',
          body: JSON.stringify(item)
        });
  
        if (data.value) {
          const response:IResponse<TimelineItem> = data.value as IResponse<TimelineItem>;
          const _data = response.data
          return { successful: true,  data:Object.assign({},_data)} 
        }

      } catch (error) {
        return { successful: false}
      }
      
    },
    async getResourcesGroup () {
      const membersStore = useMemberStore()
      const { members } = storeToRefs(membersStore);

      members.value.forEach((member:TMember) => {
        let group:TimelineGroup = {} as TimelineGroup
          group.id= member.id.toString()
          group.content = "<div data-item='group'><img src='" + member.avatar+"' alt='' width='60em' /></div> <h4>" +member.first_name + ' ' + member.last_name+ "</h4> ";
          group.title = member.first_name + ' ' + member.last_name ;


        const exist = this.resources_groups.findIndex(item => item.id === member.id.toString())
        if (exist === -1) {
          this.resources_groups.push(group);
        }

        
      })
    },
    async intResources () {
      this.fetchResourcesItems()
    }
  },
  persist: true 
}
)