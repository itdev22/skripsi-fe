<script setup lang="ts">
import BalanceSheet from './balance-sheet/BalanceSheet.vue';
import Deposit from './deposit/Deposit.vue';
import Expense from './expense/Expense.vue';
import Tranfer from './tranfer/Tranfer.vue';
import ViewTransaction from './view-transaction/ViewTransaction.vue';




const tab_items = [
  {
    label: "Deposit",
    value: "deposit",
  },
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Tranfer",
    value: "tranfer",
  },
  {
    label: "View Transaction",
    value: "view-transaction",
  },
  {
    label: "Balance Sheet",
    value: "balance-sheet",
  },
  // {
  //   label: "Report Customer Installation",
  //   value: "report-customer",
  // },
];
</script>

<template>
  <UTabs :items="tab_items" class="w-full">
    <template #item="{ item }">
      <div v-if="item.value == 'deposit'">
        <Deposit />
      </div>
      <div v-if="item.value == 'expense'">
        <Expense />
      </div>
      <div v-if="item.value == 'tranfer'">
        <Tranfer />
      </div>
      <div v-if="item.value == 'view-transaction'">
        <ViewTransaction />
      </div>
      <div v-if="item.value == 'balance-sheet'">
        <BalanceSheet />
      </div>

      <!-- <div v-if="item.value == 'report-customer'">
        <CustomerInstallation />

      </div> -->
    </template>
  </UTabs>
</template>
