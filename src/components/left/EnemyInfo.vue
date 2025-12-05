<template>
  <div class="video-mock">
    <h3>📺 模拟视频播放 (Tab ID: {{ id }})</h3>
    <p>切换到其他 Tab 或操作右侧路由，我不应该停止。</p>
    <div class="timer">{{ time }}s</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
defineProps<{ id: string }>()

const time = ref(0)
let timer: any = null

onMounted(() => {
  timer = setInterval(() => { time.value++ }, 1000)
})
onUnmounted(() => { clearInterval(timer) })
</script>

<style scoped>
.video-mock { background: #330000; padding: 10px; border: 1px solid red; height: 100%; }
.timer { font-size: 24px; font-weight: bold; color: red; }
</style>