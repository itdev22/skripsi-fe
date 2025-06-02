import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:  useCookie('token').value,
    user: { user_id: "",role:"" },
  }),
  getters: {
    isLoggedIn: (state) => !!useCookie('token').value,
  },
  actions: {
    login({token,role_id}:{token:string,role_id?:string}) {
      useCookie('token').value = token
      useCookie('role_id').value = role_id
    },
    logout() {
      useCookie('token').value = ''
      useCookie('role_id').value = ''
    },
  },
})