<template>
<div class='settingsIndex'>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- /面包屑路径导航 -->
    </div>
    <div class="text item">
      <el-row>
        <el-col :span="18">
          <el-form ref="user" :model="user" label-width="80px">
            <el-form-item label="用户编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="用户手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button 
              type="primary"
              @click="onSubmit"
              :loading="onupdataPhotoProfileLoading">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col
        class="touxiang"
        :span="6">
          <el-avatar
          shape="square"
          :size="100"
          fit="cover"
          :src="user.photo"></el-avatar>
          <label for="file">
            <p>点击修改图像</p>
            <input
            ref="file"
            id="file"
            type="file"
            @change="onFileChange"
            hidden>
            <!-- // input本身的change 事件 -->
          </label>
        </el-col>
      </el-row>
    </div>
  </el-card>
  <el-dialog
  title="修改用户图片"
  :visible.sync="dialogVisible"
  width="40%"
  :before-close="handleClose"
  @opened="onDialogOpened"
  >
   <!--opened世间 对话框完全打开状态 -->
  <div class="preview-image-wrap">
    <img 
    class="preview-image" 
    ref="preview-image" 
    :src="prevuewImage" alt="">
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button 
    type="primary" 
    :loading="onupdataPhotoLoading"
    @click="onUpdataImage">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { EventBus } from '@/utils/global-bus.js'

export default {
  name: 'settingsIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        email: '',
        id: '',
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }, // 用户资料
      dialogVisible: false,
      prevuewImage: '', // 预览图片
      cropper: null,
      onupdataPhotoLoading: false,
      onupdataPhotoProfileLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onSubmit () {
      const { name, intro, email } = this.user
      this.onupdataPhotoProfileLoading = true
      // 发布通知，用户信息已修改
      EventBus.$emit('update-user', this.user)
      updateUserProfile({
        name,
        intro,
        email 
      }).then(
        res => {
          this.onupdataPhotoProfileLoading = false
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      )
    },
    loadUser () {
      getUserProfile().then(
        res => {
          // eslint-disable-next-line prefer-const
          this.user = res.data.data
        }
      )
    },
    onFileChange () {
      const file = this.$refs.file
      // console.log(file.files.length)
      // 获取图片本地路径
      const blobData = window.URL.createObjectURL(file.files[0])
      this.prevuewImage = blobData
      this.dialogVisible = true
      this.$refs.file.value = '' // 解决两次选择相同的文件不触发change事件
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onDialogOpened () {
      // 图片裁切器
      // 图片裁切器必须基于 img 进行初始化
      // 注意 img必须是可见状态才能正常完成初始化
      // 获取元素的dom
      // 第一次初始化好以后,如果预览图片发生变化,裁切器默认不会更新
      // 如果预览图片发生变化更新裁切器
      // 方式一: 裁切器.replace 方法
      // 方法二: 销毁裁切器,重新初始化
      // const image = document.getElementById('image')
      const image = this.$refs['preview-image']

      // // 初始化裁切器
      // eslint-disable-next-line no-new
      if (this.cropper) {
        this.cropper.replace(this.prevuewImage)
        return
      }
      this.cropper = new Cropper(image, {
        // 裁切器的比例
        aspectRatio: 16 / 9,
        viewMode: 1,
        dragMode: 'none',
        // 移动裁切器出发crop
        crop (event) {
        }
      })
      this.cropper.replace()
    },
    onDialogClosed () {
      // 销毁裁切器
      this.cropper.destroy()
    },
    onUpdataImage () {
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        // console.log(file)
        const fd = new FormData()
        fd.append('photo', file)
        // 请求提交数据
        this.onupdataPhotoLoading = true
        updateUserPhoto(fd).then(
          res => {
            this.onupdataPhotoLoading = false
            console.log(res)
            this.user.photo = window.URL.createObjectURL(file)
            console.log(this.user.photo)
            // 已修改
            EventBus.$emit('update-user', this.user.photo)
            this.dialogVisible = false
          }
        )
      })
      // 
    }
  }
}
</script>
<style scoped lang="less">
.touxiang{text-align: center;}
.preview-image-wrap{
  width:100%;
  .preview-image{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin:0 auto;
  }
}
</style>
