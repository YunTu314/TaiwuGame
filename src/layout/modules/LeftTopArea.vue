<template>
  <div class="left-top-area">
    <div class="browser-mock-container">
       <div class="browser-toolbar">
         <el-button size="small" @click="handleAddTab">➕ 新增 Tab</el-button>
       </div>
       <div class="browser-content">
         <p style="color: gray; text-align: center; margin-top: 20px;">
            左上角浏览器区域 (LeftTopArea)
         </p>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ❌ 删除错误的循环引用
// import LeftBrowserPane from '../index.vue' 

import { useLayoutStore } from '../../stores/layout'

const layoutStore = useLayoutStore()

const handleAddTab = () => {
  const isVideo = Math.random() > 0.5
  layoutStore.addBrowserTab(
    isVideo ? '视频窗口' : 'Wiki攻略',
    isVideo ? 'VideoPlayer' : 'WikiPage'
  )
}
</script>

<style scoped>
.left-top-area {
  height: 100%;
  width: 100%;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
}
.browser-toolbar {
  padding: 5px;
  background: #222;
  border-bottom: 1px solid #333;
}
.browser-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}
</style>