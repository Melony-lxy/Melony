<template>
	<view class="main">
		<view class="SelfPickupBox" :style="{margin:is_pickup?'14rpx 0 0' : '14rpx 0'}">
			<view class="">
				是否自提商品
			</view>
			<u-checkbox v-model="is_pickup" style="display: inline-block;" active-color="#042BE3" size="35"
				shape="circle"></u-checkbox>
		</view>
		<view class="top whiteBg addressbox" v-if="!is_pickup">
			<view class="flex a-center j-between address" @click="skip()">
				<view v-if="address.length !== 0">
					<view class="flex a-center">
						<view class="default size22" v-if="address.is_default === '1'">
							默认
						</view>
						<view class="color666">
							{{ address.province }}
							{{ address.city === "市辖区" ? "" : address.city }}
							{{ address.district }}
						</view>
					</view>
					<view class="size34 detailedAddress fontWight">
						{{ address.details }}
					</view>
					<view class="flex fontWight">
						<view class="name"> {{ address.name }} </view>
						<view class="phone"> {{ address.phone }} </view>
					</view>
				</view>
				<view class="" v-else> 请选择地址 </view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="PaymentOrder_box">
			<view style="height: 1rpx;">

			</view>
			<view class="PaymentOrder">
				<view class="storename">
					{{detail.oid > 0 ? detail.org.name : '自营'}}
				</view>
				<view class="content">
					<view class="commodityInfo whiteBg" v-for="(item, index) in detail.product" :key="index"
						@click="skip(item.product_id)">
						<view class="flex j-between">
							<u-image class="img" width="160rpx" height="160rpx" :src="common.imgUrl(item.img)">
							</u-image>
							<view class="flex flex-column j-between title">
								<view class="fontWight ellipsis2"> {{ item.product_name }} </view>
								<view class="size24 color999 ellipsis2 describe">
									{{ specificationsStatus(item) }}
								</view>
							</view>
							<view class="flex1">
								<view class="size32 themeColor flex j-end">￥{{ item.unit_price }}</view>
								<view class="size24 flex j-end color666"> x{{ item.number }} </view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex flex-column j-around orderInfo " v-if='!is_pickup'>
					<view class="flex j-between orderItem orderremarks">
						<view class="fontWight lable"> 配送方式 </view>
						<view class="flex1 flex j-end">
							<view class="color999 tips1">普通快递 - 免邮
							</view>
						</view>
					</view>
					<!-- <view class="flex j-between">
					<view class="fontWight">
						开具发票
					</view>
					<view class="color999">
						本次不开具发票
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view> -->
				</view>

				<view class="flex j-between a-center whiteBg purchasedItem" @click="discounts()">
					<view class="poupon"> 优惠券 </view>
					<view class="themeColor center">
						{{
			  detail.couponInfo && detail.couponInfo.name
			    ? detail.couponInfo.name + "-￥" + detail.couponInfo.price
			    : "会员优惠"
			}}

						<u-icon name="arrow-right" color="#042BE3" size="28"></u-icon>
					</view>
				</view>
				<view class="flex j-end totalPrice">
					<view class=""> 合计： </view>
					<view class="themeColor size32 fontWight">
						￥{{ detail.total_price }}
						<!-- {{ (item.specificationsStatus.price * item.number).toFixed(2) }} -->
					</view>
				</view>
			</view>
			<view style="height: 1rpx;">

			</view>
		</view>
		<view class="PaymentDetailed">
			<view class="PaymentDetailed_title">
				价格明细
			</view>
			<view class="flex-between">
				<view class="">
					商品总价
				</view>
				<view class="">
					￥{{detail.price}}
				</view>
			</view>
			<view class="flex-between">
				<view class="">
					优惠
				</view>
				<view class="orange">
					￥{{ detail.couponInfo && detail.couponInfo.name ? ((detail.couponInfo.price *100 + detail.discount_amount * 100) / 100 ).toFixed(2): detail.discount_amount}}
				</view>
			</view>
			<view class="flex-between">
				<view class="">
					合计
				</view>
				<view class="">
					￥{{ detail.couponInfo && detail.couponInfo.name ? ((detail.total_price * 100 - detail.couponInfo.price *100) / 100).toFixed(2) : detail.total_price}}
				</view>
			</view>
		</view>

		<!-- <view class="creditPoints flex j-between whiteBg" v-if="integralInfo.max > 0 && integralInfo.proportion > 0 && integralInfo
						.integral > 0">
			<view class="flex">
				<u-icon name="red-packet-fill" color="#042BE3" size="35"></u-icon>
				<view class="deduction">
					{{ integralText }}
				</view>
			</view>
			<u-checkbox @change="creditPoints" v-model="isIntegral" active-color="#042BE3" shape="circle" />
		</view> -->
		<view class="flex j-between whiteBg payment">
			<view class="paymentText">支付方式</view>
			<view v-for="(item,index) in paymentList" :key='index' class="flex u-f-ac paymentItem"
				@click="() => payment = index">
				<image :style="item.styles" :src="common.imgUrl(item.img)" mode=""></image>
				<view class="paymentName flex-shrink">{{item.name}}</view>
				<view class="quan flex-center" :style="payment==index?'background: #042BE3;':''">
					<u-icon name="checkbox-mark" color="#ffffff" size="28"></u-icon>
				</view>
			</view>
		</view>
		<view class="footer whiteBg flex j-between a-center">
			<view class="money_box">
				<view class="flex a-center size24">
					<view class="leftBox moneysize"> 总计： </view>
					<text class="rightBox themeColor fontWight size36">
						￥{{ detail.couponInfo && detail.couponInfo.name ? ((detail.total_price * 100 - detail.couponInfo.price *100) / 100).toFixed(2) : detail.total_price}}
					</text>
				</view>
				<!-- 
				<view class="flex a-center color999 size22">
					<view class="leftBox"> 总共优惠： </view>
					<view class="rightBox"> ￥{{ discount_amount }} </view>
				</view> -->
			</view>
			<view class="pay" @click="goPay" v-if="isios">提交订单</view>
		</view>
	</view>
