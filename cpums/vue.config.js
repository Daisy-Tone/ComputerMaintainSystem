module.exports = {
    assetsDir: 'static',
    parallel: false,
    publicPath: './',
    pages: {
      index: {
        // 入口
        entry: 'src/main.js'
      },
    },
    lintOnSave: false,    //关闭语法检查
    // 开启代理服务器
  
    devServer: {
      hot:true,
      proxy: {
        '/api':{
          // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
          target:'http://47.107.33.169:9001',
          // 允许跨域
          changeOrigin:true,
          ws:true,
          // pathRewrite:{
          //   '^/api':'http://10.42.0.124:9001'
          // }
          pathRewrite:{
            '^/api':''
          }
        },
      }
    },
  }