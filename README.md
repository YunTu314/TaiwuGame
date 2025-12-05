# GBF Web Game Project 开发进度文档

## 1. 项目概述
本项目旨在从零构建一个基于 Web 技术的 RPG 网页游戏，复刻经典的《碧蓝幻想》(GBF) 风格 UI 与游戏模式。
- **核心框架**: Vue 3 + TypeScript + Vite
- **UI 组件库**: Element Plus (暗黑模式)
- **状态管理**: Pinia
- **路由管理**: Vue Router (动态路由)
- **数据模拟**: Mock.js + vite-plugin-mock
- **本地存储**: LocalForage (IndexedDB 封装)

---

## 2. 目录结构说明

```text
src/
├── api/             # API 接口层 (User, Player) - 实现接口与业务解耦
├── assets/          # 静态资源 (图片, 样式)
├── components/      # 公共组件库
├── mock/            # Mock 数据定义 (模拟后端 API 返回)
├── router/          # 路由配置 (含基础路由)
├── stores/          # Pinia 全局状态管理
│   ├── player.ts    # 玩家数据 (Rank, AP, Crystal, 持久化存储)
│   └── permission.ts# 权限路由 (动态生成侧边栏)
├── types/           # TS 全局类型定义 (ApiResponse 等)
├── utils/           # 工具库
│   ├── request.ts   # Axios 二次封装 (统一拦截器, 错误处理)
│   └── format.ts    # 数据格式化 (数字千分位等)
├── views/           # 页面视图
│   ├── home/        # 首页 (My Page)
│   └── party/       # 编队页面
├── App.vue          # 根组件 (布局入口, 侧边栏与头部状态栏)
└── main.ts          # 项目入口 (插件注册, 路由守卫)