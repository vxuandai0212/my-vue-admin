const project: AuthRoute.Route = {
  name: 'project',
  path: '/project',
  component: 'basic',
  children: [
    {
      name: 'project',
      path: '/project',
      component: 'self',
      meta: {
        title: 'Project',
        i18nTitle: 'routes.project.list',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'project',
      },
    },
    {
      name: 'project_new',
      path: '/project/new',
      component: 'self',
      meta: {
        title: 'New Project',
        i18nTitle: 'routes.project.new',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'project',
      },
    },
  ],
  meta: {
    title: 'Projects',
    i18nTitle: 'routes.project._value',
    icon: 'project',
    order: 2,
  },
}

export default project
