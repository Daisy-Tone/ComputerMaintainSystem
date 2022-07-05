import axios from "axios";
import { Toast } from 'vant';
// user相关的配置
export default{
    namespaced:true,
    //准备actions——用于响应组件中的动作
    actions:{
        //新增文章
        getArticleArrayList(context,value){
            axios.post('/pcmrs/article/save',{
                articleId : value.articleId,
                writerId : value.writerId,
                title : value.title,
                content : value.content,
                html: value.html,
                articleStatus : value.articleStatus,
                url : value.url    
            }).then(
                response => {
                    console.log(response.data);
                    Toast('发布成功！')
                    context.commit('getArticleArray',response.data)
                }
            )
        },
        // 根据articleID查找对应的记录
        getArticleID(context,value){
            console.log('actions中的getArticleID被调用了');
            //console.log('...',value);
            axios.post('/pcmrs/article/list',{
                userid: String(value)
              }).then(
                response => {
                  // 请求成功后
                  console.log('请求成功');
                  console.log(response.data.page);
                  context.commit('getArticleArray',response.data.page)
                },
                error => {
                  // 请求失败后
                  console.log(error);
                }
            )
        },
        // 根据用户ID查找自己的记录
        getArticleByUserID(context,value){
            axios.post('/pcmrs/article/list',{
                userid: value+''
            }).then(
                response => {
                    // 请求成功后
                    console.log('请求成功');
                    console.log('输出看看：',response.data.page);
                    context.commit('getMyArticle',response.data.page)
                },
                error => {
                    console.log(error);
                }
            )
        },
        //删除文章记录
        deleteArticleinfo(context,value){
            console.log('actions中的deleteArticleinfo被调用了');
            console.log('文章id...........',value); 
            axios.post('/pcmrs/article/delete',{
                articleId : value
            }).then(
            response => {
                // 请求成功后
                console.log('删除成功');
                console.log('返回消息',response.data);
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
            console.log('value拿到的是什么？',value);
            axios.post('/pcmrs/article/update',{
                articleId : value.articleId,
                writerId : value.writerId,
                title : value.title,
                content : value.content,
                html: value.html,
                //articleStatus : value.articleStatus,
                //url : value.url 
            }).then(
            response => {
                // 请求成功后
                console.log('更新成功');
                Toast('修改成功！')
                console.log('返回消息是',response.data);
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
        //将拿到的数据放入state管理
        getArticleArray(state,value){
            localStorage.setItem('articleArray',JSON.stringify(value))
            // console.log(JSON.stringify(value));
            
            console.log('更新后local-articleArray',JSON.parse(window.localStorage.getItem('articleArray')));
        },
        // 获取自己的文章
        getMyArticle(state,value){
            state.myArticleArray = value.list
            console.log('我的订单是',state.myArticleArray);
        }
    },
    //准备state——用于存储数据
    state:{
        myArticleArray:[],
        articleArray:{},
    },
}