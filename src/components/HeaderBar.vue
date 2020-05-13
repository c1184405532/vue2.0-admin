<template>
	<div class="header_bar_box">
        
             
        <div class="left" @click="toggleClick">
            <img class="logo" v-show="isMobile" src="@/assets/admin_logo.jpg" alt="">
            <a-icon class="menu" :style="{fontSize:'20px'}" :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </div>
        <div class="right">
            <a-config-provider>
                <template #renderEmpty>
                    <div style="text-align: center">
                    <a-icon type="smile" style="font-size: 20px" />
                    <p>{{noticeEmptyText}}</p>
                    </div>
                </template>
                <div class="message">
                    <a-dropdown :trigger="['click']" overlayClassName="header_message_box">
                        <span class="notice_box">
                            <a-badge :count="1">
                                <a-avatar class="notice" shape="square" icon="bell"/>
                            </a-badge>
                        </span>
                        <a-menu slot="overlay">
                            <a-tabs 
                                :tabBarGutter="28"
                                :animated="tabsAnimated"
                                :tabBarStyle="{display:'flex',justifyContent: 'center'}"
                                v-model="tabsActive"
                                class="tabs_box"
                                
                            >
                                <a-tab-pane  
                                    :key="index" 
                                    v-for="(value,index) in tabsData"
                                    :tab="value.title"                             
                                >
                                    <a-list 
                                        class="message_list_box" 
                                        :grid="{xs:1,sm:1}"
                                        :data-source="value.data"
                                        item-layout="horizontal" 
                                    >
                                        <a-list-item class="message_list" slot="renderItem" slot-scope="item">
                                            <a-list-item-meta
                                                :description="item.time"
                                            >
                                                <span  slot="title">{{ item.message }}</span>
                                                <a-avatar
                                                    slot="avatar"
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                />
                                            </a-list-item-meta>
                                            
                                        </a-list-item>
                                        <div class="list_footer" slot="footer" v-if="value.data.length > 1">
                                            <div class="item" @click="removeList(index)">{{value.Ltext}}</div>
                                            <div class="item">{{value.Rtext}}</div>
                                        </div>
                                        
                                    </a-list>
                                </a-tab-pane>

                            </a-tabs>
                        </a-menu>
                    </a-dropdown>
                    
                </div>
            </a-config-provider>
            <a-dropdown overlayClassName="user_drop_box"  class="user_drop_box">
                <div class="user_content">   
                    <img :src="userData.avatar" alt="" class="user_avatar">
                    <div class="user_name" v-if="!isMobile">{{userData.name}}</div>
                </div>
                <a-menu slot="overlay">
                    <a-menu-item class="user_list_box" :key="index" v-for="(value,index) in userData.list">
                        <a-icon :type="value.icon" />
                        <span class="user_list_text">{{value.text}}</span>
                    </a-menu-item>     
                    <a-divider class="divider_style"/>   
                    <a-menu-item class="user_list_box" @click="logout">
                        <a-icon type="logout" />
                        <span class="user_list_text" >退出登录</span>
                    </a-menu-item>          
                </a-menu>
            </a-dropdown>

        </div>
       
       
    </div>
</template>

