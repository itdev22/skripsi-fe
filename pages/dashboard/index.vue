<script setup lang="ts">
import { dashboardAdminApi } from "@/api/admin/dashboard";
import { invoiceAdminApi } from "@/api/admin/invoice";
import { formatIDR } from "@/helper/currency";
import { formatDateToYMD } from "@/helper/date";

let invoices = ref<any[]>([]);
let totalIncome = ref<any>(0);
let totalExpenses = ref<any>(0);
let totalNetWorth = ref<any>(0);
let totalSales = ref<any>(0);

definePageMeta({
  layout: false,
});

const data = ref<{ y: number[]; x: string[]; label: string }[]>([]);
let cards = ref<{ name: string; total: number }[]>([]);
const CardList = [
  {
    name: "Customer",
    total: 0,
  },
  {
    name: "Packet Popular",
    total: 0,
  },
  {
    name: "Area",
    total: 0,
  },
  {
    name: "Report Cash",
    total: 0,
  },
];
for (const card of CardList) {
  cards.value.push(card);
}
for (const card of cards.value) {
  card.total = Math.floor(Math.random() * (99 - 1) + 1);

  const ob: { y: number[]; x: string[]; label: string } = {
    x: [],
    y: [],
    label: "name",
  };
  for (let index = 0; index < 10; index++) {
    ob.y.push(Math.floor(Math.random() * (99 - 1) + 1));
    ob.x.push(String(index));
  }
  data.value.push(ob);
}

const columns = [
  {
    key: "number",
    label: "Number",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "created_at",
    label: "Date",
  },
  {
    key: "amount",
    label: "amount",
  },
  {
    key: "plan",
    label: "Plan",
  },
];
async function getData() {
   invoiceAdminApi()
    .getAllInvoices()
    .then((response) => {
      response.data
        .filter((invoice: any) => invoice.status === "paid")
        .forEach((customer: any) => {
          customer.number = response.data.indexOf(customer) + 1;
        });

      invoices.value = [...response.data];
    })
    .catch((err) => {
      useToast().add({
        title: err,
        color: "red",
      });
    });

   dashboardAdminApi()
    .totalIncomeDashboard()
    .then((response) => {
      totalIncome.value = response.data.total_income;
    })
    .catch((err) => {
      useToast().add({
        title: err,
        color: "red",
      });
    });

     dashboardAdminApi()
    .totalExpensesDashboard()
    .then((response) => {
      totalExpenses.value = response.data.total_expenses;
    })
    .catch((err) => {
      useToast().add({
        title: err,
        color: "red",
      });
    });

     dashboardAdminApi()
    .totalNetWorthDashboard()
    .then((response) => {
      totalNetWorth.value = response.data.total_net_worth;
    })
    .catch((err) => {
      useToast().add({
        title: err,
        color: "red",
      });
    });

     dashboardAdminApi()
    .totalSalesDashboard()
    .then((response) => {
      totalSales.value = response.data.total_sales;
    })
    .catch((err) => {
      useToast().add({
        title: err,
        color: "red",
      });
    });
}
getData();
</script>

<template>
  <div class="flex justify-around gap-4 py-4 flex-col-4">
    <div class="items-center justify-between w-full p-4 bg-white border-2 border-gray-200 rounded-lg">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-2xl font-bold">Total Income</h1>
        <h1 class="text-2xl font-bold">$</h1>
      </div>
      <div class="flex justify-center mt-10">

        <h1 class="text-2xl font-bold">{{ formatIDR(totalIncome) }}</h1>
      </div>
    </div>
    <div class="items-center justify-between w-full p-4 bg-white border-2 border-gray-200 rounded-lg">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-2xl font-bold">Total Expenses</h1>
        <h1 class="text-2xl font-bold">$</h1>
      </div>
      <div class="flex justify-center mt-10">
        <h1 class="text-2xl font-bold">{{ formatIDR(totalExpenses) }}</h1>
      </div>
    </div>
    <div class="items-center justify-between w-full p-4 bg-white border-2 border-gray-200 rounded-lg">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-2xl font-bold">Net Worth</h1>
        <h1 class="text-2xl font-bold">$</h1>
      </div>
      <div class="flex justify-center mt-10">
        <h1 class="text-2xl font-bold">{{ formatIDR(totalNetWorth)  }}</h1>
      </div>
    </div>
    <div class="items-center justify-between w-full p-4 bg-white border-2 border-gray-200 rounded-lg">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-2xl font-bold">Sales</h1>
      </div>
      <div class="flex justify-center mt-10">
        <h1 class="text-2xl font-bold">{{ totalSales }}</h1>
      </div>
    </div>
  </div>
  <div class="grid gap-2 md:grid-cols-4 sm:grid-cols-2">
    <!-- <div v-for="i in 8" :key="i" class="p-4 bg-gray-200 rounded-lg">
                <div class="flex justify-between py-2">
                    <div>
                        Customer
                    </div>
                    <div>
                        900
                    </div>
                </div>
                <div class="p-2 bg-white rounded-lg">
                    for analytics
                    <ChartComponent :data="data"/>
                </div>
            </div> -->

    <div v-for="(card, index) in cards" :key="index">
      <CardComponent :dataChart="data[index]" :dataCard="card" />
    </div>
  </div>

  <div class="p-4 my-10 bg-white border-2 border-gray-200 rounded-lg">
    <h1 class="p-2 text-2xl font-bold">Recent Invoices</h1>
    <UTable :columns="columns" :rows="invoices" :page-size="5">
      <template #amount-data="{ row }">
        <p>{{ formatIDR(row.amount) }}</p>
      </template>
      <template #created_at-data="{ row }">
        <p>{{ formatDateToYMD(row.created_at) }}</p>
      </template>
    </UTable>
  </div>
</template>
