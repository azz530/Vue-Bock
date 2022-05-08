<template>
  <div class="container">
    <div class="item" v-for="item in bockInfo" :key="item.article_id">
      <div class="title" @click="toArticleDetails(item.article_id)">
        <h4>{{ item.article_title }}</h4>
      </div>
      <div class="tags">
        <el-tag type="info" v-for="tag in item.article_tags" :key="tag">{{
          tag
        }}</el-tag>
      </div>
      <div class="message">
        <div
          :class="item.isCollection ? 'Collection' : 'noCollection'"
          v-if="!isMy"
          @click="addCollection(item.article_id, item.isCollection)"
        >
          <i
            :class="item.isCollection ? 'el-icon-star-on' : 'el-icon-star-off'"
          ></i
          >{{ item.collection_num }}
        </div>
        <div class="time">{{ item.article_time }}</div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bockInfo: [],
    isMy: Boolean,
  },
  name: "BockItem",
  data() {
    return {};
  },
  created() {},
  methods: {
    toArticleDetails(id){
      this.$router.replace({path:'/articleDetails',query:{id}});
    },
    //添加收藏
    addCollection(id, isCollection) {
      if (isCollection) {
        this.$api
          .delCollection({
            article_id: id,
            user_id: this.$store.state.user.userInfo.user_id,
          })
          .then((res) => {
            if (res.status !== 200) {
              return this.$message.error("取消收藏失败");
            } else {
              this.$message.success("取消收藏成功");
              this.$emit("starsChange", true);
            }
          });
      } else {
        this.$api
          .addCollection({
            user_id: this.$store.state.user.userInfo.user_id,
            article_id: id,
          })
          .then((res) => {
            if (res.status !== 200) {
              return this.$message.error("收藏失败");
            } else {
              this.$message.success("收藏成功");
              this.$emit("starsChange", true);
            }
          });
      }
    },

  },
};
</script>

<style lang="less" scoped>
.container {
  min-height: 120px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .title {
    margin: 10px 0;
    cursor: pointer;
    &:hover {
      color: rgb(64, 143, 247);
    }
  }
  .tags {
    margin: 10px 0;
  }
  .message {
    margin: 10px 0;
    .Collection {
      width: 40px;
      font-size: 16px;
      i {
        margin-right: 5px;
        color: rgb(64, 64, 65);
      }
      &:hover {
        cursor: pointer;
      }
    }
    .noCollection {
      width: 40px;
      font-size: 16px;
      i {
        margin-right: 5px;
      }
      &:hover {
        color: rgb(122, 186, 247);
        cursor: pointer;
      }
    }
    .time {
      font-size: 12px;
      color: rgb(139, 138, 138);
    }
  }
}
</style>