<template>
  <el-menu class="el-menu-demo" mode="horizontal" text-color="black">
    <span class="headTitle">
      <p>计算机预约维修系统</p>
    </span>
    <el-menu-item class="admin">
      <img src="../assets/img/avatar.jpg" style="width: 45px; height: 45px; border-radius: 50%;"/>
      <span style="padding-left:5px">管理员：小张</span>
    </el-menu-item>
    <el-menu-item class="search">
      <i class="el-icon-search"></i>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style scoped>
::v-deep .el-menu-item:nth-child(3){
  float: right !important;
}
::v-deep .el-menu-item:nth-child(2){
  float: right !important;
}
::v-deep .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: none;
}
::v-deep .el-submenu.is-active .el-submenu__title {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none !important;
}
::v-deep .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: transparent;
}
.headTitle{
  float: left;
  padding: 10px;
  font-size: 24px;
}
.admin{
  margin-right: 10px;
}
.search{
  padding:0 10px;
}
</style>