<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
              label="全部"
              :value="null"
              ></el-option>
            <el-option
              :label="channels.name"
              :value="channels.id"
              v-for="( channels, index ) in channels"
              :key="index"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchDate"
            type="datetimerange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- button 按钮的 click 事件有一个默认参数 -->
          <el-button
          type="primary"
          :disabled="loading"
          @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{totalCount}} 条结果：
      </div>
      <!-- 数据列表 -->
      <!-- 自定义表格列 -->
      <el-table
        :data="article"
        v-loading="loading"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column
          prop="cover"
          label="封面"
          width="180">
          <template slot-scope="scope">
          <el-image
            v-if="scope.row.cover.images[0]"
            style="width: 100px; height: 100px"
            :src='scope.row.cover.images[0]'
            lazy
            ></el-image>
             <div class="block" v-else>
              <el-image>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </template>
         </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="420">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
          <el-tag :type='articleStatus[scope.row.status].type'>{{articleStatus[scope.row.status].name}}</el-tag>
          <!-- <el-tag type="info" v-else-if='scope.row.status === 1'>待审核</el-tag>
          <el-tag type="success" v-else-if='scope.row.status === 2'>审核通过</el-tag>
          <el-tag type="danger" v-else-if='scope.row.status === 3'>审核失败</el-tag>
          <el-tag type="warning" v-else-if='scope.row.status === 4'>已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            circle
            icon='el-icon-edit'
            type='primary'
            @click='$router.push("/publish?id="+ scope.row.id)'
            ></el-button>
            <el-button
            circle
            icon='el-icon-delete'
            type='danger'
            @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        :disabled="loading"
        :current-page.sync="page"
        @current-change='onCurrentChange'
        :page-size='pageSize'/>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import {
  getArticles,
  getArticlesChannels,
  getArticlesDelete
} from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      article: [], // 文章列表
      articleStatus: [
        { text: 0, name: '草稿', type: '' },
        { text: 1, name: '待审核', type: 'info' },
        { text: 2, name: '审核通过', type: 'success' },
        { text: 3, name: '审核失败', type: 'danger' },
        { text: 4, name: '已删除', type: 'warning' }
      ],
      totalCount: 0, // 总条数
      pageSize: 10, // 设置每页条数
      status: null, // 查询文章的状态
      channels: [], // 文章频道
      channelId: null, // 查询文章频道
      searchDate: null, // 开始时间
      loading: true,
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      this.loading = true // 关闭加载load
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.searchDate ? this.searchDate[0] : null,
        end_pubdate: this.searchDate ? this.searchDate[1] : null
      }).then(res => {
        // console.log(res)
        this.loading = false // 关闭加载load
        const { results, total_count: totalCount } = res.data.data
        this.article = results
        this.totalCount = totalCount
      })
    },
    loadChannels () {
      getArticlesChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    onDeleteArticle (articleId) {
      this.$confirm('确定删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(articleId.toString())
        getArticlesDelete(articleId.toString()).then(
          res => {
            // 删除成功之后更新当前页面
            this.loadArticles(this.page)
            // console.log(res)
          }
        )
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
.el-icon-picture-outline{
  width:100px;
  height:100px;
  background: #f2f2f2;
  text-align: center;
}
</style>
