<template>
	<view class="main">
		<view class="content">
			<view class="whiteBg item">
				<view class="size32 fontWight title">
					退款商品
				</view>
				<view class="flex j-between commodity_box">
					<img :src="common.imgUrl(info.img)" class='commodity' @error='error()'>
					<view class="fontWight ellipsis2 commodity_name"> {{info.product_name}}</view>
					<view class="size30 fontWight commodity_price">
						￥{{priceData()}}
						<view class="commodity_num">
							x{{info.number}}
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="!isFocus">
				<view class="whiteBg item">
					<view class="size32 fontWight title">
						选择服务类型
					</view>
					<view class="flex a-center typeItem" @click="refund('all')">
						<u-image class="icon" width="43rpx" height="43rpx"
							:src="common.imgUrl('/static/shop/userInfo/nav12.png')"></u-image>
						<view class="">
							我要退款(退货退款)
						</view>
					</view>
					<view class="flex a-center typeItem" @click="refund('only')">
						<u-image class="icon" width="43rpx" height="43rpx"
							:src="common.imgUrl('/static/shop/userInfo/nav12.png')"></u-image>
						<view class="">
							我要退款(仅退款)
						</view>
					</view>
				</view>
<!-- 				<view class="tips size26 color999">
					*申请售后请先务必关注“<text class="themeColor">杏一医疗用品</text>”公众号，以免收不
					到退换货操作信息，流失您的权益
				</view> -->
			</view>
			<!-- 退款信息 -->
			<view class="" v-else>
				<view class="whiteBg item">
					<view class="size32 fontWight title">
						退款信息
					</view>
					<view class="flex a-center j-between refundamount">
						<view class="size26">
							退款原因 <text class="themeColor">*</text>
						</view>
						<view class="color999 size24" @click="refundCause = true">
							{{refundInfo.reason}}
							<u-icon name="arrow-right" size="28"></u-icon>
						</view>
					</view>
					<view class="">
						<view class="flex a-center j-between refundamount">
							<view class="size26 ">
								退款金额 <text class="themeColor">*</text>
							</view>
							<view class="color999 size24">
								<u-input placeholder="请输入金额" v-model="refundInfo.price" type="number"
									input-align="right" disabled/>
							</view>
						</view>
						<!-- <view class="size22 color999 moneytips">
							可自行修改退款金额
						</view> -->
					</view>
				</view>
				<view class="whiteBg describe">
					<view class="size32 fontWight title">
						补充描述和凭证
					</view>
					<view class="">
						<u-input placeholder="补充描述,有助于商家更好的处理售后问题,最多200字" v-model="refundInfo.describes" type="textarea"
							:height="200" maxlength="200" />
						<u-upload max-count="3" :action="action" @on-uploaded="uploaded" upload-text="上传凭证(最多三张)">
						</u-upload>
					</view>
				</view>
			</view>
		</view>
		<!-- 是否关注公众号 -->
		<u-popup v-model="show" mode="center" width="400" border-radius="10" :closeable="true">
			<view class="center showModel">
				<view class="size26">
					关注公众号
				</view>
				<u-image class="qrCode" width="174rpx" height="174rpx"
					:src="common.imgUrl('/static/shop/common/officialAccounts.jpg')"></u-image>
				<view class="size26 color999">
					长按识别关注我们
				</view>
				<view class="size24 tips1">
					后续的售后消息会以公众号对话筐与您保持联系
				</view>
			</view>
		</u-popup>
		<!-- 退款原因 -->
		<u-popup v-model="refundCause" mode="bottom" :safe-area-inset-bottom="true" height="1000rpx" :closeable="true">
			<view class="refund">
				<view class="center refundTitle">
					请选择退款原因
				</view>
				<view class="itemBox" v-for="(item,index) in refundCauseList" :key="index" @click="changeCause(item)">
					{{item}}
				</view>
			</view>

		</u-popup>
		<view class=" footer">
			<view class="submit center size32" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		orderInfo,
		returnGoodsReason,
		returnGoods,
	} from "@/plugin/api/order.js";
	import {
		subscribe
	} from "@/plugin/api/index.js";
	export default {
		data() {
			return {
				maxPrice: 0,
				isFocus: false,
				show: false,
				refundCause: false,
				refundCauseList: [],
				refundInfo: {
					id: 0,
					infoId: 0,
					describes: "",
					price: 0,
					reason: "请选择",
					type: 0,
				},
				action: this.$base_url + "/index/common/uploadFile",
				info: {},
				img: [],
			};
		},
		onLoad(option) {
			this.refundInfo.id = parseInt(option.orderId);
			this.refundInfo.infoId = parseInt(option.productId);
			this.orderInfo(parseInt(option.orderId));
			this.returnGoodsReason();
		},
		methods: {
			error() {
				this.info.img = '/static/images/default.png'
			},
			subscribe() {
				subscribe().then((res) => {
					if (res.code === 0) {
						this.show = !res.data;
					}
				});
			},
			priceData() {
				let price = (
					(Number(this.info.unit_price) * 100 -
						Number(this.info.discount_amount) * 100) /
					100
				).toFixed(2);
				console.log(price, "price");
				return price;
			},
			returnGoodsReason() {
				returnGoodsReason().then((res) => {
					console.log(res, "res");
					this.refundCauseList = res.data.reason;
				});
			},
			orderInfo(id) {
				orderInfo({
					id,
				}).then((res) => {
					this.info = res.data.product.filter(
						(item) => item.id === this.refundInfo.infoId
					)[0];
					this.refundInfo.price = this.info.paid_price;
					this.maxPrice = this.refundInfo.price;
				});
			},
			submit() {
				let refundInfo = this.refundInfo,
					data = {};
				if (refundInfo.reason === "请选择") {
					uni.showToast({
						icon: "none",
						title: "请选择退款原因",
						duration: 2000,
					});
					return;
				}
				if (refundInfo.price*1 > this.maxPrice){
					uni.showToast({
						icon: "none",
						title: "请正确填写退款金额,不可大于" + this.maxPrice,
						duration: 2000,
					});
					return;
				}
				if (!refundInfo.describes) {
					uni.showToast({
						icon: "none",
						title: "请补充描述",
					});
					return;
				}
				if (!this.img.length) {
					uni.showToast({
						icon: "none",
						title: "请上传凭证",
					});
					return;
				}
				data = {
					...this.refundInfo,
					img: this.img,
				};
				returnGoods(data).then((res) => {
					if (res.code === 0) {
						uni.showToast({
							icon: "none",
							title: "提交成功，等待审核",
						});
						setTimeout(() => {
							uni.reLaunch({
								url: "/pagesShop/order/afterSaleList",
							});
						}, 2000);
					}
				});
			},
			refund(type) {
				if (type === "only") {
					this.refundInfo.type = 1;
				} else {
					this.refundInfo.type = 0;
				}
				// this.subscribe();
				this.isFocus = true;
			},
			uploaded(e) {
				let data = [];
				e.forEach((item) => {
					data.push(item.response.data.url);
				});
				console.log(data, "data");
				this.img = data;
			},
			changeCause(value) {
				this.refundInfo.reason = value;
				this.refundCause = false;
			},
		},
	};
