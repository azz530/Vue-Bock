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
      <BockItem :bockInfo="bockInfo" :isMy="true"></BockItem>
      <Page :pageInfo="pageInfo" v-on:pageChange="updateArticle"></Page>
    </el-card>
    <el-dialog title="新增文章" :visible.sync="addDialog" width="60%">
      <el-form :model="articleForm" label-width="80px">
        <el-form-item label="文章标题:">
          <el-input v-model="articleForm.article_title"></el-input>
        </el-form-item>
        <el-form-item label="文章标签:">
          <el-tag
            :key="tag"
            v-for="tag in articleForm.article_tags"
            closable
            @close="handleClose(tag)"
            :disable-transitions="false" 
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >添加标签</el-button
          >
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
      bockInfo: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      addDialog: false,
      articleForm: {
        article_tags:[],
      },
      inputVisible: false,
      inputValue: "",
    };
  },
  created() {
    this.getMyArticle();
  },
  methods: {
    getMyArticle() {
      this.$api
        .getMyArticle({
          user_id: this.$store.state.user.userInfo.user_id,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
        })
        .then((res) => {
          if (res.status !== 200) {
            return this.$message.error("您还没有发布文章,请重试");
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
            this.pageInfo.total = res.total;
            this.bockInfo = res.data;
          }
        });
    },
    addArticle() {
      this.addDialog = true;
    },
    handleClose(tag) {
      this.articleForm.article_tags.splice(this.articleForm.article_tags.indexOf(tag),1);
    },
    updateArticle(newPageInfo) {
      this.pageInfo = newPageInfo;
      this.getMyArticle();
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      let flag = true;
      if (inputValue) {
        for(let i in this.articleForm.article_tags){
          if(this.articleForm.article_tags[i].indexOf(inputValue)>-1){
            this.$message.error('该标签已存在');
            this.inputVisible = false;
            flag = false;
          }
        }
        if(flag){
          this.articleForm.article_tags.push(inputValue);
        }
        
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    commitArticle() {
      this.articleForm.user_id = this.$store.state.user.userInfo.user_id;
      this.articleForm.article_tags = this.articleForm.article_tags.join();
      this.$api.addArticle(this.articleForm).then((res) => {
        if (res.status !== 200) {
          return this.$message.error("新增文章失败");
        } else {
          this.addDialog = false;
          this.$message.success("新增文章成功");
          this.getMyArticle();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .main {
    width: 90vw;
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

