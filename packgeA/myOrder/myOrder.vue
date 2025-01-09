<template>
	<view class="box">
		<nav-tab class="nav-tab" :navTab="navTab" :activeIndex.sync="activeIndex" @tabEvent="tabEvent" />
		<view class="whiteBox" v-for="(item, index) in navTab[activeIndex].list" :key="index"
			@click="orderDetails(item.id)">
			<view class="classification">{{ common.courseType(item.type) }}课程</view>
			<view class="bgWhite" style="border-radius: 12rpx">
				<view class="flex space-between u-f-ac top">
					<view class="orderName">{{ item.order_number }}</view>

					<view class="status" v-if="item.status == 1 && item.service_refund_status < 0 && item.type != 3">
						{{type1[item.is_teaching] }}
					</view>
				</view>
				<view class="twoBox flex">
					<view class="imgBox">
						<image class="img" :src="common.imgUrl(item.course.img)" mode="widthFix"></image>
					</view>
					<view class="rightBox">
						<view class="title">{{ item.course.name }}</view>
						<view class="priceBox space-between u-f-ac">
							<view>
								<text class="price" v-if="item.is_gratis == 0">
									￥{{ (item.price * item.positive_class) / 100 }}
								</text>
								<text class="price" v-else-if="item.is_gratis == 1">免费</text>
								<!-- <text class="originalPrice">原价{{item.market_price/100}}元</text> -->
							</view>
							<view>
								<view class="status" v-if="item.service_refund_status == -1">
									{{
                    item.payment_status === 0
                      ? "待付款"
                      : item.payment_status === 1
                      ? "已付款"
                      : "已取消"
                  }}
								</view>
								<view class="status" v-else>
									{{
                    item.service_refund_status == 0 ? "申请退课中" : "退课成功"
                  }}
								</view>
							</view>
							<!-- <view class="number">X1</view> -->
						</view>
						<view class="orderTime">订单时间：{{ item.ctime }}</view>
					</view>
				</view>

				<view class="operation space-between u-f-ac">
					<view class="classIn">课节 {{ item.class_count }}/{{
              item.positive_class + item.give_class
            }}</view>
					<view class="flex">
						<view class="cancel buttonBox" v-if="item.payment_status === 0"
							@click.stop="cancelOrder(item.id)">
							取消订单
						</view>
						<!-- 				  <view class="cancel  buttonBox" v-if="item.status===2" @click.stop="cancelPayment">申请退票</view> -->
						<view class="payment buttonBox" v-if="item.payment_status === 0"
							@click.stop="orderDetails(item.id)">
							立即付款
						</view>
						<view class="green buttonBox" v-if="item.payment_status === 1" @click.stop="goStudy(item)">
							立即学习
						</view>
						<!-- 				  <view class="green   buttonBox" v-if="item.status===3" >立即回顾</view>
				 					  <view class="workOut buttonBox" v-if="item.status===4">排课中</view> -->
					</view>
				</view>
			</view>
		</view>
		<u-empty v-if="navTab[activeIndex].list.length === 0" text="暂无课程订单" icon-size="180" font-size="30"
			class="empty-u" />
	</view>
