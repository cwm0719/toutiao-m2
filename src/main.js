import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局的样式
import '@/styles/index.less'
// 第一步:安装 Vant;npm i vant@2 --legacy-peer-deps
// 第二步:在 main.js 中加载注册 Vant 组件
import Vant from 'vant'
import 'vant/lib/index.css'
// amfe-flexible插件设置根字体的大小;用于设置 rem 基准值
// 第一步安装npm i amfe-flexible -S --legacy-peer-deps
// 第二步在 main.js 中加载执行该模块
import 'amfe-flexible'
// 使用 postcss-pxtorem 将 px 转为 rem
// npm install postcss-pxtorem@5.1 -D --legacy-peer-deps

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
