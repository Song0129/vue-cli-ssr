import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';
// import './mixin/prefetching';

import baseUrl from '@/config/baseUrl'; //baseUrl配置
import Tools from '@/utils/tools'; //工具
import Interface from '@/config/interface'; // 接口路径配置文件
import axios from '@/axios/index'; //axios封装
import { REGEX, PROMPT } from '@/config/constants'; //提示语
// //引入ant-design-vue
import antComponents from '@/config/ant-design.config';

// // CSS部分
import '@/assets/css/antd.less'; //引入ant-design-vue css
import '@/assets/css/reset.css'; //清除默认样式

// //部分工具挂在在Vue原型
Vue.prototype.$Tools = Tools; //工具类
Vue.prototype.$Url = Interface; //接口地址
Vue.prototype.$axios = axios; //axios请求
Vue.prototype.$baseUrl = baseUrl; //基本路径
Vue.prototype.$CONST = { REGEX, PROMPT }; //常量定义

Vue.use(antComponents);
Vue.config.productionTip = true;

export function createApp() {
	const router = createRouter();
	const store = createStore();
	Vue.prototype.$store = store; //Vuex
	sync(store, router);

	const app = new Vue({
		router,
		store,
		render: h => h(App),
	});
	return { app, router, store };
}
