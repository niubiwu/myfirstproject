// 开发vue插件
// 先引用axios模块
import axios from 'axios'
var myaxios = {

}

myaxios.install = function (Vue) {

  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

  // 拦截器有两种：1.在请求之前拦截加一段代码2.在响应之后拦截加一段代码
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 判断一下是否在发送登录请求
    if (!config.url.includes('login')) {
      config.headers.Authorization = window.localStorage.getItem('token')
    }

    return config;
  })
  // vue实例挂载
  Vue.prototype.$http = axios
}

export default myaxios
