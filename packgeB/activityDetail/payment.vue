<template>
	<view class="main">
		<view class="PaymentOrder_box">
			<view style="height: 1rpx;">

			</view>
			<view class="PaymentOrder">
				<view class="content">
					<view class="commodityInfo whiteBg">
						<view class="flex j-between">
							<u-image class="img" width="160rpx" height="160rpx"
								:src="common.imgUrl(detail.activity.img)">
							</u-image>
							<view class="flex flex-column j-between title">
								<view class="fontWight ellipsis2"> {{ detail.activity.name }} </view>
								<view class="size24 color999 ellipsis2">
									票种: {{ detail.ticket_name }}
								</view>
							</view>
							<view class="flex1">
								<view class="size32 themeColor flex j-end">￥{{ detail.price }}</view>
								<view class="size24 flex j-end color666"> x1</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex j-end totalPrice">
					<view class=""> 合计： </view>
					<view class="themeColor size32 fontWight">
						￥{{ detail.price }}
					</view>
				</view>
			</view>
			<view style="height: 1rpx;">

			</view>
		</view>
		<view class="PaymentDetailed">
			<view class="PaymentDetailed_title">
				参会信息
			</view>
			<view class="flex-between">
				<view class="">
					姓名
				</view>
				<view class="">
					{{detail.name}}
				</view>
			</view>
			<view class="flex-between">
				<view class="">
					联系方式
				</view>
				<view class="">
					{{detail.phone}}
				</view>
			</view>
			<view class="flex-between">
				<view class="">
					公司名
				</view>
				<view class="">
					{{detail.company}}
				</view>
			</view>
			<view class="flex-between">
				<view class="">
					公司职位
				</view>
				<view class="">
					{{detail.position}}
				</view>
			</view>
		</view>
		<view class="flex j-between whiteBg payment">
			<view class="paymentText">支付方式</view>
			<view v-for="(item,index) in paymentList" :key='index' class="flex u-f-ac paymentItem"
				@click="() => payment = index">
				<image :style="item.styles" :src="common.imgUrl(item.img)" mode=""></image>
				<view class="paymentName flex-shrink">{{item.name}}</view>
				<view class="quan flex-center" :style="payment==index?'background: #2f6bdd;':''">
					<u-icon name="checkbox-mark" color="#ffffff" size="28"></u-icon>
				</view>
			</view>
		</view>
		<view class="footer whiteBg flex j-between a-center">
			<view class="money_box">
				<view class="flex a-center size24">
					<view class="leftBox moneysize"> 报名费： </view>
					<text class="rightBox themeColor fontWight size36">
						￥{{ detail.price }}
					</text>
				</view>
			</view>
			<view class="pay" @click="goPay" v-if="isios">确定报名</view>
		</view>
	</view>
</template>

