<template>
  <div id="chatmsg" ref="msg">
    <div v-for="(chat,index) in chat" :key="index">
      <div v-if="chat.type === 'chatter'" class="chatBox">
        <img src="../../assets/img/Img3.jpg">
        <div class="chatBlock">
          <p>{{chat.content}}</p>
        </div>
      </div>

      <div v-if="chat.type === 'me'" class="chatBox chatBox2">
        <img src="../../assets/img/Img1.jpg">
        <div class="chatBlock">
          <p>{{chat.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 name:'ChatMessage',
 props:['chat']
}
</script>

<style lang="less" scoped>
.chatBox{
  display: flex;
  align-items: stretch;
}
.chatBox img{
  width: 35px;
  height: 35px;
  margin: 5px;
  border-radius: 5px;
}
.chatBlock p{
  margin-top: 5px;
  max-width: 200px;
  padding: 5px 5px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid rgb(222, 222, 222);
  font-size: 14px;
}
.chatBox2{
  flex-direction: row-reverse;
}
</style>