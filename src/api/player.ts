import request from '../utils/request'
import type { ApiResponse } from '../types/global'

export interface PlayerInfo {
  rank: number
  ap: number
  max_ap: number
  crystal: number
}

// 获取玩家信息
export function getPlayerInfo() {
  // request.get<T, R>
  // T: 请求体类型 (GET通常不需要，给 any)
  // R: 响应体类型 (我们要的是 ApiResponse<PlayerInfo>)
  return request.get<any, ApiResponse<PlayerInfo>>('/api/player/info')
}