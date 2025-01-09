<template>
	<view class="dynamic" v-if="data">
		<view class="dynamic_one">
			<view class="one_text" v-if="data">{{ data.title }}</view>
			<view class="one_icon" v-if="data">
				<image :src="common.imgUrl(data.user.avatar_url)" mode="widthFix" class="one_img"></image>
				{{ data.user.nick }}
			</view>
			<view class="one_scenery">
				<image :src="common.imgUrl(data.file[0])" v-if="data" />
				<view class="icon"><image :src="common.imgUrl('/static/player.png')" mode=""></image></view>
			</view>
			<view class="comment">
				<view v-if="data">{{ data.view_count }} 浏览</view>
				<!-- <view class="full">·</view>
				<view>222评论</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	
export default {
	name: 'dynamic',
	props: {
		data: Object
	},

	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.one_img {
	width: 42rpx;
	height: 42rpx;
	margin-right: 8rpx;
	border-radius: 50% !important;
}
.dynamic {
	// margin: 0px 22rpx;
	background: #fff;
	// padding: 0 20rpx;

	.dynamic_one {
		.one_text {
			font-size: 32rpx;
			color: #111111;
			font-weight: bold;
			padding: 28rpx 0 4rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			line-height: 75rpx;
			-webkit-line-clamp: 2;
		}

		.one_icon {
			display: flex;
			padding-bottom: 14rpx;
			color: #656565;
			font-size: 24rpx;
		}

		.one_scenery {
			width: 100%;
			position: relative;
			image {
				width: 100%;
				height: 450rpx;
			}
			.icon {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				image {
					width: 96rpx;
					height: 96rpx;
				}
			}
			// > image {
			// 	width: 100%;
			// 	height: 100%;
			// }

			// view {
			// 	position: absolute;
			// 	top: 50%;
			// 	left: 50%;
			// 	transform: translate(-50%, -50%);
			// 	image {
			// 		width: 96rpx;
			// 		height: 96rpx;
			// 	}
			// }
		}

		.comment {
			display: flex;
			font-size: 24rpx;
			align-items: center;
			color: #9d9d9d;
			padding: 30rpx 0 32rpx;

			.full {
				font-size: 30rpx;
				margin: 0 20rpx;
			}
		}
	}
}
</style>
