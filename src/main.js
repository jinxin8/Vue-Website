// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import JinRu from './components/jinru'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import DetailMingPage from './pages/detail/mingxing'
import DetailErPage from './pages/detail/ershisi'
import DetailShuiPage from './pages/detail/shuide'
import DetailCongPage from './pages/detail/congcong'
import OrderListPage from './pages/orderList'

Vue.config.productionTip = false
// vue-resource将this.$http功能注入到了所有的组件里面
Vue.use(VueResource)
Vue.use(VueRouter)
/* eslint-disable no-new */
let router=new VueRouter({
	mode: 'history',
	routes: [
		// {
		// 	path: '/',
		// 	component: JinRu
		// },
		{
			path:'/layout',
			component:Layout,
			redirect:'/layout/index',
			children:[
				{
					path:'index',
					component:IndexPage
				},
				{
					path:'/layout/detail',
					component:DetailPage,
					//不想detail被访问，加redirect直接访问detail/mingxing
					redirect:'/layout/detail/mingxing',
					children:[
						{
							path:'mingxing',
							component:DetailMingPage
						},
						{
							path:'ershisi',
							component:DetailErPage
						},
						{
							path:'shuide',
							component:DetailShuiPage
						},
						{
							path:'congcong',
							component:DetailCongPage
						}
					]
				},
				{
					path:'/layout/orderList',
					component:OrderListPage
				}
			]
		}
	]
})
new Vue({
  el: '#app',
  router,
  template: '<JinRu/>',
  components: { JinRu }
})
