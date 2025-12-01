// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  future: {
    compatibilityVersion: 4,
  },
  icon: {
    serverBundle: {
      collections: ["lucide", "heroicons"],
    },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.ts" },
      { code: "de", language: "de-DE", name: "Deutsch", file: "de.ts" },
      { code: "es", language: "es-ES", name: "Español", file: "es.ts" },
      { code: "fr", language: "fr-FR", name: "Français", file: "fr.ts" },
      { code: "it", language: "it-IT", name: "Italiano", file: "it.ts" },
      { code: "pt", language: "pt-PT", name: "Português", file: "pt.ts" },
      { code: "nl", language: "nl-NL", name: "Nederlands", file: "nl.ts" },
      { code: "pl", language: "pl-PL", name: "Polski", file: "pl.ts" },
      { code: "sv", language: "sv-SE", name: "Svenska", file: "sv.ts" },
      { code: "da", language: "da-DK", name: "Dansk", file: "da.ts" },
      { code: "fi", language: "fi-FI", name: "Suomi", file: "fi.ts" },
      { code: "el", language: "el-GR", name: "Ελληνικά", file: "el.ts" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    langDir: "locales",
  },
});
