import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";
import externalize from "vite-plugin-externalize-dependencies";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["vue"],
    },
  },
  plugins: [
    externalize({ externals: ["vue"] }),
    vue(),
    viteStaticCopy({
      targets: [
        {
          dest: "assets",
          src: "./node_modules/vue/dist/vue.esm-browser.prod.js",
        },
      ],
    }),
  ],
});
