import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const CommonLayout = () => import('@/components/CommonLayout.vue')
// 中间导航块
const InitiateOrder = () => import('@/pages/InitiateOrder.vue')
const OrderList = () => import('@/pages/UserOrder/OrderList.vue')
const OrderDetail = () => import('@/pages/UserOrder/OrderDetail.vue')
const ArticleList = () => import('@/pages/UserArticles/ArticleList.vue')
const ArticleText = () => import('@/pages/UserArticles/ArticleText.vue')
const ModifyArticle = () => import('@/pages/UserArticles/ModifyArticle.vue')
// 底部导航栏
// 首页
const Home = () => import('@/pages/Home.vue')
const RecommenedArticles = () => import('@/pages/RecommenedArticles.vue')
const OrderSquare = () => import('@/pages/OrderSquare.vue')
const WaitOrderDetail = () => import('@/pages/WaitOrderDetail.vue')
// 消息
const MessageLists = () => import('@/pages/UserMessage/MessageLists.vue')
const MessageUser = () => import('@/pages/UserMessage/MessageUser.vue')
const Report = () => import('@/pages/UserMessage/Report.vue')
// 个人信息
const My_user = () => import('@/pages/My/My_user.vue')
const EditAddress = () => import('@/pages/My/EditAddress.vue')
const EditPwd = () => import('@/pages/My/EditPwd.vue')
const SetName = () => import('@/pages/My/SetName.vue')

const Login = () => import('@/pages/Login.vue')

const router = new VueRouter({
    routes:[
        // 设置初始路径
        {
            path:'/',
            redirect:'/Home'
        },
        {
            path:'/',
            meta:{title:'首页'},
            component:CommonLayout,
            children:[
                {
                    path:'Home',
                    name:'Home',
                    meta:{title:'首页'},
                    component:Home,
                    redirect:'/Home/RecommenedArticles',
                    children:[
                        {
                            path:'RecommenedArticles',
                            name:'RecommenedArticles',
                            component:RecommenedArticles
                        },
                        {
                            path:'OrderSquare',
                            name:'OrderSquare',
                            component:OrderSquare
                        },
                    ]
                },
                {
                    path:'MessageLists',
                    name:'MessageLists',
                    meta:{title:'消息列表'},
                    component:MessageLists
                },
                {
                    path:'My_user',
                    name:'My_user',
                    meta:{title:'个人信息'},
                    component:My_user,
                },
            ]
        },
        {
            path:'/EditAddress',
            name:'EditAddress',
            meta:{title:'修改收获地址'},
            component:EditAddress
        },
        {
            path:'/EditPwd',
            name:'EditPwd',
            meta:{title:'修改密码'},
            component:EditPwd
        },
        {
            path:'/SetName',
            name:'SetName',
            meta:{title:'修改用户昵称'},
            component:SetName
        },
        {
            path:'/InitiateOrder',
            name:'InitiateOrder',
            meta:{title:'维修请求'},
            component:InitiateOrder
        },
        {
            path:'/OrderList',
            name:'OrderList',
            meta:{title:'订单列表'},
            component:OrderList
        },
        {
            path:'/OrderDetail',
            name:'OrderDetail',
            meta:{title:'订单详情'},
            component:OrderDetail
        },
        {
            path:'/ArticleList',
            name:'ArticleList',
            meta:{title:'文章列表'},
            component:ArticleList,
        },
        {
            path:'/ArticleText',
            name:'ArticleText',
            meta:{title:'文章内容'},
            component:ArticleText
        },
        {
            path:'/ModifyArticle',
            name:'ModifyArticle',
            meta:{title:'发布/修改文章'},
            component:ModifyArticle
        },
        {
            path:'/MessageUser',
            name:'MessageUser',
            meta:{title:'消息列表'},
            component:MessageUser
        },
        {
            path:'/Report',
            name:'Report',
            meta:{title:'发起举报'},
            component:Report
        },
        {
            path:'/Login',
            name:'Login',
            meta:{title:'用户登录'},
            component:Login
        },
        {
            path:'/WaitOrderDetail',
            name:'WaitOrderDetail',
            meta:{title:'待接订单详情'},
            component:WaitOrderDetail
        }
    ]
})


export default router
router.beforeEach((to,form,next)=>{
    // beforeEach是router的钩子函数，在进入路由前执行
    if(to.meta.title){  //判断是否有标题
        document.title = to.meta.title
    }
    next()  //执行进入路由，如果不写就不会进入目标页
})