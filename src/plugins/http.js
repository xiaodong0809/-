
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    axios.defaults.baseURL='http://3.112.132.86:8888/api/private/v1/'
    // 4. 添加实例方法
    Vue.prototype.$http = axios 
}
export default MyHttpServer