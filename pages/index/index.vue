<template>
	<view class="index">
		<view class="indexbg" style="height: 520rpx;">
			<view class="select">
				<view class="deyy">
					千芒商汇
				</view>
				<view class="selectOutBox">
					<view class="selectBox" @click="classify">
						<image src="@/static/deyy/select.png" mode="heightFix"></image>
						<view class="">
							搜索关键字
						</view>
					</view>
					<image src="../../static/deyy/list.png" mode="heightFix" @click.stop="goList"></image>
				</view>
			</view>
			<view class="swiper">
				<u-swiper :list="bannerList" height="300" @click="swiperClick" style="border-radius: 20rpx;"></u-swiper>
			</view>
			<view class="" style="height:38rpx;">

			</view>
		</view>
		<view class="" style="margin: -80rpx auto 10rpx auto;">
			<u-notice-bar :list="list" type="primary"></u-notice-bar>
		</view>

		<swiper class="swiper" indicator-color="#E9E9E9" indicator-active-color="#FEA406">
			<swiper-item class="">
				<view class="classification">
					<view @click="getUrl('/packgeB/UserAgreement/UserAgreement?name=商会介绍')">
						<image src="@/static/index/icon1.png" mode="widthFix"></image>
						<view>商会介绍</view>
					</view>
					<view @click="getUrl('/packgeB/my/activateNowContent')">
						<image src="@/static/index/icon2.png" mode="widthFix"></image>
						<view>会员权益</view>
					</view>
					<view @click="getUrl('/packgeB/my/activateNowContent')">
						<image src="@/static/index/icon3.png" mode="widthFix"></image>
						<view>入会申请</view>
					</view>
					<view @click="getUrl('/pagesShop/member/member')">
						<image src="@/static/index/icon4.png" mode="widthFix"></image>
						<view>会员库</view>
					</view>
					<view @click="getUrl('/pages/shop/index',true)">
						<image src="@/static/index/icon5.png" mode="widthFix"></image>
						<view>千芒商城</view>
					</view>
					<view @click="getUrl('/pages/activity/activity',true)">
						<image src="@/static/index/icon6.png" mode="widthFix"></image>
						<view>活动沙龙</view>
					</view>
					<view @click="getUrl('/pages/case/case',true)">
						<image src="@/static/index/icon7.png" mode="widthFix"></image>
						<view>动态资讯</view>
					</view>
					<view @click="getUrl('/pages/my/my',true)">
						<image src="@/static/index/icon8.png" mode="widthFix"></image>
						<view>个人中心</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="activity">
			<template v-if="activityList.length != 0">
				<view class="" v-for="(item,index) in activityList" :key="index">
					<view class="activityBox" @click="goActivity(item.id)">
						<view class="activityInner">
							<image :src="common.imgUrl(item.img[0])" mode="aspectFill" class="activityImg"></image>
							<view class="activityTitle">
								{{ item.category }}
							</view>
							<view class="activityTop">
								<view class="">
									{{item.name}}
								</view>
								<view class="">
									时间：{{ item.start_time }} ~ {{ item.end_time }}
								</view>
							</view>
							<image src="@/static/activity/begin.png" mode="widthFix" v-if='item.status == 1'
								class="activityType">
							</image>
							<image src="@/static/activity/disbegin.png" mode="widthFix" v-else-if='item.status == 0'
								class="activityType"></image>
							<image src="@/static/activity/end.png" mode="widthFix" v-else class="activityType"></image>
						</view>
					</view>
				</view>
			</template>
		</view>

		<!-- <view class="indexbg" style="background-color: rgb(243, 243, 243);background-image: none;">
			<view class="bnts">
				<swiper class="xswiper" circular>
					<swiper-item v-for="(item,index) in bannerCategory" :key="index">
						<view class="swiperInnerBox">
							<view class="" v-for="(z,i) in item" @click="clickCategory(z.id)">
								<image :src="common.imgUrl(z.picture)" mode="aspectFill"></image>
								<view class="">
									{{z.name}}
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="zone">
				<image src="" mode=""></image>
			</view>
			<view class="limit">
				<view class="limitTitle">
					<view class="limit_l">
						限时 <span class="blue">热销</span><span class="yellow">限时限量</span>
					</view>
					<view class="limit_r" @click="goIndex">
						<view class="">
							更多
						</view>
						<image src="@/static/deyy/toRight1.png" mode="heightFix"></image>
					</view>
				</view>
				<view class="scroll xScrollBox2">
					<view class="commodity" v-for="(item,index) in commodityList" :key="index"
						@click="goProduct(item.id)">
						<image :src="common.imgUrl(item.img)" mode="aspectFill"></image>
						<view class="commodityName">
							{{item.name}}
						</view>
						<view class="price">
							<view class="priceL priceItem">
								<span>￥</span> {{item.sale_price}}
							</view>
							<view class="priceR">
								<image src="@/static/deyy/toRight.png" mode="" style="background-color: transparent;">
								</image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="swiperb">
				<u-swiper :list="listb" height="200" @click="swiperClick"></u-swiper>
			</view>
			<view class="HotSelling">
				<scroll-view scroll-x="true" style="white-space: nowrap;" class="xscroll">
					<view class="HSTitle" @click.stop="hotSelling = index" v-for="(item,index) in categorylist"
						:key="index">
						<view class="">
							<span class="big">{{ item.Name }}</span>
							<span :class="hotSelling == index ? 'little littleb' : 'little' ">{{ item.name }}</span>
						</view>
					</view>
				</scroll-view>
			</view>
			<u-empty text="暂无" mode="list" v-if="bottom.length == 0"></u-empty>
			<view class="commoditys" v-else>
				<view class="commodity" v-for="(item,index) in bottom" :key="index" @click="goProduct(item.id)">
					<image :src="common.imgUrl(item.img)" mode="aspectFill"></image>
					<view class="CTitle">
						{{ item.name }}
					</view>
					<view class="price">
						<view class="priceL priceItem">
							<span>￥</span>{{item.sale_price}}
						</view>
						<view class="priceR">
							<image src="@/static/deyy/car.png" mode="heightFix" style="background-color: transparent;">
							</image>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="width: 100%;height: 100rpx;"></view>
		</view> -->
		<view class="index_com" style="padding-bottom: 23rpx;">
			<view>
				<view
					style="padding:22rpx 25rpx 0 ;background: #fff;;border-radius:12rpx 12rpx 0 0; width:750rpx;box-sizing: border-box;"
					class="space-between u-f-ac">
					<view class="flex  flex-center">
						<!-- <view class="greenSpot"></view> -->
						<view class="spotName" style="margin-left: 0;">
							<view>动态</view>
						</view>
					</view>
					<view class="flex u-f-ac" style="align-items: center;" @click="getTabbar('/pages/case/case')">
						<view class="more" style="font-size: 24rpx;">查看更多</view>
						<u-icon color="#262626" size="26rpx" name="arrow-right"
							style="display: flex;align-items: center;"></u-icon>
						<view>
						</view>
					</view>
				</view>
				<nullData v-if='dynamicList.length<=0' :paddingTop="50" />
			</view>
			<template v-if="dynamicList">
				<view class="dynamicList" v-for="(item, index) in dynamicList" :key="index" :class="'video' + index">
					<view :class="{ cur: dynamicList.length == index + 1 }">
						<dynamicpicture v-if="item.type === 0" :data="item" />
						<dynamicInformation v-else-if="item.type === 1" :data="item" />
						<dynamicpicture v-else-if="item.type === 2" :data="item" />
					</view>
				</view>
			</template>
			<!-- <view class="dynamicInformationList"><dynamicInformation type="0" /></view>
			<view class="dynamicInformationList"><dynamicInformation type="1" /></view>
			<view class="dynamicInformationList"><dynamicpicture /></view> -->
		</view>
		<!-- <tab :choosed='0' ></tab> -->
		
	</view>
