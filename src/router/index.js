import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InputView from '../views/InputView.vue'
import LoginView from '../views/LoginView.vue'
import { useUserStore } from '../stores/user'

const routers = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/input',
    name: 'input',
    component: InputView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routers
})

router.beforeEach((to, from, next) => {
  const userAuth = useUserStore()
  const isAuth = !!userAuth.userAuth
  if (to.meta.requiresAuth && !isAuth) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
