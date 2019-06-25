import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import index from '@/components/index/index.vue'
import userlist from '@/components/userlist/userlist.vue'
import rolelist from '@/components/rolelist/rolelist.vue'
import roletree from '@/components/rolelist/roletree.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/',
    name: 'index',
    component: index,
    children: [{
      path: '/userlist',
      name: 'userlist',
      component: userlist
    }, {
      path: '/rolelist',
      name: 'rolelist',
      component: rolelist
    }, {
      path: '/roletree',
      name: 'roletree',
      component: roletree
    }]
  }]
})
