<template>
  <div class="container">
    <div class="left_content">
      <el-card>
        <div class="tags">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新" name="new">
              <BockItem :bockInfo="bockInfo"></BockItem>
              <Page :pageInfo="pageInfo"></Page>
            </el-tab-pane>
            <el-tab-pane label="最热" name="hot">
              <BockItem :bockInfo="bockInfo"></BockItem>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="tags_content">
          <router-view></router-view>
        </div>
      </el-card>
    </div>
    <div class="right_content">
      <el-card>msg1</el-card>
      <el-card>msg2</el-card>
      <el-card>msg3</el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "new",
      bockInfo: [
        {
          title: "这是文章标题",
          tags: "这是标签",
          message: "这是信息",
        },
        {
          title: "这是文章标题",
          tags: "这是标签",
          message: "这是信息",
        },
        {
          title: "这是文章标题",
          tags: "这是标签",
          message: "这是信息",
        },
      ],
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
    };
  },
  created() {},
  methods: {
    getAllBock() {},
    handleClick() {},
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .left_content {
    min-width: 65vw;
    min-height: 80vh;
    margin-top: 30px;
    margin-left: 40px;
  }
  .right_content {
    margin-left: 60px;
    margin-top: 30px;
    min-width: 20vw;
  }
}
</style>