<template>
  <div class="battle-scene">
    <h1>⚔️ 战斗画面 (Main Router View)</h1>
    <p>当前 URL: {{ route.path }}</p>
    
    <div class="actions">
      <el-button type="danger" @click="startBattle">开始战斗 (联动左下)</el-button>
      <el-button type="success" @click="goHome">回主页 (路由跳转)</el-button>
    </div>

    <div class="description">
      <p>测试点：</p>
      <ol>
        <li>在左上角创建一个“视频窗口”。</li>
        <li>点击这里的“开始战斗”，左下角会变成敌人信息，但左上角视频不会重置。</li>
        <li>点击“回主页”，右侧页面跳转，左侧所有内容依然保持原样。</li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useLayoutStore } from '../../stores/layout'

const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()

const startBattle = () => {
  // 核心：通过 Store 改变左下角的组件
  layoutStore.setLeftBottom('EnemyInfo', { 
    enemyName: 'Bahamut', 
    hp: 1000000 
  })
}

const goHome = () => {
  // 核心：路由跳转只影响右侧 router-view
  router.push('/home')
}
</script>

<style scoped>
.battle-scene { padding: 40px; text-align: center; }
.actions { margin: 20px 0; }
.description { text-align: left; background: #222; padding: 20px; border-radius: 8px; margin-top: 40px;}
</style>