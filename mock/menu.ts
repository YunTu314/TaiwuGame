import { MockMethod } from 'vite-plugin-mock'

// 模拟的路由表数据
const menuList = [
  {
    path: '/home',
    name: 'Home',
    component: 'home/index', // 注意：这里是相对 views 目录的字符串
    meta: { title: 'My Page', icon: 'Compass' }
  },
  {
    path: '/party',
    name: 'Party',
    component: 'party/index',
    meta: { title: '编队 (Party)', icon: 'Cpu' }
  },
  {
    path: '/upgrade',
    name: 'Upgrade',
    component: 'party/index', // 暂时也指向party，实际开发请新建对应文件
    meta: { title: '强化 (Upgrade)', icon: 'Management' }
  },
  {
    path: '/gacha',
    name: 'Gacha',
    component: 'party/index', // 暂时也指向party
    meta: { title: '卡池 (Gacha)', icon: 'Promotion' }
  }
]

export default [
  {
    url: '/api/user/menu',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: menuList
      }
    }
  }
] as MockMethod[]