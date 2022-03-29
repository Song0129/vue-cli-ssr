import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

export function createRouter() {
	return new VueRouter({
		mode: "history",
		routes: [
			{
				path: "/login",
				name: "login",
				meta: {
					title: "登录",
				},
				component: () => import(/* webpackChunkName: "login" */ "../views/Login/Login"),
			},
			{
				path: "/",
				redirect: "/index",
				name: "Home",
				component: Home,
				meta: {
					title: "Home",
					requireAuth: false,
					sideBar: true,
				},
				children: [
					{
						path: "/index",
						name: "index",
						meta: {
							title: "Index",
							requireAuth: false,
							sideBar: true,
						},
						component: () => import(/* webpackChunkName: "index" */ "../views/Index/Index"),
					},
					{
						path: "/form",
						name: "form",
						meta: {
							title: "Home",
							requireAuth: false,
							sideBar: true,
						},
						component: () => import(/* webpackChunkName: "form" */ "../views/Form/Form"),
					},
					{
						path: "/about",
						name: "about",
						meta: {
							title: "About",
							requireAuth: false,
							sideBar: true,
						},
						component: () => import(/* webpackChunkName: "about" */ "../views/About/About"),
					},
				],
			},
		],
	});
}
