<template>
  <div>
    <Back title="我的订单"></Back>
    <div class="orderList" v-if="orderArray.length">
      <!-- <div>{{orderArray}}</div> -->
      <div class="orderItem" v-for="(order,index) in orderArray" :key="index" 
        @click="gotoDetail(index)">
        <img src="../../assets/img/Img2.jpg" alt="">
        <div class="info">
          <p>订单标题：<span>{{order.irTitle}}</span></p>
          <p>发起人ID：<span>{{order.irUserId}}</span></p>
          <p>维修员ID：<span>{{order.mtUserId}}</span></p>
          <p>问题描述：<span>{{order.irContent}}</span></p>
          <p>订单状态：
            <span>{{order.ordStatus===0 ? '订单完成'
              : order.ordStatus===1 ? '快递未寄出' : '快递未寄回'}}</span>
          </p>
        </div>
      </div>
    </div>

    <van-empty v-if="!orderArray.length" description="啊嘞？我还没有订单">
      <!-- <van-button round type="danger" class="bottom-button" @click="$router.push('/InitiateOrder')">去生成订单</van-button> -->
    </van-empty>
  </div>
</template>

<script>
import Back from '../Back.vue'
import { mapState } from 'vuex'
export default {
  name:'OrderSquare',
  components:{Back},
  data() {
    return {
      userid: 0,
      type : 0,
    }
  },
  activated(){
    this.init()
  },
  computed:{
    // 参数以数组格式获取
    ...mapState('order',['orderArray'])
  },
  methods:{
    init(){
      // 缓存数据
      this.userid = JSON.parse(window.localStorage.getItem('userInfo')).userid
      this.type = JSON.parse(window.localStorage.getItem('userInfo')).type
      console.log(this.userid);
      console.log(this.type);
      let obj = {
        userid : this.userid + '',
        type : this.type
      }
      // console.log('输出userid',obj);
      this.$store.dispatch('order/getMyOrder',obj)
    },
    gotoDetail(index){
      console.log(index);
      let ir = this.orderArray[index].ir_entity
      let mt = this.orderArray[index].mt_entity
      this.$router.push({
        path:'/OrderDetail',
        query:{
          index:JSON.stringify(index),
          orderDetail:JSON.stringify(this.orderArray[index]),
          ir:JSON.stringify(ir),
          mt:JSON.stringify(mt),
        }
      })
    }
  },
}
/* import { mapState } from 'vuex'
export default {
  name:'OrderList',
  components:{ Back },
  data() {
    return {
      orderList:[
        {
          imgs:['../../assets/img/Img2.jpg','../../assets/img/Img2.jpg'],
          CPUType:'华为',
          CPUOs:'Windows6',
          description:'有一个小问题',
          state:'待接单'
        },
        {
          imgs:['../../assets/img/Img2.jpg','../../assets/img/Img2.jpg'],
          CPUType:'华硕',
          CPUOs:'Linux',
          description:'没有小问题',
          state:'正在维修'
        }
      ]
    }
  },
  activated(){
    this.init()
  },
  computed:{
    // 参数以数组格式获取
    ...mapState('order',['orderArray']),
  },
  methods:{
    init(){
      this.$store.dispatch('order/getOrderID','')
    },
    showIndex(index){
      console.log(index);
      console.log(this.orderArray.list[index]);

      this.$router.push({
        path:'/OrderDetail',
        query:{
          // articleText:articles[index]
          orderDetail:this.orderArray.list[index],
          index:index
        }
      })
    },
    show(index){
      console.log(index);
    }
  },
} */
</script>

<style>
.orderList{
  width: 96%;
  margin: 10px auto;
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