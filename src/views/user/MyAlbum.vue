<template>
  <div class="container">
    <el-card>
      <div class="top">
        <h3>我的相册</h3>
        <el-button type="primary" size="small" @click="addAlbum"
          >新建相册</el-button
        >
      </div>
      <el-divider></el-divider>
      <div class="album">
        <AlbumItem :AlbumInfo="AlbumList"></AlbumItem>
      </div>
    </el-card>
    <el-dialog title="新建相册" :visible.sync="addDialog" width="60%">
      <el-form :model="albumForm" label-width="80px">
        <el-form-item label="相册名称:">
          <el-input v-model="albumForm.album_name"></el-input>
        </el-form-item>
        <el-form-item label="相册描述:">
          <el-input v-model="albumForm.album_description"></el-input>
        </el-form-item>
        <el-form-item label="相册封面:">
          <el-upload
            action=""
            :show-file-list="false"
            :on-change="handlePageChange"
            :before-upload="beforePageUpload"
            :auto-upload="false"
          >
            <el-button>上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="commitAlbum">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AlbumList: [],
      addDialog: false,
      albumForm: {},
      albumPage: "",
      file: {},
    };
  },
  created(){
    this.getMyAlbum();
  },
  methods: {
    getMyAlbum() {
      this.$api.getMyAlbum({user_id:this.$store.state.user.userInfo.user_id}).then(res=>{
        if(res.status !== 200){
          return this.$message.error('获取相册失败');
        } else {
          this.AlbumList = res.data;
        }
      })
    },
    addAlbum() {
      this.addDialog = true;
    },
    handlePageChange(file) {
      this.albumPage = URL.createObjectURL(file.raw);
      this.file = file;
    },
    beforePageUpload() {},
    commitAlbum() {
      console.log(this.file);
      let albumform = new FormData();
      if (!this.albumPage) {
        return this.$message.error("请上传相册封面");
      } else {
        albumform.append('album_page',this.file.raw)
        albumform.append('album_name',this.albumForm.album_name)
        albumform.append('album_description',this.albumForm.album_description)
        albumform.append('user_id',this.$store.state.user.userInfo.user_id)
        this.$api.addAlbum(albumform).then(res=>{
          console.log(res);
          if(res.status!==200){
            return this.$message.error('新建相册失败');
          } else {
            this.$message.success('新建相册成功');
            this.addDialog = false;
            this.getMyAlbum();
          }
        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  min-height: 30vh;
  .el-card {
    width: 90vw;
    .top {
      h3 {
        font-weight: 400;
      }
    }
    .album {
      width: 100%;
    }
  }
}
</style>