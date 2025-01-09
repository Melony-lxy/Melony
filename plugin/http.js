import Vue from "vue";
import storage from "./storage";
export const base_url = "https://devclub.7mango.cn";//测试服
export const cdn_url = "https://cdn.7mango.cn";
Vue.prototype.$base_url = base_url;
let BASE_URL = base_url

// #ifdef H5
BASE_URL = process.env.NODE_ENV === "development" ? '/web' : base_url
// #endif

const axios = (data, resolve, reject) => {
	// 请求拦截器
	if (!data.url) {
		console.error("请设置请求地址");
	}
	let _data = {
		url: BASE_URL + '/index' + data.url,
		data: data.data,
		dataType: "json",
		// timeout: data.timeout ? data.timeout : 10000,
		method: data.method ? data.method : "post",
		success(res) {
			// 响应拦截器
			if (res.statusCode != 200) {
				// 失败响应拦截器
				uni.showToast({
					icon: "none",
					title: `${res.statusCode}服务器出现问题`,
					image: "/static/icon/err.png",
					position: "bottom",
				});
			} else if (res.data.code == 401 && !data.status) {
				uni.showToast({
					icon: "none",
					title: res.data.msg,
					position: "bottom",
				});
				if(res.data.msg === '无效机构'){
					storage.removeStorage("abbreviation")
				}
				storage.removeStorage("token")
				setTimeout((res) => {
					uni.reLaunch({
						url: "/packgeA/login/login",
					});
				}, 1000);
			} else if (res.data.code !== 0 && !data.status) {
				if(res.data.msg === '无效机构'){
					storage.removeStorage("abbreviation")
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
					position: "bottom",
				});
			}

			resolve(res.data);
		},
		fail(err) {
			console.log(err);
			// 失败响应拦截器
			uni.showToast({
				icon: "none",
				title: "404服务器出错",
				image: "/static/icon/err.png",
				position: "bottom",
			});
			reject(err);
		},
	};
	_data.header = {}
	// 设置token
	if (storage.getStorageSync("token")) {
		_data.header.token = storage.getStorageSync("token")
	}
	if (storage.getStorageSync("abbreviation")) {
		_data.header.abbreviation = storage.getStorageSync("abbreviation")
	}

	uni.request(_data);
};

function _AXIOS(data) {
	return new Promise(function(resolve, reject) {
		// console.log(data)
		axios(data, resolve, reject);
	});
}

Vue.prototype.$axios = _AXIOS;

export default _AXIOS;
