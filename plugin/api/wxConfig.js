import {
	wxConfig,
} from "@/plugin/api/index.js";
const wx = require('jweixin-module');
const wxInit = () => {
	wxConfig({
		url: window.location.href,
	}).then((res) => {
		let [appId, timestamp, nonceStr, signature] = [
			res.data.appId,
			res.data.timeStamp,
			res.data.nonceStr,
			res.data.signature,
		];
		wx.config({
			debug: false, //开启debug模式.正式环境设置为false,测试环境设置为true
			appId,
			timestamp,
			nonceStr,
			signature,
			jsApiList: [
				"updateAppMessageShareData", 
				"updateTimelineShareData",
				"getLocation", 
				"openLocation",
				"onMenuShareAppMessage", //旧的接口，即将废弃
				"onMenuShareTimeline" //旧的接口，即将废弃
			], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	}).catch(err => {})
}
export default wxInit;
