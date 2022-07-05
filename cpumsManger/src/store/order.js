import axios from "axios";
// user相关的配置
export default{
    namespaced:true,
    //准备actions——用于响应组件中的动作
    actions:{
        // 根据OrderID查找对应的订单记录
        getOrderID(context,value){
            // console.log('actions中的getOrderID被调用了');
            console.log('value值为：',value,typeof(value));
            axios.post('/pcmrs/order/list',{
                key:value
              }).then(
                response => {
                  // 请求成功后
                //   console.log('请求成功');
                //   console.log(response.data.page);
                  context.commit('getOrderArray',response.data.page)
                },
                error => {
                  // 请求失败后更新List数据
                  console.log(error);
                }
            )
        },
        // 删除订单记录
        deleteOrderinfo(context,value){
            console.log('actions中的deleteOrderinfo被调用了');
            console.log(value);
            axios.post('/pcmrs/Order/delete',{
                array : value
            }).then(
            response => {
                // 请求成功后
                // console.log('请求成功');
                // console.log('返回消息',response.data);
                axios.post('/pcmrs/Order/list',{
                    // 需要转换为字符串类型
                    key: ''
                }).then(
                    response => {
                      // 请求成功后
                    //   console.log('请求成功');
                    //   console.log(response.data.page);
                      context.commit('getOrderArray',response.data.page)
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
        },
        // 删除订单
        deleteOrder(context,value){
            console.log('actions中的changeOrderArray被调用了');
            console.log(value);
            axios.post('/pcmrs/order/delete',{
                ordId : value.ordId,
                irId : value.irId
            }).then(
            // 再次请求所有数据
            response => {
                // 请求成功后
                console.log('请求成功');
                console.log('返回消息',response.data);
                axios.post('/pcmrs/order/list',{
                    userid:''
                  }).then(
                    response => {
                      // 请求成功后
                    //   console.log('请求成功');
                    //   console.log(response.data.page);
                      context.commit('getOrderArray',response.data.page)
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
        getOrderArray(state,value){
            console.log('mutations中的getOrderArray被调用了')
            state.orderArray = value
            console.log('orderArray为：',state.orderArray);
            // 先修改状态内容
            for(let i = 0; i < state.orderArray.list.length; i++){
                switch(state.orderArray.list[i].ordStatus){
                    case 0: state.orderArray.list[i].ordStatus = '订单完成';break;
                    case 1: state.orderArray.list[i].ordStatus = '快递未寄出';break;
                    case 2: state.orderArray.list[i].ordStatus = '快递未寄回';break;
                }
                // console.log('输出',state.orderArray.list[i].ordStatus)
            }
        }
    },
    //准备state——用于存储数据
    state:{
        orderArray:[],
    },

}