<template>
  <div class="left-bottom-area">
    <div class="panel-header">
      {{ layoutStore.leftBottomComponent || 'INFO PANEL' }}
    </div>
    
    <div class="panel-body">
      <component 
        v-if="layoutStore.leftBottomComponent"
        :is="currentComponent" 
        v-bind="layoutStore.leftBottomProps" 
      />
      <div v-else class="empty-tip">等待指令...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '../../stores/layout'

// 异步引入组件 (按需加载)
const LogPanel = defineAsyncComponent(() => import('../../components/left/LogPanel.vue'))
// const EnemyInfo = defineAsyncComponent(() => import('../../components/left/EnemyInfo.vue'))
// 假设你还没有EnemyInfo，先用LogPanel代替测试
const EnemyInfo = LogPanel 

const layoutStore = useLayoutStore()
const route = useRoute()

// 组件映射表
const componentMap: Record<string, any> = {
  'LogPanel': LogPanel,
  'EnemyInfo': EnemyInfo
}

// 计算当前应该显示的组件
const currentComponent = computed(() => {
  return componentMap[layoutStore.leftBottomComponent] || null
})

// === 核心逻辑：监听路由变化，自动改变左下角 ===
watch(
  () => route.path,
  () => {
    // 检查路由元信息中是否有定义的默认左下角组件
    // 例如路由配置： { path: '/battle', meta: { leftBottom: 'EnemyInfo' } }
    if (route.meta.leftBottom) {
      layoutStore.setLeftBottom(route.meta.leftBottom as string)
    } else {
      // 如果路由没规定，就恢复默认（例如日志面板）
      layoutStore.setLeftBottom('LogPanel')
    }
  },
  { immediate: true } // 初始化时立即执行一次
)
</script>

<style scoped lang="scss">
.left-bottom-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #181818;
  
  .panel-header {
    height: 28px;
    line-height: 28px;
    background: #222;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    font-weight: bold;
    border-bottom: 1px solid #333;
    text-transform: uppercase;
  }
  
  .panel-body {
    flex: 1;
    overflow-y: auto;
    position: relative;
  }

  .empty-tip {
    padding: 20px;
    color: #444;
    text-align: center;
  }
}
</style>