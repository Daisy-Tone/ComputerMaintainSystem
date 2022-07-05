import axios from "axios";
// user相关的配置
export default{
    namespaced:true,
    //准备actions——用于响应组件中的动作
    actions:{
        // 根据userID查找对应的记录
        getUserID(context,value){
            console.log('actions中的getUserID被调用了');
            axios.post('/pcmrs/user/list',{
                key:value
              }).then(
                response => {
                  // 请求成功后
                  console.log('请求成功');
                  console.log(response.data.page);
                  context.commit('getUserArray',response.data.page)
                },
                error => {
                  // 请求失败后更新List数据
                  console.log(error);
                }
            )
        },
        // 修改用户记录
        changeUserinfo(context,value){
            console.log('actions中的changeUserArray被调用了');
            axios.post('/pcmrs/user/update',{
                userid : value.userid,
                username : value.username,
                account : value.account,
                phone : value.phone,
                address : value.address,
                type : value.type
            }).then(
            response => {
                // 请求成功后
                console.log('请求成功');
                console.log('返回消息',response.data);
                axios.post('/pcmrs/user/list',{
                    // 需要转换为字符串类型
                    // key: value.userid + ''
                    key: ''
                }).then(
                    response => {
                      // 请求成功后
                      console.log('请求成功');
                    //   console.log(response.data.page);
                      context.commit('getUserArray',response.data.page)
                    },
                    error => {
                      // 请求失败后更新List数据
                      console.log(error);
                    }
                )
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
        // 将请求后的返回值赋给state.userArray
        getUserArray(state,value){
            console.log('mutations中的getUserArray被调用了')
            state.userArray = value
            console.log('userArray为：',state.userArray);
        }
    },
    //准备state——用于存储数据
    state:{
        userArray:[],
    },
}