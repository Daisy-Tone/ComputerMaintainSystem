
<template>
  <div class="user">
    <!--如果用户登录展现的是我的，如果未登录则是跳转到登录-->
    <div v-if="judgeLogin == 1">
      <van-nav-bar title="我的" fixed />
      <!-- 用户功能 -->
      <div class="user_until">
        <van-cell title="头像" is-link>
          <template #right-icon>
            <img :src="avatarUrl" class="avatar">
            <!--上传头像-->
            <!-- <van-uploader :before-read="beforeRead" :after-read="afterRead">
              <img :src="avatarUrl" class="user_pto" />
            </van-uploader>
            <van-icon name="arrow"/> -->
          </template>
        </van-cell>
        <van-cell title="用户名" is-link @click="setName">
          <template #right-icon>
            <span style="margin-right:5px;color:#9C9C9C">{{username}}</span>
            <van-icon name="arrow" style="line-height:25px"/>
          </template>
        </van-cell>
        <van-cell title="手机号" is-link>
           <template #right-icon>
            <span style="margin-right:5px;color:#9C9C9C"></span>
            <van-icon name="arrow" style="line-height:25px"/>
          </template>
        </van-cell>
        <van-cell title="密码" is-link @click="editPwd">
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-cell title="我的收货地址" is-link @click="editAddress">
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-cell title="实名认证" is-link>
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-cell title="账户安全" is-link>
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-cell title="退出登录" is-link @click="signOut">
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
      </div>
    </div>

    <!--登录注册-->
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>

import Login from '../Login.vue'
import {Dialog, Toast} from 'vant'
export default {
  name: "My_user",
  components:{Login},
  data() {
    return {
      judgeLogin:1,
      show:false,
      username:'',
      userPhone:'',
      avatarUrl:'',
      userInfo:{}
    }
  },
  activated(){
    console.log('个人信息路由');
    this.init()
  },
  methods: {
    //如果登录了，就显示该页，如果未登录，应该跳转到登录
    init(){
      console.log('type值;',this.type);
      if(JSON.parse(window.localStorage.getItem('type')) === 0
       || JSON.parse(window.localStorage.getItem('type')) === 1){
        this.judgeLogin = 1 
      } else{
        this.judgeLogin = 2 //显示列表
        this.$router.push({path:'/login'})
      }
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      this.username = this.userInfo.username
      this.userPhone = this.userInfo.userPhone
      this.avatarUrl = this.userInfo.avatarUrl
      console.log(this.userInfo);
      console.log(this.avatarUrl);
      // this.password = JSON.parse(window.localStorage.getItem('type')).password
      // this.address = JSON.parse(window.localStorage.getItem('type')).address
    },
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          reject();
        } else {
          //这个用法是什么？
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          });
          resolve(img);
        }
      });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },

    //修改用户名
    setName(){
      this.$router.push({path:'/SetName'})
    },
    //修改密码
    editPwd(){
      this.$router.push({path:'/EditPwd'})
    },
    //修改地址
    editAddress(){
      this.$router.push({path:'/EditAddress'})
    },

    //退出登录
    signOut(){
      //清空token等用户数据
      Dialog.confirm({
          title: '注销账号',
          message: `确定注销账号吗？`,
      })
      .then(() => {
        localStorage.clear()
        //跳转到首页
        this.$router.push({path:'/login'})
        })
      .catch(() => {
          // on cancel
      });
    }
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  min-width: 400px;
}
.user_until {
  margin-top: 80px;
}
.user_until {
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 200px;
  .van-cell {
    margin-top: 5px;
  }
  .user_pto {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 15px;
    margin-top: -10px;
  }
}
.top{
  display: inline-block;
}
.avatar{
  width: 45px;
  height: 45px;
  border: 2px solid rgb(207, 207, 207);
  // box-shadow: 1px 1px 10px rgb(200, 200, 200);
  margin-top: -10px;
  border-radius: 50%;
}
</style>
