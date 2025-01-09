<template>
	<view>
		<view class="personal">
			<view class="personal-content">
				<view class="equipment">添加设备</view>
				<view class="device-img"></view>
				<view class="device-name">千芒商汇俱乐部手环1</view>
			</view>
		</view>
		<view class="connect">
			<text class="connect-content">连接中...</text>
			<u-icon name="checkmark" style="color: orange;"></u-icon>
		</view>
		<view class="verifySignature">
			<text class="connect-content">验证签名</text>
			<u-icon name="checkmark" style="color: orange;"></u-icon>
		</view>
		<view class="bindAccount">
			<text class="connect-content">绑定账号</text>
			<u-icon name="checkmark" style="color: orange;"></u-icon>
		</view>
		<view class="finishBinding">完成绑定</view>
	</view>
</template>

<script>
export default {
	name: 'BindingDevice3',
	components: {},
	data() {
		return {}
	},
	mounted() {},
	methods: {}
}
</script>

<style>
.personal {
	width: 100%;
	height: 630rpx;
	background: linear-gradient(180deg, #e6f7ff 0%, #f9f9f9 100%);
	opacity: 1;
}
.personal-content {
	width: 100%;
	height: 150rpx;
}
.equipment {
	height: 105rpx;
	font-size: 55rpx;
	color: #2d2d2d;
	line-height: 105rpx;
	margin-left: 20rpx;
}
.device-img {
	width: 20%;
	height: 330rpx;
	margin-top: 20rpx;
	margin-left: 250rpx;
	margin-left: 40%;
}
.device-name {
	width: 40%;
	height: 70rpx;
	margin-top: 20rpx;
	margin-left: 180rpx;
	text-align: center;
	line-height: 70rpx;
	font-size: 38rpx;
	color: #020202;
	font-weight: bold;
	margin-left: 30%;
}
.connect,
.verifySignature,
.bindAccount {
	width: 96%;
	margin-left: 2%;
	height: 100rpx;
	line-height: 100rpx;
	margin-top: 50rpx;
	display: flex;
	justify-content: space-between;
	font-size: 30rpx;
	color: #020202;
	font-weight: bold;
}
.finishBinding {
	width: 96%;
	margin-left: 2%;
	text-align: center;
	height: 100rpx;
	line-height: 100rpx;
	margin-top: 200rpx;
	background: #ff6c40;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	font-size: 30rpx;
	color: #ffffff;
}
</style>
