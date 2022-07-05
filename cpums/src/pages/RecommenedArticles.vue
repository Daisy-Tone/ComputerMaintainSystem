<template>
  <div class="ArticleRecommendation">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      @click-left-icon="show"
    />
    <div class="articleList">
      <van-cell
        v-for="(item,index) in articleArray.list" 
        :key="index" 
        @click="goArticleDetail(index)"
      >
        <template #title>
          <div class="title-box">
            <img src="../assets/img/Img3.jpg" class="contentPho" />
            <div class="articleTitle">{{item.title}}</div>
          </div>
        </template>
        <template #label>
          <span class="author">作者：{{item.writerId}}&nbsp;&nbsp;&nbsp;&nbsp;99评论&nbsp;&nbsp;&nbsp;&nbsp;1天前</span>
        </template>
      </van-cell>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'RecommenedArticles',
    data() {
      return {
        value: "",
        articles:[
          {
            title:'电脑突然黑屏，开不了机怎么办？',
            img:'../assets/img/Img3.jpg',
            author:'张三'
          },
          {
            title:'电脑需要一直插着电使用，是电池的问题嘛？',
            img:'../assets/img/Img3.jpg',
            author:'王五'
          },
          {
            title:'键盘少了ctrl键？以后还能用CV大法嘛？',
            img:'../assets/img/Img3.jpg',
            author:'李四'
          },
          // {
          //   title:'键盘少了ctrl键？以后还能用CV大法嘛？',
          //   img:'../assets/img/Img3.jpg',
          //   author:'小明'
          // },
          // {
          //   title:'键盘少了ctrl键？以后还能用CV大法嘛？',
          //   img:'../assets/img/Img3.jpg',
          //   author:'小明'
          // },
        ],
        articleArray:{}
      };
    },
    created(){
      // 初始化页面（列表数据）
      this.$store.dispatch('article/getArticleID','')
      this.articleArray = JSON.parse(window.localStorage.getItem('articleArray'))
    },
    computed:{
      // 从vuex里拿数据
      // ...mapState('article',['articleArray']),
    },
    methods:{
      show(){
        console.log('输入框中内容',this.value);
        this.$store.dispatch('article/getArticleID',this.value)
      },
      goArticleDetail(index){
        console.log('下标',index);
        console.log('下标',this.articleArray.list[index].url);
        this.$router.push({
          path:'/ArticleText',
          query:{
            url:JSON.stringify(this.articleArray.list[index].url)
          },
        })
      }
    }
}
</script>

<style>
.ArticleRecommendation {
  margin-bottom: 50px;
}
.fixed{
  position: fixed;
  top: 45px;
  z-index: 21;
}
/* .articleList{
  overflow-y: scroll;
  height: 600px;
} */
.van-cell{
  box-shadow: 1px 1px 5px rgb(232, 232, 232);
}
.title-box{
  display: flex;
}
.title-box .articleTitle{
  width: 65%;
  padding: 0 5px;
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