import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '../types/global'

// 1. 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: '', 
  timeout: 5000
})

// 2. 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 3. 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // res 是后端返回的完整数据结构 { code, message, data }
    const res = response.data as ApiResponse

    if (res.code !== 0) {
      ElMessage.error(res.message || '系统错误')
      if (res.code === 401) {
        // handle login redirect
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 🟢 修复点在这里：
      // 我们返回了 res (ApiResponse类型)，但 TS 想要 AxiosResponse。
      // 使用 'as any' 强制类型转换，允许我们将剥离后的数据传递下去。
      return res as any
    }
  },
  (error: any) => {
    console.error('Request Err:', error)
    ElMessage.error(error.message || '网络请求失败')
    return Promise.reject(error)
  }
)

export default service