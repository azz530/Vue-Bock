<template>
  <div class="home">
    <Header></Header>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  created() {
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 800px) {
  .home {
    .main{
      height: 100vh;
      background-color: rgba(255, 252, 252, 0.678);
    }
  }
}
</style>