</template>

<script>
	import dynamicInformation from '../../components/dynamicInformation.vue'
	import dynamicpicture from '../../components/dynamicpicture.vue'
	import {
		bannerList,
		noticeList,
		subscribe
	} from '@/plugin/api/index.js'
	import {
		categoryList
	} from '@/plugin/api/product.js'
	import {
		listJson
	} from '@/plugin/api/product.js'
	// import tab from "@/components/tabbarb.vue"
	export default {
		components: {
			// tab
			dynamicInformation,
			dynamicpicture
		},
		data() {
			return {
				dynamicList: [],
				activityList: [],
				bannerList: [],
				listb: [],
				hotSelling: 0,
				bannerCategory: [],
				commodityList: [],
				categorylist: [],
				bottom: [],
				page: 1,
				productPage: 1,
				limit: 10,
				productLimit: 10,
				nomore: false,
				list: []
			}
		},
		onLoad() {
			this.getBanner()
			this.getList()
			this.getDynamicList()
			noticeList({
				page: 1,
				limit: 1
			}).then(res => {
				this.list = res.data.map(item => item.title)
			})
			// this.categoryList()
			// this.productList()
		},
		watch: {
			hotSelling(newValue, oldValue) {
				this.nomore = false
				this.productPage = 1
				this.bottomList()
			}
		},
		onReachBottom() {
			// if (this.nomore) {
			// 	uni.showToast({
			// 		title: "暂无更多",
			// 		icon: "none"
			// 	})
			// 	return
			// }
			// this.productPage++
			// this.bottomList()
		},
		onShareAppMessage(res) {},
		onShareTimeline() {},
		methods: {
			getDynamicList() {
				this.$axios({
					url: this.$url[48],
					data: {
						page: this.page,
						limit: this.limit,
						query: {
							ctime: '',
							label_id: 0
						}
					}
				}).then(res => {
					res.data.data.forEach(item => {
						this.dynamicList.push(item)
					})
					console.log('res=>', res)
				})
			},
			getList() {
				this.$axios({
					url: this.$url[119],
					data: {
						page: 1,
						limit: 2,
						query: {
							category_id: 0
						}
					}
				}).then(res => {
					if (res.code == 0) {
						this.activityList = res.data.data
					}
				})
			},
			goList() {
				this.getUrl('/pagesShop/classify/index')
			},
			//跳转路由
			getUrl(url, status = false) {
				if (url) {
					if (status) {
						uni.switchTab({
							url
						})
					} else {
						uni.navigateTo({
							url
						})
					}
				} else {
					uni.showToast({
						title: "敬请期待",
						icon: "none"
					})
				}
				''
			},
			goIndex() {
				uni.switchTab({
					url: "/pages/shop/index"
				})
			},
			classify() {
				uni.navigateTo({
					url: "/pagesShop/classify/list?mode=search&value="
				})
			},
			clickCategory(i) {
				uni.navigateTo({
					url: `/pagesShop/classify/index?id=${i}`
				})
				console.log(i);
			},
			goProduct(id) {
				uni.navigateTo({
					url: "/pagesShop/commodity/detail?id=" + id
				})
			},
			getBanner() {
				bannerList({
					name: '首页banner'
				}).then(res => {
					this.bannerList = res.data.map(item => {
						item.image = this.common.imgUrl(item.img)
						return item
					})
				})
				bannerList({
					name: '首页中部banner'
				}).then(res => {
					this.listb = res.data.map(item => {
						item.image = this.common.imgUrl(item.img)
						return item
					})
				})
			},
			bottomList() {
				uni.showLoading({
					title: '加载中'
				})
				listJson({
						page: this.productPage,
						limit: this.productLimit,
						query: {
							category_id: this.categorylist[this.hotSelling].id
						}
					})
					.then(res => {
						if (res.code == 0) {
							uni.hideLoading()
							if (this.productPage == 1) {
								this.bottom = []
							}
							if (res.data.data.length < this.productLimit) {
								this.nomore = true
								if (res.data.data.length == 0 && this.productPage == 1) {
									uni.showToast({
										title: "暂无更多",
										icon: "none"
									})
								}
							}
							this.bottom = this.bottom.concat(res.data.data)
						}
					})
					.catch(() => {
						uni.hideLoading()
					})
			},
			productList() {
				uni.showLoading({
					title: '加载中'
				})
				listJson({
						page: this.page,
						limit: this.limit,
					})
					.then(res => {
						if (res.code == 0) {
							this.commodityList = res.data.data
							uni.hideLoading()
						}
					})
					.catch(() => {
						uni.hideLoading()
					})
			},
			swiperClick(e) {
				
				let list = this.bannerList
				if(list[e].rediect_url.length != 0){
					
					uni.navigateTo({
						url: "/pages/webview/webview?src=" + list[e].rediect_url
					})
				}
				
				// if (!isNaN(parseInt(list[e].rediect_url))) {
				// 	uni.navigateTo({
				// 		url: '/pagesShop/commodity/detail?id=' + list[e].rediect_url
				// 	})
				// } else {
				// 	if (list[e].rediect_url.length) {
				// 		// window.location.href = list[e].rediect_url
				
				// 	}
				// }
				console.log(list[e].rediect_url)
			},
			goActivity(id) {
				uni.navigateTo({
					url: "/packgeB/activityDetail/activityDetail?id=" + id
				})
			},
			categoryList() {
				categoryList({
					is_recommend: 1
				}).then(res => {
					res.data.forEach((item, index) => {
						if (item.children) {
							let children = item.children.map(z => {
								z.Name = item.name
								return z
							})
							this.categorylist = this.categorylist.concat(children)
						}
						if (this.bannerCategory[parseInt(index / 6)] === undefined) {
							this.bannerCategory.push([])
						}
						this.bannerCategory[parseInt(index / 6)].push(item)

					})
					this.bottomList()
				})
			}
		},
	}
