<template>
  <el-col :span="24" class="leftAside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#304156"
      text-color="#000"
      active-text-color="white">
      <el-menu-item index="1">
        <i class="el-icon-shopping-bag-1"></i>
        <span slot="title">
          <router-link to="/CommonLayout/Order" class="nav" active-class="active">订单管理</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-help"></i>
        <span slot="title">
          <router-link to="/CommonLayout/Report" class="nav" active-class="active">举报管理</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">
          <router-link to="/CommonLayout/Information" class="nav" active-class="active">资讯管理</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-user"></i>
        <span slot="title">
          <router-link to="/CommonLayout/Users" class="nav" active-class="active">用户管理</router-link>
        </span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
/* .leftAside{
  margin-top: 25px;
} */
::v-deep .el-menu{
    display: flex;
    flex-direction: column;
}
::v-deep .el-menu-item{
    margin: auto;
}
/* ::v-deep .el-menu-item:hover{
  background-color: transparent !important;
} */
::v-deep .el-menu-vertical-demo{
  border: none;
}
::v-deep .el-menu-item i{
  color: white;
}
.nav{
  color: white;
}
.active{
  color: rgb(31, 152, 163);
}
</style>