<script>
	const PAYMENT = {
		WECHAT: 0x1,
		WECHAT_CH: "微信",
		ALIPAY: 0x2,
		ALIPAY_CH: "支付宝",
	};
	export default {
		components: {},
		data() {
			return {
				id: 0,
				detail: {
					activity: {},
					price: 0
				},
				isios: false,
				paymentList: [{
						id: PAYMENT.WECHAT,
						img: "/static/wechat.png",
						name: PAYMENT.WECHAT_CH,
						styles: "width:30rpx;height:30rpx",
					},
					// #ifdef H5
					// {
					// 	id: PAYMENT.ALIPAY,
					// 	img: "/static/zfb.png",
					// 	name: PAYMENT.ALIPAY_CH,
					// 	styles: "width:30rpx;height:30rpx",
					// },
					// #endif
					// {
					// 	img: '/static/yinlian.png',
					// 	name: '银联',
					// 	styles: 'width:30rpx;height:18rpx'
					// },
				],
				payment: 0,
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
			} else {
				uni.showToast({
					title: "参数无效",
					icon: "none"
				})
				uni.navigateBack()
			}
			this.paymentList = [{
				id: PAYMENT.WECHAT,
				img: "/static/wechat.png",
				name: PAYMENT.WECHAT_CH,
				styles: "width:30rpx;height:30rpx",
			}]
			// #ifdef H5
			// let ua = window.navigator.userAgent.toLowerCase();
			// if (ua.match(/MicroMessenger/i) != "micromessenger") {
			// 	this.paymentList.push({
			// 		id: PAYMENT.ALIPAY,
			// 		img: "/static/zfb.png",
			// 		name: PAYMENT.ALIPAY_CH,
			// 		styles: "width:30rpx;height:30rpx",
			// 	})
			// }
			// #endif
		},
		onShow() {
			this.$axios({
				url: this.$url[123],
				data: {
					id: this.id,
				}
			}).then(res => {
				if (res.code == 0) {
					const formData = res.data
					if (formData.price == 0) {
						uni.showToast({
							title: '金额免费',
							icon: "none"
						})
						uni.navigateBack()
						return
					}
					if (formData.payment_status === 1) {
						uni.showToast({
							title: '已支付',
							icon: "none"
						})
						uni.navigateBack()
						return
					}
					this.detail = formData
				}
			})
			uni.getSystemInfo({
				success: (res) => {
					if (res.platform == 'ios') {
						this.$axios({
							url: this.$url[103]
						}).then(res => {
							this.isios = res.data
						})
					} else {
						this.isios = true
					}
				}
			})
		},
		methods: {
			goPay() {
				uni.showLoading({
					title: "加载中",
				});
				const payment = this.paymentList[this.payment].id;
				if (payment === PAYMENT.WECHAT) {
					let status = 0;
					// #ifdef H5
					let ua = window.navigator.userAgent.toLowerCase();
					if (ua.match(/MicroMessenger/i) == "micromessenger") {
						status = 1;
					} else {
						status = 2;
					}
					// #endif
					// #ifdef MP-WEIXIN
					// let _this = this
					// uni.login({
					// 	provider: 'weixin',
					// 	success: (res) => {
					// 		_this.payment(0, res.code)
					// 	},
					// 	fail: () => {
					// 		errdata.errlist("微信授权失败")
					// 	}
					// })
					// return
					// #endif

					// #ifndef H5 || MP-WEIXIN
					uni.showToast({
						icon: "none",
						title: "暂时只支付h5和微信小程序支付！",
					});
					uni.hideLoading();
					// #endif
					this.$axios({
						url: this.$url[124],
						data: {
							id: this.id,
							status,
							openId: uni.getStorageSync("openId"),
							payment: 0,
						}
					}).then((res) => {
						uni.hideLoading();
						if (res.code === 0) {
							if (status === 2) {
								window.location.href = res.data.url;
							} else {
								this.common
									.payment(res.data)
									.then((res) => {
										if (res.code === 0) {
											this.paymentSuccess()
										}
									})
									.catch((err) => {});
							}
						}
					}).catch(() => {
						uni.hideLoading();
					})
				} else if (payment === PAYMENT.ALIPAY) {
					this.$axios({
						url: this.$url[124],
						data: {
							id: this.id,
							payment: 1,
						}
					}).then((res) => {
						uni.hideLoading();
						document.querySelector('body').innerHTML = res.data.resp;
						document.forms[0].submit()
					}).catch(() => {
						uni.hideLoading();
					})
				} else {
					uni.hideLoading();
				}
			},
			paymentSuccess() {
				uni.showModal({
					title: "提示",
					content: "支付成功",
					showCancel: false,
					confirmText: "关闭",
					success: function(res) {
						uni.switchTab({
							url: '/pages/my/my'
						})
					},
				});
			},
		}
	};
</script>

<style scoped lang="scss">
	@import "@/pagesShop/scss/order/index.scss";
	.commodityInfo{
		padding-top: 20rpx;
	}
	.payment {
		margin: 28rpx auto !important;
		border-radius: 10rpx;
		width: 720rpx;
		background-color: #fff;
		display: block;
	}

	.u-checkbox {
		display: block;
		padding-right: 20rpx;
	}

	.creditPoints {
		margin: 14rpx auto !important;
		border-radius: 10rpx;
		width: 720rpx;
		background-color: #fff;
		padding-top: 30rpx !important;
		padding-bottom: 30rpx !important;
		// padding: 20rpx 0 !important;
	}

	.PaymentDetailed {
		margin: 14rpx auto;
		border-radius: 10rpx;
		width: 720rpx;
		background-color: #fff;

		.PaymentDetailed_title {
			margin: 28rpx;
			padding-top: 28rpx;
			font-weight: bold;
			font-size: 30rpx;
			margin-bottom: 14rpx;
			margin-top: 0;
		}

		.flex-between {
			display: flex;
			justify-content: space-between;
			margin: 0 28rpx;
			padding: 20rpx 0;
		}

		.orange {
			color: #2f6bdd;
		}
	}

	.paymentText {
		margin: 28rpx;
		padding-top: 28rpx;
		font-weight: bold;
		font-size: 30rpx;
		margin-top: 0;
		margin-bottom: 14rpx;
	}

	.main {
		background-color: #FAFAFA;
		padding-bottom: 130rpx;
	}

	.moneysize {
		font-size: 32rpx;
	}

	.quan {
		width: 40rpx;
		height: 40rpx;
		background: #f2f2f2;
		border-radius: 50%;
		border: 1rpx solid $project-color;
	}

	.paymentName {
		font-size: 26rpx;
		font-weight: 400;
		color: #2d2d2d;
		margin-left: 11rpx;
	}

	.paymentItem {
		display: flex;
		justify-content: space-between;
		margin: 0 28rpx;
		padding: 20rpx 0;
	}

	.SelfPickupBox {
		display: flex;
		justify-content: space-between;
		margin: 14rpx 0;
		padding: 24rpx 28rpx;
		box-sizing: border-box;
		background-color: #FFF;
		color: #303133;
		font-size: 28rpx;
		font-weight: bold;

		/deep/ .u-checkbox {
			padding-right: 0 !important;
		}
	}
</style>