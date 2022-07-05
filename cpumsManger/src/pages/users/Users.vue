<template>
  <div>
    <div class="orderMain">
      <!-- 搜索框 -->
      <div class="userHead">
        <h2>搜索用户</h2>
        <div class="input-block">
          <input
            type="text"
            placeholder="请输入用户昵称"
            v-model="value"
            @keyup.enter="searchUser()"
          >
          <button @click="searchUser()">搜索</button>
        </div>
      </div>
      <!-- 表格内容 -->
      <el-tabs>
        <el-tab-pane label="用户管理">
          <UserTable/>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next" 
        :total="100"
       ></el-pagination>
    </div>
  </div>
</template>

<script>
import UserTable from "./UserTable.vue";
export default {
  components: { UserTable },
  data() {
    return {
      value: "",
    };
  },
  methods:{
    searchUser(){      
      // mutations方法
      this.$store.dispatch('user/getUserID',this.value)
    }
  }
};
</script>

<style scoped>
/* .orderMain {
  margin: 20px 500px 30px 300px;
} */
.userHead{
  display: flex;
}
.userHead h2{
  font-size: 24px;
}
.input-block{
  display: flex;
  width: 220px;
  height: 40px;
  padding: 2px;
  margin-left: 20px;
  border: 1px solid rgb(194, 194, 194);
  border-radius: 20px;
}
.input-block input{
  width: 160px;
  height: 36px;
  padding: 5px 2px;
  margin: 0 10px;
  border-radius:0 0 20px 20px;
}
.input-block input::placeholder{
  color: rgb(208, 208, 208);
}
.input-block button{
  color: #409EFF;
  border: none;
  background-color: transparent;
  cursor: pointer;
}


::v-deep  .el-input {
  width: 180px;
  /* margin: 10px 20px 20px 0px; */
  margin-left: 20px;
}
::v-deep .el-input__inner {
  border-radius: 30px;
}
::v-deep .el-tabs__nav-wrap::after {
  background-color: aliceblue;
}
::v-deep .el-pagination {
  margin: 20px 0;
  float: left;
}

</style>