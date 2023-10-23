const kanban: AuthRoute.Route = {
  name: 'kanban',
  path: '/kanban',
  component: 'custom',
  children: [
    {
      name: 'kanban',
      path: '/kanban',
      component: 'self',
      meta: {
        title: 'Kanban',
        i18nTitle: 'routes.kanban.list',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'kanban',
      },
    },
    {
      name: 'kanban_new',
      path: '/kanban/new',
      component: 'self',
      meta: {
        title: 'New Kanban',
        i18nTitle: 'routes.kanban.new',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'kanban',
      },
    },
  ],
  meta: {
    title: 'Kanban',
    i18nTitle: 'routes.kanban._value',
    icon: 'kanban',
    order: 4,
  },
}

export default kanban
