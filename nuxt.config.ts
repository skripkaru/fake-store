import piniaPersistedstate from 'pinia-plugin-persistedstate'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devtools: { enabled: true },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/main.css'
  ],
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
})
