<template>
  <div class='publish-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <div class="text item">
        <el-form
        ref="publish-form"
        :model="article"
        :rules="formRules"
        label-width="80px">
          <el-form-item label="标题" prop='title'>
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop='content'>
            <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
            <el-tiptap
            lang="zh"
            height="600"
            placeholder="请输入文章内容"
            v-model="article.content"
            :extensions="extensions"></el-tiptap>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <!-- 将选择的图片传入到封面数组中 
            
            注意：如果想要在事件处理函数自定义传参后还想得到原来子组件传过来的参数，
            则需要手动指定$event（代表那个事件本身的参数）
            
            在组件上使用 v-model

            当你给子组件提供数据既要使用还要修改，这个时候我们就可以使用v-model 简化数据绑定
            v-model= "article.cover.images[index]"
            相当于 :value= 'article.cover.images[index]'
            默认监听 input事件，当事件发生时，他会绑定数据 = 事件参数
            @input = ‘article.cover.images[index]’ 事件参数

            注意：v-model 仅仅是简写了而已，本质还是父子组件通信
            -->
            
            <template v-if="article.cover.type > 0">
              <div class="upload-cover-img">
                <upload-cover
                :key="cover"
                v-for="(index,cover) in article.cover.type"
                v-model="article.cover.images[index]"/>
                <!-- <upload-cover
                :key="cover"
                v-for="(index,cover) in article.cover.type"
                :cover-image="article.cover.images[index-1]" 
                @upload-cover-img="uploadimg(index-1,$event)"/> -->
              </div>
            </template>
          </el-form-item>
          <el-form-item label="频道" prop='channel_id'>
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish(draft = false)">发表</el-button>
            <el-button @click="onPublish(draft = true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
import {
  getArticlesChannels,
  getArticlesAdd,
  getArticlesDetails,
  getArticlesPut
} from '../../api/article'
import { uploadImage } from '@/api/images'
import UploadCover from './components/upload-cover'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  Image,
  CodeBlock,
  Blockquote,
  TextColor,
  TextHighlight,
  TextAlign
} from 'element-tiptap' // 引用element tip-tap 富文本编辑器

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    // eslint-disable-next-line vue/no-unused-components
    UploadCover
  },
  props: {},
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Image({
          // 默认会把图片生成 base64，字符串与内容存储在一起，如果需要自定义图片上传则 uploadRequest(file) file是文件对象
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new HorizontalRule(),
        new CodeBlock(),
        new Blockquote(),
        new Preview(),
        new TextColor(),
        new TextHighlight(),
        new TextAlign(),
        new Fullscreen()
      ],
      channels: [], // 文章频道列表
      article: {
        title: '',
        content: '',
        cover: {
          type: 1, // 封面类型 -1=自动， 0=无图， 1=1张， 3=3张
          images: []
        },
        channel_id: ''
      },
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          // 以为富文本编辑器内容删除完毕之后始终会有 <p></p> 存在，固需要自定义验证
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getChannels()
  },
  mounted () {},
  methods: {
    onPublish (draft = false) {
    // 拿到验证结果
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        const articleId = this.$route.query.id
        if (articleId) {
          getArticlesPut(articleId, this.article, draft).then(
            res => {
              console.log(articleId)
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }
          )
        } else {
          getArticlesAdd(this.article, draft).then(
            res => {
              console.log(res)
              this.$message({
                message: `${draft ? '存入草稿' : '发布'}成功`,
                type: 'success'
              })
              this.$router.push('/article')
            }
          )
        }
      })
    // 编辑和修改文章为同一组件，如果id有值则表示为编辑文章
    },
    // 获取频道
    getChannels () {
      getArticlesChannels().then(
        res => {
          this.channels = res.data.data.channels
          // console.log(this.channels)
        }
      )
    },
    // 加载文章
    loadArticle () {
      getArticlesDetails(this.$route.query.id).then(
        res => {
          console.log(res)
        }
      )
    },
    // 将图片存入数组
    uploadimg (index, url) {
      this.article.cover.images[index] = url
      console.log(url)
    }
  }
}
</script>
<style scoped lang="less">
.upload-cover-img{display: flex;}
</style>
