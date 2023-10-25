import type { RouteRecordRaw } from 'vue-router'
import { getLayoutComponent, getViewComponent } from '@/utils/router/component'

export function transformAuthRouteToVueRoutes(routes: AuthRoute.Route[]) {
  return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1)
}

type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>

export function transformAuthRouteToVueRoute(item: AuthRoute.Route) {
  const resultRoute: RouteRecordRaw[] = []

  const itemRoute = { ...item } as RouteRecordRaw

  if (hasDynamicPath(item)) {
    Object.assign(itemRoute, { path: item.meta.dynamicPath })
  }

  if (hasHref(item)) {
    Object.assign(itemRoute, { component: getViewComponent('404') })
  }

  if (hasComponent(item)) {
    const action: ComponentAction = {
      basic() {
        itemRoute.component = getLayoutComponent('basic')
      },
      blank() {
        itemRoute.component = getLayoutComponent('blank')
      },
      multi() {
        if (hasChildren(item)) {
          Object.assign(itemRoute, { meta: { ...itemRoute.meta, multi: true } })
          delete itemRoute.component
        } else {
          window.console.error(
            'Multi-level routing is missing sub-routes: ',
            item
          )
        }
      },
      self() {
        itemRoute.component = getViewComponent(
          item.name as AuthRoute.LastDegreeRouteKey
        )
      },
    }
    try {
      if (item.component) {
        action[item.component]()
      } else {
        window.console.error('Routing component parsing failed: ', item)
      }
    } catch {
      window.console.error('Routing component parsing failed: ', item)
    }
  }

  if (isSingleRoute(item)) {
    if (hasChildren(item)) {
      window.console.error('A single route should not have sub-routes: ', item)
    }

    if (item.name === 'not-found') {
      itemRoute.children = [
        {
          path: '',
          name: item.name,
          component: getViewComponent('not-found'),
        },
      ]
    } else {
      const parentPath =
        `${itemRoute.path}-parent` as AuthRouteUtils.SingleRouteKey

      const layout =
        item.meta.singleLayout === 'basic'
          ? getLayoutComponent('basic')
          : getLayoutComponent('blank')

      const parentRoute: RouteRecordRaw = {
        path: parentPath,
        component: layout,
        redirect: item.path,
        children: [itemRoute],
      }

      return [parentRoute]
    }
  }

  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.Route[])
      .map((child) => transformAuthRouteToVueRoute(child))
      .flat()

    const redirectPath = (children.find((v) => !v.meta?.multi)?.path ||
      '/') as AuthRoute.RoutePath

    if (redirectPath === '/') {
      window.console.error('This multi-level route has no valid subpath', item)
    }

    if (item.component === 'multi') {
      resultRoute.push(...children)
      delete itemRoute.children
    } else {
      itemRoute.children = children
    }
    itemRoute.redirect = redirectPath
  }

  resultRoute.push(itemRoute)

  return resultRoute
}

export function transformAuthRouteToSearchMenus(
  routes: AuthRoute.Route[],
  treeMap: AuthRoute.Route[] = []
) {
  if (routes && routes.length === 0) return []
  return routes.reduce((acc, cur) => {
    if (!cur.meta?.hide) {
      acc.push(cur)
    }
    if (cur.children && cur.children.length > 0) {
      transformAuthRouteToSearchMenus(cur.children, treeMap)
    }
    return acc
  }, treeMap)
}

export function transformRouteNameToRoutePath(
  name: Exclude<AuthRoute.AllRouteKey, 'not-found'>
): AuthRoute.RoutePath {
  const rootPath: AuthRoute.RoutePath = '/'
  if (name === 'root') return rootPath

  const splitMark = '_'
  const pathSplitMark = '/'
  const path = name.split(splitMark).join(pathSplitMark)

  return (pathSplitMark + path) as AuthRoute.RoutePath
}

export function transformRoutePathToRouteName<K extends AuthRoute.RoutePath>(
  path: K
) {
  if (path === '/') return 'root'

  const pathSplitMark = '/'
  const routeSplitMark = '_'

  const name = path
    .split(pathSplitMark)
    .slice(1)
    .join(routeSplitMark) as AuthRoute.AllRouteKey

  return name
}

function hasHref(item: AuthRoute.Route) {
  return Boolean(item.meta.href)
}

function hasDynamicPath(item: AuthRoute.Route) {
  return Boolean(item.meta.dynamicPath)
}

function hasComponent(item: AuthRoute.Route) {
  return Boolean(item.component)
}

function hasChildren(item: AuthRoute.Route) {
  return Boolean(item.children && item.children.length)
}

function isSingleRoute(item: AuthRoute.Route) {
  return Boolean(item.meta.singleLayout)
}
