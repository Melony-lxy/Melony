<template>
	<view class="main">
		<view class="content whiteBg">
			<view>
				<view class="search">
					<u-search placeholder="请输入您要搜索的内容" v-model="searchText" @custom="search">
					</u-search>
				</view>
				<u-tabs-swiper font-size="26" ref="tabs" :list="list" :current="currStatus" @change="change"
					:is-scroll="false" active-color="#41C6D0" swiperWidth="750">
				</u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item whiteBg" v-for="(item, index) in orderList" :key="index">
					<scroll-view scroll-y style="height: 100%; width: 100%" @scrolltolower="onreachBottom"
						v-if="item.length !== 0">
						<view class="whiteBg orderItem" v-for="j in item" :key="j.id">
							<view class="classname">
								{{j.oid===0 ? "自营":j.org}}
							</view>
							<view class="size24 flex j-between">
								<view class="">
									{{ j.ctime }}
								</view>
								<view class="themeColor"> {{ status(j) }} </view>
							</view>
							<u-gap class="gap" height="1" bg-color="#d6d6d6"></u-gap>
							<view class="flex item" v-for="k in j.product" :key="k.id"
								@click="skip(j.id, '/pagesShop/order/detail')">
								<image class="img flex1" mode="aspectFill"
									style="width: 160rpx;height: 160rpx;border-radius: 12rpx;"
									:src="common.imgUrl(k.img)"></image>
								<view class="flex flex-column j-between title">
									<view class="fontWight ellipsis2">
										{{ k.product_name }}
									</view>
									<view class="size24 color999 ellipsis2 describe">
										{{ specificationsStatus(k) }}
									</view>
								</view>
								<view class="priceOrNumber">
									<view class="size32 themeColor" v-if="k.type !== '0'">￥{{ k.unit_price }}</view>
									<view class="size24 flex j-end color666"> x{{ k.number }}
									</view>
								</view>
							</view>
							<view class="size24 color666 end distance"> 使用积分：{{ j.integral }}
							</view>
							<u-gap class="gap" height="1" bg-color="#d6d6d6"></u-gap>
							<view class="">
								<view class="size24 flex wrap xprice"> 总价：<text
										class="themeColor">￥{{ totalPrice(j) }}</text>
									<view class="" v-if="j.price - j.total_price">
										<text>，优惠：</text><text
											class="themeColor">￥{{ (totalPrice(j) - j.total_price).toFixed(2) }}</text>
									</view> ，实付款：<text class="themeColor">￥{{ j.total_price }}</text>
								</view>
								<view class="flex j-between distance a-center"
									style="margin: 10rpx 0 0;padding-bottom: 10rpx;">
									<view class="size26 color999">
										<view class="more" @click="moreChange(j.id)"
											v-if="j.status === 0 || j.status === 1"> 更多 </view>
										<view class="size24 moreBox center whiteBg" v-if="isMore && currId === j.id">
											<view class="option" v-if="j.status === 0 || j.status === 1"
												@click="cancelOrder(j.id)"> 取消订单 </view>
										</view>
									</view>
									<!-- 0:待支付,1:待发货,2:待收货,3已完成,4:已取消 -->
									<view class="flex a-center">
										<view class="size26 logistics themeColor" v-if="j.status === 2"
											@click="skip(j.id, '/pagesShop/order/transportation')"> 查看物流 </view>
										<view class="size26 logistics themeColor"
											v-if="j.status === 0 || j.status === 2 || j.status === 3"
											@click="confirmReceipt(j)">
											{{ j.status === 0
                          ? "待支付"
                          : j.status === 2
                          ? "确认收货"
                          : j.status === 3
                          ? "待评价"
                          : ""
                      }}
										</view>

										<view class="option logistics themeColor" v-if="
                        (j.status === 3 || j.status === 5) &&
                        j.product[0].afterStatus === -1
                      " @click="skip(j.id, '/pagesShop/invoice/apply')"> 申请开票 </view>
										<view class="option logistics themeColor" v-if="j.status === 3"
											@click="skip(j.id, '/pagesShop/order/detail')"> 售后 </view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="empty" v-else>
						<u-empty text="您还没有相关的订单" icon-size="180" font-size="30" margin-top="80"></u-empty>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<u-popup v-model="show1" mode="bottom">
			<view class="moneyy">应付金额：</view>
			<view class="moneyy1">
				￥{{ totalPrices }}
			</view>
			<view class="payment">
				<view class="weixin">
					<img :src="common.imgUrl('/static/wechat.png')" alt="" />
					<view class="paymentMethod"><strong>微信支付</strong></view>
					<view class="paymentMethod-btn" :class="paymentMethod == 1 ? 'activ' : ''"
						@click="paymentMethod = 1"></view>
				</view>
				<!-- <view class="Alipay">
					<img :src="common.imgUrl('/static/zfb.png')" alt="" />
					<view class="paymentMethod"><strong>支付宝支付</strong></view>
					<view class="paymentMethod-btn" :class="paymentMethod == 2 ? 'activ' : ''"
						@click="paymentMethod = 2"></view>
				</view> -->
			</view>
			<view class="primary" @click="paymentOrder(record)">
				立即支付
			</view>
		</u-popup>
	</view>
