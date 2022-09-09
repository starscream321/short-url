import { createRouter, createWebHistory } from 'vue-router'

import AppLogin from "@/pages/AppLogin";


const registration = () => import('/src/pages/AppRegister')
const mainPage = () => import('/src/pages/AppMain')

const routes = [
  {
    path: '/',
    component: AppLogin
  },
  {
    path: '/register',
    name: 'register',
    component: registration()
  },
  {
    path: '/home',
    name: 'home',
    component: mainPage()
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
