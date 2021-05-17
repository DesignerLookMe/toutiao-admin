<template>
  <div class='layout-container'>
    <el-container class="height-container">
      <el-aside
        width="auto"
        >
        <App-aside :is-collapse='isCollapse'/>
      </el-aside>
      <el-container>
        <el-header>
          <div class="g-header-top">
            <i class="el-icon-s-fold"
              @click='isCollapse = !isCollapse'
              ></i>
            <span>江苏传媒智播科技教育有限公司</span>
          </div>
          <el-dropdown>
            <div class="header-item">
              <img :src="user.photo"><span>{{user.name}}</span>
            </div>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item
              @click.native="onClick">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 默认子路由 -->
        <el-main><router-view ></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AppAside from '@/views/layout/components/aside'
import { getUserProfile } from '@/api/user'
import { EventBus } from '@/utils/global-bus.js'

export default {
  name: 'layoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {
        name: '',
        photo: ''
      },
      // 侧边菜单栏
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()

    EventBus.$on('update-user', (data) => {
      this.user.photo = data.photo
      this.user.name = data.name
      console.log(data)
    })
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      // console.log('111')
      getUserProfile().then(
        res => {
          // console.log(res)
          this.user.name = res.data.data.name
          this.user.photo = res.data.data.photo
        }
      )
    },
    // 退出登录
    onClick () {
      // 跳转到登陆页面
      this.$confirm('您确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('userToken') // 删除登录信息
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
.height-container{
  height: 100vh;
}
.el-header{
  border-bottom: 1px solid #e2e2e2;
  text-align: center;
  line-height: 60px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-aside{
  background: #001d32;
}
.g-header-top{
  float: left;
}
.el-dropdown{
  float: right;
}
.header-item{
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  img{
    width:32px;
    height:32px;
    border-radius: 100%;
    margin-right: 10px;
  }
  span{
    color:#000;
  }
}
</style>
