<template>
  <div class="container">
    <div class="top">
      <h3>{{ Album_name }}</h3>
      <el-button type="primary" size="small" @click="addPhoto"
        >添加照片</el-button
      >
    </div>
    <el-divider></el-divider>
    <div class="main" v-if="hasPhoto">
      <div class="imgBox" v-for="item in AlbumPicList" :key="item.photo_id">
        <img :src="item.photo_url" alt="" />
        <div class="mask">
          <div class="icon">
            <i
              class="el-icon-search"
              @click="handlePictureCardPreview(item.photo_url)"
            ></i>
            <i
              class="el-icon-delete"
              @click="handlePhotoDel(item.photo_id)"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <div class="tips" v-else>该相册还没有照片,赶快去添加吧!</div>
    <Page class="page" v-if="hasPhoto" :pageInfo="pageInfo" v-on:pageChange="updatePhoto"></Page>
    <el-dialog
      class="addDialog"
      title="添加照片"
      :visible.sync="addDialog"
      width="60%"
      @close="addClose"
    >
      <div class="box">
        <div class="imgItem" v-for="(item, index) in PhotoUrl" :key="item">
          <img :src="item" alt="" />
          <div class="mask">
            <div class="icon">
              <i
                class="el-icon-search"
                @click="handlePictureCardPreview(item)"
              ></i>
              <i
                class="el-icon-delete"
                @click="handlePictureCardDel(index)"
              ></i>
            </div>
          </div>
        </div>
        <el-upload
          v-if="uploadReset"
          action=""
          :show-file-list="false"
          :on-change="handlePhotoChange"
          :before-upload="beforePhotoUpload"
          :auto-upload="false"
          :multiple="true"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="commitPhoto">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AlbumPicList: [],
      Album_name: "",
      hasPhoto: false,
      addDialog: false,
      PhotoList: [],
      PhotoUrl: [],
      uploadReset: false,
      dialogVisible: false,
      dialogImageUrl: "",
      pageInfo: {
        pageNum: 1,
        pageSize: 20,
        pageSizes:[20,40],
        total: 0,
      },
    };
  },
  methods: {
    getAlbumDetails() {
      this.$api
        .getAlbumDetails({
          album_id: this.$route.params.album_id,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
        })
        .then((res) => {
          if (res.status === 200) {
            this.Album_name = res.album_name;
            this.AlbumPicList = res.data;
            this.hasPhoto = true;
            this.pageInfo.total = res.total;
          } else {
            this.hasPhoto = false;
          }
        });
    },
    addPhoto() {
      this.addDialog = true;
      this.uploadReset = true; //Dialog中的upload组件上传图片后，关闭对话框，文件数组不清空，通过v-if重新创建upload组件
      this.PhotoList = [];
      this.PhotoUrl = [];
    },
    addClose() {
      this.addDialog = false;
      this.uploadReset = false; //Dialog中的upload组件上传图片后，关闭对话框，文件数组不清空，通过v-if重新创建upload组件
    },
    handlePhotoChange(file, fileList) {
      //将上传的文件列表保存起来
      this.PhotoList = [];
      this.PhotoUrl = [];
      this.PhotoList = fileList;
      this.PhotoList.map((item) => {
        this.PhotoUrl.push(URL.createObjectURL(item.raw));
      });
    },
    beforePhotoUpload() {},
    handlePictureCardPreview(photoUrl) {
      //图片预览
      this.dialogVisible = true;
      this.dialogImageUrl = photoUrl;
    },
    handlePictureCardDel(index) {
      //删除图片以及对应的文件
      this.PhotoList.splice(index, 1);
      this.PhotoUrl.splice(index, 1);
    },
    updatePhoto(newPageInfo) {
      this.pageInfo = newPageInfo;
      this.getAlbumDetails();
    },
    handlePhotoDel(photo_id) {
      this.$confirm("是否删除该照片", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          if (res === "confirm") {
            this.$api.delPhoto({ photo_id }).then((res) => {
              if (res.status === 200) {
                this.$message.success("删除成功");
                this.getAlbumDetails();
              }
            });
          }
        })
        .catch((err) => err);
    },
    commitPhoto() {
      let photoForm = new FormData();
      if (this.PhotoList.length > 0) {
        this.PhotoList.forEach((item) => {
          photoForm.append("picture", item.raw);
        });
        photoForm.append("album_id", this.$route.params.album_id);
        this.$api.uploadPhoto(photoForm).then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success("上传成功");
            this.addDialog = false;
            this.getAlbumDetails();
          } else {
            return this.$message.error("上传失败");
          }
        });
      }
    },
  },
  created() {
    this.getAlbumDetails();
  },
};
</script>

<style lang="less" scoped>
.container {
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
  .main {
    display: flex;
    flex-wrap: wrap;
    .imgBox {
      width: 120px;
      height: 120px;
      margin: 10px;
      position: relative;
      &:hover .mask {
        opacity: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .mask {
        height: 120px;
        width: 120px;
        background: rgba(136, 136, 136, 0.466);
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        i {
          font-size: 22px;
          color: rgb(2, 2, 80);
        }
      }
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        i {
          margin-right: 5px;
          cursor: pointer;
        }
      }
    }
  }
  .tips {
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(112, 112, 112);
  }
  .page{
      margin-top: 120px;
  }
  .addDialog {
    .box {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      .imgItem {
        width: 120px;
        height: 120px;
        margin: 10px;
        position: relative;
        &:hover .mask {
          opacity: 1;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .mask {
          height: 120px;
          width: 120px;
          background: rgba(136, 136, 136, 0.466);
          opacity: 0;
          position: absolute;
          right: 0;
          top: 0;
          i {
            font-size: 22px;
            color: rgb(2, 2, 80);
          }
        }
        .icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          i {
            margin-right: 5px;
            cursor: pointer;
          }
        }
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
}
</style>