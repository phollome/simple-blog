import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "**/build/**"],
    watchExclude: [...configDefaults.watchExclude, "**/build/**"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
