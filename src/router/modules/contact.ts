const contact: AuthRoute.Route = {
  name: 'contact',
  path: '/contact',
  component: 'custom',
  children: [
    {
      name: 'contact',
      path: '/contact',
      component: 'self',
      meta: {
        title: 'Contact',
        i18nTitle: 'routes.contact.list',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'contact',
      },
    },
    {
      name: 'contact_new',
      path: '/contact/new',
      component: 'self',
      meta: {
        title: 'New Contact',
        i18nTitle: 'routes.contact.new',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'contact',
      },
    },
  ],
  meta: {
    title: 'Contacts',
    i18nTitle: 'routes.contact._value',
    icon: 'contact',
    order: 6,
  },
}

export default contact
