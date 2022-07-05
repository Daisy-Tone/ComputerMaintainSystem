<template>
<div>
  <van-tabbar route v-if="path">
    <van-tabbar-item replace to="/Home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/MessageLists" icon="chat-o">消息</van-tabbar-item>
    <van-tabbar-item replace to="/My_user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>

export default {
  name:'BottonNav',
  computed:{
    //在文章界面不显示底部导航
    path(){
      const nowPath = [
        '/Home','/Home/RecommenedArticles','/Home/OrderSquare',
        '/My_user','/MessageLists'
      ]
      if(nowPath.indexOf(this.$route.path) !== -1){
        return true
      }
      return false
    }
  },
 
}
</script>

<style>

</style>