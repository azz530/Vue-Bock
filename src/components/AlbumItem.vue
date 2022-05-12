<template>
  <div class="container">
    <div class="albumItem" v-for="item in AlbumInfo" :key="item.album_id">
      <div class="page">
        <img :src="item.album_page" alt="" />
      </div>
      <h2>{{ item.album_name }}</h2>
      <p>{{ item.album_description }}</p>

      <i class="el-icon-setting" @click="editAlbum(item)"></i>
      <i class="el-icon-delete" @click="delAlbum(item.album_id)"></i>
      <button class="to" @click="IntoAlbum(item.album_id)">进入相册</button>
    </div>

    <el-dialog class="editDialog" title="修改相册信息" :visible.sync="editDialog" width="30%">
      <el-form :model="albumForm" label-width="80px">
        <el-form-item label="相册名称:">
          <el-input v-model="albumForm.album_name"></el-input>
        </el-form-item>
        <el-form-item label="相册描述:">
          <el-input v-model="albumForm.album_description"></el-input>
        </el-form-item>
        <el-form-item label="相册封面:">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-change="handlePageChange"
            :before-upload="beforePageUpload"
            :auto-upload="false"
          >
            <img v-if="albumPage" :src="albumPage" alt="" />
            <img v-else :src="albumForm.album_page" class="avatar" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="commitAlbum">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    AlbumInfo: [],
  },
  data() {
    return {
      Album_id: "",
      editDialog: false,
      albumForm: {},
      file: {},
      albumPage: "",
    };
  },
  methods: {
    IntoAlbum(album_id) {
      this.$router.push({ path: `/album_photo/${album_id}` });
      this.$emit("toAlbumPhoto", true);
    },
    editAlbum(album) {
      this.editDialog = true;
      this.albumForm = this.$tools.deepCopy(album);
      this.albumPage = '';
      this.file = {};
    },
    delAlbum(album_id) {
      this.$confirm("是否删除该相册", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          if (res === "confirm") {
            this.$api.delAlbum({ album_id }).then((res) => {
              if (res.status === 200) {
                this.$message.success("删除成功");
                this.$emit("updateAlbum", true);
              }
            });
          }
        })
        .catch((err) => err);
    },

    handlePageChange(file) {
      this.albumPage = URL.createObjectURL(file.raw);
      this.file = file;
    },
    beforePageUpload() {},
    commitAlbum() {
      let albumform = new FormData();
      if(this.albumPage){
        albumform.append("album_page", this.file.raw);
      } 
      albumform.append("album_name", this.albumForm.album_name);
      albumform.append("album_description", this.albumForm.album_description);
      albumform.append("album_id", this.albumForm.album_id);
      this.$api.changeAlbum(albumform).then((res) => {
        console.log(res);
        if (res.status !== 200) {
          return this.$message.error("修改相册信息失败");
        } else {
          this.$message.success("修改相册信息成功");
          this.editDialog = false;
          this.$emit("updateAlbum", true);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .albumItem {
    position: relative;
    width: 300px;
    min-height: 200px;
    max-height: 250px;
    margin: 10px;
    background-color: #1882fc50;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    box-shadow: 0 0 30px rgba(53, 52, 52, 0.212);
    flex-shrink: 0;
    //默认大小
    .page {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 0%;
      overflow: hidden;
      transition: 0.5s;
    }
    .page img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    //鼠标放入收缩图片
    &:hover .page {
      top: 10px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    }
    h2 {
      position: absolute;
      top: 160px;
      transition: 0.5s;
      font-weight: 300;
    }
    &:hover h2 {
      top: 80px;
    }
    &:hover .el-icon-setting{
      opacity: 1;
      transition: 1s;
    }
    &:hover .el-icon-delete{
      opacity: 1;
      transition: 1s;
    }
    p {
      width: 90%;
      margin-top: 120px;
      text-indent: 20px;
      font-size: 16px;
      margin-bottom: 5px;
      line-height: 30px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .el-icon-setting {
      position: absolute;
      left: 10px;
      top: 5px;
      cursor: pointer;
      margin-right: 5px;
      color: #1e7ffd;
      font-size: 20px;
      opacity: 0;
    }
    .el-icon-delete {
      position: absolute;
      top: 5px;
      right: 10px;
      cursor: pointer;
      margin-right: 5px;
      color: #1e7ffd;
      font-size: 20px;
      opacity: 0;
    }
    .to {
      font-size: 14px;
      background-color: rgba(196, 196, 196, 0.199);
      color: rgb(255, 255, 255);
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 4px 15px;
      border-radius: 4px;
      margin-bottom: 10px;
      &:hover {
        cursor: pointer;
        color: #fff;
        background-color: rgba(235, 237, 240, 0.24);
      }
    }
  }
  .editDialog{
    img{
      width: 150px;
      height: 150px;
    }
  }
}
</style>