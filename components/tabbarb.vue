<template>
	<view class="">
		<view class="tabbar">
			<view class="" @click="navigateTo('/pages/index/index')">
				<image src="../static/indexs.png" class="tabbarImg" v-if="choosed === 0"></image>
				<image src="../static/index.png" class="tabbarImg" v-else></image>
				<view class="tabbarText" :style="{color:choosed === 0 ? '#5785BC' : '#333'}">
					首页
				</view>
			</view>
			<view class="" @click="navigateTo('/pagesA/ShoppingMall/ShoppingMall')">
				<image src="@/static/icon/shopb.png" class="tabbarImg" v-if="choosed === 2"></image>
				<image src="@/static/icon/shoph.png" class="tabbarImg" v-else></image>
				<view class="tabbarText" :style="{color:choosed === 2 ? '#5785BC' : '#333'}">
					商城
				</view>
			</view>
			<view class="" @click="navigateTo('/pages/InHospital/InHospital')">
				<image src="@/static/icon/loveb.png" class="tabbarImg" v-if="choosed === 1"></image>
				<image src="@/static/icon/loveh.png" class="tabbarImg" v-else></image>
				<view class="tabbarText" :style="{color:choosed === 1 ? '#5785BC' : '#333'}">
					社区
				</view>
			</view>
			<view class="" @click="navigateTo('/pages/InHospital/InHospital')">
				<image src="@/static/icon/loveb.png" class="tabbarImg" v-if="choosed === 1"></image>
				<image src="@/static/icon/loveh.png" class="tabbarImg" v-else></image>
				<view class="tabbarText" :style="{color:choosed === 1 ? '#5785BC' : '#333'}">
					购物车
				</view>
			</view>
<!-- 			<view class="">
				<view class="tabbarImg">
					<image src="@/static/tabbar/add.png" class="add"></image>
				</view>
				<view class="tabbarText">
					商城
				</view>
			</view> -->

			<view class="" @click="navigateTo(type=='student'?'/pagesStudent/user/user':type=='teacher'?'/pagesTeacher/user/user':'')">
				<image src="../static/mys.png" class="tabbarImg" v-if="choosed === 1"></image>
				<image src="../static/my.png" class="tabbarImg" v-else></image>
				<view class="tabbarText" :style="{color:choosed === 1 ? '#5785BC' : '#333'}">个人中心</view>
			</view>
		</view>
		<view class="" style="width: 750rpx;height: 120rpx;"></view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		data:{
			choosed_index:0,
			type:""
		},
		props: {
			choosed: Number,
			type:String
		},
		methods: {
		navigateTo(url) {
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; // 当前页面
			let path = '/' + currPage.route
			if (url !== path) {
				uni.redirectTo ({
					url:url
				})
			}
		}
		},
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 750rpx;
		height: 100rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 30rpx 1rpx rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: space-around;
		// border-top-left-radius: 50rpx;
		// border-top-right-radius: 50rpx;
		z-index: 9999;

		>view {
			width: 25%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}

		.tabbarImg {
			margin-bottom: 12rpx;
			width: 34rpx;
			height: 34rpx;
			position: relative;

			.add {
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 93rpx;
				height: 93rpx;
			}
		}

		.tabbarText {
			line-height: 20rpx;
			font-size: 20rpx;
			font-weight: bold;
		}
	}
</style>