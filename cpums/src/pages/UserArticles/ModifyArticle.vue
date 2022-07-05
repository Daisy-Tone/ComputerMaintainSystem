<template>
  <div>
    <van-nav-bar
      left-arrow
      right-text="提交文章"
      title="发布/修改文章"
      @click-right="showText()"
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <van-field
      v-model="ArticleTitle"
      label="文章标题"
      placeholder="请输入文章标题"
    />
    <div style="padding-bottom:2px">
    <!--工具栏-->
      <Toolbar
          style="width:98%; margin:0 auto;border: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <!--编辑器-->
      <Editor
          style="height:450px;overflow-y: hidden;"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
      />
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
      return {
        ArticleTitle:'',
        editor: null,
        html: '',
        content:'',
        articleId:'',
        toolbarConfig: {
            toolbarKeys: [
              /* 显示哪些菜单，如何排序、分组 */ 
              'headerSelect', '|',
              'bold', 'underline', 'italic', 'color', 'bgColor',
              {
                iconSvg: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
                key: "group-image",
                menuKeys:["insertImage","uploadImage"],
                length: 2,
                title: "图片"
              },
              'fontSize', 'fontFamily', 'lineHeight', '|',
              'insertLink', 'divider',
            ],
        },
        editorConfig: { placeholder: '请输入内容...' },
        mode: 'simple', //or 'default',
        articleArray:JSON.parse(window.localStorage.getItem('articleArray.list')),
        userInfo:JSON.parse(window.localStorage.getItem('userInfo'))
      }
    },
    activated(){   
      this.ArticleTitle= JSON.stringify(this.$route.query.title)
      this.html = JSON.stringify(`<p>${this.$route.query.html}</p>`) 
      this.articleId = JSON.stringify(this.$route.query.articleId)
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        //提交文章,判断是否是新增还是更新，文章id
        showText(){
          const editor = this.editor // 获取 editor 实例
          if (editor == null) return

          console.log('文章id.....',this.articleId);
          if(this.articleId){
            //更新
            this.content = editor.getText()
            this.html = editor.getHtml()
            let data = {
              articleId : this.articleId,
              writerId : this.userInfo.userid,
              title : this.ArticleTitle,
              content : this.content,
              html:this.html,
              articleStatus : this.articleArray.articleStatus,
              url: this.articleArray.url
            }
            this.$store.dispatch('article/changeArticleState',data)
            this.$router.back()
          } else {
            //新增
            this.content = editor.getText()
            this.html = editor.getHtml()
            let data = {
              articleId : this.articleArray.articleId,
              writerId : this.userInfo.userid,
              title : this.ArticleTitle,
              content : this.content,
              html:this.html,
              articleStatus : this.articleArray.articleStatus,
              url: this.articleArray.url
            }
            this.$store.dispatch("article/getArticleArrayList",data)
            //this.$store.dispatch('article/getArticleID')
            this.$router.back()
          }
        }
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    destroy(){
      this.editor = '',
      this.content = ''
    }
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="less" scoped>
.van-button{
  width: 98%;
  margin: 1px auto;
  background-color: pink;
  border: none;
}
</style>