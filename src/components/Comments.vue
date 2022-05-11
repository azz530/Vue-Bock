<template>
  <div class="container">
    <div
      class="CommentsUser"
      v-for="item in CommentsInfo"
      :key="item.comments_id"
    >
      <div class="top">
        <div class="avatar">
          <el-avatar :src="item.avatar?item.avatar:defaultAvatar"></el-avatar>
        </div>

        <div class="message">
          <div class="username">
            {{ item.username }}
          </div>
          <div class="time">
            {{ item.comments_time }}
          </div>
        </div>
      </div>

      <div class="content" v-html="item.comments_content"></div>
      <div class="replay" @click="openReplay(item)">回复</div>
        
      <Replays :ReplayInfo="item.replay" :currentComment="item.comments_id" v-on:updateReplay="updateReplays" v-if="item.replay"></Replays>
      <div class="replayContent" v-if="item.showReplay">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="item.replayContent"
        >
        </el-input>
        <div class="btn">
          <el-button type="primary" @click="replay(item.comments_uid,item.comments_id,item.replayContent)">回复</el-button>
        </div>
      </div>

      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '../assets/img/avatar.jpg';
export default {
  props: {
    CommentsInfo: [],
  },
  data() {
    return {
      defaultAvatar,
    };
  },
  methods: {
    openReplay(item) {
      item.showReplay = true;
    },
    replay(id,comments_id,replayContent){
        if(replayContent){
            this.$api.addReplay({
                comments_id:comments_id,
                from_uid:this.$store.state.user.userInfo.user_id,
                replay_content:replayContent,
                to_uid:id,
            }).then(res=>{
                if(res.status !== 200){
                    return this.$message.error('回复失败');
                } else {
                    this.$message.success('回复成功');
                    this.$emit('updateComments',true);
                }
            })
        }
    },
    updateReplays(){
        this.$emit('updateComments',true);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .CommentsUser {
    .top {
      display: flex;
      .message {
        width: 200px;
        margin-left: 12px;
        .time {
          font-size: 14px;
          color: rgb(130, 131, 133);
        }
      }
    }
    .content {
      margin: 15px 0;
      padding-left: 10px;
    }
    .replay {
      text-align: center;
      margin-left: 60px;
      width: 40px;
      &:hover {
        cursor: pointer;
        color: rgb(76, 128, 241);
        background-color: rgb(241, 238, 238);
        border-radius: 5px;
      }
    }
    .replayContent {
      margin-top: 20px;
      .el-input {
        width: 200px;
      }
      .btn {
        text-align: right;
        margin-top: 10px;
      }
    }
  }
}
</style>