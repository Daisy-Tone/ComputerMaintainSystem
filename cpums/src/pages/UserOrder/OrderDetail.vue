<template>
  <div>
    <Back title="订单详情"/>
    <div class="detail">
      <p>订单编号：{{orderDetail.ordId}}</p>
      <p>发起人昵称：{{ir.username}}</p>
      <p style="color:rgb(148, 148, 148)">发起人ID：{{orderDetail.irUserId}}</p>
      <p style="color:rgb(148, 148, 148)">发起人地址：{{ir.address}}</p>
      <p style="color:rgb(148, 148, 148)">发起人快递单号：{{orderDetail.irTn}}</p>
      <p>维修员昵称：{{mt.username}}</p>
      <p style="color:rgb(148, 148, 148)">维修员ID：{{orderDetail.mtUserId}}</p>
      <p style="color:rgb(148, 148, 148)">维修员地址：{{mt.address}}</p>
      <p style="color:rgb(148, 148, 148)">维修员快递单号：{{orderDetail.mtTn}}</p>
      <p>问题描述：{{orderDetail.irContent}}</p>

      <div v-if="showUserImg">
        <p>用户图片描述：</p>
        <div class="imgBlock" id="imgBlock">
            <img id="img" v-for="(item,index) in imgs" :key="index" :src="item" @click="sceneImg(imgs,index)"/>
        </div>
      </div>
      <div>
        <p>维修员图片描述：</p>
        <div class="imgBlock" id="imgBlock">
            <img id="img" v-for="(item,index) in MtShowImgs" :key="index" :src="item" @click="sceneImg(MtShowImgs,index)"/>
        </div>
      </div>
      
      <div style="display:flex">
        <p>订单状态：{{orderDetail.ordStatus===0 ? '订单完成' 
          : orderDetail.ordStatus===1 ? '快递未寄出': '快递未寄回'}}
        </p>

        <!-- 状态为2（用户点击）并且用户类型不为1（普通用户）时可见 -->
        <button
          class="changeStatusBtn"
          @click="changeStatus"
          v-if="orderDetail.ordStatus!=2&&!userType"
          >我要寄件</button>
        <!-- 状态不为2（用户点击）并且用户类型为1（维修员）时可见 -->
        <button
          class="changeStatusBtn"
          @click="changeStatus"
          v-if="orderDetail.ordStatus==2&&userType"
          >完成订单</button>
      </div>

      <p>订单创建时间：{{orderDetail.created}}</p>
      <p>订单价格：
        <span v-if="showPrice" style="color:red;font-size:18px;font-weight:600">
            ￥{{orderDetail.ordPrice}}
        </span><br>
      </p>

      <van-button
        class="delete"
        type="primary"
        style="background-color:rgb(57, 226, 42)"
        block
        v-if="!userType&&orderDetail.ordStatus === 2&&ordPrice"
        @click="pay"
      >
      付款</van-button>
      <van-button class="pricing" 
        type="primary" 
        block
        @click="showUpdate = true">
        修改订单</van-button>
      <van-button class="delete" type="primary" block >删除订单</van-button>
      <!-- <van-button class="delete" type="primary" block @click="deleteOrder">删除订单</van-button> -->
      
      
      <!-- 弹窗 -->
      <van-popup class="popuop" v-model="showUpdate" round position="bottom" :style="{ height: userType ? '50%' : '20%' }">
        <!-- <van-field
          v-model="ordPrice"
          type="number"
          center
          label="订单价格"
          clearable
          placeholder="请输入订单价格"
        >
        </van-field> -->
        <van-field v-model="ordPrice"
         center clearable
         v-if="userType"
         type="number" label="订单价格" 
         placeholder="请输入订单价格"/>
        
        <!-- 用户输入快递单号 -->
        <van-field v-model="irTn"
          id="irTnIpt"
          center
          :disabled='irTn'
          v-if="!userType&&showirTn&&irTn"
          type="number" label="用户快递单号" 
          placeholder="请输入快递单号"/>
        <!-- 维修员输入快递单号 -->
        <van-field v-model="mtTn"
          id="mtTnIpt"
          :disabled="mtTn"
          center 
          v-if="userType&&showmtTn&&mtTn"
          type="number" label="维修员快递单号" 
          placeholder="请输入快递单号"/>

        <div v-if="userType">
          <van-field name="uploader" label="图片上传">
            <template #input>
              <van-uploader v-model="Mtimgs"
                :after-read="afterRead"
                :max-size="2 * 1024 * 1024"
                @oversize="onOversize"
                multiple 
              />
            </template>
          </van-field>
        </div>
        <van-button 
          type="primary" 
          block 
          @click="updateOrder"
          >
        确定更改</van-button>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Back from '../Back.vue'
