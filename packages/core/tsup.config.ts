import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  outDir: "dist",
  clean: true,
  dts: true,
  minify: true,
  splitting: false,
  cjsInterop: true,
  ...options,
}));
