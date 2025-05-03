<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import {
  asset,
  assetSchema,
  status,
  status_in_out,
  type AssetSchema,
} from "./asset.model";

const state = reactive(asset);

async function onSubmit(event: FormSubmitEvent<AssetSchema>) {
  // Do something with event.data
  console.log(event.data);
}
</script>

<template>
  <div class="p-2 mb-4 text-2xl font-bold text-center">
    <h1>Add New Asset</h1>
  </div>
  <UForm
    :schema="assetSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
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
      <USelect v-model="state.status" :options="status"> </USelect>
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
