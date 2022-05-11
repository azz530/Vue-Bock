<template>
  <div class="container">
    <el-card class="msgTop">
      <div class="avatar">
        <el-avatar
          :size="80"
          :src="userInfo.avatar ? userInfo.avatar : defaultAvatar"
        >
        </el-avatar>
      </div>
      <div class="usermsg">
        <h2 class="username">
          {{ userInfo.username }}
        </h2>
        <div class="usersign">
          {{ userInfo.usersign ? userInfo.usersign : "该用户暂无签名" }}
        </div>
      </div>
    </el-card>

    <el-card class="msgFooter">
      <div class="top">
        用户信息
        <div class="edit" @click="openEditorDialog">
          <i class="el-icon-edit"></i>
          编辑
        </div>
      </div>
      <el-divider></el-divider>
      <div class="content">
        <div class="item">
          <i
            :class="userInfo.sex === '男' ? 'el-icon-male' : 'el-icon-female'"
          ></i>
          性别:
          <div :class="userInfo.sex ? 'item_valueActive' : 'item_value'">
            {{ userInfo.sex ? userInfo.sex : "暂未补充个人资料" }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-postcard"></i>
          签名:
          <div :class="userInfo.usersign ? 'item_valueActive' : 'item_value'">
            {{ userInfo.usersign ? userInfo.usersign : "暂未补充个人资料" }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-star-off"></i>
          兴趣:
          <div :class="userInfo.hobby ? 'item_valueActive' : 'item_value'">
            <el-tag :key="tag" v-for="tag in userInfo.hobby">
              {{ tag }}
            </el-tag>
          </div>
        </div>
        <div class="item">
          <i class="el-icon-message"></i>
          邮箱:
          <div :class="userInfo.email ? 'item_valueActive' : 'item_value'">
            {{ userInfo.email ? userInfo.email : "暂未补充个人资料" }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-present"></i>
          生日:
          <div :class="userInfo.birthday ? 'item_valueActive' : 'item_value'">
            {{ userInfo.birthday ? userInfo.birthday : "暂未补充个人资料" }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-location-information"></i>
          地址:
          <div :class="userInfo.address ? 'item_valueActive' : 'item_value'">
            {{ userInfo.address ? userInfo.address : "暂未补充个人资料" }}
          </div>
        </div>
      </div>
    </el-card>

    <el-dialog
      class="userForm"
      title="编辑资料"
      :visible.sync="editDialog"
      width="40%"
    >
      <el-form :model="EditorForm" label-width="80px">
        <el-form-item label="用户名:">
          <el-input v-model="EditorForm.username"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <!-- <el-input v-model="EditorForm.avatar"></el-input> -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
          >
            <img v-if="uploadAvatar" :src="uploadAvatar" alt="" />
            <img
              v-else
              :src="userInfo.avatar ? userInfo.avatar : defaultAvatar"
              class="avatar"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio v-model="EditorForm.sex" label="男">男</el-radio>
          <el-radio v-model="EditorForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="签名:">
          <el-input v-model="EditorForm.usersign"></el-input>
        </el-form-item>
        <el-form-item label="兴趣:">
          <el-tag
            :key="tag"
            v-for="tag in EditorForm.hobby"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
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
            >添加兴趣</el-button
          >
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="EditorForm.email"></el-input>
        </el-form-item>
        <el-form-item label="生日:">
          <el-date-picker
            v-model="EditorForm.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="EditorForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="commitEditorForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import defaultAvatar from "../../assets/img/avatar.jpg";
export default {
  data() {
    return {
      defaultAvatar: defaultAvatar,
      editDialog: false,
      EditorForm: {},
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      uploadAvatar: "",
      userInfo: {},
      file: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$api
        .getUserInfo({ user_id: this.$store.state.user.userInfo.user_id })
        .then((res) => {
          if (res.status !== 200) {
            return this.$message.error("获取用户信息失败");
          } else {
            res.data.birthday = this.$tools.formatDate(
              res.data.birthday,
              "YYYY-MM-DD"
            );
            if (res.data.hobby) {
              res.data.hobby = res.data.hobby.split(",");
            }
            this.userInfo = res.data;
            this.$store.commit("setUser", this.userInfo);
          }
        });
    },

    openEditorDialog() {
      this.editDialog = true;
      this.EditorForm = this.$tools.deepCopy(this.userInfo);
      this.EditorForm.hobby = [];
    },

    beforeAvatarUpload() {},
    handleAvatarChange(file) {
      this.uploadAvatar = URL.createObjectURL(file.raw);
      this.file = file;
    },
    handleClose(tag) {
      this.EditorForm.hobby.splice(this.EditorForm.hobby.indexOf(tag), 1);
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
        for (let i in this.EditorForm.hobby) {
          if (this.EditorForm.hobby[i].indexOf(inputValue) > -1) {
            this.$message.error("该标签已存在");
            this.inputVisible = false;
            flag = false;
          }
        }
        if (flag) {
          this.EditorForm.hobby.push(inputValue);
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    commitEditorForm() {
      let userForm = new FormData();
      if (this.file) {
        userForm.append("avatar", this.file.raw);
      }
      this.EditorForm.birthday = this.$tools.formatDate(
        this.EditorForm.birthday,
        "YYYY-MM-DD"
      );
      userForm.append("user_id", this.EditorForm.user_id);
      userForm.append("username", this.EditorForm.username);
      userForm.append("sex", this.EditorForm.sex);
      userForm.append("usersign", this.EditorForm.usersign);
      userForm.append("hobby", this.EditorForm.hobby);
      userForm.append("email", this.EditorForm.email);
      userForm.append("birthday", this.EditorForm.birthday);
      userForm.append("address", this.EditorForm.address);
      this.$api.editorUserInfo(userForm).then((res) => {
        if (res.status !== 200) {
          this.$message.error("修改个人资料失败");
          this.editDialog = false;
        } else {
          this.$message.success("修改个人资料成功");
          this.editDialog = false;
          this.getUserInfo();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .msgTop {
    width: 100%;
    padding: 2px;
    display: flex;
    justify-content: center;
    /deep/.el-card__body {
      width: 100%;
      display: flex;
      .usermsg {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2 {
          padding-bottom: 10px;
        }
        .usersign {
          font-size: 14px;
          color: rgb(136, 136, 136);
        }
      }
    }
  }
  .msgFooter {
    margin-top: 40px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .edit {
        cursor: pointer;
        color: rgb(58, 136, 252);
        &:hover {
          color: rgb(59, 59, 250);
        }
      }
    }
    .content {
      padding-left: 10px;
      .item {
        font-size: 16px;
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        .el-tag {
          margin-right: 10px;
        }
        i {
          font-size: 16px;
          margin-right: 5px;
        }
        .item_valueActive {
          margin-left: 10px;
        }
        .item_value {
          margin-left: 10px;
          color: rgb(155, 154, 153);
        }
      }
    }
  }

  .userForm {
    .el-form {
      .el-upload {
        img {
          width: 150px;
          height: 150px;
          border: 1px dashed rgb(175, 175, 175);
        }
      }
    }
  }
}
</style>