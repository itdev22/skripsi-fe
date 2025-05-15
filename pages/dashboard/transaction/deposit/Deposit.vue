<script setup lang="ts">
import { transactionAdminApi } from "@/api/admin/transaction";
import FormDeposit from "./FormDeposit.vue";
import FormRole from "./FormDeposit.vue";
const props = defineProps<{
  data: { name: string; amount: number }[];
  onRefresh: () => Promise<void>;
}>();
const rows = ref(props.data);

watch(
  props.data,
  (newData) => {
    console.log("newData", newData);
    
    rows.value = newData;
  },
  { immediate: true }
);

type Deposit = {
  id: number;
  username: string;
  fullName: string;
  Type: string;
};

const columns = [
  { key: "number", label: "Number" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
  {
    key: "actions",
    label: "Actions",
  },
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

const items = (row: Deposit) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => openEditDepositModal(row.id.toString()),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => deleteDeposit(row.id.toString()),
    },
  ],
];

const isOpen = ref(false);

function openAddDepositModal() {
  modal.open(FormDeposit, {
    onSuccess: handleSubmitDeposit,
  });
}

function openEditDepositModal(transactionId: string) {
  modal.open(FormDeposit, {
    id: transactionId,
    onSuccess: handleSubmitDeposit,
  });
}

async function handleSubmitDeposit() {
  toast.add({
    title: "Success!",
    id: "modal-success",
  });

  // await fetchAllDeposits();
  modal.close();
  isOpen.value = false;
}

async function deleteDeposit(transactionId: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this company?"
  );
  if (!confirmed) return;

  try {
    await transactionAdminApi().deleteTransaction(transactionId);
    toast.add({
      title: "Success!",
      id: "modal-success",
    });
    await props.onRefresh();
    // await fetchAllDeposits();
    // props.function;
  } catch (error) {
    console.error("Error deleting company:", error);
  }
}
</script>

<template>
  <UButton label="Add Deposit" @click="openAddDepositModal" />
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" placeholder="Filter people..." />
  </div>
  <UTable v-if="rows.length" :rows="rows" :columns="columns">
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
