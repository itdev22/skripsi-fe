<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = object({
  name: string().required("Name is required"),
  url: string().url("URL must be a valid URL").required("URL is required"),
  email: string().required("Email is required").email("Email must be a valid email"),
  logo_url: string().url("Logo URL must be a valid URL").required("Logo URL is required"),
  phone: string().matches(/^\d+$/, "Phone number must be digits").required("Phone number is required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  name: "",
  url: "",
  email: "",
  phone: "",
  logo_url: "",

});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

</script>

<template>
  <div class="p-2 mb-4 text-2xl font-bold text-center">
    <h1>Add New Customer</h1>
  </div>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="URL" name="url">
      <UInput v-model="state.url" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
    <UFormGroup label="Phone" name="phone">
      <UInput v-model="state.phone" type="number"/>
    </UFormGroup>
    <UFormGroup label="Logo URL" name="logo_url">
      <UInput v-model="state.logo_url" />
    </UFormGroup>



    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
