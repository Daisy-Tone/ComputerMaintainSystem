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
        // 根据用户的userID查找自己的订单
        getMyOrder(context,value){
          console.log('获得用户身份对象',value);
          console.log(typeof(value.type));
          console.log(typeof(value.userid));
          // 维修员
          if(value.type === 1){
            axios.post('/pcmrs/order/mt',{
              userid:value.userid
            }).then(
              response => {
                // 请求成功后
                // console.log('请求成功');
                console.log(response.data);
                context.commit('getOrderArray',response.data.data)
              },
              error => {
                // 请求失败后更新List数据
                console.log(error);
              }
            )
          }
          // 普通用户
          else{
            console.log('获得',value.userid);
            axios.post('/pcmrs/order/clt',{
              userid:value.userid
            }).then(
              response => {
                // 请求成功后
                console.log(response.data);
                context.commit('getOrderArray',response.data.data)
              },
              error => {
                // 请求失败后更新List数据
                console.log(error);
              }
            )
          }
        },
        // 删除订单记录
        deleteOrder(context,value){
            console.log('actions中的deleteOrderinfo被调用了');
            axios.post('/pcmrs/order/delete',{
              ordId : value.ordId,
              irId : value.irId
            }).then(
            response => {
                // 请求成功后
                console.log('删除订单请求成功');
                console.log('返回消息',response.data);
                // axios.post('/pcmrs/Order/list',{
                //     // 需要转换为字符串类型
                //     key: ''
                // }).then(
                //     response => {
                //       // 请求成功后
                //     //   console.log('请求成功');
                //     //   console.log(response.data.page);
                //       context.commit('getOrderArray',response.data.page)
                //     },
                //     error => {
                //       // 请求失败后更新List数据
                //       console.log(error);
                //     }
                // )
            },
            error => {
                // 请求失败后更新List数据
                console.log(error);
            }
            )
        },
        // 修改订单状态
        changeOrderState(context,value){
            console.log('actions中的changeOrderArray被调用了');
            console.log(value);
            let array = []
            array.unshift(value)
            console.log(array);
            axios.post('/pcmrs/order/delete',{
                array:array
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
        },
        // 上传图片文件
        uploadFiles(context,value){
          console.log('value的值为：',value);
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          axios.post('/filesUpload',{
            files:value
            // files:value
          },config).then(
            response => {
              // 请求成功后
              console.log('请求成功');
              console.log(response.data.url[0]);
              context.commit('getImgUrl',response.data.url[0])
            },
            error => {
              // 请求失败后更新List数据
              console.log(error);
            }
          )
        },
        // 添加请求（订单）
        addOrder(context,value){
            console.log('value值为：',value);
            // let imgStr = value[3][0]
            // for(let i = 1; i < value[3].length; i++){
            //     imgStr += ','+value[3][i]
            // }
            console.log(value[3]);
            axios.post('/pcmrs/ir/save',{
                irUserId:value[3],
                irTitle:value[0],
                irContent:value[1],
                irImgUrl:value[2]
              }).then(
                response => {
                  // 请求成功后
                //   console.log('请求成功');
                  console.log(response.data);
                //   context.commit('getOrderArray',response.data.page)
                },
                error => {
                  // 请求失败后更新List数据
                  console.log(error);
                }
            )
        },
        // 维修员查询未接订单
        getWatiOrder(context,value){
          axios.post('/pcmrs/ir/list',{
            state:value
          }).then(
            response => {
              // 请求成功后
              console.log('请求成功');
              console.log(response.data);
              context.commit('getWaitOrderArray',response.data.page)
            },
            error => {
              // 请求失败后更新List数据
              console.log(error);
            }
          )
        },
        // 维修员接单
        takeOrder(context,value){
          console.log('获得数据',value);
          axios.post('/pcmrs/order/save',{
            irId : value.irId,
            mtUserId : value.mtUserId,
            ordCheck : '',
            ordCheckPhoto : value.irImgUrl,
            ordStatus : value.ordStatus,
            irTn : '',
            mtTn : '',
          }).then(
            response => {
              // 请求成功后
              console.log('请求成功');
              console.log(response.data);
              axios.post('/pcmrs/order/mt',{
                userid:value.userid
              }).then(
                response => {
                  // 请求成功后
                  // console.log('请求成功');
                  console.log(response.data);
                  context.commit('getOrderArray',response.data.data)
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
        // 维修员修改订单（价格）
        confirmOrder(context,value){
          console.log('获得数据',value);
          axios.post('/pcmrs/order/update',{
            ordId : value.ordId,
            irId : value.irId,
            mtUserId : value.mtUserId,
            ordCheck : '',
            ordCheckPhoto : value.ordCheckPhoto,
            ordStatus : value.ordStatus,
            ordPrice: value.ordPrice,
            irTn : value.irTn,
            mtTn : value.mtTn,
          }).then(
            response => {
              // 请求成功后
              console.log('请求成功');
              console.log(response.data);
            },
            error => {
              // 请求失败后更新List数据
              console.log(error);
            }
          )
        },
        // 支付订单
        pay(context,value){
          console.log('获得数据',value);
          axios.post('/alipay/pay',{
            WIDout_trade_no : value.ordId,
            WIDsubject : '维修',
            WIDtotal_amount : value.ordPrice,
            WIDbody : ''
          }).then(
            response => {
              // 请求成功后
              console.log('请求成功');
              console.log(response.data);
              // 调取后端支付宝支付接口 获取到数据之后
              const div = document.createElement('div') // 创建div
              div.innerHTML = response.data // 将返回的form 放入div
              document.body.appendChild(div)
              document.forms[0].submit()
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
      },
      // getImgUrl(state,value){
      //   console.log('获得imgUrl',value);
      //   state.imgUrl = value
      // },
      // 获取订单列表
      getOrderArray(state,value){
        console.log('mutations中的getOrderArray被调用了')
        state.orderArray = value
        console.log('orderArray为：',state.orderArray);
        // 先修改状态内容
        // for(let i = 0; i < state.orderArray.list.length; i++){
        //   switch(state.orderArray.list[i].ordStatus){
        //     case 0: state.orderArray.list[i].ordStatus = '订单完成';break;
        //     case 1: state.orderArray.list[i].ordStatus = '快递未寄出';break;
        //     case 2: state.orderArray.list[i].ordStatus = '快递未寄回';break;
        //   }
        //   // console.log('输出',state.orderArray.list[i].ordStatus)
        // }
      },
      // 维修员获取未接订单
      getWaitOrderArray(state,value){
        state.waitOrder = value.list
        console.log('获取未接订单',state.waitOrder);
      }
    },
    //准备state——用于存储数据
    state:{
      waitOrder:[],
      orderArray:[],
      imgUrl:'',
    },
}