</template>
<script>
	import {
		listJson,
		cancel,
		confirmReceipt,
		WxPayOrder,
		AliPayOrder,
		deletes,
	} from "@/plugin/api/order.js";
	const PAYMENT = {
		WECHAT: 0x1,
		WECHAT_CH: "微信",
		ALIPAY: 0x2,
		ALIPAY_CH: "支付宝",
	};
	export default {
		data() {
			return {
				record: null,
				show1: false,
				paymentMethod: 1,
				count: 0,
				currId: 0,
				isMore: false,
				page: 1,
				limit: 10,
				query: {},
				dx: 0,
				searchText: "",
				list: [{
					name: "全部",
				}, {
					name: "待付款",
				}, {
					name: "待发货",
				}, {
					name: "待收货",
				}, {
					name: "待评价",
				}, {
					name: "已取消",
				}, {
					name: "已完成",
				}, ],
				currStatus: 0,
				swiperCurrent: 0,
				orderList: [
					[],
					[],
					[],
					[],
					[],
					[],
					[]
				],
				paymentList: [],
				payment: 0,
				totalPrices: 0,
			};
		},
		onShow() {
			this.paymentList = [{
				id: PAYMENT.WECHAT,
				img: "/static/wechat.png",
				name: PAYMENT.WECHAT_CH,
				styles: "width:30rpx;height:30rpx",
			}]
			// #ifdef H5
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) != "micromessenger") {
				this.paymentList.push({
					id: PAYMENT.ALIPAY,
					img: "/static/zfb.png",
					name: PAYMENT.ALIPAY_CH,
					styles: "width:30rpx;height:30rpx",
				})
			}
			// #endif
			this.currStatus = parseInt(this.$route.query.id);
			this.swiperCurrent = this.$route.query.id;
			if (this.$route.query.id) {
				this.query = {
					status: this.$route.query.id - 1,
				};
				this.getList("change");
				return;
			}
			this.query = {
				status: -1,
			};
			this.getList("change");
		},
		methods: {
			totalPrice(item) {
				return ((item.price * 100) / 100 + item.postage).toFixed(2);
			},
			search(value) {
				if (value) {
					this.query = {
						search: value,
						status: this.currStatus - 1,
					};
				} else {
					this.query = {
						status: -1,
					};
				}
				this.getList("change");
			},
			payOrder(record) {
				if (this.paymentList.length === 1) {
					this.paymentOrder(record)
				} else {
					const {
						payment
					} = record
					this.record = record
					this.totalPrices = record.total_price
					this.payment = payment == PAYMENT.WECHAT ? 0 : 1
					this.show1 = true
				}
			},
			paymentOrder(record) {
				uni.showLoading({
					title: "加载中",
				});
				const {
					id
				} = record
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
						id,
						status,
						openId: uni.getStorageSync("openId"),
					}).then((res) => {
						uni.hideLoading();
						if (res.code === 0) {
							if (status === 2) {
								window.location.href = res.data.url;
							} else {
								this.common.payment(res.data).then((res) => {
									if (res.code === 0) {
										this.paymentSuccess()
									}
								}).catch((err) => {});
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
				let _this = this;
				uni.showModal({
					title: "提示",
					content: "支付成功",
					showCancel: false,
					confirmText: "关闭",
					success: function(res) {},
				});
			},
			confirmReceipt(item) {
				if (item.status === 0) {
					this.payOrder(item);
				}
				if (item.status === 2) {
					uni.showLoading({
						title: "加载中",
					});
					confirmReceipt({
						id: item.id,
					}).then((res) => {
						uni.showToast({
							icon: "none",
							title: "成功",
						});
						this.isMore = false;
						this.query = {
							status: -1,
						};
						this.swiperCurrent = 0;
						this.getList("change");
					});
					return;
				}
				if (item.status === 3) {
					uni.navigateTo({
						url: "/pagesShop/commodity/addComment?id=" + item.id,
					});
				}
			},
			specificationsStatus(item) {
				return item.specifications.map((item) => item.name).join("/");
			},
			cancelOrder(id) {
				uni.showModal({
					title: "确定要取消该订单吗？",
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: "加载中",
							});
							cancel({
								id,
							}).then((res) => {
								if (res.code === 0) {
									uni.showToast({
										icon: "none",
										title: "取消成功",
									});
									this.query = {
										status: -1,
									};
									this.getList("change");
								}
								uni.hideLoading();
							}).catch((err) => {
								uni.showToast({
									icon: "error",
									title: "错误：" + err,
								});
							});
						}
					},
				});
			},
			status(item) {
				return item.status === 0 ? "待支付" : item.status === 1 ? "待发货" : item.status === 2 ? "待收货" : item.status ===
					3 ? "待评价" : item.status === 4 ? "已取消" : "已完成";
			},
			skip(id, url) {
				if (id) {
					this.isMore = !this.isMore;
					uni.navigateTo({
						url: url + "?id=" + id,
					});
				} else {
					uni.navigateTo({
						url: "/pagesShop/order/afterSale",
					});
				}
			},
			getList(type) {
				// 状态: 0:待支付,1:待发货,2:待收货,3待评价,4:已取消,5:已评价
				console.log(this.query, "this.query");
				listJson({
					page: this.page,
					limit: this.limit,
					query: this.query,
				}).then((res) => {
					let data = res.data.data;
					if (type === "change") {
						console.log(2);
						this.orderList[this.query.status + 1] = data;
					} else {
						this.orderList[this.query.status + 1].concat(data);
					}
					this.count = res.data.totalCount;
					uni.hideLoading();
					this.$forceUpdate();
				});
			},
			moreChange(id) {
				this.isMore = !this.isMore;
				this.currId = id;
			},
			// tab栏切换
			change(index) {
				this.isMore = false;
				this.swiperCurrent = index;
				// uni.navigateTo({
				// 	url: "/pagesShop/order/orderList?id=" + index,
				// });
				// this.currStatus = index;
				// this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish({
				detail: {
					current
				}
			}) {
				if (this.currStatus !== current) {
					uni.showLoading({
						title: "加载中",
					});
					this.query = {
						status: current - 1,
					};
					this.getList("change");
				}
				this.$refs.tabs.setFinishCurrent(current);
				this.currStatus = current;
				this.swiperCurrent = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if (this.orderList[this.currStatus].length < this.count) {
					uni.showLoading({
						title: "加载中",
					});
					this.page = 2;
					this.query = {
						status: this.currStatus - 1,
					};
					this.getList();
					return;
				}
				uni.showToast({
					icon: "none",
					title: "到底了",
				});
			},
		},
	};
