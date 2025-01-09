<template>
	<view class="main">
		<view class="u-search-box">
			<u-search placeholder="请输入您要搜索的内容" @custom="search" v-model="searchText"></u-search>
		</view>
		<scroll-view scroll-y style="height: 100%; width: 100%;background: #e1e1e1" @scrolltolower="onreachBottom"
			v-if="afterSaleList.length">
			<view class="content">
				<view style="height: 1rpx;">

				</view>
				<view class="whiteBg item afterSale" v-for="(item,index) in afterSaleList" :key="index">
					<view style="display: flex;">
					<view class="afterSalestorename" style="width: 50%;">
						{{item.oid===0?'自营':item.org.name}}
					</view>
					<view class="status center size20 color999" style="width: 50%;">
					
						<!-- 0:申请中,1:已通过,未填写快递,2:未通过,3:已填写快递单号,4:已退款,5:拒绝退款,6:已取消 -->
						{{item.status === 0 ?
							'申请中' : item.status === 1 ?
							'待填写快递单号' : item.status === 2 ?
							'未通过' : item.status === 3 ? 
							'待退款' : item.status === 4 ? 
							'已退款' : item.status === 5 ? 
							'拒绝退款' : '已取消'
							
						}}
					
					</view>
					</view>
					<view class="flex j-between flex1">
						<img :src="common.imgUrl(item.product.img)" alt="" class='afterSaleimg' @error='error(index)'>
						<view class="">
							<view class="fontWight ellipsis2 afterSaletitle">{{item.product.product_name}}</view>
							<view class="size24 color999 afterSalenum">
								购买数量：{{item.product.number}}
							</view>
							<view class="size24 fontWight afterSaleprice">
								退款：￥{{item.price}}
							</view>
						</view>
					</view>
					<view class="themeColor forbid" v-if="item.status === 2 || item.status === 5">
						未通过原因：{{item.fail_reason || item.refund_reason}}
					</view>
					
					<view class="agree center size24 themeColor" :class="status && 'themeColor'" @click="skip(item)"
						v-if="item.status === 1">
						填写地址和快递单号
					</view>
				</view>
			</view>
		</scroll-view>
		<u-empty v-else text="您还没有相关的订单" icon-size="180" font-size="30" margin-top="80">
		</u-empty>
	</view>
</template>

<script>
	import {
		afterSaleList
	} from "@/plugin/api/order.js";
	export default {
		data() {
			return {
				
				type: "",
				page: 1,
				limit: 5,
				query: {},
				totalCount: 0,
				status: 1,
				searchText: "",
				afterSaleList: [],
			};
		},
		onShow() {
			this.page=1
			this.afterSaleList=[]
			this.afterSaleData();
		},
		methods: {
			error(i) {
				this.afterSaleList[i].product.img = '/static/images/default.png'
			},
			onreachBottom() {
				if (this.afterSaleList.length < this.totalCount) {
					this.page = this.page + 1;
					this.afterSaleData();
					return;
				}
				uni.showToast({
					icon: "none",
					title: "到底了",
				});
			},
			afterSaleData() {
				uni.showLoading({
					title: "加载中",
				});
				afterSaleList({
						page: this.page,
						limit: this.limit,
						query: this.query,
					})
					.then((res) => {
						uni.hideLoading();
						console.log(res, "res");
						this.afterSaleList = this.afterSaleList.concat(res.data.data);
						this.totalCount = res.data.totalCount;
					})
					.catch(() => {
						uni.hideLoading();
					});
			},
			search(value) {
				if (value != '') {
					this.type = "search";
					this.query = {
						search: value,
					};
					this.afterSaleList = []
				} else {
					this.query = {};
				}
				this.afterSaleData();
			},
			skip(item) {
				uni.navigateTo({
					url: "/pagesShop/order/returnCommodity?orderId=" +
						item.order_id +
						"&infoId=" +
						item.order_info_id,
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.main {
		height: calc(100vh - var(--window-top));

		.forbid {
			margin-top: 40rpx;
		}

		.u-empty {
			height: auto;
		}

		.u-search-box {
			padding: 18rpx 30rpx 18rpx;
		}

		.u-search-inner {
			background-color: rgb(234, 234, 234);
			border-radius: 100rpx;
			display: flex;
			align-items: center;
			padding: 10rpx 16rpx;
		}

		.afterSalestorename {
			padding-bottom: 20rpx;
			color: #FF7F36;
			font-weight: bold;
			font-size: 30rpx;

		}

		.u-search-text {
			font-size: 26rpx;
			color: $u-tips-color;
			margin-left: 10rpx;
		}

		.afterSalenum {
			font-size: 26rpx;
			padding: 5rpx 0;
			opacity: .8;
		}

		.afterSaletitle {
			font-size: 30rpx;
			line-height: 1.5;
		}

		.afterSaleprice {
			font-size: 28rpx;
			padding-top: 5rpx;
		}

		.afterSaleimg {
			width: 184rpx;
			height: 184rpx;
			object-fit: cover;
			padding-right: 20rpx;
		}

		.content {
			padding: 0 28rpx 28rpx;
			background-color: #e1e1e1;
		}

		.afterSale {
			background-color: #fff;
		}

		.item {
			padding: 30rpx;
			border-radius: 16rpx;
			margin-top: 22rpx;

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

			.status {
				background: #fcfcfc;
				border-radius: 8rpx;
				text-align: right;
				font-size: 18rpx;
				color: #999;
				line-height: 2;
				// padding: 28rpx 0;
				// margin-top: 35rpx;
			}

			.agree {
				width: 100%;
				margin-left: 0%;
				color: #FF7F36;
				text-align: center;
				border: 2rpx solid #FF7F36;
				border-radius: 100px;
				padding: 20rpx 0;
				margin-top: 24rpx;
			}
		}
	}
</style>
