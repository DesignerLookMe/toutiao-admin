/* eslint-disable vue/valid-template-root */
<template>
  <div class="login-container">
     <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- 配置表单验证
        1.必须给el-from 组件绑定 model 为表单数据对象
        2.给需要验证的表单项绑定prop属性
        注意：prop 属性需要指定表单中的数据属性 是字符串
        3. 通过el-from 组件的rules 属性配置
        手动触发表单验证
        1.给el-from 设置ref 不要重复即可（随便起）
        2.通过ref 获取el-form 组件，调用组件的validate方法
        -->
      <el-form class="login-form"
      ref="loginform"
      :model="user"
      :rules="fromRules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox
          v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :loading="loading"
            @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 13911111111
// 246810

import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      loading: false,
      checked: false, // 是否同意协议的选中状态
      fromRules: {
      // 验证的数据名称
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则,
            // 验证通过返回callback()
            // 验证失败： callback(new Error ('错误消息'))
            validator: (rule, value, callback) => {
              // console.log(value)
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
              callback(new Error('错误消息'))
            },
            message: '请勾选用户同意协议',
            trigger: 'change'
          }
        ]
      }
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
      // console.log(user)
      this.$refs.loginform.validate(
        vaild => {
          if (!vaild) {
            return
          }
          this.login()
        }
      )
      // console.log('submit!')
    },
    login () {
      const user = this.user
      this.loading = true
      login(user).then(
        res => {
          // console.log(res)
          this.loading = false
          // 将接口返回的token 存储起来方便应用数据共享
          window.localStorage.setItem('userToken', JSON.stringify(res.data.data))
          this.$message({
            message: '恭喜你，登陆成功',
            type: 'success'
          })
          // console.log('123')
          // 登陆成功跳转到首页
          this.$router.push({
            path: '/'
          })
        }
      ).catch(
        res => {
          // console.log(res)
          this.loading = false
          this.$message({
            message: '对不起，登录失败',
            type: 'error'
          })
        }
      )
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
