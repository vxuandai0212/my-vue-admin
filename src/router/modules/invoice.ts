const invoice: AuthRoute.Route = {
  name: 'invoice',
  path: '/invoice',
  component: 'basic',
  children: [
    {
      name: 'invoice',
      path: '/invoice',
      component: 'self',
      meta: {
        title: 'Invoice',
        i18nTitle: 'routes.invoice.list',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'invoice',
      },
    },
    {
      name: 'invoice_new',
      path: '/invoice/new',
      component: 'self',
      meta: {
        title: 'New Invoice',
        i18nTitle: 'routes.invoice.new',
        requiresAuth: true,
        keepAlive: true,
        activeMenu: 'invoice',
      },
    },
  ],
  meta: {
    title: 'Invoices',
    i18nTitle: 'routes.invoice._value',
    icon: 'invoice',
    order: 9,
  },
}

export default invoice
