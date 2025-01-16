import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
