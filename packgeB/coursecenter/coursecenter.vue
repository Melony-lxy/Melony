<template>
	<view class="coursecenter">
		<view class="information">
			<view class="information_left" v-if="people">
				<img :src="common.imgUrl(people.avatar_url)" class="avatar">
				<view class="information_people">
					<view class="information_name">
						{{people.nick}}
					</view>
					<view class="information_class">
						合伙人
					</view>
				</view>
			</view>
			<view class="tip" @click="navigateTo('/packgeB/rules/rules')">
				<image :src="common.imgUrl('/static/images/tip.png')" mode="widthFix" class="tipImg"></image>
				<view>
					合伙人规则
				</view>
			</view>
		</view>
		<view class="wallet">
			<view class="wallet_left">
				<view>
					账户总余额(元)
				</view>
				<view class="money" v-if="people">
					{{(people.balance - people.amountWithdrawal)/ 100}}
				</view>
			</view>
			<view class="withdrawal" @click="navigateTo('/packgeB/cashWithdrawal/cashWithdrawal')">
				提现
			</view>
		</view>
		<!-- 			<view class="TotalBalance">账户总余额</view>
			<view class="TotalBalance-num">0</view> -->
		<view class="order">
			<view class="calculation" v-if="people">
				<view class="CalculationBox" @click="navigateTo('/packgeB/accumulatedIncome/accumulatedIncome')">
					<view>累计收益</view>
					<view>（元）</view>
					<view class="num">{{people.distributionPrice / 100}}</view>
				</view>
				<view class="CalculationBox" @click="navigateTo('/packgeB/cumulativeOrders/cumulativeOrders?type=1')">
					<view>待结算金额</view>
					<view>（元）</view>
					<view class="num">{{people.settlementPrice / 100}}</view>
				</view>
				<view class="CalculationBox" @click="navigateTo('/packgeB/cumulativeCustomers/cumulativeCustomers')">
					<view>累计客户</view>
					<view>（人）</view>
					<view class="num">{{people.distributionCount}}</view>
				</view>
				<view class="CalculationBox" @click="navigateTo('/packgeB/cumulativeOrders/cumulativeOrders')">
					<view>累计订单</view>
					<view>（笔）</view>
					<view class="num">{{people.orderCount}}</view>
				</view>
			</view>
			<view class="title">
				<view class="flex">
					<view class="left_line"></view>
					<view class="TitleText">余额变动记录</view>
				</view>
				<view class="flex" @click="show=true">
					<img :src="common.imgUrl('/static/images/dressingbyscreening.png')" alt="">
					<view class="dressingbyscreening">
						筛选
					</view>
				</view>
			</view>
			<view class="OrderList" v-if="list">
				<view class="OrderDetails" v-for="(item,index) in list.data" :key="index">
					<view class="">
						<view class="OrderTitle">
							{{item.change_reason}}
						</view>
						<view class="OrderWhy">
							{{item.ctime}}
						</view>
					</view>
					<view class="OrderMoney" :style="{color:item.type==0?'red':'green'}">
						{{item.type==0?'+':'-'}}{{item.offset/100}}元
					</view>
				</view>
			</view>
			<view class="nomore" v-if="showtoast">
				暂无更多记录
			</view>
		</view>
		<u-select v-model="show" :list="lists" mode="single-column" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				people: '',
				list: {
					data: []
				},
				status: -1,
				page: 1,
				limit: 10,
				showtoast: false,
				lists: [{
						value: -1,
						label: '全部'
					},
					{
						value: 0,
						label: '分销记录'
					},
					{
						value: 1,
						label: '提现记录'
					}
				],
			}
		},
		methods: {
			confirm(e) {
				this.page = 1
				this.list = {data: []}
				this.status=e[0].value
				this.getlist()
			},
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			getlist() {
				this.$axios({
					url: this.$url[116],
					data: {
						page: this.page,
						limit: this.limit,
						query: {
							status: this.status
						}
					}
				}).then(res => {
					if (res.code == 0) {
						if (res.data.data.length == 0) {
							this.showtoast = true
						}
						res.data.data.forEach(item => {
							this.list.data.push(item)
						})
						if (this.page * this.limit > res.data.totalCount) {
							this.showtoast = true
						}
					}
				})
			}
		},
		onShow() {
			this.list = {
				data: []
			}
			this.page = 1
			this.showtoast = false
			this.getlist()
			this.$axios({
				url: this.$url[113]
			}).then(res => {
				if (res.code == 0) {
					this.people = res.data
				}
			})
		},
		onReachBottom() {
			if (!this.showtoast) {
				this.page++
				this.getlist()
			}

		},
		onPullDownRefresh() {
			this.page = 1
			this.list = {
				data: []
			}
			this.getlist()
			this.$axios({
				url: this.$url[93]
			}).then(res => {
				if (res.code == 0) {
					this.people = res.data
					uni.stopPullDownRefresh();
				}
			})
		}
	}
