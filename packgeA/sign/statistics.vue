<template>
	<view class="index">
		<view class="summary" >
			<picker mode="date" :value='whichmonth' @change="changebirthday" fields="month">
				<view  class=" SpaceBetween">
					<view>{{whichmonth}}汇总</view>
					<view class="">
						<u-icon name="arrow-right" color="#989898" size="30"></u-icon>
					</view> 
				</view>
			</picker>
			<view class="statistics flex ">
				<view class="statisticsItem" v-for="(item,index) in totalList" :key="index">
					<view class="time">
						{{item.time}}
					</view>
					<view class="desc">
						{{item.desc}}
					</view>
				</view>
			</view>
		</view>
		<view class="signCenter">
			<zsyCalendar @change="change" dateActiveColor="#FF6638" />
			<view class="centerBottom">
<!-- 				<view class="rule">
					<view class=""> 规则：固定打卡上下课 08:30-09:30 </view>
					<view class=""> 共2次卡，课时1小时 </view>
				</view> -->
				<u-time-line>
					<u-time-line-item v-for="(item,index) in timeList" :key="index">
						<template v-slot:content>
							<view>
								<view class="timeline">
									<view class="behavior"> 上课 {{item.time}} </view>
									<view class="record"> 定位打卡 </view>
								</view>
								<view class="address">
									<u-icon name="map" color="#FF6638" size="32" class="icon"></u-icon>{{item.address}}
								</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			</view>
		</view>
		<signTab current="1"></signTab>
	</view>
</template>
<script>
	import signTab from '@/packgeA/components/signTabbar.vue'
	import zsyCalendar from '@/components/zsy-calendar/zsy-calendar'
	// import timeline from '@/packgeA/components/chenbin-timeline/timeLine.vue'
	// import timelineItem from '@/packgeA/components/chenbin-timeline/timelineItem.vue'
	export default {
		components: {
			signTab,
			zsyCalendar,
			// timeline,
			// timelineItem
		},
		data() {
			return {
				whichmonth:`${new Date().getMonth() + 1}月`,
                show: false,
                value1: Number(new Date()),
				totalList: [{
					time: '0',
					desc: '课节数'
				}, {
					time: '0',
					desc: '签到(次)'
				}, {
					time: '0',
					desc: '未签(次)'
				}],
				date: new Date().getFullYear() + "-" + this.common.getNumber((new Date().getMonth() + 1)) + "-" +
				this.common
				.getNumber(new Date().getDate()),
				timeList: [],
				people:""
			}
		},
		onLoad() {
			this.people = uni.getStorageSync('peoplenumber');
			this.$nextTick(function(){
				this.getSummary()
				this.getSignList()
			})
		},
		methods: {
			changebirthday(e){
				let month=e.detail.value.slice(e.detail.value.length-2,e.detail.value.length)
				if(month!='10'){
					month=month.replace('0','')
				}
				this.whichmonth=`${e.detail.value.slice(0, 4)}年${month}月`
				this.getSummary(e.detail.value)
			},
			// 汇总
			getSummary(item) {
				let data=''
				if(item==undefined){
					data={
							member_id:this.people
					}
				}else{
					data={
							member_id:this.people,
							date:item
					}
				}
				console.log()
				this.$axios({
					url: this.$url[62],
					data,
				}).then((res) => {
					this.totalList[0].time = res.data.classDay
					this.totalList[1].time = res.data.signIn
					this.totalList[2].time = res.data.notClassDay
				})
			},
			getSignList() {
				this.common.loading();
				this.$axios({
					url: this.$url[63],
					data: {
						query: {
							member_id:this.people,
							time: this.date
						}
					}
				}).then((res) => {
					this.timeList = res.data.data
					uni.hideLoading();
				})
			},
			toClass() {
				uni.switchTab({
					url: '/pages/timetable/timetable'
				})
			},
			// 日历选中日期改变事件回调
			change(e) {
				if(this.show){
					this.whichmonth=`${e.year}年${e.month}月`
					this.getSummary(e.selectedDate.slice(0, 7))
				}
				this.show=true
				this.date = e.selectedDate
				this.getSignList()
			}
		}
	}
</script>
<style scoped lang="scss">
	page {
		background: rgba(243, 243, 243, 0.39);
	}

	.index {
		padding-bottom: 150rpx;
	}

	.summary {
		margin: 30rpx;
		padding: 30rpx 30rpx 40rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;

		.title {
			color: #333333;
			font-weight: 500;
			font-size: 34rpx;
		}

		.statistics {
			margin-top: 40rpx;

			.statisticsItem {
				width: 33.33%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.time {
					font-size: 50rpx;
					color: #333333;
					font-weight: bold;
				}

				.desc {
					font-size: 26rpx;
					color: #767676;
					margin-top: 20rpx;
				}
			}
		}
	}

	.signCenter {
		margin: 0 30rpx 30rpx 30rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
		border-radius: 16rpx;

		.centerBottom {
			padding: 20rpx;

			.rule {
				font-size: 26rpx;
				color: #767676;
				line-height: 2;
				margin-bottom: 40rpx;
			}

			.timeline {
				display: flex;
				align-items: center;

				.behavior {
					font-size: 34rpx;
					color: #333333;
				}

				.record {
					font-size: 20rpx;
					text-align: center;
					width: 130rpx;
					color: #FF6638;
					border: 1rpx solid #FF6638;
					height: 36rpx;
					line-height: 36rpx;
					margin-left: 20rpx;
					border-radius: 5rpx;
				}
			}

			.address {
				color: #767676;
				font-size: 26rpx;
				margin-top: 16rpx;
				padding-bottom: 60rpx;

				.icon {
					margin-right: 6rpx;
				}
			}
		}
	}

	.calendar_container {
		min-height: calc(100vh - var(--window-top));
		background-color: #f5f5f5;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
