<template>
    <div>
        <van-nav-bar title="设置密码" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <template #right>
                <van-button type="primary" size="small">完成</van-button>
            </template>
        </van-nav-bar>
        <van-form>
            <van-field 
                v-model="password" 
                type="password" 
                name="原密码" 
                label="原密码" 
                placeholder="请输入原密码" 
                :rules="[{ required: true, message: '请填写原密码' }]" />
            <van-field 
                v-model="password2" 
                type="password" 
                name="新密码" 
                label="新密码" 
                placeholder="请输入新密码" 
                :rules="[{ required: true, message: '请填写新密码' }]" />
            <van-field 
                v-model="password3" 
                type="password" 
                name="确认密码" 
                label="确认密码" 
                placeholder="再次填写确认" 
                :rules="[{ required: true, message: '再次填写确认' }]" />
        </van-form>
    </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
export default {
    data() {
        return {
            //原密码
            password: '',
            //新密码
            password2: '',
            password3: '',
            userInfo:JSON.parse(window.localStorage.getItem('userInfo'))
        };
    },
    methods:{
        onClickLeft() {
            this.$router.back()
        },
        onClickRight() {
            //提交修改密码
            if(this.password == this.password2) {
                Toast('新密码不能与旧密码一致！')
            } else if(this.password3 == null || this.password3 !== this.password2) {
                Toast('两次输入密码不一致!')
            } else {
                Dialog.confirm({
                    message: `确定更改？`,
                })
                .then(() => {
                    let obj = {
                        userid : this.userInfo.userid,
                        username : this.value,
                        account : this.userInfo.account,
                        password : this.password2,
                        phone : this.userInfo.phone,
                        address : this.userInfo.address,
                        type : this.userInfo.type
                    }
                    this.$store.dispatch('user/changeUserinfo',obj)
                    this.password = ''
                    this.password2 = ''
                    this.password3 = ''
                    Toast('更改成功！')
                    setTimeout(()=>{
                        this.$router.push('/login')
                    },500)
                    
                })
                .catch(() => {
                    // on cancel
                });
            }
        },
    }
}
</script>

<style>
</style>