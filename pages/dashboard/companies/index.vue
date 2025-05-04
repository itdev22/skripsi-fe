<script setup lang="ts">
import { companyAdminApi } from '@/api/admin/company';
import FormAddComponent from './FormAddComponent.vue'
import { number } from 'yup';
const people: any[] = [];

await companyAdminApi().getAllCompanies()
    .then((response) => {
        people.push(...response.data);
        response.data.forEach((company: any) => {
            company.number = response.data.indexOf(company) + 1;
            company.logo_url = company.logo_url || 'https://via.placeholder.com/150';
            company.gmaps_link = company.gmaps_link || 'https://www.google.com/maps';
        });
    })
    .catch((error) => {
        console.error('Error fetching companies:', error);
    });



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
        key:'number',
        label: 'No'
    },  {
        key: 'email',
        label: 'Email'
    }, {
        key: 'url',
        label: 'Website'
    },{
        key: 'phone',
        label: 'Phone'
    }, {
        key: 'logo_url',
        label: 'Image'
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

function OpenModalReportInstallation() {
    modal.open(FormAddComponent, {
        onSuccess() {
            toast.add({
                title: 'Success !',
                id: 'modal-success'
            })

            modal.close();
        }
    })
}

const items = (row: Person) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id)
    }],[{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid'
    }]
]

const toast = useToast()
const modal = useModal()
const count = ref(0)

</script>


<template>

    <UButton label="Add Companies" @click="() => OpenModalReportInstallation()" />
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
                <FormAddComponent onsubmit="isOpen = false"/>
            </div>
        </UModal>
    </div>
</template>
