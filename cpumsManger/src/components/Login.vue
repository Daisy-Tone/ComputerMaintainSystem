<template>
    <div class="background">
        <div class="login-block">
            <p class="login">登录</p>
            <input type="text" class="input" placeholder="用户名:" v-model="account"><br>
            <input type="password" class="input" placeholder="密  码:" v-model="password" @keyup.enter="login()">
            <br>
            <!-- <button @click="$router.push('/CommonLayout')">登录</button> -->
            <!-- <el-button class="button" :plain="true" @click="login()">登录</el-button> -->
            <!-- <el-button class="button" :plain="true" @click="$router.push('/Register')">注册</el-button> -->
            <input type="button" class="button" @click="login()" value="登录">
            <br>
            <input type="button" class="button" @click="$router.push('/Register')" value="注册">
        </div>
    </div>
</template>

<script>
export default {
    name:'Login',
    data() {
        return {
            account:'',
            password:''
        }
    },
    methods:{
        login(){
            this.$axios.post('/pcmrs/user/login',
            {
                account:this.account,
                password:this.password
            }).then(
            response => {
                // 请求成功后
                console.log('请求成功');
                console.log(response.data);
                if(response.data.code === 0){
                    setTimeout(()=>{
                        this.$router.push('/CommonLayout')
                    },500)
                }
                else{
                    alert('账号或密码错误！')
                }
            },
            error => {
                // 请求失败后更新List数据
                console.log('请求失败');
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
.background{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgb(249, 249, 249);
}
.login-block{
    text-align: center;
    position: absolute;
    width: 360px;
    height: 350px;
    left: 50%;
    top: 50%;
    margin: -175px 0 0 -200px;
    background-color: rgba(202, 201, 201, 0.7);
    border-radius: 5px;
}
.login-block p{
    margin-top: 30px;
    font-size: 30px;
    color: white;
}
.login-block .input , .login-block .button{
    height: 35px;
    margin: 10px 0;
    border-radius: 5px;
}
.login-block .input{
    width: 200px;
    padding: 5px;
    font-size: 16px;
}
.login-block input:hover{
    border: 1px solid rgb(42, 161, 212);
    color: rgb(42, 161, 212);
}
.button{
    width: 125px;
    cursor: pointer;
    background-color: white;
    color: rgb(136, 136, 136);
}
</style>>