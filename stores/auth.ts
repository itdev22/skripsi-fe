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
    login({token,role_id}:{token:string,role_id?:string}) {
      console.log(token, " role ",role_id)
      useCookie('token').value = token
      useCookie('role_id').value = role_id
    },
    logout() {
      useCookie('token').value = ''
      useCookie('role_id').value = ''
    },
  },
})