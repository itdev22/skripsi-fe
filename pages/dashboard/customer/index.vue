<script setup lang="ts">
const people = [{
    id: 1,
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Member'
}, {
    id: 2,
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Admin'
}, {
    id: 3,
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Member'
}, {
    id: 4,
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    role: 'Admin'
}, {
    id: 5,
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    role: 'Owner'
}, {
    id: 6,
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    role: 'Member'
}, {
    id: 7,
    name: 'Emily Selman',
    email: '',
    role: 'Admin'
}, {
    id: 8,
    name: 'Kristin Watson',
    email: '',
    role: 'Member'
}, {
    id: 9,
    name: 'Emma Watson',
    email: '',
    role: 'Member'
}, {
    id: 10,
    name: 'John Doe',
    email: '',
    role: 'Admin'
}, {
    id: 11,
    name: 'Jane Doe',
    email: '',
    role: 'Member'
}, {
    id: 12,
    name: 'John Smith',
    email: '',
    role: 'Admin'
}, {
    id: 13,
    name: 'Jane Smith',
    email: '',
    role: 'Owner'
}]

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    return people.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
</script>

<template>
    <NuxtLayout name="navbar">

        <template #header>
            <h1 class="text-bold">Dashboard</h1>
        </template>
        <template #header-child>
            <p>Analytic company</p>
        </template>
        <div>
            <UTable :rows="rows" />

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="people.length" />
            </div>
        </div>
    </NuxtLayout>
</template>
