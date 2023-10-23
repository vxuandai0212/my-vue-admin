export function sortRoutes(routes: AuthRoute.Route[]) {
  return routes
    .sort((next, pre) => Number(next.meta?.order) - Number(pre.meta?.order))
    .map((i) => {
      if (i.children) sortRoutes(i.children)
      return i
    })
}

export function handleModuleRoutes(modules: AuthRoute.RouteModule) {
  const routes: AuthRoute.Route[] = []

  Object.keys(modules).forEach((key) => {
    const item = modules[key].default
    if (item) {
      routes.push(item)
    } else {
      window.console.error(`Route module parsing error: key = ${key}`)
    }
  })

  return sortRoutes(routes)
}
