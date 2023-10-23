import { effectScope, onScopeDispose, watch } from 'vue'
import type { GlobalThemeOverrides } from 'naive-ui'
import { useElementSize } from '@vueuse/core'
import { kebabCase } from 'lodash-es'
import { getColorPalettes, getRgbOfColor } from '@/utils'
import { useThemeStore } from '@/store/modules'

export default function subscribeThemeStore() {
  const theme = useThemeStore()
  const { width } = useElementSize(document.documentElement)
  const scope = effectScope()

  scope.run(() => {
    watch(
      () => theme.naiveThemeOverrides,
      (newValue) => {
        if (newValue.common) {
          addThemeCssVarsToHtml(newValue.common)
        }
      },
      { immediate: true }
    )

    watch(width, (newValue) => {
      if (newValue < theme.layout.minWidth) {
        document.documentElement.style.overflowX = 'auto'
      } else {
        document.documentElement.style.overflowX = 'hidden'
      }
    })
  })

  onScopeDispose(() => {
    scope.stop()
  })
}

type ThemeVars = Exclude<GlobalThemeOverrides['common'], undefined>
type ThemeVarsKeys = keyof ThemeVars

function addThemeCssVarsToHtml(themeVars: ThemeVars) {
  const keys = Object.keys(themeVars) as ThemeVarsKeys[]
  const style: string[] = []
  keys.forEach((key) => {
    const color = themeVars[key]

    if (color) {
      const { r, g, b } = getRgbOfColor(color)
      style.push(`--${kebabCase(key)}: ${r},${g},${b}`)

      if (key === 'primaryColor') {
        const colorPalettes = getColorPalettes(color)

        colorPalettes.forEach((palette, index) => {
          const { r: pR, g: pG, b: pB } = getRgbOfColor(palette)
          style.push(`--${kebabCase(key)}${index + 1}: ${pR},${pG},${pB}`)
        })
      }
    }
  })
  const styleStr = style.join(';')
  document.documentElement.style.cssText += styleStr
}
