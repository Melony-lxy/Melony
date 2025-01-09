<template>
	<view class="content">
		<!-- #ifdef APP -->
		<view v-if="showpopup">
			<view class="popup_mask"></view>
			<view class="popup_content">
				<view class="title">用户协议和隐私政策</view>
				<view class="explain_text"> 请你务必认真阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供数据、分享等服务所要获取的权限信息。<br>
					<view class="line"> 你可以阅读 <text @tap="clickEvent('用户协议')" style="color: #FF6638;">《用户协议》</text> 和
						<text @tap="clickEvent('隐私政策')"
							style="color: #FF6638;">《隐私政策》</text>了解详细信息。如您同意，请点击"同意"开始接受我们的服务。
					</view>
				</view>
				<view class="button1">
					<view @click="back()">暂不使用</view>
					<view @click="confirm()">同意</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="padding32">
			<view class="schoolTd" style="display: flex;justify-content: space-between;align-items: center;">
				<!-- 搜索框 -->
				<view style="margin-left:20rpx;">
					<view class="title_qm" v-if="orgList.length==1">{{ orgList[dataIndex].name }}</view>
					<picker :value="dataIndex" :range="orgList" range-key="name" @change="bindChange"
						v-if="orgList.length>=2">
						<view class="title_qm">{{ orgList[dataIndex].name }}</view>
					</picker>
				</view>
			</view>
			<view class="searchtitle" style="" v-if="orgList.length == 0">
				<searchList class="search" />
			</view>
			<view class="searchtitle q" style="" v-else>
				<searchList class="search" :q='true' />
			</view>
			<!-- banner图 -->
			<view style="margin-top: 31rpx;">
				<banner :list="bannerList" @swiperClick="swiperClick"></banner>
			</view>
			<swiper class="swiper" indicator-color="#E9E9E9" indicator-active-color="#FEA406">
				<swiper-item class="" v-for="(item,index) in bannerCategory" :key="index">
					<view class="classification">
						<view @click="clickCategory(z.id)" v-for="(z,y) in item">
							<image :src="z.picture ? common.imgUrl(z.picture) : common.imgUrl('/static/xyLogo.png')"
								mode="heightFix"></image>
							<view style="overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;">{{z.name}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- <view class="detailMabn">
				<view v-if="centerbanner!=''">
					<image :src="centerbanner" mode="" @tap="bannnerclick"></image>
				</view>
				<view class="studys" v-else>
					<img :src="common.imgUrl('/static/study.jpg')" alt="">
				</view>
			</view> -->
			<!-- 			<view class="bgWhite" style="padding: 24rpx;border-radius: 12rpx;">
				<view class="space-between u-f-ac videoTd">
					<view class="flex  flex-center"> -->
			<!-- <view class="greenSpot"></view> -->
			<!-- 						<view class="spotName">
							<view>视频课</view>
						</view>
					</view>
					<view class="flex u-f-ac" @click="to(3)">
						<view class="more">查看更多</view>
						<view>
							<u-icon color="#262626" size="26rpx" name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
				<view class="" v-if="vedioDataList">
					<videoTd :dataList="vedioDataList" />
				</view>
				<nullData v-if='vedioDataList.length<=0' :paddingTop="50" />
			</view> -->
			<!-- 导航 -->
			<!-- <swiper class="swiper" indicator-dots indicator-color='#E9E9E9' indicator-active-color='#FEA406'>
				<swiper-item class="" v-for="(items,indexs) in Math.ceil(navList.length/navLimit)" :key='indexs'>
					<view class="flex space-between navBox">
						<view @click="navTo(item)"
							v-for="(item,index) in navList.filter(((navItem,navItemIndex)=>navItemIndex>=(indexs)*navLimit&&navItemIndex<(indexs+1)*navLimit))"
							:key='index' class="textCenter navItem">
							<image v-if="item.img" class="navIcon" :src="common.imgUrl(item.img)" mode=""
								style="width:90rpx;height:90rpx">
							</image>
							<image v-else class="navIcon" :src="common.imgUrl('/static/default.png')" mode=""
								style="width:90rpx;height:90rpx">
							</image>
							<view class="navName"> {{item.name}} </view>
						</view>
					</view>
					
				</swiper-item>
			</swiper> -->
		</view>
		<!-- 		<view class="" style="padding-bottom: 23rpx;">
			<view style="margin: 20rpx 23rpx 0; padding:28rpx 23rpx 0 ;background:#fff; border-radius:12rpx 12rpx 0 0;"
				class="space-between u-f-ac">
				<view class="flex  flex-center"> -->
		<!-- <view class="greenSpot"></view> -->
		<!-- 					<view class="spotName">
						<view>1V1课程</view>
					</view>
				</view>
				<view class="flex u-f-ac" @click="to(0)">
					<view class="more">查看更多</view>
					<view>
						<u-icon color="#262626" size="26rpx" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<commodityItem :dataList="oneDataList"></commodityItem>
		</view> -->
		<view class="" style="padding-bottom: 23rpx;" v-for="(v,i) in category" :key="i">
			<view style="margin: 20rpx 23rpx 0; padding:28rpx 23rpx 0 ;background:#fff; border-radius:12rpx 12rpx 0 0;"
				class="space-between u-f-ac">
				<view class="flex  flex-center">
					<view class="spotName" style="display: flex;align-items: center;">
						<view class="" style="width: 10rpx;height: 35rpx;border-radius: 10rpx;background-color: #042BE3;margin-right: 10rpx;">
							
						</view>
						<view>{{v.name}}</view>
					</view>
				</view>
				<view class="flex u-f-ac" @click="clickCategory(v.id)">
					<view class="more">查看更多</view>
					<view>
						<u-icon color="#262626" size="26rpx" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<nullData v-if="v.list.length == 0" :paddingTop="50" style="background-color: #FFF;"></nullData>
			<view class="home" style="height: 100%;" v-else>
				<view class=" commodity">
					<view class="commodityData flex wrap a-center j-between"
						style="margin-bottom: 0;background-color: #FFF;">
						<view class="commodityList" v-for="(item,index) in v.list" :key="item.id"
							@click="skip('/pagesShop/commodity/detail?id=' + item.id)"
							style="margin-top: 0;box-shadow: none;width: 50%;height: 500rpx;">
							<img :src="common.imgUrl(item.img)"
								style="width: 100% !important;height:330rpx;object-fit:cover;" />
							<view class="" style="height: 100rpx;">
								<view class="text size32 ellipsis2 fontWight">{{ item.name }}</view>
							</view>
							<!-- <view class="salesVolume flex a-center"
								:class="item.isAdditionalPurchase ? 'j-between' : 'j-end'">
								<view class="events" v-if="item.isAdditionalPurchase">享加购优惠</view>
								<view class="priceDiscount" v-if="item.isPriceDiscount">活动中</view>
							</view> -->
							<view class="flex j-between a-center priceItem">
								<view class="flex a-center">
									<text
										class="price size22">￥{{ item.price ? item.price : item.original_price }}</text>
									<text class="originalPrice color999 size22"
										v-if="item.price && item.price !== item.original_price * 1"
										style="margin-top: 6rpx;">
										{{ item.original_price ? '￥' + item.original_price : '' }}
									</text>
								</view>
								<div class="size22" style="margin-top: 4rpx;">销量:{{ item.salesVolume }}</div>
							</view>
						</view>
					</view>
				</view>
			</view>


			<!-- <commodityItem :dataList="oneDataList"></commodityItem> -->
		</view>
		<!-- 		<view class="" style="padding-bottom: 23rpx;">
			<view style="margin: 0rpx 23rpx 0; padding:28rpx 23rpx 0 ;background: #fff;; border-radius:12rpx 12rpx 0 0;"
				class="space-between u-f-ac">
				<view class="flex  flex-center"> -->
		<!-- <view class="greenSpot"></view> -->
		<!-- 					<view class="spotName">
						<view>班课课程</view>
					</view>
				</view>
				<view class="flex u-f-ac" @click="to(1)">
					<view class="more">查看更多</view>
					<view>
						<u-icon color="#262626" size="26rpx" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<commodityItem :dataList="classDataList" :type="1"></commodityItem>
		</view> -->
		<!-- 		<view class=" margin20" style="background: rgb(249,250,251);padding-bottom: 23rpx;">
			<view style="padding: 33rpx 23rpx 0;" class="space-between u-f-ac">
				<view class="flex  flex-center">
					<view class="greenSpot"></view>
					<view class="spotName">
						<view>试听课</view>
					</view>
				</view>
				<view class="flex u-f-ac" @click="to(2)">
					<view class="more">查看更多</view>
					<view>
						<u-icon color='#262626' size='26rpx' name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<commodityItem :dataList='openDataList'> </commodityItem>
		</view> -->
		<view class="index_com" style="padding-bottom: 23rpx;">
			<view style="margin: 0 23rpx 0; padding:22rpx 23rpx 0 ;background: #fff;;border-radius:12rpx 12rpx 0 0;">
				<view class="space-between u-f-ac">
					<view class="flex  flex-center">
						<!-- <view class="greenSpot"></view> -->
						<view class="spotName" style="display: flex;align-items: center;">
							<view class="" style="width: 10rpx;height: 35rpx;border-radius: 10rpx;background-color: #042BE3;margin-right: 10rpx;">
								
							</view>
							<view>动态</view>
						</view>
					</view>
					<view class="flex u-f-ac" @click="getTabbar('/pages/case/case')">
						<view class="more">查看更多</view>
						<view>
							<u-icon color="#262626" size="26rpx" name="arrow-right" class="left-jiantou"></u-icon>
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
		<storeInformation></storeInformation>
	</view>
</template>
<script>
	import storeInformation from "@/components/storeInformation.vue"
	import nullData from '../../components/nullData.vue'
	import commodityItem from '../../components/commodityItem.vue'
	import searchList from '../../components/searchList.vue'
	import banner from '../../components/banner.vue'
	import videoTd from '../../components/videoTd.vue'
	import dynamic from '../../components/dynamic.vue'
	import dynamicInformation from '../../components/dynamicInformation.vue'
	import dynamicpicture from '../../components/dynamicpicture.vue'
	import {
		verifyLogin
	} from '@/plugin/api/index.js'
	import {
		categoryList
	} from '@/plugin/api/product.js'
	import {
		listJson
	} from "@/plugin/api/product.js";
	import {
		bannerList
	} from '@/plugin/api/index.js'
	export default {
		components: {
			nullData,
			banner,
			searchList,
			commodityItem,
			videoTd,
			dynamic,
			dynamicInformation,
			dynamicpicture,
			storeInformation,
		},
		data() {
			return {
				type: 0,
				navLimit: 8,
				vedioDataList: [],
				oneDataList: [],
				classDataList: [],
				openDataList: [],
				title: 'Hello',
				keyword: '',
				bannerList: [],
				dataList: [1, 2, 3, 4, 5],
				list: [
					[],
					[]
				],
				dataIndex: 0,
				orgList: [{
					name: ''
				}],
				navList: [],
				dynamicList: [],
				page: 1,
				limit: 20,
				name: '',
				isLogin: false,
				centerbanner: '',
				showpopup: false,
				category: [],
				bannerCategory: []
			}
		},
		onLoad(option) {
			if (option.abbreviation) {
				this.$storage.setStorage('abbreviation', option.abbreviation)
			} else if (option.scene) {
				this.$storage.setStorage('abbreviation', option.scene)
			}
			let show = uni.getStorageSync('start1')
			if (show == false) {
				this.showpopup = true
			}
			this.categoryList()
		},
		onShareAppMessage(res) {
			return {
				title: this.orgList[this.dataIndex].name,
				imageUrl: this.common.imgUrl(this.details.img),
				path: '/packgeA/login/login?' + this.details.param
			}
		},
		onShareTimeline() {
			return {
				title: this.orgList[this.dataIndex].name,
				imageUrl: this.common.imgUrl(this.details.img),
				path: '/packgeA/login/login?' + this.details.param
			}
		},
		onShow() {
			verifyLogin().then(res => {
				if (res.code == 0) {
					this.isLogin = true
				} else {
					this.isLogin = false
				}
			})
			this.$axios({
				url: this.$url[6],
				data: {
					phone_status: 1
				},
				status: true
			}).then(res => {
				if (res.code == 0 && !res.data.phone) {
					uni.showModal({
						title: '提示',
						content: '请绑定手机号',
						showCancel: false,
						buttonText: '确定',
						success: function(res) {
							uni.reLaunch({
								url: '/packgeA/phoneCode/phoneCode?title=绑定手机号'
							})
						}
					})
				}
			})
			this.$axios({
				url: this.$url[47],
				data: {
					abbreviation: this.$storage.getStorageSync('abbreviation')
				}
			}).then(res => {
				if (res.code == 0) {
					this.orgList = []
					// if(res.data.status){
					// let which = {
					// 	id: 0,
					// 	abbreviation: '',
					// 	name: '千芒商汇'
					// }
					// this.orgList.push(which)
					// }
					res.data.data.forEach(item => {
						this.orgList.push(item)
					})
					console.log(this.orgList[this.dataIndex])
					if (this.$storage.getStorageSync('abbreviation')) {
						this.orgList.forEach((item, i) => {
							if (item.abbreviation == this.$storage.getStorageSync('abbreviation')) {
								this.dataIndex = i
							}
						})
					}
				}
			})
			uni.removeStorageSync('data')
			this.getBanner()
			// this.getNavlist()
			this.getJsonList(0)
			this.getJsonList(1)
			this.getJsonList(2)
			this.getJsonList(3)
			this.page = 1
			this.dynamicList = []
			this.getDynamicList()

			// this.$refs.showimg.imgurl()
		},
		methods: {
			skip(url) {
				if (this.isLogin) {
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
			getList(query, index) {
				listJson({
					page: 1,
					limit: 4,
					query: {
						category_id: query
					}
				}).then((res) => {
					this.category[index].list = this.category[index].list.concat(res.data.data)
					this.$forceUpdate()
					console.log(this.category);
				});
			},
			clickCategory(i) {
				uni.navigateTo({
					url: `/pagesShop/classify/index?id=${i}`
				})
				console.log(i);
			},
			categoryList() {
				categoryList({
					is_recommend: 1
				}).then(res => {
					this.category = res.data
					this.category.map(item => {
						item['list'] = []
					})
					this.category.forEach((item, index) => {
						if (this.bannerCategory[parseInt(index / 8)] === undefined) {
							this.bannerCategory.push([])
						}
						this.bannerCategory[parseInt(index / 8)].push(item)
						item.children.forEach(z => {
							this.getList(z.id, index)
						})
					})
				})
			},
			back() {
				plus.runtime.quit();
			},
			confirm() {
				this.showpopup = false;
				this.$storage.setStorage('start1', true)
			},
			clickEvent(i) {
				if (i == '用户协议') {
					uni.navigateTo({
						url: '/packgeB/UserAgreement/UserAgreement?name=用户协议'
					})
				} else {
					uni.navigateTo({
						url: '/packgeB/UserAgreement/UserAgreement?name=隐私政策'
					})
				}
			},
			onReachBottom() {
				// this.page++
				// this.getDynamicList()
				// console.log('触底')
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
			bindChange(e) {
				console.log(this.orgList[e.detail.value].abbreviation)
				// return
				this.$storage.setStorage('abbreviation', this.orgList[e.detail.value].abbreviation)
				this.$storage.setStorage('abbreviation_img', this.orgList[e.detail.value].img)
				// this.$store.commit('orgName', this.orgList[e.detail.value].abbreviation)
				uni.reLaunch({
					url: '/pages/index/index?type=1'
				})
			},
			bannnerclick() {
				const rediect_url = this.list[1][0].rediect_url
				if (this.list[1][0].rediect_url != '') {
					if (rediect_url % 1 == 0) {
						let code = uni.getStorageSync('ThousandAwn_share_code')
						let pageId = uni.getStorageSync('ThousandAwn_share')
						if (pageId == rediect_url) {
							uni.navigateTo({
								url: `/packgeA/curriculumDetails/curriculumDetails?id=${rediect_url}&code=${code}`
							})
						} else {
							uni.navigateTo({
								url: '/packgeA/curriculumDetails/curriculumDetails?id=' + rediect_url
							})
						}
					} else {
						window.location.href = rediect_url
					}
				}
			},
			swiperClick(index) {
				let list = this.bannerList
				if (!isNaN(parseInt(list[e].rediect_url))) {
					uni.navigateTo({
						url: '/pagesShop/commodity/detail?id=' + list[e].rediect_url
					})
				} else {
					if (list[e].rediect_url.length) {
						window.location.href = list[e].rediect_url
					}
				}
			},
			navTo(item) {
				console.log(item)
				uni.navigateTo({
					url: '/packgeA/commodityList/commodityList?id=' + item.id + '&curricuName=' + item.name
				})
			},
			to(type) {
				uni.navigateTo({
					url: '/packgeA/commodityList/commodityList?type=' + type
				})
			},
			switchTab(url) {
				uni.switchTab({
					url
				})
			},
			getBanner() {
				bannerList({
					name: '商城首页'
				}).then(res => {
					this.bannerList = res.data.map(item => {
						item.image = this.common.imgUrl(item.img)
						return item
					})
				})
			},
			getNavlist() {
				this.$axios({
					url: this.$url[45]
				}).then(res => {
					if (res.code == 0) {
						console.log(res.data, 'res.data')
						this.navList = res.data
					}
				})
			},
			getJsonList(type) {
				this.$axios({
					url: this.$url[9],
					data: {
						limit: 10,
						page: 1,
						query: {
							grade: '全部',
							subject_id: 0,
							type: type
						}
					}
				}).then(res => {
					if (res.code == 0) {
						if (type == 0) {
							this.oneDataList = res.data.data
						} else if (type == 1) {
							this.classDataList = res.data.data
						} else if (type == 2) {
							this.openDataList = res.data.data
						} else {
							this.vedioDataList = res.data.data
							console.log('222=>', this.vedioDataList)
						}
					}
				})
			},

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
			}
		}
	}
</script>
<style>
	page {
		background-color: #f9f9f9;
	}
</style>
<style lang="scss" scoped>
	.popup_mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		z-index: 98;
	}

	.popup_mask {
		opacity: 1;
	}

	.popup_content {
		overflow: hidden;
		box-sizing: border-box;
		padding: 40upx 20upx 0 20upx;
		position: fixed;
		bottom: 25%;
		border-radius: 8px;
		left: 50%;
		margin-left: -45%;
		right: 0;
		min-height: 400upx;
		background: #ffffff;
		width: 90%;
		z-index: 99999999999999;

		.title {
			text-align: center;
			font-size: 34upx;
			padding: 10upx 0 0 0;
		}

		.explain_text {
			font-size: 30upx;
			padding: 30upx 30upx 40upx 30upx;
			line-height: 48upx;

			.line {
				display: block;
				margin-top: 24upx;
				line-height: 48upx;

				.path {
					color: #007aff;
					display: inline-block;
					text-align: center;
				}
			}
		}

		.button1 {
			display: flex;
			padding: 20upx;
			align-items: center;
			font-size: 34upx;
			justify-content: space-around;
			border-top: 1upx solid #f2f2f2;

			view {
				text-align: center;
			}
		}
	}

	.studys {
		width: 100%;

		img {
			width: 100%;
		}
	}

	/deep/.uicon-arrow-right {
		margin-top: -40rpx;
	}

	.video0 /deep/.dynamic_ul {
		border-top: 0 !important;
	}

	.schoolTd {
		position: absolute;
		top: 54rpx;
		right: 50rpx;
	}

	.cur {
		border-radius: 0 0 12rpx 12rpx;
		overflow: hidden;
	}

	.dynamicList,
	.dynamicInformationList {
		padding: 0rpx 22rpx 0rpx 22rpx;
		border-bottom: 0rpx solid #f6f6f6;
	}

	.more {
		font-size: 24rpx;
		color: #262626;
		font-weight: 400;
	}

	.videoTd {
		// margin-top: 42rpx;
	}

	.title_qm {
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 32rpx;
		text-align: center;
		color: #333333;
	}

	.navName {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 26rpx;
		font-weight: bold;
		color: #262626;
		margin-top: 16rpx;
	}

	.classification {
		display: flex;
		flex-wrap: wrap;

		image {
			width: auto;
			height: 80rpx;
		}

		>view {
			width: 25%;
			text-align: center;
			margin: 26rpx 0 26rpx 0;

			view {
				font-size: 24rpx;
				color: #262626;
				font-weight: bold;
			}
		}
	}

	.detailMabn {
		view {
			width: 100%;
			margin: 6rpx 0;

			image {
				width: 100%;
				height: 192.5rpx;
			}
		}
	}

	.navBox {
		margin-top: 11rpx;
		flex-wrap: wrap;
		align-items: flex-start;
		align-content: flex-start；;
	}

	.navBox image {
		border-radius: 50%;
	}

	.navBox:after {
		content: '';
		width: 22%;
		height: 0;
		display: block;
	}

	.navItem {
		width: 22%;
		margin-top: 30rpx;
	}

	.padding32 {
		padding: 21rpx 22rpx 0rpx;
	}

	.curriculumImg {
		width: 348rpx;
		height: 258rpx;
	}

	.curriculumText {
		font-size: 26rpx;
		font-weight: 500;
		color: #262626;
		opacity: 1;
		margin-top: 10rpx;
	}

	.curriculumBox {
		margin-top: 38rpx;
	}

	.borderBottom {
		margin: 38rpx 0;
		border-bottom: 1px solid #e6e6e6;
	}

	.q {
		/deep/ .u-search {
			width: 70%;
		}
	}

	/deep/ .u-search {
		width: 100%;
	}

	.search {
		width: 100%;
	}

	.swiper {
		width: 100%;
		height: 340rpx;
		margin-top: 20rpx;
		background-color: #FFF;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		margin-top: 44rpx;
	}

	.item {
		display: inline-block;
		margin-left: 40rpx;
		width: 542rpx;
	}

	/deep/.spotName {
		font-size: 17px;
		font-weight: bold;
		color: #262626;
		margin-left: 0rpx;
	}

	.searchtitle {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		width: 700rpx;
	}





	.search {
		width: 100%;
	}

	.open1 {
		transition: all .5s;
		right: 0% !important;
	}

	.shrink1 {
		right: -12% !important;
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
		right: -12% !important;
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
		bottom: 22%;
		width: 140rpx;
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

		image {
			width: 76rpx;
		}

		>view {
			width: 25%;
			text-align: center;
			margin: 26rpx 0 26rpx 0;

			view {
				margin-top: 0rpx;
				font-size: 24rpx;
				color: #262626;
				font-weight: bold;
			}
		}
	}

	@import '@/pagesShop/scss/home.scss';
</style>