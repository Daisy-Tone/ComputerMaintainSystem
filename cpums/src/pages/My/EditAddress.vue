<template>
    <div>
        <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" />

        <van-cell @click="showPopup">
            <div class="my_address">
                <div class="bottom"><span style="color:black">默认地址：</span>{{DefaultAddress}}</div>
            </div>
        </van-cell>

        <van-popup v-model="show" position="bottom" :style="{ height: '65%' }">
            <van-cell title="地区" @click="showPopup2" v-model="selectArea" class="area"></van-cell>
            <van-popup v-model="show2" position="bottom" :style="{ height: '65%' }">
                <van-area 
                    :area-list="areaList"
                    ref="myArea"
                    @change="onChange"
                    @confirm="show2 = false"
                    @cancel="onCancel"/>
            </van-popup>
            <van-cell class="adress">
                <van-field 
                    v-model="adressDetali" 
                    label="详细地址:" 
                    placeholder="详细地址" />
            </van-cell>
            <van-button type="danger" block @click="saveAddress">保存</van-button>
        </van-popup>
    </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import { areaList } from '@vant/area-data'
export default {
    data() {
        return {
            show: false,
            show2:false,
            areaList,
            searchResult: [],
            adressDetali:'',
            selectArea:'',  //省市区
            DefaultAddress:'',
            userInfo:JSON.parse(window.localStorage.getItem('userInfo'))
        }
    },
    computed:{
        // DefaultAddress(){
        //     return this.selectArea + this.adressDetali
        // }
    },
    activated(){
        this.DefaultAddress = JSON.parse(window.localStorage.getItem('userInfo')).address
    },
    methods: {
        onClickLeft() {
            this.$router.push({ path: '/My_user' });
        },
        showPopup() {
            this.show = true
        },
        showPopup2(){
            this.show2 = true
        },
        onChange(p){
          let val = p.getValues();
          let areaName = ''
          for (var i = 0; i < val.length; i++) {
            areaName = areaName+(i==0 ? '':'/') + val[i].name
          }
          this.selectArea = areaName
          console.log('最终拿到的地址',this.selectArea);//省市区
        },
        onCancel(){
            //关闭弹窗
            this.show2 = false;
            this.$refs.myArea.reset()//重置城市列表
        },
        saveAddress(){
            //保存修改的地址
            this.DefaultAddress = this.selectArea + this.adressDetali
            Dialog.confirm({
                title: '更改地址',
                message: `确定更改为：${this.DefaultAddress} 吗？`,
            })
            .then(() => {
                //console.log('这是我的新地址：',this.DefaultAddress);
                let obj = {
                    userid : this.userInfo.userid,
                    username : this.userInfo.username,
                    account : this.userInfo.account,
                    password : this.userInfo.password,
                    phone : this.userInfo.phone,
                    address : this.DefaultAddress,
                    type : this.userInfo.type
                }
                this.$store.dispatch('user/changeUserinfo',obj)
                Toast('修改成功！')
                this.$router.back()
            })
            .catch(() => {
                // on cancel
                this.DefaultAddress = JSON.parse(window.localStorage.getItem('userInfo')).address
            });
            this.show = false
        }

    }
}
</script>

<style lang="less" scoped>
.my_address {
    width: 95%;
    /*box-shadow:0 10px 6px -6px rgba(30, 30, 30, 0.1), 12px 0 8px -8px rgba(50, 50, 50, 0.1);*/
    font-size: 16px;
    margin: 5px auto;
    border-bottom: 1px solid rgb(206, 206, 206);

    .top {
        margin-top: 10px;
        padding-left: 10px;
        color: rgb(47, 47, 47);
    }

    .bottom {
        margin-top: 6px;
        margin-bottom: 5px;
        padding-left: 10px;
        font-size: 13px;
        color: grey;
    }
}
.area{
    padding:15px 10px;
    border-bottom: 1px solid rgb(232, 232, 232);
}
.adress{
    padding:10px 0 0 0;
    border-bottom: 1px solid rgb(232, 232, 232);
    margin-bottom: 20px;
}
</style>