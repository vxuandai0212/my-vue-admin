import type { GlobalThemeOverrides } from 'naive-ui'
import { cloneDeep } from 'lodash-es'
import { themeSetting } from '@/settings'
import { sessionStg, addColorAlpha, getColorPalette } from '@/utils'

export function initThemeSettings() {
  const isProd = import.meta.env.PROD
  const storageSettings = sessionStg.get('themeSettings')

  if (isProd && storageSettings) {
    return storageSettings
  }

  const themeColor = sessionStg.get('themeColor') || themeSetting.themeColor
  const info = themeSetting.isCustomizeInfoColor
    ? themeSetting.otherColor.info
    : getColorPalette(themeColor, 7)
  const otherColor = { ...themeSetting.otherColor, info }
  const setting = cloneDeep({ ...themeSetting, themeColor, otherColor })
  return setting
}

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type ColorKey = `${ColorType}Color${ColorScene}`
type ThemeColor = Partial<Record<ColorKey, string>>

interface ColorAction {
  scene: ColorScene
  handler: (color: string) => string
}

function getThemeColors(colors: [ColorType, string][]) {
  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: (color) => getColorPalette(color, 7) },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) },
  ]

  const themeColor: ThemeColor = {}

  colors.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color
      const colorKey: ColorKey = `${colorType}Color${action.scene}`
      themeColor[colorKey] = action.handler(colorValue)
    })
  })

  return themeColor
}

/** 获取naive的主题颜色 */
export function getNaiveThemeOverrides(
  colors: Record<ColorType, string>
): GlobalThemeOverrides {
  const { primary, success, warning, error } = colors

  const info = themeSetting.isCustomizeInfoColor
    ? colors.info
    : getColorPalette(primary, 7)

  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error],
  ])

  const colorLoading = primary

  return {
    common: {
      ...themeColors,
      fontFamily: 'Lato',
      fontWeight: '400',
    },
    Button: {
      borderRadiusTiny: '8px',
      borderRadiusSmall: '8px',
      borderRadiusMedium: '8px',
      borderRadiusLarge: '8px',
      fontWeight: 700,
      fontSizeTiny: '14px',
      fontSizeSmall: '14px',
      fontSizeMedium: '14px',
      fontSizeLarge: '14px',
      colorFocusPrimary: '#5E81F4',
      borderFocusPrimary: '1px solid #5E81F4',
      textColorFocusPrimary: '#FFF',
      colorHoverPrimary: '#475EAB',
      borderHoverPrimary: '1px solid #475EAB',
      textColorHoverPrimary: '#FFF',
      colorPrimary: '#EFF3FE',
      borderPrimary: '1px solid #EFF3FE',
      textColorPrimary: '#5E81F4',
      colorDisabledPrimary: '#F6F6F6',
      borderDisabledPrimary: '1px solid #F6F6F6',
      textColorDisabledPrimary: '#8181A5',
      colorSuccess: '#7CE7AC',
      borderSuccess: '1px solid #7CE7AC',
      colorError: '#FF808B',
      borderError: '1px solid #FF808B',
      colorWarning: '#F4BE5E',
      borderWarning: '1px solid #F4BE5E',
      colorInfo: '#9698D6',
      borderInfo: '1px solid #9698D6',
      paddingTiny: '14px 26px',
      paddingSmall: '14px 26px',
      paddingMedium: '14px 26px',
      paddingLarge: '14px 26px',
    },
    LoadingBar: {
      colorLoading,
    },
  }
}
