
import req from "../http.js";

// 申请发票
export async function addInvoice(data) {
	return req({
		url: '/shop/order/addInvoice',
		data
	})
}
// 快递列表
export async function expressList() {
	return req({
		url: '/shop/order/expressList',
	})
}
// 订单价格
export async function orderFee(data) {
	return req({
		url: '/shop/order/orderFee',
		data
	})
}
// 申请列表
export async function invoiceList(data) {
	return req({
		url: '/shop/order/invoiceList',
		data
	})
}
// 发票详情
export async function invoiceInfo(data) {
	return req({
		url: '/shop/order/invoiceInfo',
		data
	})
}

// 生成订单
export async function orderAdd(data) {
	return req({
		url: '/shop/order/add',
		data
	})
}
// 订单列表
export async function listJson(data) {
	return req({
		url: '/shop/order/listJson',
		data
	})
}
//取消订单
export async function cancel(data) {
	return req({
		url: '/shop/order/cancel',
		data
	})
}
//删除订单
export async function deletes(data) {
	return req({
		url: '/shop/order/deletes',
		data
	})
}
//评论
export async function addComment(data) {
	return req({
		url: '/shop/order/addComment',
		data
	})
}
//退款原因列表
export async function returnGoodsReason(data) {
	return req({
		url: '/shop/order/returnGoodsReason',
		data
	})
}
//取消退款
export async function cancelReturnGoods(data) {
	return req({
		url: '/shop/order/cancelReturnGoods',
		data
	})
}
//订单退货
export async function returnGoods(data) {
	return req({
		url: '/shop/order/returnGoods',
		data
	})
}
//订单退货详情
export async function returnGoodsInfo(data) {
	return req({
		url: '/shop/order/returnGoodsInfo',
		data
	})
}
//填写退货快递信息
export async function writeReturnGoods(data) {
	return req({
		url: '/shop/order/writeReturnGoods',
		data
	})
}
//售后列表
export async function afterSaleList(data) {
	return req({
		url: '/shop/order/afterSaleList',
		data
	})
}
//订单详情
export async function orderInfo(data) {
	return req({
		url: '/shop/order/info',
		data
	})
}
//确定收货
export async function confirmReceipt(data) {
	return req({
		url: '/shop/order/confirmReceipt',
		data
	})
}
//订单待处理数量
export async function orderCount(data) {
	return req({
		url: '/shop/order/orderCount',
		data
	})
}

//抵扣积分
export async function getIntegral() {
	return req({
		url: '/shop/order/getIntegral',
	})
}
//微信支付
export async function WxPayOrder(data) {
	return req({
		url: '/shop/wx_pay/order',
		data
	})
}
//支付宝支付
export async function AliPayOrder(data) {
	return req({
		url: '/shop/ali_pay/order',
		data
	})
}

//微信支付
export async function WxOrder(data) {
	return req({
		url: '/member/wxpay',
		data
	})
}
//支付宝支付
export async function AliOrder(data) {
	return req({
		url: '/member/alipay',
		data
	})
}

//领取优惠券
export async function receive(data) {
	return req({
		url: '/shop/coupon/receive',
		data
	})
}

//工作台订单支付
export async function stagingPayment(data) {
	return req({
		url: '/shop/order/stagingPayment',
		data
	})
}