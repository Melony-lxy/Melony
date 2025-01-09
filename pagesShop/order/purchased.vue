<template>
	<view class="main">
		<scroll-view scroll-y style="height: 100%; width: 100%" @scrolltolower="onreachBottom">
			<view class="content">
				<view class="commodity whiteBg" v-for="(item, index) in commodityList" :key="index">
					<view class="flex a-center commodityInfo">
						<view class="maincheck">
							<checkbox-group @change='pitchOn($event,index)'>
								<label>
									<checkbox :checked="item.status" class="check"/>
								</label>
							</checkbox-group>
						</view>
						<view class="flex a-center" @click="skip(item.id)">
							<view class="left">
								<u-image width="154rpx" height="154rpx" :src="common.imgUrl(item.img)">
								</u-image>
							</view>
							<view class="right">
								<view class="fontWight commodityTitle">
									{{ item.name }}
								</view>
								<view class="flex j-between a-center">
									<view class="specification color999">
										{{ specificationsStatus(item) }}
									</view>
									<view class="">
										{{ number(item) }}
									</view>
								</view>
								<view class="flex a-center">
									<view class="themeColor size32 fontWight">
										{{ priceChange(item) }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="footer whiteBg center flex">
			<!-- <view class=" back"  @click="skip">
				<view class=" center"> 返回 </view>
			</view> -->
			<view class="purchased flex1" @click="addPurchased">
				<view class="center"> 确定 </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getList,
		changeCart,
		deleteCart,
		listJson,
		additionalPurchaseList,
		addCart,
	} from "@/plugin/api/product.js";
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		components: {},
		data() {
			return {
				commodityList: [],
				totalCount: 0,
				page: 1,
				limit: 10,
				query: {},
				// 购物列表
				purchasedList: [],
				commodityInfo: {},
				addPurchasedList: [],
				checkedList: [],
				purchasedSource: {
					type: 'detail'
				},
				isPc: true
			};
		},
		onShow() {
			// #ifdef H5
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				this.isPc = false;
			} else {
				this.isPc = true;
			}
			// #endif
			this.addPurchasedList = this.$store.state.addPurchasedList;
			this.purchasedSource = this.$store.state.purchasedSource;
			this.list();
		},

		methods: {
			number(data) {
				if (this.addPurchasedList.length) {
					let list = this.addPurchasedList.filter(
						(item) => item.product_id === data.id
					);
					console.log(list, "list");
					return list.length ? "x " + list[0].number : "";
				}
				return "";
			},
			priceChange(data) {
				console.log(data, this.addPurchasedList, 'data')
				let flag = this.addPurchasedList.some(item => item.product_id === data.id)
				if (this.addPurchasedList.length && flag) {
					let list = this.addPurchasedList.filter(
						(item) => item.product_id === data.id
					);
					return list.length ? list[0].specificationsStatus.price : "";
				}
				if (data.price === data.original_price) {
					return "￥" + data.price
				} else {
					return "￥" + data.price + "~" + data.original_price;
				}
			},
			specificationsStatus(data) {
				if (this.checkedList.indexOf(data.id) > -1) {
					if (this.addPurchasedList.length) {
						let list = this.addPurchasedList.filter(
							(item) => item.product_id === data.id
						);
						return list.length ?
							list[0].specificationsStatus.name
							.map((item) => item.name)
							.join("/") :
							"请选择规格";
					}
					return "请选择规格";
				}
				return "";
			},
			skip(id) {
				uni.navigateTo({
					url: "/pagesShop/commodity/detail?id=" + id + "&purchased=true",
				});
			},
			onreachBottom() {
				if (this.commodityList.length < this.totalCount) {
					this.page = this.page + 1;
					this.list();
					return;
				}
				uni.showToast({
					icon: "none",
					title: "到底了",
				});
			},
			showCategory(id) {
				this.isShowCategory = true;
			},
			list() {
				uni.showLoading({
					title: "加载中",
				});
				additionalPurchaseList({
						page: this.page,
						limit: this.limit,
						query: this.purchasedSource.type === 'order' ? {
							oid: this.purchasedSource.oid,
							productId: this.commodityList.length ?
								this.commodityList[this.commodityList.length - 1].id : 0,
						} : {
							productId: this.commodityList.length ?
								this.commodityList[this.commodityList.length - 1].id : 0,
						},
					})
					.then((res) => {
						if (res.code == 0) {
							let data = res.data.data.map((item) => {
								item.status = false;
								return item;
							});
							this.commodityList = this.commodityList.concat(res.data.data);
							this.totalCount = res.data.totalCount;
							// 加购后回显
							if (this.addPurchasedList.length) {
								this.checkedList = this.addPurchasedList.map(
									(item) => item.product_id
								);
								this.checkedList.forEach((item) => {
									this.commodityList.map((j) => {
										if (item === j.id) {
											j.status = true;
										}
										return j;
									});
								});
							}
							uni.hideLoading();
						}
					})
					.catch(() => {
						uni.hideLoading();
					});
			},
			pitchOn(detail,idx) {
				let e={}
				if(detail.detail.value.length==1){
					e={
						value:true,
						name:this.commodityList[idx].id
					}
				}else{
					e={
						value:false,
						name:this.commodityList[idx].id
					}
				}
				if (!e.value && this.checkedList.indexOf(e.name) > -1) {
					let data = this.addPurchasedList.filter(
						(item) => item.product_id !== e.name
					);
					this.addPurchasedList = data;
					this.$store.commit("addPurchasedList", data);
					this.checkedList = this.checkedList.filter((item) => item !== e.name);
				} else {
					this.checkedList.push(e.name);
				}
			},
			addPurchased() {
				let flag = this.checkedList.every((item) => {
					return this.addPurchasedList.some((j) => item === j.product_id);
				});

				if (!flag) {
					uni.showToast({
						icon: "none",
						title: "请选择商品规格",
					});
					return;
				}
				if (this.purchasedSource.type === 'order') {
					uni.redirectTo({
						url: "/pagesShop/order/index",
					});
				} else if (this.purchasedSource.type === 'detail') {
					this.addPurchasedList.forEach(item => {
						let specifications = item.specificationsStatus.name.map(
							(item) => item.name
						);
						let data = {
							product_id: item.product_id,
							number: item.number,
							specifications,
							gift: [],
							type: 2,
						}
						addCart(data).then((res) => {
							if (res.code == 0) {
								// uni.showToast({
								// 	icon: "none",
								// 	title: "添加成功",
								// 	duration: 2000,
								// });
								console.log(111)
							} else {
								// uni.showToast({
								// 	icon: "none",
								// 	title: "添加失败：" + res.msg,
								// 	duration: 2000,
								// });
								console.log(222)
							}
						});
					})
					this.$store.commit("addPurchasedList", []);
					uni.showToast({
						icon: "none",
						title: "添加成功",
						duration: 2000,
					});
					uni.navigateBack()
				} else {
					uni.switchTab({
						url: "/pages/shop/index"
					})
				}


			},
		},
	};
</script>
<style lang='scss'>
	.uni-checkbox-input{
		border-radius: 50% !important;
	}
</style>
<style lang="scss" scoped>
	@import "@/pagesShop/scss/shopping.scss";

	.pc {
		padding-bottom: 200rpx;
	}

	.mobile {
		padding-bottom: 100rpx;
	}

	.main {
		height: calc(100vh - var(--window-top));
		background-color: #FAFAFA;
		.commodityTitle{
			padding-top: 10rpx;
			line-height: 1.5;
		}
		.maincheck{
			margin-right: 10rpx;
		}
		.content {
			padding-top: 0;
			margin-top: 0;
			padding-bottom: 100rpx;
		}

		.left {
			width: 154rpx;
			margin-right: 24rpx;
		}

		.right {
			wdith: 100%;
		}

		.footer {
			bottom: 0;
			background-color: #ff7f36;
			color: #ffffff;
			padding: 0;

			.back {
				padding: 20rpx;
				width: 30%;
				background-color: #ff7f36;
			}

			.purchased {
				padding: 20rpx;
				background-color: #ff5d00;
			}
		}
	}
</style>
