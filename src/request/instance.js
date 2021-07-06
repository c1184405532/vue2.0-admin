import axions from "axios";
import { message } from "ant-design-vue";
import { baseURL, timeOut, baseClearToastTime } from "./config";

const instance = axions.create({
  baseURL: baseURL,
  timeout: timeOut
})

instance.interceptors.request.use(function(config) {
  const { toastConfig } = instance;
  // 在发送请求之前做些什么
  const token = window.getToken();
  if (token && toastConfig.addToken) {
    config.headers.Authorization = token;
  }
  if (toastConfig.startType) {
    window.vm.$emit("globalSpinToggle", {
      type: true, tip: config.toastmessage || instance.toastConfig.message
    })
  }
  return config;
}, function(error) {
  // 对请求错误做些什么
  // console.log(error)
  return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function(response) {
  // 清除响应前的Spin
  window.vm.$emit("globalSpinToggle", { type: false });

  const { toastConfig } = instance;
  if (toastConfig.endType && response.statusCode === 200) {
    message.success({
      content: toastConfig.successMessage || response.data.message
      // duration:baseClearToastTime,
      // loadingType: 'spinner'
    });
  }
  const errorType = response.statusCode === 200 || response.status === 200;
  if (toastConfig.errorType && !errorType) {
    message.error({
      content: response.data.message,
      duration: baseClearToastTime
    });
  }
  // console.log('response',response)
  // console.log('instance',instance.toastConfig)
  return response.data;
}, function(error) {
  // 对响应错误做点什么
  console.dir(error)
  const config = error.config;
  const { toastConfig } = instance;
  window.vm.$emit("globalSpinToggle", { type: false });

  if (config && config.custom.shouldRetry && config.custom.retry) {
    if (config.custom.retry === 1 && config.custom.lastRetryUrl) {
      config.baseUrl = config.custom.lastRetryUrl
    }
    config.custom.retry -= 1;
    config.toastmessage = config.custom.message
    // return instance.request(config)
    const backoff = new Promise(function(resolve) {
      setTimeout(() => {
        resolve()
      }, config.custom.retryDelay || 16)
    })

    return backoff.then(() => {
      return instance.request(config)
    })
  } else {
    const { response: { data } = {}, message: failMessage } = error;
    if (data && data.code === 401) {
      message.error({
        content: "登录信息已过期。请重新登录！",
        duration: 3
      });
      window.removeToken();
      setTimeout(() => {
        window.vm.$router.push({ name: "user/login" })
      }, 500);
    } else {
      message.error({
        content: (data && data.message) || failMessage,
        duration: toastConfig.clearToastTime || baseClearToastTime
      });
    }
    return errorFn(error);
  }
});
function errorFn(error) {
  const { response: { data } } = error;
  return Promise.reject(data || error.response);
}
export default instance;
