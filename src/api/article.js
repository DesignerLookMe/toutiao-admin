// 文章请求
import { requstGet } from '../utils/request'

// 获取文章列表
export const getArticles = params => {
  return requstGet({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}

// 获取文章频道
export const getArticlesChannels = () => {
  return requstGet({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const getArticlesDelete = arcticleId => {
  return requstGet({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${arcticleId}`
  })
}

// 新建文章
export const getArticlesAdd = (data, draft = false) => {
  return requstGet({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

// 修改编辑文章
export const getArticlesPut = (arcticleId, data, draft = false) => {
  return requstGet({
    method: 'PUT',
    url: `/mp/v1_0/articles/${arcticleId}`,
    params: {
      draft
    },
    data
  })
}

// 获取指定文章
export const getArticlesDetails = arcticleId => {
  return requstGet({
    method: 'GET',
    url: `/mp/v1_0/articles/${arcticleId}`
  })
}

// 修改文章评论状态
export const updataCommentStatus = (arcticleId, allowComment) => {
  return requstGet({
    method: 'PUT',
    url: '/mp/v1_0/articles/',
    params: {
      arcticle_id: arcticleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
