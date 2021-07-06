
// 请求默认配置项
// const baseURL = "http://39.106.138.82:8000/";//测试服务器1
const baseURL = "http://192.168.100.89:8000/";// 柏强
// const baseURL =  "http://192.168.100.90:8000/";//兵哥
// const baseURL = "https://b.fbpic.cn/";//正式服务器
const timeOut = 5000;// 请求超时 单位毫秒
const baseClearToastTime = 2;// 单位秒
const defaultRequestToastConfig = {
  message: "加载中...",
  successMessage: "",
  startType: true,
  endType: false,
  errorType: true,
  addToken: true,
  networkErrorType: true

}
/**
 * 以下为请求重连配置
 */
const retry = 2;// 重连次数
const retryDelay = 1000;// 多久发起一次重连 单位毫秒
const shouldRetry = false;// 请求错误是否发起重连
const lastRetryUrl = "http://192.168.0.103:8888";// 备用地址 如果在你设置的重连次数已用完 还是没有成功获取数据，最后一次会用这个url进行请求，如果还是错误则失败
export {
  retry,
  baseURL,
  timeOut,
  retryDelay,
  shouldRetry,
  lastRetryUrl,
  baseClearToastTime,
  defaultRequestToastConfig
}
