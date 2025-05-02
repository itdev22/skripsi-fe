import { authApi } from '@/api/auth'
import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  console.log('authStore cek auth')
  authApi().verifyAuth(useCookie('token').value ?? '')
    .then((response) => {
      console.log('authStore cek auth response', response)
      if (response.status === 200) {

      } else {

      }
    })
    .catch((error) => {
      console.error('authStore cek auth error', error)
    })
  console.log('authStore cek auth 2', authStore.isLoggedIn)
  if (!authStore.isLoggedIn && to.path !== '/login') {
    authStore.logout()
    return navigateTo('/login')
  }
})