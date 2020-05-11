<template>
	<div class="header_bar_box">
        <div class="left">
            dada
        </div>
        <div class="right">

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
                            :animated="true"
                            :tabBarStyle="{display:'flex',justifyContent: 'center',width:'336px'}"
                        >
                            <a-tab-pane  
                                :key="index" 
                                v-for="(value,index) in tabsData"
                                :tab="value.title"
                                
                            >
                                <div @click="handClick(index)">5555</div>
                            </a-tab-pane>

                        </a-tabs>
                    </a-menu>
                </a-dropdown>
                
            </div>
            <a-dropdown overlayClassName="user_drop_box"  class="user_drop_box">
                <div class="user_content">   
                    <img :src="userData.avatar" alt="" class="user_avatar">
                    <div class="user_name">{{userData.name}}</div>
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
        }
    },
	data() {
		return {
            tabsData:[
                {title:'通知'},
                {title:'消息 (0)'},
                {title:'代办 (0)'},
            ]
        }
	},
	computed: {},
	created() {},
	mounted() {
       
    },
	watch: {
		
	},
	methods: {
        logout(){
            console.log('退出登录')
        },
        handClick(index){
            let title = "通知"
            if(index === 1){
                title = `消息 (${3})`;
            }else if(index === 2){
                title = `代办 (${4})`;
            }
            this.tabsData[index].title = title;
        }
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
<style lang="less">


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
}
</style>
