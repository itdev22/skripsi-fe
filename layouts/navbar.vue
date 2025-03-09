<script setup lang="ts">
const showSidebar = ref(false);
const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
};
const items = [
    {
        label: "Dashboard",
        icon: "i-heroicons-home-20-solid"
    },
    {
        label: "Customer",
        icon: "i-heroicons-cog-6-tooth-solid"
    },
    {
        label: "Report",
        icon: "i-heroicons-user-circle-16-solid"
    },


    // {
    //     label: "Logout",
    //     icon: "i-heroicons-arrow-right-start-on-rectangle-16-solid"
    // },
];
const open = ref(false);



</script>

<template>
    <div class="flex w-full bg-gray-100">
        <div class="bg-gray-200 p-4 h-screen rounded-br-2xl" :class="{ 'w-1/6': showSidebar, 'w-1/8': !showSidebar }">
            <div class="flex gap-2 justify-between">
                <div class="text-xl font-bold text-gray-800">
                    Menu
                </div>
                <div @click="toggleSidebar">
                    <UButton color="blue" label="Hide" v-if="showSidebar" />
                    <UButton color="blue" label="Show" v-if="!showSidebar" />
                </div>
            </div>
            <div class="p-2">
                <ul>
                    <li class="flex gap-2" v-for="(item, index) in items" :key="index" @click="open = false">
                        <div class="">
                            <UIcon :name="item.icon" class="w-5 h-5" />
                        </div>
                        <div class="font-bold" v-if="showSidebar">
                            {{ item.label }}
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <div class="row w-full">
            <div class="p-2 flex justify-between w-full bg-gray-200 w-5/6 h-fit ">
                <div>
                    <h1>ISP Malang</h1>
                </div>
                <div class="flex gap-2">
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" chip-color="blue"
                        chip-text="" chip-position="top-right" />
                    <div>
                        <UDropdown v-model:open="open" :items="items" :popper="{ placement: 'bottom-start' }">
                            <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        </UDropdown>
                    </div>
                </div>

            </div>
            <div class="p-2 w-full h-screen">
                <slot></slot>
                <slot name="bottom-content"></slot>
            </div>

        </div>
    </div>
</template>
