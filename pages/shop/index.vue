<template>
	<view class="home">
		<scroll-view scroll-y style="height: 100%; width: 100% background: #007AFF" @scrolltolower="onreachBottom">
			<view class="top">
				<view class="flex a-center j-around">
					<u-search class="search" placeholder="请输入您要搜索的内容" v-model="searchText" :show-action="false"
						@search="search"></u-search>
					<img :src="common.imgUrl('/static/images/menu.png')" @click="getUrl('/pagesShop/classify/index')"
						alt="">
				</view>
				<view class="banner">
					<u-swiper :height="300" :list="bannerLists" @click="clickBanner"
						v-if="bannerLists.length != 0"></u-swiper>
				</view>
			</view>
			<!-- 			<view class="nav flex a-center j-around">
				<view class="classification">
					<view @click="getUrl('/pagesShop/classify/index')">
						<image src="../../static/my/img17.png" mode="widthFix"></image>
						<view>商品分类</view>
					</view>
					<view @click="getUrl('/packgeA/commodityList/commodityList')">
						<image src="../../static/icon/icon1.png" mode="widthFix"></image>
						<view>课程</view>
					</view>
					<view @click="getTabbar('/pages/case/case?', 2)">
						<image src="../../static/icon/icon5.png" mode="widthFix"></image>
						<view>动态</view>
					</view>
					<view @click="getUrl('/packgeA/comingSoon/comingSoon')">
						<image src="../../static/icon/icon4.png" mode="widthFix"></image>
						<view>家庭管理</view>
					</view>
				</view>
			</view> -->
			<view class="commodity">
				<view class="commodityNav flex a-center j-around">
					<view class="commodityItem" :class="index === activeNav ? 'activeNav' : ''"
						v-for="(item, index) in commodityNav" @click="navChange(item)" :key="item.id">
						{{ item.title }}
					</view>
				</view>
				<view class="commodityData flex wrap a-center j-between">
					<view class="commodityList" v-for="(item,index) in commodityList" :key="item.id"
						@click="skip('/pagesShop/commodity/detail?id=' + item.id,true)"
						style="height: 600rpx !important;">
						<!-- #ifdef H5 -->
						<img :src="common.imgUrl(item.img)"
							style="width: 100% !important;height:400rpx !important;object-fit:cover;"
							:onerror="defaultAvatar" id="commodityImg" />
						<!-- #endif -->
						<!-- #ifdef APP -->
						<img :src="common.imgUrl(item.img)" style="width: 300rpx;height:400rpx;object-fit:cover;"
							@error='imgerror(index)' mode='center' />
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image :src="common.imgUrl(item.img)" style="width: 100%;height:400rpx;" mode="aspectFill"
							@error="imgerror(index)"></image>
						<!-- #endif -->
						<view class="" style="height: 100rpx;padding: 0 14rpx;">
							<view class="text size32 ellipsis2 fontWight">{{ item.name }}</view>
						</view>
						<!-- <view class="salesVolume flex a-center"
							:class="item.isAdditionalPurchase ? 'j-between' : 'j-end'">
							<view class="events" v-if="item.isAdditionalPurchase">享加购优惠</view>
							<view class="priceDiscount" v-if="item.isPriceDiscount">活动中</view>
						</view> -->
						<view class="flex j-between a-center priceItem" style="padding: 0 14rpx;">
							<view class="flex a-center">
								<view v-if="item.price != 0">
									<text class="price size22"
										v-if="item.is_discount==0">￥{{ item.price ? item.price : item.original_price }}</text>
									<text class="price size22" v-if="item.is_discount==1"><text
											style="font-size: 28rpx;color: #333;">会员价：</text>￥{{item.discount_price}}</text>
									<text class="originalPrice color999 size22"
										v-if="item.price && item.price !== item.original_price * 1"
										style="margin-top: 6rpx;">
										{{ item.original_price ? '￥' + item.original_price : '' }}
									</text>
								</view>
								<view v-else-if="item.price == 0">
									<text class="price size22">面议</text>
								</view>
							</view>
							<div class="size22" style="margin-top: 4rpx;">销量:{{ item.salesVolume }}</div>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- <view class="chatBox flex j-end">
			<view class="chat" @click="skip('/pagesShop/chat/index')">
				<u-image class="img" width="42rpx" height="42rpx" :src="common.imgUrl('/static/images/kefu1.png')"
					mode="widthFix"></u-image> -->
		<!-- #ifdef H5 -->
		<!-- <view class="size20">客服</view> -->
		<!-- #endif -->
		<!-- <view class="size20" style="margin-left:2rpx">客服</view> -->
		<!-- </view>
		</view>
		<view class="licenceBox flex j-end">
			<view class="licence" @click="skip('/pagesShop/shopping/index')">
				<u-image class="img" width="42rpx" height="42rpx" :src="common.imgUrl('/static/images/car.png')"
					mode="widthFix"></u-image> -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- <view class="size20" style="">购物车</view> -->
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<!-- <view class="size20" style="margin-left:-8rpx">购物车</view> -->
		<!-- #endif -->
		<!-- #ifdef APP -->
		<!-- <view class="size20" style="margin-left:-2rpx">购物车</view> -->
		<!-- #endif -->
		<!-- </view>
		</view> -->
		<view class="CustomerService" :class="[state3?'shrink3':'open3']" style="background-color: #FFBA6D;">
			<view style="width: 20%;margin-left:-5%;margin-top: 20%;">
				<u-icon color="#fff" size="26rpx" name="arrow-right" :class="[state2?'shrink2':'open2']"
					@click="Change1"></u-icon>
			</view>
			<view style="width: 70%;margin-left: 10%;" @click="skip('/pagesShop/chat/index')">
				<img :src="common.imgUrl('/static/images/service.png')">
				<view>客服</view>
			</view>
		</view>
		<view class="CustomerService" :class="[state1?'shrink1':'open1']" style="bottom: 12%;background-color:#FD383F;">
			<view style="width: 20%;margin-left:-5%;margin-top: 20%;">
				<u-icon color="#fff" size="26rpx" name="arrow-right" :class="[state?'shrink':'open']"
					@click="Change"></u-icon>
			</view>
			<view style="width: 70%;margin-left: 10%;" @click="skip('/pagesShop/shopping/index')">
				<img :src="common.imgUrl('/static/images/car.png')">
				<view>购物车</view>
			</view>
		</view>
		<u-modal v-model="show" @cancel="confirm" :show-title="false" cancel-text='关闭' :show-cancel-button='true'
			confirm-text='了解详情' :show-confirm-button="noticeList.rediect_url!='' ? true : false"
			@confirm='noticeSkip()'>
			<view class="noticeContent">
				<view class="size36 fontWight center">{{ noticeList.title }}</view>
				<scroll-view scroll-y style="min-height: 50rpx;max-height: 210px; width: 100% background: #007AFF">
					<view v-html="common.content(noticeList.content)"></view>
				</scroll-view>
			</view>
		</u-modal>
	</view>
