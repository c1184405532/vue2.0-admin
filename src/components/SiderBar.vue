<template>
	<div :class="!isMobile && collapsed?'sider_bar_box sider_bar_collapsed':'sider_bar_box'">
        <div :class="!isMobile &&  collapsed?'logo logo_collapsed':'logo'">
            <img class="logo_img" src="@/assets/admin_logo.jpg" alt="">
            <div class="text" v-show="isShowText()">My Antd of Vue</div>
        </div>
		<a-menu
			v-model="menuSelectKeys"
			:defaultOpenKeys="defaultOpenKeys"
			mode="inline"
            theme="dark"
            :inline-collapsed="isMobile?false:collapsed"
            @click="menuItemClick"
		>
            <template v-for="value in routerData">
                <a-sub-menu v-if="value.children" :key="value.meta.routTitle" >
                    <span slot="title" >
                        <img class="siderbar_img_icon" :src="value.meta.img" alt="" v-if="value.meta.img">
                        <a-icon :type="value.meta.icon" v-else/>
                        <span :class="!isMobile &&  collapsed?'item_title_op_span':''">{{value.meta.routTitle}}</span>
                    </span>
                    <template v-for="childrenValue in value.children">
                        <a-sub-menu v-if="childrenValue.children" :key="childrenValue.meta.routTitle" >
                            <span slot="title" class="item_title">
                                <img class="siderbar_img_icon" :src="childrenValue.meta.img" alt="" v-if="childrenValue.meta.img">
                                <a-icon :type="childrenValue.meta.icon" v-else/>
                                <span>{{childrenValue.meta.routTitle}}</span>
                            </span>
                            <a-menu-item :key="subChildren.meta.routTitle"  v-for="subChildren in childrenValue.children">
                                <img class="siderbar_img_icon" :src="subChildren.meta.img" alt="" v-if="subChildren.meta.img">
                                <a-icon :type="subChildren.meta.icon" v-else/>
                                {{subChildren.meta.routTitle}}
                            </a-menu-item>
                        </a-sub-menu>
                        <a-menu-item v-else :key="childrenValue.meta.routTitle" >
                            <img class="siderbar_img_icon" :src="childrenValue.meta.img" alt="" v-if="childrenValue.meta.img">
                            <a-icon :type="childrenValue.meta.icon" v-else/>
                            {{childrenValue.meta.routTitle}}
                        </a-menu-item>
                    </template>
                </a-sub-menu>
                <a-menu-item  :key="value.meta.routTitle" v-else>    
                    <img class="siderbar_img_icon" :src="value.meta.img" alt="" v-if="value.meta.img">
                    <a-icon :type="value.meta.icon" v-else/>
                    <span :class="!isMobile &&  collapsed?'item_title_op_span':''">{{value.meta.routTitle}}   </span>   
                </a-menu-item>
            </template>
			
		</a-menu>
	</div>
   
</template>

<script>
import RouterPathData  from '@/router/index.js'
export default {
	components: {},
	props: {
        collapsed:{
            type:Boolean,
            default:false
        },
        isMobile:{
            type:Boolean,
            default:false
        },
    },
	data() {
		return {
            defaultOpenKeys: [''],
            menuSelectKeys: [''],
            routerData:{},
            breadcrumbEmitData:[]
        }
	},
	computed: {},
	created() {
        //获取路由文件
        this.routerData = RouterPathData.options.routes.map(
            (route)=> (route.meta && route.meta.type === 'LayoutRouter' ? route : '')
        ).filter( (routeData)=> (routeData) )[0].children;

        //默认展开展开列表项 必须在未创建dom时配置 否则不生效
        this.defaultOpenKeys = this.routerData[0] && this.routerData[0].meta ? [this.routerData[0].meta.routTitle] : [''];
    },
	mounted() {
        

        //默认列表选择项 必须在创建dom之后配置 否则watch监听跳转页面不生效
        this.menuSelectKeys = this.routerData[0] && this.routerData[0].children ? [this.routerData[0].children[0].meta.routTitle] : ['']
        
        //初始化面包屑导航数据
        this.breadcrumbEmitData = [...this.menuSelectKeys,...this.defaultOpenKeys]

        //this.defaultOpenKeys = ['搜索列表','列表页']
        //console.log(this.menuSelectKeys)
        console.log(this.routerData)
    },
	watch: {
		menuSelectKeys(newValue){
            this.gotoPage(newValue[0])
            //console.log(newValue)
        },
	},
	methods: {
        gotoPage(routeKey){
            let routeName;
            function getRouteName(route){
                for(let i=0; i<route.length; i++){
                    if(routeKey === route[i].meta.routTitle){
                        return route[i].name
                    }else{
                        let name = getRouteName(route[i].children || [])
                        if(name){
                            return name
                        }
                    }
                }
            }
            routeName = getRouteName(this.routerData)
            console.log('跳转页面',routeName)
            this.$router.push({
                name:routeName
            }).then(res=>{
                //面包屑的监听数据 必须在路由跳转之后进行发送
                //否则面包屑组件中的监听 在组件未创建时无法进入触发监听函数 
                this.menuBreadcrumbEmit(this.breadcrumbEmitData)
                //console.log('路由',res)
            })
               
        },
        menuItemClick(e){
            //console.log('点击',e)
            this.breadcrumbEmitData = e.keyPath
           
        },
        menuBreadcrumbEmit(breadcrumbData){
            //console.log('emit')
            window.vm.$emit('menuBreadcrumb',breadcrumbData)
        },
        isShowText(){
            if(this.isMobile){
                return true
            }else{
                return this.collapsed ? false : true
            }
            
        },
    }
}
</script>

<style scoped lang="less">
.sider_bar_box{
    width: 256px;
    background: #001529;
    //transition: all .2s;
    //position: relative;
    //z-index: 10;
    min-height: 100%;
    //box-shadow: 2px 0 6px rgba(0,21,41,.35);
    
}
.sider_bar_collapsed{
    width: 80px;
}
.logo {
    height: 64px;
    //background: rgba(255, 255, 255, 0.2);
    //margin: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .logo_img{
        
        height: 32px;
        width: 32px;
        border-radius: 8px;
        margin-left: 24px;            
    }
    .text{
        display: inline-block;
        margin: 0 0 0 12px;
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        vertical-align: middle;
        animation: fade-in;
        animation-duration: .3s;
    }
}
.logo_collapsed{
    width: 48px;
}
</style>
<style lang="less">
    .siderbar_img_icon{
        height: 14px;
        width: 14px;
        margin-right: 10px;
    }
   
    .sider_bar_box{
   
        .item_title{
            display: flex;
            align-items: center;
        }
        .ant-menu-item{
            display: flex;
            align-items: center;
        }
        .item_title_op_span{
            opacity: 0;
            max-width: 0;
        }
    }
</style>
