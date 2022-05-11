<template>
  <div class="container">
    <div class="albumItem" v-for="item in AlbumInfo" :key="item.album_id">
      <div class="page">
        <img
          :src="item.album_page"
          alt=""
        />
      </div>
      <h2>{{item.album_name}}</h2>
      <p>{{item.album_description}}</p>
      <a href="#">进入相册</a>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        AlbumInfo:[],
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
    a {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 4px 15px;
      border-radius: 4px;
      margin-bottom: 10px;
      &:hover {
        color: #fff;
        background-color: rgba(235, 237, 240, 0.24);
      }
    }
  }
}
</style>