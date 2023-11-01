import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useScreen() {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const isNotPC = breakpoints.smaller('2xl')

  const isTablet = breakpoints.smaller('xl')

  const isMobile = breakpoints.smaller('lg')

  return {
    isMobile,
    isTablet,
    isNotPC
  }
}
