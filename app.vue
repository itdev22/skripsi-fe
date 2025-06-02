<script setup>
const route = useRoute()

import LoadingComponent from '@/components/LoadingComponent.vue'
import { useLoading } from '@/composables/useLoading'

const { isLoading } = useLoading()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <!-- <NuxtUIProvider> -->
    <NuxtLayout>
      <NuxtLayout name="navbar" v-if="route.path !== '/login' && route.path !== '/customer'">
        <NuxtPage />
      </NuxtLayout>
      <NuxtPage v-if="route.path == '/login' || route.path == '/customer'" />
    </NuxtLayout>
    <UModals />
    <UNotifications />

    <!-- </NuxtUIProvider> -->
  </div>
</template>
