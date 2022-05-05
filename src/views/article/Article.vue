<template>
  <div class="container">
    <el-card class="main">
      <div class="top">
        <div class="search">
          <el-input placeholder="请输入内容"
            ><el-button
              slot="append"
              type="primary"
              icon="el-icon-search"
            ></el-button
          ></el-input>
        </div>
        <div class="add">
          <el-button type="primary" size="small" @click="addArticle"
            >新增文章</el-button
          >
        </div>
      </div>
      <el-divider></el-divider>
      <BockItem :bockInfo="bockInfo"></BockItem>
      <Page :pageInfo="pageInfo"></Page>
    </el-card>
    <el-dialog title="新增文章" :visible.sync="addDialog" width="60%">
      <el-form :model="articleForm" label-width="80px">
        <el-form-item label="文章标题:">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章标签:">
          <el-input v-model="articleForm.tags"></el-input>
        </el-form-item>
        <el-form-item label="文章内容:">
          <quill-editor v-model="articleForm.article_content"> </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="commitArticle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
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
      addDialog: false,
      articleForm: {},
    };
  },
  created() {},
  methods: {
    getMyArticle() {},
    addArticle() {
      this.addDialog = true;
    },
    commitArticle() {
      console.log(this.articleForm);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .main {
    margin-top: 30px;
    margin-left: 40px;
    width: 70vw;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search {
        .el-input {
          width: 600px;
        }
      }
    }
  }
}
</style>>

