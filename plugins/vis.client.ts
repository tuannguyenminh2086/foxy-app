import { Timeline } from "vis-timeline/standalone";
import 'vis-timeline/styles/vis-timeline-graph2d.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('vis-timeline', {
    mounted(el, binding) {
      const { options, groups, items } = binding.value
      new Timeline(el, items, groups, options)
      
    },
    updated(el, binding) {
      const { options, groups, items } = binding.value
      el._timeline.setOptions(options)
      el._timeline.setGroups(groups)
      el._timeline.setItems(items)
    },
    unmounted(el) {
      if (el._timeline) {
        el._timeline.destroy()
      }
    }
  })
})