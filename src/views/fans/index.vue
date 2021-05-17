<template>
  <div class='fans-index'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <div class="text item">
        <div id="main" style="width: 600px;height:400px;" ref="main"></div>
      </div>
    </el-card>
  </div>
</template>
<script>
// 导入echarts 第三方插件
import * as echarts from 'echarts'
// 基于准备好的dom 初始化echarts 实例
export default {
  name: 'fansIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    // console.log(this.$refs.main)
    var myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '粉丝比例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  methods: {}
}
</script>
<style scoped lang="less"></style>
