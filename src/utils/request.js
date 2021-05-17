// 基于axios 封装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router' // 非组件中加载路由模块需要导入router 组件
import { Message } from 'element-ui' // 非组件中加载element-ui

// 创建一个 axios 请求实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' //  请求的基础路径
})
const requstGet = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', //  请求的基础路径

  // 定制后端返回的原始数据
  transformResponse: [function (data) {
    // console.log(JSONbig.parse(data))
    // 后端返回的可能补水 JSON 格式字符串
    // 使用 try - catch 捕获异常，处理异常发生
    try {
      // 如果转换成功
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败，把数据原封返回请求结果
      return data
    }
    // return data
  }]
})

// axios 请求拦截器
requstGet.interceptors.request.use(
  // 所有请求会经过这里
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('userToken'))
    // console.log(user)
    // config 是可以进行修改的
    // console.log(`${user.refresh_token}`)
    if (user) {
      config.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MDkxMjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.EdKErKDqMc3snkYxqt02jSa8t9G44002yWKY3CMOMJg'
      // config.headers.Authorization = `Bearer ${user.refresh_token}`
      // console.log(config)
    }
    // console.log(config)
    // return config 之后请求才会发送出去
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器

requstGet.interceptors.response.use(function (response) {
  // 响应成功进入这里  所有为 2xx 的状态都会经过这里

  // response 是响应处理
  // 注意： 一定要把响应结果 return, 否则真正发送请求的位置拿不到数据结果
  return response
}, function (error) {
  // 任何超出 2xx 范围内的响应码都会经过这里
  // 不能直接使用$router 需要加载 router 模块
  // error.response.status 获取响应码
  Message('error')
  router.push('/login') // 非组件中使用router 模块需要加载router模块 获取/并跳转路由方式
  return Promise.reject(error)
})

// 导出 request 模块

export { request, requstGet }

// 谁用谁加载
// import request from 'request.js'
// request({
//   method,
//   url: ''
// })
