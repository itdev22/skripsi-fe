<script setup lang="ts">
import FormCustomerInstallation from './FormCustomerInstallation.vue'
import FormAddComponent from './FormAddComponent.vue'
const people = [{
    id: 1,
    name: 'John Doe',
    email: 'Johndoe@rmail.com',
    phone: '1234567890',
    address: '123 Main St',
    area_code: '12345',
    gmaps_link: 'https://www.google.com/maps/place/-6.2113333,106.6425833',
    packet_internet: '100 Mbps',
    ip_static: '',
    mac_address: '00:1A:2B:3C:4D:5E',
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
        key: 'name',
        label: 'Name'
    }, {
        key: 'email',
        label: 'Email'
    }, {
        key: 'phone',
        label: 'Phone'
    }, {
        key: 'address',
        label: 'Address'
    }, {
        key: 'area_code',
        label: 'Area Code'
    }, {
        key: 'packet_internet',
        label: 'Packet Internet'
    }, {
        key: 'ip_static',
        label: 'IP Static'
    }, {
        key: 'mac_address',
        label: 'Mac Address'
    }, {
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
        label: 'Add Report Installation',
        icon: 'i-heroicons-archive-box-20-solid',
        click: () => OpenModalReportInstallation(row)
    }, {
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

function OpenModalReportInstallation(row: { id: number }) {
    modal.open(FormCustomerInstallation, {
        onSuccess() {
            toast.add({
                title: 'Success !',
                id: 'modal-success'
            })
        }
    })
}

</script>


<template>

    <UButton label="Add Customer" @click="isOpen = true" />
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
