import { defineStore } from 'pinia'
import { sessionStg } from '@/utils'
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
    pageAnimateMode(state) {
      return state.page.animate ? state.page.animateMode : undefined
    },
  },
  actions: {
    resetThemeStore() {
      sessionStg.remove('themeSettings')
      this.$reset()
    },
    cacheThemeSettings() {
      const isProd = import.meta.env.PROD
      if (isProd) {
        sessionStg.set('themeSettings', this.$state)
      }
    },
    setFollowSystemTheme(visible: boolean) {
      this.followSystemTheme = visible
    },
    setLayoutMinWidth(minWidth: number) {
      this.layout.minWidth = minWidth
    },
    setLayoutMode(mode: UnionKey.ThemeLayoutMode) {
      this.layout.mode = mode
    },
    setScrollMode(mode: UnionKey.ThemeScrollMode) {
      this.scrollMode = mode
    },
    setSiderInverted(isInverted: boolean) {
      this.sider.inverted = isInverted
    },
    setHeaderInverted(isInverted: boolean) {
      this.header.inverted = isInverted
    },
    setThemeColor(themeColor: string) {
      this.themeColor = themeColor
    },
    setIsFixedHeaderAndTab(isFixed: boolean) {
      this.fixedHeaderAndTab = isFixed
    },
    setReloadVisible(visible: boolean) {
      this.showReload = visible
    },
    setHeaderHeight(height: number | null) {
      if (height) {
        this.header.height = height
      }
    },
    setHeaderCrumbVisible(visible: boolean) {
      this.header.crumb.visible = visible
    },
    setHeaderCrumbIconVisible(visible: boolean) {
      this.header.crumb.showIcon = visible
    },
    setTabVisible(visible: boolean) {
      this.tab.visible = visible
    },
    setTabHeight(height: number | null) {
      if (height) {
        this.tab.height = height
      }
    },
    setTabMode(mode: UnionKey.ThemeTabMode) {
      this.tab.mode = mode
    },
    setTabIsCache(isCache: boolean) {
      this.tab.isCache = isCache
    },
    setSiderWidth(width: number | null) {
      if (width) {
        this.sider.width = width
      }
    },
    setSiderCollapsedWidth(width: number) {
      this.sider.collapsedWidth = width
    },
    setMixSiderWidth(width: number | null) {
      if (width) {
        this.sider.mixWidth = width
      }
    },
    setMixSiderCollapsedWidth(width: number) {
      this.sider.mixCollapsedWidth = width
    },
    setMixSiderChildMenuWidth(width: number) {
      this.sider.mixChildMenuWidth = width
    },
    setHorizontalMenuPosition(position: UnionKey.ThemeHorizontalMenuPosition) {
      this.menu.horizontalPosition = position
    },
    setFooterVisible(isVisible: boolean) {
      this.footer.visible = isVisible
    },
    setFooterIsFixed(isFixed: boolean) {
      this.footer.fixed = isFixed
    },
    setFooterIsRight(right: boolean) {
      this.footer.right = right
    },
    setFooterHeight(height: number) {
      this.footer.height = height
    },
    setFooterInverted(inverted: boolean) {
      this.footer.inverted = inverted
    },
    setPageIsAnimate(animate: boolean) {
      this.page.animate = animate
    },
    setPageAnimateMode(mode: UnionKey.ThemeAnimateMode) {
      this.page.animateMode = mode
    },
  },
})
