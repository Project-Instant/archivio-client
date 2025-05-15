import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
// import oxlintPlugin from 'vite-plugin-oxlint'
import minipic from 'vite-plugin-minipic'
// import { visualizer } from 'rollup-plugin-visualizer'; 
import sitemap from '@qalisa/vike-plugin-sitemap';

export default defineConfig({
  plugins: [
    vike(),
    sitemap({
      pagesDir: "./",
      baseUrl: 'https://mvp.fasberry.su',
      robots: undefined
    }),
    react(),
    tailwindcss(),
    // visualizer({
    //   open: false,
    //   filename: 'dist/stats.html',
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
    // oxlintPlugin(),
    minipic()
  ],
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  server: {
    allowedHosts: ["mvp.fasberry.su"]
  },
  build: {
    target: "es2022",
    minify: "esbuild",
    sourcemap: 'hidden',
  },
  esbuild: {
    legalComments: 'none',
  },
  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
    },
  }
});