<template>
	<view style="margin-bottom: 20rpx;">
		<view class="story">
			<view class="story-left"></view>
			<view class="story-content">
				店铺信息
			</view>
			<view class="story-left"></view>
		</view>
		<!-- #ifdef H5 -->
		<view class="story-img" v-if="imgurls !=''">
			<img :src="common.imgUrl(imgurls)" alt="">
		</view>
		<view class="story-imgs" v-if="imgurls ==''">
			<img :src="common.imgUrl('/static/setUp/logo.png')" alt="">
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="story-img" v-if="tests !=''">
			<img :src="common.imgUrl(tests)" alt="">
		</view>
		<view class="story-imgs" v-if="tests ==''">
			<img :src="common.imgUrl('/static/setUp/logo.png')" alt="">
		</view>
		<!-- #endif -->
		<view class="story-img1">
			<view class="story-font">
				由 <text>邻米科技</text> 提供技术支持
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "storeInformation",
		data() {
			return {
				tests: ''
			};
		},
		computed: {
			imgurls() {
				let test = ''
				uni.getStorage({
					key: 'abbreviation_img',
					success: function(res) {
						test = res.data
					}
				});
				return test
			}
		},
		mounted() {
			let that = this
			uni.getStorage({
				key: 'abbreviation_img',
				success: function(res) {
					that.tests = res.data
				}
			});
		},
		created() {}
	}
</script>

<style lang="scss">
	.story {
		width: 90%;
		height: 100rpx;
		display: flex;
		margin-left: 5%;
	}

	.story-left {
		width: 35%;
		height: 2rpx;
		margin-top: 49rpx;
		background-color: #989898;
	}

	.story-content {
		width: 30%;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 16px;
		color: #989898;
	}

	.story-img {
		width: 100%;
		height: auto;
		object-fit: cover;
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;

		img {
			width: 150rpx;
			height: 150rpx;
			object-fit: cover;
		}
	}

	.story-imgs {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;

		img {
			height: 130rpx;
		}
	}

	.story-img1 {
		width: 400rpx;
		display: flex;
		height: 50rpx;
		margin: 0 auto;
		
		margin-top: 10rpx;
		align-items: center;
		justify-content: center;
			img {
				width: 30rpx;
				height: 32rpx;
			}

		.story-font {
			width: 350rpx;
			height: 50rpx;
			text-align: center;
			line-height: 50rpx;
			font-size: 14px;
			color: #989898;
			text{
				color: $project-color;
				margin: 0 4rpx;
			}
		}
	}
</style>