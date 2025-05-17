<script setup lang="ts">
import FormAddComponent from './FormAddComponent.vue';

const people = [
    {
        id: 1,
        type_cash: "cash_flow",
        type_in_out: "debit",
        date: "2025-05-17",
        description: "",
        amount: 10000,
    },
    {
        id: 2,
        type_cash: "cash_flow",
        type_in_out: "debit",
        date: "2025-05-18",
        description: "",
        amount: 10000,
    },
    {
        id: 3,
        type_cash: "cash_flow",
        type_in_out: "debit",
        date: "2025-05-19",
        description: "",
        amount: 10000,
    },
    {
        id: 4,
        type_cash: "cash_flow",
        type_in_out: "debit",
        date: "2025-05-20",
        description: "",
        amount: 10000,
    },
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
    return people.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const q = ref("");

let peopleData = people;

const filteredRows = computed(() => {
    if (!q.value) {
        peopleData = people;
        return people.slice((page.value - 1) * pageCount, page.value * pageCount);
    }

    const newData = people.filter((person) => {
        return Object.values(person).some((value) => {
            // person with paginate
            return String(value).toLowerCase().includes(q.value.toLowerCase());
        });
    });
    peopleData = newData;
    return newData.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const isOpen = ref(false);

const toast = useToast();
const modal = useModal();
function openModal() {
    isOpen.value = true;
    modal.open(FormAddComponent, {
        // isOpen: true,
        onSuccess() {
            // Emit success event
            console.log("success");
            modal.close();
            toast.add({
                title: "Success !",
                id: "modal-success",
                ui: { position: "top-right" },
            });
        },
    });
    console.log("open modals");
}
</script>

<template>
    <!-- <UButton label="Add Report Cash Flow" @click="openModal" /> -->
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Search" />
        <UButton label="Generate PDF" class="ml-2" @click="navigateTo('/dashboard/psf')"></UButton>
    </div>
    <UTable :rows="filteredRows" />

    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="peopleData.length" />
    </div>
</template>