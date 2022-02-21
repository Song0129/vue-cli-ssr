/**
 * axios封装
 *
 * 根据环境配置获取获取域名
 * 自定义header字段
 * 配置拦截器 添加默认传参
 *
 */

import axios from 'axios';
import qs from 'qs';
import baseUrl from '@/config/baseUrl';

//自定义axios实例
let http = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
	timeout: 6000,
	maxContentLength: 5000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', //数据被编码为名称/值对
	},
});

//请求拦截器
http.interceptors.request.use(
	config => {
		if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
			// 序列化
			config.data = qs.stringify(config.data);
		}
		return config;
	},
	error => {
		console.log(error);
	}
);

//响应拦截器
http.interceptors.response.use(
	response => {
		// console.log(response)
		return response;
	},
	error => {
		console.log(error);
	}
);

function apiAxios(method, url, params) {
	// 请求时默认增加token参数
	// let token = localStorage.getItem('token');
	// if (token) {
	// 	let obj = { token };
	// 	Object.assign(params, obj);
	// }
	return new Promise((resolve, reject) => {
		http({
			method: method,
			url: url,
			data: method === 'POST' || method === 'PUT' ? params : null,
			params: method === 'GET' || method === 'DELETE' ? params : null,
		})
			.then(res => {
				//  res.status http 状态码
				// console.log(res);
				if (res.status == 200) {
					resolve(res.data);
				} else {
					resolve(res);
				}
			})
			.catch(err => {
				reject(err);
			});
	});
}

export default {
	get: function (url, params) {
		return apiAxios('GET', url, params);
	},
	post: function (url, params) {
		return apiAxios('POST', url, params);
	},
	put: function (url, params) {
		params._method = 'put';
		return apiAxios('PUT', url, params);
	},
	delete: function (url, params) {
		params._method = 'delete';
		return apiAxios('DELETE', url, params);
	},
};
