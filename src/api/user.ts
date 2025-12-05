import request from '../utils/request'
import type { ApiResponse } from '../types/global'

export interface MenuOption {
  path: string
  name: string
  component: string
  meta: {
    title: string
    icon: string
  }
}

export function getUserMenu() {
  return request.get<any, ApiResponse<MenuOption[]>>('/api/user/menu')
}