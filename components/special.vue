<template>
	<view class="special">
		<view class="circle_header">
			<view>专题</view>
			<view @click="ViewAll()">查看全部</view>
		</view>
		<scroll-view scroll-x="true">
			<view class="special_scroll" v-if="special">
				<view v-for="(item, index) in special" :key="index" class="special_img" @click="TopicDetails(item.id)">
					<view>
						<image :src="common.imgUrl(item.fileList[0])" mode="aspectFill" class="img_cell"></image>
					</view>
					<view class="special_title">
						<view class="title_cell">{{ item.title }}</view>
						<view>去参与</view>
					</view>
				</view>
			</view>
			<nullData v-if='special.length<=0' :paddingTop="50"/>
		</scroll-view>
	</view>
</template>

<script>
	import nullData from '@/components/nullData.vue'
	export default {
		name: 'special',
		components: {nullData},
		data() {
			return {
				special: []
			}
		},
		mounted() {
			this.getSpecial()
		},
		methods: {
			TopicDetails(index) {
				uni.navigateTo({
					url: '/packgeA/case/topicDetails?id=' + index
				})
			},
			ViewAll() {
				uni.navigateTo({
					url: '/packgeA/case/PopularActivities'
				})
			},
			getSpecial() {
				this.$axios({
					method: 'POST',
					url: '/communication/specialList',
					data: {
						page: 1,
						limit: 20,
						query:{is_recommend: 1}
					}
				}).then(res => {
					if (res.code == 0) {
						this.special = res.data.data
					}
					console.log('专题', res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.special {
		padding: 42rpx 28rpx 30rpx 28rpx;
		background: #fff;

		.circle_header {
			display: flex;
			justify-content: space-between;
			align-items: end;

			view:nth-child(1) {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
			}

			view:nth-child(2) {
				font-size: 28rpx;
				color: #888888;
			}
		}

		.special_scroll {
			display: flex;
			margin-top: 28rpx;

			.special_img {
				margin-right: 30rpx;

				/* box-shadow: 0px 4rpx 12rpx 2rpx rgba(0, 0, 0, 0.06); */
				box-shadow: 0px 6rpx 16rpx 2rpx rgba(0, 0, 0, 0.06);
				margin-bottom: 16rpx;

				image {
					width: 438rpx;
					height: 306rpx;
				}

				.special_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 16rpx 20rpx 20rpx;

					view:nth-child(1) {
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
					}

					view:nth-child(2) {
						font-size: 20rpx;
						color: #333333;
				}
					}
			}
		}
	}

	.img_cell {
		border-radius: 12rpx 12rpx 0 0;
	}

	.title_cell {
		width: 300rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	/deep/ ::-webkit-scrollbar {
		//滚动条整体样式
		display: none;
		width: 10px !important;
		height: 10px !important;
		-webkit-appearance: auto !important;
		background: red;
		overflow: auto !important;
	}

	/deep/ ::-webkit-scrollbar-thumb {
		//滚动条里面小方块
		border-radius: 10px !important;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
		background-color: #535353 !important;
	}

	/deep/ ::-webkit-scrollbar-track {
		//滚动条
		border-radius: 10px !important;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
		background-color: #ededed !important;
	}
</style>
