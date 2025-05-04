<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = object({
  name: string().required("Name is required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  name: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}
</script>

<template>
  <div class="p-2 mb-4 text-2xl font-bold text-center">
    <h1>Add New Area</h1>
  </div>

  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UButton type="submit" color="blue"> Submit </UButton>
  </UForm>
</template>
