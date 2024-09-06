
<template>
  <div ref="timelineContainer"></div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
// import { Timeline } from 'vis-timeline/standalone'
// import { DataSet } from 'vis-data'

// const timelineContainer = ref(null)

// onMounted(() => {
//     // Create a DataSet (allows two-way data-binding)
//     const items = new DataSet([
//       {id: 1, content: "Item 1", start: "2024–04–01 10:00:00", end: "2024–04–01 11:00:00", group: 1},
//       {id: 2, content: "item 2", start: "2024–04–01 09:00:00", end: "2024–04–01 10:00:00", group: 0},
//       {id: 3, content: "item 3", start: "2024–04–03 08:00:00", end: "2024–04–03 10:00:00", group: 1}
//     ])

//     const groups = new DataSet([
//       { id: 0, content: "Group 1" },
//       { id: 1, content: "Group 2" }
//     ])

//     // Configuration for the Timeline
//     const options = {
//       // Add any timeline options here
//       orientation: "top",
//       itemsAlwaysDraggable:true,
//       timeAxis: {scale: "hour", step: 1, },
//       zoomMax: 150000000, //for days 7 instead of 6?
//       minHeight:"500px",
//       editable: {
//         add: true, // add new items by double tapping
//         updateTime: true, // drag items horizontally
//         updateGroup: true, // drag items from one group to another
//         remove: true, // delete an item by tapping the delete button top right
//         overrideItems: false // allow these options to override item.editable
//       }
//     }

//     // Create a Timeline
//     new Timeline(timelineContainer.value, items, options)
  
// })
</script>

<style>
/* @import 'vis-timeline/styles/vis-timeline-graph2d.css'; */
</style>