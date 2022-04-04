import privateRoutes from './private-routes'
import publicRoutes from './public-routes'
import guestRoutes from './guest-routes'

function routes (store) {
  return [
    ...privateRoutes(store),
    ...publicRoutes,
    ...guestRoutes(store),
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/Error404.vue')
    }
  ]
}

export default routes
