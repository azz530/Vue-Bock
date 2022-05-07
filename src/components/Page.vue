<template>
  <div class="container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-sizes="[5, 10]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Page",
  data() {
      return{

      }
  },
  methods: {
      handleSizeChange(newSize){
        this.pageInfo.pageSize = newSize;
        this.$emit('pageChange',this.pageInfo);
      },
      handleCurrentChange(newPage){
        this.pageInfo.pageNum = newPage;
        this.$emit('pageChange',this.pageInfo);
      },
  },
  props:{
      pageInfo:{

      }
  }
};
</script>

<style lang="less" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

