<template>
  <div class="container">
    <el-card class="msgTop">
      <div class="avatar">
        <el-avatar
          :size="80"
          :src="
            $store.state.user.userInfo.avatar
              ? store.user.userInfo.avatar
              : defaultAvatar
          "
        >
        </el-avatar>
      </div>
      <div class="usermsg">
        <h2 class="username">
          {{ $store.state.user.userInfo.username }}
        </h2>
        <div class="usersign">
          {{
            $store.state.user.userInfo.usersign
              ? $store.state.user.userInfo.usersign
              : "该用户暂无签名"
          }}
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
            :class="
              $store.state.user.userInfo.sex === '男'
                ? 'el-icon-male'
                : 'el-icon-female'
            "
          ></i>
          性别:
          <div
            :class="
              $store.state.user.userInfo.sex ? 'item_valueActive' : 'item_value'
            "
          >
            {{
              $store.state.user.userInfo.sex
                ? $store.state.user.userInfo.sex
                : "暂未补充个人资料"
            }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-postcard"></i>
          签名:
          <div
            :class="
              $store.state.user.userInfo.usersign
                ? 'item_valueActive'
                : 'item_value'
            "
          >
            {{
              $store.state.user.userInfo.usersign
                ? $store.state.user.userInfo.usersign
                : "暂未补充个人资料"
            }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-star-off"></i>
          兴趣:
          <div
            :class="
              $store.state.user.userInfo.hobby
                ? 'item_valueActive'
                : 'item_value'
            "
          >
            {{
              $store.state.user.userInfo.hobby
                ? $store.state.user.userInfo.hobby
                : "暂未补充个人资料"
            }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-message"></i>
          邮箱:
          <div
            :class="
              $store.state.user.userInfo.email
                ? 'item_valueActive'
                : 'item_value'
            "
          >
            {{
              $store.state.user.userInfo.email
                ? $store.state.user.userInfo.email
                : "暂未补充个人资料"
            }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-present"></i>
          生日:
          <div
            :class="
              $store.state.user.userInfo.birthday
                ? 'item_valueActive'
                : 'item_value'
            "
          >
            {{
              $store.state.user.userInfo.birthday
                ? $store.state.user.userInfo.birthday
                : "暂未补充个人资料"
            }}
          </div>
        </div>
        <div class="item">
          <i class="el-icon-location-information"></i>
          地址:
          <div
            :class="
              $store.state.user.userInfo.address
                ? 'item_valueActive'
                : 'item_value'
            "
          >
            {{
              $store.state.user.userInfo.address
                ? $store.state.user.userInfo.address
                : "暂未补充个人资料"
            }}
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
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              :src="
                $store.state.user.userInfo.avatar
                  ? $store.state.user.userInfo.avatar
                  : defaultAvatar
              "
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
          <el-date-picker v-model="EditorForm.birthday" type="date" placeholder="选择日期">
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
    };
  },
  methods: {
    openEditorDialog() {
      this.editDialog = true;
      this.EditorForm = this.$tools.deepCopy(this.$store.state.user.userInfo);
      this.EditorForm.hobby = [];
    },

    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
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
      if (inputValue) {
        this.EditorForm.hobby.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    commitEditorForm() {},
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