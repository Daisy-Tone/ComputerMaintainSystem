<template>
  <div class="message">
    <van-nav-bar title="消息列表" fixed right-text="客服"  @click-right="onClickRight"/>
    <div class="lists">
      <van-cell-group  @click="checkChild(index)" v-for="index in 8" :key="index">
        <van-cell value="昨天">
          <template #icon>
            <img src="../../assets/img/Img2.jpg" class="user_pto" />
          </template>
          <template #title>
            <span>张三</span>
          </template>
          <template #label>
            <span>发生什么事？</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickRight() {
      this.$router.push({
        path:'/MessageUser',
      })
    },
    checkChild(){
      this.$router.push({
        path:'/MessageUser',
      })
    }
  },
};
</script>

<style lang="less" scoped>
.message{
  margin-bottom: 100px;
}
/deep/.van-nav-bar__text{
  color: #323233;
  font-size: 16px;
}
.lists {
  margin-top: 46px;
}
.van-cell{
  padding: 0.15rem 0.15rem;
}
.van-cell-group{
  .user_pto {
    width: 45px;
    height: 45px;
    border-radius: 5px;
  }
  .van-cell__title, .van-cell__value{
    margin-left:5px;
  }
  .van-cell__title{
    font-size: 14px;
  }
  .van-cell__label,.van-cell__value{
    font-size: 12px;
  }
}
</style>