import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'
import { LAYOUT_SCROLL_EL_ID } from '@soybeanjs/vue-materials'

interface AppState {
  scrollElId: string
  disableMainXScroll: boolean
  reloadFlag: boolean
  settingDrawerVisible: boolean
  siderCollapse: boolean
  mixSiderFixed: boolean
  socket: Socket | null
}

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    scrollElId: LAYOUT_SCROLL_EL_ID,
    disableMainXScroll: false,
    reloadFlag: true,
    settingDrawerVisible: false,
    siderCollapse: false,
    mixSiderFixed: false,
    socket: null,
  }),
  actions: {
    getScrollConfig() {
      const scrollEl = document.querySelector(`#${this.scrollElId}`)

      const { scrollLeft = 0, scrollTop = 0 } = scrollEl || {}

      return {
        scrollEl,
        scrollLeft,
        scrollTop,
      }
    },
    async reloadPage(duration = 0) {
      this.reloadFlag = false
      await nextTick()
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true
        }, duration)
      } else {
        this.reloadFlag = true
      }
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 })
      }, 100)
    },
    openSettingDrawer() {
      this.settingDrawerVisible = true
    },
    closeSettingDrawer() {
      this.settingDrawerVisible = false
    },
    toggleSettingDrawerVisible() {
      this.settingDrawerVisible = !this.settingDrawerVisible
    },
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse
    },
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse
    },
    setMixSiderIsFixed(isFixed: boolean) {
      this.mixSiderFixed = isFixed
    },
    toggleMixSiderFixed() {
      this.mixSiderFixed = !this.mixSiderFixed
    },
    setDisableMainXScroll(disable: boolean) {
      this.disableMainXScroll = disable
    },
    setSocket<T extends Socket = Socket>(socket: T) {
      this.socket = socket
    },
  },
})
