<template>
  <div class="left-top-area">
    <LeftBrowserPane @add-tab="handleAddTab" />
  </div>
</template>

<script setup lang="ts">
import LeftBrowserPane from '../index.vue' // 假设你之前的组件还在 layout 目录下
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
  overflow: hidden;
  background-color: #000;
}
</style>