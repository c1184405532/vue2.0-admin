<template>
    <div class="layout_page_box">
        <a-layout>
            <a-layout-sider 
                :width="256"
                collapsible
                v-model="collapsed"
                :trigger="null"
                class="layout_sider"
            >
                <SiderBar
                    :collapsed="collapsed"
                    
                />
            </a-layout-sider>
            <a-layout class="content_box">
                <a-layout-header class="layout_header">
                    <HeaderBar
                        :userData="userData"
                        :toggleClick="toggleClick"
                        :collapsed="collapsed"
                    />
                </a-layout-header>
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
import HeaderBar from '@/components/HeaderBar.vue'
export default {
    components: {
       SiderBar,
       HeaderBar
    },
    props: {

    },
    data() {
        return {
            collapsed:false,
            userData:{
                name:'陈禹廷',
                avatar:require('@/assets/avatar.jpg'),
                list:[
                    {icon:'user',text:'个人中心',routeName:''}
                ]
            }
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
            console.log('aaa')
            this.collapsed = !this.collapsed
        },
        eventClientScale(){
            //监听屏幕缩放 小于750 收缩侧边栏 大于展开侧边栏
            addEventListener('resize',(e)=>{
                if(document.body.clientWidth < 750){
                    this.collapsed = true;
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
    }
    .content_box{
        
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
