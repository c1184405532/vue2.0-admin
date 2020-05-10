<template>
    <div class="list_component_box">
        
            <div class="list" v-for="(value,index) in listData" :key="index" @click="gotoDetail('home/listReveal/detail',value)">
                <p>姓名：{{value.name}}</p>
                <p>年龄：{{value.age}}</p>
            </div>
     
       
    </div>
</template>

<script>

import Axios from '@/request/Axios.js'

export default {
    name:'homelistReveallist',
    components: {
  
        
      
    },
    props: {

    },
    data() {
        return {
            listData:[
                
            ],
            page:1,
            listTotal:0,
            finishedText:'',
            successText:'刷新成功',
            isListError:false
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getList()
    },
    
    watch: {

    },
    beforeRouteLeave(to,from,next){
        //此注释配置用于v-if keep-alive 组件配置 用此方式就打开注释
        // console.log('to',to)
        // console.log('form',from)
        // to.meta.keepAlive = true; 
        // if(to.name !== 'home/listReveal/detail'){
        //     to.meta.keepAlive = false; 
        // }
        this.$nextTick(()=>{
            next()
        })
        
    },
    activated(){
      
    },
    
    methods: {
        gotoDetail(routerName,data){
            
            window.setLocalStorage('homelistReveallistScrollTop',this.$refs.ListComponentsRef.$el.scrollTop)
            window.vm.$emit('setKeepAliveData','homelistReveallist')
            this.$router.push({
                name:routerName,
                query:data
            })
        },
        backCallback(route){
            window.removeLocalStorage('homelistReveallistScrollTop')
            window.vm.$emit('clearKeepAliveData','homelistReveallist')
            //console.log(route)
        },
        //本模板所有接口api都是用的自己封装的node接口
        //地址 https://github.com/c1184405532/myNodeRequest.git
        //有自己的服务器数据 就在http-default.js中设置你的服务器端口
        //没有就下载我的node.js文件 本地运行 然后配置端口请求就行
        getList(getDataType){
            Axios.get('api/list',{
                //当前页数
                data:{
                    page:this.page,
                },
                //此配置详见Axios.js配置
                requestToastConfig:{
                    
                    beforeRequestToastType:getDataType ? getDataType.beforeRequestToastType : true
                }
            }).then((res)=>{
                //console.log('刷新成功',res)  
                if(res.success){
                    //数据合并
                    this.listData = [...this.listData,...res.data.list]
                    this.listTotal = res.data.total;
                }
            },error=>{
                //console.log(error)
                //如果是下拉刷新请求报错 也重置下拉刷新状态
                
            })
        },
        listRefresh(){
            //下拉刷新时重置状态
            //获取数据接口传递状态当前为下拉刷新 用于判断请求成功后改变下拉状态
            this.page = 1;
            this.listData = [];
            this.finishedText = '';
            this.getList({clearRefresh:true})

        },
        listOnLoad(){
            console.log('滚动到的');            
            // console.log('this.listData.length',this.listData.length)
            // console.log('this.listTotal',this.listTotal)
            //滚动到底触发函数
            //页数加一
            //获取数据接口传递状态当前为滚动到底 并且当前请求发起不显示全局请求toast显示
            if(this.listData.length < this.listTotal){
                this.page += 1;
                this.getList({
                    clearListLoad:true,
                    beforeRequestToastType:false,
                })
            }
            
            
        },
    },
};
</script>

<style scoped lang="less">
    .list_component_box{
        height: 100%;
        width: 100%;
        // overflow: auto;
        .list{
            padding: 42px;
            border-top: 1px solid #ddd;
        }
    }
     
</style>
