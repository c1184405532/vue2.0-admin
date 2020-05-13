<template>
	<div :class="!isMobile && collapsed?'sider_bar_box sider_bar_collapsed':'sider_bar_box'">
        <div :class="!isMobile &&  collapsed?'logo logo_collapsed':'logo'">
            <img class="logo_img" src="@/assets/admin_logo.jpg" alt="">
            <div class="text" v-show="isShowText()">Antd of Vue</div>
        </div>
		<a-menu
			
			:default-selected-keys="['1']"
			:default-open-keys="['sub1']"
			mode="inline"
            theme="dark"
			@click="handleClick"
            :inline-collapsed="isMobile?false:collapsed"
            
		>
			<a-sub-menu key="sub1" >
				<span slot="title">
					<a-icon type="mail" />
					<span>Navigation One</span>
				</span>
				<a-menu-item-group key="g1">
					<template slot="title">
						<a-icon type="qq" />
						<span>Item 1</span>
					</template>
					<a-menu-item key="1">Option 1</a-menu-item>
					<a-menu-item key="2">Option 2</a-menu-item>
				</a-menu-item-group>
				<a-menu-item-group key="g2" title="Item 2">
					<a-menu-item key="3">Option 3</a-menu-item>
					<a-menu-item key="4">Option 4</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="sub2" >
				<span slot="title">
					<a-icon type="appstore" />
					<span>Navigation Two</span>
				</span>
				<a-menu-item key="5">Option 5</a-menu-item>
				<a-menu-item key="6">Option 6</a-menu-item>
				<a-sub-menu key="sub3" title="Submenu">
					<a-menu-item key="7">Option 7</a-menu-item>
					<a-menu-item key="8">Option 8</a-menu-item>
				</a-sub-menu>
			</a-sub-menu>
			<a-sub-menu key="sub4">
				<span slot="title">
					<a-icon type="setting" />
					<span>Navigation Three</span>
				</span>
				<a-menu-item key="9">Option 9</a-menu-item>
				<a-menu-item key="10">Option 10</a-menu-item>
				<a-menu-item key="11">Option 11</a-menu-item>
				<a-menu-item key="12">Option 12</a-menu-item>
			</a-sub-menu>
		</a-menu>
	</div>
   
</template>

<script>
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
            current: ['mail'],
            openKeys: ['sub1'],
        }
	},
	computed: {},
	created() {},
	mounted() {},
	watch: {
		
	},
	methods: {
        handleClick(e) {
            console.log('click', e);
        },
        titleClick(e) {
            console.log('titleClick', e);
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
