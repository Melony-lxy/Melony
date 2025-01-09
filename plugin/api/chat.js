import req from "../http.js";

//消息列表
export async function getList(data) {
	return req({
		url: '/shop/chat/getList',
		data
	})
}
// 开启人工聊天
export async function adddArtificial() {
	return req({
		url: '/shop/chat/adddArtificial',
	})
}
//关闭人工聊天
export async function endArtificial() {
	return req({
		url: '/shop/chat/endArtificial',
	})
}
//人工回复消息列表
export async function getAcceptList(data) {
	return req({
		url: '/shop/chat/getAcceptList',
		data,
	})
}
//发送消息
export async function sendMsg(data) {
	return req({
		url: '/shop/chat/sendMsg',
		data,
	})
}

export async function serviceInfo(data) {
	return req({
		url: '/shop/chat/serviceInfo',
		data,
	})
}