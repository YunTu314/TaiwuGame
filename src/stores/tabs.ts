import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TabItem {
  title: string
  name: string // 唯一标识，通常用路径或ID
  content?: string // 暂存内容，或者组件名
  closable?: boolean
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    activeTabName: 'dashboard', // 当前激活的 Tab
    tabs: [
      { title: '仪表盘', name: 'dashboard', closable: false },
      { title: '任务列表', name: 'quest', closable: true }
    ] as TabItem[]
  }),
  actions: {
    addTab(tab: TabItem) {
      // 如果已存在，则激活它
      const exist = this.tabs.find(t => t.name === tab.name)
      if (!exist) {
        this.tabs.push(tab)
      }
      this.activeTabName = tab.name
    },
    removeTab(targetName: string) {
      const tabs = this.tabs
      let activeName = this.activeTabName
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.activeTabName = activeName
      this.tabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
})