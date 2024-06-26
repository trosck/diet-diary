// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/i18n", "@nuxt/ui", "@pinia/nuxt"],
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "en",
  },
  devServer: {
    host: "0.0.0.0",
  },
  app: {
    head: {
      link: [
        {
          rel: "manifest",
          href: "/app.webmanifest",
          type: "application/manifest+json",
        },
      ],
    },
  },
});
