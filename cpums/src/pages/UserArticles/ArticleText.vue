<template>
  <div>
    <Back title="文章内容"/>
    <!-- <div class="content">
      <div class="contentHeader">
        <p class="title">{{this.$route.params.articleText.title}}</p>
        <div class="contentInfo">
          <img src="../../assets/img/Img1.jpg">
          <div class="right">
            <p style="margin-bottom:5px;">前端要努力</p>
            <p style="font-size:12px">2022-06-24 16:10:27</p>
          </div> 
        </div>
        
      </div>
      <div class="contentTxet">
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当时，经过50年的刻苦研究，时任多伦多大学教授的Geoffrey Hinton和他的两名博士生Ilya Sutskever、Alex Krizhevsky终于发现，只要借助两样东西就能让神经网络成功识别出图片中的物体：一是数据，也就是海量的图片，因此数据集对他们的研究至关重要；二是强大的计算处理能力。
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2012年，他们终于集齐了这两大“利器”：斯坦福大学教授李飞飞创建的ImageNet数据集，初衷就是为了帮助人们研发出可识别图片中物体的技术，并且每一年都会举办公开比赛；另一方面，Alex发现，他写的GPU代码可以训练一个小型卷积网络，并在60秒内输出很不错的结果。
            既有Hinton和Ilya、Alex这样愿意潜心做研究的人，再加上海量数据和强大处理能力的加持，可以说，神经网络技术已拥有天时地利人和。然而，当时大多数人并不相信神经网络，并质疑深度学习的原理，认为这只是一个美好的畅想，实际上毫无用处。
            不过，在那一年的ImageNet竞赛上，神经网络AlexNet识别物体的准确率远超其他方法，在比赛中一举夺魁，人们由此真正认识并承认神经网络的强大。
            除了展示神经网络的强大能量，Hinton和他的团队还积极地将其推广到工业领域。2013年初，以Google、微软、DeepMind、百度等为代表的科技公司纷纷加入了“收购”Hinton三人组公司DNN Research的竞拍战中，最终Google以4400万美元的“天价”将其收入囊中。
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由此，AI在业界的声量愈响。在这个领域默默耕耘多年的更多守望者和开拓者走入舞台中央，尽享赞誉，更多才华横溢的新人不断涌现，为AI的发展推波助澜。
            可以说，如果没有这些脚踏实地的独行侠，没有他们的坚守，就没有新一轮AI的盛宴，我们现在所从事的AI事业将无从谈起，当然，一个叫OneFlow的开源深度学习框架也不复存在。
            站在深度学习崛起十年的节点上，相信依然很多人存在依然对这些问题好奇：究竟是什么让他们如此笃信神经网络和AI技术的潜力？又是什么铸就了深度学习发展的黄金十年？
            在Pieter Abbeel主持的The Robot Brains Podcast节目中，以科技作者Cade Metz的《天才制造者：那些为Google、Facebook和这个世界带来人工智能的独行侠们》一书为背景，Pieter Abbeel与Cade Metz分享了Geoffrey Hinton、Yann LeCun、IIya Sutskever、李飞飞、马斯克等重要人物，以及Google、DeepMind和OpenAI等机构之间发生的鲜为人知的故事，并探讨了科技巨头和中美之间的AI人才“军备竞赛”。
            从中，我们将一窥见AI浪潮崛起的脉络，以及技术创新从诞生到爆发的跌宕起伏的过程。希望身处AI领域的我们也能追随前人脚步，成就伟大。
          </span>
      </div>
      <div class="contentComment">
        <div class="commentHead">
          <span>评论(1000)</span>
          <span>
            <svg t="1656073590246" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2037" width="16" height="16"><path d="M841 822c-0.7 0.6-69 55.2-207.2-3.8-163.5-69.7-288.8-1.7-294 1.2-12.2 6.8-16.6 22.2-9.8 34.4 6.8 12.2 22.2 16.6 34.4 9.8 1.1-0.6 108.6-58.9 249.5 1.2 54.7 23.3 101 31.2 138.8 31.2 77 0 118.1-32.9 120.6-35 10.8-8.9 12.3-24.9 3.3-35.6-8.9-10.8-24.8-12.3-35.6-3.4zM529.3 488.7c-9.9-9.9-25.9-9.9-35.8 0L370.9 611.3c7.5-51.4 63.7-153.6 171.2-261.1 64-64 132-115.9 191.5-146.1 54.9-27.9 89.6-30.1 99.8-20 24.9 24.9-28.7 153.8-166.1 291.3-51.9 51.9-106.4 95.8-157.7 127.1-11.9 7.3-15.7 22.9-8.4 34.8 7.3 11.9 22.9 15.7 34.8 8.4 54.7-33.4 112.4-79.9 167.1-134.6 67.7-67.7 122.9-140.3 155.5-204.4 47.1-92.7 31.8-137.3 10.7-158.5-21.1-21.1-65.8-36.4-158.5 10.7-64.1 32.6-136.7 87.8-204.4 155.5-119 119-211.6 266.9-180.3 341.8L142 840.2c-9.9 9.9-9.9 25.9 0 35.8 4.9 4.9 11.4 7.4 17.9 7.4s13-2.5 17.9-7.4l351.5-351.5c9.9-9.9 9.9-25.9 0-35.8z" p-id="2038"></path></svg>
            写评论
          </span>
        </div>
        <div class="commtentText">
          <div class="commentImg">
              <img src="../../assets/img/Img1.jpg" >
          </div>
          <div class="rightComment">
            <div class="CommentTitle">
              <span class="nickname">前端要努力</span>
              <van-icon name="good-job-o" style="margin-right:15px"/>
            </div>
            <div>
              <span class="commentText">写的真好！！！！</span>
              <span style="font-size:12px;color:grey">2022-06-24</span>
            </div>  
          </div>
        </div>
      </div>
    </div> -->
      <iframe
        class="iframe"
        style="width:100%;height:600px"
        :src="url"
        frameborder="0"
      ></iframe>
  </div>
</template>

<script>
import Back from '../Back.vue'
export default {
  name:'ArticleText',
  components:{ Back },
  data() {
    return {
      url:''
    }
  },
  activated(){
    // 获取路由传过来的数据
    this.url = JSON.parse(this.$route.query.url)
  }
}
</script>

<style lang="less" scoped>
.contentHeader{
  width: 98%;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding-bottom: 10px;
  margin-left: 5px;
  .title{
    text-align: center;
    margin: 10px auto;
    font-size: 20px;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .contentInfo{
    margin-top: 30px;
    margin-left: 20px;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      float: left;
      margin-right: 10px;
    }
    .right{
      color: grey;
      font-size: 16px;
    }
  }
}
.contentTxet{
  width: 95%;
  margin-top: 20px;
  margin-left: 15px;
  padding-bottom: 20px;
  font-size: 18px;
  border-bottom: 1px solid rgb(226, 226, 226);;
}
.contentComment{
  margin-top: 15px;
  font-size: 16px;
  .commentHead{
    display: flex;
    justify-content: space-between;
    margin-left: 15px;
    margin-right: 15px;
    font-size: 17px;
  }
  .commtentText{
    margin-top: 15px;
    margin-bottom: 15px;
    .commentImg{
      float: left;
      margin-left: 20px;
    }
    img{
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    .rightComment{
      margin-left: 50px;
      .CommentTitle{
        display: flex;
        justify-content: space-between;
        .nickname{
          margin-left: 10px;
        }
      }
      .commentText{
        margin-left: 10px;
        margin-right: 6px;
      }
      
    }
  }
}

</style>