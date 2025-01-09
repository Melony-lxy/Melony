<template>
	<view class="dynamic">
		<view class="dynamic-content">
			<view class="dynamic_ul">
				<view class="dynamic_li">
					<view class="li_text" @click="details()">{{ data.title }}</view>
					<view class="li_content">
						<view class="content_left">
							<view class="content_icon" @click="gocenter()">
								<image :src="common.imgUrl(data.user.avatar_url)" mode="widthFix"></image>
								{{ data.user.nick }}
							</view>
							<view class="content_picture" v-if="data.type == 0" @click="details()">
								<image
									:src="common.imgUrl(data.file[0])"
									mode="widthFix"
									v-if="data.file.length == 1"
									class="pic_one"
								></image>
								<view v-else class="pic_more">
									<image :src="common.imgUrl(data.file[0])" mode="aspectFill" class="pic_more_one"></image>
									<image :src="common.imgUrl(data.file[1])" mode="aspectFill" class="pic_more_two">
										<span class="pic-class" v-if="data.file.length != 2">
											+{{ data.file.length - 2 }}张图片
										</span>
									</image>
								</view>
								<!-- 							<image :src="common.imgUrl('/static/images/scenery.png')" mode=""></image>
							<image :src="common.imgUrl('/static/images/scenery.png')" mode=""></image> -->
							</view>
						</view>
					</view>
					<view v-if="data.type == 2" class="video-cell" @click="details()">
						<view class="showvideotitle">
							<image
								:src="common.imgUrl(data.video_url)+'?x-oss-process=video/snapshot,t_0,f_jpg'"
								class="showvideo"
								mode="widthFix"
							></image>
						</view>
						<image
							:src="common.imgUrl('/static/images/videoplay.png')"
							mode="widthFix"
							class="showPlay"
						></image>
					</view>
					<view class="commont">
						<view>{{ data.view_count }} 浏览</view>
						<!-- <view class="full">·</view>
						<view>222评论</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {verifyLogin} from '@/plugin/api/index.js'
export default {
	name: 'dynamicpicture',
	props: {
		data: Object
	},
	data() {
		return {
			isLogin:false
		}
	},
	mounted() {
		verifyLogin().then(res => {
			if (res.code == 0) {
				this.isLogin = true
			}else{
				this.isLogin = false
			}
		})
	},	
	methods: {
		gocenter() {
			if(this.isLogin){
				uni.navigateTo({
					url: '/packgeA/PersonalCenter/PersonalCenter?uid=' + this.data.user.id
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
		},
		// 卡片跳转详情
		details() {
			if (this.data.type == 0) {
				uni.navigateTo({
					url: '/packgeA/case/caseDetails/caseDetails?id=' + this.data.id
				})
			} else if (this.data.type == 2) {
				uni.navigateTo({
					url: '/packgeA/case/videoplay?id=' + this.data.id
				})
			}
		}
		// deletePlay() {
		// 	let videoList = document.getElementsByClassName('uni-video-cover')
		// 	for (let i = 0; i < videoList.length; i++) {
		// 		videoList[i].innerHTML = ''
		// 		videoList[i].setAttribute('style', `display: none !important`)
		// 	}
		// }
	}
}
</script>

<style lang="scss" scoped>
.video-cell {
	margin-top: 20rpx;
	position: relative;
}
.content_picture {
	margin-top: 20rpx;
}
.showPlay {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 92rpx;
	height: 92rpx;
	z-index: 90;
}
.pic-class {
	display: inline-block;
	padding: 10rpx 10rpx;
	font-size: 14rpx;
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: #333;
	color: white;
	border-radius: 50% 0 12rpx 0;
}
.dynamic {
	// margin: 0px 22rpx;
	background: #fff;
	width: 100%;
	// padding: 0 19rpx;
}
.dynamic-content {
	// margin: 0px 22rpx;
	background: #fff;
	padding-left: 25rpx;
	padding-right: 25rpx;
}
.showvideotitle{
	max-height:400px;
	border-radius: 12rpx;
	overflow: hidden;
}
.showvideo {
	width: 100%;
}
.pic_more {
	display: flex;
	justify-content: space-between;
	position: relative;
}
.content_picture{
	max-height:600rpx;
	border-radius: 12rpx;
	overflow: hidden;
}
.pic_more_one{
	width: 320rpx;
	max-height:200rpx;
	border-radius: 12rpx;
}
.pic_more_two{
	width: 320rpx;
	max-height:200rpx;
	border-radius: 12rpx;
}
.pic_one {
	width: 100%;
	border-radius: 12rpx;
	img {
		width: 100%;
	}
}

.dynamic_ul {
	padding-bottom: 32rpx;
	border-top: 1px solid #f6f6f6;
	
	.li_text {
		font-size: 34rpx;
		padding-top: 20rpx;
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
		width: 100%;
		.content_left {
			.content_icon {
				display: flex;
				// padding: 20rpx 0 16rpx;
				color: #656565;
				font-size: 24rpx;
				margin-bottom: 20rpx;
				align-items: center;
				font-family: Source Han Sans CN-Regular, Source Han Sans CN;
				image {
					width: 40rpx;
					max-height:40rpx;
					height: 40rpx;
					margin-right: 8rpx;
					border-radius: 50%;
				}
			}

			.content_text {
				width: 100%;
				font-size: 28rpx;
				padding-right: 30rpx;
				color: #474747;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}

		// .content_right {
		// 	margin-top: 16rpx;
		// 	width: 188rpx;
		// 	height: 126rpx;

		// 	image {
		// 		width: 100%;
		// 		height: 100%;
		// 	}
		// }
	}

	.commont {
		display: flex;
		font-size: 24rpx;
		align-items: center;
		color: #9d9d9d;
		padding: 21rpx 0 0;

		.full {
			font-size: 30rpx;
			margin: 0 10rpx;
		}
	}
}
</style>
