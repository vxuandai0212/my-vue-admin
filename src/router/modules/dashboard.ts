const dashboard: AuthRoute.Route = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'custom',
  meta: {
    title: 'Dashboard',
    i18nHeaderTitle: 'routes.dashboard.headerTitle',
    i18nTitle: 'routes.dashboard._value',
    icon: 'dashboard',
    activeMenu: 'dashboard',
    requiresAuth: true,
    order: 1,
  },
}

export default dashboard
