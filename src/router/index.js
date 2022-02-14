import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function createRouter() {
	return new VueRouter({
		mode: 'history',
		routes: [
			{
				path: '/',
				component: () => import('@/views/Home.vue'),
			},
			{
				path: '/about',
				component: () => import('@/views/About.vue'),
			},
			{
				path: '/404',
				component: () => import('@/views/404.vue'),
			},
		],
	});
}
