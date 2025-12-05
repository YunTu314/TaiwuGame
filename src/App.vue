<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useLayoutStore } from './stores/layout'
import LeftBrowserPane from './layout/index.vue'

// 使用异步组件引入，优化性能
const LogPanel = defineAsyncComponent(() => import('./components/left/LogPanel.vue'))
const EnemyInfo = defineAsyncComponent(() => import('./components/left/EnemyInfo.vue'))

// ✅ 核心修复：建立组件映射表，把 store 里的字符串映射为真实组件
const componentMap: Record<string, any> = {
  'LogPanel': LogPanel,
  'EnemyInfo': EnemyInfo
}

const layoutStore = useLayoutStore()

// === 核心布局参数调整 ===
// 左侧初始占比 70% (意味着右侧是 30%)
const leftSplitSize = ref(70) 

// 左上视窗初始高度占比 60%
const leftTopHeight = ref(60) 

// 模拟添加 Tab 的逻辑
const handleAddTab = () => {
  const isVideo = Math.random() > 0.5
  layoutStore.addBrowserTab(
    isVideo ? '视频窗口' : 'Wiki攻略',
    isVideo ? 'VideoPlayer' : 'WikiPage'
  )
}
</script>

<template>
  <div class="app-container dark">
    <splitpanes class="main-split" @resize="leftSplitSize = $event[0].size">
      
      <pane :size="leftSplitSize" :max-size="70">
        <splitpanes horizontal @resize="leftTopHeight = $event[0].size">
          
          <pane :size="leftTopHeight" style="overflow: hidden;">
            <LeftBrowserPane @add-tab="handleAddTab" />
          </pane>

          <pane :size="100 - leftTopHeight" class="left-bottom-pane">
            <div class="panel-header">LINKAGE PANEL</div>
            <div class="panel-body">
              <component 
                v-if="layoutStore.leftBottomComponent"
                :is="componentMap[layoutStore.leftBottomComponent] || null" 
                v-bind="layoutStore.leftBottomProps" 
              />
              <div v-else style="color: #666; padding: 20px;">等待指令...</div>
            </div>
          </pane>

        </splitpanes>
      </pane>

      <pane :size="100 - leftSplitSize" :min-size="30" class="main-stage">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
             <component :is="Component" />
          </transition>
        </router-view>
      </pane>

    </splitpanes>
  </div>
</template>

<style>
/* 全局重置 */
html, body, #app { margin: 0; height: 100%; overflow: hidden; background: #000; color: #fff; }

/* 调整分割条样式，增加一点可见度 */
.splitpanes__splitter { 
  background: #1f1f1f !important; 
  border: 1px solid #333; 
  position: relative;
}
.splitpanes__splitter:hover {
  background: #409eff !important;
}
</style>

<style scoped lang="scss">
.app-container { width: 100%; height: 100%; }

.left-bottom-pane {
  background: #181818; 
  border-top: 1px solid #333; 
  display: flex; 
  flex-direction: column;
  
  .panel-header { 
    background: #222; 
    padding: 5px 10px; 
    font-size: 12px; 
    color: #666; 
    font-weight: bold; 
    border-bottom: 1px solid #333;
  }
  .panel-body { 
    flex: 1; 
    overflow-y: auto; 
  }
}

.main-stage {
  background: #121212; 
  position: relative;
  border-left: 1px solid #333;
}
</style>