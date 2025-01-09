<template>
	<view class="activity">
		<nav-tab class="nav-tab" :navTab="list" :activeIndex.sync="choosed" @tabEvent="tabEvent"/>
		<template v-if="activityList.length != 0">
			<view class="" v-for="(item,index) in activityList" :key="index" :style="index === 0 ? 'padding-top: 120rpx;' : ''">
				<view class="activityBox" @click="goActivity(item.id)">
					<!-- <view class="activityTime">
						{{ item.ctime }}
					</view> -->
					<view class="activityInner">
						<image :src="common.imgUrl(item.img[0])" mode="aspectFill" class="activityImg"></image>
						<view class="activityTitle">
							{{ item.category }}
						</view>
						<view class="activityTop">
							<view class="">
								{{item.name}}
							</view>
							<view class="">
								时间：{{ item.start_time }} ~ {{ item.end_time }}
							</view>
						</view>
						<image src="@/static/activity/begin.png" mode="widthFix" v-if='item.status == 1'
							class="activityType">
						</image>
						<image src="@/static/activity/disbegin.png" mode="widthFix" v-else-if='item.status == 0'
							class="activityType"></image>
						<image src="@/static/activity/end.png" mode="widthFix" v-else class="activityType"></image>
					</view>
				</view>
			</view>
		</template>
		<view class="" v-else style="height: 85vh;">
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	import navTab from '@/components/nav-tab'
	export default {
		components: {
			navTab
		},
		data() {
			return {
				list: null,
				choosed: 0,
				page: 1,
				activityList: []
			};
		},
		onLoad() {
			this.$axios({
				url: this.$url[118]
			}).then(res => {
				if (res.code == 0) {
					this.list = [{
						id: 0,
						name: "全部",
						img: require("@/static/icon/all.png"),
						type:true
					}].concat(res.data)
					this.getList()
				}
			})
		},
		onReachBottom() {
			this.page ++ 
			this.getList()
		},
		methods: {
			goActivity(id) {
				uni.navigateTo({
					url: "/packgeB/activityDetail/activityDetail?id=" + id
				})
			},
			tabEvent(index){
				this.choosed = index
			},
			getList() {
				this.$axios({
					url: this.$url[119],
					data: {
						page: this.page,
						limit: 10,
						query: {
							category_id: this.list[this.choosed].id
						}
					}
				}).then(res => {
					if (res.code == 0) {
						if(this.page == 1){
							this.activityList = []
						}
						if(res.data.data.length == 0){
							uni.showToast({
								title:"暂无更多活动",
								icon:"none"
							})
							return
						}
						res.data.data.forEach((item) => {
							this.activityList.push(item)
						})
					}
				})
			}
		},
		watch: {
			choosed(newValue, oldValue) {
				this.page = 1
				this.getList()
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f9f9f9;
	}

	.activity {
		.activityBox {
			padding: 0 0 30rpx;

			.activityTime {
				text-align: center;
				color: #666;
				font-size: 26rpx;
				padding-bottom: 30rpx;
			}

			.activityInner {
				width: 690rpx;
				height: 345rpx;
				margin: 0 auto;
				border-radius: 12rpx;
				overflow: hidden;
				position: relative;

				.activityType {
					position: absolute;
					top: 0;
					right: 20rpx;
					width: 80rpx;
					height: auto;
				}

				.activityImg {
					width: 100%;
					height: 100%;
					vertical-align: bottom;
				}

				.activityTitle {
					font-size: 26rpx;
					padding: 15rpx 20rpx;
					line-height: 1;
					position: absolute;
					left: 0;
					top: 0;
					background: $project-color;
					color: #FFF;
					font-weight: bold;
				}

				.activityTop {
					width: 690rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					box-sizing: border-box;
					padding: 10rpx 20rpx;
					background-color: #000000a6;
					color: #FFF;
					line-height: 1.5;
					font-size: 28rpx;

					>view:first-child {
						font-weight: bold;
						overflow: hidden;
						/*   超出容器的部分影响  */
						white-space: nowrap;
						/*  文本不换行   */
						text-overflow: ellipsis;
						/*  超出容器的文本显示省略号  */
					}

					>view:last-child {
						font-size: 24rpx;
					}
				}
			}
		}

		.activityScroll {
			position: sticky;
			top: 0;
			width: 750rpx;
			left: 0;
			background-color: #FFF;
			z-index: 9999;

			.activityList {
				min-width: calc(750rpx / 4);
				display: inline-flex;
				flex-direction: column;
				align-items: center;
				height: 60rpx;
				justify-content: space-evenly;

				image {
					height: 70rpx;
					width: auto;
				}

				>view {
					line-height: 1;
					color: #333;
					font-size: 28rpx;
					position: relative;

					view {
						left: -5%;
						bottom:-15rpx;
						position: absolute;
						width: 110%;
						height: 6rpx;
					}
				}

			}

			.choosed {
				>view {
					font-weight: bold;

					view {
						background: $project-color;
					}
				}
			}
		}
	}
</style>