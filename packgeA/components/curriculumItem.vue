<template>
	<view>
		<view class="box flex" v-for="(item, index) in dataList" :key="index" @click="details(item)" :style="
        isPrice
          ? 'padding:30rpx 0;border-bottom: 2px solid #F5F5F5;margin-top:0rpx;'
          : ''
      ">
			<image v-if="isPrice" :src="common.imgUrl(item.img)" mode="aspectFill" class="leftImg"></image>
			<image v-if="!isPrice" :src="common.imgUrl(item.course.img)" mode="aspectFill" class="leftImg"></image>
			<view class="rightBox flex-shrink">
				<view class="title" v-if="isPrice">{{ item.name }}</view>
				<view class="title space-between" v-if="!isPrice">
					<view class="itemName">{{ item.course.name }}</view>
					<view class="statusRefund" v-if="item.service_refund_status > -1">
						{{ item.service_refund_status == 0 ? "申请退课中" : "退课成功" }}
					</view>
				</view>
				<view v-if="!isPrice">
					<view class="statusBox inClass" v-if="item.is_teaching == 0 && item.type != 3">待排课</view>
					<view class="statusBox study" v-if="item.is_teaching == 1 && item.type != 3">学习中</view>
					<view class="statusBox end" v-if="item.is_teaching == 2 && item.type != 3">已结束</view>
					<view class="statusBox end" v-if="item.is_teaching == 3 && item.type != 3">已退款</view>
				</view>

				<view class="text" v-if="!isPrice">
					课节 {{ item.class_count }}/{{
            item.positive_class + item.give_class
          }}
				</view>

				<view class="teacherText" v-if="isPrice">{{ item.introduce }}</view>

				<view class="priceText flex u-f-ac" v-if="isPrice">
					<view class="activityPrice" v-if="item.is_gratis == 0">
						￥{{ (item.price * item.positive_class) / 100 }}
					</view>
					<view class="activityPrice" v-else-if="item.is_gratis == 1">免费</view>
					<view class="originalPrice" v-if="item.market_price">原价￥{{ item.market_price / 100 }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: Array,
			isPrice: {
				type: Boolean,
				default: false,
			},
		},

		methods: {
			details(item) {
				if (item.type === 1) {
					// if (item.course.id === 0) {
					// 	this.$u.toast('课程已删除')
					// 	return
					// }
					this.$emit("curricuId", item.id);
					uni.navigateTo({
						url: "/packgeB/liveDetails/liveDetails?id=" + item.id,
					});
				} else if (item.type === 0) {
					// if (item.course.id === 0) {
					// 	this.$u.toast('课程已删除')
					// 	return
					// }
					this.$emit("curricuId", item.id);
					uni.navigateTo({
						url: "/packgeB/liveDetails/liveDetails?id=" + item.id,
					});
				} else if (item.type === 3) {
					// console.log(this.isPrice, 'this.isPrice')
					// if (item.course.id === 0) {
					// 	this.$u.toast('课程已删除')
					// 	return
					// }
					let code = uni.getStorageSync('ThousandAwn_share_code')
					let pageId = uni.getStorageSync('ThousandAwn_share')
					if (pageId == item.course.id) {
						uni.navigateTo({
							url: `/packgeA/curriculumDetails/curriculumDetails?id=${item.course.id}&code=${code}`
						})

					} else {
						uni.navigateTo({
							url: '/packgeA/curriculumDetails/curriculumDetails?id=' + item.course.id
						})
					}
				} else {
					if (item.type != 0) {
						let code = uni.getStorageSync('ThousandAwn_share_code')
						let pageId = uni.getStorageSync('ThousandAwn_share')
						if (pageId == item.id) {
							uni.navigateTo({
								url: `/packgeA/curriculumDetails/curriculumDetails?id=${item.id}&code=${code}`
							})

						} else {
							uni.navigateTo({
								url: '/packgeA/curriculumDetails/curriculumDetails?id=' + item.id
							})
						}
					}
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.box {
		margin-top: 20rpx;

		.leftImg {
			border-radius: 10rpx;
			width: 290rpx;
			height: 192rpx;
			margin-right: 20rpx;
		}

		.rightBox {
			width: 400rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				width: 400rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				font-size: 32rpx;
				font-family: Source Han Sans SC;
				font-weight: bolder;
				color: #2d2d2d;
			}

			.inClass {
				background: #fea406;
			}

			.study {
				background: #ff6638;
			}

			.end {
				background: #989898;
			}

			.text {
				font-size: 26rpx;
				font-family: Source Han Sans SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 0.87);
			}
		}
	}

	.statusBox {
		width: 126rpx;
		height: 40rpx;
		color: white;
		border-radius: 6px;
		line-height: 40rpx;
		font-size: 26rpx;
		text-align: center;
	}

	.teacherText {
		font-size: 24rpx;
		font-weight: 400;
		color: #858688;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.priceText {
		font-size: 32rpx;
		font-weight: 500;
		color: #fea406;
	}

	.originalPrice {
		font-size: 22rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #989898;
		margin-left: 10rpx;
		text-decoration: line-through;
	}

	.activityPrice {
		font-size: 30rpx;
		color: #ff6638;
		font-weight: bold;
	}

	.statusRefund {
		font-size: 22rpx;
		font-weight: 400;
		color: #b1b1b1;
	}

	.itemName {
		width: 242rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
