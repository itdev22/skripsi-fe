<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
const props = defineProps({
  id: {
    type: String,
    required: false,
  },
});

const schema = object({
  customer: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  technician: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  date: string().required("Required"),
});

const user_type = [
  {
    label: "Full Administrator",
    value: "admin",
  },
  {
    label: "Employee",
    value: "employee",
  },
  {
    label: "Finance",
    value: "finance",
  },
];

const state = reactive({
  username: "",
  fullName: "",
  user_type: "",
  password: "",
  confirmPassword: "",
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
    <div class="p-2 mb-4 text-2xl font-bold text-center">
      <h1>Add New User</h1>
    </div>
    <div class="p-4">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Username" name="username">
          <UInput v-model="state.username" />
        </UFormGroup>
        <UFormGroup label="Full Name" name="fullName">
          <UInput v-model="state.fullName" />
        </UFormGroup>
        <URadioGroup
          v-model="state.user_type"
          legend="User Type"
          :options="user_type"
        />
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" />
        </UFormGroup>
        <UFormGroup label="Confirm Password" name="confirmPassword">
          <UInput v-model="state.confirmPassword" />
        </UFormGroup>
        <UButton type="submit">Submit</UButton>
      </UForm>
    </div>
  </UModal>
</template>