</template>
<script>
	import navTab from "@/components/nav-tab";
	export default {
		components: {
			navTab,
		},
		data() {
			return {
				activeIndex: 0,
				navTab: [{
						name: "全部",
						page: 1, //第几页
						totalCount: 0, //总数
						list: [], //订单数据
					},
					{
						name: "未付款",
						page: 1, //第几页
						totalCount: 0, //总数
						list: [], //订单数据
					},
					{
						name: "已付款",
						page: 1, //第几页
						totalCount: 0, //总数
						list: [], //订单数据
					},
					{
						name: "已取消",
						page: 1, //第几页
						totalCount: 0, //总数
						list: [], //订单数据
					},
				],
				show: false,
				limit: 5, //每页5条
				type1: ["待排课", "学习中", "已结束", "已退款"],
			};
		},
		mounted() {
			this.info();
		},
		onReachBottom() {
			const pageNum = this.navTab[this.activeIndex].totalCount / this.limit;
			if (this.navTab[this.activeIndex].page <= pageNum) {
				this.navTab[this.activeIndex].page++;
				this.getOrder();
			}
		},
		onPullDownRefresh() {
			this.navTab[this.activeIndex].page = 1;
			this.navTab[this.activeIndex].list = [];
			this.getOrder();
		},
		methods: {
			info() {
				this.navTab = [{
						name: "全部",
						page: 1, //第几页
						totalCount: 0, //总数
						list: [], //订单数据
					},
					{
						name: "未付款",
						page: 1, //第几页
						totalCount: 0, //总数
						list: [], //订单数据
					},
					{
						name: "已付款",
						page: 1, //第几页
						totalCount: 0, //总数
						list: [], //订单数据
					},
					{
						name: "已取消",
						page: 1, //第几页
						totalCount: 0, //总数
						list: [], //订单数据
					},
				];
				this.getOrder(0);
				this.getOrder(1);
				this.getOrder(2);
				this.getOrder(3);
			},
			tabEvent(index) {
				this.activeIndex = index;
				let i = 0;
				let List = document.getElementsByClassName("nav-one");
				for (let i = 0; i < List.length; i++) {
					if (i == index) {
						List[i].className += " choosewhich";
					} else {
						List[i].className = "nav-one";
					}
				}
			},
			cancelPayment() {
				this.show = true;
			},
			//取消订单
			cancelOrder(id) {
				uni.showModal({
					title: "提示",
					content: "确定要取消订单吗？",
					success: (res) => {
						this.$axios({
							url: this.$url[41],
							data: {
								id,
							},
						}).then((res) => {
							if (res.code == 0) {
								this.$u.toast("取消订单成功");
								this.info();
							}
						});
					},
				});
			},

			orderDetails(id) {
				uni.navigateTo({
					url: "/packgeA/orderDetails/orderDetails?id=" + id,
				});
			},

			//立即付款
			payment(id) {
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
				// if(payment === PAYMENT.WECHAT){
			},

			//立即学习
			goStudy(item) {

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
					this.$axios({
						url: this.$url[13],
						data:{
							id:item.id
						}
						}).then((res) => {
							if(res.msg=='未排课'){
								uni.showToast({
									title:'未排课',
									icon:"none"
								})
								
							}else{
								uni.navigateTo({
									url: "/packgeB/liveDetails/liveDetails?id=" + item.id,
								});
							}
						})

					
				}
			},

			// 获取订单列表
			getOrder(activeIndex = -1) {
				activeIndex = activeIndex === -1 ? this.activeIndex : activeIndex;
				this.$axios({
					url: this.$url[11],
					data: {
						page: this.navTab[activeIndex].page,
						limit: this.limit,
						query: {
							payment_status: activeIndex - 1,
						},
					},
				}).then((res) => {
					if (res.code == 0) {
						this.navTab[activeIndex].totalCount = res.data.totalCount;
                        res.data.data.forEach(item => {
                        	if (item.payment_status == 2) {
                        		item.is_teaching = 3
                        	} else {
                        		if (item.is_teaching != 0) {
                        			if (item.class_count >= item.positive_class + item.give_class) {
                        				item.is_teaching = 2
                        			} else {
                        				item.is_teaching = 1
                        			}
                        		}
                        	}
                        })
						if (this.navTab[activeIndex].page === 1) {
							this.navTab[activeIndex].list = res.data.data;
						} else {
							this.navTab[activeIndex].list = [
								...this.navTab[activeIndex].list,
								...res.data.data,
							];
						}
						uni.stopPullDownRefresh();
					}
				});
			},
		},
	};
</script>

<style>
	page {
		background: #f9f9f9;
	}
</style>

<style lang="scss" scoped>
	/deep/ .example-body{
		width: 100%;
		position: initial !important;
		top: 0%;
		background-color: white;
		z-index: 999;
	}
	.empty-u {
		height: 1000rpx;
	}
    /deep/ .u-empty {
       height: 1000rpx !important;
   }
	.box {
		padding: 0rpx 0;
	}

	.top {
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}

	.whiteBox {
		border-radius: 5px;
		// background: #FFFFFF;
		margin: 30rpx 24rpx 17rpx 27rpx;

		.orderName {
			font-size: 26rpx;
			color: #666666;
		}

		.classification {
			font-size: 17px;
			font-weight: bold;
			color: #2d2d2d;
			padding: 22rpx 0rpx;
		}

		.status {
			font-size: 26rpx;
			color: #ff6638;
			font-family: Source Han Sans SC;
			font-weight: 400;
		}

		.twoBox {
			margin-top: 30rpx;
			padding-bottom: 28rpx;
			padding-right: 4rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #ebeaea;

			.imgBox {
				width: 210rpx;
				height: 140rpx;
				margin-left: 20rpx;
				margin-right: 17rpx;
				overflow: hidden;

				.img {
					width: 100%;
				}
			}

			.rightBox {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					width: 390rpx;
					font-size: 32rpx;
					font-family: Source Han Sans SC;
					font-weight: bold;
					color: #2d2d2d;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
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
					text-decoration: line-through;
				}

				.number {
					font-size: 28rpx;
					font-family: Source Han Sans SC;
					font-weight: 400;
					color: #2d2d2d;
				}

				.orderTime {
					font-size: 20rpx;
					font-family: Source Han Sans SC;
					font-weight: 400;
					color: #666666;
				}
			}
		}

		.operation {
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-bottom: 20rpx;
			margin-top: 17rpx;

			.classIn {
				font-size: 26rpx;
				font-family: Source Han Sans SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 0.87);
			}

			.cancel {
				background: #ffffff;
				border: 1px solid #989898;
				color: #989898;
			}

			.payment {
				background: #ffffff;
				border: 1px solid #ff6638;
				color: #ff6638;
			}

			.green {
				background: #ff6638;
				border: 1px solid #ff6638;
				color: white;
			}

			.workOut {
				background: #fea406;
				border: 1px solid #fea406;
				color: white;
			}
		}
	}

	.buttonBox {
		width: 151rpx;
		height: 57rpx;
		text-align: center;
		line-height: 57rpx;
		border-radius: 12rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		margin-left: 23rpx;
	}

	.priceBox {
		padding: 0 40rpx 0 0;
	}
</style>
