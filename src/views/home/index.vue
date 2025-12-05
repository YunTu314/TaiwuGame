<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, Refresh, House, Menu, 
  ArrowLeftBold, RefreshRight, HomeFilled 
} from '@element-plus/icons-vue'

const router = useRouter()

// 模拟页面缩放数值
const zoomLevel = ref(100)

// 页面操作逻辑
const handleBack = () => {
  console.log('Go Back')
  router.back() // 尝试路由后退
}

const handleReload = () => {
  console.log('Reload Page')
  // 实际开发中可能通过 key 强刷组件
  window.location.reload()
}

const handleGoHome = () => {
  console.log('Go Home')
  router.push('/home')
}

const handleMenu = () => {
  console.log('Open Menu')
}
</script>

<template>
  <div class="gbf-container">
    
    <header class="gbf-header">
      
      <div class="browser-bar">
        <div class="browser-controls">
          <el-icon class="b-icon" @click="handleBack"><ArrowLeft /></el-icon>
          <el-icon class="b-icon" @click="handleReload"><Refresh /></el-icon>
          <div class="url-placeholder">小号 - グランブルーファンタジー</div>
        </div>
        <div class="browser-menu-dots">
          <span>●</span><span>●</span><span>●</span>
        </div>
      </div>

      <div class="game-nav-bar">
        
        <div class="orb-btn-wrapper" @click="handleGoHome">
          <div class="orb-btn cyan">
            <span class="orb-text">Top</span>
          </div>
        </div>

        <div class="location-bar">
          <div class="loc-text">
            <span class="realm">イデルバ王国領</span>
            <span class="island">グロース島</span>
          </div>
          <div class="loc-decoration-l"></div>
          <div class="loc-decoration-r"></div>
        </div>

        <div class="orb-btn-wrapper" @click="handleMenu">
          <div class="orb-btn blue">
            <span class="orb-text">Menu</span>
          </div>
        </div>

      </div>
    </header>

    <main class="gbf-content">
      <div class="content-placeholder">
        <div class="hero-image">
          <div class="char-sprite">MAIN CHARACTER</div>
        </div>
        
        <div class="game-buttons-grid">
           <div class="diamond-btn">编成</div>
           <div class="diamond-btn">强化</div>
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
    </main>

    <footer class="gbf-footer">
      
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
          <span>Reload</span>
        </div>
      </div>

      <div class="footer-btn large" @click="handleGoHome">
        <div class="glass-bg">
          <el-icon><HomeFilled /></el-icon>
          <span>My Page</span>
        </div>
      </div>

    </footer>

  </div>
</template>

<style scoped lang="scss">
/* === 基础容器 === */
.gbf-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #0f1218; /* 深色背景 */
  font-family: 'Helvetica Neue', Arial, sans-serif;
  overflow: hidden;
  position: relative;
}

/* === 1. 顶部样式 === */
.gbf-header {
  flex-shrink: 0;
  z-index: 10;
  background: #1a1a1a;
  border-bottom: 2px solid #5a4b35; /* 金色边框 */
}

