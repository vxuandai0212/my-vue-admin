import { defineStore } from 'pinia'
import {
  getNaiveThemeOverrides,
  initThemeSettings,
} from '@/store/modules/theme/helpers'
import { Theme } from '@/typings/system'

type ThemeState = Theme.Setting

export const useThemeStore = defineStore('theme-store', {
  state: (): ThemeState => initThemeSettings(),
  getters: {
    naiveThemeOverrides(state) {
      const overrides = getNaiveThemeOverrides({
        primary: state.themeColor,
        ...state.otherColor,
      })
      return overrides
    },
  },
})
