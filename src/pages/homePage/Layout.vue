<template>
    <div class="layout_page_box">
        <a-drawer
            placement="left"
            wrapClassName="sider_drawer_box"
            :closable="false"
            :keyboard="false"
            :visible="drawerVisible()"
            :bodyStyle="{height:'100vh',padding:0}"
            @close="onClose"
            handle
            v-if="isMobile"
        >
            <SiderBar
                :collapsed="collapsed"
                :isMobile="isMobile"
                :mobileClose="onClose"
            />
        </a-drawer>
        <a-layout>
            <a-layout-sider 
                :width="256"
                collapsible
                v-model="collapsed"
                :trigger="null"
                class="layout_sider"
                v-if="!isMobile"
            >
                <SiderBar
                    :collapsed="collapsed"
                    :isMobile="isMobile"
                    :mobileClose="onClose"
                />
            </a-layout-sider>
           
            <a-layout >
                <a-layout-header class="layout_header">
                    <HeaderBar
                        :userData="userData"
                        :toggleClick="toggleClick"
                        :collapsed="collapsed"
                        :isMobile="isMobile"
                        :isFixed="true"
                    />
                </a-layout-header>
                <a-layout-content class="content_box">
                    <router-view/>
                    <!-- <LayoutChildrenRouterView/> -->
                </a-layout-content>
                <a-layout-footer>Footer</a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import SiderBar from '@/components/SiderBar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import LayoutChildrenRouterView from '@/pages/homePage/LayoutChildrenRouterView.vue'
export default {
    components: {
        SiderBar,
        HeaderBar,
        LayoutChildrenRouterView
    },
    props: {

    },
    data() {
        return {
            collapsed:false,
            isMobile:false,
            userData:{
                name:'陈禹廷',
                avatar:require('@/assets/avatar.jpg'),
                list:[
                    {icon:'user',text:'个人中心',routeName:''}
                ]
            },
            
       
        };
    },
    computed: {
        
    },
    created() {

    },
    mounted() {
        this.eventClientScale()
    },
    watch: {
       
    },
    methods: {
        //点击菜单收起展开按钮
        toggleClick(){
            this.collapsed = !this.collapsed
            //console.log('toggleClick',this.collapsed)
        },
        drawerVisible(){
            return this.collapsed ? false : true
        },
        onClose(){
            //console.log('关闭',)
            this.collapsed = true;
        },
        
        eventClientScale(){
            if(document.body.clientWidth < 750){
                this.collapsed = true;
                this.isMobile = true;
            }else{
                this.isMobile = false;
            }
           
            if(this.collapsed && document.body.clientWidth > 750){
                this.collapsed = false;
            }
            //监听屏幕缩放 小于750 收缩侧边栏 大于展开侧边栏
            addEventListener('resize',(e)=>{
                if(document.body.clientWidth < 750){
                    this.collapsed = true;
                    this.isMobile = true;
                }else{
                    this.isMobile = false;
                }
                
                if(this.collapsed && document.body.clientWidth > 750){
                    this.collapsed = false;
                }
                
            })
        }
    },
};
</script>

<style scoped lang="less">
    .layout_page_box{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;  
        @media (max-width:750px) {
            .ant-layout{
                //min-height: 100%;
                
                .ant-layout{
                    overflow-x: hidden;
                }
            } 
        
            
        }   
        // @media (min-width:750px){
        //     .ant-layout.ant-layout-has-sider > .ant-layout, .ant-layout.ant-layout-has-sider > .ant-layout-content {
        //         overflow-x: hidden;
        //     }
        // }
    }
    .content_box{
        margin: 24px;
        min-height: auto;
    }
    .layout_sider{
        position: relative;
        z-index: 10;
        min-height: 100%;
        box-shadow: 2px 0 6px rgba(0,21,41,.35);
    }
    .layout_header{
        background: #fff;
        width: 100%;
        padding: 0;
    }
</style>
<style lang="less">
    // .sider_drawer_box{
    //     .ant-drawer-body{
    //         height: 100vh;
    //         padding: 0px;
    //     }
        
    // }
</style>