import type { RouteRecordRaw } from 'vue-router'

export function getCacheRoutes(routes: RouteRecordRaw[]) {
  const cacheNames: string[] = []
  routes.forEach((route) => {
    if (hasChildren(route)) {
      ;(route.children as RouteRecordRaw[]).forEach((item) => {
        if (isKeepAlive(item)) {
          cacheNames.push(item.name as string)
        }
      })
    }
  })
  return cacheNames
}

function isKeepAlive(route: RouteRecordRaw) {
  return Boolean(route?.meta?.keepAlive)
}

function hasChildren(route: RouteRecordRaw) {
  return Boolean(route.children && route.children.length)
}
