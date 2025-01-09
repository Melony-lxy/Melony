<template>
	<view class="coursecenter">
		<view class="information">
			<view class="information_left" v-if="people">
				<img :src="common.imgUrl(people.avatar_url)" class="avatar">
				<view class="information_people">
					<view class="information_name">
						{{people.nick}}
					</view>
					<view class="information_class" >
						合伙人
					</view>
				</view>
			</view>
			<view class="tip" @click="navigateTo('/packgeB/rules/rules')" >
				<image :src="common.imgUrl('/static/images/tip.png')" mode="widthFix" class="tipImg"></image>
				<view>
					合伙人规则
				</view>
			</view>
		</view>
		<view class="wallet">
			<view class="wallet_left">
				<view>
					 {{ type ? '待结算金额(元)' : '累计订单(笔)'}}
				</view>
				<view class="money">
					{{type ? people.settlementPrice / 100 : people.orderCount}}
				</view>
			</view>
		</view>
		<!-- 			<view class="TotalBalance">账户总余额</view>
			<view class="TotalBalance-num">0</view> -->
		<view class="order">
			<view class="title">
				<view class="left_line"></view>
				<view class="TitleText">{{ type ? '待结算金额列表' : '累计订单列表'}}</view>
			</view>
			<view class="OrderList" v-if="list">
				<view class="" v-for="(item,index) in list.data" :key="index">
					<view class="ordername">
						订单号: {{item.order_number}}
					</view>
					<view class="OrderDetails">
						<view class="avatarimg">
							<img :src="common.imgUrl(item.user.avatar_url)" alt="" v-if="item.user">
							<view class="">
								<view class="classorder">
									用户:  {{item.user ? item.user.nick : '无效用户'}}
								</view>
								<view class="classorder">
									订单金额: ￥{{item.price / 100}}
								</view>
								<view class="classorder">
									分销比例: {{item.distribution_ratio}}%
								</view>
								<view class="classorder">
									支付时间: {{item.payment_time}}
								</view>
							</view>
						</view>
						<view class="OrderMoney" :style="{color:item.type!=0?'red':'red'}">
							{{(item.distribution_price/100)}}元
						</view>
					</view>

				</view>
			</view>
			<view class="nomore" v-if="showtoast">
				暂无更多记录
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				people: '',
				list: {
					data: []
				},
				page: 1,
				limit: 10,
				showtoast: false,
				type:0
			}
		},
		onLoad(opt) {
			if(opt.type){
				this.type = opt.type
			}
			this.page = 1
			this.showtoast = false
			this.list={
					data: []
				}
			this.getlist()
			this.$axios({
				url: this.$url[113]
			}).then(res => {
				if (res.code == 0) {
					this.people = res.data
				}
			})
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			getlist() {
				this.$axios({
					url: this.$url[115],
					data: {
						page: this.page,
						limit: this.limit,
						type:this.type
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
				url: this.$url[113]
			}).then(res => {
				if (res.code == 0) {
					this.people = res.data
					uni.stopPullDownRefresh();
				}
			})
		},
	}
</script>

<style lang="scss">
	.coursecenter {
		width: 100%;

		// 
		.ordername {
			font-weight: bold;
			font-size: 30rpx;
		}

		.avatarimg {
			display: flex;

			img {
				margin-top: 10rpx;
				margin-right: 20rpx;
				width: 105rpx;
				height: 105rpx;
				border-radius: 50%;
				object-fit: cover;
			}
		}

		.nomore {
			padding-top: 50rpx;
			padding-bottom: 20rpx;
			text-align: center;
			font-size: 24rpx;
			opacity: .8;
		}

		.wallet {
			width: 95%;
			padding: 0rpx 2.5%;
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
				background-color: rgba(255, 102, 56, 1);
				color: #fff;
				font-size: 30rpx;
				padding: 10rpx 30rpx;
				border-radius: 100rpx;
			}
		}

		.information {
			width: 95%;
			height: 100rpx;
			padding: 50rpx 2.5%;
			display: flex;
			background-color:  $project-color;
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
					margin-top: 10rpx;
					margin-bottom: 20rpx;
					padding-bottom: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 2rpx solid #00000021;
					.classorder {
						font-size: 28rpx;
						line-height: 1.8;
					}

					.OrderTitle {
						font-size: 28rpx;
						width: 400rpx;
						line-height: 1.5;
						margin-bottom: 5rpx;
					}

					.OrderWhy {
						font-size: 26rpx;
						opacity: .8;
					}
				}
			}

			.title {
				display: flex;
				font-size: 32rpx;
				align-items: center;
				margin-bottom: 20rpx;

				.left_line {
					margin-right: 20rpx;
					background-color:  $project-color;
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
