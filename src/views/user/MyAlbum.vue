<template>
  <div class="container">
    <el-card v-if="!gotoAlbumPhoto">
      <div class="top">
        <h3>我的相册</h3>
        <el-button type="primary" size="small" @click="addAlbum"
          >新建相册</el-button
        >
      </div>
      <el-divider></el-divider>
      <div class="album">
        <div class="tips" v-if="!hasAlbum">
          <p>你还没有相册,赶快去创建一个吧</p>
        </div>
        <AlbumItem
          :AlbumInfo="AlbumList"
          v-on:toAlbumPhoto="setAlbumStatus"
          v-on:updateAlbum="updateAlbums"
        ></AlbumItem>
      </div>
    </el-card>
    <el-card class="photo" v-else>
      <router-view></router-view>
    </el-card>

    <el-dialog title="新建相册" :visible.sync="addDialog" width="30%">
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
            <img v-if="albumPage" :src="albumPage" alt="" />
            <i v-else class="el-icon-plus"></i>
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
      hasAlbum: false,
      gotoAlbumPhoto: false,
    };
  },
  created() {
    this.getMyAlbum();
  },
  methods: {
    getMyAlbum() {
      this.$api
        .getMyAlbum({ user_id: this.$store.state.user.userInfo.user_id })
        .then((res) => {
          if (res.status === 200) {
            this.AlbumList = res.data;
            this.hasAlbum = true;
          }
        });
    },
    addAlbum() {
      this.addDialog = true;
      this.albumForm = {};
      this.albumPage = '';
      this.file = {};
    },
    handlePageChange(file) {
      this.albumPage = URL.createObjectURL(file.raw);
      this.file = file;
    },
    beforePageUpload() {},
    setAlbumStatus() {
      this.gotoAlbumPhoto = true;
    },
    updateAlbums() {
      this.getMyAlbum();
    },
    commitAlbum() {
      let albumform = new FormData();
      if (!this.albumPage) {
        return this.$message.error("请上传相册封面");
      } else {
        albumform.append("album_page", this.file.raw);
        albumform.append("album_name", this.albumForm.album_name);
        albumform.append("album_description", this.albumForm.album_description);
        albumform.append("user_id", this.$store.state.user.userInfo.user_id);
        this.$api.addAlbum(albumform).then((res) => {
          console.log(res);
          if (res.status !== 200) {
            return this.$message.error("新建相册失败");
          } else {
            this.$message.success("新建相册成功");
            this.addDialog = false;
            this.getMyAlbum();
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  min-height: 30vh;
  .el-card {
    width: 88vw;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        font-weight: 400;
      }
      .el-button {
        margin-right: 20px;
      }
    }
    .album {
      width: 100%;
      min-height: 30vh;
      .tips {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        color: rgb(167, 167, 167);
      }
    }
  }
  .photo {
    width: 88vw;
    min-height: 50vh;
  }
  .el-dialog {
    img{
      width: 120px;
      height: 120px;
      transition: 1s;
    }
    .el-icon-plus {
      background-color: rgba(250, 251, 252, 0.699);
      color: rgb(163, 161, 161);
      width: 120px;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      font-weight: 400;
      margin: 10px;
      border: 1px dashed rgb(211, 210, 210);
      &:hover {
        background-color: rgba(245, 245, 247, 0.849);
        color: rgb(207, 206, 206);
      }
    }
  }
}
</style>