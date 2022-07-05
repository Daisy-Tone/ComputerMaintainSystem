<template>
  <div>
    <div class="back" @click="$router.back()">
      <i class="el-icon-arrow-left"></i>
      <p>返回</p>
    </div>
    <el-card class="box-card" id="card">
      <!-- <p>{{content}}</p> -->
      <iframe
        class="iframe"
        :src="url"
        frameborder="0"
      ></iframe>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'ArticleDetails',
  data() {
    return {
      url:''
    }
  },
  activated(){
    // 获取路由传过来的数据
    this.url = JSON.parse(this.$route.query.content)
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
::v-deep .el-card{
  width: 90%;
  height: 600px;
  /* overflow: scroll; */
  margin: 20px 30px;
  padding: 10px;
}
.iframe{
  width: 100%;
  height: 600px;
}
</style>