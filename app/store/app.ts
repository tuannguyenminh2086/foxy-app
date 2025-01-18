export const useAppStore = defineStore('appStore', {
    state: () => {
      return {
        isSidebarOpen: false
      }
    },
    actions: {
      toggleSidebar () {
        this.isSidebarOpen = !this.isSidebarOpen
      },
      closeSidebar () {
        this.isSidebarOpen = false
      }
    }
})