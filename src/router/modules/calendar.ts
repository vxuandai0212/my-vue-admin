const calendar: AuthRoute.Route = {
  name: 'calendar',
  path: '/calendar',
  component: 'custom',
  children: [
    {
      name: 'calendar_new',
      path: '/calendar/new',
      component: 'self',
      meta: {
        title: 'New Event',
        i18nTitle: 'routes.calendar.new',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'calendar',
      },
    },
  ],
  meta: {
    title: 'Calendar',
    i18nTitle: 'routes.calendar._value',
    headerTitle: 'Calendar',
    i18nHeaderTitle: 'routes.calendar.headerTitle',
    requiresAuth: true,
    keepAlive: true,
    icon: 'calendar',
    order: 5,
  },
}

export default calendar
