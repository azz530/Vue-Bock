<template>
  <div class="container">
    <el-container>
      <el-aside width="180px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
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
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
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
      height: 100vh;
      .el-menu {
        height: 100%;
      }
    }
    .el-main {
      width: 100%;
      .slide-fade-enter-active {
        transition: all 0.8s ease;
      }
      .slide-fade-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
         display: none;
      }
      .slide-fade-enter,
      .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
      }
    }
  }
}
</style>
