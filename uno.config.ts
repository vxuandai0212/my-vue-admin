import { defineConfig } from 'unocss/vite'
import type { Theme } from 'unocss/preset-uno'
import type { Rule } from 'unocss'
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import { reduce, concat } from 'lodash-es'

type RuleType = {
  [key: string]: {
    [key: string]: Rule<Theme>[]
  }
}

const RULES: RuleType = {
  GENERAL: {
    COLORS: [],
    TYPOGRAPHY: [
      [/^font-size-([\.\d]+)$/, ([_, num]) => ({ 'font-size': `${num}px` })],
    ],
    SVG: [],
    VARIANTS: [],
  },
  ACCESSIBILITY: {
    SCREEN_READERS: [],
  },
  ANIMATIONS: {
    ANIMATION: [],
    TRANSFORMS: [],
    TRANSITIONS: [
      [
        /^transition$/,
        (_match) => ({ transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` }),
      ],
    ],
  },
  BACKGROUNDS: {
    BACKGROUND: [
      [
        /^(background-color|color)-([A-Za-z0-9-]+)$/,
        (match) => {
          const property = match[1]
          const color = match[2]
          const css: any = {}
          css[property] =
            COLOR.indexOf(color) !== -1 ? `var(--${color})` : `#${color}`
          return css
        },
      ],
    ],
    GRADIENTS: [],
    BACKGROUND_BLEND_MODE: [],
  },
  BEHAVIORS: {
    BOX_DECORATION_BREAK: [],
    IMAGE_RENDERING: [],
    LISTINGS: [],
    OVERFLOW: [],
    OVERSCROLL_BEHAVIOR: [],
    PLACEHOLDER: [],
  },
  BORDERS: {
    BORDER: [
      [
        /^border-rd-([\.\d]+)$/,
        ([_, num]) => ({ 'border-radius': `${num}px` }),
      ],
    ],
    DIVIDER: [],
    OUTLINE: [],
    RING: [],
  },
  EFFECTS: {
    BOX_SHADOW: [],
    OPACITY: [],
    MIX_BLEND_MODE: [],
  },
  FILTERS: {
    FILTER: [],
    BACKDROP_FILTER: [],
  },
  INTERACTIVITY: {
    ACCENT_COLOR: [],
    APPEARANCE: [],
    CURSOR: [],
    CARET: [],
    POINTER_EVENTS: [],
    RESIZE: [],
    SCROLL_BEHAVIOR: [],
    TOUCH_ACTION: [],
    USER_SELECT: [],
    WILL_CHANGE: [],
  },
  LAYOUT: {
    COLUMNS: [],
    CONTAINER: [],
    DISPLAY: [],
    FLEXBOX: [],
    GRID: [[/^gap-([\.\d]+)$/, ([_, num]) => ({ gap: `0 ${num}px` })]],
    POSITIONING: [],
    SIZING: [[/^w%-([\.\d]+)$/, ([_, num]) => ({ width: `${num}%` })]],
    SPACING: [
      [/^pt-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px` })],
      [/^pr-([\.\d]+)$/, ([_, num]) => ({ 'padding-right': `${num}px` })],
      [/^pb-([\.\d]+)$/, ([_, num]) => ({ 'padding-bottom': `${num}px` })],
      [/^pl-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px` })],
      [
        /^p-([\.\d]+)-([\.\d]+)-([\.\d]+)-([\.\d]+)$/,
        (match) => {
          const top = match[1]
          const right = match[2]
          const bottom = match[3]
          const left = match[4]
          return { padding: `${top}px ${right}px ${bottom}px ${left}px` }
        },
      ],
    ],
    TABLES: [],
  },
}

const COLOR = [
  'primary',
  'primary-hover',
  'primary-resting',
  'primary-disabled',
  'primary-dark',
  'primary-grey',
  'success',
  'warning',
  'danger',
  'info',
  'secondary',
  'sucess-light',
  'warning-light',
  'danger-light',
  'white',
  'outline',
  'resting-outline',
  'background-light',
]

