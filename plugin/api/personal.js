import req from "../http.js";
// 添加收货地址
export async function addOrEdit(data) {
  return req({
    url: "/shop/address/addOrEdit",
    data,
  });
}
// 地址列表
export async function getList(data) {
  return req({
    url: "/shop/address/getList",
    data,
  });
}
// 设置默认地址
export async function changeDefault(data) {
  return req({
    url: "/shop/address/changeDefault",
    data,
  });
}
// 删除地址
export async function remove(data) {
  return req({
    url: "/shop/address/delete",
    data,
  });
}
// 地址详情
export async function getDetail(data) {
  return req({
    url: "/shop/address/getDetail",
    data,
  });
}

// 优惠券列表
export async function couponList(data) {
	return req({
		url: '/shop/coupon/getList',
		data
	})
}

// 商城消息列表
export async function messageList(data) {
	return req({
		url: '/shop/message/getList',
		data
	})
}