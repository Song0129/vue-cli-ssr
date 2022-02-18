import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export function createRouter() {
	return new VueRouter({
		mode: 'history',
		routes: [
			{
				path: '/login',
				name: 'login',
				meta: {
					title: '登录',
				},
				component: () => import(/* webpackChunkName: "login" */ '../views/Login/Login'),
			},
			{
				path: '/',
				redirect: '/form',
				name: 'Home',
				component: Home,
				meta: {
					title: 'Home',
					requireAuth: false,
					sideBar: true,
				},
				children: [
					{
						path: '/form',
						name: 'form',
						meta: {
							title: 'Home',
							requireAuth: false,
							sideBar: true,
						},
						component: () => import(/* webpackChunkName: "form" */ '../views/Form/Form'),
					},
				],
			},
		],
	});
}