export default defineConfig({
  rules: reduce(
    RULES,
    (r, v, _k) => {
      const _result = reduce(
        v,
        (r2, v2, _k2) => concat(r2, v2),
        [] as Rule<Theme>[]
      )
      return concat(r, _result)
    },
    [] as Rule<Theme>[]
  ),
  content: {
    pipeline: {
      exclude: [
        'node_modules',
        'dist',
        '.git',
        '.husky',
        '.vscode',
        'public',
        'build',
        'mock',
        './stats.html',
      ],
    },
  },
  presets: [presetUno({ dark: 'class' })],
  transformers: [transformerDirectives()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'i-flex-center': 'inline-flex justify-center items-center',
    'i-flex-x-center': 'inline-flex justify-center',
    'i-flex-y-center': 'inline-flex items-center',
    'flex-col': 'flex flex-col',
    'flex-col-stretch': 'flex-col items-stretch',
    'i-flex-col': 'inline-flex flex-col',
    'i-flex-col-stretch': 'i-flex-col items-stretch',
    'flex-1-hidden': 'flex-1 overflow-hidden',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-lb': 'absolute left-0 bottom-0',
    'absolute-rt': 'absolute right-0 top-0',
    'absolute-rb': 'absolute right-0 bottom-0',
    'absolute-tl': 'absolute-lt',
    'absolute-tr': 'absolute-rt',
    'absolute-bl': 'absolute-lb',
    'absolute-br': 'absolute-rb',
    'absolute-center': 'absolute-lt flex-center wh-full',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-lb': 'fixed left-0 bottom-0',
    'fixed-rt': 'fixed right-0 top-0',
    'fixed-rb': 'fixed right-0 bottom-0',
    'fixed-tl': 'fixed-lt',
    'fixed-tr': 'fixed-rt',
    'fixed-bl': 'fixed-lb',
    'fixed-br': 'fixed-rb',
    'fixed-center': 'fixed-lt flex-center wh-full',
    'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
    'ellipsis-text': 'nowrap-hidden text-ellipsis',
    'transition-base': 'transition-all duration-300 ease-in-out',
  },
  theme: {
    colors: {
      primary: 'rgb(var(--primary-color))',
      primary_hover: 'rgb(var(--primary-color-hover))',
      primary_pressed: 'rgb(var(--primary-color-pressed))',
      primary_active: 'rgba(var(--primary-color-active),0.1)',
      primary_1: 'rgb(var(--primary-color1))',
      primary_2: 'rgb(var(--primary-color2))',
      primary_3: 'rgb(var(--primary-color3))',
      primary_4: 'rgb(var(--primary-color4))',
      primary_5: 'rgb(var(--primary-color5))',
      primary_6: 'rgb(var(--primary-color6))',
      primary_7: 'rgb(var(--primary-color7))',
      primary_8: 'rgb(var(--primary-color8))',
      primary_9: 'rgb(var(--primary-color9))',
      info: 'rgb(var(--info-color))',
      info_hover: 'rgb(var(--info-color-hover))',
      info_pressed: 'rgb(var(--info-color-pressed))',
      info_active: 'rgb(var(--info-color-active),0.1)',
      success: 'rgb(var(--success-color))',
      success_hover: 'rgb(var(--success-color-hover))',
      success_pressed: 'rgb(var(--success-color-pressed))',
      success_active: 'rgb(var(--success-color-active),0.1)',
      warning: 'rgb(var(--warning-color))',
      warning_hover: 'rgb(var(--warning-color-hover))',
      warning_pressed: 'rgb(var(--warning-color-pressed))',
      warning_active: 'rgb(var(--warning-color-active),0.1)',
      error: 'rgb(var(--error-color))',
      error_hover: 'rgb(var(--error-color-hover))',
      error_pressed: 'rgb(var(--error-color-pressed))',
      error_active: 'rgb(var(--error-color-active),0.1)',
      dark: '#18181c',
    },
  },
})
