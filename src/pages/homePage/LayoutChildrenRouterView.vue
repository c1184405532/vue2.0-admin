<template>
    <router-view/>
</template>

<script>
//此文件是由于多层嵌套子路由 父级路由必须要有<router-view/>组件包裹 component 不能为空 否则无法响应路由配置
//配置一个空组件 用于挂载多层children路由
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

    },
    watch: {

    },
    methods: {

    },
};
</script>

<style scoped lang="less">

</style>
