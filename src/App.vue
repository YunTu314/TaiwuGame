<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useLayoutStore } from './stores/layout'
// 引入需要的图标
import { 
  ArrowLeft, Refresh, ArrowLeftBold, RefreshRight, HomeFilled 
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

// 修复之前的循环引用问题，直接引用模块
import LeftTopArea from './layout/modules/LeftTopArea.vue'

// 异步组件
const LogPanel = defineAsyncComponent(() => import('./components/left/LogPanel.vue'))
const EnemyInfo = defineAsyncComponent(() => import('./components/left/EnemyInfo.vue'))

const componentMap: Record<string, any> = {
  'LogPanel': LogPanel,
  'EnemyInfo': EnemyInfo
}

const layoutStore = useLayoutStore()
const router = useRouter()
const route = useRoute()

// 布局状态
const leftSplitSize = ref(70) 
const leftTopHeight = ref(60)
const zoomLevel = ref(100) // 模拟缩放

// --- 顶部/底部栏的操作逻辑 (从Home移过来的) ---
const handleBack = () => router.back()
const handleReload = () => window.location.reload()
const handleGoHome = () => router.push('/home')
const handleMenu = () => console.log('Open Menu')

const handleAddTab = () => {
  const isVideo = Math.random() > 0.5
  layoutStore.addBrowserTab(
    isVideo ? '视频窗口' : 'Wiki攻略',
    isVideo ? 'VideoPlayer' : 'WikiPage'
  )
}

// ✅ 新增：添加带安全检查的 resize 处理函数
const handleMainResize = (event: any) => {
  // 只有当 event 存在且有第一个元素时才赋值
  if (event && event[0]) {
    leftSplitSize.value = event[0].size
  }
}

const handleLeftResize = (event: any) => {
  if (event && event[0]) {
    leftTopHeight.value = event[0].size
  }
}
</script>

<template>
  <div class="app-container dark">
    <splitpanes class="main-split" @resize="handleMainResize">
      
      <pane :size="leftSplitSize" :max-size="70">
        <splitpanes horizontal @resize="handleLeftResize">
          <pane :size="leftTopHeight" style="overflow: hidden;">
            <LeftTopArea @add-tab="handleAddTab" />
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

      <pane :size="100 - leftSplitSize" :min-size="30" class="main-stage-container">
        
        <header class="gbf-header" v-if="!route.meta.hideUI">
          <div class="browser-bar">
            <div class="browser-controls">
              <el-icon class="b-icon" @click="handleBack"><ArrowLeft /></el-icon>
              <el-icon class="b-icon" @click="handleReload"><Refresh /></el-icon>
              <div class="url-placeholder">{{ route.meta.title || 'Granblue Fantasy' }}</div>
            </div>
            <div class="browser-menu-dots"><span>●</span><span>●</span><span>●</span></div>
          </div>
          <div class="game-nav-bar">
            <div class="orb-btn-wrapper" @click="handleGoHome">
              <div class="orb-btn cyan"><span class="orb-text">Top</span></div>
            </div>
            <div class="location-bar">
              <div class="loc-text">
                <span class="realm">Current Page</span>
                <span class="island">{{ route.name }}</span>
              </div>
            </div>
            <div class="orb-btn-wrapper" @click="handleMenu">
              <div class="orb-btn blue"><span class="orb-text">Menu</span></div>
            </div>
          </div>
        </header>

        <main class="gbf-main-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>

        <footer class="gbf-footer" v-if="!route.meta.hideUI">
          <div class="footer-btn small" @click="handleBack">
            <div class="glass-bg">
              <el-icon><ArrowLeftBold /></el-icon>
              <span>Back</span>
            </div>
          </div>
          <div class="resize-control">
            <div class="resize-track">
               <el-icon><ArrowLeft /></el-icon>
               <span class="zoom-val">{{ zoomLevel }}</span>
               <el-icon><ArrowLeft style="transform: rotate(180deg)" /></el-icon>
            </div>
          </div>
          <div class="footer-btn small" @click="handleReload">
            <div class="glass-bg">
              <el-icon><RefreshRight /></el-icon>
              <span>Rel.</span>
            </div>
          </div>
          <div class="footer-btn large" @click="handleGoHome">
            <div class="glass-bg">
              <el-icon><HomeFilled /></el-icon>
              <span>MyPage</span>
            </div>
          </div>
        </footer>

      </pane>

    </splitpanes>
  </div>
</template>

<style>
/* 全局样式保持 */
html, body, #app { margin: 0; height: 100%; overflow: hidden; background: #000; color: #fff; }
.splitpanes__splitter { background: #1f1f1f !important; border: 1px solid #333; position: relative; }
</style>

<style scoped lang="scss">
.app-container { width: 100%; height: 100%; }

/* 左下角面板样式 */
.left-bottom-pane {
  background: #181818; 
  border-top: 1px solid #333; 
  display: flex; 
  flex-direction: column;
  .panel-header { background: #222; padding: 5px 10px; font-size: 12px; color: #666; font-weight: bold; border-bottom: 1px solid #333;}
  .panel-body { flex: 1; overflow-y: auto; }
}

/* === 右侧主容器 Flex 布局 === */
.main-stage-container {
  display: flex;
  flex-direction: column;
  background: #121212;
  border-left: 1px solid #333;
  height: 100%; /* 确保填满 Pane */
}

/* 内容区自适应，占据剩余空间 */
.gbf-main-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
  /* 可以在这里加一个通用的背景纹理 */
  background: #0f1218; 
  
  /* 滚动条样式 */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #555; }
}

/* === 以下是原 Home 页面的 Header/Footer 样式 (复制过来) === */
.gbf-header {
  flex-shrink: 0; z-index: 10; background: #1a1a1a; border-bottom: 2px solid #5a4b35;
}
.browser-bar {
  background: #dedede; height: 30px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; color: #333;
  .browser-controls { display: flex; align-items: center; gap: 15px; flex: 1; 
    .b-icon { font-size: 18px; cursor: pointer; color: #555; }
    .url-placeholder { background: #fff; border-radius: 12px; padding: 2px 10px; font-size: 12px; color: #666; flex: 0.8; }
  }
  .browser-menu-dots { color: #666; letter-spacing: 2px; font-size: 8px; }
}
.game-nav-bar {
  height: 50px; background: #2b3648; display: flex; align-items: center; justify-content: space-between; padding: 0 5px; position: relative; box-shadow: 0 2px 5px rgba(0,0,0,0.5);
}
.orb-btn-wrapper {
  width: 46px; height: 46px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 2;
  .orb-btn {
    width: 40px; height: 40px; border-radius: 50%; border: 2px solid #a89458;
    box-shadow: inset 0 0 5px #fff, 0 2px 4px rgba(0,0,0,0.5);
    display: flex; justify-content: center; align-items: center; position: relative;
    .orb-text { color: #fff; font-weight: bold; font-size: 10px; text-shadow: 0 1px 2px #000; z-index: 2; }
    &::after { content: ''; position: absolute; top: 2px; left: 8px; width: 20px; height: 10px; background: rgba(255,255,255,0.4); border-radius: 50%; }
    &.cyan { background: radial-gradient(circle at 30% 30%, #4ddeff, #006c8a); }
    &.blue { background: radial-gradient(circle at 30% 30%, #4d9eff, #003a8a); }
    &:active { transform: scale(0.95); }
  }
}
.location-bar {
  flex: 1; height: 32px; margin: 0 -10px; background: linear-gradient(to bottom, #f3eac8, #bba774); border: 1px solid #5e4b25; border-radius: 4px; display: flex; align-items: center; justify-content: center; z-index: 1;
  .loc-text { font-size: 12px; color: #3e2b16; font-weight: bold; display: flex; flex-direction: column; align-items: center; line-height: 1.1; .realm { font-size: 9px; opacity: 0.8; } }
}

.gbf-footer {
  height: 50px; background: linear-gradient(to bottom, rgba(50,50,50,0.9), rgba(20,20,20,1)); border-top: 2px solid #666; display: flex; align-items: center; justify-content: space-between; padding: 0 5px; flex-shrink: 0;
}
.footer-btn {
  height: 40px; position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center;
  &.small { width: 50px; } &.large { width: 60px; }
  .glass-bg {
    width: 100%; height: 100%; background: radial-gradient(circle at 50% 0%, #3e8ebf, #0d3a58); border: 1px solid #6cbbe6; border-radius: 0 0 15px 15px; border-top: none; box-shadow: 0 2px 4px #000; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff;
    .el-icon { font-size: 16px; margin-bottom: 2px; }
    span { font-size: 9px; font-weight: bold; text-shadow: 0 1px 1px #000; }
  }
  &:active .glass-bg { background: #0d3a58; transform: translateY(1px); }
  &.large .glass-bg { border-radius: 50%; width: 50px; height: 50px; margin-top: -10px; border: 2px solid #ffd700; background: radial-gradient(circle at 30% 30%, #1a9cff, #002f6c); }
}
.resize-control {
  flex: 1; margin: 0 5px; height: 24px; background: #111; border: 1px solid #444; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative;
  .resize-track { display: flex; align-items: center; gap: 10px; color: #888; font-size: 12px; }
}
</style>