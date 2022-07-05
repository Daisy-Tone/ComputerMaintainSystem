<template>
  <div>
     <van-nav-bar title="更改用户昵称" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-button type="primary" size="small">保存</van-button>
        </template>
        </van-nav-bar>
    <van-field v-model="value" :placeholder="userInfo.username" class="setuserName"/>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant';

export default {
    data() {
        return {
            value:'',
            userInfo:''
        }
    },
    created(){
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        console.log(this.userInfo);
    },
    methods:{
        onClickLeft() {
            this.$router.back()
        },
        onClickRight() {
            //修改用户昵称
            if(!this.value.trim()){
                Toast('用户新昵称不能为空')
            }
            else{
                Dialog.confirm({
                    title: '更改用户昵称',
                    message: `确定更改为：${this.value} 吗？`,
                })
                .then(() => {
                    console.log('输出userInfo:',this.userInfo);
                    let obj = {
                        userid : this.userInfo.userid,
                        username : this.value,
                        account : this.userInfo.account,
                        phone : this.userInfo.phone,
                        address : this.userInfo.address,
                        type : this.userInfo.type
                    }
                    this.$store.dispatch('user/changeUserinfo',obj)
                    this.value = ''
                    Toast('更改成功！')
                    setTimeout(()=>{
                        this.$router.push('/My_user')
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

<style scoped>
.setuserName{
    width:90%;
    margin-left: 20px;
    margin-top: 10px;
    border-bottom: 1px solid rgb(205, 205, 205);
}
.van-cell{
    padding-bottom: 2px;
}

</style>