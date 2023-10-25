import { useRouter } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { router as globalRouter, routeName } from '@/router'
import { useRouteStore } from '@/store'

export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter
  const route = globalRouter.currentRoute

  function routerPush(to: RouteLocationRaw, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to)
      window.open(routerData.href, '_blank')
      return Promise.resolve()
    }
    return router.push(to)
  }

  function routerBack() {
    router.go(-1)
  }

  function toHome(newTab = false) {
    const route = useRouteStore()
    routerPush({ name: route.routeHomeName }, newTab)
  }

  function toLogin(loginModule?: UnionKey.LoginModule, redirectUrl?: string) {
    const module: UnionKey.LoginModule = loginModule || 'pwd-login'
    const routeLocation: RouteLocationRaw = {
      name: routeName('login'),
      params: { module },
    }
    const redirect = redirectUrl
    if (redirect) Object.assign(routeLocation, { query: { redirect } })
    routerPush(routeLocation)
  }

  function toLoginModule(module: UnionKey.LoginModule) {
    const { query } = route.value
    routerPush({ name: routeName('login'), params: { module }, query })
  }

  function toLoginRedirect() {
    const { query } = route.value
    if (query?.redirect) {
      routerPush(query.redirect as string)
    } else {
      toHome()
    }
  }

  return {
    routerPush,
    routerBack,
    toHome,
    toLogin,
    toLoginModule,
    toLoginRedirect,
  }
}
