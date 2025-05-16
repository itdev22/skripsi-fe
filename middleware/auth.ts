import { authApi } from '@/api/auth'
import { useAuthStore } from '../stores/auth'
import { authCustomerApi } from '@/api/customer/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  if(to.path !== '/login' ) {
     if (to.path.startsWith('/customer')) {
      authCustomerApi().verifyAuth()
        .then((response) => {
          if (response.success == false) {
            authStore.logout()
          }
        })
        .catch((error) => {
          console.error('authStore cek auth error', error)
        })
    } else {
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
  }

  if (!authStore.isLoggedIn && to.path !== '/login') {
    authStore.logout()
    return navigateTo('/login')
  }

})