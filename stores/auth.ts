import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:  useCookie('token').value,
    user: { name: "" },
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    login(token : string) {
      this.user = { name: 'Eduardo' }
      this.token = token
      useCookie('token').value = token
    },
    logout() {
      this.user = { name: '' }
      this.token = ''
    },
  },
})