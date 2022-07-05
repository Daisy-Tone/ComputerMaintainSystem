// 该文件用于创建Vuex中最核心的store

// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
import user from './user'
import article from './article'
import order from './order'

// 使用插件
Vue.use(Vuex)

// 创建并暴露store
export default new Vuex.Store({
    modules:{
        user:user,
        article:article,
        order:order
    }
})
