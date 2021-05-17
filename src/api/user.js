// 用户相关请求

// 用户登录信息
import { request, requstGet } from '../utils/request'
export const login = (data) => {
  // eslint-disable-next-line no-undef
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // 用来设置post请求体
    data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return requstGet({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值都得看接口的要求
    //   // 属性名：Authorization，接口要求的
    //   // 属性值：Bearer空格token数据
    //   // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MDkxMjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.EdKErKDqMc3snkYxqt02jSa8t9G44002yWKY3CMOMJg'
    // }
  })
}

// 修改用户图像
// data 必须传递formdeta对象
export const updateUserPhoto = data => {
  return requstGet({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 封装编辑请求方法
export const updateUserProfile = data => {
  return requstGet({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