/* 浏览器模拟条 */
.browser-bar {
  background: #dedede;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: #333;
  
  .browser-controls {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
    
    .b-icon { font-size: 18px; cursor: pointer; color: #555; }
    .url-placeholder {
      background: #fff;
      border-radius: 12px;
      padding: 2px 10px;
      font-size: 12px;
      color: #666;
      flex: 0.8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .browser-menu-dots {
    color: #666;
    letter-spacing: 2px;
    font-size: 8px;
  }
}

/* 游戏导航条 (水晶球部分) */
.game-nav-bar {
  height: 50px;
  background: #2b3648; /* 深蓝底色 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  position: relative;
  box-shadow: 0 2px 5px rgba(0,0,0,0.5);
}

/* 水晶球按钮通用样式 */
.orb-btn-wrapper {
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2; /* 浮在装饰条上面 */
  
  .orb-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #a89458; /* 金边 */
    box-shadow: 
      inset 0 0 5px #fff,
      0 2px 4px rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
    .orb-text {
      color: #fff;
      font-weight: bold;
      font-size: 10px;
      text-shadow: 0 1px 2px #000;
      z-index: 2;
    }

    /* 高光效果 */
    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 8px;
      width: 20px;
      height: 10px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
    }

    /* 颜色变种 */
    &.cyan {
      background: radial-gradient(circle at 30% 30%, #4ddeff, #006c8a);
    }
    &.blue {
      background: radial-gradient(circle at 30% 30%, #4d9eff, #003a8a);
    }
    
    &:active { transform: scale(0.95); }
  }
}

/* 中间位置条 */
.location-bar {
  flex: 1;
  height: 32px;
  margin: 0 -10px; /* 稍微伸展到按钮后面 */
  background: linear-gradient(to bottom, #f3eac8, #bba774); /* 金色金属质感 */
  border: 1px solid #5e4b25;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  .loc-text {
    font-size: 12px;
    color: #3e2b16;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.1;
    
    .realm { font-size: 9px; opacity: 0.8; }
  }
}

/* === 2. 内容区域 === */
.gbf-content {
  flex: 1;
  overflow-y: auto;
  background-image: url('https://raw.githubusercontent.com/dy-sh/assets/master/bg-placeholder.jpg'); /* 只有颜色也可以 */
  background-size: cover;
  background-position: center;
  position: relative;

  /* 滚动条隐藏或美化 */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #555; }
}

.content-placeholder {
  padding-bottom: 80px; /* 留出底部Footer空间 */
  
  .hero-image {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .char-sprite {
      color: rgba(255,255,255,0.2);
      font-size: 24px;
      font-weight: bold;
    }
  }

  .game-buttons-grid {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: -40px; /* 稍微重叠上去 */
    position: relative;
    z-index: 2;
    
    .diamond-btn {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #e0f7fa, #00bcd4);
      transform: rotate(45deg);
      border: 2px solid #fff;
      box-shadow: 0 4px 6px rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #005662;
      font-size: 10px;
      font-weight: bold;
      cursor: pointer;
      font-family: monospace;
      
      /* 文字转回来 */
      &::before {
        content: attr(class); /* hacky way to prevent text rotation, but simple text needs wrapper */
      }
    }
  }
  
  .quests-area {
    margin: 40px 10px;
    background: rgba(0,0,0,0.6);
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #444;
    
    h3 { color: #ffd700; margin: 0 0 10px 0; border-bottom: 1px solid #555; }
    .quest-item {
      padding: 10px;
      background: #333;
      margin-bottom: 5px;
      color: #ddd;
      border-left: 3px solid #d32f2f;
    }
  }
}

/* === 3. 底部区域 === */
.gbf-footer {
  height: 50px;
  background: 
    linear-gradient(to bottom, rgba(50,50,50,0.9), rgba(20,20,20,1)),
    url(''); /* 可以加一个复杂的纹理背景 */
  border-top: 2px solid #666;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.footer-btn {
  height: 40px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.small { width: 50px; }
  &.large { width: 60px; }

  /* 玻璃按钮样式 */
  .glass-bg {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, #3e8ebf, #0d3a58);
    border: 1px solid #6cbbe6;
    border-radius: 0 0 15px 15px; /* 下方圆角，上方直角或者微圆 */
    border-top: none; /* 贴合底部 */
    box-shadow: 0 2px 4px #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    
    .el-icon { font-size: 16px; margin-bottom: 2px; }
    span { font-size: 9px; font-weight: bold; text-shadow: 0 1px 1px #000; }
  }
  
  &:active .glass-bg {
    background: #0d3a58;
    transform: translateY(1px);
  }
}

/* 底部我的页面按钮特殊处理 (圆形突出) */
.footer-btn.large .glass-bg {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-top: -10px; /* 突出显示 */
  border: 2px solid #ffd700; /* 金边 */
  background: radial-gradient(circle at 30% 30%, #1a9cff, #002f6c);
}

/* 缩放控制条 */
.resize-control {
  flex: 1;
  margin: 0 5px;
  height: 24px;
  background: #111;
  border: 1px solid #444;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  .resize-track {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #888;
    font-size: 12px;
    
    .el-icon { cursor: pointer; &:hover { color: #fff; } }
    .zoom-val { color: #fff; font-family: monospace; }
  }
  
  /* 装饰用的金属边框感 */
  &::before {
    content: '';
    position: absolute;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    border: 1px solid #333;
    border-radius: 14px;
    z-index: -1;
  }
}
</style>