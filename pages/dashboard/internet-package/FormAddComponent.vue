<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { internetPackageAdminApi } from '@/api/admin/internet-package'

const schema = object({
    name: string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
    name: '',
    price: 0,
    description: ''
})
const emit = defineEmits(['success'])

function onSuccess() {
    emit('success')
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    console.log(event.data)
    await internetPackageAdminApi().createInternetPackage(state).then((response) => {
        useToast().add({ title: "Success Create Product", color: "green", description: response.message })
        onSuccess()

    }).catch((error) => {
        useToast().add({ title: "Error Create Product", color: "red", description: error })
    })
}
</script>

<template>
    <UModal>
        <div class="p-4">
            <div class="p-2 mb-4 text-2xl font-bold text-center">
                <h1>Add New Internet Package</h1>
            </div>
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

                <UFormGroup label="Package Name" name="name">
                    <UInput v-model="state.name" />
                </UFormGroup>
                <UFormGroup label="Price" name="price">
                    <UInput type="number" v-model="state.price" />
                </UFormGroup>
                <UFormGroup label="Description" name="description">
                    <UTextarea type="text" v-model="state.description" />
                </UFormGroup>

                <UButton type="submit">
                    Submit
                </UButton>
            </UForm>
        </div>
    </UModal>
</template>