</script>

<style scoped lang="scss">
	.main {
		background-color:#e2e2e2;
		padding-bottom: 600rpx;
		.content {
			padding: 28rpx;
		}
		
		.commodity_box {
			justify-content: space-between;
			.commodity_name{
				width: 350rpx;
				font-size: 28rpx;
				line-height: 1.5;
			}
			.commodity_num{
				opacity: .8;
				font-size: 28rpx;
			}
		}

		.commodity {
			width: 185rpx;
			height: 185rpx;
			object-fit: cover;
		}
		.commodity_price{
			text-align: right;
			font-size: 30rpx;
		}
		.moneytips{
			text-align:right;
			font-size: 28rpx;
			opacity: .9;
		}
		.item {
			background-color: #fff;
			padding: 18rpx;
			border-radius: 16rpx;
			margin-bottom: 16rpx;

			.typeItem {
				margin-top: 30rpx;
			}

			.title {
				margin-bottom: 24rpx;
			}

			.img {
				margin-right: 22rpx;
				border: 2rpx solid #f1f1f1;
			}

			.icon {
				margin-right: 20rpx;
			}
		}
		.refundamount{
			display: flex;
			justify-content: space-between;
			padding: 10rpx 0;
		}
		.describe {
			background-color: #fff;
			padding: 30rpx;
			margin-top: 16rpx;
			border-radius: 16rpx;
		}

		.tips {
			margin-top: 30rpx;
		}

		.showModel {
			padding: 37rpx;

			.qrCode {
				margin: 42rpx auto 30rpx;
			}

			.tips1 {
				padding-top: 50rpx;
				color: #d9d9d9;
			}
		}
		.themeColor{
			color: red;
			padding-left: 5rpx;
		}
		.footer {
			padding: 20rpx 30rpx;
			text-align: center;

			.issubmit {
				background-color: grey !important;
			}

			.submit {
				background-color: #ff6638;
				color: #ffffff;
				padding: 30rpx 0;
				font-weight: lighter;
				border-radius: 100rpx;
			}
		}

		.refund {
			padding: 30rpx;

			.itemBox {
				padding-top: 30rpx;
			}
		}
	}
</style>
