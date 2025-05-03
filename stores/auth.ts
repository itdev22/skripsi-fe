import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:  useCookie('token').value,
    user: { name: "" },
  }),
  getters: {
    isLoggedIn: (state) => !!useCookie('token').value,
  },
  actions: {
    login(token : string) {
      useCookie('token').value = token
    },
    logout() {
      useCookie('token').value = ''
    },
  },
})