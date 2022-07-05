<template>
  <div>
    <Back title="我的文章"></Back>
    <div class="publishArticle" @click="$router.push('/ModifyArticle')">发布文章</div>

    <div v-if="article.length">
      <van-cell v-for="(item,index) in article" :key="index">
        <template #title>
          <div class="title-box">
            <img src="../../assets/img/Img3.jpg" class="contentPho" />
            <div class="articleText">
              <div class="articleTitle">{{item.title}}</div>
              <div class="bottonBlock">
                <!-- 修改文章 -->
                <van-button 
                  type="primary" 
                  size="mini" 
                  @click="alterArticle(index)"
                >修改文章</van-button>
                <!-- 删除文章 -->
                <van-button 
                  type="primary" 
                  size="mini" 
                  @click="deleteArticle(index)"
                >删除文章</van-button>
                <!-- 查看文章 -->
                <van-button 
                  type="primary" 
                  size="mini" 
                  @click="$router.push({
                    path:'/ArticleText',
                    query:{
                      url:JSON.stringify(item.url)
                    }
                  })"
                >查看文章</van-button>
                <!-- articleText:articles[index] -->
              </div>
            </div>
          </div>
        </template>
        <template #label>
          <span class="author">99评论&nbsp;&nbsp;&nbsp;&nbsp;1天前</span>
        </template>
      </van-cell>
    </div>

    <van-empty v-if="!article.length" description="啊嘞，我还没有著作">
      <van-button round type="danger" class="bottom-button" @click="$router.push('/ModifyArticle')">发布文章</van-button>
    </van-empty>

  </div>
</template>

<script>
import Back from '../Back.vue'
import { Dialog } from 'vant';
import { mapState } from 'vuex'
export default {
  name:'MyArticle',
  components:{ Back },
  data() {
    return {
      articleArray:[],
      userInfo:[],
      userid:0,
      article:[]
    };
  },
  // created(){
  //   // 初始化页面（列表数据）
  //   this.$store.dispatch('article/getArticleID',this.userInfo.userid)
  // },
  created(){
    // 根据用户id查询自己的订单
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.userid = this.userInfo.userid
    console.log(this.userid);
    this.$store.dispatch('article/getArticleByUserID',this.userid)
    this.article = this.articleArray
    for(let i = 0; i< this.myArticleArray.length;i++){
      if(this.myArticleArray.articleStatus === '已通过'){
        this.article.push(this.myArticleArray[i])
      }
    }
    console.log('article，',this.article);
    // this.articleArray = JSON.parse(window.localStorage.getItem('articleArray'))


    // console.log('this.userid',this.userInfo.userid);
    // this.$axios.post('/pcmrs/article/list',{
    //     userid: String(this.userInfo.userid)
    //   }).then(
    //     response => {
    //       // 请求成功后
    //       console.log('请求成功');
    //       console.log('输出看看：',response.data.page);
    //       this.$store.commit('article/getArticleArray',response.data.page)
    //       this.articleArray = JSON.parse(window.localStorage.getItem('articleArray'))
    //       console.log('22222',JSON.parse(window.localStorage.getItem('articleArray')));
    //     },
    //     error => {
    //       console.log(error);
    //     }
    // )
  },
  computed:{
    // 从vuex里拿数据
    ...mapState('article',['myArticleArray']),
  },
  methods:{
    deleteArticle(index){
      Dialog.confirm({
        title: '删除文章',
        message: '你真的不要我了吗/(ㄒoㄒ)/~~',
      })
      .then(() => {
        // this.articles.splice(index,1);
        console.log('当前记录下标为：',index);
        this.articleArray.list[index].deleted = 1
        console.log('此时该记录deleted值为：',this.articleArray.list[index].articleId);
        var val = this.articleArray.list[index].articleId
        console.log('val:',val);
        this.$store.dispatch('article/deleteArticleinfo',val)
         this.$axios.post('/pcmrs/article/list',{
            userid: String(this.userInfo.userid)
          }).then(
            response => {
              // 请求成功后
              console.log('请求成功');
              console.log('输出看看：',response.data.page);
              this.$store.commit('article/getArticleArray',response.data.page)
              this.articleArray = JSON.parse(window.localStorage.getItem('articleArray.list'))
              console.log('22222',JSON.parse(window.localStorage.getItem('articleArray.list')));
              
            },
            error => {
              console.log(error);
            }
        )
      })
      .catch(() => {
        // on cancel
      });
    },
    //修改文章
    alterArticle(index){
      //判断文章id是否存在，若存在则是修改，若不存在则是新增文章
      //点击进来应该是显示着原文章的，这个怎么提前渲染出来呢？
      //跳转到发布文章
      console.log('index是：',index);
      console.log(this.articleArray.list[index].articleId);
      console.log(this.articleArray.list[index].title);
      console.log(this.articleArray.list[index].content);
      this.$router.push({
        path:'/ModifyArticle',
        query:{
          articleId:JSON.stringify(this.articleArray.list[index].articleId),
          title:JSON.stringify(this.articleArray.list[index].title),
          html:JSON.stringify(this.articleArray.list[index].content)
        }
      })
    }
  }
}
</script>

<style>
.publishArticle{
  font-size:16px;
  text-align: right;
  margin:2px 5px;
  color: rgb(43, 177, 225);
}
/*文章推荐*/
.ArticleRecommendation {
  margin-bottom: 100px;
}
.ArticleRecommendation .title{
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
}
.title-box{
  display: flex;
  /* justify-content: space-between; */
}
.articleText{
  width: 80%;
  padding: 0 8px;
}
.articleText .articleTitle{
  width: 100%;
  height: 65%;
  margin-bottom: 5px;
}
.bottonBlock{
  display: flex;
  justify-content: space-around;
}
.bottonBlock .van-button{
  background-color: rgb(43, 177, 225);
  border: none;
}
.title-box img{
  width: 35%;
}
.contentPho {
  height: 80px;
  border-radius: 8px;
}
.van-cell__label{
  text-align: right;
}
.author{
  font-size: 10px;
}
</style>