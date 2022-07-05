<template>
  <div>
    <el-table :data="orderArray.list" height="400" border style="width:880px;min-width:880px" >
      <el-table-column prop="ordId" label="订单编号" width="100"></el-table-column>
      <el-table-column prop="irTitle" label="订单标题" width="180"></el-table-column>
      <el-table-column prop="irUserId" label="用户ID" width="100"></el-table-column>
      <el-table-column prop="mtUserId" label="维修员ID" width="100"></el-table-column>      

      <!-- 查看订单内容（跳转到OrderDetails页面） -->
      <el-table-column prop="" label="订单内容" align="center" width="90">
        <template slot-scope="scope">
          <el-button type="primary" plain class="clicklook" @click="GoOrderDetails(scope.$index)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间" width="100"></el-table-column>
      
      <!-- 订单状态显示栏 -->
      <el-table-column prop="ordStatus" label="订单状态"
        width="110"
        align="center"
        :filters="[{ text: '订单完成', value: '订单完成' },
        { text: '快递未寄出', value: '快递未寄出' }, { text: '快递未寄回', value: '快递未寄回' },]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="(scope.row.ordStatus === '订单完成') ? 'success'
            : (scope.row.ordStatus === '快递未寄出') ? 'primary'
            : 'info'"
            disable-transitions>{{scope.row.ordStatus}}</el-tag>
        </template>
      </el-table-column>
      <!-- 删除订单 -->
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-popconfirm 
            @confirm="deleteRow(scope.$index)"
            title="确定删除吗?"
            icon="el-icon-info"
            icon-color="red"
          >
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created(){
    this.$store.dispatch('order/getOrderID','')
  },
  computed:{
    // 参数以数组格式获取
    ...mapState('order',['orderArray']),
  },
  methods:{
    // 筛选标签功能
    filterTag(value, row) {
      return row.ordStatus === value;
    },
    // 查看订单内容（跳转到OrderDetails页面）
    GoOrderDetails(index){
      // console.log(this.articleArray.list[index].content);
      console.log('即将输出',this.orderArray.list);
      let ir = this.orderArray.list[index].ir_entity
      let mt = this.orderArray.list[index].mt_entity
      console.log(ir);
      console.log(mt);
      this.$router.push({
          path:'/CommonLayout/OrderDetails',
          query:{
            orderDetail:JSON.stringify(this.orderArray.list[index]),
            ir:JSON.stringify(ir),
            mt:JSON.stringify(mt)
          }
        }
      )
            // orderDetail:JSON.stringify(this.orderArray.list[index])
    },
    // 删除订单功能
    deleteRow(index){
        console.log('当前记录下标为：',index);
        this.orderArray.list[index].deleted = 1
        let obj = {
          irId : this.orderArray.list[index].irId,
          ordId : this.orderArray.list[index].ordId,
        }
        this.$store.dispatch('order/deleteOrder',obj)
        // console.log('此时该记录deleted值为：',obj);
    }
  }
};
</script>

<style scoped>
.clicklook{
  padding: 5px 8px;
}
::v-deep   .el-button--primary.is-plain{
  font-size: 12px;
}
.clicklook:hover{
  background-color: #ecf5ff;
  color: #409EFF;
  border-color: #b3d8ff;
}
.clicklook:focus{
  background-color: #ecf5ff;
  color: #409EFF;
  border-color: #b3d8ff;
} 
::v-deep .el-form-item__label{
  line-height: 65px;
}
</style>