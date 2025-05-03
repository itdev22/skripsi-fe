<script setup lang="ts">
import { defaultAreaData, type Area } from "./area.model";
import AddAreaFrom from "./AddAreaForm.vue";
const area: Area[] = defaultAreaData;

const columns = [
  {
    key: "areaName",
    label: "Area",
  },
  {
    key: "actions",
    label: "Manage",
  },
];

const page = ref(1);
const pageCount = 5;

const q = ref("");

let areaData = area;

const filteredRows = computed(() => {
  if (!q.value) {
    areaData = area;
    return area.slice((page.value - 1) * pageCount, page.value * pageCount);
  }

  const newData = area.filter((oneArea) => {
    return Object.values(oneArea).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
  areaData = newData;
  return newData.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const isOpen = ref(false);

</script>

<template>
  <div class="flex gap-2">
    <UButton
      icon="fa-plus"
      color="blue"
      label="Add New Area"
      @click="isOpen = true"
    />
    <UButton
      icon="fa-download"
      color="blue"
      label="Reorder"
    />
  </div>
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" placeholder="Filter Area..." />
  </div>

  <UTable :rows="filteredRows" :columns="columns">
    <template #actions-data="{ row }">
      <div class="flex gap-2">
        <UButton
          icon="fa-bars"
          color="blue"
          label="List Contacts"
        />
        <UButton
          icon="fa-pencil"
          color="yellow"
          label="Edit"
          @click="isOpen = true"
        />
        <UButton
          icon="fa-trash"
          color="red"
          label="Delete"
        />
      </div>
    </template>
  </UTable>

  <div
    class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
  >
    <UPagination
      v-model="page"
      :page-count="pageCount"
      :total="areaData.length"
    />
  </div>

  <div>
    <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
        <AddAreaFrom/>
      </div>
    </UModal>
  </div>
</template>
