import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { routeName } from '@/router'
import { useRouteStore } from '@/store'
import { localStg } from '@/utils'

export async function createDynamicRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const route = useRouteStore()
  const isLogin = Boolean(localStg.get('token'))

  if (!route.isInitAuthRoute) {
    if (!isLogin) {
      const toName = to.name as AuthRoute.AllRouteKey
      if (route.isValidConstantRoute(toName) && !to.meta.requiresAuth) {
        next()
      } else {
        const redirect = to.fullPath
        next({ name: routeName('login'), query: { redirect } })
      }
      return false
    }

    await route.initAuthRoute()

    if (to.name === routeName('not-found')) {
      const ROOT_ROUTE_NAME: AuthRoute.AllRouteKey = 'root'
      const path =
        to.redirectedFrom?.name === ROOT_ROUTE_NAME ? '/' : to.fullPath
      next({ path, replace: true, query: to.query, hash: to.hash })
      return false
    }
  }

  if (to.name === routeName('not-found')) {
    next({ name: routeName('404'), replace: true })
    return false
  }

  return true
}
