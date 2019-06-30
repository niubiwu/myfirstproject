import Vue from 'vue'
import Router from 'vue-router'
// 单独引用Message提示
import {
  Message
} from 'element-ui'
const login = () => import('@/components/login/login.vue')
const index = () => import('@/components/index/index.vue')
const userlist = () => import('@/components/userlist/userlist.vue')
const rolelist = () => import('@/components/rolelist/rolelist.vue')
const roletree = () => import('@/components/rolelist/roletree.vue')
const commoditylist = () => import('@/components/commodityList/commodityList.vue')
const addgoods = () => import('@/components/commodityList/addGoods.vue')
const sortlist = () => import('@/components/commodityList/sortlist.vue')
const orderlist = () => import('@/components/orderList/orderlist.vue')
const parameterlist = () => import('@/components/commodityList/parameterlist.vue')
const reports = () => import('@/components/reports/reports.vue')
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
      path: '/users',
      name: 'userlist',
      component: userlist
    }, {
      path: '/rights',
      name: 'rolelist',
      component: rolelist
    }, {
      path: '/roles',
      name: 'roletree',
      component: roletree
    }, {
      path: '/goods',
      name: 'commoditylist',
      component: commoditylist
    },
    {
      path: '/goods/addgoods',
      name: 'addgoods',
      component: addgoods
    },
    {
      path: '/categories',
      name: 'sortlist',
      component: sortlist
    }, {
      path: '/orders',
      name: 'orders',
      component: orderlist
    },
    {
      path: '/params',
      name: 'params',
      component: parameterlist
    },
    {
      path: '/reports',
      name: 'reports',
      component: reports
    }
    ]
  }]
})
// 全局路由守卫匹配使用登录令牌
router.beforeEach((to, from, next) => {
  // 判断是否是跳转到登录页面，不是到登录页面需要验证token
  // to是个跳转的路由对像
  const token = window.localStorage.getItem('token')
  if (to.name !== 'login') {
    // 验证是否登录登录，没有登录就回到登陆界面
    if (!token) {
      router.push('/login')
      Message({
        message: '请您先登录',
        type: 'warning'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
