<template>
  <div class="space-y-5">
    <div class="flex justify-end">
      <Button @click="openDialog">
        <PlusIcon class="w-4 h-4 mr-2 fill-white" />New Item
      </Button>
    </div>
    <div
      v-if="items.length > 0"
      v-vis-timeline="{ options, groups, items, events }"
      class="box-border w-full h-full bg-white dark:bg-black"
    ></div>

    <Dialog :open="isOpen" @update:open="closeDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Item</DialogTitle>
          <DialogDescription>Dialog content goes here.</DialogDescription>
        </DialogHeader>
        <!-- Add more content as needed -->
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { PlusIcon } from "@radix-icons/vue";
import { useSchedulerStore } from "~/store/schedulers";
const schedulerStore = useSchedulerStore();
const { resources_items, resources_groups } = storeToRefs(schedulerStore);

const items = computed(() => resources_items.value);
const groups = computed(() => resources_groups.value);
const isOpen = ref(false);

const openDialog = () => {
  isOpen.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
};

const options = ref({
  // Your timeline options here
  start: new Date(),
  orientation: "top",
  clickToUse: true,
  editable: true,
  timeAxis: { scale: "day", step: 1 },
  zoomMin: 1000 * 60 * 60 * 24 * 7, // Set minimum zoom to one week
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 1, // Set maximum zoom to about 3 months
  onAdd: async (item, callback) => {
    item.content = prompt("Edit items text:", item.content);

    if (item.content != null) {
      const rs = await schedulerStore.addResourceItem(item);
      if (rs.successful) {
        callback(item); // Confirm the addition
      }
    } else {
      callback(null); // cancel updating the item
    }
  },
  onUpdate: (item, callback) => {
    console.log("Item being updated:", item);
    // You can modify the item here before it's updated
    callback(item); // Confirm the update
  },
  onMove: (item, callback) => {
    console.log("Item being moved:", item);
    // You can modify the item here before it's moved
    callback(item); // Confirm the move
  },
  onRemove: (item, callback) => {
    console.log("Item being removed:", item);
    // You can perform any necessary cleanup here
    callback(item); // Confirm the removal
  },
  onMoving: (item, callback) => {
    console.log("Item is moving:", item);
    // You can validate the move here
    callback(item); // Allow the move
    // callback(null) // To cancel the move
  },
});

const events = {
  select: (properties) => {
    console.log("Selected items:", properties.items);
  },
};
</script>

<style lang="scss" scoped></style>
