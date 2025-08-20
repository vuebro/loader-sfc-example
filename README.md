# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# @vuebro/sfc-loader

This project was created using the following command:

```
npm create vite@latest sfc-loader-example -- --template vue-ts
```

Further modifications were made to it to demonstrate how to use the `@vuebro/sfc-loader` package, which enables dynamic loading of Vue SFC files and their compilation directly in the browser:

1. The following packages were added to the package.json file:

```json
{
  ...
  "dependencies": {
    ...
    "@vuebro/sfc-loader": "latest",
    ...
  },
  "devDependencies": {
    ...
    "vite-plugin-externalize-dependencies": "^1.0.1",
    "vite-plugin-static-copy": "^3.1.1",
    ...
  }
}
```

 - @vuebro/sfc-loader - a loader for Vue SFC (Single File Component) files
 - vite-plugin-externalize-dependencies - a plugin for Vite that allows you to exclude specific dependencies from the Vite bundle during development
 - vite-plugin-static-copy - a Vite plugin designed to copy static assets during the build process and provide dev server support for them

2. The next step was configuring vite.config.ts:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import externalize from 'vite-plugin-externalize-dependencies'

// https://vite.dev/config/
export default defineConfig({
  build: {rollupOptions: {external: ['vue']}},
  plugins: [
    vue(),
    externalize({externals: ['vue']}),
    viteStaticCopy({targets: [{dest: 'assets', src: './node_modules/vue/dist/vue.esm-browser.prod.js'}]})
  ],
})
```

where the following configuration has been added:

- build: {rollupOptions: {external: ['vue']}} - treats vue as external dependency in the build mode

and plugins have been added:

- externalize({externals: ['vue']}) - treats vue as external dependency in the dev mode
- viteStaticCopy({targets: [{dest: 'assets', src: './node_modules/vue/dist/vue.esm-browser.prod.js'}]}) - copy vue to the assets folder

3. The importmap has been added to the end of the `head` section in the index.html file to provide access to Vue in runtime mode:

```html
<!doctype html>
<html lang="en">
  <head>
    ...
    <script type="importmap">{"imports": {"vue": "./assets/vue.esm-browser.prod.js"}}</script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

4. The `HelloWorld.vue` file has been moved along with the `components` folder from `src/components` to `public/components`. This ensures that Vite will place the `HelloWorld.vue` file into `dist/components` during the build process.

5. In the `App.vue` file, the loading of the `HelloWorld` component has been changed. Now it is loaded and compiled directly in the browser.

```html
<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'

import { defineAsyncComponent } from 'vue'
import loadModule from '@vuebro/sfc-loader'

const HelloWorld = defineAsyncComponent(() => loadModule('./components/HelloWorld.vue'))
</script>

<template>
  ...
</template>

<style scoped>
...
</style>
```

> If modules are imported in the loaded component, remember that they have to be specified in the importmap.