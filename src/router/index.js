import VueRouter from "vue-router";
import ListRouter from "./list.js"
import ChartpageRouter from "./chartpage.js"
//防止重复跳转同一路由报警告
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => {
        console.log('重复路由',error)
    })
}
// window.addEventListener('popstate',(e)=>{
//     let isBack = window.getLocalStorage('routerIsBack')
//     if(!isBack){
//         window.history.back();
//     }
//     console.log('浏览器回退',e);
    
// })
const Login = ()=> import('@/pages/user/Login.vue');
const Layout = ()=> import('@/pages/homePage/Layout.vue');
const FourZeroFour = ()=> import('@/pages/errorPage/404.vue');
const RouterInstance =  new VueRouter({
    routes: [
        {
            path:'/',
            name:'/',
            redirect: '/user/login',
        },
        {
            meta: {},
            path:'/user/login',
            name:'user/login',
            component:Login
        }, 
        {
            meta: {type:'LayoutRouter'},
            path:'/homePage/layout',
            name:'homePage/layout',
            component:Layout,
            children:[
                ...ListRouter,
                ...ChartpageRouter,
                {
                    meta: {routeTitle:'404',icon:'error',isAddSiderBar:false},
                    path:'404',
                    name:'layout/404',
                    component:FourZeroFour
                },
            ]
        }, 
        
    ],
    
    scrollBehavior(to,from,savedPosition){
            let isBack = window.getLocalStorage('routerIsBack')
            ////对路由跳转进行拦截 如果不能回退或前进 就跳转到登录页
            if(!isBack){
                window.vm.$router.replace({
                    name:'user/login',
                })
            }else if(to.name == 'user/login'){
                //如果有人在退出后 多次点击回退 那么历史记录里就会出现多个登录界面url
                //此时再点击登录 然后点击回退就会进入login页面 
                //所以判断如果已经登录了 那么回退或者跳转到登录页面直接跳转到首页
                window.vm.$router.replace({
                    name:'list/listTable',
                })
                //console.log('to.name == user/login')
            } 
            //console.log('scrollBehavior')
        //console.log('to',to)
        // console.log('savedPosition',savedPosition)
    },
})
//路由守卫 用于权限判断
RouterInstance.beforeEach((to,from,next)=>{
    //debugger
    //console.log('to',to)
    //console.log('from',from)
    if(to.meta.routeTitle === '搜索页'){
        //RouterInstance.replace();
        next({name:'layout/404'});
    }else{
        next();
    }
    //next()
    
})
export default RouterInstance