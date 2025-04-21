<script setup lang="ts">
import FormAddComponent from './FormAddComponent.vue'

const isOpen = ref(false)

</script>
<template>
    <div>
        <UButton label="Add New User Access" @click="isOpen = true" />

        <UModal v-model="isOpen">
            <div class="p-4">
                <Placeholder class="h-48" />
                <FormAddComponent></FormAddComponent>

            </div>
        </UModal>
    </div>
</template>