import { DataSet, Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("vis-timeline", {
    mounted(el, binding) {
      const { options, groups, items, events } = binding.value;
      const timeline = new Timeline(
        el,
        new DataSet(items),
        new DataSet(groups),
        options,
      );
      el.timeline = timeline;

      if (events) {
        Object.entries(events).forEach(([eventName, handler]) => {
          //@ts-ignore
          timeline.on(eventName, handler);
        });
      }
    },
    updated(el, binding) {
      console.log("updated");

      const { options, groups, items, events } = binding.value;
      el.timeline.setOptions(options);
      el.timeline.setGroups(groups);
      el.timeline.setItems(items);

      if (events) {
        Object.entries(events).forEach(([eventName, handler]) => {
          el.timeline.off(eventName); // Remove old handler
          el.timeline.on(eventName, handler); // Add new handler
        });
      }
    },
    unmounted(el) {
      if (el.timeline) {
        el.timeline.destroy();
      }
    },
  });
});
