import { authApi } from '@/api/auth'
import { useAuthStore } from '../stores/auth'
import { authCustomerApi } from '@/api/customer/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  if (to.path !== '/login') {
    if (to.path.startsWith('/customer')) {
      checkAuth();
    } else {
      checkAuth();
    }
  }

  if (!authStore.isLoggedIn && to.path !== '/login') {
    authStore.logout()
    return navigateTo('/login')
  }

})

async function checkAuth() {
  const authStore = useAuthStore()
  authApi().verifyAuth()
    .then((response) => {
      if (response.success == false) {
        authStore.logout()
      }
      authStore.user = response.data
    })
    .catch((error) => {
      console.error('authStore cek auth error', error)
    })
}

async function checkPermission() {
  const authStore = useAuthStore()
  
  authStore.user.role
}