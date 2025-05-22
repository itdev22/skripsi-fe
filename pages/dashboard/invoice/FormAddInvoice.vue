<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { customerAdminApi } from "@/api/admin/customer";
import { invoiceAdminApi } from "@/api/admin/invoice";

const props = defineProps({
  isEdit: {
    type: Boolean,
    required: false,
  },
  data: {
    type: Object,
    default: () => ({
      customer_id: {
        type: String,
        default: "",
      },
      amount: {
        type: String,
        default: "",
      },
    }),
  },
});

const schema = object({
  customer_id: string().required("Customer is required"),
  amount: string().required("Amount is required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  customer_id: "",
  amount: "",
});

watch(
  () => props.isEdit,
  (newValue) => {
    if (newValue) {
      (state.customer_id = props.data.customer_id),
        (state.amount = props.data.amount);
    }
  },
  { immediate: true }
);
const emit = defineEmits(["success"]);

function onSuccess() {
  emit("success");
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  if (props.isEdit) {
    invoiceAdminApi()
      .editInvoice(props.data.id, state)
      .then((response) => {
        useToast().add({ title: response.message });
        onSuccess();
      })
      .catch((error) => {});
  } else {
    invoiceAdminApi()
      .createInvoice(state)
      .then((response) => {
        useToast().add({ title: response.message });
        onSuccess();
      })
      .catch((error) => {});
  }
}

const customer = ref([]);

async function getDataOptions() {
  customerAdminApi()
    .getAllCustomers()
    .then((response) => {
      customer.value = response.data.map((value: any, index: number) => ({
        label:
          value.email,
        value: value.id,
      }));
    });
}
await getDataOptions();
</script>

<template>
  <UModal>
    <div class="w-full p-4">
      <div class="p-2 mb-4 text-2xl font-bold text-center">
        <h1>{{ props.isEdit ? "Edit" : "Add New" }} Customer</h1>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Customer" name="customer_id">
          <USelectMenu
            v-model="state.customer_id"
            :options="customer"
            value-attribute="value"
            option-attribute="label"
          />
        </UFormGroup>
        <UFormGroup label="Amount" name="amount">
          <UInput v-model="state.amount" type="number" />
        </UFormGroup>
        <UButton type="submit"> Submit </UButton>
      </UForm>
    </div>
  </UModal>
</template>
