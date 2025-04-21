<script setup lang="ts">
const showSidebar = ref(true);
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
const items = [
  {
    label: "Dashboard",
    icon: "i-heroicons-home",
    link: "/dashboard",
  },
  {
    label: "Customer",
    icon: "i-heroicons-user-circle-16-solid",
    link: "/dashboard/customer",
  },
  {
    label: "Report",
    icon: "i-heroicons-cog-6-tooth-solid",
    link: "/dashboard/report",
  },
  {
    label: "Internet Package",
    icon: "i-heroicons-user-circle-16-solid",
    link: "/dashboard/internet-package",
  },
  {
    label: "Assets",
    icon: "i-heroicons-arrow-down-on-square-stack",
    link: "/dashboard/asset",
  },
  {
    label: "Company",
    icon: "i-heroicons-user-circle-16-solid",
    link: "/dashboard/user-management",
  },
  {
    label: "Transaction",
    icon: "i-heroicons-user-circle-16-solid",
    link: "/dashboard/user-management",
  },
  {
    label: "User Management",
    icon: "i-heroicons-user-circle-16-solid",
    link: "/dashboard/user-management",
  },
  // {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },    {
  //     label: "User Management",
  //     icon: "i-heroicons-user-circle-16-solid",
  //     link: "/dashboard/user-management"
  // },
  // {
  //     label: "Logout",
  //     icon: "i-heroicons-arrow-right-start-on-rectangle-16-solid"
  // },
];
const open = ref(false);
</script>

<template>
  <div
    class="sticky top-0 z-10 flex justify-between w-full h-16 h-full p-4 bg-white border"
    id="navbar"
  >
    <div class="flex gap-4">
      <div>
        <p class="text-xl font-bold">
          Lilly <span class="text-red-500">ISP</span>
        </p>
      </div>
    </div>
    <div>
      <!-- <UInput icon="i-heroicons-magnifying-glass-20-solid" class="w-full" :ui="{ rounded: 'rounded-full' }"
                color="primary" variant="outline" placeholder="Search..." /> -->
    </div>
    <div>
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
        chip-color="blue"
        chip-text=""
        chip-position="top-right"
      />
      <div>
        <!-- <UDropdown v-model:open="open" :items="items" :popper="{ placement: 'bottom-start' }">
                            <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        </UDropdown> -->
      </div>
    </div>
  </div>

  <div class="fixed flex w-full h-screen top-16">
    <!-- Sidebar -->
    <div
      class="flex flex-col"
      :class="[
        'border transition-all duration-300',
        !showSidebar ? 'w-full md:w-1/6' : 'w-20',
      ]"
    >
      <!-- Collapse Button -->
      <div class="flex justify-center p-4 border-t" @click="toggleSidebar">
        <div>
          <UIcon
            name="i-line-md-arrow-open-right"
            v-if="showSidebar"
            class="w-5"
          />
          <UIcon
            name="i-line-md-arrow-close-left"
            v-if="!showSidebar"
            class="w-5"
          />
        </div>
      </div>
      <div class="flex-col p-4 overflow-auto no-scrollbar">
        <ul>
          <li
            v-for="(item, index) in items"
            :key="index"
            class="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-blue-100"
            :class="[showSidebar ? 'justify-center' : '']"
            @click="navigateTo(item.link)"
          >
            <UIcon :name="item.icon" class="w-10 h-10" />
            <span v-if="!showSidebar" class="font-bold">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full p-12 overflow-auto border bg-gray-50">
      <slot name="header"></slot>
      <slot name="header-child"></slot>
      <hr class="my-8" />
      <slot></slot>
      <!-- <slot></slot> -->
    </div>
  </div>

  <!-- <div class="flex w-full bg-gray-100">
        <div class="p-4 bg-gray-200 rounded-br-2xl" :class="{ 'w-1/6': showSidebar, 'w-1/8': !showSidebar }">
            <div class="flex justify-between gap-2 ">
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
                    <li class="flex gap-4 p-2 my-2 bg-white rounded-lg hover:bg-blue-100" v-for="(item, index) in items"
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
        <div class="w-full row">
            <div class="flex justify-between w-5/6 w-full p-2 bg-gray-200 h-fit ">
                <div>
                    <h1>ISP Malang</h1>
                </div>
                <div class="flex gap-2">
                    
                </div>

            </div>
            <div class="w-full h-auto p-2">
                <slot></slot>
                <slot name="bottom-content"></slot>
            </div>

        </div>
    </div> -->
</template>
