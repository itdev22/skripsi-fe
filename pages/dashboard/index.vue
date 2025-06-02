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


  if (card.name == "Customer"){
  for (let index = 0; index < 10; index++) {
    ob.y.push(Math.floor(Math.random() * (99 - 1) + 1));
    ob.x.push(String(index));
  }
  }
  data.value.push(ob);
}

const columns = [
  {
    key: "number",
    label: "Number",
  },
  {
    key: "customer.name",
    label: "Name",
  },
  {
    key: "created_at",
    label: "Date",
  },
  {
    key: "amount",
    label: "amount",
  },  {
    key: "status",
    label: "Status",
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
        .forEach((customer: any) => {
          customer.number = response.data.indexOf(customer)+1;
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
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">

    <div class="w-full p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl transition-transform hover:scale-[1.03] duration-300">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-base font-medium uppercase tracking-wider opacity-90">Total Income</h1>
        <span class="text-lg font-semibold">$</span>
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-bold">{{ formatIDR(totalIncome) }}</h1>
      </div>
    </div>

    <div class="w-full p-6 bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 text-white rounded-2xl shadow-xl transition-transform hover:scale-[1.03] duration-300">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-base font-medium uppercase tracking-wider opacity-90">Total Expenses</h1>
        <span class="text-lg font-semibold">$</span>
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-bold">{{ formatIDR(totalExpenses) }}</h1>
      </div>
    </div>

    <div class="w-full p-6 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 text-white rounded-2xl shadow-xl transition-transform hover:scale-[1.03] duration-300">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-base font-medium uppercase tracking-wider opacity-90">Net Worth</h1>
        <span class="text-lg font-semibold">$</span>
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-bold">{{ formatIDR(totalNetWorth) }}</h1>
      </div>
    </div>

    <div class="w-full p-6 bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300 text-white rounded-2xl shadow-xl transition-transform hover:scale-[1.03] duration-300">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-base font-medium uppercase tracking-wider opacity-90">Sales</h1>
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-bold">{{ totalSales }}</h1>
      </div>
    </div>
  </div>

  <div class="grid gap-6 md:grid-cols-4 sm:grid-cols-2 mb-10">
    <div v-for="(card, index) in cards" :key="index">
      <CardComponent :dataChart="data[index]" :dataCard="card" />
    </div>
  </div>

  <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-lg">
    <h1 class="text-xl font-semibold text-slate-800 mb-4">Recent Invoices</h1>
    <UTable :columns="columns" :rows="invoices" :page-size="5">
      <template #amount-data="{ row }">
        <p class=" font-medium">{{ formatIDR(row.amount) }}</p>
      </template>
      <template #created_at-data="{ row }">
        <p class="text-slate-500">{{ formatDateToYMD(row.created_at) }}</p>
      </template>
    </UTable>
  </div>
</template>


