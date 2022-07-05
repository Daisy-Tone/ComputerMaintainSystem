<template>
  <div>
    <Back title="订单详情"/>
    <div class="detail">
      <p>订单编号：{{orderDetail.irId}}</p>
      <p>发起人ID：{{orderDetail.irUserId}}</p>
      <p>订单状态：待接单</p>
      <p>问题描述：{{orderDetail.irContent}}</p>
      <p v-if="showImg">图片描述：</p>
      <div class="imgBlock" id="imgBlock" v-if="showImg">
          <img id="img" v-for="(item,index) in imgs" :key="index" :src="item" @click="sceneImg(imgs,index)"/>
      </div>
      <van-button type="primary" block @click="takeOrder">接下订单</van-button>
    </div>
    <!-- <div class="detail">
      <p>订单编号：{{orderDetail.CPUType}}</p>
      <p>发起者用户编号：{{$route.query.orderDetail.irUserId}}</p>
      <p>维修员用户编号：{{$route.query.orderDetail.mtUserId}}</p>
      <p>订单状态：{{$route.query.orderDetail.ordStatus}}</p>
      <p>问题描述：{{$route.query.orderDetail.irContent}}</p>
      <p>图片描述：</p>
      <div class="imgBlock">
        <img v-for="(img,index) in $route.query.orderDetail.imgs" :key="index" :src="this.$route.query.orderDetail.imgs[index]" alt="">
      </div>
      <p>订单价格：{{$route.query.orderDetail.ordStatus}}</p>
      <van-button type="primary" block @click="deleteOrder">删除订单</van-button>
    </div> -->
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import { Dialog, Toast } from 'vant'
import Back from './Back.vue'
// import { Dialog } from 'vant';

export default {
    name:'WaitOrderDetail',
    components:{Back},
    data() {
      return {
        orderDetail:{},
        index:0,
        irId:0,
        mtUserId:'',
        irImgUrl:'',
        address:'',
        imgs:[],
        ordStatus:'',
        showImg:false,
        userInfo:{}
      }
    },
    // created(){
    //   // this.orderDetail = JSON.parse(this.$route.query.orderDetail)
    //   // this.index = JSON.parse(this.$route.query.index)
    //   this.orderDetail = this.$route.query.orderDetail
    //   this.index = this.$route.query.index
    //   console.log(this.index);
    // },
    activated(){
      // 路由的值
      this.index = JSON.parse(this.$route.query.index)
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      this.orderDetail = JSON.parse(this.$route.query.orderDetail)
      this.irId = JSON.parse(this.$route.query.orderDetail).irId

      this.mtUserId = this.userInfo.userid
      this.address = this.userInfo.address
      this.irImgUrl = JSON.parse(this.$route.query.orderDetail).irImgUrl
      this.ordStatus = JSON.parse(this.$route.query.orderDetail).irState
      this.imgs = this.irImgUrl.split(',')
      console.log(this.imgs);
      if(this.imgs[0]===' '){
        this.showImg = false
      }
      else this.showImg = true
      console.log(this.showImg);
      console.log(this.userInfo);
      // console.log(this.index);
      // console.log(this.orderDetail);
      // console.log(this.irId);
      // console.log(this.mtUserId);
      // console.log(this.irImgUrl);
      // console.log(this.ordStatus);
    },
    methods:{
      // 图片预览
      sceneImg(images,index) {
        ImagePreview({
          images:images, //需要预览的图片 URL 数组
          showIndex:true, //是否显示页码
          loop:false, //是否开启循环播放
          startPosition:index //图片预览起始位置索引
        })
      },
      // 接单
      takeOrder(){
        console.log(this.index);
        let obj = {
          irId : this.irId,
          mtUserId : this.mtUserId,
          ordCheck : '',
          ordCheckPhoto : this.irImgUrl,
          ordStatus : 1,
          irTn : '',
          mtTn : '',
        }
        if(this.address){
          Dialog.confirm({
            message: '确认接单？',
          })
          .then(() => {
            this.$store.dispatch('order/takeOrder',obj)
            Toast('接单成功！')
            this.$router.back()
          })
          .catch(() => {
            // on cancel
          });
        }
        else{
          Toast('完善收货地址后才可以接单哦！')
        }
      }
    },
    destroyed(){
      this.orderDetail = []
    }
}
</script>

<style scoped>
.detail{
  width: 96%;
  margin: 5px auto;
  padding: 5px 10px;
}
.detail p{
  margin: 5px 0;
  font-size: 16px;
}
.van-button{
  background-color: #1989FA;
  border: none;
}
.imgBlock{
  display: flex;
  flex-flow: wrap;
  padding: 5px 3px;
  width: 100%;
  margin: 5px auto 6px auto;
  /* border: 1px solid rgb(137, 137, 137); */
  border-radius: 5px;
  box-shadow: 2px 2px 6px rgb(148, 148, 148);
}
.imgBlock img{
  border: 1px solid rgb(95, 95, 95);
  width: 60px;
  height: 60px;
  margin: 0 2px;
}
.van-uploader__input{
  display: none;
}
</style>