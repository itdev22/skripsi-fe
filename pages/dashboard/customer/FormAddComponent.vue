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
    packet_internet: string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    ip_static: string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
    mac_address: string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
    email: undefined,
    password: undefined,
    name: undefined,
    phone: undefined,
    address: '',
    area_code: '',
    latitude: 0,
    longitude: 0,
    packet_internet: undefined,
    ip_static: '',
    mac_address: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    console.log(event.data)
}

function onMarkerDrag(e: any) {
    const latlng = e.target.getLatLng()
    state.latitude = latlng.lat
    state.longitude = latlng.lng
    reverseGeocode(latlng.lat, latlng.lng)
}

async function reverseGeocode(lat: number, lng: number) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        const data = await response.json()
        state.address = data.display_name || 'Address not found'
    } catch (error) {
        console.error('Reverse geocoding failed:', error)
        state.address = 'Error fetching address'
    }
}

async function moveToMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            state.latitude = latitude
            state.longitude = longitude
            reverseGeocode(latitude, longitude)
        }, (error) => {
            console.error('Error getting location:', error)
        })
    } else {
        console.error('Geolocation is not supported by this browser.')
    }
}

watch(() => state.ip_static, (newIp) => {
    state.mac_address = newIp
    console.log('IP Static changed:', newIp)
},
)

</script>

<template>
    <div class="p-2 mb-4 text-2xl font-bold text-center">
        <h1>Add New Customer</h1>
    </div>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Phone" name="phone">
            <UInput v-model="state.phone" />
        </UFormGroup>

        <UFormGroup label="Area Code" name="area_code">
            <UInput v-model="state.area_code" />
        </UFormGroup>

        <LMap style="height: 350px" :zoom="6" :center="[state.latitude, state.longitude]" :use-global-leaflet="false">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LMarker ref="map" :lat-lng="[state.latitude, state.longitude]" draggable @dragend="onMarkerDrag" />
            <LControl position="bottomleft">
                <UButton @click="moveToMyLocation">My Position</UButton>
            </LControl>
        </LMap>
        <UFormGroup label="Address" name="address">
            <UInput v-model="state.address" />
        </UFormGroup>
        <UFormGroup label="Map" name="coordinates">
            <div class="flex justify-around ">
                <UInput v-model="state.latitude" class="w-full" placeholder="Latitude" type="number" />
                <UInput v-model="state.longitude" class="w-full" placeholder="Longitude" type="number" />
            </div>
        </UFormGroup>
        <UFormGroup label="Packet Internet" name="packet_internet">
            <UInput v-model="state.packet_internet" />
        </UFormGroup>
        <UFormGroup label="Ip Static" name="ip_static">
            <UInput v-model="state.ip_static" />
        </UFormGroup>
        <UFormGroup label="Mac Address" name="mac_address">
            <UInput v-model="state.mac_address" />
        </UFormGroup>

        <UButton type="submit">
            Submit
        </UButton>
    </UForm>
</template>
