<script setup lang="ts">
import FormAddComponent from './AddAssetForm.vue'
import { defaultAssets } from './asset.model'
import { tableColumns } from './table'

const page = ref(1)
const pageCount = 5

const q = ref('')

let peopleData = defaultAssets

const filteredRows = computed(() => {
    if (!q.value) {
        peopleData = defaultAssets
        return defaultAssets.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    }

    const newData = defaultAssets.filter((person) => {
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
    <UTable :columns="tableColumns" :rows="filteredRows" />

    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="peopleData.length" />
    </div>

    <div>
        <UModal v-model="isOpen">
            <div class="p-4">
                <Placeholder class="h-48" />
                <FormAddComponent />
            </div>
        </UModal>
    </div>
</template>
