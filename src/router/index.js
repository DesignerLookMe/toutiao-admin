import Vue from 'vue'
import VueRouter from 'vue-router'

// @是src 的项目别名 好处：不受当前文件路径影响
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Image from '@/views/image'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Settings from '@/views/settings'

Vue.use(VueRouter)

// 解决路由重复 重定向的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location)
    .catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 配置路由
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        // 路由的名字
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/publish',
        name: 'Publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'Image',
        component: Image
      },
      {
        path: '/comment',
        name: 'Comment',
        component: Comment
      },
      {
        path: '/fans',
        name: 'Fans',
        component: Fans
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings
      }
    ]
  }
]
// 路由配置表
const router = new VueRouter({
  routes
})

// 路由导航守卫 所有的路由都会进入这里
// to 来自哪里的路由信息
// from 要去的路由页面
// next 放行

router.beforeEach((to, from, next) => {
  // 如果不是登陆页面，则跳到登陆页面
  // console.log('路由进来了')
  // console.log(to)
  // console.log(from)
  const user = JSON.parse(window.localStorage.getItem('userToken'))

  // 校验非登陆页面的登陆状态
  if (to.path !== '/login') {
    if (user) { // 判断是否登陆
      next()
    } else {
      // 跳转到登录页面
      next('/login')
    }
  } else {
    next()
  }
  next()
})

// 组件中使用的$router 就是模块中的 router
export default router
