import { App } from '@/typings/system'

export function getBreadcrumbByRouteKey(
  activeKey: string,
  menus: App.GlobalMenuOption[],
  rootPath: string
) {
  const breadcrumbMenu = getBreadcrumbMenu(activeKey, menus)
  const breadcrumb = breadcrumbMenu.map((item) =>
    transformBreadcrumbMenuToBreadcrumb(item, rootPath)
  )
  return breadcrumb
}

function getBreadcrumbMenu(activeKey: string, menus: App.GlobalMenuOption[]) {
  const breadcrumbMenu: App.GlobalMenuOption[] = []
  menus.some((menu) => {
    const flag = activeKey.includes(menu.routeName)
    if (flag) {
      breadcrumbMenu.push(...getBreadcrumbMenuItem(activeKey, menu))
    }
    return flag
  })
  return breadcrumbMenu
}

function getBreadcrumbMenuItem(activeKey: string, menu: App.GlobalMenuOption) {
  const breadcrumbMenu: App.GlobalMenuOption[] = []
  if (activeKey === menu.routeName) {
    breadcrumbMenu.push(menu)
  }
  if (
    activeKey.includes(menu.routeName) &&
    menu.children &&
    menu.children.length
  ) {
    breadcrumbMenu.push(menu)
    breadcrumbMenu.push(
      ...menu.children
        .map((item) =>
          getBreadcrumbMenuItem(activeKey, item as App.GlobalMenuOption)
        )
        .flat(1)
    )
  }

  return breadcrumbMenu
}

function transformBreadcrumbMenuToBreadcrumb(
  menu: App.GlobalMenuOption,
  rootPath: string
) {
  const hasChildren = Boolean(menu.children && menu.children.length)
  const breadcrumb: App.GlobalBreadcrumb = {
    key: menu.routeName,
    label: menu.label as string,
    routeName: menu.routeName,
    disabled: menu.routePath === rootPath,
    hasChildren,
    i18nTitle: menu.i18nTitle,
  }
  if (menu.icon) {
    breadcrumb.icon = menu.icon
  }
  if (hasChildren) {
    breadcrumb.options = menu.children?.map((item) =>
      transformBreadcrumbMenuToBreadcrumb(
        item as App.GlobalMenuOption,
        rootPath
      )
    ) as NonNullable<App.GlobalBreadcrumb['options']>
  }
  return breadcrumb
}
