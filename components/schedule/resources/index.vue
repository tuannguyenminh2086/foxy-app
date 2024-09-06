<template>
  <div>
    <div v-vis-timeline="{ options, groups, items }" class="box-border w-full h-full"></div>
  </div>
</template>

<script setup>
import { useMemberStore } from '~/store/member';

// TODO
// planning the resources with tasks and member
// a data table between tasks and member with start and end date.
const options = ref({
  // Your timeline options here
  start: new Date(),
  orientation: "top",
  editable: true,
  groupEditable: true,
})

// const groups = ref([
//   // Your groups data here
//   { id:0, content: "Group 1" },
//   { id:1, content: "Group 2" },
//   { id:2, content: "Group 3" },
//   { id:3, content: "Group 4" },
//   { id:4, content: "Group 5" }
// ])

const groups = ref([])

const items = ref([
  // Your items data here
  {id: 1, content: "Item 1", start: new Date("2024-09-03") , end: new Date("2024-09-10"), group: 1, className: "touringcar",},
  {id: 2, content: "item 2", start: new Date("2024-09-03"), group: 2},
  {id: 3, content: "item 3", start: new Date("2024-09-04"), group: 1},
  {id: 4, content: "item 4", start: new Date("2024-09-05"), group: 0},
  {id: 5, content: "item 5", start: new Date("2024-09-02"), group: 4}
])

const membersStore = useMemberStore()
const { members } = storeToRefs(membersStore);


members.value.forEach(member => {
  let group = {}
  group.id= member.id
  group.content = "<div><img src='" + member.avatar+"' alt='' width='60em' /></div> <h4>" +member.first_name + ' ' + member.last_name+ "</h4> ";
  group.title = member.first_name + ' ' + member.last_name ;

  groups.value.push(group);
})


</script>

<style lang="scss" scoped>

</style>