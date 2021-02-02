/* eslint-disable vue/valid-template-root */
<template>
  <div class="login-container">
     <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="form" :model="user">
        <el-form-item>
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      checked: false // 是否同意协议的选中状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据 （根据服务端接口要求绑定数据）
      // 表单验证
      // 验证通过，提交登陆
      // 处理后端响应结果
      // 成功  失败
      const user = this.user
      console.log(user)
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // 用来设置post请求体
        data: user
      }).then(
        res => {
          // console.log(res)
          this.$message({
            message: '恭喜你，登陆成功',
            type: 'success'
          })
        }
      ).catch(
        res => {
          console.log(res)
          this.$message({
            message: '对不起，登录失败',
            type: 'error'
          })
        }
      )
      // console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: cover;
    .login-form-wrap {
      min-width: 300px;
      padding: 30px 50px 10px;
      background-color: #fff;
      box-shadow: rgba(0,0,0,.5);
      .login-head {
        display: flex;
        justify-content: center;
        .logo {
          width: 200px;
          height: 57px;
          background-size: contain;
        }
      }
      .login-form {
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
