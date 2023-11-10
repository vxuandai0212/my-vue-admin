# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

# Icon
## Remote icon
https://icones.js.org/

# Mock
- mockjs.com

# Login
- Super/super123
- Admin/admin123
- User01/user01123

# Requirement checklist:
- Global application (support multi-language, fully responsive)
- Secure page, authorization view and action
- Beautiful UI (modern vibe, fancy transitions and animations)
- Optimized performace (quick page loading time, small package size, least re-render)
- Used latest technologies but still can integrate basic technologies

# What is included
## Build tool: vite
## Technologies:
### Core
- vue3
- typescript (support developer with typesafe and hint when coding)
- vue-router
- pinia
### Plugin:
- compress (reduce package size for quick deployment)
- unplug (support developer to use component without import)
- mock (support team to quick demo when backend is not ready yet)
- visualizer (visual package size, see what can be further size-optimized)
### UI
- unocss (inline css style like tailwind)
- naiveUI (component library for vuejs)
## Features:
- Fully customize font
- Can use local icon, remote icon
- Except datepicker, pagination, dropdown all is self-implemented.
- Component with empty state, loading state, full content state
- Multi language (text, number format, datetime format, currency format)
- Dynamic route (auth route, view permission)
- JWT verify
- Transition + animation
- Third party library integration sample code
