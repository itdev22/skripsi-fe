<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  name: string().min(3, "Must be at least 3 characters").required("Required"),
  phone: string().min(3, "Must be at least 3 characters").required("Required"),
  address: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  packet_internet: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  type: "",
  brand: "",
  model: "",
  serial_number: "",
  mac_address: "",
  date: "",
  site: "",
  quantity: "",
  status: "",
  price: "",
  description: "",
  status_in_out: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

const status_in_out = [
  { label: "IN", value: "in" },
  { label: "OUT", value: "out" },
];

const status = [
  { label: "Broken", value: "broken" },
  { label: "Good", value: "good" },
  { label: "Bad", value: "bad" },];
</script>

<template>
  <div class="p-2 mb-4 text-2xl font-bold text-center">
    <h1>Add New Asset</h1>
  </div>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Type" name="type">
      <UInput v-model="state.type" />
    </UFormGroup>
    <UFormGroup label="Brand" name="brand">
      <UInput v-model="state.brand" />
    </UFormGroup>
    <UFormGroup label="Model" name="model">
      <UInput v-model="state.model" />
    </UFormGroup>
    <UFormGroup label="Serial Number" name="serial_number">
      <UInput v-model="state.serial_number" />
    </UFormGroup>
    <UFormGroup label="Mac Address" name="mac_address">
      <UInput v-model="state.mac_address" />
    </UFormGroup>
    <UFormGroup label="Date" name="date">
      <UInput v-model="state.date" />
    </UFormGroup>
    <UFormGroup label="Site" name="site">
      <UInput v-model="state.site" />
    </UFormGroup>
    <UFormGroup label="Quantity" name="quantity">
      <UInput v-model="state.quantity" />
    </UFormGroup>
    <UFormGroup label="Status Asset IN/Out" name="status_in_out">
      <USelect v-model="state.status_in_out" :options="status_in_out"></USelect>
    </UFormGroup>
    <UFormGroup label="Status" name="status">
          <USelect v-model="state.status" :options="status">
      </USelect>
    </UFormGroup>
    <UFormGroup label="Price" name="price">
      <UInput v-model="state.price" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
