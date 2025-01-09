<template>
	<view>
		<view class="personal">
			<view class="personal-content">
				<u-icon name="arrow-leftward" style="float: left;margin-top: 25rpx; font-size: 60rpx;"></u-icon>
				<view class="equipment" style="margin-left: 90rpx;">添加设备</view>
			</view>
			<view class="device-content">
				<view class="bindingDevice"></view>
				<view class="bindingDevice2" @click="BindingDevice3()">
					<view class="bindingDevice1-img"></view>
					<view class="bindingDevice1-content">
						<text class="BluetoothName"><strong>Mi Smart Band 5</strong></text>
						<br />
						<text class="SleepData">绑定后能查看运动，睡眠数据</text>
						<br />
						<text class="ConnectionStatus">
							<strong>设备已连接</strong>
							<span class="model">DA:8D:B7:7D:78:0E</span>
						</text>
					</view>
					<view class="bindingDevice1-Binding" style="color: #ff6638;">立即绑定</view>
				</view>
				<view class="xinghao">按型号添加</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'BindingDevice2',
	components: {},
	data() {
		return {}
	},
	mounted() {},
	methods: {
		BindingDevice3() {
			uni.navigateTo({
				url: '/packgeB/timetable/BindingDevice3'
			})
		}
	}
}
</script>

<style>
.device-content {
	width: 96%;
	height: auto;
	position: absolute;
	top: 190rpx;
	margin-left: 2%;
}
.personal {
	width: 100%;
	height: 230rpx;
	background: linear-gradient(180deg, #e6f7ff 0%, #f9f9f9 100%);
	border-radius: 0px 0px 0px 0px;
	opacity: 1;
	position: relative;
}
.personal-content {
	width: 400rpx;
	height: 150rpx;
	float: left;
	margin: 40rpx 32rpx;
}
.equipment {
	height: 105rpx;
	font-size: 55rpx;
	color: #2d2d2d;
	line-height: 105rpx;
}
.setUp img {
	width: 45rpx;
	height: 45rpx;
	float: right;
	margin: 70rpx 20rpx;
}
.bindingDevice {
	width: 100%;
	height: 100rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	box-shadow: 0px 6px 12px 1px rgba(0, 0, 0, 0.3);
	opacity: 1;
	background-color: #ffffff;
	margin-top: 30rpx;
	text-align: center;
	line-height: 50rpx;
	font-size: 24rpx;
	color: #979797;
}
.bindingDevice1 {
	width: 100%;
	height: 280rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	opacity: 1;
	line-height: 50rpx;
	font-size: 27rpx;
	color: #e6e6e6;
	background: #ffffff;
	box-shadow: 0px 6px 12px 1px rgba(0, 0, 0, 0.3);
	overflow: hidden;
}
.bindingDevice2 {
	width: 100%;
	height: 280rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	opacity: 1;
	line-height: 50rpx;
	font-size: 27rpx;
	color: #e6e6e6;
	background: #ffffff;
	box-shadow: 0px 6px 12px 1px rgba(0, 0, 0, 0.3);
	overflow: hidden;
	margin-top: 30rpx;
}
.xinghao {
	width: 100%;
	height: 100rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	opacity: 1;
	line-height: 100rpx;
	margin-top: 50rpx;
	font-size: 27rpx;
	background: gainsboro;
	background: #f0f0f0;
	text-align: center;
	font-size: 30rpx;
	color: #020202;
}
.bindingDevice1-img {
	width: 100rpx;
	height: 200rpx;
	margin-top: 40rpx;
	margin-left: 20rpx;
	float: left;
}
.bindingDevice1-content {
	width: 370rpx;
	height: 160rpx;
	line-height: 40rpx;
	margin-top: 67rpx;
	float: left;
}
.bindingDevice1-Binding {
	width: 150rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	color: #989898;
	margin-top: 100rpx;
	float: right;
	margin-right: 20rpx;
}
.bindingDevice1-Binding1 {
	width: 140rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	color: white;
	background-color: #ff6638;
	border-radius: 10rpx;
	margin-top: 100rpx;
	float: right;
	margin-right: 20rpx;
}
.BluetoothName {
	font-size: 32rpx;
	color: #020202;
}
.SleepData {
	font-size: 22rpx;
	color: #979797;
}
.ConnectionStatus {
	font-size: 25rpx;
	color: #020202;
}
.BluetoothName,
.SleepData,
.ConnectionStatus {
	display: inline-block;
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.ConnectionStatus1 {
	font-size: 25rpx;
	color: #979797;
}
.model {
	color: #979797;
	margin-left: 15rpx;
}
</style>
