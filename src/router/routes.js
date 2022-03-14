import privateRoutes from './private-routes'
import publicRoutes from './public-routes'
import guestRoutes from './guest-routes'

const routes = [
  ...privateRoutes,
  ...publicRoutes,
  ...guestRoutes,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
