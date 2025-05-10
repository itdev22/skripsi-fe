<script setup lang="ts">
const dataList = [
  {
    id: 1,
    avatar: "https://github.com/benjamincanac.png",
    username: "Walton",
    fullName: "Ahmad Walton",
    type: "Admin",
  },
];
type User = {
  id: number;
  username: string;
  fullName: string;
  Type: string;
};
const columns = [
  { key: "id", label: "Number" },
  { key: "account", label: "Account" },
  { key: "balance", label: "Balance" },
];
const q = ref("");
const page = 0;
const pageCount = 0;

function handleClick(row: { id: number }) {
  alert("clicked" + row);
}

const toast = useToast();
const modal = useModal();
const count = ref(0);

const items = (row: User) => [
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
// function openModal() {
//   count.value += 1;
//   modal.open(FormRole, {
//     count: count.value,
//     onSuccess() {
//       toast.add({
//         title: "Success !",
//         id: "modal-success",
//       });
//     },
//   });
// }
</script>

<template>
  <!-- <UButton label="Add Expense" @click="openModal" /> -->
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" placeholder="Filter people..." />
  </div>
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
            :total="100"
          /> -->
  </div>
</template>
