// src/types/splitpanes.d.ts

declare module 'splitpanes' {
  import { DefineComponent } from 'vue'

  // 定义 Splitpanes 组件
  export const Splitpanes: DefineComponent<{
    horizontal?: boolean
    pushOtherPanes?: boolean
    dblClickSplitter?: boolean
    rtl?: boolean
    firstSplitter?: boolean
    class?: string
    style?: any
    // 事件定义
    onResize?: (e: { size: number }[]) => void
    onResized?: (e: { size: number }[]) => void
    onPaneMaximize?: (e: any) => void
    onPaneClick?: (e: any) => void
    onReady?: () => void
    onSplitterClick?: () => void
  }>

  // 定义 Pane 组件
  export const Pane: DefineComponent<{
    size?: number | string
    minSize?: number | string
    maxSize?: number | string
    class?: string
    style?: any
  }>
}