</script>
<style scoped lang="scss">
	@import "@/pagesShop/scss/order/orderList.scss";

	/deep/ ::-webkit-scrollbar {
		//滚动条整体样式
		display: none;
		width: 10rpx !important;
		height: 10rpx !important;
		-webkit-appearance: auto !important;
		overflow: auto !important;
	}

	.primary {
		background-color: #ff6638;
		color: white;
		width: 90%;
		height: 100rpx;
		border-radius: 10rpx;
		text-align: center;
		font-size: 16px;
		line-height: 100rpx;
		margin-left: 5%;
		margin-bottom: 60rpx;
	}

	.moneyy {
		text-align: center;
		font-size: 20px;
		margin-top: 60rpx;
	}

	.moneyy1 {
		text-align: center;
		font-size: 30px;
		margin-top: 20rpx;
	}

	.activ {
		background-color: #009933;
		background: url(../../static/success.png);
		background-size: 100% 100%;
	}

	.payment {
		width: 100%;
		height: 300rpx;
		overflow: hidden;
		margin-top: 20rpx;
	}

	.weixin {
		width: 100%;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
	}

	.weixin img {
		width: 42rpx;
		height: 42rpx;
		float: left;
		margin-left: 25rpx;
		margin-top: 24rpx;
	}

	.Alipay {
		width: 100%;
		height: 200rpx;
		line-height: 90rpx;
	}

	.Alipay img {
		width: 42rpx;
		height: 42rpx;
		float: left;
		margin-left: 25rpx;
		margin-top: 24rpx;
	}

	.paymentMethod-btn {
		width: 45rpx;
		height: 45rpx;
		background-color: gainsboro;
		float: right;
		margin-top: 22rpx;
		margin-right: 50rpx;
		border-radius: 40rpx;
	}

	.paymentMethod {
		float: left;
		margin-left: 20rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #2d2d2d;
	}

	.alipayAgrees {
		width: 76%;
		float: left;
		margin-left: 12%;
		line-height: 40rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #2d2d2d;
		opacity: 0.8;
	}

	.classname {
		padding: 10rpx 0;
		color: $project-color;
		font-weight: bold;
		font-size: 30rpx;
	}
</style>