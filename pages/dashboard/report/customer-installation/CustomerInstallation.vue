<script setup lang="ts">

const dataList = [
  {
    id: 1,
    customer: "Lindsay Walton",
    technician: "Arul Lapangan",
    date: "2024-05-01",
  },
];
const columns = [
  { key: "customer", label: "Customer" },
  { key: "technician", label: "Technician" },
  { key: "date", label: "Date Installation" },
  {
    key:"actions",
    label: "Actions",
  }
];
const q = ref("");
const page = 0;
const pageCount = 0;

function handleClick(row:{id:number}) {
  alert("clicked"+ row);
}
</script>

<template>
    <!-- <UButton label="Add Report Customer" @click="" /> -->
        <div
          class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
        >
          <UInput v-model="q" placeholder="Filter people..." />
        </div>
        <UTable :rows="dataList" :columns="columns">

            <template #actions-data="{ row }">
                <UButton @click="handleClick(row)">View Image</UButton>
            <!-- <UDropdown>
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown> -->
        </template>
        </UTable>

        <div
          class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
          <!-- <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="100"
          /> -->
        </div>
</template>