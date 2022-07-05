import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('../components/Login.vue')
const Register = () => import('../components/Register.vue')
const CommonLayout = () => import('../components/CommonLayout.vue')
const Order = () => import('../pages/order/Order.vue')
const OrderDetails = () => import('../pages/order/OrderDetails.vue')
const Information = () => import('../pages/information/Information.vue')
const ArticleDetails = () => import('../pages/information/ArticleDetails.vue')
const Report = () => import('../pages/report/Report.vue')
const Users = () => import('../pages/users/Users.vue')

const router = new VueRouter({
    routes:[
        {
            path:'/',//主页面
            name:'Login',
            component:Login,
            meta: { title: '登录' }
        },
        {
            path:'/Register',
            name:'Register',
            component:Register,
            meta: { title: '注册' }
        },
        {
            path:'/CommonLayout',//主页面
            component:CommonLayout,
            redirect:'/CommonLayout/Order',
            children:[
                {
                    path:'Order',
                    name:'Order',
                    component:Order,
                    meta: { title: '订单管理' }
                },
                {
                    path:'OrderDetails',
                    name:'OrderDetails',
                    component:OrderDetails,
                    meta: { title: '资讯管理 / 文章详情' },
                },
                {
                   path:'Information',
                   name:'Information',
                   component:Information ,
                   meta: { title: '资讯管理' },
                },
                {
                    path:'ArticleDetails',
                    name:'ArticleDetails',
                    component:ArticleDetails,
                    meta: { title: '资讯管理 / 文章详情' },
                },
                {
                    path:'Report',
                    name:'Report',
                    component:Report,
                    meta: { title: '举报管理' }
                },
                {
                    path:'Users',
                    name:'Users',
                    component:Users,
                    meta: { title: '用户管理' }
                }
            ]
        }
    ]
})

export default router