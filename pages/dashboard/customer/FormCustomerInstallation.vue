<script setup lang="ts">
import { boolean, object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps({
  isEdit: {
    type: Boolean,
    required: false
  },
  data: {
    type: Object,
    default: () => {

    }
  }
})

const schema = object({
  customer: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  technician: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  description: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  date: string().required("Required"),
});

const state = reactive({
  customer: "",
  technician: "",
  date: "",
  description: "",
});

type Schema = InferType<typeof schema>;
function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

const emit = defineEmits(["success"]);

function onSuccess() {
  emit("success");
}
</script>

<template>
  <UModal>
    <div class="p-4">

      <div class="p-2 mb-4 text-2xl font-bold text-center">
        <h1>Add New Customer Installation</h1>
      </div>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Customer" name="customer">
          <UInput v-model="state.customer" />
        </UFormGroup>
        <UFormGroup label="Technician" name="technician">
          <UInput v-model="state.technician" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea autoresize v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Date Installation" name="date">
          <UInput v-model="state.date" type="date" />
        </UFormGroup>
        <UFormGroup label="Upload Photos" name="upload_photos">
          <UInput type="file" size="sm" icon="i-heroicons-folder" />
        </UFormGroup>
        <UButton type="submit">Submit</UButton>
      </UForm>
    </div>
  </UModal>
</template>
