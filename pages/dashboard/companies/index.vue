<script setup lang="ts">
import FormAddComponent from './FormAddComponent.vue'
const people = [{
    id: 1,
    logo: ' aaa',
    name: 'John aaa',
    email: 'Johndoe@rmail.com',
    phone: '1234567890',
}]

type Person = {
    id: number
    name: string
    email: string
    phone: string
    address: string
    area_code: string
    gmaps_link: string
    packet_internet: string
    ip_static: string
    mac_address: string
}

const columns = [
    {
        key: 'id',
        label: 'Number'
    }, {
        key: 'logo',
        label: 'logo'
    }, {
        key: 'name',
        label: 'Company Name'
    }, {
        key: 'email',
        label: 'Email'
    }, {
        key: 'phone',
        label: 'Phone'
    },{
        key: 'actions',
        label: 'Actions'
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

const items = (row: Person) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id)
    }], [{
        label: 'View Maps',
        icon: 'i-heroicons-arrow-right-circle-20-solid',
        click: () => window.open(row.gmaps_link, '_blank')
    }, {
        label: 'Upgrade',
        icon: 'i-heroicons-arrow-up-circle-20-solid',
        click: () => window.open("", '_blank')
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid'
    }]
]

const toast = useToast()
const modal = useModal()
const count = ref(0)

</script>


<template>

    <UButton label="Add Companies" @click="isOpen = true" />
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Filter people..." />
    </div>

    <UTable :rows="filteredRows" :columns="columns">

        <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
    </UTable>

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
