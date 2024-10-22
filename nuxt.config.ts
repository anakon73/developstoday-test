// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@hebilicious/vue-query-nuxt', 'nuxt-typed-router', '@vueuse/nuxt'],
  css: ['~/app/main.css'],
  srcDir: 'src/',
  dir: {
    layouts: 'pages/layouts',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.BASE_API_URL,
    },
  },
})
