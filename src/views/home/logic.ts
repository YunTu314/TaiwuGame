import { ref, computed } from 'vue'
import { useTabsStore } from '../../stores/tabs'
import { ElMessage } from 'element-plus'

// 导出主页面的逻辑钩子
export function useHomeLogic() {
  const tabsStore = useTabsStore()

  // 面板大小控制
  const paneSize = ref(70) // 左侧默认 70%

  // 模拟：右侧面板当前显示的内容
  const rightPanelContent = ref('详细信息面板')

  // 右侧四个角的按钮事件
  const handleCornerAction = (position: string) => {
    ElMessage.info(`点击了 ${position} 的功能按钮`)
    // 这里可以联动改变 activeTab 或者 rightPanelContent
    if (position === 'top-left') rightPanelContent.value = '菜单: 装备详情'
    if (position === 'bottom-right') rightPanelContent.value = '菜单: 召唤石'
  }

  // 监听 Tab 点击
  const handleTabClick = (tab: any) => {
    console.log('Switch tab:', tab.props.name)
    // 联动：切换 Tab 时，右侧面板可能也要变
    rightPanelContent.value = `正在浏览: ${tab.props.label} 的关联信息`
  }

  // 监听 Tab 移除
  const handleTabRemove = (targetName: string) => {
    tabsStore.removeTab(targetName)
  }

  return {
    tabsStore,
    paneSize,
    rightPanelContent,
    handleCornerAction,
    handleTabClick,
    handleTabRemove
  }
}