<script>
export default {
	components: {},
	props: {
        //用户数据
        userData:{
            type:Object,
            default:function(){
                return {}
            }
            /*
                数据格式
                {
                    name:'陈禹廷',//用户名
                    avatar:require('@/assets/avatar.jpg'),//用户头像
                    list:[
                        //icon 列表icon text 列表文字  routeName 点击列表跳转的页面 是name 不是path
                        {icon:'user',text:'个人中心',routeName:''}
                    ]
                }
            */
        },
        collapsed:{
            type:Boolean,
            default:false,
        },
        isMobile:{
            type:Boolean,
            default:false,
        },
        toggleClick:{
            type:Function,
            default:function(){
                
            }
        }
    },
	data() {
		return {
            noticeEmptyText:'你已查看所有通知',
            tabsAnimated:false,
            tabsActive:0,
            tabsData:[
                {title:'通知(3)',Ltext:'清空通知',Rtext:'查看更多',data:[
                    {message:"你收到了三份请假报告",time:'2020-05-12 10:49'},
                    {message:"你收到了三份请假报告",time:'2020-05-12 10:49'},
                    {message:"你收到了三份请假报告",time:'2020-05-12 10:49'},
                    ]},
                {title:'消息 (3)',Ltext:'清空消息',Rtext:'查看更多',data:[
                    {message:"xxx回复了你",time:'2020-05-12 10:49'},
                    {message:"xxx点赞了你",time:'2020-05-12 10:49'},
                    {message:"xxx@了你",time:'2020-05-12 10:49'},
                    ]},
                {title:'代办 (3)',Ltext:'清空代办',Rtext:'查看更多',data:[
                    {message:"首页头部代码bug",time:'2020-05-12 10:49'},
                    {message:"侧边栏菜单选择跳转bug",time:'2020-05-12 10:49'},
                    {message:"缩放成移动端布局bug",time:'2020-05-12 10:49'},
                    ]},
            ]
        }
	},
	computed: {},
	created() {},
	mounted() {
       
    },
	watch: {
		tabsActive(newValue,oldValue){
            let noticeEmptyTextArr = ['你已查看所有通知','您已读完所有消息','你已完成所有待办']
            this.noticeEmptyText = noticeEmptyTextArr[newValue]
            if(this.tabsData[oldValue].data.length < 1 && this.tabsData[newValue].data.length < 1){
                this.tabsAnimated = true;
            }else{
                this.tabsAnimated = false;
            }
            //console.log(newValue,oldValue)
        },
	},
	methods: {
        logout(){
            console.log('退出登录')
        },
        ccc(){
            console.log(222)
        },
        removeList(index){
            let title = "通知"
            if(index === 1){
                title = `消息`;
            }else if(index === 2){
                title = `代办`;
            }
            this.tabsData[index].title = title;
            this.tabsData[index].data = [];
        },
        
    }
}
</script>

<style scoped lang="less">
    .header_bar_box{
        position: relative;
        display: flex;
        align-items: center;
        height: 64px;
        padding: 0;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        justify-content: space-between;
        
        .left{
            
            display: flex;
            cursor: pointer;
            align-items: center;
            .logo{
                height: 32px;
                width: 32px;
                border-radius: 8px;
                margin-left: 24px;
            }
            .menu{
                padding: 0 24px;
            }
        }
        .right{
            height: 100%;
            display: flex;
            padding-right: 24px;
        }
        .message{
            height: 100%;
            cursor: pointer;
            margin-right: 12px;
            width: 50px;
            padding: 0 6px 0 6px;
            .notice{
                color: #666;
                background: none;
            }
            &:hover{
                background:rgba(0, 0, 0, 0.025)
            } 
        }
        .user_drop_box{
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0 12px;
            transition: all .3s;
            &:hover{
                background:rgba(0, 0, 0, 0.025)
            }
            .user_content{
                height: 100%;
            }
        }
        
    }
    .user_avatar{
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 8px;
    }
    .notice_box{
        height: 100%;
        display: inline-block;
    }
    .user_name{
        font-size: 14px;
    }
    .divider_style{
        margin-top: 6px;
        margin-bottom: 6px;
    }
</style>
<style lang="less" >


.user_drop_box{
    
    .user_list_box{
        display: flex;
        align-items: center;
        padding-right: 24px;
    }
}

.header_message_box{
    .ant-tabs-nav .ant-tabs-tab{
        padding: 12px 4px;
    }
    .ant-dropdown-content{
        padding: 0;
    }
    @media (min-width:596px) {
        .tabs_box{
            width: 336px;
            border-radius: 0;
        }
       
           
    }
    .ant-tabs-bar{
        margin: 0;
    }
    @media(max-width: 596px){
        .ant-dropdown-menu{
            border-radius: 0;
        }
    }
    @media screen and (max-width: 480px){
        width: 100%!important; 
    }

    
    .message_list_box{
        //width: 336px;
        
        .message_list{
            padding: 12px 24px;
            border-bottom: 1px solid #f0f0f0;
            transition: all .3s;
            cursor: pointer;
            .ant-list-item{
                margin-bottom: 0;
            }
            &:hover{
                background: #e6f7ff;
            }
        }
        .ant-list-footer{
            padding: 0;
        }
        .list_footer{
            display: flex;
            height: 46px;
            width: 100%;
            .item{
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &:nth-child(2){
                    border-left: 1px solid #f0f0f0;
                }
            }
        }
    }
    
}
</style>
