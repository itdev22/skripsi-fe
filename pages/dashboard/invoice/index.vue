<script setup lang="ts">
import { invoiceAdminApi } from "@/api/admin/invoice";
import FormAddComponent from "./FormAddInvoice.vue";
import { formatIDR } from "@/helper/currency";
let customer = ref<any[]>([]);

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  area_code: string;
  gmaps_link: string;
  packet_internet: string;
  ip_static: string;
  mac_address: string;
};

async function getData() {
  await invoiceAdminApi()
    .getAllInvoices()
    .then((response) => {
      response.data.forEach((customer: any) => {
        customer.number = response.data.indexOf(customer) + 1;
      });

      customer.value = [...response.data];
    })
    .catch((err) => {
      useToast().add({
        title: err,
        color: "red",
      });
    });
}

async function deleteData(id: string) {
  await invoiceAdminApi()
    .deleteInvoice(id)
    .then((response) => {
      getData();
      useToast().add({
        title: response.message,
      });
    })
    .catch((err) => {
      useToast().add({
        title: err,
        color: "red",
      });
    });
}

await getData();

const columns = [
  {
    key: "number",
    label: "Number",
  },
  {
    key: "customer",
    label: "Customer",
  },
  {
    key: "amount",
    label: "Amount",
  },
  //  {
  //     key: 'mac_address',
  //     label: 'Mac Address'
  // },
  {
    key: "actions",
    label: "Actions",
  },
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return customer.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

const q = ref("");

let customerData = customer;

// const filteredRows = computed(() => {
//     if (!q.value) {
//         customerData = customer
//         return customer.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
//     }

//     const newData = customer.value.filter((person) => {
//         return Object.values(person).some((value) => {
//             // person with paginate
//             return String(value).toLowerCase().includes(q.value.toLowerCase())
//         })
//     })
//     customerData.value = newData
//     return newData.slice((page.value - 1) * pageCount, (page.value) * pageCount)
// })

const isOpen = ref(false);

const items = (row: Customer) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => OpenModalAddCustomer(true, row),
    },
  ],
  [
    {
      label: "View Maps",
      icon: "i-heroicons-arrow-right-circle-20-solid",
      click: () => window.open(row.gmaps_link, "_blank"),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => deleteData(row.id),
    },
  ],
];

const toast = useToast();
const modal = useModal();

function OpenModalAddCustomer(isEdit: boolean, data: any) {
  modal.open(FormAddComponent, {
    isEdit,
    data,
    async onSuccess() {
      await getData();
      modal.close();
    },
  });
}
</script>

<template>
  <UButton label="Add Invoice" @click="OpenModalAddCustomer(false, null)" />
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" placeholder="Filter customer..." />
  </div>

  <UTable :rows="customer" :columns="columns">
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
    <template #amount-data="{ row }">
      <p>{{ formatIDR(row.amount) }}</p>
    </template>
  </UTable>

  <div
    class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
  >
    <UPagination v-model="page" :page-count="pageCount" :total="6" />
  </div>
</template>
