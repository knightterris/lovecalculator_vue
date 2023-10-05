import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewCount from '../views/ViewsPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/personTwo',
    name: 'personTwo',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/views',
    name: 'views',
    component: ViewCount
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
