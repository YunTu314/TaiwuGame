import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import router from './router' // 引入路由
import { usePermissionStore } from './stores/permission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入所有图标

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(pinia)
app.use(router) // 注册路由

// 注册所有图标（为了侧边栏动态图标）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// --- 路由守卫核心逻辑 ---
const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {
  const permissionStore = usePermissionStore()

  // 如果路由已经加载过，直接放行
  if (permissionStore.isRoutesLoaded) {
    if (to.matched.length === 0) {
        // 如果匹配不到路由（比如刷新后），可能是因为重定向问题，尝试跳回首页
        next('/home') 
    } else {
        next()
    }
  } else {
    // 如果没加载过，去请求接口
    try {
      const accessRoutes = await permissionStore.generateRoutes()
      
      // 动态添加到 router 实例中
      accessRoutes.forEach(route => {
        router.addRoute(route)
      })

      // replace: true 确保路由添加完成后再跳转，防止刷新白屏
      next({ ...to, replace: true })
    } catch (error) {
      next('/login') // 出错跳登录页(虽然还没做)
    }
  }
})

app.mount('#app')