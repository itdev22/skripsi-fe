<script setup lang="ts">
definePageMeta({
    layout: false,
})
</script>

<template>
    <NuxtLayout name="navbar">
        <div class="grid gap-2 md:grid-cols-4 sm:grid-cols-2">
            <div v-for="i in 8" :key="i" class="bg-gray-200 p-4 rounded-lg">
                <div class="flex justify-between py-2">
                    <div>
                        Customer
                    </div>
                    <div>
                        900
                    </div>
                </div>
                <div class="bg-white p-2 rounded-lg">
                    for analytics
                </div>
            </div>
        </div>
    </NuxtLayout>
    
</template>