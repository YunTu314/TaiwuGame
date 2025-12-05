import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
// 引入 API 方法
import { getUserMenu } from '../api/user' 

const modules = import.meta.glob('../views/**/*.vue')

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menuRoutes: [] as RouteRecordRaw[],
    isRoutesLoaded: false
  }),

  actions: {
    async generateRoutes() {
      try {
        // ✅ 改造点：使用封装的 API
        const res = await getUserMenu() 
        // 因为 request.ts 里拦截器已经处理了 code!==0 的情况，这里 res 就是后端返回的 body
        const asyncRoutesData = res.data 

        const accessedRoutes = asyncRoutesData.map(item => {
          return {
            path: item.path,
            name: item.name,
            meta: item.meta,
            component: modules[`../views/${item.component}.vue`]
          } as RouteRecordRaw
        })

        this.menuRoutes = accessedRoutes
        this.isRoutesLoaded = true
        return accessedRoutes
      } catch (error) {
        console.error('路由获取失败', error)
        throw error // 抛出错误给路由守卫捕获
      }
    }
  }
})