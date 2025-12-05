import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import router from './router'
import { usePermissionStore } from './stores/permission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(pinia)
app.use(router) 

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// --- 路由守卫核心逻辑 ---
const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {
  const permissionStore = usePermissionStore()

  // 1. 如果路由已经加载过，直接放行
  if (permissionStore.isRoutesLoaded) {
    if (to.matched.length === 0) {
        // 如果匹配不到路由，跳转到首页
        next('/home') 
    } else {
        next()
    }
  } else {
    // 2. 如果路由没加载过
    
    // ✅ 核心修复：如果是白名单页面（如登录页），直接放行，不再去请求用户信息
    // 防止：请求失败 -> 跳/login -> /login不在路由表 -> 又进else -> 又请求 -> 死循环
    if (whiteList.includes(to.path)) {
      next()
      return
    }

    try {
      // 3. 请求菜单并动态添加路由
      const accessRoutes = await permissionStore.generateRoutes()
      
      accessRoutes.forEach(route => {
        router.addRoute(route)
      })

      // replace: true 确保路由添加完成后再跳转
      next({ ...to, replace: true })
    } catch (error) {
      console.error('路由加载失败:', error)
      // 出错跳转到登录页
      next('/login') 
    }
  }
})

app.mount('#app')