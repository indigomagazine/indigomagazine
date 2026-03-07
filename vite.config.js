import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  // Limit dependency scanning to the app entry only.
  // This prevents Vite from crawling prebuilt legacy bundles in /public.
  optimizeDeps: {
    entries: ["index.html"],
  },
  assetsInclude: ["**/*.otf", "**/*.ttf"],
});

