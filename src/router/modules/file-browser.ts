const fileBrowser: AuthRoute.Route = {
  name: 'file-browser',
  path: '/file-browser',
  component: 'basic',
  children: [
    {
      name: 'file-browser',
      path: '/file-browser',
      component: 'self',
      meta: {
        title: 'File Browser',
        i18nTitle: 'routes.file-browser.list',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'file-browser',
      },
    },
    {
      name: 'file-browser_new',
      path: '/file-browser/new',
      component: 'self',
      meta: {
        title: 'Upload File',
        i18nTitle: 'routes.file-browser.new',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'file-browser',
      },
    },
  ],
  meta: {
    title: 'File Browser',
    i18nTitle: 'routes.file-browser._value',
    icon: 'file',
    order: 10,
  },
}

export default fileBrowser
