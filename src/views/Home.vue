<template>
  <div class="home">
    <Header></Header>
    <div class="main">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 800px) {
  .home {
    .main {
      height: 100vh;
      background-color: rgba(255, 252, 252, 0.678);
      .slide-fade-enter-active {
        transition: all 0.8s ease;
      }
      .slide-fade-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
         
      }
      .slide-fade-enter,
      .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
        display: none;
      }
    }
  }
}
</style>
