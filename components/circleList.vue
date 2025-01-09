<template>
	<view class="circle" style="margin-top: 86rpx;">
		<view class="circle_header">
			<view>交流圈</view>
			<view @click="findMore()">发现更多</view>
		</view>
		<scroll-view scroll-x="true">
			<view class="circle_img">
				<template v-if="list">
					<view v-for="(item, index) in list" :key="index" class="circleList" @click="circleDetails(item.id)">
						<view>
							<img :src="common.imgUrl(item.fileList[0])" mode="aspectFill" class="cell_img">
							
						</view>
						<view class="itemtitle">{{ item.title }}</view>
					</view>
				</template>
				<nullData v-if='list.length<=0' :paddingTop="50"/>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import nullData from '@/components/nullData.vue'
	export default {
		name: 'circleList',
		components: {nullData},
		data() {
			return {
				list: [],
				typeNum: 0
			}
		},
		mounted() {
			this.getlistss()
		},
		methods: {
			circleDetails(index) {
				console.log(index)
				uni.navigateTo({
					url: `/packgeA/case/circleDetails?id=` + index
				})
			},
			getlistss() {
				
				this.$axios({
					method: 'POST',
					url: '/communication/exchangeList',
					data: {
						query: {
							type: this.typeNum
						}
					}
				}).then(res => {
					if (this.typeNum == 1 || this.typeNum == 0) {
						res.data.data.forEach(item => {
							if (item.is_recommend == 1) {
								this.list.push(item)
							}
						})
						this.typeNum++
						this.getlistss()
					} else {
						this.typeNum = 0
					}
				})
			},
			findMore() {
				uni.navigateTo({
					url: '/packgeA/case/ArtExchangeCircle'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cell_img {
		border-radius: 12rpx;
		    width: 134rpx;
		    height: 134rpx;
			object-fit: cover;
	}

	.circle {
		padding: 42rpx 28rpx 40rpx 28rpx;
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

		.circle_img {
			display: flex;
			margin-top: 40rpx;

			.circleList {
				margin-right: 32rpx;

				image {
					width: 135rpx;
					height: 135rpx;
				}

				view {
					width: 135rpx;
					overflow:hidden;/*内容超出后隐藏*/
					text-overflow: ellipsis;/* 超出内容显示为省略号 */
					white-space: nowrap;/* 文本不进行换行 */
					font-size: 28rpx;
					color: #333333;
					text-align: center;
					margin-top: 10rpx;
				}
			}
		}
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
