import Vue from 'vue'
import VueRouter from 'vue-router'
import { isValidToken } from '@/services/auth.service'

Vue.use(VueRouter)

const Layout = () => import('@/layout/SApp')

const routeOptions = [
  { path: 'cartoes', name: 'cartoes/CartoesList', },
  { path: 'cartoes/cadastrar', name: 'cartoes/CartoesCreate' },
  { path: 'cartoes/:id', name: 'cartoes/CartoesEdit' },
]

const routes = routeOptions.map(route => {
  return {
    ...route,
    component: () => import( `@/views/${route.name}`)
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import('@/views/Login')
    },
    {
      path: '/',
      component: Layout,
      children: routes
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('hyperativa@accessToken')
  const user = JSON.parse(localStorage.getItem('hyperativa@user'))
  const { authorize } = to.meta
  if (to.name !== 'Login' && !isValidToken(token)) { next({ name: 'Login' }) }
  else if (user && !user.is_superuser && authorize && !user.roles.includes(authorize)) {
    Vue.$toast.open({
      message: "Você não tem permissão para executar esta ação",
      type: "error",
    })
  }
  else next()
})

export default router