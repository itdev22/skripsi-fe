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
    label: "Area",
    icon: "i-heroicons-map",
    link: "/dashboard/area",
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
    icon: "i-heroicons-building-office-16-solid",
    link: "/dashboard/companies",
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
];
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
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
        chip-color="blue"
        chip-text=""
        chip-position="top-right"
      />
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

    <div class="w-full p-12 overflow-auto border bg-gray-50">
      <slot name="header"></slot>
      <slot name="header-child"></slot>
      <hr class="my-8" />
      <slot></slot>
    </div>
  </div>
</template>
