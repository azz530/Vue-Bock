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
        <el-menu-item index="/userinfo">个人中心</el-menu-item>
      </el-menu>
    </div>
    <div class="user">
      <el-dropdown @command="handleCommand">
        <el-avatar
          :src="
            $store.state.user.userInfo.avatar
              ? $store.state.user.userInfo.avatar
              : defaultAvatar
          "
          :size="45"
        >
        </el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
          <el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
          <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
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
    handleCommand(command) {
      if (command === "个人中心") {
        this.$router.push("/userinfo");
      } else if (command === "修改密码") {
      } else if (command === "退出登录") {
        this.$confirm("是否退出登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then((res) => {
            // if (res === "confirm") {
            //   this.$api
            //     .logout({user_id:this.$store.state.user.userInfo.user_id})
            //     .then((res) => {
            //       console.log(res);
            //       if (res.status !== 200) {
            //         return this.$message.error("退出登录失败");
            //       } else {
            //         this.$message.success("退出登录成功");
            //         window.sessionStorage.removeItem('token');
            //         window.sessionStorage.removeItem('state');
            //         this.$router.push("/login");
            //       }
            //     });
            // }
          })
          .catch((err) => err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 800px) {
  .container {
    min-height: 60px;
    display: flex;
    box-shadow: 0px 3px 3px rgba(5, 5, 5, 0.5);
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
      .el-menu {
        .el-menu-item {
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