import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import index from '@/components/index/index.vue'
import userlist from '@/components/userlist/userlist.vue'
import rolelist from '@/components/rolelist/rolelist.vue'
import roletree from '@/components/rolelist/roletree.vue'
import commoditylist from "@/components/commodityList/commodityList.vue";
import addgoods from "@/components/commodityList/addGoods.vue";
Vue.use(Router)

let router = new Router({
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
    }, {
      path: '/commoditylist',
      name: 'commoditylist',
      component: commoditylist
    }, {
      path: '/commoditylist/addgoods',
      name: 'addgoods',
      component: addgoods
    }]
  }]
})
// 全局路由守卫匹配使用登录令牌
router.beforeEach((to, from, next) => {
  //判断是否是跳转到登录页面，不是到登录页面需要验证token
  //to是个跳转的路由对像
  if (to.name !== 'login') {
    // 验证是否登录登录，没有登录就回到登陆界面
    var token = window.localStorage.getItem('token')

    if (!token) {
      router.push({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
