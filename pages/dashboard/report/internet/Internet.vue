<script setup lang="ts">
import FormInternet from './FormInternet.vue';


const dataList = [
  {
    id: 1,
    customer: "Lindsay Walton",
    internet_packet: "12 mbps",
    date: "2024-05-01",
  },
];

const columns = [
  { key: "customer", label: "Customer" },
  { key: "internet_packet", label: "Internet Packet" },
  { key: "date", label: "Date Installation" },
  {
    key:"actions",
    label: "Actions",
  }
];

const toast = useToast()
const modal = useModal()
const count = ref(0)

function openModal() {
  modal.open(FormInternet, {
    onSuccess() {
      toast.add({
        title: 'Success !',
        id: 'modal-success'
      })
    }
  })
}
</script>

<template>
        <div
          class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
        >
        </div>
        <UTable :rows="dataList" :columns="columns"/>

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