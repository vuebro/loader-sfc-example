# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# @vuebro/sfc-loader

Этот проект был создан с помощью команды:

```
npm create vite@latest my-vue-app -- --template vue-ts
```

Далее в него были внесены следующие изменения, с целью продемонстрировать, как использовать пакет @vuebro/sfc-loader, который позволяет динамически загружать файлы vue sfc и компилировать непосредственно в браузере:

1. В файл package.json были добавлены следующие пакеты:

```javascript:highlight={12,20-21}
{
  "name": "sfc-loader-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vuebro/sfc-loader": "^1.3.4",
    "vue": "^3.5.18"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/tsconfig": "^0.7.0",
    "typescript": "~5.8.3",
    "vite": "^7.1.2",
    "vite-plugin-externalize-dependencies": "^1.0.1",
    "vite-plugin-static-copy": "^3.1.1",
    "vue-tsc": "^3.0.5"
  }
}
```

где:

 - @vuebro/sfc-loader: a loader for Vue SFC (Single File Component) files
 - vite-plugin-externalize-dependencies: a plugin for Vite that allows you to exclude specific dependencies from the Vite bundle during development
 - vite-plugin-static-copy: a Vite plugin designed to copy static assets during the build process and provide dev server support for them

2. Следующим шагом настроен 