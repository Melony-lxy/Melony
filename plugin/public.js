import Clipboard from 'clipboard'
import {
	cdn_url
} from "./http";
export default {
	// toast 提示
	toast(text, duration) {
		uni.showToast({
			title: text,
			icon: "none",
			position: "bottom",
			duration: duration || 2000,
		});
	},
	// 加载动画
	loading(text) {
		uni.showLoading({
			title: text || "加载中",
			mask: true,
		});
	},
	// 富文本图片格式
	content(res) {
		let html;
		if (res) {
			html = res.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
		}
		return html;
	},
	imgUrl(e) {
		if (!e) {
			return "";
		} else if (e.substring(0, 4) != "http") {
			return cdn_url + e;
		} else {
			return e;
		}
	},
	getNumber(number) {
		if (number >= 10) {
			return number
		} else {
			return '0' + number
		}
	},
	// 预览图片
	previewImage(data, index) {
		var dataUrl = []
		data.forEach(item => {
			dataUrl.push(cdn_url + data)
		})
		uni.previewImage({
			current: index === undefined ? data[0] : index,
			urls: dataUrl,
		});
	},
	// 模态框
	modal(data) {
		return new Promise((resolve, reject) => {
			// resolve(res) 抛出成功  reject(err)抛出失败  【抛出时可传递参数】
			uni.showModal({
				...data,
				success: function(res) {
					if (res.confirm) {
						resolve();
					}
				},
			});
		});
	},
	getUrlParam(name) {
		var sURL = window.document.URL.toString();
		var value = '';
		if (sURL.indexOf("?") > 0) {
			var arrParams = sURL.split("?");
			var arrURLParams = arrParams[1].split("&");
			for (var i = 0; i < arrURLParams.length; i++) {
				var sParam = arrURLParams[i].split("=");
				if (sParam) {
					if (sParam[0] == name) {
						if (sParam.length > 0) {
							value = sParam[1].trim();
						}
					}
				}
			}
		}
		return value;
	},
	// 支付
	payment(data) {
		let that = this;
		return new Promise((resolve, reject) => {
			// #ifdef MP-WEIXIN
			// resolve(res) 抛出成功  reject(err)抛出失败  【抛出时可传递参数】
			wx.requestPayment({
				timeStamp: data.timeStamp,
				nonceStr: data.nonceStr,
				package: data.package,
				signType: data.signType,
				paySign: data.paySign,
				success(res) {
					resolve({
						code: 0,
						data: res,
					});
				},
				fail(err) {
					that.toast("支付失败");
					reject(err);
				},
			});
			// #endif
			// #ifdef H5
			const wx = require("jweixin-module");
			let [appId, timestamp, nonceStr, signature, packages, paySign] = [
				data.appId,
				data.timeStamp,
				data.nonceStr,
				data.signature,
				data.package,
				data.paySign,
			];
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId, // 必填，公众号的唯一标识
				timestamp, // 必填，生成签名的时间戳
				nonceStr, // 必填，生成签名的随机串
				signature, // 必填，签名，见附录1
				jsApiList: ["chooseWXPay"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function() {
				wx.chooseWXPay({
					timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr, // 支付签名随机串，不长于 32 位
					package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
					signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign, // 支付签名
					success(res) {
						// 支付成功后的回调函数
						resolve({
							code: 0,
							data: res,
						});
					},
					fail(res) {
						reject(res);
					},
				});
			});
			wx.error(function(res) {
				reject(res);
				console.log(res);
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				/*alert("config信息验证失败");*/
			});
			// #endif
		});
	},
	oauthLogin() {
		return new Promise((s, j) => {
			// #ifdef H5
			window.location.href =
				"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx522d1b9660c6b420&redirect_uri=" +
				encodeURIComponent(window.location.href) +
				"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect";
			// #endif
			// #ifdef MP-WEIXIN
			uni.getProvider({
				service: "oauth",
				success: function(res) {
					console.log(res);
					if (~res.provider.indexOf("weixin")) {
						uni.getUserProfile({
							desc: "获取你的昵称、头像、地区及性别",
							success: (info) => {
								console.log(info, "1");
								uni.login({
									provider: "weixin",
									success: (res) => {
										console.log(res);
										//这里请求接口
										return s({
											userInfo: info.userInfo,
											jsCode: res.code,
										});
									},
									fail: (res) => {
										console.log(res);
										return j("微信登录授权失败");
									},
								});
							},
							fail: (res) => {
								console.log(res, "1");
								return j("微信登录授权失败");
							},
						});
					} else {
						console.log(res, "1");
						return j("微信登录授权失败");
					}
				},
			});
			// #endif
			// #ifdef APP
			uni.getProvider({
				service: "oauth",
				success: function(res) {
					let Isweixin = false
					for (var i = 0; i < res.provider.length; i++) {
						if (res.provider[i] == "weixin") {
							Isweixin = true
						}
					}
					if (Isweixin) {
						// uni.showToast({
						// 	title: 'APP1'
						// })
						uni.login({
							provider: "weixin",
							success: (res) => {
								uni.getUserInfo({
									provider: "weixin",
									success: (info) => {
										// uni.showModal({
										// 	content: JSON.stringify(
										// 		info)
										// })
										// 这里请求接口
										return s({
											userInfo: info.userInfo,
										});
									},
									fail: (res) => {
										console.log(res, "1");
										return j("微信登录授权失败");
									},
								});
							},
							fail: (res) => {
								console.log(JSON.stringify(res));
								// uni.showModal({
								// 	content: JSON.stringify(res)
								// })
								return j("微信登录授权失败");
							}
						});
					} else {
						console.log(222);
						console.log(res, "1");
						return j("微信登录授权失败");
					}
				},
			});
			// #endif
		});
	},
	// 打开文件
	openFile(url) {
		let that = this;
		that.loading("正在下载文件");
		uni.downloadFile({
			url: url, //仅为示例，并非真实的资源
			success: (res) => {
				console.log(res);
				if (res.statusCode === 200) {
					setTimeout(() => {
						uni.openDocument({
							filePath: res.tempFilePath,
							success: (data) => {
								that.toast("打开成功");
								uni.hideLoading();
							},
							fial: (err) => {
								that.toast("打开文件失败");
								uni.hideLoading();
							},
						});
					}, 500);
				} else {
					that.toast("文件缓存失败");
					uni.hideLoading();
				}
			},
			fial: (err) => {
				that.toast("文件缓存失败");
				uni.hideLoading();
			},
		});
	},
	// 课程类型
	courseType(index) {
		const courseTypeList = ["1v1", "班课", "试听", "视频课"];
		return courseTypeList[index];
	},
	//时间过滤
	timeFilter(value) {
		const time = value.substring(-3);
		return time;
	},
	// H5 分享
	// hShare(s) {
	// 	console.log(s)
	// 	const jweixin = require("jweixin-module");
	// 	jweixin.config({
	// 		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	// 		appId: s.appId, // 必填，公众号的唯一标识
	// 		timestamp: s.timestamp, // 必填，生成签名的时间戳
	// 		nonceStr: s.nonceStr, // 必填，生成签名的随机串
	// 		signature: s.signature, // 必填，签名
	// 		jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
	// 	});
	// 	jweixin.ready(function() {
	// 		//获取“分享给朋友”
	// 		jweixin.updateAppMessageShareData({
	// 			title: s.title, // 分享标题
	// 			desc: s.description, // 分享描述
	// 			link: s.link, // 分享链接
	// 			imgUrl: s.pic, // 分享图标
	// 			success: function() {
	// 			}
	// 		})
	// 		//获取“分享到朋友圈
	// 		jweixin.updateTimelineShareData({
	// 			title: s.title, // 分享标题
	// 			desc: s.description, // 分享描述
	// 			link: s.link, // 分享链接
	// 			imgUrl: s.pic, // 分享图标
	// 			success: function() {
	// 			}
	// 		})
	// 	})
	// },
	// h5复制
	handleClipboard(text, event, onSuccess, onError) {
		event = event || {}
		const clipboard = new Clipboard(event.target, {
			text: () => text
		})
		clipboard.on('success', () => {
			onSuccess()
			clipboard.off('error')
			clipboard.off('success')
			clipboard.destroy()
		})
		clipboard.on('error', () => {
			onError()
			clipboard.off('error')
			clipboard.off('success')
			clipboard.destroy()
		})
		clipboard.onClick(event)
	},
	base64_decode(data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			dec = "",
			tmp_arr = [];
		if (!data) {
			return data;
		}
		data += '';
		do { // unpack four hexets into three octets using index points in b64
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));
			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;
			if (h3 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1);
			} else if (h4 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
				tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
		} while (i < data.length);
		dec = tmp_arr.join('');
		return dec;
	}
};
