<template>
    <div class="layout_page_box">
        <a-layout>
            <a-layout-sider 
                :width="256"
                collapsible
                v-model="collapsed"
            >
                <SiderBar
                    :collapsed="collapsed"
                />
            </a-layout-sider>
            <a-layout>
                <a-layout-header>Header</a-layout-header>
                <a-layout-content>Content</a-layout-content>
                <a-layout-footer>Footer</a-layout-footer>
            </a-layout>
        </a-layout>
        <!-- <div class="ignore_page_content">
            <router-view/>
        </div> -->
    </div>
</template>

<script>
import SiderBar from '@/components/SiderBar.vue'
export default {
    components: {
       SiderBar
    },
    props: {

    },
    data() {
        return {
           collapsed:false,
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
        //点击底部跳转的回调
        tabbarCallback(tabbarData){
            console.log(tabbarData)
            this.isShowNavBar = tabbarData.navBarType;
            this.navBarTitle = tabbarData.navTitle ? tabbarData.navTitle : tabbarData.tabbarTitle;
            this.navRightIcon = tabbarData.navRightIcon;
            this.navRightText = tabbarData.navRightText;
            this.navRightColor = tabbarData.navRightColor;
        },
    },
};
</script>

<style scoped lang="less">
    .layout_page_box{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        //padding-bottom: 50PX;
        
    }
    .ignore_page_content{
        width: 100%;
        // height: 100%;
        flex: 1;
        //height: calc(100% - 96px);
        
        overflow: auto;
    }
</style>
