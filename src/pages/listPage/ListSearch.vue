<template>
    <div class="list_table_box">
        <!-- <Breadcrumb/> -->
        搜索文章
    </div>
</template>

<script>

import Axios from '@/request/Axios.js'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
    components: {
        Breadcrumb    
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
        //this.getList()
    },
    
    watch: {

    },
    beforeRouteLeave(to,from,next){
        
        this.$nextTick(()=>{
            next()
        })
        
    },
    activated(){
      
    },
    
    methods: {
       
        
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
        
    },
};
</script>

<style scoped lang="less">
    .list_table_box{
        height: 100%;
        width: 100%;
        
    }
     
</style>
