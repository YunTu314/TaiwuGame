<template>
  <div class="enemy-container">
    <div class="header">
      <h3 class="title">⚔️ ENEMY INFO</h3>
      <span class="status-badge">BATTLE</span>
    </div>
    
    <div class="content">
      <div class="info-row">
        <span class="label">Target:</span>
        <span class="value name">{{ enemyName || 'Unknown' }}</span>
      </div>
      
      <div class="info-row">
        <span class="label">HP:</span>
        <div class="hp-bar-bg">
          <div class="hp-bar-fill" style="width: 80%"></div>
        </div>
        <span class="value hp">{{ hp }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ 接收外部传入的参数
defineProps<{ 
  enemyName?: string
  hp?: number 
}>()
</script>

<style scoped lang="scss">
.enemy-container {
  padding: 15px;
  background: linear-gradient(to bottom, #2a0e0e, #000); /* 红色调，表示危险 */
  height: 100%;
  box-sizing: border-box;
  color: #ddd;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #5a1e1e;
  padding-bottom: 5px;
  margin-bottom: 15px;
  
  .title { margin: 0; color: #ff4d4f; font-size: 14px; }
  .status-badge { background: #d32f2f; padding: 2px 6px; font-size: 10px; border-radius: 4px; color: #fff; }
}

.info-row {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  .label { width: 60px; color: #888; font-size: 12px; }
  .value { font-weight: bold; font-family: monospace; }
  .name { color: #fff; font-size: 16px; }
  .hp { margin-left: 10px; color: #52c41a; }
  
  .hp-bar-bg {
    flex: 1;
    height: 8px;
    background: #333;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    .hp-bar-fill {
      height: 100%;
      background: #52c41a;
    }
  }
}
</style>