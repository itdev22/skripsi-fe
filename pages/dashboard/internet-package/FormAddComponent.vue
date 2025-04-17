<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
    email: string().email('Invalid email').required('Required'),
    password: string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
    name: string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    phone: string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    address: string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    packet_internet: string()
        .min(3, 'Must be at least 3 characters')
        .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
    package_name: '',
    description: '',
    price: 0
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    console.log(event.data)
}
</script>

<template>
    <div class="p-2 mb-4 text-2xl font-bold text-center">
        <h1>Add New Internet Package</h1>
    </div>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

        <UFormGroup label="Package Name" name="package_name">
            <UInput v-model="state.package_name" />
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
</template>
