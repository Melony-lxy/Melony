<template>
	<view>
		<view class="navBox">
			<view v-for="(item,index) in navList" :key='index' class="item" @click="navigateTo(item.path)">
				<view class="space-between u-f-ac">
					<image :src="common.imgUrl(item.imgUrl)" mode="" :style="{width:item.width,height:item.height}"></image>
					<text class="flex-shrink itemName">{{item.text}}</text>
					<image class="rightIcon" :src="common.imgUrl('/static/my/right.png')" mode=""></image>
				</view>
			</view>
		<!-- 	<view class="title" @click="open()">开启定向推送功能</view>
			<view class="title" @click="close()">关闭定向推送功能</view> -->
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				navList: [{
					imgUrl: '/static/setUp/icon4.png',
					text: '个人信息修改',
					width: '32rpx',
					height: '27rpx',
					path: '/packgeA/personalData/personalData'
				}, {
					imgUrl: '/static/my/score.png',
					text: '积分',
					width: '30rpx',
					height: '34rpx',
					path: '/packgeB/scorecenter/scorecenter'
				}, {
					imgUrl: '/static/setUp/icon1.png',
					text: '密码重置',
					width: '30rpx',
					height: '34rpx',
					path: '/packgeA/resetPassword/resetPassword'
				}, {
					imgUrl: '/static/setUp/icon2.png',
					text: '绑定手机号',
					width: '22rpx',
					height: '34rpx',
					path: '/packgeA/bindPhone/bindPhone'
				}, {
					imgUrl: '/static/setUp/icon6.png',
					text: '账号安全',
					width: '32rpx',
					height: '34rpx',
					path: '/packgeA/accountSecurity/accountSecurity'
				}, {
					imgUrl: '/static/setUp/icon8.png',
					text: '关于千芒商汇俱乐部',
					width: '32rpx',
					height: '32rpx',
					path: '/packgeB/UserAgreement/UserAgreement?name=关于千芒商汇俱乐部',
				}, {
					imgUrl: '/static/setUp/icon3.png',
					text: '退出',
					width: '32rpx',
					height: '32rpx',
					path: '/packgeA/login/login'
				}, ]
			}
		},
		methods: {
			open() {
				uni.showModal({
					title: '确认是否定向推送功能',
					success: function(res) {
						if (res.confirm) {
							setTimeout(()=>{
								uni.showToast({
									title:'已开启定向推送功能',
									icon:"none"
								})
							},500)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			close() {
				uni.showModal({
					title: '确认是否定向推送功能',
					success: function(res) {
						if (res.confirm) {
							setTimeout(()=>{
								uni.showToast({
									title:'已关闭定向推送功能',
									icon:"none"
								})
							},500)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			navigateTo(url) {
				if (url == '/packgeA/login/login') {
					// uni.removeStorageSync('token')
					uni.clearStorage()
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.title{
		// position: fixed;
		// bottom: 50rpx;
		width: 100%;
		height: 100rpx;
		border-radius: 100rpx;
		margin-top: 50rpx;
		line-height: 100rpx;
		background: rgb(255, 102, 56);
		color: white;
		text-align: center;
		font-size: 32rpx;
	} 
	.navBox {
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 20rpx;
		padding: 0 32rpx;

		.item {
			padding: 32rpx 0rpx 25rpx 0rpx;
			border-bottom: 1px solid #F1F1F1;

			.itemName {
				font-size: 28rpx;
				font-family: Source Han Sans SC;
				font-weight: bold;
				color: #666666;
				margin-left: 20rpx;
			}

			.rightIcon {
				width: 12rpx;
				height: 20rpx;
			}
		}
	}
</style>
