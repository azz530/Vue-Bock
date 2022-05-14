<template>
  <div class="container">
    <el-card class="main">
      <div class="top">
        <h3>我的收藏</h3>
      </div>
      <el-divider></el-divider>
      <BockItem v-if="hasCollection" :bockInfo="bockInfo" :isMy="true"></BockItem>
      <Page v-if="hasCollection" :pageInfo="pageInfo" v-on:pageChange="updateArticle"></Page>

      <div class="tips" v-if="!hasCollection">
        你还没有收藏任何文章哦,赶快去看看吧.........
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bockInfo: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        pageSizes: [10, 20],
        total: 0,
      },
      hasCollection:false,
    };
  },
  methods: {
    getMyCollection() {
      this.$api
        .getMyCollection({
          user_id: this.$store.state.user.userInfo.user_id,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
        })
        .then((res) => {
          if (res.status === 200) {
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
            this.hasCollection = true;
          }
        });
    },
    updateArticle(newPageInfo) {
      this.pageInfo = newPageInfo;
      this.getMyCollection();
    },
  },
  created() {
    this.getMyCollection();
  },
};
</script>

<style lang="less" scoped>
.container {
  .main {
    min-height: 30vh;
    width: 88vw;
    .top {
      h3 {
        font-weight: 400;
      }
    }
    .tips{
      text-align: center;
      color:rgb(126, 127, 128);
    }
  }
}
</style>