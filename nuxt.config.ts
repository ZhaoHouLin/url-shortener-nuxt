// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "node:path"

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      viewport: "width=500, initial-scale=1",
      title: "URL-Shortner",
      meta: [
        {
          "http-equiv": "Content-Security-Policy",
          content:
            "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src 'none';",
        },

        {
          "http-equiv": "Strict-Transport-Security",
          content: "max-age=31536000; includeSubDomains; preload",
        },
        {
          "http-equiv": "X-Content-Type-Options",
          content: "nosniff",
        },
        {
          "http-equiv": "Referrer-Policy",
          content: "no-referrer",
        },
        {
          name: "description",
          content: "URL-Shortner",
        },
        { property: "og:title", content: "URL-Shortner" },
        { property: "og:url", content: "" },
        {
          property: "og:description",
          content: "URL-Shortner",
        },
      ],
    },
  },
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  runtimeConfig: {
    token: "",
    public: {
      apiUrl: "https://re-url.cdc.gov.tw/",
    },
  },

  vite: {
    // define: {
    //   "process.env": process.env,
    // },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `@import "${path.resolve(
            __dirname,
            "./assets/style.styl"
          )}"`,
        },
      },
    },
  },
  imports: {
    dirs: ["stores"],
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  // nitro: {
  //   plugins: ["~/server/db/index.js"],
  // },
})
