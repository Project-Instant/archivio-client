import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import oxlintPlugin from 'vite-plugin-oxlint'
import minipic from 'vite-plugin-minipic'

export default defineConfig({
  plugins: [
    vike(),
    react(),
    tailwindcss(),
    oxlintPlugin(),
    // minipic()
  ],
  server: {
    allowedHosts: ["mvp.fasberry.su"]
  },
  build: {
    target: "es2022",
  },
  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
    },
  }
});