<template>
  <div>
    <el-table :data="articleArray.list" height="460" border style="width: 950px;min-width:950px" >
      <el-table-column prop="articleId" label="文章编号" width="80"></el-table-column>
      <el-table-column prop="title" label="文章标题" width="250"></el-table-column>
      <el-table-column prop="writerId" label="作者" width="150"></el-table-column>
      <el-table-column prop="content" label="文章内容" width="100">
        <template slot-scope="scope">
          <el-button type="primary" plain class="clicklook" @click="GoArticleDetails(scope.$index)">点击查看</el-button>
        </template>
      </el-table-column>

      <!--审核文章-->
      <el-table-column prop="articleStatus" label="审核状态"
        width="90"
        align="center"
        :filters="[{ text: '已通过', value: '已通过' },
        { text: '待审核', value: '待审核' }, { text: '已打回', value: '已打回' },
        { text: '已删除', value: '已删除' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="(scope.row.articleStatus === '已通过') ? 'success' 
            : (scope.row.articleStatus === '待审核') ? 'primary'
            : (scope.row.articleStatus === '已打回') ? 'warning'
            : 'danger'"
            disable-transitions>{{scope.row.articleStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间" width="150"></el-table-column>  
      
      <!-- 删除文章 -->
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
           <el-button
            type="primary"
            icon="el-icon-edit"
            @click="dialogFormVisible2 = true;showIndex(scope.$index)"
            circle
          ></el-button>
          <el-popconfirm
            title="确定删除吗?"
            @confirm="deleteRow(scope.$index)"
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

    <!--审核文章弹窗(在内该文章状态)-->
    <el-dialog title="修改文章状态" :visible.sync="dialogFormVisible2" width="450px">
      <el-form label-width="150px">
        <el-form-item label="处理结果">
          <el-select v-model="selectTip" @change="showOption" style="margin-top:10px">
            <el-option value='' disabled>选择审核状态</el-option>
            <el-option value='已通过'>已通过</el-option>
            <el-option value='已打回'>已打回</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false;updateState()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dialogFormVisible2:false,
      // 当前记录下标和选项的暂存值
      tmpIndex : 0,
      tmpValue : '',
      selectTip:'选择审核状态',
    }
  },
  created(){
    // 初始化页面（列表数据）
    this.$store.dispatch('article/getArticleID','')
  },
  computed:{
    // 从vuex里拿数据
    ...mapState('article',['articleArray']),
  },
  methods: {
    // 筛选标签功能
    filterTag(value, row) {
      return row.auditStatus === value;
    },
    // 获取当前记录下标
    showIndex(index){
      this.tmpIndex = index
      console.log('tmpIndex：',this.tmpIndex);
    },
    // 获取select下拉选项
    showOption(value){
      this.tmpValue = value
      console.log('当前选项为：'+ this.tmpValue);
    },
    // 提交并修改当前记录的状态值
    updateState(){
      // 当选中值才能触发
      if(this.tmpValue){
        this.articleArray.list[this.tmpIndex].articleStatus = this.tmpValue
        this.$store.dispatch('article/changeArticleState',this.articleArray.list[this.tmpIndex])
        setTimeout(()=>{
          alert('提交选项，结果为：第' + this.tmpIndex +
          '行的状态为' + this.articleArray.list[this.tmpIndex].articleStatus)
        },500)
      }
    },
    // 查看文章内容（跳转到ArticleDetails页面）
    GoArticleDetails(index){
      // console.log(this.articleArray.list[index].content);
      this.$router.push({
          path:'/CommonLayout/ArticleDetails',
          query:{
            content:JSON.stringify(this.articleArray.list[index].url)
          }
        }
      )
    },
    // 删除行
    deleteRow(index){
      console.log('当前记录下标为：',index);
      this.$store.dispatch('article/deleteArticleinfo',this.articleArray.list[index].articleId)
      // console.log('当前记录下标为：',index);
      // // this.InfoList.splice(index,1)
      
      // this.$store.dispatch('article/deleteArticleinfo',this.InfoList)
      // console.log('删除成功，此时记录数为：',this.InfoList.length);
      // setTimeout(()=>{
      //   alert('删除成功');
      // },500)
    }
  },
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
::v-deep  .el-form-item__label{
  line-height: 65px;
}
</style>