<template>
  <div class='upload-cover-img' @click="showCoverSelect">
    <div class="cover-img">
      <img :src="value" alt="">
    </div>
    <el-dialog
      title="请选择您需要上传的文件"
      :visible.sync="dialogVisible"
      append-to-body
      width="60%">
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="素材库" name="first">
            <imagesList
            :is-show-add="false"
            ref='images-cover'
            :is-show-selected='true'></imagesList>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
            <input 
            type="file" 
            ref="file"
            @change="fileChange">
            <img :src="imgSrc" alt="" width="100">
          </el-tab-pane>
        </el-tabs>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="onCoverFirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { uploadImage } from '../../../api/images'
import imagesList from '@/views/image/components/imagesList'
export default {
  name: 'UploadCover',
  components: {
    imagesList
  },
  props: ['value'],
  // props: ['cover-image'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      imgSrc: 'http://toutiao-img.itheima.net/Ftb-E6bXjx1HlnJHPhe5N6E_seaI',
      imgurlindex: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
  },
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    fileChange () {
      const file = this.$refs.file.files[0]
      const fileimg = window.URL.createObjectURL(file)
      this.imgSrc = fileimg
      // this.$refs.file.value = '' // 防止用户选择同一个文件不触发change 事件
      // console.log('fileChange')
    },
    onCoverFirm () {
      const file = this.$refs.file.files[0]
      if (this.activeName === 'second') {
        if (!this.$refs.file.files[0]) {
          this.$message('请选择上传文件')
          return
        }
        // 执行上传文件的操作
        // console.log(122)
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(
          res => {
            // console.log(res)
            this.dialogVisible = false
            this.imgurlindex = res.data.data.url
            this.$emit('input', res.data.data.url)
            // this.$emit('upload-cover-img', res.data.data.url)
          }
        )
      } else if (this.activeName === 'first') {
        // console.log(1232)
        // ref 作用到组件上获取组件节点
        const imageList = this.$refs['images-cover']
        const selected = imageList.selectedIndex
        console.log(selected)
        if (selected === null || selected === '') {
          this.$message('请选择封面图片')
          console.log(123)
          return
        }
        // 关闭对话框
        this.dialogVisible = false
        // 修改父组件绑定数据
        // console.log(imageList.images[selected].url)
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }
}
</script>
<style scoped lang="less">
  .upload-cover-img{
    display: flex;
    .cover-img{
      width: 150px;
      height: 150px;
      border-radius: 8px;
      margin-right: 10px;
      background: #fafafa;
      overflow: hidden;
      cursor: pointer;
    }
    .cover-img img{
      width: 100%;
    }
  }
</style>
