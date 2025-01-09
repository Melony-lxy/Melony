<template v-if="data">
	<view class="dynamic">
		<view class="dynamic-content">
			<view class="dynamic_ul">
				<view class="dynamic_li" @click="godetails(data)">
					<view class="li_text"  v-if="data">{{ data.title }}</view>
					<view class="li_content">
						<view class="content_left">
							<view class="content_icon" >
								<image
									:src="common.imgUrl(data.user.avatar_url)"
									mode="widthFix"
									class="content_img"
									v-if="data"
									@click.stop="gocenter(data.user.id)"
								></image>
								<span @click.stop="gocenter(data.user.id)">{{ data.user.nick }}</span>
							</view>
							<view class="content_text" >{{ data.instructions }}</view>
						</view>
						<view class="content_right">
							<image :src="common.imgUrl(data.file[0])" mode="widthFix" class="right_img"></image>
						</view>
					</view>
					<view class="commont">
						<view>{{ data.view_count }} 浏览 </view>
						<!-- <view class="full">·</view> -->
						<!-- <view>222 111评论</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {verifyLogin} from '@/plugin/api/index.js'
export default {
	name: 'dynamicInformation',
	props: {
		data: Object
	},
	data() {
		return {
			isLogin:true
		}
	},
	onShow() {
	},	
	mounted() {
	},
	methods: {
		godetails(item) {
			
			if(item.rediect_url){
				uni.navigateTo({
					url: "/pages/webview/webview?src=" + item.rediect_url
				})
			}else{
				uni.navigateTo({
					url: '/packgeA/case/caseDetails/caseDetails?id=' + item.id,
					animationType: 'slide-in-bottom',
					animationDuration: 300
				})
			}
			
			
		},
		gocenter(i) {
			if(this.isLogin){
				uni.navigateTo({
					url: '/packgeA/PersonalCenter/PersonalCenter?uid=' + i
				})
			}else{
				uni.showToast({
					icon: "none",
					title: '请登录',
					position: "bottom",
				});
				setTimeout((res) => {
					uni.reLaunch({
						url: "/packgeA/login/login",
					});
				}, 1000);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.content_img {
	border-radius: 50%;
	width: 40rpx;
	height: 40rpx;
	max-height:40rpx;
	margin-right: 8rpx;
}
.dynamic {
	// margin: 0px 22rpx;
	background: #fff;

	// padding: 0 20rpx;
}
.dynamic-content {
	// margin: 0px 22rpx;
	background: #fff;
	padding-left: 25rpx;
	padding-right: 25rpx;
}
.dynamic_ul {
	border-top: 1px solid #f6f6f6;
	padding-bottom: 32rpx;
	.li_text {
		width: 100%;
		padding-top: 20rpx;
		font-size: 34rpx;
		color: #111111;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		margin-bottom: 20rpx;
		-webkit-line-clamp: 2;
	}

	.li_content {
		display: flex;
		justify-content: space-between;
		width: 100%;
		.content_left {
			.content_icon {
				display: flex;
				align-items: center;
				color: #656565;
				font-size: 24rpx;
				margin-top: 2rpx;
				margin-bottom: 20rpx;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			}

			.content_text {
				width: 438rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				color: #474747;
				line-height: 42rpx;
				font-weight: 400;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}
	}

	.commont {
		display: flex;
		font-size: 24rpx;
		align-items: center;
		padding: 29rpx 0 0;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #9d9d9d;
		height: 36rpx;
		.full {
			font-size: 30rpx;
			margin: 0 10rpx;
		}
	}
}
.content_right {
	// margin-top: 16rpx;
	width: 186rpx;
	max-height: 144rpx;
	overflow: hidden;
	border-radius: 12rpx;
}

image.right_img {
	width: 100% !important;
}
</style>
