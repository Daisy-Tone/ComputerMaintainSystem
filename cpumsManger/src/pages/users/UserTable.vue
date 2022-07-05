<template>
  <div>
    <el-table :data="userArray.list" height="400" border style="width: 460px;min-width:460px" >
      <el-table-column prop="userid" label="用户ID" width="180"></el-table-column>
      <el-table-column prop="username" label="用户昵称" width="180"></el-table-column>
      <!-- 修改用户昵称 -->
      <el-table-column label="操作"  width="80" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="dialogFormVisible4 = true;showIndex(scope.$index)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--修改用户昵称dialog-->
    <el-dialog title="修改用户昵称" :visible.sync="dialogFormVisible4" width="450px">
      <el-form label-width="150px">
        <el-form-item label="更改用户昵称为">
         <el-input v-model="changeIptValue" style="margin-top:10px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible4 = false;updateName()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dialogFormVisible4:false,
      tmpIndex : 0,
      changeIptValue : '',
    }
  },
  created(){
    this.$store.dispatch('user/getUserID','')
  },
  computed:{
    // 对象
    ...mapState('user',['userID']),
    // 数组
    ...mapState('user',['userArray']),
  },
  methods:{
    // 获取当前下标
    showIndex(index){
      this.tmpIndex = index
      console.log('tmpIndex：',this.tmpIndex);
      this.inputValue = ''
    },
    // 更新昵称
    updateName(){
      this.userArray.list[this.tmpIndex].username = this.changeIptValue
      console.log('userArray.list值为',this.userArray.list);
      // 将修昵称所在记录作为参数传递
      this.$store.dispatch('user/changeUserinfo',this.userArray.list[this.tmpIndex])
      // setTimeout(()=>{
      //   alert('修改成功。第' + this.tmpIndex +  '行的状态为' + this.UserList[this.tmpIndex].name)
      // },500)
    },
  }
};
</script>

<style scoped>
::v-deep .el-form-item__label{
  line-height: 65px;
}
</style>