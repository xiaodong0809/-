
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    axios.defaults.baseURL='http://3.112.132.86:8888/api/private/v1/'
    // 4. 添加实例方法
    Vue.prototype.$http = axios 
}
//添加请求拦截器
axios.interceptors.request.use(function (config) {
    if(config.url !=='login'){
        const AUTH_TOKEN = localStorage.getItem('token')
       config.headers.common['Authorization'] = AUTH_TOKEN
    }
    return config;
},function(error) {
    return Promise.reject(error)
})
export default MyHttpServer