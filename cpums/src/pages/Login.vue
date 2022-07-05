<template>
  <div>
    <!--登录-->
    <div v-if="status == 1">
      <van-nav-bar
        title="登录"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-form>
      <!-- 账号 -->
        <van-field
          v-model="loginForm.account"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <!-- 密码 -->
        <van-field
          v-model="loginForm.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />

        <div class="loginButton">
          <van-button type="info" native-type="submit" @click="login" style="">登录</van-button>
          <van-button type="info" native-type="submit" @click="goRegister" style="">注册</van-button>
        </div>
      </van-form>
    </div>

    <!--注册-->
    <div v-else>
      <van-nav-bar
        title="注册"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="registerHeader">
        <div>登录体验更多精彩</div>
        <span class="Slogans">未注册手机号注册后自动创建账号</span>
      </div>
      <van-form>
        <!-- 用户ID -->
        <van-field
          v-model="registerForm.username"
          name="用户昵称"
          label="用户昵称"
          placeholder="请输入用户昵称"
          :rules="[{ required: true, message: '请填写用户昵称' }]"
        />
        <!-- 密码 -->
        <van-field
          v-model="registerForm.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <!-- 用户类型 -->
        <van-field name="radio" label="用户类型">
          <template #input>
            <van-radio-group v-model="registerForm.radio" direction="horizontal">
              <van-radio name="0">普通用户</van-radio>
              <van-radio name="1">维修员</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- <van-field
          v-model="registerForm.password2"
          type="password"
          name="校验密码"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请确认填写密码一致' }]"
        /> -->
        <div class="registerButton">
          <van-button round type="info" native-type="submit" @click="register">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Dialog,Toast } from 'vant';
import Back from './Back.vue'
export default {
  name:'Login',
  components:{Back},
  data() {
    //验证手机号
    var checkPhone = (rule, value, callback) => {
      const regCN = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (!regCN.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    // 确认密码的规则
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.passord2 !== '') {
          this.$refs.registerForm.validateField('password2');
        }
        callback();
      }
    };   
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.passord) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm:{
        username: "",
        userPhone: "",
        password: "",
        password2:'',
        radio:0
      },
      loginForm:{
        account: "",
        password: "",
      },
      status:1,
      //注册规则
      regrules:{
        userPhone:[
          {required:true, message: '请输入您的手机号',trigger:'blur'},
          { validator: checkPhone, trigger: 'change' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      //登录规则
      rules:{
        userPhone:[
          {required:true, message: '请输入您的手机号',trigger:'blur'},
          { validator: checkPhone, trigger: 'change' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.push({path:'/'})
    },
    // 登录
    login(){
      console.log(this.loginForm.account);
      console.log(this.loginForm.password);
      let loginFormData = new FormData()
      loginFormData.append('account',this.loginForm.account)
      loginFormData.append('password',this.loginForm.password)
      console.log('用户账号：',loginFormData.get('account'));
      console.log('密码',loginFormData.get('password'));
      this.$axios.post('/pcmrs/user/login',
        {
            account:loginFormData.get('account'),
            password:loginFormData.get('password')
        }).then(
        response => {
            // 请求成功后
            console.log('登录',response.data.user);
            this.$store.commit('user/setType',response.data.user.type)
            this.$store.commit('user/saveUserInfo',response.data.user) 
            let typeName = JSON.parse(window.localStorage.getItem('type')) ? '维修员' : '用户'
            Toast(`你好，${typeName}！`)
            //this.$store.commit('user/setCookie',response.data.user)
            setTimeout(()=>{
              this.$router.push({path:'/'})
            },500)
        },
        error => {
            // 请求失败后更新List数据
            console.log('请求失败');
            console.log(error);
      })
    },
    // 从登录跳转到注册
    goRegister() {
      this.status = 2
    },
    // 注册
    async register(){
      //注册将数据存入数据库然后自动跳转到登录页面
      let registerForm = new FormData()
      registerForm.append('username',this.registerForm.username)
      registerForm.append('password',this.registerForm.password)
      registerForm.append('radio',this.registerForm.radio)
      console.log('用户昵称：',registerForm.get('username'));
      console.log('密码：',registerForm.get('password'));
      console.log('用户类型：',registerForm.get('radio'));
      this.$axios.post('/pcmrs/user/save',{
        account:'',
        password:registerForm.get('password'),
        username:registerForm.get('username'),
        phone:'',
        address:'',
        type:registerForm.get('radio')
      }).then(
        response => {
          // 请求成功后
          console.log('请求成功');
          console.log(response.data);
          Dialog.confirm({
              message: `你的账号是：${response.data.user.account}，请记住你的账号哦`,
          })
          .then(() => {
            Toast('注册成功！')
            this.status = 1
          })
        },
        error => {
          // 请求失败后更新List数据
          console.log('请求失败');
          console.log(error);
        }
      )
    },
  }
};
</script>

<style lang="less" scoped>
.registerHeader{
  padding: 5px 10px;
  font-size: 20px;
  font-family:"Comic Sans MS", cursive, sans-serif;
}
.Slogans{
  font-size: 14px;
  // color:grey
}
.registerButton{
  margin: 20px 0;
  .van-button{
    padding: 5px 150px;
  }
}
.loginButton{
  width: 100%;
  display: flex;
  margin: 15px 0;
  justify-content: space-around;
  .van-button{
    width: 80px;
    border-radius: 20px;
  }
}
.van-form{
  text-align: center;
}
</style>