/*
素材请求相关模块
*/
import { requstGet } from '../utils/request'

/*
上传图片素材
*/
export const uploadImage = data => {
  return requstGet({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都要求头中的
    // Content-Type 设置为 multipart/form-data，但是我们使用的axios 上传文件的话不需要手动设置，只需要给data
    // 一个 from-data 即可
    data
  })
}

/*
获取素材列表
*/
export const getImage = params => {
  return requstGet({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都要求头中的
    // Content-Type 设置为 multipart/form-data，但是我们使用的axios 上传文件的话不需要手动设置，只需要给data
    // 一个 from-data 即可
    params
  })
}
