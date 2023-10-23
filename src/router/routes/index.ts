
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root'
  }
};

export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: 'login',
    path: '/login',
    component: 'self',
    meta: {
      title: 'Login',
      singleLayout: 'blank'
    }
  },
  {
    name: 'signup',
    path: '/signup',
    component: 'self',
    meta: {
      title: 'Signup',
      singleLayout: 'blank'
    }
  },
  {
    name: '403',
    path: '/403',
    component: 'self',
    meta: {
      title: 'Permission Denied',
      singleLayout: 'blank'
    }
  },
  {
    name: '404',
    path: '/404',
    component: 'self',
    meta: {
      title: 'Page Not Found',
      singleLayout: 'blank'
    }
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: 'blank',
    meta: {
      title: 'Page Not Found',
      singleLayout: 'blank'
    }
  }
];
