import { defineStore } from 'pinia'
import { markRaw, type Component } from 'vue'

// 定义左上角 Tab 的结构
export interface BrowserTab {
  id: string
  title: string
  componentName: string // 对应 components 里的文件名
  props?: any // 传递参数
}

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    // === 左上：多标签浏览器系统 ===
    browserTabs: [] as BrowserTab[],
    activeTabId: '', 
    
    // === 左下：联动信息面板 ===
    // 这里存的是组件名称，或者直接存组件对象(markRaw)
    leftBottomComponent: 'LogPanel' as string, 
    leftBottomProps: {} as any
  }),

  actions: {
    // --- 左上角操作 ---
    addBrowserTab(title: string, componentName: string, props = {}) {
      const id = `${componentName}-${Date.now()}`
      this.browserTabs.push({ id, title, componentName, props })
      this.activeTabId = id
    },
    
    removeBrowserTab(id: string) {
      const index = this.browserTabs.findIndex(t => t.id === id)
      if (index !== -1) {
        this.browserTabs.splice(index, 1)
        // 如果关掉的是当前激活的，激活前一个
        if (this.activeTabId === id && this.browserTabs.length > 0) {
          this.activeTabId = this.browserTabs[Math.max(0, index - 1)].id
        }
      }
    },

    setActiveTab(id: string) {
      this.activeTabId = id
    },

    // --- 左下角联动操作 ---
    // 供右侧主窗口调用："我要打架了，左下角请显示敌人信息"
    setLeftBottom(componentName: string, props = {}) {
      this.leftBottomComponent = componentName
      this.leftBottomProps = props
    }
  }
})