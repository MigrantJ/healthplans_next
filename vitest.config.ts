import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  plugins: react(),
  test: {
    environment: "happy-dom",
  },
});
