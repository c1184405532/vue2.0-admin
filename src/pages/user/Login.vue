<template>
    <div class="layout_padding login_box">
        
        <a-form layout="horizontal" :form="form" >
            <a-form-item >
                <a-input
                    v-decorator="[
                        'userAccount',
                        { rules: [{ required: true,message:userAccountMessage}] },
                    ]"
                    placeholder="请输入账号"
                >
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item >
                <a-input
                    v-decorator="[
                        'userPassword',
                        { rules: [{ required: true, message:userPasswordMessage}] },
                    ]"
                    type="password"
                    placeholder="请输入密码"
                >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="handSubmit">
                    Log in
                </a-button>
            </a-form-item>
        </a-form>
        
    </div>
</template>

<script>

import Axions from '@/request/Axios.js'
export default {
	components: {
    },
	props: {},
	data() {
		return {   
            form: this.$form.createForm(this, { name: 'horizontal_login' }),
            userAccountMessage:"请输入账号",
            userPasswordMessage:"请输入密码",
        }
	},
	computed: {},
	created() {},
	mounted() {
        this.$nextTick(()=>{
            this.form.setFieldsValue({
                userAccount:'admin',
                userPassword:'123456'
            })
        })
        //请求失败重连测试案例
        //this.getData()
        //this.$router.go(-1)
    },
	watch: {},
	methods: {
        getData(){
            Axions.get('api/randomRequest',{
                data:{name:'cyt'},
                custom:{
                    retryDelay:1000,
                    shouldRetry:true,
                    message:'请求失败，重连中...'
                }
            }).then((res)=>{
               
                console.log('随机数请求',res)
            },error=>{
                console.log('随机数错误',error)
            })
        },
       
        handSubmit(){
            
            this.form.validateFields('',{},(error,values)=>{
                // console.log(values)
                // console.log(error)
                if(error){
                    return
                }else{
                    Axions.post('api/login',{
                        data:{
                            userName:values.userAccount,
                            passWord:values.userPassword,
                        },
                        requestToastConfig:{
                            message:'正在登陆...'
                        },
                        
                    }).then((res)=>{
                        
                        if(res.success){
                            window.setToken(res.data.token)
                            window.setLocalStorage('routerIsBack',true)
                            this.$router.replace({
                                name:'layout/home',
                            })
                        }else if(res.message === '密码错误'){
                            this.form.setFields({
                                userAccount:{
                                    // errors:[{message: "密码错误，请重新输入",}]
                                },
                                userPassword:{
                                    errors:[{message: "密码错误，请重新输入",}]
                                }
                            })
                        }
                        console.log(res)
                    })
                }    
            })
            return
            
           
           
           
            
        }
    }
}
</script>

<style scoped lang="less">
.input_style{
    margin-top: 20px;
}
.login_box{
    width: 300px;
    margin: auto;
    margin-top: 160px;
}


</style>
