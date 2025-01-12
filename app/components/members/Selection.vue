<template>
  <div>
    <select class="border rounded-sm">
        <option value="-1">All members</option>
        <option v-for="member in members" :value="member.id">
          {{ member.first_name }} {{ member.last_name }}
        </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useMembersStore } from '~/store/members';

  const membersStore = useMembersStore();
  const { members } = storeToRefs(membersStore)
</script>