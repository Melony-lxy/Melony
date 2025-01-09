<template>
	<view>
		<view class="commodityNav flex a-center j-around">
			<view class="commodityItem" :class="index === 0 ? 'activeNav' : ''"
				v-for="(item, index) in commodityNav" @click="navChange(item)" :key="item.id">
				{{ item.title }}
			</view>
		</view>
		<view class="box" v-if="activeNav === 0">
			<view v-if="listData.length===0" class="centers">
				<u-empty text="消息列表为空" mode="message"></u-empty>
			</view>
			<view class="white" v-for="(item,index) in listData" :key='index'>
				<view class="title space-between">
					<view>{{item.title}}</view>
					<view class="redBox" v-if="item.read_status==0"></view>
				</view>
				<view class="details">{{item.content}}</view>
				<view class="time">{{item.ctime}}</view>
			</view>
		</view>
		<view class="box" v-else-if="activeNav === 1">
			<view v-if="listData2.length===0" class="centers">
				<u-empty text="消息列表为空" mode="message"></u-empty>
			</view>
			<view class="white" v-for="(item,index) in listData2" :key='index'>
				<view class="title space-between">
					<view>{{item.title}}</view>
					<view class="redBox" v-if="item.read_status==0"></view>
				</view>
				<view class="details">{{item.content}}</view>
				<view class="time">{{item.ctime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		messageList
	} from '@/plugin/api/personal.js'
	export default {
		data() {
			return {
				commodityNav: [
					{
						id: 1,
						title: '商城消息'
					}
				],
				activeNav: 1,
				listData: [],
				listData2: [],
				page: 1,
				page2: 1,
				limit: 8,
				totalCount: 0,
				totalCount2: 0,
			}
		},
		onLoad() {
			// this.getNewsList()
			this.messageList()
		},
		onPullDownRefresh() {
			if (this.activeNav === 0) {
				this.page = 1
				this.listData = []
				this.getNewsList()
			} else if (this.activeNav === 1) {
				this.page2 = 1
				this.listData2 = []
				this.messageList()
			}
		},

		//下拉加载更多
		onReachBottom() {
			if (this.activeNav === 0) {
				const pageNum = Math.ceil(this.totalCount / this.limit)
				if (this.page < pageNum) {
					this.page++
					this.getNewsList()
				}
			} else if (this.activeNav === 1) {
				const pageNum = Math.ceil(this.totalCount2 / this.limit)
				if (this.page2 < pageNum) {
					this.page2++
					this.getNewsList()
				}
			}
		},
		methods: {
			navChange(item) {
				this.activeNav = item.id
			},
			getNewsList() {
				this.$axios({
					url: this.$url[31],
					data: {
						page: this.page,
						limit: this.limit,
						query: {
							type: -1
						}
					}
				}).then(res => {
					this.listData = this.listData.concat(res.data.data)
					this.totalCount = res.data.totalCount
					uni.stopPullDownRefresh()
				})
			},
			messageList() {
				messageList({
					page: this.page2,
					limit: this.limit,
				}).then(res => {
					this.listData2 = this.listData2.concat(res.data.data)
					this.totalCount2 = res.data.totalCount
					uni.stopPullDownRefresh()
				})
			},
		}
	}
</script>
<style>
	page {
		background: #f9f9f9;
	}
</style>
<style lang="scss" scoped>
	.commodityNav {
		margin-top: 10rpx;
		background-color: #FFFFFF;
		color: #333333;
		font-size: 26rpx;
		position: relative;
		padding: 26rpx 28rpx;
	}

	.activeNav {
		font-weight: 700;
		font-size: 30rpx;

		position: relative;
	}

	.activeNav:after {
		content: "";
		display: block;
		position: absolute;
		bottom: -20rpx;
		left: 0;
		width: 100%;
		height: 2px;
		background: $project-color;
	}

	.j-around {
		justify-content: space-around;
	}

	.a-center {
		align-items: center;
	}

	.box {
		padding: 30rpx 29rpx;

		.white {
			background-color: white;
			padding: 30rpx 20rpx 24rpx 47rpx;
			border-radius: 20rpx;
			margin-bottom: 27rpx;
		}

		.title {
			font-size: 28rpx;
			font-family: Source Han Sans SC;
			font-weight: bold;
			color: #2D2D2D;
			padding-bottom: 30rpx;
			border-bottom: 1px solid #f5f4f4;
		}

		.details {
			font-size: 26rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #2D2D2D;
			padding: 30rpx 0;
		}

		.time {
			font-size: 22rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #989898;
		}

		.redBox {
			width: 10rpx;
			height: 10rpx;
			background-color: red;
			border-radius: 50%;
		}
	}
</style>
