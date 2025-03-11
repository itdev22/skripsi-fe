import { UButton } from '../.nuxt/components';
<script setup lang="ts">
const showSidebar = ref(true);
const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
};
const items = [
    {
        label: "Dashboard",
        icon: "i-heroicons-home"
    },
    {
        label: "Customer",
        icon: "i-heroicons-cog-6-tooth-solid"
    },
    {
        label: "Report",
        icon: "i-heroicons-user-circle-16-solid"
    },
    {
        label: "Billing",
        icon: "i-heroicons-user-circle-16-solid"
    },
    {
        label: "Assets",
        icon: "i-heroicons-arrow-down-on-square-stack"
    },
    // {
    //     label: "Logout",
    //     icon: "i-heroicons-arrow-right-start-on-rectangle-16-solid"
    // },
];
const open = ref(false);



</script>

<template>
    <div class="w-full sticky h-16 top-0 bg-white flex justify-between p-4 border" id="navbar">
        <div class="flex gap-4">
            <div>
                Logo
            </div>
            <div>
                ISP Malang
            </div>
        </div>
        <div>
            <UInput icon="i-heroicons-magnifying-glass-20-solid" class="w-full" :ui="{ rounded: 'rounded-full' }"
                color="blue" variant="outline" placeholder="Search..." />

        </div>
        <div>
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" chip-color="blue"
                chip-text="" chip-position="top-right" />
            <div>
                <!-- <UDropdown v-model:open="open" :items="items" :popper="{ placement: 'bottom-start' }">
                            <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        </UDropdown> -->
            </div>
        </div>
    </div>

    <div class="flex w-full">
        <!-- Sidebar -->
        <div
            :class="['border h-[calc(100vh-64px)] sticky top-16 flex flex-col transition-all duration-300', showSidebar ? 'w-1/6' : 'w-20']">
            <div class="overflow-y-auto flex-1 p-4">
                <ul>
                    <li v-for="(item, index) in items" :key="index"
                        class="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-blue-100 "
                        :class="[!showSidebar ? 'justify-center' : '']">
                        <UIcon :name="item.icon" class="w-10 h-10" />
                        <span v-if="showSidebar" class="font-bold">{{ item.label }}</span>
                    </li>
                </ul>
            </div>
            <!-- Collapse Button -->
            <div class="p-4 border-t flex justify-center" @click="toggleSidebar">
                <div>
                    <UIcon name="i-line-md-arrow-open-right" v-if="!showSidebar" class="w-5" />
                    <UIcon name="i-line-md-arrow-close-left" v-if="showSidebar" class="w-5" />
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="border p-12 bg-gray-50">
            <slot name="header"></slot>
            <slot name="header-child"></slot>
            <hr class="my-8">
            <slot></slot>
        </div>
    </div>

    <!-- <div class="flex w-full bg-gray-100">
        <div class="bg-gray-200 p-4 rounded-br-2xl" :class="{ 'w-1/6': showSidebar, 'w-1/8': !showSidebar }">
            <div class="flex gap-2 justify-between ">
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
                    <li class="flex gap-4 bg-white rounded-lg my-2 p-2 hover:bg-blue-100" v-for="(item, index) in items"
                        :key="index" @click="open = false">
                        <div class="">
                            <UIcon :name="item.icon" class="w-5" />
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
                    
                </div>

            </div>
            <div class="p-2 w-full h-auto">
                <slot></slot>
                <slot name="bottom-content"></slot>
            </div>

        </div>
    </div> -->
</template>
