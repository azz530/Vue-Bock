<template>
  <div class="container" >
    <div class="item" v-for="item in bockInfo" :key="item.article_id">
      <div class="title">
        <h4>{{ item.article_title }}</h4>
      </div>
      <div class="tags">
        <el-tag type="info" v-for="tag in item.article_tags" :key="tag">{{ tag }}</el-tag>
      </div>
      <div class="message">
        <div class="time">{{item.article_time}}</div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bockInfo: [],
  },
  name: "BockItem",
  data() {
    return {};
  },
  created() {},
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
  }
}
</style>