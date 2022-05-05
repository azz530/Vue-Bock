<template>
  <div class="container">
    <div class="tags">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
      >
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/article">我的文章</el-menu-item>
        <el-menu-item index="/album">我的相册</el-menu-item>
        <el-menu-item index="/video">我的视频</el-menu-item>
      </el-menu>
    </div>
    <div class="user">
      <el-dropdown @command="handleCommand">
        <el-avatar
          :src="
            $store.state.user.userInfo.avatar
              ? store.user.userInfo.avatar
              : defaultAvatar
          "
          :size="45"
        >
        </el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import defaultAvatar from "../assets/img/avatar.jpg";
export default {
  name: "Header",
  created() {},
  data() {
    return {
      defaultAvatar: defaultAvatar,
      activeIndex: "/index",
    };
  },
  methods: {
    handleCommand() {},
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 800px) {
  .container {
    min-height: 60px;
    display: flex;
    box-shadow: 0px 0px 3px rgba(5, 5, 5, 0.5);
    align-items: center;
    .tags {
      margin-left: 300px;
    }
    .user {
      position: absolute;
      right: 50px;
      .el-avatar {
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .container {
    min-height: 60px;
    display: flex;
    box-shadow: 0px 0px 3px rgba(5, 5, 5, 0.5);
    align-items: center;
    .tags {
     .el-menu{
       .el-menu-item{
         padding: 0px 10px;
       }
     }
    }
    .user {
      position: absolute;
      right: 50px;
      .el-avatar {
        cursor: pointer;
      }
    }
  }
}
</style>