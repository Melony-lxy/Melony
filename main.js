import Vue from 'vue'
import App from './App'
import './plugin/http.js'; // 全局注册请求
import './plugin/request_url.js'; // 全局注册请求接口统一管理
import './plugin/storage.js'; // 全局注册storage公共方法
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)

// #ifdef H5
// 禁止双指放大
document.documentElement.addEventListener('touchstart', function(event) {
	if (event.touches.length > 1) {
		event.preventDefault();
	}
}, false);
//禁止双击放大
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function(event) {
	var now = Date.now();
	if (now - lastTouchEnd <= 300) {
		event.preventDefault();
	}
	lastTouchEnd = now;
}, false);

// #endif
// // #ifdef H5
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)
// // 这个是为了兼容 m3u8
// const hls = require('videojs-contrib-hls')
// Vue.use(hls)
// // #endif

import nullData from './components/nullData'
Vue.component('nullData', nullData)
// 全局通用方法
import common from 'plugin/public.js';
Vue.prototype.common = common;
Vue.config.productionTip = false
import store from './store'
Vue.prototype.$store = store

App.mpType = 'app'
import uView from "uview-ui";
Vue.use(uView);
const app = new Vue({
	store,
	...App
})
app.$mount()
