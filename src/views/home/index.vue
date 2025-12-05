<script setup lang="ts">
// 移除了 Header/Footer 的逻辑，这里只需要处理主页内部逻辑
</script>

<template>
  <div class="home-content">
    <div class="content-placeholder">
      <div class="hero-image">
        <div class="char-sprite">MAIN CHARACTER</div>
      </div>
      
      <div class="game-buttons-grid">
         <div class="diamond-btn" @click="$router.push('/party')">编成</div>
         <div class="diamond-btn" @click="$router.push('/upgrade')">强化</div>
         <div class="diamond-btn">共斗</div>
         <div class="diamond-btn">卡池</div>
      </div>

      <div class="quests-area">
        <h3>QUESTS</h3>
        <div class="quest-item" v-for="i in 5" :key="i">
          Chapter {{ i }}: The Adventure Begins
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-content {
  min-height: 100%;
  /* 如果主页有特定背景图，放这里 */
  background-image: url('https://raw.githubusercontent.com/dy-sh/assets/master/bg-placeholder.jpg'); 
  background-size: cover;
  background-position: center;
  padding-bottom: 20px;
}

.content-placeholder {
  /* 样式保持原样 */
  .hero-image {
    height: 300px;
    display: flex; justify-content: center; align-items: center;
    .char-sprite { color: rgba(255,255,255,0.2); font-size: 24px; font-weight: bold; }
  }

  .game-buttons-grid {
    display: flex; justify-content: center; gap: 15px; margin-top: -40px; position: relative; z-index: 2;
    .diamond-btn {
      width: 50px; height: 50px; background: linear-gradient(135deg, #e0f7fa, #00bcd4); transform: rotate(45deg);
      border: 2px solid #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.5);
      display: flex; justify-content: center; align-items: center; color: #005662; font-size: 10px; font-weight: bold; cursor: pointer; font-family: monospace;
      &::before { content: attr(class); transform: rotate(-45deg); /* 修复文字旋转 */ }
    }
  }
  
  .quests-area {
    margin: 40px 10px; background: rgba(0,0,0,0.6); padding: 10px; border-radius: 4px; border: 1px solid #444;
    h3 { color: #ffd700; margin: 0 0 10px 0; border-bottom: 1px solid #555; }
    .quest-item { padding: 10px; background: #333; margin-bottom: 5px; color: #ddd; border-left: 3px solid #d32f2f; }
  }
}
</style>