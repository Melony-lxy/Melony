<template>
	<view>
		<view class="personal">
			<view class="personal-content">
				<view class="equipment">设备</view>
				<view class="lookequipment" @click="BindingDevice1()">
					查看所有设备&nbsp;
					<u-icon color="#262626" size="26rpx" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="setUp"><img :src="common.imgUrl('/static/my/shezhi.png')" alt="" /></view>
			<view class="device-content">
				<view class="bindingDevice" @click="BindingDevice2()">
					<img :src="common.imgUrl('/static/images/img18.png')" alt="" style="opacity: 0.8;" />
					<br />
					绑定新设备
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'BindingDevice',
	components: {},
	data() {
		return {}
	},
	mounted() {},
	methods: {
		BindingDevice1() {
			uni.navigateTo({
				url: '/packgeB/timetable/BindingDevice1'
			})
		},
		BindingDevice2() {
			uni.navigateTo({
				url: '/packgeB/timetable/BindingDevice2'
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
	opacity: 1;
	position: relative;
}
.personal-content {
	width: 300rpx;
	height: 150rpx;
	float: left;
	margin: 40rpx 32rpx;
}
.equipment {
	height: 80rpx;
	font-size: 50rpx;
	color: #2d2d2d;
	line-height: 90rpx;
}
.lookequipment {
	font-size: 32rpx;
	color: #2d2d2d;
}
.setUp img {
	width: 45rpx;
	height: 45rpx;
	float: right;
	margin: 70rpx 20rpx;
}
.bindingDevice {
	width: 100%;
	height: 280rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	box-shadow: 0px 6px 12px 1px rgba(0, 0, 0, 0.3);
	opacity: 1;
	background-color: #ffffff;
	margin-top: 30rpx;
	text-align: center;
	line-height: 50rpx;
	font-size: 28rpx;
	color: #e6e6e6;
}
.bindingDevice img {
	width: 100rpx;
	height: 100rpx;
	margin-top: 60rpx;
	margin-left: 0rpx;
}
</style>
