<template>
  <div class="container">
    <div class="login_form">
      <i class="el-icon-arrow-left" @click="backLogin">返回</i>
      <div class="title">注册</div>
      <input type="text" v-model="userForm.username" placeholder="用户名" />
      <div class="password">
        <input
          type="password"
          ref="psw"
          v-model="userForm.password"
          placeholder="密码"
        /><i
          :class="
            isShowPsw
              ? 'iconfont icon-yanjing_yincang_o'
              : 'iconfont icon-yanjing_xianshi_o'
          "
          @click="showPsw"
        ></i>
      </div>
      <div class="checkPsw">
        <input
          type="password"
          ref="checkPsw"
          v-model="userForm.checkpassword"
          placeholder="确认密码"
        /><i
          :class="
            isShowCheckPsw
              ? 'iconfont icon-yanjing_yincang_o'
              : 'iconfont icon-yanjing_xianshi_o'
          "
          @click="showCheckPsw"
        ></i>
      </div>
      <button @click="register">注册</button>
    </div>
    <div class="square">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="circle">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      userForm: {},
      isShowPsw: false,
      isShowCheckPsw: false,
    };
  },
  methods: {
    //密码显示与隐藏
    showPsw() {
      this.isShowPsw = !this.isShowPsw;
      if (this.isShowPsw) {
        this.$refs.psw.type = "text";
      } else {
        this.$refs.psw.type = "password";
      }
    },
    //确认密码显示与隐藏
    showCheckPsw() {
      this.isShowCheckPsw = !this.isShowCheckPsw;
      if (this.isShowCheckPsw) {
        this.$refs.checkPsw.type = "text";
      } else {
        this.$refs.checkPsw.type = "password";
      }
    },
    register() {
      if (
        this.userForm.username &&
        this.userForm.password &&
        this.userForm.checkpassword
      ) {
        if (this.userForm.password === this.userForm.checkpassword) {
          this.$api.register(this.userForm).then((res) => {
            console.log(res);
            if (res.status !== 200) {
              if (res.status === 403) {
                return this.$message.error("该用户名已被使用");
              }
              return this.$message.error("注册失败");
            } else {
              this.$message.success("注册成功");
              this.$router.push("/login");
            }
          });
        } else {
          this.$message.error("两次密码不一致");
        }
      } else {
        this.$message.error("请填写用户信息");
      }
    },
    backLogin(){
      this.$router.push('/login')
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 800px) {
  .container {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(200deg, #e3c5eb, #a9c1ed);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .login_form {
      width: 400px;
      height: 450px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 15px;
      background-color: #fff;
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      position: relative;
      .el-icon-arrow-left {
        position: absolute;
        left: 10px;
        top: 10px;
        cursor: pointer;
      }
      .title {
        font-size: 24px;
        margin: 60px auto 40px auto;
      }
      input {
        width: 350px;
        height: 30px;
        text-indent: 8px;
        border: none;
        border-bottom: 1px solid #ddd;
        outline: none;
        margin: 12px auto;
      }
      .password {
        position: relative;
        i {
          font-size: 18px;
          position: absolute;
          right: 10px;
          bottom: 20px;
          color: #c5c5c5;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .checkPsw {
        position: relative;
        i {
          font-size: 18px;
          position: absolute;
          right: 10px;
          bottom: 20px;
          color: #c5c5c5;
          &:hover {
            cursor: pointer;
          }
        }
      }
      button {
        width: 280px;
        height: 40px;
        margin: 35px auto 40px auto;
        border: none;
        background: linear-gradient(-200deg, #fac0e7, #80a6f875, #aac2ee);
        color: #fff;
        font-weight: bold;
        letter-spacing: 8px;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          background: linear-gradient(-200deg, #aac2ee, #80a6f875, #fac0e7);
        }
      }
    }
    ul li {
      position: absolute;
      border: 1px solid #fff;
      background-color: #fff;
      width: 30px;
      height: 30px;
      opacity: 0;
    }
    .square li {
      top: 40vh;
      left: 70vw;
      animation: square 10s linear infinite;
    }
    .square li:nth-child(2) {
      top: 80vh;
      left: 10vw;
      animation-delay: 2s;
    }
    .square li:nth-child(3) {
      top: 80vh;
      left: 85vw;
      animation-delay: 4s;
    }
    .square li:nth-child(4) {
      top: 10vh;
      left: 10vw;
      animation-delay: 6s;
    }
    .square li:nth-child(5) {
      top: 80vh;
      left: 30vw;
      animation-delay: 8s;
    }
    .circle li {
      bottom: 0;
      left: 15vw;
      animation: circle 10s linear infinite;
    }
    .circle li:nth-child(2) {
      left: 35vw;
      animation-delay: 2s;
    }
    .circle li:nth-child(3) {
      left: 65vw;
      animation-delay: 4s;
    }
    .circle li:nth-child(4) {
      left: 75vw;
      animation-delay: 6s;
    }
    .circle li:nth-child(5) {
      left: 90vw;
      animation-delay: 8s;
    }
    @keyframes square {
      0% {
        transform: scale(0) rotateY(0deg);
        opacity: 1;
      }
      100% {
        transform: scale(5) rotateY(1000deg);
        opacity: 0;
      }
    }
    @keyframes circle {
      0% {
        transform: scale(0) rotateY(0deg);
        opacity: 1;
        bottom: 0;
        border-radius: 0;
      }
      100% {
        transform: scale(5) rotateY(1000deg);
        opacity: 0;
        bottom: 90vh;
        border-radius: 50%;
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon-arrow-left {
      position: absolute;
      left: 10px;
      top: 10px;
    }
    .login_form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      position: relative;
      .el-icon-arrow-left {
        position: absolute;
        left: 10px;
        top: 10px;
        cursor: pointer;
      }
      .title {
        font-size: 24px;
        margin: 60px auto 40px auto;
      }
      input {
        width: 350px;
        height: 30px;
        text-indent: 8px;
        border: none;
        border-bottom: 1px solid #ddd;
        outline: none;
        margin: 12px auto;
      }
      .password {
        position: relative;
        i {
          font-size: 18px;
          position: absolute;
          right: 10px;
          bottom: 20px;
          color: #c5c5c5;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .checkPsw {
        position: relative;
        i {
          font-size: 18px;
          position: absolute;
          right: 10px;
          bottom: 20px;
          color: #c5c5c5;
          &:hover {
            cursor: pointer;
          }
        }
      }
      button {
        width: 280px;
        height: 40px;
        margin: 35px auto 40px auto;
        border: none;
        background: linear-gradient(-200deg, #fac0e7, #80a6f875, #aac2ee);
        color: #fff;
        font-weight: bold;
        letter-spacing: 8px;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          background: linear-gradient(-200deg, #aac2ee, #80a6f875, #fac0e7);
        }
      }
    }
  }
}
</style>