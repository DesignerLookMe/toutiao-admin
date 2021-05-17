/*
  全局组件通信
  作用：可以让任何组件之间相互通信
*/
import Vue from 'vue'
export const EventBus = new Vue()

// 假设 a 组件要给 b 组件发送数据

// b 组件注册通信的事件
// import  globalBius from '@/untils/global-bus'

// globalBus.$on('自定义事件', () => {
//   // 处理函数
// })

// a 发布通信事件
// import  globalBius from '@/untils/global-bus'
// globalBus.$emit('自定义事件',可选数据)

// 注意： 通信的两端所使用的事件名称必须一致，否则是无效的
