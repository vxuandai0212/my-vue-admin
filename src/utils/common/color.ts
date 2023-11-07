import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
import mixPlugin from 'colord/plugins/mix'
import type { AnyColor, HsvColor } from 'colord'

extend([namesPlugin, mixPlugin])

const hueStep = 2
const saturationStep = 16
const saturationStep2 = 5
const brightnessStep1 = 5
const brightnessStep2 = 15
const lightColorCount = 5
const darkColorCount = 4

type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export function getColorPalette(color: AnyColor, index: ColorIndex): string {
  const transformColor = colord(color)

  if (!transformColor.isValid()) {
    throw Error('invalid input color value')
  }

  if (index === 6) {
    return colord(transformColor).toHex()
  }

  const isLight = index < 6
  const hsv = transformColor.toHsv()
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1

  const newHsv: HsvColor = {
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight),
  }

  return colord(newHsv).toHex()
}

const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
]

export function getColorPalettes(
  color: AnyColor,
  darkTheme = false,
  darkThemeMixColor = '#141414'
): string[] {
  const indexes: ColorIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const patterns = indexes.map((index) => getColorPalette(color, index))

  if (darkTheme) {
    const darkPatterns = darkColorMap.map(({ index, opacity }) => {
      const darkColor = colord(darkThemeMixColor).mix(patterns[index], opacity)

      return darkColor
    })

    return darkPatterns.map((item) => colord(item).toHex())
  }

  return patterns
}

function getHue(hsv: HsvColor, i: number, isLight: boolean) {
  let hue: number

  const hsvH = Math.round(hsv.h)

  if (hsvH >= 60 && hsvH <= 240) {
    hue = isLight ? hsvH - hueStep * i : hsvH + hueStep * i
  } else {
    hue = isLight ? hsvH + hueStep * i : hsvH - hueStep * i
  }

  if (hue < 0) {
    hue += 360
  }

  if (hue >= 360) {
    hue -= 360
  }

  return hue
}

function getSaturation(hsv: HsvColor, i: number, isLight: boolean) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s
  }

  let saturation: number

  if (isLight) {
    saturation = hsv.s - saturationStep * i
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep
  } else {
    saturation = hsv.s + saturationStep2 * i
  }

  if (saturation > 100) {
    saturation = 100
  }

  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10
  }

  if (saturation < 6) {
    saturation = 6
  }

  return saturation
}

function getValue(hsv: HsvColor, i: number, isLight: boolean) {
  let value: number

  if (isLight) {
    value = hsv.v + brightnessStep1 * i
  } else {
    value = hsv.v - brightnessStep2 * i
  }

  if (value > 100) {
    value = 100
  }

  return value
}

export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}

export function mixColor(
  firstColor: string,
  secondColor: string,
  ratio: number
) {
  return colord(firstColor).mix(secondColor, ratio).toHex()
}

export function isWhiteColor(color: string) {
  return colord(color).isEqual('#ffffff')
}

export function getRgbOfColor(color: string) {
  return colord(color).toRgb()
}

export const COLOR = [
  '#5da8ff',
  '#8e9dff',
  '#fedc69',
  '#26deca',
  '#EAF887',
  '#79DC96',
  '#3BBBB3',
  '#377AAF',
  '#610C9F',
  '#940B92',
  '#DA0C81',
  '#E95793',
]
