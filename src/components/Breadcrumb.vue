<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item :key="index" v-for="(value,index) in breadcrumbItemData">{{value}}</a-breadcrumb-item>
        </a-breadcrumb>
       
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            breadcrumbItemData:[],
        };
    },
    computed: {

    },
    created() {
        //先off的原因是 可能会多个页面 且每个页面都会多次切换就会造成多次监听 
        //避免无用性能的浪费 监听前先取消上一次监听
        //console.log('breadcrumb created')
        vm.$off('menuBreadcrumb').$on('menuBreadcrumb',(breadcrumbData)=>{
            breadcrumbData.reverse()
            this.breadcrumbItemData = breadcrumbData
            console.log(this.breadcrumbItemData)
        })
        
    },
    mounted() {
        //console.log('breadcrumb mounted')
        //console.log(this.breadcrumbItemData)
    },
    watch: {
        breadcrumbItemData(newValue,oldValue){
           //console.log('watch',this.breadcrumbItemData)
        },
    },
    beforeDestroy(){
       //console.log('breadcrumb beforeDestroy')
    },
    destroyed(){
        //console.log('breadcrumb destroyed')
    },
    methods: {

    },
};
</script>

<style scoped lang="less">

</style>
