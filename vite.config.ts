import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5555,
  },
  base: "./",
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const { name, extname } = assetInfo;
          return `assets/${name.replace(/_/g, "")}.${extname}`; // 替换掉文件名中的下划线
        },
        chunkFileNames: (chunkInfo) => {
          const { name } = chunkInfo;
          return `assets/${name.replace(/_/g, "")}.[hash].js`; // 替换掉文件名中的下划线
        },
        entryFileNames: (entryInfo) => {
          const { name } = entryInfo;
          return `assets/${name.replace(/_/g, "")}.[hash].js`; // 替换掉文件名中的下划线
        },
      },
    },
  },
});
