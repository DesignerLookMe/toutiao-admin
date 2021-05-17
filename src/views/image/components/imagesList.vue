<template>
<div class='image-container'>
      <div class="f-button">
        <el-radio-group
          size="mini"
          v-model="collect"
          class="add-all"
          @change="onCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-row
        class="add-sucai">
          <el-button
          type="success"
          size="mini"
          :model-append-to-body="true"
          v-if="isShowAdd"
          @click="dialogUploadVisible = true">上传素材</el-button>
        </el-row>
      </div>
      <div class="g-image">
        <el-row
        :gutter="10">
          <el-col
           :xs="12"
           :sm="6"
           :md="4"
           :lg="2"
           :xl="1"
           class="item-image"
           v-for="(img, index) in images"
           @click.native="selected(index)"
           :key="index">
            <el-image
              class="u-img"
              :src="img.url"
              :fit="fit">
              </el-image>
              <div
              v-if="isShowSelected && index === selectedIndex"
              class="selected">

              </div>
          </el-col>
        </el-row>
      </div>
       <!-- 列表分页
        分页改变之后页码没有 变化
       -->
       <div class="g-page">
        <el-pagination
          layout="prev, pager, next"
          background
          :total="total_count"
          :page-size='per_page'
          :current-page="page"
          @current-change="pageData"/>
       </div>
  <el-dialog title="上传素材"
  :visible.sync="dialogUploadVisible"
  :append-to-body="true">
  <!-- upload 本身自带上传的操作，不需要自己写方法
  请求方法 POST
  请求路径 action
  请求头部 headers -->
  <el-upload
    class="upload-demo"
    drag
    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
    :show-file-list="false"
    :headers='uploadHeaders'
    name="image"
    multiple
    :on-success="onUploadSuccess">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</el-dialog>
</div>
</template>
<script>
import { getImage } from '@/api/images'
export default {
  name: 'imageListIndex',
  components: {},
  props: {
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fit: 'cover',
      collect: false,
      images: [],
      page: 1,
      per_page: 5,
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MDkxMjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.EdKErKDqMc3snkYxqt02jSa8t9G44002yWKY3CMOMJg'
      },
      total_count: 0,
      selectedIndex: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getImageData()
  },
  mounted () {},
  methods: {
    getImageData (page = 1) {
      getImage({
        collect: this.collect,
        page,
        per_page: this.per_page
      }).then(
        res => {
          // eslint-disable-next-line prefer-const
          let img = res.data.data.results
          img.forEach(img => {
            img.loading = false
          })
          this.images = img
          this.total_count = res.data.data.total_count
          console.log(res)
        }
      )
    },
    onCollectChange () {
      this.getImageData()
    },
    onUploadSuccess (page = this.page) {
      this.collect = false
      this.getImageData(page)
    },
    pageData (page) {
      this.page = page
      this.getImageData(page)
    },
    selected (index) {
      console.log(index)
      this.selectedIndex = index
    }
  }
}
</script>
<style scoped lang="less">
  .g-image{
    padding-top: 20px;
  }
  .f-button{
    position: relative;
  }
  .add-sucai{
    position: absolute;
    right:0;
    top: 0;
  }
  .item-image{
    position: relative;
    height: 100px;
    overflow: hidden;
    margin-top: 20px;
  }
  .g-page{
    padding-top: 20px;
  }
  .u-img{height: 100px;}
  .selected{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,.5);
  }
</style>
