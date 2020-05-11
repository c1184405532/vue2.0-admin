import axions from 'axios';
import {  message } from 'ant-design-vue';
const baseClearToastTime = 1600;
const baseURL = 'http://192.168.0.101:9999';
//const baseURL = 'http://192.168.8.38:9999';
const instance = axions.create({
    //baseURL:'https://api.github.com/users',//basePort + baseURL,
    baseURL:baseURL,
    timeout:2000,
})


instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = window.getToken() 
    //const token = 888
    if(token){
        config.headers['X-Access-Token'] = token;
    }
    //console.log('在发送请求之前做些什么',config)
    if(instance.toastConfig.beforeRequestToastType){
        message.info({
            content: config.toastmessage || instance.toastConfig.message,
            //duration:1000,
            //loadingType: 'spinner'
        });
    }
    console.log(config)
    return config;
}, function (error) {
    //对请求错误做些什么
    //console.log(error)
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    //对响应数据做点什么
 
    if(instance.toastConfig.successRequestToastType && response.data.status === 200){
        message.success({
            content: response.data.message,
            //duration:baseClearToastTime,
            //loadingType: 'spinner'
        });
        
    }
    if(instance.toastConfig.errorRequestToastType && response.data.status !== 200){
        message.error({
            content: response.data.message, 
            //duration:baseClearToastTime,
            //loadingType: 'spinner'
        });
       
    }
    //console.log('response',response)
    //console.log('instance',instance.toastConfig)
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    console.dir(error)
    const config = error.config;
    //console.log(config)
    //是否配置请求错误重连
    if(config && config.shouldRetry && config.retry || (config.retry && error.code === "ECONNABORTED")){
        if(config.retry === 1 && config.lastRetryUrl){
            config.baseURL = config.lastRetryUrl
        }
        config.retry -= 1;
        config.toastmessage = config.message
        if(error.code === "ECONNABORTED"){
            config.toastmessage = '请求超时，重连中......'
        }
        const backoff = new Promise(function(resolve){
            setTimeout(()=>{
                resolve()
            },config.retryDelay || 16)
        })
        return backoff.then(()=>{
            return instance(config)
        })
        
    }else{
        if(error.response){
            message.error({
                content: error.response.data.message,
                //duration:baseClearToastTime,
                //loadingType: 'spinner'
            });
           
            let status = error.response.status;
            setTimeout(()=>{
                switch(status){
                    case 500:
                        window.vm.$router.push({
                            name:'user/login'
                        })
                        window.removeLocalStorage('routerIsBack')
                        
                    break;
                }
            },1000)
            
        }else{
            message.error({
                content: error.message,
                //duration:baseClearToastTime,
                //loadingType: 'spinner'
            });
        }
        return Promise.reject(error);
    }
});
export default instance;