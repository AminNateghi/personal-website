// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://nateghi.xyz",
  integrations: [sitemap()],

  i18n: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});