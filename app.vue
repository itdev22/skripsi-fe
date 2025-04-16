<script setup>

</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <!-- <NuxtUIProvider> -->
    <NuxtLayout>
        <NuxtLayout name="navbar" >
          <NuxtPage />
        </NuxtLayout>
    </NuxtLayout>
    <!-- </NuxtUIProvider> -->
  </div>
</template>
