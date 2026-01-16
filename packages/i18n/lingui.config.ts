import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/locales.ts";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  fallbackLocales: {
    default: defaultLocale,
  },
  format: formatter({ lineNumbers: false }),
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: [
        "<rootDir>/src/**/*.{ts,tsx}",
        "<rootDir>/../../apps/web/src/**/*.{ts,tsx}",
        "<rootDir>/../../apps/landing_page/app/**/*.{ts,tsx}",
        "<rootDir>/../../apps/landing_page/components/**/*.{ts,tsx}",
      ],
      exclude: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/*.d.ts"],
    },
  ],
  // Compile to ESM JavaScript (not TypeScript) for universal compatibility
  // This generates .js files that work in Next.js, Node.js, and any ESM environment
  compileNamespace: "es",
});
