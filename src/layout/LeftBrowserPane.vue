<template>
  <div class="browser-container">
    <div class="tab-bar">
      <div 
        v-for="tab in layoutStore.browserTabs" 
        :key="tab.id"
        class="tab-item"
        :class="{ active: layoutStore.activeTabId === tab.id }"
        @click="layoutStore.setActiveTab(tab.id)"
      >
        {{ tab.title }}
        <span class="close" @click.stop="layoutStore.removeBrowserTab(tab.id)">×</span>
      </div>
      <button class="add-btn" @click="emit('add-tab')">+</button>
    </div>

    <div class="content-area">
      <div 
        v-for="tab in layoutStore.browserTabs" 
        :key="tab.id"
        class="tab-content"
        v-show="layoutStore.activeTabId === tab.id"
      >
        <component :is="componentMap[tab.componentName]" :id="tab.id" v-bind="tab.props" />
      </div>
      
      <div v-if="layoutStore.browserTabs.length === 0" class="empty-state">
        点击 + 号开启新页面
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '../stores/layout'
import VideoPlayer from '../components/left/VideoPlayer.vue'
import WikiPage from '../components/left/WikiPage.vue'

const layoutStore = useLayoutStore()
const emit = defineEmits(['add-tab'])

// 组件映射表：将字符串名字映射为真实组件
const componentMap: Record<string, any> = {
  'VideoPlayer': VideoPlayer,
  'WikiPage': WikiPage
}
</script>

<style scoped lang="scss">
.browser-container { display: flex; flex-direction: column; height: 100%; background: #111; }
.tab-bar {
  display: flex; background: #000; border-bottom: 1px solid #333; height: 35px;
  .tab-item {
    padding: 0 15px; line-height: 34px; color: #888; cursor: pointer; border-right: 1px solid #222; font-size: 12px;
    &.active { background: #222; color: #fff; }
    .close { margin-left: 8px; &:hover { color: red; } }
  }
  .add-btn { background: none; border: none; color: #fff; cursor: pointer; padding: 0 10px; font-size: 18px; }
}
.content-area { flex: 1; position: relative; overflow: hidden; }
.tab-content { width: 100%; height: 100%; }
.empty-state { padding: 20px; color: #555; text-align: center; }
</style>