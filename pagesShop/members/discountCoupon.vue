<template>
	<view class="discountCoupon">
		<scroll-view scroll-y style="height: 100%; width: 100% background: #007AFF" @scrolltolower="onreachBottom"
			v-if="list.length">
			<view class="imgItem">
				<image :src="common.imgUrl('/static/images/coupon5.png')" mode="widthFix" class="topimg"></image>
				</u-image>
				<view class="count white fontWight size36">可用优惠券<br><br><br>{{ list.length }}张 </view>
				
			</view>
			<view class="couponList">

				<view class="coupon" v-for="item in list">
					<view class="couponDate">
						<view class="couponname">
							{{ item.product_scope ? "部分商品可用" : "通用券" }}
						</view>
						<view class="box" :style="{background: 'url(' + common.imgUrl('static/shop/userInfo/discountBg2.png') +')',
				  backgroundSize: '100% 100%',
				  padding: '30rpx 40rpx 30rpx'
				}">


							<view class="flex name j-start white size36 fontWight">
								{{ item.name }}
							</view>
							<view class="flex couponbox">
								<view class="couponnum">
									<view class="coupontip">
										<view> 可使用次数 : {{ item.available_times > 0 ? item.count + ' / ' + item.available_times : '无限次' }}</view>
									</view>
									<view class="coupontime">
											有效期 : {{ item.start_time }}-{{ item.end_time }}
									</view>
								</view>
								<view class="couponmoney_box">
									<view class="couponmoney_money">
										{{
										  item.type === 2
										    ? item.discount / 10 + "折"
										    : "￥" + item.cou_money
										}}
									</view>
									<view class="couponmoney_rule" v-if="item.type !== 2 && item.cou_man">
										满{{ item.cou_man }}可用
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="couponStatus fontWight" @click="creditPoints(item.id)">
						{{ editId === item.id ? "取消使用" : "立即使用" }}
					</view>
				</view>
			</view>
		</scroll-view>
		<u-empty v-else text="暂无优惠券" icon-size="180" font-size="30" margin-top="80"></u-empty>
	</view>
</template>

<script>
	import {
		couponList
	} from "@/plugin/api/personal.js";

	export default {
		data() {
			return {
				page: 1,
				limit: 20,
				whetherUse: false,
				list: [],
				isCreditPoints: false,
				info: 0,
				totalCount: 0,
				id: 0,
				filterCoupon: {},
				editId: 0,
				order_id:0,
			};
		},
		onLoad(option) {
			this.filterCoupon = this.$store.state.filterCoupon;
			if (this.filterCoupon.isPostage) {
				this.postageData();
			} else {
				this.discountsData();
			}
			if(option.order_id){
				this.order_id = option.order_id
			}
			if (option.use) {
				this.whetherUse = true;
			}
			this.couponList();
		},
		methods: {
			postageData() {
				this.postageInfo = this.$store.state.postageCoupon;
				if (this.postageInfo.id) {
					this.editId = this.postageInfo.id;
				}
			},
			//优惠券
			discountsData() {
				this.couponInfo = this.$store.state.discountCoupon;
				if (this.couponInfo.id) {
					this.editId = this.couponInfo.id;
				}
			},
			onreachBottom() {
				console.log(this.list.length, this.totalCount);
				if (this.list.length < this.totalCount) {
					this.page = this.page + 1;
					this.couponList();
					return;
				}
				uni.showToast({
					icon: "none",
					title: "到底了",
				});
			},
			skip() {
				if(this.order_id > 0){
					uni.redirectTo({
						url: "/pagesShop/order/order?order_id=" + this.order_id,
					});
					return
				}
				uni.redirectTo({
					url: "/pagesShop/order/index",
				});
			},
			submit() {
				if (this.id) {
					let info = this.list.filter((item) => item.id === this.id)[0];
					console.log(info, "info");
					let data = {
						id: this.id,
						oid: this.filterCoupon.oid,
						// price: info.cou_money,
						type: info.type,
						name: info.name,
						price: info.type === 2 ? info.discount : info.cou_money,
					};
					this.$store.commit(
						this.filterCoupon.isPostage ? "postageCoupon" : "discountCoupon",
						data
					);
					this.skip()
				} else {
					this.$store.commit(
						this.filterCoupon.isPostage ? "postageCoupon" : "discountCoupon", {}
					);
					this.skip()
				}
			},
			creditPoints(id) {
				if (this.whetherUse) {
					if (this.editId === id) {
						this.$store.commit(
							this.filterCoupon.isPostage ? "postageCoupon" : "discountCoupon", {}
						);
						this.skip()
					} else {
						this.id = id;
						this.submit();
					}
				} else {
					uni.switchTab({
						url: "/pages/shop/index",
					});
				}
			},
			couponList() {
				couponList({
					page: this.page,
					limit: this.limit,
					oid: this.filterCoupon.oid,
					query: this.filterCoupon,
				}).then((res) => {
					if (res.code === 0) {
						this.list = this.list.concat(res.data.data);
						this.totalCount = res.data.totalCount;
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
	@import "@/pagesShop/scss/member/discountCoupon.scss";

	.fontcolor {
		color: #fff;
	}
	.imgItem{
		background: linear-gradient(135deg, #fb6c66 0%, #ff9d76 100%);
		height: 320rpx;
		position: relative;
	}
	.couponDate {
		position: relative;
		background: linear-gradient(135deg, #fb6c66 0%, #ff9d76 100%) !important;
	}
	.topimg{
		width: 400rpx;
		position: absolute;right:50rpx;top: 50rpx;
	}
	.couponname {
		background-color: #FF7F36;
		right: 0;
		color: #fff;
		font-size: 30rpx;
		padding: 5rpx 30rpx;
		top: 20rpx;
		border-top-left-radius: 500rpx;
		border-bottom-left-radius: 500rpx;
		position: absolute;
	}
	.couponbox{
		justify-content: space-between;
		position: absolute;
		top: 40%;
		width: 100%;
		align-items: center;
	}
	.coupontip{
		display: flex;
		color: #fff;
		font-size: 30rpx;
		padding-bottom: 30rpx;
	}
	.coupontime{
		color: #fff;
		opacity: .9;
		font-size: 30rpx;
	}
	.couponmoney_money{
		color: #fff;
		font-size: 50rpx;
		font-weight: bold;
	}
	w
	.couponmoney_rule{
		color: #fff;
		opacity: .9;
		font-size: 24rpx;
	}
	.box{
		padding: 0 !important;
	}
</style>
