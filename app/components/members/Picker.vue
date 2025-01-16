<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        <Users class="mr-1 h-4 w-4 shrink-0 opacity-50" />
        {{ selectedNumbers.length > 0 ?  selectedNumbers.includes(-1) ? "All members":  selectedNumbers.length + "&nbsp;member(s)"  : "Pick member(s)" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[544px] p-0">
      <Command v-model="value">
        <CommandInput placeholder="Search member" />
        <CommandEmpty>No member found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="(member, key) in allMembers"
              :key="key"
              :value="member.name"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                  handleSelectMember(member.id);
                }
                open = false
              }"
            >
              <Check
                :class="cn(
                  'mr-2 h-4 w-4',
                  selectedNumbers.includes(member.id) ? 'opacity-100' : 'opacity-0',
                )"
              />
              {{ member.name }} 
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
  import { useMembersStore } from '~/store/members';
  import { cn } from '@/lib/utils'
  import { Check, Users } from 'lucide-vue-next'

  const membersStore = useMembersStore();
  const emit = defineEmits(['selectMembers'])

  const allMembers = computed(() => membersStore.getAllMembers)

  const open = ref(false)
  const value = ref('') 
  const selectedNumbers = ref([-1])

  const handleSelectMember = (id:number) => {

    if (id === -1 ) {
      selectedNumbers.value = [-1];
      emit('selectMembers',[-1]);
      return;
    } 
    // If -1 exists in array, remove it first
    if (selectedNumbers.value.includes(-1)) {
      selectedNumbers.value = []
    }

    // Check if value exists in array
    const index = selectedNumbers.value.indexOf(id)

    if (index === -1) {
    // Value doesn't exist, add it
      selectedNumbers.value = [...selectedNumbers.value, id]
    } else {
      // Value exists, remove it
      selectedNumbers.value = selectedNumbers.value.filter(num => num !== id)
    }

    emit('selectMembers',toRaw(selectedNumbers.value));
  }

</script>