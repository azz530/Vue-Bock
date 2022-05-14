<template>
  <div class="container">
    <div class="left_content">
      <el-card>
        <div class="tags">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新" name="new">
              <BockItem :bockInfo="bockInfo" :isMy="false" v-on:starsChange="starUpdate"></BockItem>
              <Page :pageInfo="pageInfo" v-on:pageChange="updateArticle"></Page>
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
      <el-card>
        <h3>本站公告:</h3>
        <el-divider></el-divider>
        <div class="content">
          本站仅用于个人学习使用，希望大家能好好使用，切勿恶意传播不良言论。
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "new",
      bockInfo: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        pageSizes:[5,10],
        total: 0,
      },
      isNew:true,
    };
  },
  created() {
    this.getAllArticle();
  },
  methods: {
    //获取所有文章信息
    getAllArticle() {
      let sortType = this.isNew ? 'time' : 'hot';//排序?时间:收藏数
      this.$api
        .getAllArticle({
          user_id: this.$store.state.user.userInfo.user_id,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          sortType,
        })
        .then((res) => {
          if (res.status !== 200) {
            return this.$message.error("没有找到文章，请重新刷新页面");
          } else {
            res.data.map((item) => {
              if (item.article_tags) {
                item.article_tags = item.article_tags.split(",");
                item.article_time = this.$tools.formatDate(
                  item.article_time,
                  "YYYY-MM-DD hh:mm:ss"
                );
              }
            });
            this.bockInfo = res.data;
            this.pageInfo.total = res.total;
          }
        });
    },
    //分页栏变化数据获取
    updateArticle(newPageInfo) {
      this.pageInfo = newPageInfo;
      this.getAllArticle();
    },
    starUpdate(){
      this.getAllArticle();
    },
    handleClick(tab) {
      if(tab.name==='new'){
        this.isNew = true;
        this.getAllArticle();
      } else {
        this.isNew = false;
        this.getAllArticle();
      }
    },
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
    width: 20vw;
    h3{
      font-weight: 400;
    }
  }
}
</style>