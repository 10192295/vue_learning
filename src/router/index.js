import { createRouter, createWebHistory } from 'vue-router'
import InputView from '../views/InputView.vue'
import LoginView from '../views/LoginView.vue'
import QuestionPage from '../views/question/QuestionPage.vue'
import SuccessPage from '../views/question/SuccessPage.vue'
import { useUserStore } from '../stores/user'

const routers = [
  {
    path: '/',
    name: 'home',
    component: QuestionPage
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
  },
  {
    path: '/question',
    name: 'question',
    component: QuestionPage,
  },
  {
    path: '/success/:score',
    name: 'success',
    component: SuccessPage
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
