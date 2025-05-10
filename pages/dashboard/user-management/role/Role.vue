<script setup lang="ts">
import AddRoleForm from './AddRoleForm.vue';


const dataList = [
  {
    id: 1,
    customer: "Lindsay Walton",
    internet_packet: "12 mbps",
    date: "2024-05-01",
  },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "manage", label: "Manage" },
  {
    key: "actions",
    label: "Actions",
  },
];
type Role = {
  id: number;
  name: string;
  manahe: string;
};
const items = (row: Role) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];


const q = ref("");

const toast = useToast();
const modal = useModal();
const count = ref(0);

function openModal() {
  modal.open(AddRoleForm, {
    onSuccess() {
      toast.add({
        title: "Success !",
        id: "modal-success",
      });
    },
  });
}
</script>

<template>
  <UButton label="Add Role" @click="openModal" />
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" placeholder="Filter people..." />
  </div>
  <!-- <div
    class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
  ></div> -->
  <UTable :rows="dataList" :columns="columns">
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>

  <div
    class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
  >
    <!-- <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="peopleData.length"
          /> -->
  </div>
</template>