</template>

<script>
	import {
		orderAdd,
		getIntegral,
		WxPayOrder,
		orderFee,
		AliPayOrder,
		stagingPayment,
		orderInfo
	} from "@/plugin/api/order.js";
	import {
		getDetail
	} from "@/plugin/api/personal.js";
	import {
		getCartList
	} from "@/plugin/api/product.js";
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
				detail: {
					org: '',
					product: []
				},
				isios: false,
				productTotal: 0,
				ordertotal: 0,
				isShowGift: false,
				isSingle: 0,
				giftInfo: [],
				giftSpecification: [],
				giftIndex: 0,
				giftStockList: [],
				usableGiftList: [],
				isShowGiftCategory: false,
				integralInfo: {},
				isSeparate: false,
				purchaseInfo: [],
				idx: -1,
				addressId: 0,
				idList: [],
				address: [],
				isIntegral: false,
				integralText: "",
				discount_amount: "",
				is_pickup: false,
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
				orderId: 0,
			};
		},
		onLoad(options) {
			if (options.order_id) {
				orderInfo({
					id: options.order_id
				}).then(res => {
					if (res.data.status !== 0 || res.data.uid !== 0) {
						uni.showModal({
							title: "提示",
							content: "不是未支付订单",
							showCancel: false,
							confirmText: "关闭",
							success: function(res) {
								uni.switchTab({
									url: '/pages/my/my'
								})
							},
						});
						return
					}
					this.detail = res.data
					this.getIntegral();
					this.getAddress();
					this.discountsData();
				}).catch(() => {
					uni.switchTab({
						url: '/pages/my/my'
					})
				})
			}
			if (options.id) {
				this.addressId = options.id;
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
			// 选择优惠券
			discounts() {
				let data = {};
				const detail = this.detail.product
				let product = [];
				detail.forEach((item) => {
					let specifications = item.specifications.map(
						(j) => j.name
					);
					product.push({
						id: item.product_id,
						specifications,
					});
				});
				data = {
					product,
					isPostage: false,
					price: this.detail.total_price,
					oid: this.detail.oid
				};
				this.$store.commit("filterCoupon", data);
				uni.navigateTo({
					url: "/pagesShop/members/discountCoupon?use=true&order_id=" + this.detail.id,
				});
			},
			// 订单金额
			orderFeeChange() {},
			// 拨打电话
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
				});
			},
			//优惠券
			discountsData() {
				const couponInfo = this.$store.state.discountCoupon;
				if (couponInfo.id) {
					this.detail.couponsId = couponInfo.id;
					this.detail.couponInfo = couponInfo
				}
				this.orderFeeChange();
			},
			// 积分信息
			getIntegral() {
				getIntegral().then((res) => {
					if (res.code === 0) {
						this.isAdditionalPurchase = res.data.isAdditionalPurchase;
						this.integralInfo = {
							integral: res.data.integral,
							max: res.data.max,
							proportion: res.data.proportion,
						};
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg,
						});
					}
				});
			},
			// 商品规格
			specificationsStatus(item) {
				return item.specifications.map((item) => item.name).join("/");
			},
			skip(id) {
				console.log(id, "id");
				if (id) {
					uni.navigateTo({
						url: "/pagesShop/commodity/detail?id=" + id + "&forbid=true",
					});
				} else {
					uni.redirectTo({
						url: "/pagesShop/address/index?mode=change",
					});
				}
			},
			// 收货地址
			getAddress() {
				getDetail({
					id: this.addressId,
				}).then((res) => {
					uni.hideLoading();
					if (res.data.id) {
						this.address = res.data;
						this.addressId = res.data.id;
					}
				});
			},
			// 支付
			goPay() {
				uni.showLoading({
					title: "加载中",
				});
				if (this.orderId > 0) {
					this.payOrder();
					uni.hideLoading();
					return;
				}
				if (!this.is_pickup) {
					if (!this.addressId) {
						uni.showToast({
							icon: "none",
							title: "请选择地址",
						});
						uni.hideLoading();
						return;
					}
				}
				let data = {}
				if (this.is_pickup) {
					data = {
						id: this.detail.id,
						couponsId: this.detail.couponsId,
						is_pickup: this.is_pickup,
						isIntegral: this.isIntegral,
					};
				} else {
					data = {
						id: this.detail.id,
						couponsId: this.detail.couponsId,
						addressId: this.addressId,
						isIntegral: this.isIntegral,
					}

				};
				stagingPayment(data)
					.then((res) => {
						uni.hideLoading();
						if (res.code === 0) {
							this.orderId = this.detail.id
							this.$store.commit("discountCoupon", {});
							this.payOrder();
						} else {
							uni.showToast({
								icon: "error",
								title: res.msg,
							});
						}
					})
					.catch(() => {
						uni.hideLoading();
					});
			},
			payOrder() {
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
					WxPayOrder({
						id: this.orderId,
						status,
						openId: uni.getStorageSync("openId"),
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
					AliPayOrder({
						id: this.orderId,
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
			// 购物车角标
			getCartList() {
				getCartList().then((res) => {
					if (res.data.length) {
						uni.setTabBarBadge({
							index: 2,
							text: res.number
						});
					} else {
						uni.removeTabBarBadge({
							index: 2,
						});
					}
				});
			},
			// 是否抵扣积分
			creditPoints(e) {
				this.isIntegral = e.value;
				this.orderFeeChange();
			},
		},
	};
</script>

<style scoped lang="scss">
	@import "@/pagesShop/scss/order/index.scss";

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
			color: #042BE3;
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