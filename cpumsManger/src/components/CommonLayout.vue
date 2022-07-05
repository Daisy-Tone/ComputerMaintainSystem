<template>
  <el-container>
    <el-header>
        <CommHeader/>
    </el-header>
    <el-container class="elContainer">
      <el-aside width="180px">
          <CommAside/>
      </el-aside>
      <el-main class="elMain">
        <!-- <CommNav /> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommHeader from './CommHeader.vue'
import CommAside from './CommAside.vue'
// import CommNav from "../components/CommNav.vue";

export default {
    components:{CommHeader,CommAside }
};
</script>

<style scoped>
::v-deep .el-header{
    padding:0;
}
::v-deep .el-card__body, .el-main{
  padding: 0;
}
::v-deep .el-main{
  height: 100%;
}
.el-aside{
  text-align: center;
  background-color: #304156;
}
.elMain {
  padding: 30px ;
  height: 700px;
}
</style>