// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxt/ui", "@pinia/nuxt"],
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "ru",
  },
});