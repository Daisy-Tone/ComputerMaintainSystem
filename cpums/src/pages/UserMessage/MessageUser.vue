<template>
  <div>
    <!--顶部-->
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-button type="danger" size="small">举报</van-button>
      </template>
    </van-nav-bar>

    <!--聊天内容-->
    <div class="chatcontent">
      <ChatMessage :chat="chat"></ChatMessage>
    </div>

    <!--发送框-->
    <van-grid :border="false" class="messageNav">
      <!-- <van-grid-item style="flex:0 0 10%">
        <van-icon name="volume-o" />
      </van-grid-item> -->
      <van-grid-item style="flex:0 0 72%">
        <van-field v-model="value" rows="1" autosize type="textarea" />
      </van-grid-item>
      <!--
      <van-grid-item style="flex-basis: 8%">
        <van-icon name="smile-o" />
      </van-grid-item>
      -->
      <!-- <van-uploader>
        <van-button icon="plus" type="primary" size="small"></van-button>
      </van-uploader> -->
      <!-- <van-grid-item style="flex-basis: 8%">
        <van-icon name="add-o" />
      </van-grid-item> -->
      <van-button type="primary" size="small" style="flex:0 0 15%" @click="sendMsg">发送</van-button>
    </van-grid>
  </div>
</template>

<script>
import ChatMessage from "./ChatMessage.vue";
export default {
  components: { ChatMessage },
  data() {
    return {
      title: "二哥",
      value: "",
      chat:[
        {
          type:'chatter',
          name:'二哥',
          content:'你好的'
        },
        {
          type:'me',
          name:'Tone',
          content:'芜湖，起飞，飞，这么说，啊飞'
        },
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push("/Report");
    },
    sendMsg(){
      // 去除文本左右两侧的空格
      if(this.value.trim()){
        let obj = {
          type:'me',
          name:'Tone',
          content:this.value
        }
        this.chat.push(obj);
      }
      // console.log(this.msg);
      this.value = '';
    },
  },
};
</script>

<style lang="less" scoped>
.messageNav{
  // padding-bottom: 10px;
  margin-bottom: -10px;
}
.van-grid{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /deep/ .van-field {
    border: 1px solid rgb(228, 228, 228);
    border-radius: 5px;
    height: 32px;
    padding: 2px 2px 2px 5px;
  }
  /deep/ .van-button{
    margin: auto 0;
  }
}
.van-uploader{
  height: 0.64rem;
  line-height: 44px;
  .van-button{
    width: 35px;
    height: 32px;
    margin-right: 5px;
  }
}
// .van-grid {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   /deep/.van-icon {
//     font-size: 20px;
//   }
//   /deep/.van-field {
//     border: 1px solid rgb(228, 228, 228);
//     border-radius: 5px;
//     padding: 18px;
//     width: 260px;
//   }
//   /deep/.van-field__control {
//     margin-top: -10px;
//   }
//   /deep/.van-grid-item {
//     width: 15px;
//     padding-left: 10px;
//   }
//   /deep/.van-grid-item:last-child {
//     padding-left: 20px;
//   }
//   /deep/.van-grid-item__content {
//     height: 25px;
//   }
// }
// .van-button {
//   padding: 5px 10px;
// }
</style>