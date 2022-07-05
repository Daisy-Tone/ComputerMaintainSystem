<template>
  <div>
    <el-table :data="ReportList" height="400" border style="width:830px;min-width: 830px;" >
      <el-table-column prop="UserID" label="用户ID" width="180"></el-table-column>
      <el-table-column prop="reportType" label="举报对象类型" width="180"></el-table-column>
      <el-table-column prop="reportID" label="被举报ID" width="180"></el-table-column>
      
      <!-- 显示举报状态 -->
      <el-table-column
        prop="treportStatus"
        label="举报状态"
        width="90"
        align="center"
        :filters="[{ text: '未处理', value: '未处理' }, { text: '已处理', value: '已处理' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.reportStatus === '未处理' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.reportStatus}}</el-tag>
        </template>
      </el-table-column>
      
      <!-- 查看举报信息 -->
      <el-table-column prop="reportContent" label="举报内容" width="100">
        <el-button type="primary" size="small" plain class="clicksee" @click="dialogVisible = true" >点击查看</el-button>
      </el-table-column>

      <!-- 修改举报处理状态 -->
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="dialogFormVisible2 = true;showIndex(scope.$index)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--举报内容详情(alert弹窗)-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--举报状态处理弹窗(dialog弹窗)-->
    <el-dialog title="修改举报处理状态" :visible.sync="dialogFormVisible2" width="450px">
      <el-form label-width="150px">
        <el-form-item label="处理结果">
            <el-select v-model="selectTip" @change="showOption" style="margin-top:10px">
              <el-option value='' disabled>选择审核状态</el-option>
              <!-- <el-option value='未处理'>未处理</el-option> -->
              <el-option value='已处理'>已处理</el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false;submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前记录下标和选项的暂存值
      tmpIndex : 0,
      tmpValue : '',
      // 下拉框的初始值
      selectTip:'选择审核状态',
      // 显示dialog
      dialogVisible: false,
      dialogFormVisible2:false,
      // 表记录数据（假数据）
      ReportList:[
        {
          UserID:'古田里的鸡',
          reportType:'用户',
          reportID:'123',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },
        {
          UserID:'古田里的鸡',
          reportType:'文章',
          reportID:'646',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },
        {
          UserID:'古田里的鸡',
          reportType:'文章',
          reportID:'2',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },
        {
          UserID:'古田里的鸡',
          reportType:'用户',
          reportID:'54654',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },
        {
          UserID:'古田里的鸡',
          reportType:'文章',
          reportID:'657',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },
        {
          UserID:'古田里的鸡',
          reportType:'用户',
          reportID:'46',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },
        {
          UserID:'古田里的鸡',
          reportType:'用户',
          reportID:'34',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },
        {
          UserID:'古田里的鸡',
          reportType:'文章',
          reportID:'351',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },
        {
          UserID:'古田里的鸡',
          reportType:'用户',
          reportID:'34214',
          reportStatus:'未处理',
          CreateDate:'2022-4-30 14:23:26',
          reportContent:'点击查看'
        },

      ],
    }
  },
  methods:{
    filterTag(value, row) {
      return row.reportStatus === value;
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
    submit(){
      if(this.tmpValue){
        this.ReportList[this.tmpIndex].reportStatus = this.tmpValue
        setTimeout(()=>{
          alert('提交选项，结果为：第' + this.tmpIndex +  '行的状态为' + this.ReportList[this.tmpIndex].reportStatus)
        },500)
      }
    }
  }
};
</script>

<style scoped>
.clicksee{
  padding: 8px;
}
.clicksee:hover{
  background-color: #ecf5ff;
  color: #409EFF;
  border-color: #b3d8ff;
}
.clicksee:focus{
  background-color: #ecf5ff;
  color: #409EFF;
  border-color: #b3d8ff;
} 
::v-deep .el-form-item__label{
  line-height: 65px;
}
</style>