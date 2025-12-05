/**
 * 数字千分位格式化
 * 10000 -> "10,000"
 */
export const formatNumber = (num: number): string => {
  return num?.toLocaleString('en-US') || '0'
}

/**
 * 随机整数 (包含 min 和 max)
 * 用于前端模拟暴击、掉落等
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}