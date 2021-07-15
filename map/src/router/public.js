/**
 * 公共路由
 */
export const PUBLIC_ROUTES = [
  {
    path: '/',
    meta: {
      title: 'HOME'
    },
    component: () => import('@pages/home/panel'),
  },
  {
    path: '/route',
    meta: {
      title: '导航'
    },
    component: () => import('@pages/route'),
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@pages/error/404')
  }
]