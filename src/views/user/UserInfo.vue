<template>
  <div class="container">
    <el-container>
      <el-aside width="180px">
        <el-menu
          default-active="/usermsg"
          class="el-menu-vertical-demo"
          background-color="#fdfefd"
          :router="true"
        >
          <el-menu-item index="/usermsg">
            <i class="el-icon-user"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-edit"></i>
            <span slot="title">我的文章</span>
          </el-menu-item>
          <el-menu-item index="/album">
            <i class="el-icon-camera"></i>
            <span slot="title">我的相册</span>
          </el-menu-item>
          <el-menu-item index="/video">
            <i class="el-icon-video-camera"></i>
            <span slot="title">我的视频</span>
          </el-menu-item>
          <el-menu-item index="/collection">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="/history">
            <i class="el-icon-time"></i>
            <span slot="title">浏览记录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 800px) {
  .container {
    .el-aside {
      height: 98vh;
      .el-menu {
        height: 100%;
      }
    }
  }
}
</style>
