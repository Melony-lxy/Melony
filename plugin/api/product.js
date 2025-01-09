import req from "../http.js";
// 商品列表
export async function listJson(data) {
	return req({
		url: "/shop/product/listJson",
		data,
	});
}
// 商品详情
export async function productInfo(data) {
	return req({
		url: "/shop/product/info",
		data,
	});
}
//评论列表
export async function commnentList(data) {
	return req({
		url: "/shop/product/commnentList",
		data,
	});
}
// 购物车列表
export async function getCartList(data) {
	return req({
		url: "/shop/cart/getList",
		data,
	});
}
// 分类列表
export async function categoryList(data) {
	return req({
		url: "/shop/product/categoryList",
		data,
	});
}
// 加入购物车
export async function addCart(data) {
	return req({
		url: "/shop/cart/addCart",
		data,
	});
}
// 购物车商品数量与选中状态更改
export async function changeCart(data) {
	return req({
		url: "/shop/cart/changeCart",
		data,
	});
}
// 购物车删除
export async function deleteCart(data) {
	return req({
		url: "/shop/cart/delete",
		data,
	});
}

// 加购列表
export async function additionalPurchaseList(data) {
	return req({
		url: "/shop/product/additionalPurchaseList",
		data,
	});
}

// 浏览记录
export async function browseList(data) {
	return req({
		url: '/shop/product/browseList',
		data
	})
}
