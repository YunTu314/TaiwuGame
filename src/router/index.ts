import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 注意：这里不再引入 MainLayout，因为 App.vue 已经是布局了
// 直接引入具体的页面
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
    meta: { title: '主页', leftBottom: 'LogPanel' }
  },
  {
    path: '/battle',
    name: 'Battle',
    // 假设你有 battle 页面，没有的话可以暂时指向 home 测试
    component: () => import('../views/battle/index.vue'), 
    meta: { 
      title: '战斗',
      leftBottom: 'EnemyInfo' // 定义左下角显示敌人
    }
  },
  {
    path: '/party',
    name: 'Party',
    component: () => import('../views/party/index.vue'),
    meta: { title: '编队', leftBottom: 'LogPanel' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router