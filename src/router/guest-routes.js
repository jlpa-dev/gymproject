import authUser from 'src/helper/authUser'

const guestRoutes = [
  // Login
  {
    path: '/login',
    component: () => import('layouts/Auth'),
    beforeEnter: checkAuth,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/auth/login')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/Auth'),
    beforeEnter: checkAuth,
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('pages/auth/register')
      }
    ]
  },
  {
    path: '/recover',
    component: () => import('layouts/Auth'),
    beforeEnter: checkAuth,
    children: [
      {
        path: '',
        name: 'recover',
        component: () => import('pages/auth/recover')
      }
    ]
  }
]

async function checkAuth (to, from, next) {
  const canAccess = await authUser()
  const guests = ['/login', '/register', '/recover']
  console.log('Can Access: ' + canAccess)

  if (canAccess && guests.join().indexOf(to.path) === -1) {
    console.log('Usuario logueado navegando en dahsboard')
    next()
  } else if (canAccess && guests.join().indexOf(to.path) >= 0) {
    console.log('Usuario logueado redireccionar a dashboard')
    next({ name: 'dashboard' })
  } else if (!canAccess && guests.join().indexOf(to.path) === -1) {
    console.log('Loguear')
    next({ name: 'login' })
  } else {
    next()
    // next({ name: 'login' })
  }
}

export default guestRoutes
