const report: AuthRoute.Route = {
  name: 'report',
  path: '/report',
  component: 'custom',
  children: [
    {
      name: 'report',
      path: '/report',
      component: 'self',
      meta: {
        title: 'Report',
        i18nTitle: 'routes.report._value',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'report',
      },
    },
  ],
  meta: {
    title: 'Reports',
    i18nTitle: 'routes.report._value',
    icon: 'report',
    order: 12,
  },
}

export default report
