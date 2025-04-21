<script setup lang="ts">
import FormAddComponent from './FormAddComponent.vue'

const assets =[{
    id: 1,
    type: 'Laptop',
    brand: 'Asus',
    model: 'ROG Strix G15',
    serial_number: '1234567890',
    mac_address: '00:1A:2B:3C:4D:5E',
    date: '2023-01-01',
    area: 'Office',
    description: 'Gaming laptop'
}, {
    id: 2,
    type: 'Monitor',
    brand: 'Dell',
    model: 'UltraSharp U2720Q',
    serial_number: '0987654321',
    mac_address: '11:22:33:44:55:66',
    date: '2023-02-01',
    area: 'Office',
    description: '4K monitor'
}]

const columns = [{
    key: 'id',
    label: 'Number'
}, {
    key: 'type',
    label: 'Type'
}, {
    key: 'brand',
    label: 'Brand'
}, {
    key: 'model',
    label: 'Model'
}, {
    key: 'serial_number',
    label: 'Serial Number'
}, {
    key: 'mac_address',
    label: 'Mac Address'
}, {
    key: 'date',
    label: 'Date'
}, {
    key: 'area',
    label: 'Area'
}, {
    key: 'description',
    label: 'Description'}]

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    return assets.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const q = ref('')

let peopleData = assets

const filteredRows = computed(() => {
    if (!q.value) {
        peopleData = assets
        return assets.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    }

    const newData = assets.filter((person) => {
        return Object.values(person).some((value) => {
            // person with paginate
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
    peopleData = newData
    return newData.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const isOpen = ref(false)

</script>

<template>
    <UButton label="Add Asset" @click="isOpen = true" />
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Filter people..." />
    </div>
    <UTable :columns="columns" :rows="filteredRows" />

    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="peopleData.length" />
    </div>

    <div>
        <UModal v-model="isOpen">
            <div class="p-4">
                <Placeholder class="h-48" />
                <FormAddComponent></FormAddComponent>
            </div>
        </UModal>
    </div>
</template>
