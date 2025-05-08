<script setup lang="ts">
import { object, string, type InferType } from "yup";
import { customerAdminApi } from "@/api/admin/customer";

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
});

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  name: string().min(3, "Must be at least 3 characters").required("Required"),
  phone: string().min(3, "Must be at least 3 characters").required("Required"),
  packet_internet: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  ip_static: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  mac_address: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
});

const state = reactive({
  email: undefined,
  password: undefined,
  name: undefined,
  phone: undefined,
  address: "",
  area_code: "",
  latitude: 0,
  longitude: 0,
  packet_internet: undefined,
  ip_static: "",
  mac_address: "",
  gender: "",
  card_identition: "",
  no_identition: 0,
  job: "",
  type_subscription: "",
  submission_type: "",
  type_of_service: "",
  company: "",
});

const emit = defineEmits(["success"]);
function onSuccess() {
  emit("success");
}

async function onSubmit() {
  console.log("onSubmit called");
  if (props.id) {
    await customerAdminApi()
      .editCustomer(props.id, state)
      .then((response) => {
        console.log("Success editing company", response);
        onSuccess();
      })
      .catch((error) => {
        console.error("Error editing company:", error);
      });
  } else {
    await customerAdminApi()
      .createCustomer(state)
      .then((response) => {
        console.log("Success creating  company", response);
        onSuccess();
      })
      .catch((error) => {
        console.error("Error creating company:", error);
      });
  }

  onSuccess();
}
function onMarkerDrag(e: any) {
  const latlng = e.target.getLatLng();
  state.latitude = latlng.lat;
  state.longitude = latlng.lng;
  reverseGeocode(latlng.lat, latlng.lng);
}

async function reverseGeocode(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    state.address = data.display_name || "Address not found";
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    state.address = "Error fetching address";
  }
}

async function moveToMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        state.latitude = latitude;
        state.longitude = longitude;
        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

watch(
  () => state.ip_static,
  (newIp) => {
    state.mac_address = newIp;
    console.log("IP Static changed:", newIp);
  }
);

const genders = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

const card_identitions = [
  {
    label: "KTP",
    value: "ktp",
  },
  {
    label: "SIM",
    value: "sim",
  },
  {
    label: "PASPOR",
    value: "paspor",
  },
];

const type_subscriptions = [
  {
    label: "PERSONAL",
    value: "personal",
  },
  {
    label: "BUSINESS",
    value: "business",
  },
];

const submission_types = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Upgrade",
    value: "upgrade",
  },
];

const type_of_services = [
  {
    label: "Internet",
    value: "internet",
  },
  {
    label: "IPTV",
    value: "iptv",
  },
];

const companies = [
  {
    label: "Company 1",
    value: "id_company 1",
  },
  {
    label: "Company 2",
    value: "id_company_2",
  },
];
</script>

<template>
  <UModal>
    <div class="p-4">
      <div class="p-2 mb-4 text-2xl font-bold text-center">
        <h1>Add New Customer</h1>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <!-- <URadioGroup v-model="state.submission_type" legend="Submission Type" :options="submission_types" /> -->
        <URadioGroup
          v-model="state.type_of_service"
          legend="Type Of Service"
          :options="type_of_services"
        />

        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Company" name="company">
          <USelectMenu
            v-model="state.company"
            :options="companies"
            value-attribute="value"
            option-attribute="label"
          />
        </UFormGroup>
        <UFormGroup label="Gender" name="gender">
          <USelectMenu
            v-model="state.gender"
            :options="genders"
            value-attribute="value"
            option-attribute="label"
          />
        </UFormGroup>
        <UFormGroup label="Card Identition" name="card_identition">
          <USelectMenu
            v-model="state.card_identition"
            :options="card_identitions"
            value-attribute="value"
            option-attribute="label"
          />
        </UFormGroup>
        <UFormGroup label="No Indetition" name="no_identition">
          <UInput v-model="state.no_identition" type="number" />
        </UFormGroup>
        <UFormGroup label="Phone" name="phone">
          <UInput v-model="state.phone" />
        </UFormGroup>

        <UFormGroup label="Area Code" name="area_code">
          <UInput v-model="state.area_code" />
        </UFormGroup>

        <LMap
          style="height: 350px"
          :zoom="6"
          :center="[state.latitude, state.longitude]"
          :use-global-leaflet="false"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LMarker
            ref="map"
            :lat-lng="[state.latitude, state.longitude]"
            draggable
            @dragend="onMarkerDrag"
          />
          <LControl position="bottomleft">
            <UButton @click="moveToMyLocation">My Position</UButton>
          </LControl>
        </LMap>
        <UFormGroup label="Address" name="address">
          <UInput v-model="state.address" />
        </UFormGroup>
        <UFormGroup label="Map" name="coordinates">
          <div class="flex justify-around gap-4 flex-row-2">
            <div class="w-full text-sm">
              <span>Latitude</span>
              <UInput
                v-model="state.latitude"
                class="w-full"
                placeholder="Latitude"
                type="number"
              />
            </div>
            <div class="w-full text-sm">
              Longitude
              <UInput
                v-model="state.longitude"
                class="w-full"
                placeholder="Longitude"
                type="number"
              />
            </div>
          </div>
        </UFormGroup>
        <UFormGroup label="Packet Internet" name="packet_internet">
          <USelectMenu
            v-model="state.packet_internet"
            :options="type_subscriptions"
            value-attribute="value"
            option-attribute="label"
          />
        </UFormGroup>
        <UFormGroup label="Ip Static" name="ip_static">
          <UInput v-model="state.ip_static" />
        </UFormGroup>
        <UFormGroup label="Mac Address" name="mac_address">
          <UInput v-model="state.mac_address" />
        </UFormGroup>
        <UFormGroup label="Job" name="job">
          <UInput v-model="state.job" />
        </UFormGroup>
        <UFormGroup label="Type Subscription" name="type_subscription">
          <USelectMenu
            v-model="state.type_subscription"
            :options="type_subscriptions"
            value-attribute="value"
            option-attribute="label"
          />
        </UFormGroup>

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </div>
  </UModal>
</template>
