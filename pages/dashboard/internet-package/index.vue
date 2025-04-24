<script setup lang="ts">
import FormAddComponent from './FormAddComponent.vue'
const people = [
    {
        package_name: "12 Mbps",
        price: "Rp. 120.000",
        Description: ""
    }, {
        package_name: "25 Mbps",
        price: "Rp. 250.000",
        Description: ""
    }, {
        package_name: "35 Mbps",
        price: "Rp. 350.000",
        Description: ""
    }
]

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    return people.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const q = ref('')

let peopleData = people

const filteredRows = computed(() => {
    if (!q.value) {
        peopleData = people
        return people.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    }

    const newData = people.filter((person) => {
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


    <UButton label="Add Internet Package" @click="isOpen = true" />
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Filter people..." />
    </div>
    <UTable :rows="filteredRows" />

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
