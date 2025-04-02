<script lang="ts">

</script>

<template>
    <NuxtLayout name="navbar">
        <template #header>
            <h1 class="text-bold">Assets</h1>
        </template>
        <template #header-child>
            <p>Analytic company</p>
        </template>

        <div class="grid gap-2 md:grid-cols-4 sm:grid-cols-2">
            <div v-for="(card, index) in cards" :key="index" class="p-4 bg-gray-200 rounded-lg">
                <div class="flex justify-between py-2">
                    <div>
                        {{ card.name }}
                    </div>
                    <div>
                        {{ card.total }}
                    </div>
                </div>
                <div class="p-2 bg-white rounded-lg">
                    for analytics
                </div>
            </div>
        </div>

    </NuxtLayout>
</template>