import type { App } from 'vue'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { transformRouteNameToRoutePath } from '@/utils'
import { transformAuthRouteToVueRoutes } from '@/utils/router/transform'
import { constantRoutes } from './routes'
import { createRouterGuard } from './guard'

const { VITE_HASH_ROUTE = 'N', VITE_BASE_URL } = import.meta.env

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'Y'
      ? createWebHashHistory(VITE_BASE_URL)
      : createWebHistory(VITE_BASE_URL),
  routes: transformAuthRouteToVueRoutes(constantRoutes),
})

export async function setupRouter(app: App) {
  app.use(router)
  createRouterGuard(router)
  await router.isReady()
}

export const routeName = (key: AuthRoute.AllRouteKey) => key
export const routePath = (key: Exclude<AuthRoute.AllRouteKey, 'not-found'>) =>
  transformRouteNameToRoutePath(key)

export * from './routes'
export * from './modules'
