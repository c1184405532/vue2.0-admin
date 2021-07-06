import request from "./instance";
import { retry, retryDelay, shouldRetry, lastRetryUrl, defaultRequestToastConfig, timeOut } from "./config";
/**
 * @description: 使用描述
 * @param { String } url 请求地址
 * @param { Object } 请求数据和一些配置，data数据源，loadingConfig加载中配置
 * @param {
 *  data:{},
 *  loadingConfig:{
 *    message: String | "请求时loading显示文字，默认加载中" ,
 *    successMessage: String | "请求成功后toast提示文字，默认加载完成",
 *    start: Boolean | "是否显示请求时loading，默认false",
 *    end: Boolean | "是否显示请求成功后loading，默认false",
 *  }
 * }
 * 使用方式：Request.get("xx/getList",{ data:{ name:"chen" },loadingConfig:{ message:"xx",successMessage:"成功",start:true,end:true } })
 */

const Request = {}
Request.get = (url, data) => {
  // console.log('url',url)
  initAxiosConfig(data.requestToastConfig)
  return request.get(url, {
    params: data.data,
    header: data.header ? data.header : {},
    dataType: data.dataType ? data.dataType : "json",
    custom: {
      ...initDefaults(data.custom)
    },
    responseType: data.responseType || "text"
  })
}
Request.post = (url, data) => {
  const payLoad = data.data;
  for (const key in payLoad) {
    try {
      if (typeof payLoad[key] === "string") {
        payLoad[key] = payLoad[key].trim();
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  initAxiosConfig(data.requestToastConfig)
  // console.log('axios',axios)
  return request.post(url,
    payLoad,
    {
      params: data.params,
      timeout: data.timeOut || timeOut,
      custom: {
        ...initDefaults(data.custom)
      }
    }

  )
}
Request.put = (url, data) => {
  initAxiosConfig(data.requestToastConfig)
  // console.log('axios',axios)
  return request.put(url,
    data.data,
    {
      params: data.params,
      custom: {
        ...initDefaults(data.custom)
      }
    }

  )
}
Request.delete = (url, data) => {
  initAxiosConfig(data.requestToastConfig)
  return request.delete(url,
    data.data,
    {
      params: data.params,
      custom: {
        ...initDefaults(data.custom)
      }
    }

  )
}
function initAxiosConfig(requestToastConfig) {
  request.toastConfig = Object.assign({ ...defaultRequestToastConfig }, requestToastConfig || {})
}
// 初始化自定义配置
function initDefaults(custom) {
  const defaultOpations = {
    // 报错重发请求次数
    retry,
    // 重试间隔多久去发送请求
    retryDelay,
    // 重试的条件判断
    shouldRetry,
    // 请求重试最后一次url 在有多个备用链接时可配置
    lastRetryUrl
  }
  Object.assign(defaultOpations, custom)
  return defaultOpations
}
export default Request;
