import { authApi } from '@/api/auth'
import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  if(to.path !== '/login'){
    authApi().verifyAuth()
    .then((response) => {
      if (response.success == false) {
        authStore.logout()
      }
    })
    .catch((error) => {
      console.error('authStore cek auth error', error)
    })
  }

  if (!authStore.isLoggedIn && to.path !== '/login') {
    authStore.logout()
    return navigateTo('/login')
  }

})