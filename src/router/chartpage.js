/*
组件缓存keep-alive配置
在路由对象中配置meta字段
meta:{
   
    keepAlive:true || false,//默认false 只要不设置true都代表不缓存组件 
}
//第一次进入缓存组件后 不管是跳转新页面还是返回上一级页面都不会触发函数创建生命周期
//如需配置进入某个页面后缓存当前页面 返回时就不触发加载 但进入或返回非指定页面时 再次进入当前组件需要触发加载 需在beforeRouteLeave生命周期配置
beforeRouteLeave(to,from,next){
    // console.log('to',to)
    // console.log('form',from)
    to.meta.keepAlive = true; 
    //只要进入的页面不是你所指定的路由name名那么设置to.meta.keepAlive为false 再次从其他页面进入当前页面时不会缓存组件 
    if(to.name !== 'home/listReveal/detail'){
        to.meta.keepAlive = false; 
    }
    next()
},
使用示例详见 listReveal/List
//
*/
const LayoutChildrenRouterView = ()=> import('@/pages/homePage/LayoutChildrenRouterView.vue');
const BarChart = ()=> import('@/pages/chartPage/BarChart.vue');
const LineChart = ()=> import('@/pages/chartPage/LineChart.vue');
//在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
export default [
    {
        meta: {routeTitle:'VueApexCharts',icon:'mail',img:require('@/assets/home.jpg')},
        path:'apexcharts',
        name:'layout/apexcharts',
        component:LayoutChildrenRouterView,
        children:[
            {
                meta: {routeTitle:'柱状图',icon:'mail'},
                path:'barChart',
                name:'apexcharts/barChart',
                component:BarChart
            }, 
            {
                meta: {routeTitle:'折线图',icon:'mail'},
                path:'lineChart',
                name:'apexcharts/lineChart',
                component:LineChart
            },
        ]
    },  
]