</script>

<style lang="scss">
	.u-notice-text {
		color: #042BE3;
	}

	.index {
		.indexbg {
			width: 750rpx;
			//background: #042BE3;
			background-image: linear-gradient(to top, #ffffff, #042BE3);
			// background-image: url("../../static/deyy/bj.png");
			// background-size: 100% 100%;
			border-radius: 0rpx 0rpx 0rpx 0rpx;
			opacity: 1;
			padding-top: 1rpx;

			.commoditys {
				width: 700rpx;
				margin: auto;
				margin-top: 30rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.commodity {
					width: 340rpx;
					background: #FFFFFF;
					border-radius: 13rpx;
					margin-bottom: 20rpx;

					.price {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 16rpx;

						.priceL {
							font-size: 36rpx;
							// font-weight: bold;
							color: #fc5257;

							span {
								font-size: 21rpx;
								margin-right: 10rpx;
							}
						}

						.priceR {
							width: 42rpx;
							height: 38rpx;

							image {
								width: 42rpx;
								height: 38rpx;
								border-radius: 0rpx;
							}
						}
					}

					.CTitle {
						width: 100%;
						padding: 16rpx;
						padding-bottom: 0;
						box-sizing: border-box;
						font-size: 27rpx;
						font-weight: bold;
						color: #494949;
						overflow: hidden;
						/* 溢出部分进行隐藏 */
						display: -webkit-box;
						-webkit-box-orient: vertical;
						/* 盒模型元素从顶部向底部垂直排列子元素 */
						-webkit-line-clamp: 1;
						/* 显示两行 */
						text-overflow: ellipsis;
					}

					image {
						width: 340rpx;
						height: 340rpx;
						background: #e1e1e1;
						border-radius: 13rpx 13rpx 0rpx 0rpx;
					}
				}

				// .commodity:nth-child(2n+2) {
				// 	margin-left: 12rpx;
				// }
			}

			.HotSelling {
				// display: flex;
				// justify-content: space-between;
				// align-items: center;
				width: 700rpx;
				margin: auto;
				margin-top: 30rpx;
				padding: 14rpx 20rpx;

				.uni-scroll-view-content {
					>view:last-child::before {
						display: none;
					}

					>view:last-child {
						margin-right: 0;
					}
				}

				.HSTitle {
					display: inline-block;
					margin-right: 55rpx;
					position: relative;

					&::before {
						top: 50%;
						transform: translateY(-50%);
						right: -27rpx;
						position: absolute;
						content: '';
						width: 2rpx;
						height: 64rpx;
						background: #999999;
						border-radius: 6rpx 6rpx 6rpx 6rpx;
						opacity: .2;
					}

					>view {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;


					}

					.big {
						text-align: center;
						font-size: 32rpx;
						font-weight: bold;
						color: #2f6bdd;
						overflow: hidden;
						/*   超出容器的部分影响  */
						white-space: nowrap;
						/*  文本不换行   */
						text-overflow: ellipsis;
						/*  超出容器的文本显示省略号  */
					}

					.little {
						font-size: 21rpx;
						color: #999;
						line-height: 36rpx;
						margin-top: 8rpx;
						padding: 0 17rpx;
						box-sizing: border-box;
						background: none;
						border-radius: 500rpx;
						overflow: hidden;
						/*   超出容器的部分影响  */
						white-space: nowrap;
						/*  文本不换行   */
						text-overflow: ellipsis;
						/*  超出容器的文本显示省略号  */
					}

					.littleb {
						color: #FFF;
						background: $project-color;
					}
				}
			}

			.swiperb {
				width: 700rpx;
				height: 201rpx;
				background: #D2E6F7;
				border-radius: 120rpx 120rpx 10rpx 10rpx;
				margin: auto;
				margin-top: 30rpx;
				overflow: hidden;
			}

			.select {
				width: 700rpx;
				margin: 30rpx auto;
				display: flex;
				align-items: center;
				justify-content: space-between;

				>image {
					height: 63rpx;
				}
			}

			.selectOutBox {
				display: flex;
				align-items: center;

				>image {
					height: 50rpx;
					width: auto;
					margin-left: 15rpx;
				}
			}

			.selectBox {
				width: 450rpx;
				height: 63rpx;
				background: #FFFFFF;
				border-radius: 13rpx;
				display: flex;
				align-items: center;

				image {
					height: 34rpx;
					margin-left: 38rpx;
					margin-right: 23rpx;
				}

				font-size: 26rpx;
				color: #C8C8C8;
			}

			.swiper {
				width: 700rpx;
				height: 292rpx;
				background: #FFFFFF;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				opacity: 1;
				margin: auto;
				margin-top: 30rpx;
			}

			.bnts {
				width: 750rpx;
				background: #FFFFFF;
				padding: 30rpx 15rpx;
				box-sizing: border-box;
				// display: flex;
				// flex-wrap: wrap;
				// justify-content: space-between;

				.bnt {
					width: 95rpx;
					height: 95rpx;
					border-radius: 14rpx 14rpx 14rpx 14rpx;
					background: skyblue;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.zone {
				width: 700rpx;
				height: 171rpx;
				background: #FFFFFF;
				border-radius: 9rpx 9rpx 9rpx 9rpx;
				opacity: 1;
				margin: auto;
				margin-top: 30rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.limit {
				width: 700rpx;
				height: auto;
				background-image: url("../../static/deyy/qp.png");
				background-size: cover;
				border-radius: 13rpx 13rpx 13rpx 13rpx;
				margin: auto;
				margin-top: 30rpx;

				.limitTitle {
					padding: 24rpx 24rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;

					.limit_l {
						font-size: 32rpx;
						font-weight: bold;
						color: #333333;

						.blue {
							color: $project-color;
						}

						.yellow {
							width: 119rpx;
							height: 30rpx;
							background: linear-gradient(184deg, #F9EE9F 0%, #FA7312 100%);
							border-radius: 15rpx 15rpx 15rpx 15rpx;
							font-size: 21rpx;
							color: #FFFFFF;
							padding: 0rpx 18rpx;
							box-sizing: border-box;
							margin-left: 12rpx;
						}

						image {
							width: 119rpx;
							height: 30rpx;
						}
					}

					.limit_r {
						font-size: 22rpx;
						color: #999999;
						display: flex;
						align-items: center;

						image {
							width: 9rpx;
							height: 16rpx;
							margin-left: 7rpx;
						}
					}
				}

				.scroll {
					overflow: scroll;

					display: flex;

					.commodity {
						margin-left: 24rpx;
						margin-bottom: 24rpx;

						image {
							width: 200rpx;
							height: 200rpx;
							background: #F3F3F3;
						}

						.price {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.priceL {
								font-size: 37rpx;
								color: #fc5257;

								span {
									font-size: 18rpx;
								}
							}

							image {
								width: 23rpx;
								height: 23rpx;
								background: #F3F3F3;
								margin-right: 16rpx;
							}
						}
					}
				}
			}
		}

		.xswiper {
			width: 100%;
			height: 150rpx;
		}

		.commodityName {
			margin: 8rpx 0;
			width: 206rpx;
			font-size: 28rpx;
			overflow: hidden;
			/*   超出容器的部分影响  */
			white-space: nowrap;
			/*  文本不换行   */
			text-overflow: ellipsis;
			/*  超出容器的文本显示省略号  */
		}

		.swiperInnerBox {
			display: flex;

			>view {
				width: calc(100% / 5);
				display: flex;
				flex-direction: column;
				align-items: center;

				view {
					text-align: center;
					color: #000;
					margin-top: 6rpx;
					font-size: 24rpx;
					width: 100%;
					overflow: hidden;
					/*   超出容器的部分影响  */
					white-space: nowrap;
					/*  文本不换行   */
					text-overflow: ellipsis;
					/*  超出容器的文本显示省略号  */
				}
			}

			>view:last-child {
				margin-right: 0;
			}

			image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 14rpx 14rpx 14rpx 14rpx;
			}
		}

		.deyy {
			color: #FFF;
			font-weight: bold;
			font-size: 32rpx;
		}
	}

	.swiper {
		width: 100%;
		height: 400rpx;

		.classification {
			display: flex;
			flex-wrap: wrap;

			image {
				width: 88rpx;
			}

			>view {
				width: 25%;
				text-align: center;
				margin: 36rpx 0 16rpx 0;

				view {
					font-size: 28rpx;
					color: #262626;
					font-weight: bold;
				}
			}
		}
	}

	.activity {
		.activityBox {
			padding: 0 0 30rpx;

			.activityTime {
				text-align: center;
				color: #666;
				font-size: 26rpx;
				padding-bottom: 30rpx;
			}

			.activityInner {
				width: 690rpx;
				height: 345rpx;
				margin: 0 auto;
				border-radius: 12rpx;
				overflow: hidden;
				position: relative;

				.activityType {
					position: absolute;
					top: 0;
					right: 20rpx;
					width: 80rpx;
					height: auto;
				}

				.activityImg {
					width: 100%;
					height: 100%;
					vertical-align: bottom;
				}

				.activityTitle {
					font-size: 26rpx;
					padding: 15rpx 20rpx;
					line-height: 1;
					position: absolute;
					left: 0;
					top: 0;
					background: $project-color;
					color: #FFF;
					font-weight: bold;
				}

				.activityTop {
					width: 690rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					box-sizing: border-box;
					padding: 10rpx 20rpx;
					background-color: #000000a6;
					color: #FFF;
					line-height: 1.5;
					font-size: 28rpx;

					>view:first-child {
						font-weight: bold;
						overflow: hidden;
						/*   超出容器的部分影响  */
						white-space: nowrap;
						/*  文本不换行   */
						text-overflow: ellipsis;
						/*  超出容器的文本显示省略号  */
					}

					>view:last-child {
						font-size: 24rpx;
					}
				}
			}
		}

		.activityScroll {
			position: sticky;
			top: 0;
			width: 750rpx;
			left: 0;
			background-color: #FFF;
			z-index: 9999;

			.activityList {
				min-width: calc(750rpx / 4);
				display: inline-flex;
				flex-direction: column;
				align-items: center;
				height: 150rpx;
				justify-content: space-evenly;

				image {
					height: 70rpx;
					width: auto;
				}

				>view {
					line-height: 1;
					color: #333;
					font-size: 28rpx;
					position: relative;

					view {
						left: -5%;
						bottom: -18rpx;
						position: absolute;
						width: 110%;
						height: 6rpx;
					}
				}

			}

			.choosed {
				>view {
					font-weight: bold;

					view {
						background: $project-color;
					}
				}
			}
		}
	}
</style>