</template>
<script>
	import {
		listJson,
		getCartList
	} from '@/plugin/api/product.js'
	import {
		bannerList,
		confirmNotice,
		noticeList,
		verifyLogin
	} from '@/plugin/api/index.js'
	export default {
		components: {},
		computed: {
			defaultAvatar() {
				return 'this.src="' + this.common.imgUrl('/static/default.png') + '"'
			}
		},
		data() {
			return {
				state: false,
				state1: false,
				state2: false,
				state3: false,
				isLogin: false,
				show: false,
				noticeList: [],
				page: 1,
				limit: 10,
				query: {
					salesVolume: true
				},
				totalCount: 0,
				bannerLists: [],
				defaultAddress: [],
				addressText: '',
				searchText: '',
				commodityNav: [{
					id: 0,
					title: '热销商品'
				}, {
					id: 1,
					title: '新品上架'
				}],
				commodityList: [],
				activeNav: 0,
				isPc: true
			}
		},
		onLoad() {
			// #ifdef H5
			let ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				this.isPc = false
			} else {
				this.isPc = true
			}
			// #endif
			this.banner('商城首页')
		},
		onShow() {
			this.page = 1
			this.limit = 10
			this.commodityList = []
			this.productList()
			verifyLogin().then(res => {
				if (res.code == 0) {
					this.isLogin = true
					this.notice()
					this.getCartList()
				} else {
					this.isLogin = false
				}
			})
		},
		onReachBottom() {
			this.page++
			this.productList()
		},
		methods: {
			Change1() {
				this.state2 = !this.state2;
				this.state3 = !this.state3;
				console.log(this.state)
			},
			Change() {
				this.state = !this.state;
				this.state1 = !this.state1;
				console.log(this.state)
			},
			imgerror(i) {
				this.commodityList[i].img = this.common.imgUrl('/static/images/default.png')
			},
			//跳转路由
			getUrl(url) {
				url ? uni.navigateTo({
					url: url
				}) : ''
			},
			//tabBar跳转
			getTabbar(url, type = 0) {
				uni.setStorageSync('caseIndex', type)
				url ? uni.switchTab({
					url: url
				}) : ''
			},
			getCartList() {
				getCartList().then(res => {
					if (res.data.length) {
						uni.setTabBarBadge({
							index: 3,
							text: res.number
						})
					} else {
						uni.removeTabBarBadge({
							index: 3
						})
					}
				})
			},
			confirm() {
				confirmNotice({
					id: this.noticeList.id
				}).then(res => {
					setTimeout(() => {
						this.notice()
					}, 500)
				})
			},
			noticeSkip() {
				if (this.noticeList.rediect_url) {
					window.location.href = this.noticeList.rediect_url
				}
			},
			notice() {
				// noticeList().then(res => {
				// 	if (res.data.length) {
				// 		this.noticeList = res.data[0]
				// 		this.show = true
				// 	}
				// })
			},
			clickBanner(e) {
				let list = this.bannerLists
				if (list[e].rediect_url.length != 0) {
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
				// 		window.location.href = list[e].rediect_url
				// 	}
				// }
			},
			banner(name) {
				bannerList({
					name
				}).then(res => {
					this.bannerLists = res.data.map(item => {
						item.image = this.common.imgUrl(item.img)
						return item
					})
					console.log(this.bannerLists);
				})
			},
			onreachBottom() {
				if (this.commodityList.length < this.totalCount) {
					this.page = this.page + 1
					this.productList()
					return
				}
				uni.showToast({
					icon: 'none',
					title: '到底了'
				})
			},
			productList() {
				uni.showLoading({
					title: '加载中'
				})
				listJson({
					page: this.page,
					limit: this.limit,
					query: this.query
				}).then(res => {
					if (res.code == 0) {
						this.commodityList = this.commodityList.concat(res.data.data)
						this.totalCount = res.data.totalCount
						uni.hideLoading()
					}
				}).catch(() => {
					uni.hideLoading()
				})
			},
			skip(url, status = false) {
				if (this.isLogin || status) {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.showToast({
						icon: "none",
						title: '请登录',
						position: "bottom",
					});
					setTimeout((res) => {
						uni.reLaunch({
							url: "/packgeA/login/login",
						});
					}, 1000);
				}
			},
			navChange(item) {
				this.activeNav = item.id
				this.commodityList = []
				this.page = 1
				if (item.id) {
					this.query = {}
				} else {
					this.query.salesVolume = true
				}
				this.productList({})
			},
			address(e) {
				this.defaultAddress = e.value
				if (e.value[1] === '市辖区') {
					this.addressText = e.value[0]
				} else {
					this.addressText = e.value[1]
				}
			},
			search(value) {
				if (value) {
					// this.query = {
					// 	search: value
					// }
					uni.navigateTo({
						url: '/pagesShop/classify/list?mode=search&value=' + value
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.commodityData {
		padding-bottom: 50rpx;
		margin: 0 8rpx 27rpx !important;
	}

	.commodityList {
		width: 49.3% !important;
		padding: 0 0 24rpx 0rpx !important;
		height: 510rpx !important;

		#commodityImg {
			height: 301rpx !important;
		}
	}

	.search {
		width: 100%;
	}

	.open1 {
		transition: all .5s;
		right: 0% !important;
	}

	.shrink1 {
		right: -10% !important;
		transition: all .5s;
	}

	.open {
		transition: all .5s;
	}

	.shrink {
		transform: rotate(180deg);
		transition: all .5s;
	}

	.open3 {
		transition: all .5s;
		right: 0% !important;
	}

	.shrink3 {
		right: -10% !important;
		transition: all .5s;
	}

	.open2 {
		transition: all .5s;
	}

	.shrink2 {
		transform: rotate(180deg);
		transition: all .5s;
	}

	.top {
		img {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.CustomerService {
		position: fixed;
		right: 0%;
		bottom: 19%;
		width: 120rpx;
		padding: 15rpx 10rpx 15rpx 20rpx;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		font-size: 20rpx;
		background-color: #FF6638;
		color: #fff;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		z-index: 999999;
		overflow: hidden;
		text-align: center;

		view {
			width: 100%;
		}

		img {
			width: 40rpx;
			height: 30rpx;
		}
	}

	.classification {
		width: 100%;
		display: flex;
		justify-content: space-around;

		image {
			width: 76rpx;
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

	@import '@/pagesShop/scss/home.scss';
</style>