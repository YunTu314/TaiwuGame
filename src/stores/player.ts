import { defineStore } from 'pinia'
import localforage from 'localforage'
import { ElMessage } from 'element-plus'
import { getPlayerInfo, type PlayerInfo } from '../api/player' // 引入我们拆分出去的 API

// 配置数据库名称
localforage.config({
  name: 'gbf-web-game'
})

export const usePlayerStore = defineStore('player', {
  state: () => ({
    // 玩家基础信息
    playerInfo: {
      rank: 0,
      ap: 0,
      max_ap: 0,
      crystal: 0
    } as PlayerInfo,
    // 数据是否加载完毕（控制页面 Loading 状态）
    isLoaded: false
  }),

  actions: {
    /**
     * 初始化游戏
     * 逻辑：优先读取本地存档 -> 如果没有存档，则请求接口开启新游戏
     */
    async initGame() {
      try {
        const savedData = await localforage.getItem<PlayerInfo>('player_save_data')

        if (savedData) {
          // --- 读档模式 ---
          this.playerInfo = savedData
          console.log('✅ [System] 存档读取成功')
          this.isLoaded = true
        } else {
          // --- 新游戏模式 ---
          console.log('⚠️ [System] 无存档，正在初始化新游戏数据...')
          await this.fetchFromApi()
        }
      } catch (error) {
        console.error('❌ [System] 游戏初始化严重失败:', error)
        ElMessage.error('游戏数据加载失败，请刷新重试')
      }
    },

    /**
     * 从后端 API 获取最新数据
     * 通常用于：新游戏初始化、强制同步服务器数据
     */
    async fetchFromApi() {
      try {
        // 调用 api/player.ts 中封装的方法
        const res = await getPlayerInfo()
        
        // request.ts 拦截器保证了代码能走到这里说明 code === 0
        this.playerInfo = res.data
        
        // 获取完数据后，立即保存一份到本地
        await this.saveGame(true)
        this.isLoaded = true
        
      } catch (error) {
        console.error('API 请求失败', error)
        // 这里不需要弹窗，因为 request.ts 已经弹过了
      }
    },

    /**
     * 保存游戏到 IndexedDB
     * @param silent 是否静默保存（不显示成功提示），默认 false
     */
    async saveGame(silent = false) {
      try {
        // 使用 JSON.parse(JSON.stringify(...)) 深拷贝，防止引用问题（虽然对简单对象一般没事）
        const dataToSave = JSON.parse(JSON.stringify(this.playerInfo))
        await localforage.setItem('player_save_data', dataToSave)
        
        if (!silent) {
          ElMessage.success('游戏进度已保存')
        }
      } catch (error) {
        console.error('保存失败:', error)
        ElMessage.error('存档失败！请检查浏览器存储空间')
      }
    },

    /**
     * 消耗 AP 测试方法
     * @param amount 消耗数量
     */
    consumeAp(amount: number) {
      if (this.playerInfo.ap >= amount) {
        this.playerInfo.ap -= amount
        // 状态变更后，自动静默保存
        this.saveGame(true)
      } else {
        ElMessage.warning('AP 不足，无法行动！')
      }
    }
  }
})