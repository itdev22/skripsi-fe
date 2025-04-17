<script setup>
const route = useRoute()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <!-- <NuxtUIProvider> -->
    <NuxtLayout>
        <NuxtLayout name="navbar" v-if="route.path !== '/login'">
          <NuxtPage />
        </NuxtLayout>
        <NuxtPage v-if="route.path == '/login'"/>
    </NuxtLayout>
    <UModals />
    <UNotifications />

    <!-- </NuxtUIProvider> -->
  </div>
</template>
