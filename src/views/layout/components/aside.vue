<template>
  <el-menu
    :default-active="$route.path"
    background-color="#001d32"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    router
    >
    <el-menu-item index="/">
      <i class="el-icon-setting"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="iconfont iconarticle"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont iconimg"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont iconpublish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont iconcomment-o-copy"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont iconfans"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  }
}
</script>
<style scoped lang="less">
  .el-menu-item{
    text-align: left;
  }
  .el-menu{
    border:none;
  }
  .iconfont{
    margin-right: 5px;
  }
</style>