</script>

<style lang="scss">
	.coursecenter {
		width: 100%;

		// 
		.nomore {
			padding-top: 50rpx;
			padding-bottom: 20rpx;
			text-align: center;
			font-size: 24rpx;
			opacity: .8;
		}

		.wallet {
			width: 95%;
			padding: 0 2.5%;
			display: flex;
			background-color: $project-color;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 100rpx;

			.wallet_left {
				font-size: 34rpx;
				font-family: Source Han Sans SC;
				color: #fff;

				.money {
					margin-top: 30rpx;
				}
			}

			.withdrawal {
				background-color: #FFF;
				color: $project-color;
				font-size: 30rpx;
				padding: 10rpx 30rpx;
				border-radius: 100rpx;
				font-weight: bold;
			}
		}

		.information {
			width: 95%;
			height: 100rpx;
			padding: 50rpx 2.5%;
			display: flex;
			background-color: $project-color;
			align-items: center;
			justify-content: space-between;

			.tip {
				font-size: 30rpx;
				color: #fff;
				display: flex;
				align-items: center;

				.tipImg {
					margin-right: 5rpx;
					width: 30rpx;
				}
			}

			.information_left {
				display: flex;
				align-items: center;

				.avatar {
					width: 100rpx;
					height: 100rpx;
					object-fit: cover;
					border-radius: 50%;
					margin-right: 27rpx;
				}

				.information_name {
					font-size: 34rpx;
					font-family: Source Han Sans SC;
					font-weight: bold;
					color: #fff;
				}

				.information_class {
					font-size: 20rpx;
					margin-top: 10rpx;
					color: #fff;
					opacity: .8;
					border: 1px solid #Fff;
					text-align: center;
					border-radius: 30rpx;
				}
			}

		}

		.TotalBalance {
			width: 90%;
			height: 100rpx;
			line-height: 100rpx;
			margin: auto;
			text-align: left;
			font-size: 20px;
			color: white;
			margin-top: 25rpx;
		}

		.TotalBalance-num {
			width: 90%;
			height: 100rpx;
			line-height: 100rpx;
			margin: auto;
			text-align: left;
			font-size: 20px;
			color: white;
		}

		.order {
			width: 95%;
			padding: 0 2.5%;
			margin-top: -50rpx;
			background-color: #Fff;
			padding-top: 30rpx;
			border-radius: 30rpx;

			.OrderList {
				width: 95%;
				margin: 0 auto;
				margin-top: 30rpx;

				.OrderDetails {
					margin-top: 40rpx;
					padding-bottom: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.OrderTitle {
						font-size: 28rpx;
						width: 500rpx;
						line-height: 1.5;
						margin-bottom: 5rpx;
					}

					.OrderWhy {
						line-height: 2;
						font-size: 26rpx;
						opacity: .8;
					}
				}
			}

			.flex {
				display: flex;
				align-items: center;
			}

			.dressingbyscreening {
				font-size: 28rpx;
				color: #767676;
			}

			.title {
				display: flex;
				font-size: 32rpx;
				align-items: center;
				justify-content: space-between;

				img {
					width: 40rpx;
					height: 40rpx;
					object-fit: cover;
				}

				.left_line {
					margin-right: 20rpx;
					background-color: $project-color;
					width: 6rpx;
					height: 40rpx;
				}

				.TitleText {}
			}

			.calculation {
				display: flex;

				margin-bottom: 70rpx;

				.CalculationBox {
					width: 25%;

					view {
						height: 60rpx;
						font-size: 30rpx;
						text-align: center;
						line-height: 60rpx;
					}

					.num {
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
