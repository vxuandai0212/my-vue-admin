import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { routeName } from '@/router'
import { useAuthStore } from '@/store'
import { exeStrategyActions, localStg } from '@/utils'
import { createDynamicRouteGuard } from './dynamic'

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const permission = await createDynamicRouteGuard(to, from, next)
  if (!permission) return

  if (to.meta.href) {
    window.open(to.meta.href)
    next({ path: from.fullPath, replace: true, query: from.query })
    return
  }

  const auth = useAuthStore()
  const isLogin = Boolean(localStg.get('token'))
  const permissions = to.meta.permissions || []
  const needLogin =
    Boolean(to.meta?.requiresAuth) || Boolean(permissions.length)
  const hasPermission =
    !permissions.length || permissions.includes(auth.userInfo.userRole)

  const actions: Common.StrategyAction[] = [
    [
      isLogin && to.name === routeName('login'),
      () => {
        next({ name: routeName('root') })
      },
    ],
    [
      !needLogin,
      () => {
        next()
      },
    ],
    [
      !isLogin && needLogin,
      () => {
        const redirect = to.fullPath
        next({ name: routeName('login'), query: { redirect } })
      },
    ],
    [
      isLogin && needLogin && hasPermission,
      () => {
        next()
      },
    ],
    [
      isLogin && needLogin && !hasPermission,
      () => {
        next({ name: routeName('403') })
      },
    ],
  ]

  exeStrategyActions(actions)
}
