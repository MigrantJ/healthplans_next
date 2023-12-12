import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    alias: {
      "@/components/": new URL("./components/", import.meta.url).pathname,
      "@/lib/": new URL("./lib/", import.meta.url).pathname,
      "@/types/": new URL("./types/", import.meta.url).pathname,
      "@/styles/": new URL("./styles/", import.meta.url).pathname,
    },
  },
});
