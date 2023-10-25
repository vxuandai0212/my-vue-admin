const notification: AuthRoute.Route = {
  name: 'notification',
  path: '/notification',
  component: 'basic',
  children: [
    {
      name: 'notification',
      path: '/notification',
      component: 'self',
      meta: {
        title: 'Notification',
        i18nTitle: 'routes.notification.list',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'notification',
      },
    },
    {
      name: 'notification_new',
      path: '/notification/new',
      component: 'self',
      meta: {
        title: 'New Event',
        i18nTitle: 'routes.notification.new',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'notification',
      },
    },
  ],
  meta: {
    title: 'Notifications',
    i18nTitle: 'routes.notification._value',
    icon: 'notification',
    order: 11,
  },
}

export default notification
