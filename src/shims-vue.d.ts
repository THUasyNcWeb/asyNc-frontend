/* eslint-disable */
/*
 * @FileDescription: ts脚本，注册允许执行的扩展
 * @Author: 郑友捷
 * @Date: 2022-10-06 18:00
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-23 01:49
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'echarts' {
  const echarts: any
  export default echarts
}

declare module '*.png'

declare type Nullable<T> = T | null