export function getConstantRouteNames(routes: AuthRoute.Route[]) {
  return routes.map((route) => getConstantRouteName(route)).flat(1)
}

function getConstantRouteName(route: AuthRoute.Route) {
  const names = [route.name]
  if (route.children?.length) {
    names.push(
      ...route.children!.map((item) => getConstantRouteName(item)).flat(1)
    )
  }
  return names
}
