import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    // 设置路由的名称，命名路由。
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login/index.vue')
  }
]

const router = new VueRouter({
  routes: routes
})

export default router
