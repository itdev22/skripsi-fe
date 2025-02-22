// https://nuxt.com/docs/examples/advanced/jsx
// https://vuejs.org/guide/extras/render-function.html#jsx-tsx



<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();

function setToken(data: string) {
    authStore.token = data
    router.push('/')
}

const formData = ref({
    username: '',
    password: ''
})

</script>

<template>
    <div class="card bg-blue shadow-lg p-4 ">
        <div class="flex justify-center shadow w-full bg-blue-500">
            <h1>Login</h1>
            <form @submit.prevent="setToken(formData.username)" class="">
                <div>
                    <label for="" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="text" class="input" v-model="formData.username" placeholder="Username" required>
                </div>
                <div>
                    <label for="" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" v-model="formData.password" placeholder="Password" required>
                </div>
                <div>
                    <button type="submit" @click="">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>