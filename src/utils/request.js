// 基于axios 封装的请求模块
import axios from 'axios'

// 创建一个 axios 请求实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' //  请求的基础路径
})

// 导出 request 模块
export default request

// 谁用谁加载
// import request from 'request.js'
// request({
//   method,
//   url: ''
// })
