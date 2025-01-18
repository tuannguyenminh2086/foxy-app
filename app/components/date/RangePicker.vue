<script setup lang="ts">
import type { DateRange } from 'radix-vue'
import { cn } from '@/lib/utils'
import { today, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type Ref, ref } from 'vue'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})
const emit = defineEmits(['selectDate'])
const currentDate = today(getLocalTimeZone())
const value = ref({
  start: currentDate.add({ days: -2 }),
  end: currentDate.add({ days: -1 }),
}) as Ref<DateRange>


watch(value, (newVal) => {
  // emit data
  if (newVal.start && newVal.end) {
    emit('selectDate', { 
      start: df.format(newVal.start.toDate(getLocalTimeZone())) ,
      end: df.format(newVal.end.toDate(getLocalTimeZone())), 
    })
  }

})

</script>

<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :variant="'outline'"
          :class="cn(
            'w-[300px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />

          <template v-if="value.start">
            <template v-if="value.end">
              {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{ df.format(value.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(value.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else>
            Pick a date
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="end">
        <RangeCalendar
          v-model="value"
          weekday-format="short"
          :number-of-months="2"
          initial-focus
          :placeholder="value.start"
          @update:start-value="(startDate) => value.start = startDate"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>