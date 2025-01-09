import req from "../http.js";
import storage from "../storage";

// 验证登录
export async function verifyLogin(data) {
  return req({
    url: "/user/verifyLogin",
    status: true,
	data
  });
}
// 微信定位
export async function wxConfig(data) {
  return req({
    url: "/shop/wx/wxConfig",
    data,
  });
}
// 确定公告
export async function confirmNotice(data) {
  return req({
    url: "/shop/common/confirmNotice",
    data,
  });
}

// 公告列表
export async function noticeList(data) {
  return req({
    url: "/shop/common/noticeList",
    data,
  });
}

// banner列表
export async function bannerList(data) {
  return req({
    url: "/shop/common/bannerList",
    data,
  });
}

// 用户详情
export async function userInfo() {
  return req({
    url: "/user/info",
  });
}
// 是否关注公众号
export async function subscribe() {
	return req({
		url: '/wx/subscribe',
	})
}
export async function getLatitude(data) {
	return req({
		url: '/sign_in/getLatitude',
		data
	})
}

export async function upLoadFile(filePath, url, fileName = '') {
	let s = storage.getStorageSync('token') || '';
	//返回promise 对象
	return new Promise((resolve, reject) => {
		let h = {
			'content-type': 'application/x-www-form-urlencoded',
			token: s
		};
		uni.uploadFile({
			url: url,
			filePath: filePath,
			header: h,
			name: 'file',
			formData: {
				name: 'file',
				fileName
			},
			success: function(res) {
				let data = JSON.parse(res.data);
				if (data.code == 0) {
					resolve(data.data);
				} else {
					uni.showToast({
						icon: "none",
						title: data.msg,
						position: "bottom",
					});
					reject(data.msg);
				}
			},
			fail: function(e) {
				reject(e);
			}
		});
	});
};