// 通用的接口响应格式
// T 代表具体的 data 类型，默认是 any
export interface ApiResponse<T = any> {
  code: number    // 状态码，例如 0 为成功
  message: string // 提示信息
  data: T         // 具体业务数据
}