import { Dialog , Toast } from 'vant';
import { ImagePreview } from 'vant';

export default {
  name:'OrderDetail',
  components:{ Back },
  data() {
    return {
      orderDetail:[],
      index:0,
      ir:{},
      mt:{},
      imgs:[],
      Mtimgs:[],
      MtShowImgs:[],
      ordCheckPhoto:'',
      MtimgUrlStr:'',
      ordPrice:'',
      userInfo:{},
      userType:1,
      irTn:'',
      mtTn:'',

      showUserImg:false,
      showMtImg:false,
      showPrice:true,
      showUpdate:false,
      showirTn:true,
      showmtTn:false
    }
  },
  activated(){
    this.init()
  },
  methods:{
    // 初始化
    init(){
      // 路由的值
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      this.index = JSON.parse(this.$route.query.index)
      this.orderDetail = JSON.parse(this.$route.query.orderDetail)
      this.irTn = JSON.parse(this.$route.query.orderDetail).irTn
      this.mtTn = JSON.parse(this.$route.query.orderDetail).mtTn

      this.imgs = this.orderDetail.irImgUrl.split(',')
      this.ordCheckPhoto = this.orderDetail.ordCheckPhoto
      this.ordPrice = JSON.parse(this.$route.query.orderDetail).ordPrice
      this.userType = this.userInfo.type
      this.ir = JSON.parse(this.$route.query.ir)
      this.mt = JSON.parse(this.$route.query.mt)
      if(this.ordCheckPhoto!=null){
        console.log('你好');
        this.MtShowImgs = this.ordCheckPhoto.split(',')
        if(this.MtShowImgs[0]===''){
          this.MtShowImgs = []
        }
      }

      // if(this.orderDetail.ordCheckPhoto != null && this.orderDetail.ordCheckPhoto != ''){
      //   this.MtShowImgs = this.orderDetail.ordCheckPhoto.split(',')
      // }


      // if(this.ir){
      //   console.log('ir不能输入');
      //   document.getElementById('irTnIpt').setAttribute('readonly',true)
      // }
      // if(this.mt){
      //   document.getElementById('mtTnIpt').setAttribute('readonly',true)
      // }
      console.log(this.index);
      console.log(this.orderDetail);
      console.log(this.ir);
      console.log(this.mt);
      console.log(this.imgs);
      console.log(this.MtShowImgs);
      console.log(this.ordCheckPhoto);
      console.log(this.userType);
      console.log(this.irTn);

      // console.log(this.MtShowImgs);
      if(this.imgs[0]===' '){
        this.showUserImg = false
      }
      else this.showUserImg = true
      if(this.imgs[0]===' '){
        this.showUserImg = false
      }
      else this.showMtImg = true
    },
    // 图片预览
    sceneImg(images,index) {
      ImagePreview({
        images:images, //需要预览的图片 URL 数组
        showIndex:true, //是否显示页码
        loop:false, //是否开启循环播放
        startPosition:index //图片预览起始位置索引
      })
    },
    // 维修员上传图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let fileArray = []
      console.log('文件数组：',file);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      // 单文件上传时，file是Object类型，而非数组类型，所以请求时直接把file.file作为参数
      if((!(file instanceof Array))){
        // this.$store.dispatch('order/uploadFiles',file.file);
          this.$axios.post('/filesUpload',{
            files:file.file
            // files:value
          },config).then(
            response => {
              // 请求成功后
              console.log('图片请求成功');
              console.log(response.data);
              // context.commit('getImgUrl',response.data.url)
              // this.MtShowImgs.push(response.data.url[0])
              this.MtimgUrlStr += response.data.url[0]+','
              console.log('输出str',this.MtimgUrlStr);
            },
            error => {
              // 请求失败后更新List数据
              console.log(error);
            }
          )
        // console.log('单文件时，imgUrlStr为：',this.imgUrlStr);
      }
      // 多文件上传时，将每个图片挨个请求，并存入数组作最终提交的参数
      else{
        for(let i = 0; i < file.length; i++){
          fileArray.push(file[i].file)
          this.$axios.post('/filesUpload',{
            files:fileArray[i]
            // files:value
          },config).then(
            response => {
              // 请求成功后
              console.log('请求成功');
              console.log(response.data);
              // 作为参数用的
              this.MtimgUrlStr += response.data.url[0]+','
              // 作为展示用的
              // this.MtShowImgs.push(response.data.url[0])
              console.log('输出str',this.MtimgUrlStr);
            },
            error => {
              // 请求失败后
              console.log(error);
            }
          )
          // this.$store.dispatch('order/uploadFiles',fileArray[i]);
        }
      }
    },
    // 判断文件大小
    onOversize() {
      Toast('图片不能大于2M');
    },
    // 更改订单状态
    changeStatus(){
      if(this.userType){
        console.log('维修员操作');
        this.orderDetail.ordStatus = 0
      }
      else{
        console.log('用户操作');
        this.orderDetail.ordStatus = 2
      }
      Toast('订单状态暂时修改成功，请在修改订单进行提交')
      console.log(this.orderDetail.ordStatus);
    },
    // 修改完成
    updateOrder(){
      this.showUpdate = false
      // let imgStr = value[3][0]
      // for(let i = 1; i < value[3].length; i++){
      //     imgStr += ','+value[3][i]
      // }

      // 显示
      let tmp = this.MtimgUrlStr.split(',')
      console.log('tmp',tmp);
      for(let i = 0; i < tmp.length; i++){
        if(tmp[i] != ''){
          this.MtShowImgs.push(tmp[i])
        }
      }
      console.log('此使',this.MtShowImgs);
      // 用另一个值把当前Img数组的值加起来
      let tmpStr = this.MtShowImgs[0]
      for(let i = 1; i < this.MtShowImgs.length; i++){
        tmpStr += ',' + this.MtShowImgs[i]
      }
      console.log('w我要输出',tmpStr);
      console.log('输出图片数组',this.MtShowImgs);
      console.log('上传的图片字符串',tmpStr);
      console.log(this.orderDetail.ordStatus);
      console.log(this.irTn);
      console.log('irID',this.orderDetail.irId);
      console.log('mtID',this.orderDetail.mtUserId);
      Dialog.confirm({
        message: '确定修改吗？',
      })
      .then(() => {
        let obj = {
          ordId : this.orderDetail.ordId,
          irId : this.orderDetail.irId,
          mtUserId : this.orderDetail.mtUserId,
          ordCheck : '',
          ordCheckPhoto : tmpStr,
          ordStatus : this.orderDetail.ordStatus,
          ordPrice : this.ordPrice,
          irTn : this.irTn,
          mtTn : this.mtTn,
        }
        console.log('试试',obj);
        let obj2 = {
          userid : this.userInfo.userid + '',
          type : this.userInfo.type
        }
        console.log(obj2);
        this.orderDetail.ordPrice = this.ordPrice
        this.$store.dispatch('order/confirmOrder',obj)
        this.$store.dispatch('order/getMyOrder',obj2)
        this.MtShowImgs = []
        this.$router.back()
      })
      .catch(() => {
        // on cancel
      });
    },
    // 用户付款
    pay(){
      let obj = {
        WIDout_trade_no : this.orderDetail.ordId,
        WIDsubject : '维修',
        WIDtotal_amount : this.ordPrice,
        WIDbody : ''
      }
      console.log(obj);
      this.$store.dispatch('order/pay',obj)
    },
    // 删除订单（不做）
    deleteOrder(){
      console.log(this.index);
      Dialog.confirm({
        message: '确定删除订单吗？',
      })
      .then(() => {
        let obj = {
          ordId : this.orderDetail.ordId,
          irId : this.orderDetail.irId,
          userid : this.orderDetail.mtUserId,
          type : this.userInfo.type
        }
        this.$store.dispatch('order/deleteOrder',obj)
        this.$store.dispatch('order/getMyOrder',obj)
        this.$router.back()
      })
      .catch(()=>{

      })
    }
  },
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
  border: none;
  margin: 5px 0;
  border-radius: 5px;
  background-color: #1989FA;
}
.changeStatusBtn{
  height:26px;
  font-size:14px;
  margin-left:10px;
  margin-top: 2px;
  padding: 0 10px;
  background-color: #1989FA;
  border: none;
  border-radius: 5px;
  color: white;
}

.delete{
  background-color: #db534f;
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
  margin: 2px;
}
/* p input{
  border: 1px solid #1989FA;
  border-radius: 5px;
  height: 30px;
  margin: 5px;
  padding: 2px 5px;
} */
/* p .van-field{
  margin: 5px 0;
  border-radius: 5px;
  box-shadow: 2px 2px 6px rgb(148, 148, 148);
} */

.popuop{
  padding: 10px;
}
</style>