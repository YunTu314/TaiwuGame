<script setup lang="ts">
import { ref } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

// 引入三个拆分好的模块
import LeftTopArea from './modules/LeftTopArea.vue'
import LeftBottomArea from './modules/LeftBottomArea.vue'
import RightMainArea from './modules/RightMainArea.vue'

// 布局状态
const leftSplitSize = ref(70) // 左侧总宽
const leftTopHeight = ref(60) // 左上高度
</script>

<template>
  <div class="main-layout dark">
    <splitpanes class="main-split" @resize="leftSplitSize = $event[0].size">
      
      <pane :size="leftSplitSize" :max-size="70">
        <splitpanes horizontal @resize="leftTopHeight = $event[0].size">
          
          <pane :size="leftTopHeight">
            <LeftTopArea />
          </pane>

          <pane :size="100 - leftTopHeight">
            <LeftBottomArea />
          </pane>

        </splitpanes>
      </pane>

      <pane :size="100 - leftSplitSize" :min-size="30">
        <RightMainArea />
      </pane>

    </splitpanes>
  </div>
</template>

<style scoped>
.main-layout {
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
</style>