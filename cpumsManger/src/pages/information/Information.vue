<template>
  <div class="orderMain">
    <!-- 搜索框 -->
    <div class="articleHead">
      <h2>文章管理</h2>
      <div class="input-block">
        <input
          type="text"
          placeholder="请输入文章标题"
          v-model="value"
          @keyup.enter="searchArticle()"
        >
        <button @click="searchArticle()">搜索</button>
      </div>
    </div>
    <!-- 表格内容 -->
    <el-tabs>
      <el-tab-pane label="资讯管理">
        <InfoTable />
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</template>

<script>
import InfoTable from "./InfoTable.vue";
export default {
  components: { InfoTable },
  data() {
    return {
      value: "",
    };
  },
  methods:{
    searchArticle(){  
      // mutations方法
      this.$store.dispatch('article/getArticleID',this.value)
    }
  }
};
</script>

<style scoped>
.articleHead{
  display: flex;
}
.articleHead h2{
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