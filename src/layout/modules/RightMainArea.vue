<template>
  <div class="right-main-area">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.right-main-area {
  height: 100%;
  width: 100%;
  background-color: #121212;
  position: relative;
  /* 必须加 overflow: hidden，否则页面内容溢出可能会破坏布局 */
  overflow: hidden; 
}

/* 简单的切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>