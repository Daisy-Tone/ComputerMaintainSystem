<template>
  <div>
    <div class="orderList" v-if="waitOrder.length">
      <div 
        class="orderItem" 
        v-for="(order,index) in waitOrder" 
        :key="index" 
        @click="showIndex(index)"
        >
        <img src="../assets/img/Img2.jpg" alt="">
        <div class="info">
          <p>订单标题：<span>{{order.irTitle}}</span></p>
          <p>发起人：<span>{{order.irId}}</span></p>
          <p>问题描述：<span>{{order.irContent}}</span></p>
          <p>订单状态：<span>待接单</span></p>
        </div>
      </div>
    </div>
    <van-empty v-if="!waitOrder.length" description="与订单擦肩而过，下次再来看看吧">
      <!-- <van-button round type="danger" class="bottom-button" @click="$router.push('/InitiateOrder')">去生成订单</van-button> -->
    </van-empty>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'OrderSquare',
  data() {
    return {

    }
  },
  activated(){
    this.init()
  },
  computed:{
    // 参数以数组格式获取
    ...mapState('order',['waitOrder']),
  },
  methods:{
    init(){
      this.$store.dispatch('order/getWatiOrder','0')
    },
    showIndex(index){
      console.log(index);

      // console.log(this.orderList[index]);

      this.$router.push({
        path:'/WaitOrderDetail',
        query:{
          index:JSON.stringify(index),
          orderDetail:JSON.stringify(this.waitOrder[index])
        }
      })
    }
  },
}
</script>

<style>
.orderList{
  /* width: 96%; */
  margin-bottom:50px ;
  overflow-y: scroll;
  height: 600px;
}
.orderItem{
  width: 100%;
  display: flex;
  margin: 15px 0;
  padding: 5px;
  box-shadow: 1px 1px 15px rgb(232, 232, 232);
  border-radius: 5px;
}
.orderItem img{
  height: 100px;
  width: 100px;
}
.orderItem .info{
  flex-grow: 3;
  padding: 0 0 0 5px;
}
.orderItem .info p{
  font-size: 14px;
}
.orderItem .info p span{
  color: rgb(157, 156, 156);
}
</style>