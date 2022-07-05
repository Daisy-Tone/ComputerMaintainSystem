import axios from "axios";
// user相关的配置
export default{
    namespaced:true,
    //准备actions——用于响应组件中的动作
    actions:{
        // 根据articleID查找对应的记录
        getArticleID(context,value){
            console.log('actions中的getArticleID被调用了');
            console.log((value));
            axios.post('/pcmrs/article/list',{
                key:value
              }).then(
                response => {
                  // 请求成功后
                //   console.log('请求成功');
                  console.log(response.data.page);
                  context.commit('getArticleArray',response.data.page)
                },
                error => {
                  // 请求失败后
                  console.log(error);
                }
            )
        },
        // 删除文章记录
        deleteArticleinfo(context,value){
            console.log('actions中的deleteArticleinfo被调用了',value);
            axios.post('/pcmrs/article/delete',{
                articleId : value
            }).then(
            response => {
                // 请求成功后
                // console.log('请求成功');
                // console.log('返回消息',response.data);
                axios.post('/pcmrs/article/list',{
                    // 需要转换为字符串类型
                    key: ''
                }).then(
                    response => {
                      // 请求成功后
                    //   console.log('请求成功');
                    //   console.log(response.data.page);
                      context.commit('getArticleArray',response.data.page)
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
        // 修改文章状态
        changeArticleState(context,value){
            console.log('actions中的changeUserArray被调用了');
            axios.post('/pcmrs/article/update',{
                articleId : value.articleId,
                writerId : value.writerId,
                title : value.title,
                content : value.content,
                articleStatus : value.articleStatus,
                url : value.url
            }).then(
            response => {
                // 请求成功后
                console.log('请求成功');
                console.log('返回消息',response.data);
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
        getArticleArray(state,value){
            // console.log('mutations中的getArticleArray被调用了')
            state.articleArray = value
            // console.log('userArray为：',state.articleArray);
        }
    },
    //准备state——用于存储数据
    state:{
        articleArray:[],
    },

}