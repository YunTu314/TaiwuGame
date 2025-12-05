import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      // 配置 Mock 插件
      viteMockServe({
        // mock 文件存放的文件夹路径
        mockPath: 'mock',
        // 只有在开发环境 (serve) 下才开启 mock
        enable: command === 'serve', 
      }),
    ],
  }
})