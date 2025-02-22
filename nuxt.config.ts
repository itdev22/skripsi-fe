// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt','@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    config: {},
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ]
})
