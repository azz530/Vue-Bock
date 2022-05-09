<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <div class="left_content">
        <el-card>
          <div class="tags">
            文章标签:
            <el-tag
              type="info"
              v-for="tag in ArticleDetails.article_tags"
              :key="tag"
              >{{ tag }}</el-tag
            >
            <el-divider></el-divider>
          </div>
          <div class="article_content">
            <h2 class="title">{{ ArticleDetails.article_title }}</h2>
            <div class="content" v-html="ArticleDetails.article_content"></div>
            <el-divider></el-divider>
          </div>
          <div class="btnDiv">
            <div
              :class="
                ArticleDetails.isCollection ? 'Collection' : 'noCollection'
              "
              @click="addCollection()"
            >
              <i
                :class="
                  ArticleDetails.isCollection
                    ? 'el-icon-star-on'
                    : 'el-icon-star-off'
                "
              ></i>
              {{ ArticleDetails.isCollection ? "已收藏" : "收藏" }}
            </div>
          </div>
        </el-card>
      </div>
      <div class="right_content">
        <el-card>
          <div class="top">
            文章信息:
            <el-divider></el-divider>
          </div>
          <div class="message">
            <div class="author">
              作者:
              <el-avatar :size="30" :src="ArticleDetails.avatar"></el-avatar>
              {{ ArticleDetails.username }}
            </div>
            <div class="time">
              发布时间:<span>{{ ArticleDetails.article_time }}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleDetails",
  data() {
    return {
      ArticleDetails: {},
    };
  },
  created() {
    this.getArticleDetails();
  },
  methods: {
    getArticleDetails() {
      this.$api
        .getArticleDetails({
          article_id: this.$route.query.id,
          user_id: this.$store.state.user.userInfo.user_id,
        })
        .then((res) => {
          if (res.status !== 200) {
            return this.$message.error("获取文章详情失败");
          } else {
            if (res.data.article_tags) {
              res.data.article_tags = res.data.article_tags.split(",");
            }
            res.data.article_time = this.$tools.formatDate(
              res.data.article_time,
              "YYYY-MM-DD  HH:mm"
            );
            this.ArticleDetails = res.data;
          }
        });
    },
    addCollection() {
      if (this.ArticleDetails.isCollection) {
        this.$api
          .delCollection({
            article_id: this.$route.query.id,
            user_id: this.$store.state.user.userInfo.user_id,
          })
          .then((res) => {
            if (res.status !== 200) {
              return this.$message.error("取消收藏失败");
            } else {
              this.$message.success("取消收藏成功");
              this.getArticleDetails();
            }
          });
      } else {
        this.$api
          .addCollection({
            user_id: this.$store.state.user.userInfo.user_id,
            article_id: this.$route.query.id,
          })
          .then((res) => {
            if (res.status !== 200) {
              return this.$message.error("收藏失败");
            } else {
              this.$message.success("收藏成功");
              this.getArticleDetails();
            }
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .main {
    display: flex;
    .left_content {
      width: 65vw;
      min-height: 80vh;
      margin-top: 30px;
      margin-left: 40px;
      .tags {
        .el-tag {
          margin-left: 10px;
        }
      }
      .article_content {
        .title {
          text-align: center;
        }
        .content {
          margin-top: 20px;
          text-indent: 2em;
        }
      }
      .btnDiv {
        .Collection {
          width: 100px;
          font-size: 16px;
          display: flex;
          align-items: center;
          i {
            margin-right: 5px;
            font-size: 20px;
            color: rgb(64, 64, 65);
          }
          &:hover {
            cursor: pointer;
          }
        }
        .noCollection {
          width: 100px;
          font-size: 16px;
          display: flex;
          align-items: center;
          i {
            margin-right: 5px;
            font-size: 20px;
          }
          &:hover {
            color: rgb(122, 186, 247);
            cursor: pointer;
          }
        }
      }
    }
    .right_content {
      margin-left: 60px;
      margin-top: 30px;
      width: 20vw;
      .message {
        .author {
          font-size: 16px;
          display: flex;
          align-items: center;
          .el-avatar {
            margin: 0px 10px;
          }
        }
        .time {
          margin: 10px 0;
          font-size: 16px;
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>