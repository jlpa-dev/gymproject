import authUser from 'src/helper/authUser'

export default [
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    beforeEnter: checkAuth,
    children: [
      { path: '', component: () => import('src/pages/dashboard/Index.vue'), name: 'dashboard' },
      {
        path: 'ejercicios',
        component: () => import('pages/dashboard/exercises/Index.vue'),
        children: [
          {
            path: '',
            component: () => import('src/pages/dashboard/exercises/List.vue')
          },
          {
            path: 'create',
            component: () => import('pages/dashboard/exercises/Create.vue'),
            name: 'exercises.create'
          },
          {
            path: 'edit/:id',
            component: () => import('pages/dashboard/exercises/Edit.vue'),
            name: 'exercises.edit'
          },
          {
            path: 'show/:id',
            component: () => import('pages/dashboard/exercises/Show.vue'),
            name: 'exercises.show'
          }
        ],
        name: 'exercises.inicio'
      },
      {
        path: 'rutinas',
        name: '',
        component: () => import('pages/dashboard/routines/Index.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/dashboard/routines/Routines.vue'),
            name: 'routines.inicio'
          },
          {
            path: 'calendario',
            component: () => import('src/pages/dashboard/routines/Calendar.vue'),
            name: 'routines.calendario'
          },
          {
            name: 'routines.show',
            path: ':id',
            component: () => import('src/pages/dashboard/routines/Show.vue')
          }
        ]
      }
    ]
  }

]

async function checkAuth (to, from, next) {
  const canAccess = await authUser()

  if (!canAccess) {
    next({ name: 'login' })
  } else {
    next()
  }
}
