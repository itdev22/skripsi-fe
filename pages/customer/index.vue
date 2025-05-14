<script setup lang="ts">
interface Transaction {
    id: number;
    date: string;
    amount: number;
    plan: string;
}

interface Column {
    key: keyof Transaction;
    label: string;
}

const columns: Column[] = [
    { key: 'id', label: 'Number' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'plan', label: 'Plan' },
];

const transaction: Transaction[] = [
    { id: 1, date: '2024-01-01', amount: 100000, plan: 'Basic' },
    { id: 2, date: '2024-02-01', amount: 150000, plan: 'Standard' },
    { id: 3, date: '2024-03-01', amount: 100000, plan: 'Basic' },
    { id: 4, date: '2024-04-01', amount: 200000, plan: 'Premium' },
    { id: 5, date: '2024-05-01', amount: 100000, plan: 'Basic' },
];

const status = 'active' as 'active' | 'non active';
function handlePayment() {
    // Placeholder for payment logic
    alert('Redirecting to payment gateway...');
}
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 text-white bg-green-600 shadow-md">
            <div>
                <p class="text-sm">Hello, Welcome</p>
                <p class="text-2xl font-bold">Customer</p>
            </div>
            <div class="text-2xl font-bold">
                Lilly Apps
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-4xl p-4 mx-auto space-y-6">
            <!-- Next Payment Card -->
            <div class="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                <div class="mb-4 text-center">
                    <h2 class="text-xl font-bold text-gray-800">Next Payment</h2>
                    <p class="text-gray-600">11 May 2025</p>
                </div>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="p-2">
                        <p class="text-gray-600">Package Chosen</p>
                        <p class="text-xl font-bold text-gray-800">100 Mbps</p>
                    </div>
                    <div class="p-2">
                        <p class="text-gray-600">Package Price</p>
                        <p class="text-xl font-bold text-gray-800">Rp. 100.000,00</p>
                    </div>
                </div>
            </div>

            <!-- Status and Payment Button -->
            <div class="flex flex-col items-center gap-4">
                <div class="flex flex-col items-center justify-center w-full max-w-md p-6 transition-all duration-300 rounded-lg"
                    :class="status === 'active' ? 'bg-green-500' : 'bg-red-500'">
                    <p class="text-lg font-bold text-white">Internet Status</p>
                    <p class="text-white capitalize">{{ status }}</p>
                </div>
                <UButton
                    class="w-full max-w-md py-3 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                    size="xl" @click="handlePayment">
                    Payment Now
                </UButton>
            </div>

            <!-- Recent Invoices -->
            <div class="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                <h2 class="mb-4 text-lg font-bold text-gray-800">Recent Invoices</h2>
                <UTable :rows="transaction" :columns="columns" class="w-full" :class="{
                    'text-gray-800': true,
                    '[&>tbody>tr:nth-child(odd)]:bg-gray-50': true,
                    '[&>tbody>tr:hover]:bg-gray-100': true,
                }" />
            </div>
        </div>
    </div>
</template>
