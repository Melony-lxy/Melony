<template>
	<view class="main">
		<view class="top whiteBg">
			<view class="item" v-for="item in info.product" :key="item.id">
				<view class="tips" v-if="item.type==='1'">
					赠品
				</view>
				<view class="tips" v-else-if="item.type==='2'">
					加购
				</view>
				<view class="tips" v-else-if="item.type==='3'">
					满赠
				</view>
				<view class="flex " @click="skip('/pagesShop/commodity/detail?id=' + item.product_id,'forthright')">
					<image   class="img flex1" mode="aspectFill" style="width: 185rpx;height: 185rpx;border-radius: 12rpx;" :src="common.imgUrl(item.img)"></image>
					<view class="flex flex-column j-between title">
						<view class="fontWight ellipsis2"> {{item.product_name}}</view>
						<view class="size24 color999 ellipsis2 describe">
							{{specificationsStatus(item)}}
						</view>
					</view>
					<view class="priceOrNumber">
						<view class="size32 themeColor priceStyle xprice" v-if="item.type!=='1'">￥{{item.unit_price }}
						</view>
						<view class="size24 flex j-end color666 xprice"> x{{item.number}} </view>
					</view>
				</view>
				<view class="flex j-end">

					<view class="flex"
						v-if="(info.status===2 || info.status===3 || info.status===5) && item.offline_status === 0">
						<view class="flex "
							v-if="item.type!=='1' && item.type!=='3' && item.afterStatus!==4 && item.afterStatus!==7 && info.status === 3">
							<text class="afterSaleText " @click="skip(item)">
								<!-- -1:未申请,0:申请中,1:已通过,未填写快递,2:未通过,3:已填写快递单号,4:已退款,5: 拒绝退款,6:已取消,7:结束售后 -->
								{{item.afterStatus === -1  && info.status === 3?
							'申请售后' : item.afterStatus === 0 ?
							'申请中' : item.afterStatus === 1 ?
							'待填写快递单号' : item.afterStatus === 2 ?
							'未通过' : item.afterStatus === 3 ? 
							'待退款' :  item.afterStatus === 5 &&
							'拒绝退款'
							
						}}
							</text>
							<text class="afterSaleText " @click="cancel(item.id)"
								v-if="item.type!=='1' && (item.afterStatus===0 || item.afterStatus===1 || item.afterStatus===3)">
								<!-- -1:未申请,0:申请中,1:已通过,未填写快递,2:未通过,3:已填写快递单号,4:已退款,5: 拒绝退款,6:已取消,7:结束售后 -->
								取消退款
							</text>
						</view>
					</view>

				</view>
			</view>
			<view class="flex j-between price">
				<view class="size26 fontWight">
					实付款
				</view>
				<view class="themeColor size30 xprice">
					￥{{totalPrice}}
				</view>
			</view>
		</view>
		<view class="content whiteBg">
			<view class="size30 fontWight ">
				订单信息
			</view>
			<view class="flex info">
				<view class="size26 fontWight label">
					店铺名：
				</view>
				<view class="size26 color999 flex1" v-if="info.org">
					{{info.oid===0 ? "自营":info.org.name}}
				</view>
			</view>
			<view class="flex info">
				<view class="size26 fontWight label">
					收货信息：
				</view>
				<view class="size26 color999 flex1" :class="{is_pickup:detail.is_pickup != '0'}">
					{{ detail.is_pickup == "0" ? detail.personalInfo : '自提' }}
				</view>
			</view>
			<view class="flex info a-center">
				<view class="size26 fontWight label">
					订单编号：
				</view>
				<view class="size26 color999 flex1">
					{{detail.orderNumber}}
				</view>
				<view class="color999 flex1 copyText" style="margin-top: 6rpx;">
					<!-- <button type="default" size="mini">复制</button> -->
					<u-button size="mini" class="custom-style" @click="copyText(detail.orderNumber)">复制</u-button>
				</view>
			</view>
			<view class="flex info">
				<view class="size26 fontWight label">
					交易方式：
				</view>
				<view class="size26 color999 flex1">
					{{paymentList[info.payment]}}
				</view>
			</view>
			<view class="flex info" v-if="info.out_trade_no">
				<view class="size26 fontWight label">
					交易单号：
				</view>
				<view class="size26 color999 flex1" >
					{{info.out_trade_no}}
				</view>
				<view class="color999 flex1 copyText" style="margin-top: -8rpx;">
					<!-- <button type="default" size="mini">复制</button> -->
					<u-button size="mini" class="custom-style" @click="copyText(info.out_trade_no)">复制</u-button>
				</view>
			</view>
			<view class="flex info">
				<view class="size26 fontWight label">
					使用积分：
				</view>
				<view class="size26 color999 flex1">
					{{detail.integral}}
				</view>
			</view>

			<view class="flex info">
				<view class="size26 fontWight label">
					下单时间：
				</view>
				<view class="size26 color999 flex1">
					{{detail.ctime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		orderInfo,
		cancelReturnGoods,
		returnGoods,
	} from "@/plugin/api/order.js";
	export default {
		data() {
			return {
				paymentList: ['线下支付','微信','支付宝'],
				info: {},
				totalPrice: 0,
				detail: {},
				id: 0,
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.orderInfo();
		},
		methods: {
			copyText(value) {
				const oInput = document.createElement("input");
				oInput.value = value;
				document.body.appendChild(oInput);
				oInput.select();
				document.execCommand("Copy");
				oInput.style.display = "none";
				document.body.removeChild(oInput);
				uni.showToast({
					title: "复制成功",
				});
			},
			callUp(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
				});
			},
			cancel(id) {
				console.log(this.info);
				uni.showModal({
					title: "是否确认取消退款申请？",
					success: (res) => {
						if (res.confirm) {
							cancelReturnGoods({
								id: this.info.id,
								infoId: id,
							}).then((res) => {
								if (res.code === 0) {
									uni.showToast({
										icon: "none",
										title: "已取消退款申请",
									});
									this.orderInfo();
								}
							});
						}
					},
				});
			},
			priceChange(item) {
				// return parseInt(item.unit_price*100 - item.discount_amount*100)/100
				return (
					parseInt(
						(item.total_price * 100 * (item.total_price * 100)) /
						(item.total_price * 100 +
							this.info.integral_amount * 100 +
							this.info.coupons_amount * 100)
					) /
					100 /
					item.number
				);
			},
			skip(item, type) {
				console.log(item, "item");
				if (type) {
					uni.navigateTo({
						url: item,
					});
				} else {
					// -1:未申请,0:申请中,1:已通过,未填写快递,2:未通过,3:已填写快递单号,4:已退款,5:已取消,6:结束售后
					if (item.afterStatus === -1 || item.afterStatus === 6) {
						uni.navigateTo({
							url: "/pagesShop/order/afterSale?orderId=" +
								this.info.id +
								"&productId=" +
								item.id,
						});
					}
					// if (item.afterStatus === 0 || item.afterStatus === 1 || item.afterStatus === 3)
					if (item.afterStatus === 1) {
						uni.redirectTo({
							url: "/pagesShop/order/returnCommodity?orderId=" +
								item.order_id +
								"&infoId=" +
								item.id,
						});
					}
				}
			},
			specificationsStatus(item) {
				return item.specifications.map((item) => item.name).join("/");
			},
			orderInfo() {
				orderInfo({
					id: this.id,
				}).then((res) => {
					if (res.code === 0) {
						this.info = res.data;
						let personalInfo =
							res.data.name +
							res.data.phone +
							res.data.province +
							res.data.city +
							res.data.district +
							res.data.details;
						let orderNumber = res.data.order_number;
						let integral = res.data.integral;
						let ctime = res.data.ctime;
						let is_pickup = res.data.is_pickup;
						
						let data = {
							personalInfo,
							orderNumber,
							integral,
							ctime,
							is_pickup
						};
						this.totalPrice = res.data.total_price;
						this.detail = data;
					} else {
						uni.showToast({
							icon: "error",
							title: res.msg,
						});
					}
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	@import "@/pagesShop/scss/order/detail.scss";
	.label{
		width: 24% !important;
	}
	.is_pickup{
		color: $project-color !important;
		font-weight: bold !important;
	}
</style>
