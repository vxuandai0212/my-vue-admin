import { transformObjectToOption } from './_shared'

export const themeLayoutModeLabels: Record<UnionKey.ThemeLayoutMode, string> = {
  vertical: 'Vertical',
  horizontal: 'Horizontal',
  'vertical-mix': 'Vertical Mix',
  'horizontal-mix': 'Horizontal Mix',
}
export const themeLayoutModeOptions = transformObjectToOption(
  themeLayoutModeLabels
)

export const themeScrollModeLabels: Record<UnionKey.ThemeScrollMode, string> = {
  wrapper: 'Wrapper',
  content: 'Content',
}
export const themeScrollModeOptions = transformObjectToOption(
  themeScrollModeLabels
)

export const themeTabModeLabels: Record<UnionKey.ThemeTabMode, string> = {
  chrome: 'Chrome',
  button: 'Button',
}
export const themeTabModeOptions = transformObjectToOption(themeTabModeLabels)

export const themeHorizontalMenuPositionLabels: Record<
  UnionKey.ThemeHorizontalMenuPosition,
  string
> = {
  'flex-start': 'Flex Start',
  center: 'Center',
  'flex-end': 'Flex End',
}
export const themeHorizontalMenuPositionOptions = transformObjectToOption(
  themeHorizontalMenuPositionLabels
)

export const themeAnimateModeLabels: Record<UnionKey.ThemeAnimateMode, string> =
  {
    'zoom-fade': 'Zoom Fade',
    'zoom-out': 'Zoom Out',
    'fade-slide': 'Fade Slide',
    fade: 'Fade',
    'fade-bottom': 'Fade Bottom',
    'fade-scale': 'Fade Scale',
  }
export const themeAnimateModeOptions = transformObjectToOption(
  themeAnimateModeLabels
)
