import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useScreen() {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const isLaptop = breakpoints.smaller('lg')

  const isTablet = breakpoints.smaller('md')

  const isMobile = breakpoints.smaller('sm')

  return {
    isMobile,
    isTablet,
    isLaptop
  }
}
