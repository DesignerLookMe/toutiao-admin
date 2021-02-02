import Vue from 'vue'
import VueRouter from 'vue-router'

// @是src 的项目别名 好处：不受当前文件路径影响
import Login from '@/views/login/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
// 路由配置表
const router = new VueRouter({
  routes
})

export default router
