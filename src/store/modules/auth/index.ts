import { unref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { fetchLogin, fetchUserInfo } from '@/service'
import { useRouterPush } from '@/composables'
import { localStg } from '@/utils'
import { $t } from '@/locales'
import { useRouteStore } from '../route'
import { getToken, getUserInfo, clearAuthStorage } from './helpers'

interface AuthState {
  userInfo: Auth.UserInfo
  token: string
  loginLoading: boolean
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
  }),
  getters: {
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    resetAuthStore() {
      const { toLogin } = useRouterPush(false)
      const { resetRouteStore } = useRouteStore()
      const route = unref(router.currentRoute)

      clearAuthStorage()
      this.$reset()

      if (route.meta.requiresAuth) {
        toLogin()
      }

      nextTick(() => {
        resetRouteStore()
      })
    },
    async handleActionAfterLogin(backendToken: ApiAuth.Token) {
      const route = useRouteStore()
      const { toLoginRedirect } = useRouterPush(false)

      const loginSuccess = await this.loginByToken(backendToken)

      if (loginSuccess) {
        await route.initAuthRoute()

        toLoginRedirect()

        if (route.isInitAuthRoute) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            content: $t('page.login.common.welcomeBack', {
              userName: this.userInfo.userName,
            }),
            duration: 3000,
          })
        }

        return
      }

      this.resetAuthStore()
    },
    async loginByToken(backendToken: ApiAuth.Token) {
      let successFlag = false

      const { token, refreshToken } = backendToken
      localStg.set('token', token)
      localStg.set('refreshToken', refreshToken)

      const { data } = await fetchUserInfo()
      if (data) {
        localStg.set('userInfo', data)

        this.userInfo = data
        this.token = token

        successFlag = true
      }

      return successFlag
    },
    async login(userName: string, password: string) {
      this.loginLoading = true
      const { data } = await fetchLogin(userName, password)
      if (data) {
        await this.handleActionAfterLogin(data)
      }
      this.loginLoading = false
    },
    async updateUserRole(userRole: Auth.RoleType) {
      const { resetRouteStore, initAuthRoute } = useRouteStore()

      const accounts: Record<
        Auth.RoleType,
        { userName: string; password: string }
      > = {
        super: {
          userName: 'Super',
          password: 'super123',
        },
        admin: {
          userName: 'Admin',
          password: 'admin123',
        },
        user: {
          userName: 'User01',
          password: 'user01123',
        },
      }
      const { userName, password } = accounts[userRole]
      const { data } = await fetchLogin(userName, password)
      if (data) {
        await this.loginByToken(data)
        resetRouteStore()
        initAuthRoute()
      }
    },
  },
})
