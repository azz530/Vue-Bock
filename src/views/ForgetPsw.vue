<template>
  <div class="container">
    <div class="login_form">
      <div class="title">登录</div>
      <input type="text" v-model="loginForm.username" placeholder="用户名" />
      <input type="password" v-model="loginForm.password" placeholder="密码" />
      <button>登录</button>
      <div class="to">
        <span>还没有账号?</span>
        <router-link to="/register" class="register">去注册</router-link>
        <router-link to="/forgetPsw" class="forgetPsw">忘记密码</router-link>
      </div>
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
  name: "ForgetPsw",
  data() {
    return {
      loginForm: {},
    };
  },
  methods: {
    Login() {},
  },
};
</script>

<style lang="less" scoped>
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
</style>