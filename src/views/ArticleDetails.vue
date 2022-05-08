<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <div class="left_content">
        <el-card> </el-card>
      </div>
      <div class="right_content">
        <el-card></el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  .main {
    display: flex;
    .left_content {
      min-width: 65vw;
      min-height: 80vh;
      margin-top: 30px;
      margin-left: 40px;
    }
    .right_content {
      margin-left: 60px;
      margin-top: 30px;
      min-width: 20vw;
    }
  }
}
</style>