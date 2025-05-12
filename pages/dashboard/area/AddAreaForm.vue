<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { areaAdminApi } from "@/api/admin/area";

const schema = object({
  name: string().required("Name is required"),
});

type Schema = InferType<typeof schema>;

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({
      id: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    })
  }
})
const state = reactive({
  name: "",
});

watch(
  () => props.isEdit,
  (newValue) => {
    console.log("newValue", props.isEdit, newValue)
    if (newValue) {
      state.name = props.data.name
    } else {
      clearState()

    }
  },
  { immediate: true }
)

function clearState() {
  state.name = ""
}

const emit = defineEmits(["success"]);

function onSuccess() {
  emit("success");
}
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  if (props.isEdit) {
    areaAdminApi().editArea(props.data.id, state).then((response) => {
      useToast().add({ title: response.message, color: "green" })
      onSuccess()
    }).catch((error) => {
      useToast().add({ title: "Failed Create Area", color: "red" })
    })
  } else {

    areaAdminApi().createArea(state).then((response) => {
      useToast().add({ title: response.message, color: "green" })
      onSuccess()
    }).catch((error) => {
      useToast().add({ title: "Failed Create Area", color: "red" })
    })
  }
}
</script>

<template>
  <UModal>
    <div class="p-4">
      <div class="p-2 mb-4 text-2xl font-bold text-center">
        <h1>Add New Area</h1>
      </div>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UButton type="submit" color="blue"> Submit </UButton>
      </UForm>
    </div>
  </UModal>
</template>
