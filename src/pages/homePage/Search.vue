<template>
    <div>
        
           进入详情
       
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

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        vm.$off('navBarRightClick').$on('navBarRightClick',(navBarData)=>{
            console.log('search',navBarData)
        })
    },
    watch: {

    },
    methods: {
        gotoPage(){
            this.$router.push({
                name:'home/search/detail',
            })
        }
    },
};
</script>

<style scoped lang="less">

</style>
