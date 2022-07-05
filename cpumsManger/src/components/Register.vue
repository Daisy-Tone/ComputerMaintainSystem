<template>
    <div class="background">
        <div class="register-block">
            <p class="register">注册</p>
            <input type="text" class="input" placeholder="用户名:" v-model="username"><br>
            <input type="password" class="input" placeholder="密  码:" v-model="password">
            <br>
            <!-- <el-button class="button" :plain="true" @click="$router.push('/')">登录</el-button>
            <br>
            <el-button class="button" :plain="true" @click="sendinfo()">注册</el-button>
            -->
            <input type="button" class="button" @click="$router.push('/')" value="登录">
            <br>
            <input type="button" class="button" @click="sendinfo()" value="注册">
        </div>
    </div>
</template>

<script>
export default {
    name:'Register',
    data() {
        return {
            account:'',
            password:'',
            username:'',
            phone:'',
            address:'',
            type:''
        }
    },
    methods:{
        sendinfo(){
            this.$axios.post('/pcmrs/user/save',{
                account:'',
                password:this.password,
                username:this.username,
                phone:'',
                address:'',
                type:''
            }).then(
                response => {
                    // 请求成功后
                    console.log('请求成功');
                    console.log(response.data);
                    alert('注册成功！')
                },
                error => {
                    // 请求失败后更新List数据
                    console.log('请求失败');
                    console.log(error);
                }
            )
        }
    }
}
</script>

<style>
.background{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgb(249, 249, 249);
}
.register-block{
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
.register-block p{
    margin-top: 30px;
    font-size: 30px;
    color: white;
}
.register-block .input , .register-block .button{
    height: 35px;
    margin: 10px 0;
    border-radius: 5px;
}
.register-block .input{
    width: 200px;
    padding: 5px;
    font-size: 16px;
}
.register-block input:hover{
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