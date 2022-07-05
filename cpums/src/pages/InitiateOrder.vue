<template>
  <div>
  <Back title="预约维修"></Back>
    <van-field
      v-model="title"
      label="标题"
      placeholder="请输入标题"
    />
    <!-- :formatter="formatter" -->
    <!-- <van-field
      v-model="CPUOs"
      label="操作系统"
      format-trigger="onBlur"
      placeholder="请输入电脑的操作系统"
    /> -->
    <van-field
      v-model="description"
      rows="3"
      autosize
      label="问题描述"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader v-model="imgs"
          :after-read="afterRead"
          :max-size="2 * 1024 * 1024"
          @oversize="onOversize"
          multiple 
        />
      </template>
    </van-field>
    <van-button type="primary" block @click="sendMessages">提交请求</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex'
import Back from './Back.vue'
export default {
  name:'InitiateOrder',
  components:{ Back },
  data() {
    return {
      title:'',
      description:'',
      imgs:[],
      imgUrlStr:''
    }
  },
  computed:{
    // 参数以数组格式获取
    ...mapState('order',['imgUrl'])
  },
  methods:{
    // 过滤输入的数字
    formatter(value) {
      return value.replace(/\d/g, '');
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let fileArray = []
      console.log('文件数组：',file);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      // 单文件上传时，file是Object类型，而非数组类型，所以请求时直接把file.file作为参数
      if((!(file instanceof Array))){
        // this.$store.dispatch('order/uploadFiles',file.file);
          this.$axios.post('/filesUpload',{
            files:file.file
            // files:value
          },config).then(
            response => {
              // 请求成功后
              console.log('图片请求成功');
              console.log(response.data);
              // context.commit('getImgUrl',response.data.url)
              this.imgUrlStr += response.data.url[0]+','
            },
            error => {
              // 请求失败后更新List数据
              console.log(error);
            }
          )
        // console.log('单文件时，imgUrlStr为：',this.imgUrlStr);
      }
      // 多文件上传时，将每个图片挨个请求，并存入数组作最终提交的参数
      else{
        for(let i = 0; i < file.length; i++){
          fileArray.push(file[i].file)
          this.$axios.post('/filesUpload',{
            files:fileArray[i]
            // files:value
          },config).then(
            response => {
              // 请求成功后
              console.log('请求成功');
              console.log(response.data);
              // context.commit('getImgUrl',response.data.url)
              this.imgUrlStr += response.data.url[0]+','
            },
            error => {
              // 请求失败后
              console.log(error);
            }
          )
          // this.$store.dispatch('order/uploadFiles',fileArray[i]);
        }
      }
    },
      // console.log('输出fileArray',fileArray);
      /* // 此时可以自行将文件上传至服务器
      console.log('文件数组：',file);
      if(!file.length){
        this.$store.dispatch('order/uploadFiles',file.file);
      }
      else{
        let fileArray = [];
        for(let i = 0; i < file.length; i++){
          fileArray.push(file[i].file)
          this.$store.dispatch('order/uploadFiles',fileArray[i]);
        }
        console.log('输出fileArray',fileArray);
      } */
      // let formData = new FormData()
      // formData.append('file',fileArray)
      // // 输出form表单里key对应的值
      // console.log('输出form.file',formData.get('file'));
      // console.log(formData.get("file"))

      // this.$store.dispatch('order/uploadFiles',fileArray[0]);
      // this.$store.dispatch('order/uploadFiles',fileArray[1]);

      // let fileArray = [];
      // for(let i = 0; i < file.length; i++){
      //   fileArray.push(file[i].file)
      // }
      // console.log('fileArray数组为：',fileArray);
      //   this.$store.dispatch('order/uploadFiles',fileArray);
    
    // 限制图片大小
    
    onOversize() {
		  Toast('图片不能大于2M');
		},
    sendMessages(){
      // 先获取图片名称，整合到一个数组里
      // let imgurl = []
      // for(let i = 0; i < this.imgs.length; i++){
      //   imgurl.push(this.imgs[i].file.name)
      // }
      // console.log('imgUrl为：',imgurl);
      console.log('imgUrlStr为：',this.imgUrlStr);
      if(!(this.title && this.description)){
        Toast('请完善信息！')
      }
      else{
        this.imgUrlStr = this.imgUrlStr.substring(0,this.imgUrlStr.lastIndexOf(','));
        console.log('imgUrlStr为：',this.imgUrlStr);
        // 声明一个数组来获取所有内容
        let allMessages = []
        allMessages.push(this.title)
        allMessages.push(this.description)
        allMessages.push(this.imgUrlStr)
        // 添加用户ID
        allMessages.push(JSON.parse(window.localStorage.getItem('userInfo')).userid)
        console.log(allMessages);
        this.$store.dispatch('order/addOrder',allMessages)
        Toast('提交成功！')
        this.title
        this.description = '',
        this.imgs=[]
        setTimeout(()=>{
          this.$router.back()
        },1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-button{
  width: 90%;
  margin: 0 auto;
  background-color: pink;
  border: none;
}
</style>