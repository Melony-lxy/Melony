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
					累计客户(人)
				</view>
				<view class="money">
					{{people.distributionCount}}
				</view>
			</view>
		</view>
		<!-- 			<view class="TotalBalance">账户总余额</view>
			<view class="TotalBalance-num">0</view> -->
		<view class="order">
			<view class="title">
				<view class="left_line"></view>
				<view class="TitleText">累计客户列表</view>
			</view>
			<view class="OrderList" v-if="list">
				<view class="OrderDetails" v-for="(item,index) in list.data" :key="index">
					<img :src="item.avatar_url" alt="">
					<view class="OrderTitle">
						{{item.nick}}
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
				showtoast: false
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			getlist() {
				this.$axios({
					url: this.$url[114],
					data: {
						page: this.page,
						limit: this.limit,
					}
				}).then(res => {
					console.log(res);
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
		onShow() {
			this.page = 1
			this.showtoast = false
			this.list = {
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
				height: 70rpx;
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
					align-items: center;
					border-bottom: 2rpx solid #00000021;
					img{
						width: 80rpx;
						height: 80rpx;
						margin-right: 20rpx;
						object-fit: cover;
						border-radius: 50%;
					}
					.classorder {
						opacity: .9;
						font-size: 28rpx;
						line-height: 2;
					}

					.OrderTitle {
						font-size: 28rpx;
						width: 400rpx;
						line-height: 1.5;
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
