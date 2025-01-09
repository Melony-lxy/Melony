<template>
	<view class="box" v-if="details">
		<view class="title">
			{{
        details.payment_status === 2
          ? "订单已取消"
          : details.payment_status === 0
          ? "订单未支付"
          : details.payment_class < details.positive_class
          ? "订单已部分支付"
          : "订单已支付"
      }}
		</view>
		<view class="curriculumDetails">
			<view class="titleName">课程信息</view>
			<view class="twoBox flex" @click="commodityDetails(details.course.id)">
				<view class="imgBox">
					<image class="img" :src="common.imgUrl(details.course.img)" mode="widthFix" v-if="details.course">
					</image>
				</view>
				<view class="rightBox">
					<view>
						<view class="lable">{{ common.courseType(details.type) }}</view>
						<view class="title">{{ details.course.name }}</view>
					</view>
					<view class="priceBox space-between u-f-ac">
						<view>
							<text class="price" v-if="details.is_gratis == 0">
								￥{{ (details.price * details.positive_class) / 100 }}
							</text>
							<text class="price" v-else-if="details.is_gratis == 1">免费</text>
							<!-- <text class="originalPrice">原价299元</text> -->
						</view>
						<!-- 	<view class="number">X1</view> -->
					</view>
				</view>
			</view>
			<view class="slot-content">
				<view class="item space-between">
					<view class="titleName">可购买正价课节</view>
					<view class="text">x{{ details.positive_class }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">赠送课节</view>
					<view class="text">x{{ details.give_class }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">已购买正价课节</view>
					<view class="text">x{{ details.payment_class }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">已消耗正价课节</view>
					<view class="text">
						x{{
              details.positive_class > details.class_count
                ? details.class_count
                : details.positive_class
            }}
					</view>
				</view>
				<view class="item space-between">
					<view class="titleName">已消耗赠送课节</view>
					<view class="text">
						x{{
              details.positive_class > details.class_count
                ? 0
                : details.class_count - details.positive_class
            }}
					</view>
				</view>
				<view class="item space-between">
					<view class="titleName">课节单价</view>
					<view class="text">￥{{ details.price / 100 }}</view>
				</view>
			</view>
		</view>

		<view class="curriculumDetails" v-if="details.paymentList.length > 0">
			<view class="titleName">订单信息</view>
			<view class="slot-content" v-for="(item, index) in details.paymentList" :key="index">
				<view class="item space-between" :class="{'paylist':index!=0}">
					<view class="titleName" v-if="details.paymentList.length==1">订单号</view>
					<view class="titleName" v-else>订单号{{index+1}}</view>
					<view class="text">{{ item.order_number }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">类型</view>
					<view class="text">{{ item.type === 0 ? "已支付" : "退款" }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">课节数</view>
					<view class="text">{{ item.class_count }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">支付金额</view>
					<view class="text">￥{{ item.price / 100 }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">支付方式</view>
					<view class="text">
						{{
              details.payment_status === 0
                ? "线下支付"
                : details.payment_status === 1
                ? "微信支付"
                : "支付宝支付"
            }}
					</view>
				</view>
				<view class="item space-between" :class="{'lastpay':index+1!=details.paymentList.length}">
					<view class="titleName">支付时间</view>
					<view class="text">{{ item.payment_time }}</view>
				</view>
				<hr v-if='details.paymentList.length!=1 && details.paymentList.length!=index+1'/>
				<!-- <view class="item space-between">
				 	  <view class="titleName">订单备注</view> <view  class="text" style="color: #FEA406;">{{details.remark||'无'}}</view>
				     </view> -->
			</view>
		</view>
		<view class="space-between buttonBox">
			<view class="cancel" v-if="
          details.type !== 3 &&
          details.is_gratis !== 1 &&
          details.payment_status === 1 &&
          details.service_refund_status === '-1'
        " @click="applyAlter">
				申请退课
			</view>
			<view class="study" v-if="
          details.is_gratis === 0 &&
          details.payment_status === 1 &&
          details.payment_class < details.positive_class &&
          details.service_refund_status === '-1'
        " @click="toPayment()">
				继续支付
			</view>
			<view class="study" v-if="details.payment_status === 1" @click="navGetTo()">立即学习</view>
			<view class="study" v-else-if="details.payment_status === 0" @click="toPayment()">立即支付</view>
		</view>

		<!-- 支付退款 -->
		<u-modal v-model="paymentShow" width="682rpx" title="课程支付" :border-radius="5" :show-confirm-button="false"
			:title-style="{ color: '#2D2D2D', fontSize: '32rpx', fontWeight: 'bold' }" mask-close-able>
			<view class="slot-content-model">
				<view class="item space-between">
					<view class="titleName">可购买正价课节</view>
					<view class="text">x{{ details.positive_class }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">赠送课节</view>
					<view class="text">x{{ details.give_class }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">已购买正价课节</view>
					<view class="text">x{{ details.payment_class }}</view>
				</view>
				<view class="item space-between">
					<view class="titleName">课节单价</view>
					<view class="text">￥{{ details.price / 100 }}</view>
				</view>
				<view class="item space-between" v-if="
            details.course.class_status === 1 &&
            details.positive_class - details.payment_class >
              details.course.renew_class
          ">
					<view class="titleName">下单课节数</view>
					<u-number-box :min="details.course.renew_class"
						:max="details.positive_class - details.payment_class" @change="numberChange"
						:disabled-input="true" v-model="payment_class" :step="1"></u-number-box>
				</view>
				<view class="item space-between">
					<view class="titleName">支付金额</view>
					<view class="text">￥{{ (payment_class * details.price) / 100 }}</view>
				</view>
				<view class="">
					<view class="">支付方式</view>
					<view v-for="(item, index) in paymentList" :key="index" class="flex u-f-ac paymentItem"
						@click="payment = index">
						<image :style="item.styles" :src="item.img" mode=""></image>
						<view class="paymentName flex-shrink">{{ item.name }}</view>
						<view class="quan flex-center" :style="payment == index ? 'background: #FF6638;' : ''">
							<u-icon name="checkbox-mark" color="#ffffff" size="28"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 20rpx 42rpx">
				<u-button :custom-style="{ height: '80rpx', background: '#FEA406' }" type="success"
					@click="paymentOrder()">
					确认支付
				</u-button>
			</view>
		</u-modal>

		<!-- 退款弹框 -->
		<u-modal v-model="show" width="682rpx" title="退课申请" :border-radius="5" :show-confirm-button="false"
			:title-style="{ color: '#2D2D2D', fontSize: '32rpx', fontWeight: 'bold' }" mask-close-able>
			<view class="slot-content-model">
				<view class="item space-between">
					<view class="titleName">购买课节</view>
					<view class="text">x{{ details.payment_class }}</view>
				</view>
				<!-- 	<view class="item space-between">
				<view class="titleName">已优惠</view> <view  class="text" style="color: #FEA406;">-￥50</view>
		</view> -->
				<view class="item space-between">
					<view class="titleName">实收金额</view>
					<view class="text">
						<text class="price" v-if="details.is_gratis == 0">
							￥{{ (details.price * details.payment_class) / 100 }}
						</text>
						<text class="price" v-else-if="details.is_gratis == 1">免费</text>
					</view>
				</view>
				<view class="item space-between">
					<view class="titleName">已消耗课节</view>
					<view class="text">
						x{{
              details.positive_class > details.class_count
                ? details.class_count
                : details.positive_class
            }}
					</view>
				</view>
				<view class="item space-between">
					<view class="titleName">退费</view>
					<view class="text">￥{{ refundPrice }}</view>
				</view>
			</view>
			<view style="padding: 20rpx 42rpx">
				<u-button :custom-style="{ height: '80rpx', background: '#FEA406' }" type="success" @click="refunds">
					确认退款
				</u-button>
			</view>
		</u-modal>
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
		data() {
			return {
				id: 0,
				show: false,
				paymentShow: false,
				payment_class: 0,
				details: null,
				refundPrice: 0,
				paymentList: [{
					id: PAYMENT.WECHAT,
					img: this.common.imgUrl("/static/wechat.png"),
					name: PAYMENT.WECHAT_CH,
					styles: "width:30rpx;height:30rpx",
				}, ],
				payment: 0,
			};
		},
		onLoad(option) {
			this.paymentList = [{
				id: PAYMENT.WECHAT,
					img: this.common.imgUrl("/static/wechat.png"),
				name: PAYMENT.WECHAT_CH,
				styles: "width:30rpx;height:30rpx",
			}, ];
			// #ifdef H5
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) != "micromessenger") {
				this.paymentList.push({
					id: PAYMENT.ALIPAY,
					img: this.common.imgUrl("/static/zfb.png"),
					name: PAYMENT.ALIPAY_CH,
					styles: "width:30rpx;height:30rpx",
				});
			}
			// #endif
			this.id = option.id;
			this.getOrderDetails();
		},
		methods: {
			commodityDetails(id) {
					let code = uni.getStorageSync('ThousandAwn_share_code')
					let pageId = uni.getStorageSync('ThousandAwn_share')
					if (pageId == id) {
						uni.navigateTo({
							url: `/packgeA/curriculumDetails/curriculumDetails?id=${id}&code=${code}`
						})
					
					} else {
						uni.navigateTo({
							url: '/packgeA/curriculumDetails/curriculumDetails?id=' + id
						})
					}
			},
			getOrderDetails() {
				this.$axios({
					url: this.$url[12],
					data: {
						id: this.id,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.details = res.data;
						this.refundPrice =
							this.details.is_gratis == 0 ?
							(this.details.payment_class * this.details.price) / 100 -
							(this.details.class_count * this.details.price) / 100 :
							"0";
					}
				});
			},
			navGetTo() {
				const item = this.details;
				if (item.type === 3) {
					let code = uni.getStorageSync('ThousandAwn_share_code')
					let pageId = uni.getStorageSync('ThousandAwn_share')
					if (pageId == item.cid) {
						uni.navigateTo({
							url: `/packgeA/curriculumDetails/curriculumDetails?id=${item.cid}&code=${code}`
						})
					
					} else {
						uni.navigateTo({
							url: '/packgeA/curriculumDetails/curriculumDetails?id=' + item.cid
						})
					}
				} else {
					uni.navigateTo({
						url: "/packgeB/liveDetails/liveDetails?id=" + item.id,
					});
				}
			},

			//退款
			refunds() {
				this.$axios({
					url: this.$url[40],
					data: {
						id: this.id,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.show = false;
						this.getOrderDetails();
						this.$u.toast("申请退课成功");
					} else {
						this.$u.toast(res.msg);
					}
				});
			},

			applyAlter() {
				if (
					this.details.payment_status == 2 ||
					this.details.service_refund_status > -1 ||
					this.details.payment_status == 0
				) {
					this.$u.toast("该订单暂时不能退票");
					return false;
				}

				this.show = true;
			},
			toPayment() {
				if (this.details.course.id === 0) {
					this.$u.toast("该课程已删除,不可继续购买");
					return false;
				}
				this.payment_class =
					this.details.course.class_status === 1 &&
					this.details.positive_class - this.details.payment_class >
					this.details.course.renew_class ?
					this.details.course.renew_class :
					this.details.positive_class - this.details.payment_class;
				this.paymentShow = true;
			},
			numberChange(e) {
				this.payment_class = e.value;
			},
			paymentOrder() {
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
					this.$axios({
							url: this.$url[33],
							data: {
								id: this.id,
								status,
								payment_class: this.payment_class,
								openId: uni.getStorageSync("openId"),
							},
						})
						.then((res) => {
							this.paymentShow = false;
							if (res.code === 0) {
								uni.hideLoading();
								if (status === 2) {
									location.href = res.data.url;
									return;
								}
								const _this = this;
								this.common
									.payment(res.data)
									.then((res) => {
										if (res.code === 0) {
											uni.showModal({
												title: "提示",
												content: "支付成功",
												showCancel: false,
												confirmText: "关闭",
												success: function(res) {
													_this.getOrderDetails();
												},
											});
										}
									})
									.catch((err) => {});
							}
						})
						.catch(() => {
							this.paymentShow = false;
						});
				} else if (payment === PAYMENT.ALIPAY) {
					this.$axios({
							url: this.$url[70],
							data: {
								id: this.id,
								payment_class: this.payment_class,
							},
						})
						.then((res) => {
							this.paymentShow = false;
							uni.hideLoading();
							document.querySelector("body").innerHTML = res.data.resp;
							document.forms[0].submit();
						})
						.catch(() => {
							this.paymentShow = false;
							uni.hideLoading();
						});
				}
			},
		},
	};
</script>

<style>
	page {
		background: #f2f2f2;
	}
</style>

<style lang="scss" scoped>
	.quan {
		width: 40rpx;
		height: 40rpx;
		background: #f2f2f2;
		border-radius: 50%;
		border: 1rpx solid #ff6638;
	}

	.box {
		padding: 34rpx 29rpx;

		.title {
			font-size: 45rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #262626;
			margin-bottom: 32rpx;
		}

		.curriculumDetails {
			background-color: white;
			border-radius: 20rpx;
			padding: 24rpx 27rpx 0 33rpx;

			.titleName {
				font-size: 30rpx;
				font-family: Source Han Sans SC;
				font-weight: bold;
				color: #2d2d2d;
				padding-bottom: 25rpx;
			}

			.twoBox {
				margin-top: 30rpx;
				padding-bottom: 28rpx;
				padding-right: 35rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #f5f4f4;

				.imgBox {
					overflow: hidden;
					width: 294rpx;
					height: 182rpx;
					margin-right: 17rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.rightBox {
					width: 60%;
					// display: flex;
					// flex-direction: column;
					// justify-content: space-between;

					.title {
						font-size: 32rpx;
						font-family: Source Han Sans SC;
						font-weight: bold;
						color: #2d2d2d;
						display: inline;
					}

					.price {
						font-size: 30rpx;
						font-family: Source Han Sans SC;
						font-weight: bold;
						color: #ff6638;
					}

					.originalPrice {
						font-size: 18rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #c4c4c4;
						margin-left: 6rpx;
					}

					.number {
						font-size: 28rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #2d2d2d;
					}

					.lable {
						width: 77rpx;
						height: 30rpx;
						background: #ff6638;
						border-radius: 28rpx;
						color: white;
						font-size: 24rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						line-height: 30rpx;
						color: rgba(255, 255, 255, 0.87);
						text-align: center;
						display: inline-block;
						padding: 3px 5px;
					}
				}
			}

			.slot-content {
				margin-top: 27rpx;
				padding: 0rpx 10rpx;

				.item {
					margin-bottom: 34rpx;

					border-bottom: 1px solid #f5f4f4;

					.titleName {
						font-size: 26rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #2d2d2d;
					}

					.text {
						font-size: 26rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #666666;
						opacity: 1;
					}
				}
			}
		}
	}

	/deep/ .buttonBox {
		align-items: center;
	}

	.cancel {
		width: 340rpx;
		height: 57rpx;
		background: #ffffff;
		border: 1px solid #989898;
		border-radius: 29rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 57rpx;
		margin-top: 10rpx;
		text-align: center;
		color: #999999;
		margin: 0 10rpx;
	}

	.study {
		// width: 434rpx;
		margin: 0 10rpx;
		width: 100%;
		height: 80rpx;
		background: #ff6638;
		border-radius: 40rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		line-height: 80rpx;
		color: #ffffff;
	}
	
	.buttonBox {
		text-align: center;
		margin-top: 50rpx;
	}

	.slot-content-model {
		border: 1px solid #f5f4f4;
		margin-top: 32rpx;
		padding: 20rpx 70rpx;

		.item {
			margin-bottom: 34rpx;
			width: 100%;

			.titleName {
				font-size: 26rpx;
				font-family: Source Han Sans SC;
				font-weight: 400;
				color: #2d2d2d;
			}

			.text {
				font-size: 26rpx;
				font-weight: 400;
				color: #666666;
				opacity: 1;
			}
		}
	}
	.paylist{
		margin-top::30rpx;
	}
	.lastpay{
		margin-bottom: 12rpx !important;
	}
</style>
