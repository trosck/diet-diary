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
          rel: "stylesheet",
          href: "https://unpkg.com/nes.css@2.3.0/css/nes.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Press+Start+2P",
        },
      ],
    },
  },
});
