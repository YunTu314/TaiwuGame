import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
  {
    url: '/api/player/info', // 模拟的接口地址
    method: 'get',           // 请求方法
    response: () => {
      // 返回的数据结构
      return {
        code: 0,
        message: 'success',
        data: {
          // 使用 Mock.Random 生成随机数据，让效果更真实
          'rank|1-200': 100,        // 随机 Rank 1-200
          'ap|0-150': 100,          // 当前 AP
          'max_ap': 150,            // 最大 AP
          'crystal|1000-10000': 100 // 随机水晶数量
        }
      }
    }
  }
] as MockMethod[]