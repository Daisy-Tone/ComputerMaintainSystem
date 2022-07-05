import axios from "axios";
// user相关的配置
export default{
    namespaced:true,
    //准备actions——用于响应组件中的动作
    actions:{
      changeUserinfo(context,value){
        console.log('actions中的changeUserArray被调用了');
        axios.post('/pcmrs/user/update',{
            userid : value.userid,
            username : value.username,
            account : value.account,
            phone : value.phone,
            address : value.address,
            type : value.type,
            password : value.password
        }).then(
        response => {
            // 请求成功后
            console.log('请求成功');
            console.log('返回消息',response.data);
            context.commit('setType',response.data.user.type)
            context.commit('saveUserInfo',response.data.user)
        },
        error => {
            // 请求失败后更新List数据
            console.log(error);
        }
        )
    }
    },
    //准备mutations——用于操作数据（state）
    mutations:{
      // 存储用户信息
      setType(state,value){
        // state.type = value
        localStorage.setItem('type',JSON.stringify(value))
        console.log('更新后local-type：',JSON.parse(window.localStorage.getItem('type')));
      },
      saveUserInfo(state,value){
        //先把信息放进store.state的状态变量中方便后面调用
        // state.userInfo = value
        //把登录信息放进localStorage，让vue放进浏览器cookie中
        localStorage.setItem('userInfo',JSON.stringify(value))
        console.log('更新后local-userInfo',JSON.parse(window.localStorage.getItem('userInfo')));
        // console.log(localStorage.getItem('userInfo'));
        // state.userInfo = localStorage.getItem('userInfo')
      }
    },
    //准备state——用于存储数据
    state:{
      type:'',
      userInfo:[],
    },
}