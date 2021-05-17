// 项目的启动入口

import Vue from 'vue'

// 项目根组件
import App from './App.vue'

// 创建路由插件
import router from './router'

// 加载全局样式文件
import './styles/index.less'

// 加载element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 解决超过js范围内数字不能正确读取的问题
// import JSONbig from 'json-bigint'
// JSONbig.parse() // -> JSON.parse
// JSONbig.stringify() // -> JSON.stringfy

Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建 Vue 根实例
// 把router配置到根实例中
// 通过render方法把App根组件渲染到#app入口节点
new Vue({
  router,
  render: h => h(App)
  // el:'#app' 等价于  $mount('#app')
}).$mount('#app')
