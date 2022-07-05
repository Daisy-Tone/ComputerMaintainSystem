<template>
  <div class="container-Home">
    <div class="home-top">
      <img src="../assets/img/header.jpg" alt="" />
    </div>

    <div class="home-center">
      <ul>
        <li v-if="!showMtContent" @click="$router.push('/InitiateOrder')">
          <van-icon name="live" color="white" />
          <span>预约维修</span>
        </li>
        <li @click="$router.push('/OrderList')">
          <van-icon name="column" color="white" />
          <span>我的订单</span>
        </li>
        <li @click="$router.push('/ArticleList')">
          <van-icon name="eye" color="white" />
          <span>我的文章</span>
        </li>
      </ul>
    </div>
    
    <div class="nav" :class="fixed == true ? 'fixed' : ''">
      <router-link to="/Home/RecommenedArticles" 
      class="navInit"
       active-class="active"
      >文章推荐</router-link>
      <router-link v-if="showMtContent" 
        to="/Home/OrderSquare" 
        class="navInit" 
        active-class="active"
      >订单广场</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fixed: false,
      showMtContent:false
    }
  },
  created () {
    window.addEventListener('scroll', this.fixedActiveBtn)
  },
  activated(){
    this.init()
    console.log('首页路由');
  },
  methods: {
    init(){
      this.showMtContent = false
      if(JSON.parse(window.localStorage.getItem('type')) == 1){
        this.showMtContent = true
      }
    },
    fixedActiveBtn () {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      scrollTop >= 260 ? (this.fixed = true) : (this.fixed = false)
    }
  },

}
</script>

<style scoped>
/*顶部*/
.container-Home {
  width: 100%;
  min-width: 400px;
}
.home-top img {
  width: 100%;
}

/*中间*/
.home-center {
  width: 90%;
  margin: 20px auto 15px auto;
}
.home-center ul {
  width: 100%;
}
.home-center ul li {
  display: inline-block;
  font-size: 12px;
  width: 18%;
  text-align: center;
}
.home-center ul li:not(:first-child){
  margin-left: 2%;
}
.van-icon {
  display: block;
  font-size: 25px;
  background-color: pink;
  border-radius: 5px;
  line-height: 40px;
  width: 40px;
  text-align: center;
  margin: auto;
}

/*文章推荐*/
.nav{
  padding: 0 20px;
  display: flex;
  align-items: baseline;
  background-color: white;
}
.navInit{
  margin-right: 10px;
  color: rgb(80, 80, 80);
  font-weight: 600;
  font-size: 16px;
}
.active{
  font-size: 20px;
  font-weight: 600;
}
.fixed{
  position: fixed;
  z-index: 21;
  top: 0px;
  width: 400px;
  margin: 0;
  padding: 10px 20px;
}
</style>