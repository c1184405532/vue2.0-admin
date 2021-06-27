<template>
    <div id="app">

        <!-- <transition  mode="out-in" :name="transitionName"> -->
            
            <!--如需使用当前方式缓存组件 组件内需配置name字段 详见listReveal/List 组件使用示例
                在缓存组件页面中必须配置 否则删除了keepAliveData中的数据之后 再次新添加的第一次无响应 依然会缓存
                beforeRouteLeave(to,from,next){
                    this.$nextTick(()=>{
                        next()
                    })
                },
                请在你的组件中使用 
                添加缓存组件
                window.vm.$emit('setKeepAliveData','homelistReveallist')
                删除缓存组件 
                window.vm.$emit('clearKeepAliveData','homelistReveallist')
            -->
            <keep-alive :include="keepAliveData">  
                <Spin wrapperClassName="globale_spin_box" size="large"  :spinning="spinningLoding" :tip="spinningTip">
                    <router-view />
                </Spin>
            </keep-alive>
        <!-- </transition>  -->
    </div>
</template>

<script>
import {Spin} from 'ant-design-vue'; 
export default {
    name: "app",
    components: {
        Spin,
    },
    data(){
        return {
            transitionName:'',
            keepAliveData:[],
            spinningLoding:false,
            spinningTip:'',
        }
    },
    
    mounted(){
        //用延时的原因是因为vue实例化在App创建之后 所以window.vm获取不到
        //使用异步把事件转换成宏任务到下一次事件队列之后执行 就获取到window.vm了
        setTimeout(()=>{
            //先off防止重复监听
            window.vm.$off('setKeepAliveData').$on('setKeepAliveData',(keepAliveName)=>{
                if(!this.keepAliveData.includes(keepAliveName)){       
                    this.keepAliveData.push(keepAliveName);
                    console.log('添加',this.keepAliveData)
                }       
            })
            window.vm.$off('clearKeepAliveData').$on('clearKeepAliveData',(keepAliveName)=>{
                let keepIndex = this.keepAliveData.indexOf(keepAliveName)
                if(keepIndex !== -1){
                    this.keepAliveData.splice(keepIndex,1)
                }
                console.log('清除',this.keepAliveData)
            })

            window.vm.$off('globaleSpinToggle').$on('globaleSpinToggle',(spinData)=>{
                this.spinningLoding = spinData ? spinData.type : false;
                this.spinningTip= spinData ? spinData.tip : '';
            })
        })
    },
    watch: {
        
        $route (to, from,next) {
            //console.log(this.$route.meta)
            if (to.meta.index > from.meta.index) {
                this.transitionName = 'slide-left'
            } else {
                this.transitionName = 'slide-right'
            } 
        }
    },
    
};

</script>

<style lang="less">
    #app{
        //overflow: auto;
    }
    //转场动画
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        // 启用硬件加速
        will-change: transform;
        transition: all 300ms;
        position: fixed;
        
    }
    .slide-right-enter {
        transform: translate(-100%, 0);
        transition-timing-function: ease-in;
    }
    .slide-left-enter {
        transform: translate(100%, 0);
        transition-timing-function: ease-in;
    }
    .globale_spin_box{
        height: 100%;
        width: 100%;
        .ant-spin-container{
            height: 100%;
            width: 100%;
        }
        .ant-spin-text{
            
            padding-top: 20px !important;
            font-size: 18px;
        }
    }
</style>
