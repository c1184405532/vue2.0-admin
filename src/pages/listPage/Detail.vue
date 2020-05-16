<template>
    <div class="detail_box">
        
       
    </div>
</template>

<script>

import Axios from '@/request/Axios.js'

export default {
    components: {
     

    },
    props: {

    },
    data() {
        return {
           
        };
    },
    computed: {

    },
    created() {
        //console.log('路由参数',this.$route)
        this.parentData = this.$route.query
    },
    mounted() {
       
    },
    watch: {

    },
    methods: {
        backCallback(route){
            //console.log(route)
        },
        
    },
};
</script>

<style scoped lang="less">
    .detail_box{
        height: 100%;
        width: 100%;
        // overflow: auto;
        .list{
            padding: 42px;
            border-top: 1px solid #ddd;
        }
    }
    .list_box{
        height: 1000px;
        width: 100%;
        overflow: auto  ;
    }   
</style>
