<template>
	<view>
		<template v-if="activityList.length != 0">
			<view class="" v-for="(item,index) in activityList" :key="index">
				<view class="activityBox" @click="goActivity(item.id)">
					<view class="activityTime">
						{{ item.ctime }}
					</view>
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
				<view class="" style="height: 30rpx;"></view>
			</view>
		</template>
		<view class="" v-else style="height: 90vh;">
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activityList:[],
				page:1
			};
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods: {
			getList() {
				this.$axios({
					url: this.$url[119],
					data: {
						page: this.page,
						limit: 10,
						application:true
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
			},
			goActivity(id) {
				uni.navigateTo({
					url: "/packgeB/activityDetail/activityDetail?id=" + id
				})
			},
		},
	}
</script>

<style lang="scss">
.activityBox {
			padding: 30rpx 0 0;

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
</style>
