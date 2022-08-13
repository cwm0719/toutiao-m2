// - 方式一（简单方便，但是不利于接口维护）：
// 我们可以把请求对象挂载到 Vue.prototype 原型对象中，
// 然后在组件中通过 this.xxx 直接访问
// - 方式二（推荐）：我们把每一个请求都封装成每个独立的功能函数，
// 在需要的时候加载调用，这种做法更便于接口的管理和维护

/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/'
})

export default request
