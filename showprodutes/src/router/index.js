import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import index from '@/components/index/index.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/',
    name: 'index',
    component: index
  }]
})
