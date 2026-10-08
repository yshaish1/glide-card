import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: { entry: "src/glide-card.ts", formats: ["es"], fileName: () => "glide-card.js" },
    target: "es2022",
    sourcemap: false,
  },
  test: { environment: "happy-dom" },
});
