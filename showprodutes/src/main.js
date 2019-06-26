// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import myaxios from './assets/js/myaxios'
// 导入element-ui模块
import ElementUI from 'element-ui'
// 导入index.css样式文件
import './assets/css/index.css'
// 导入element.css文件
import 'element-ui/lib/theme-chalk/index.css'
//引入element-tree-grid插件
import ElTreeGrid from 'element-tree-grid';

// 使用element-ui
Vue.use(ElementUI)
// 使用插件
Vue.use(myaxios)
// 注册全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid);
/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
