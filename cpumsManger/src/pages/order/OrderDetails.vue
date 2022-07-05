<template>
  <div>
    <div class="back" @click="$router.back()">
      <i class="el-icon-arrow-left"></i>
      <p>返回</p>
    </div>

    <el-card class="box-card">
      <!-- 订单标题和主要信息 -->
      <el-descriptions title="订单详情">
        <el-descriptions-item label="订单编号">{{orderDetail.ordId}}</el-descriptions-item>
        <el-descriptions-item label="发起者用户编号">{{orderDetail.irId}}</el-descriptions-item>
        <el-descriptions-item label="维修员用户编号">{{orderDetail.mtUserId}}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag size="small"
            :type="(orderDetail.ordStatus === '订单完成') ? 'success'
            : (orderDetail.ordStatus === '快递未寄出') ? 'primary'
            : 'info'"
          >{{orderDetail.ordStatus}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发起者用户昵称">{{ir.username}}</el-descriptions-item>
        <el-descriptions-item label="维修员用户昵称">{{mt.username}}</el-descriptions-item>
        <!-- <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item> -->
      </el-descriptions>
      <!-- 其他信息细节 -->
      <div class="descripion">
        <p>订单标题：{{orderDetail.irTitle}}</p>
        <p>订单描述：{{orderDetail.irContent}}</p>
        <p>创建时间：{{orderDetail.created}}</p>
        <p>订单价格：
          <span style="color:red;font-size:18px;font-weight:600">
            ￥{{orderDetail.ordPrice}}
          </span>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'OrderDetails',
  data() {
    return {
      orderDetail:[],
      ir:{},
      mt:{}
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      this.orderDetail = JSON.parse(this.$route.query.orderDetail)
      this.ir = JSON.parse(this.$route.query.ir)
      this.mt = JSON.parse(this.$route.query.mt)
      console.log(this.orderDetail);
    }
  }
};
</script>

<style scoped>
.back{
  color: rgb(96, 96, 96);
  cursor: pointer;
  display: flex;
  align-items: center;
}
.back:hover{
  color: #409EFF;
}
.descripion p{
  color: #606266;
  margin-bottom: 10px;
}
::v-deep .el-card{
    margin: 20px 30px;
    padding: 10px;
}
</style>