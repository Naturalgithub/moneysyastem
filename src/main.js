import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
// import Qs from 'qs'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor /* { default global options } */)

Vue.prototype.$axios = axios
// console.log(this)
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.baseURL = 'http://47.98.145.222:8080/'
axios.defaults.baseURL = 'http://192.168.2.156:8080/'

// 请求拦截器
// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // 配置请求头
//   config.headers.Authorization = localStorage.getItem('token')
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response.data
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })
// 尝试解决方法
// const config = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// }
// export default function (data, url) {
//   return axios.post(url, Qs.stringify(data), config).then((res) => {
//     return Promise.resolve(res)
//   })
// }

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
