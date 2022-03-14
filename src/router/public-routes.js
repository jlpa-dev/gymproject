export default [
  {
    path: '/',
    component: () => import('layouts/Public.vue'),
    children: [
      { path: '', component: () => import('src/pages/public/Index.vue'), name: 'inicio' }
    ]
  }
]
