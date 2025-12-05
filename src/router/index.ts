import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 静态路由：任何用户都能访问的（如登录页、404等）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home' // 默认跳去home，但home现在还没注册，稍后动态添加
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router