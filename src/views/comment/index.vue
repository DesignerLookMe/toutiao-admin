<template>
<div class=''>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <div class="g-table">
          <!-- 1.把数据绑定个data
                2.设计表格列
                3.给表格列绑定渲染的数据字段 -->
          <el-table
            border
            :data="article"
            style="width: 100%">
            <el-table-column
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              prop="total_comment_count"
              label="总评论数">
            </el-table-column>
            <el-table-column
              prop="fans_comment_count"
              label="粉丝评论数">
            </el-table-column>
            <el-table-column
              prop="comment_status"
              label="评论状态">
              <template slot-scope="scope">
                {{scope.row.comment_status? '正常': '关闭'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="comment_status"
              label="操作">
              <template slot-scope="scope_atatus">
                <el-switch
                  v-model="scope_atatus.row.comment_status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :disabled="scope_atatus.row.disabledFalse"
                  @change="onStatusChang(scope_atatus.row)">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="page"
          :page-sizes="pageSizes"
          :page-size="totalPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
  </el-card>
</div>
</template>
<script>
import {
  getArticles,
  updataCommentStatus
} from '@/api/article'
export default {
  name: 'conmentIndex',
  components: {},
  props: {},
  data () {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      article: [],
      totalCount: 10,
      pageSizes: [10, 20, 30, 40],
      totalPage: 10,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    handleSizeChange (val) {
      this.totalPage = val
      this.loadArticle()
    },
    handleCurrentChange (page) {
      this.loadArticle(page)
    },
    loadArticle (page = 1) {
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.totalPage
      }).then(
        res => {
          console.log(res)
          const result = res.data.data.results
          result.forEach(item => {
            item.disabledFalse = false
          })
          this.article = result
          this.totalCount = res.data.data.total_count
        }
      )
    },
    onStatusChang (arcticle) {
      // console.log(arcticle.id.toString())
      arcticle.disabledFalse = true
      updataCommentStatus(arcticle.id.toString(), arcticle.comment_status).then(
        res => {
          arcticle.disabledFalse = false
          console.log(res)
          this.$message({
            type: 'success',
            message: arcticle.comment_status ? '开启成功' : '关闭成功'
          })
        }
      )
    }
  }
}
</script>
<style scoped lang="less">
.g-table{
  margin-top: 20px;
}
</style>
