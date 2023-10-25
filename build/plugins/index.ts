import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import progress from 'vite-plugin-progress'
import VueDevtools from 'vite-plugin-vue-devtools'
import unplugin from './unplugin'
import mock from './mock'
import visualizer from './visualizer'
import { compress } from './compress'

export function setupVitePlugins(
  viteEnv: ImportMetaEnv
): (PluginOption | PluginOption[])[] {
  const plugins = [
    vue({
      script: {
        defineModel: true,
      },
    }),
    vueJsx(),
    VueDevtools(),
    ...unplugin(viteEnv),
    UnoCSS(),
    mock(viteEnv),
    progress(),
  ]

  if (viteEnv.VITE_VISUALIZER === 'Y') {
    plugins.push(visualizer as PluginOption)
  }
  if (viteEnv.VITE_COMPRESS === 'Y') {
    plugins.push(compress(viteEnv))
  }

  return plugins
}
