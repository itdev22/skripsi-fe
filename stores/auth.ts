import { defineStore } from 'pinia'
// import { getData, setData } from 'nuxt-storage';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:  "",
    user: { name: "" },
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    login() {
      console.log("login")
      this.user = { name: 'Eduardo' }
    },
    logout() {
      this.user = { name: '' }
    },
  },
})