import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (!authStore.isLoggedIn && to.path !== '/login') {
    authStore.logout()
    return navigateTo('/login')
  }
})