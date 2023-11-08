import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'

interface AppState {
  disableMainXScroll: boolean
  reloadFlag: boolean
  siderCollapse: boolean
  socket: Socket | null
}

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    disableMainXScroll: false,
    reloadFlag: true,
    siderCollapse: false,
    socket: null,
  }),
  actions: {
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
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse
    },
    setDisableMainXScroll(disable: boolean) {
      this.disableMainXScroll = disable
    },
    setSocket<T extends Socket = Socket>(socket: T) {
      this.socket = socket
    },
  },
})
