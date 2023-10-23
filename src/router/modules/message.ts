const message: AuthRoute.Route = {
  name: 'message',
  path: '/message',
  component: 'custom',
  children: [
    {
      name: 'message',
      path: '/message',
      component: 'self',
      meta: {
        title: 'Message',
        i18nTitle: 'routes.message.list',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'message',
      },
    },
    {
      name: 'message_new',
      path: '/message/new',
      component: 'self',
      meta: {
        title: 'New Message',
        i18nTitle: 'routes.message.new',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'message',
      },
    },
  ],
  meta: {
    title: 'Messages',
    i18nTitle: 'routes.message._value',
    icon: 'message',
    order: 7,
  },
}

export default message
