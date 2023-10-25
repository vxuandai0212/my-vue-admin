import { $t } from '@/locales'
import { App } from '@/typings/system'

export function transformAuthRouteToMenu(
  routes: AuthRoute.Route[]
): App.GlobalMenuOption[] {
  const globalMenu: App.GlobalMenuOption[] = []
  routes.forEach((route) => {
    const { name, path, meta } = route
    const routeName = name as string
    let menuChildren: App.GlobalMenuOption[] | undefined
    if (route.children && route.children.length > 0) {
      menuChildren = transformAuthRouteToMenu(route.children)
    }
    const menuItem: App.GlobalMenuOption = addPartialProps({
      menu: {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path,
        i18nTitle: meta.i18nTitle,
      },
      icon: meta.icon,
      children: menuChildren,
    })

    if (!hideInMenu(route)) {
      globalMenu.push(menuItem)
    }
  })

  return globalMenu
}

export function translateMenuLabel(
  menus: App.GlobalMenuOption[]
): App.GlobalMenuOption[] {
  const globalMenu: App.GlobalMenuOption[] = []
  menus.forEach((menu) => {
    let menuChildren: App.GlobalMenuOption[] | undefined
    if (menu.children && menu.children.length > 0) {
      menuChildren = translateMenuLabel(menu.children)
    }
    const menuItem: App.GlobalMenuOption = {
      ...menu,
      children: menuChildren,
      label: menu.i18nTitle ? $t(menu.i18nTitle) : menu.label,
    }
    globalMenu.push(menuItem)
  })
  return globalMenu
}

export function translateCustomMenuLabel(
  menus: App.CustomMenuOption[]
): App.CustomMenuOption[] {
  const globalMenu: App.CustomMenuOption[] = []
  menus.forEach((menu) => {
    const menuItem: App.CustomMenuOption = {
      ...menu,
      label: menu.i18nTitle ? $t(menu.i18nTitle) : menu.label,
    }
    globalMenu.push(menuItem)
  })
  return globalMenu
}

export function getActiveKeyPathsOfMenus(
  activeKey: string,
  menus: App.GlobalMenuOption[]
) {
  const keys = menus
    .map((menu) => getActiveKeyPathsOfMenu(activeKey, menu))
    .flat(1)
  return keys
}

function getActiveKeyPathsOfMenu(
  activeKey: string,
  menu: App.GlobalMenuOption
) {
  const keys: string[] = []
  if (activeKey.startsWith(menu.routeName)) {
    keys.push(menu.routeName)
  }
  if (menu.children) {
    keys.push(
      ...menu.children
        .map((item) =>
          getActiveKeyPathsOfMenu(activeKey, item as App.GlobalMenuOption)
        )
        .flat(1)
    )
  }
  return keys
}

function hideInMenu(route: AuthRoute.Route) {
  return Boolean(route.meta.hide)
}

function addPartialProps(config: {
  menu: App.GlobalMenuOption
  icon?: string
  children?: App.GlobalMenuOption[]
}) {
  const item = { ...config.menu }

  const { icon, children } = config

  if (icon) {
    Object.assign(item, { icon })
  }

  if (children) {
    Object.assign(item, { children })
  }
  return item
}
