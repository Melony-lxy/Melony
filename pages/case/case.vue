<template>
	<view>
		<!-- <uniStatusBar /> -->
		<view class="uni-navbar">
			<nav-tab class="nav-tab" :navTab="navTab" :activeIndex.sync="activeIndex" @tabEvent="tabEvent"
				@search="search" />
			<view class="uni-tab-bar">
				<!-- <index :comHeight="comHeight" :padding="tabHeight" v-if="activeIndex === 0" @indexClick="indexClick" /> -->
				<arctan :comHeight="comHeight" :padding="tabHeight" v-if="activeIndex === 1" :pageNum="pageNum" />
				<!-- 动态 -->
				<view class="cell">
<!-- 					<view class="cell-first">
						<view class="content_item" v-if="activeIndex == 0">
							<view> -->
								<!-- <view class="greenSpot"></view> -->
<!-- 								<view class="spotName">
									<view>动态</view>
								</view>
							</view>
							<view @click="activeIndex = 2">
								<view class="more">查看更多</view> -->
								<!-- 						<view><u-icon color="#262626" size="26rpx" name="arrow-right"></u-icon></view> -->
<!-- 							</view>
						</view>
					</view> -->
					<view class="content">
						<!-- <template v-if="activeIndex == 0">
							<view v-if="articleList">
								<view class="dynamicList" v-for="(item, index) in articleList" :key="index">
									<view>
										<dynamicpicture v-if="item.type === 0" :data="item" />
										<dynamicInformation v-else-if="item.type === 1" :data="item" />
										<dynamicpicture v-else-if="item.type === 2 && activeIndex != 3" :data="item" />
									</view>
								</view>
							</view>
							<nullData v-if='articleList.length<=0' :paddingTop="50" />
						</template> -->

						<template v-if="activeIndex == 0">
							<scroll-view scroll-y="true" style="height: 100%;" scroll-anchoring
								@refresherrefresh="refresherrefresh" @refresherrestore="refresherrestore"
								@refresherabort="refresherrestore" :refresher-triggered="refresherTriggered"
								:refresher-threshold="45" refresher-background="#f9f9f9">
								<template v-if="articleList">
									<view class="" style="margin-top: 86rpx;">


										<view class="dynamicList" v-for="(item, index) in articleList" :key="index">
											<view>
												<dynamicpicture v-if="item.type === 0" :data="item" />
												<dynamicInformation v-else-if="item.type === 1" :data="item" />
												<dynamicpicture v-else-if="item.type === 2 && activeIndex != 3"
													:data="item" />
											</view>
										</view>
									</view>
								</template>
								<nullData v-if='articleList.length<=0' :paddingTop="50" />
							</scroll-view>
						</template>

						<arctan :comHeight="comHeight" :padding="tabHeight" v-if="activeIndex == 3"
							:judgeWhich="activeIndex" :pageNum="pageNum" />
						<!-- <view class="dynamicInformationList"><dynamicInformation type="0" /></view>
								<view class="dynamicInformationList"><dynamicInformation type="1" /></view>
								<view class="dynamicInformationList"><dynamicpicture /></view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- </scroll-view> -->

		<!-- <addvlog /> -->
		<!-- <addvlog v-if="status" /> -->
	</view>
</template>
<script>
	import nullData from '../../components/nullData.vue'
	import arctan from '@/components/arctan'
	import navTab from '@/components/nav-tab'
	import index from '@/components/index/index.vue'
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'

	import dynamicInformation from '../../components/dynamicInformation.vue'
	import dynamicpicture from '../../components/dynamicpicture.vue'
	import addvlog from '../../components/addvlog.vue'
	import {
		verifyLogin
	} from '@/plugin/api/index.js'

	let clickIndex = 0
	export default {
		components: {
			nullData,
			navTab,
			arctan,
			index,
			uniStatusBar,
			dynamicInformation,
			dynamicpicture,
			addvlog
		},
		data() {
			return {
				refresherTriggered: false,
				_refresherTriggered: false, //是否开启下拉刷新
				isShow: true,
				current: 0,
				comPadding: 0, //tabbar高度
				comHeight: 0,
				numTop: 0,
				navHeight: 0,
				tabHeight: 0,
				publishBoolean: true,
				swiperheight: 0,
				activeIndex: 0,
				articleList: [],
				articleSearch: '',
				pageNum: 1,
				reHeight: '',
				navTab: [
					{
						name: '文章',
						comment: 'arctan'
					},
					{
						name: '动态',
						comment: 'arctan'
					}
				],
				newsList: [],
				num: null,
				heatNumber: {},
				system: {},
				tasl: 0, //任务的tab
				index: false,
				showtoast: false,
				limit: 5,
				status: false,
			}
		},
		onLoad(options) {
			this.getHeight()
		},
		onReachBottom() {
			this.pageNum++
			if (this.activeIndex == 0) {
				this.getArticle()
			}
		},
		onShow() {
			verifyLogin().then(res => {
				console.log(res)
				if (res.code == 0) {
					this.status = res.data.status
					this.isLogin = true
				} else {
					this.status = false
					this.isLogin = false
				}
			})
			this.showtoast = false
			// 判断是否屏蔽或者解除屏蔽用户
			if (uni.getStorageSync('is_shile')) {
				this.isShow = false
				setTimeout(res => {
					this.isShow = true
					uni.removeStorageSync('is_shile') //重新加载页面并清除当前缓存
				}, 10)
			}
			if (uni.getStorageSync('caseIndex')) {
				this.isShow = false
				setTimeout(res => {
					this.isShow = true
					this.activeIndex = uni.getStorageSync('caseIndex')
					uni.removeStorageSync('caseIndex')
				}, 10)
				this.activeIndex = uni.getStorageSync('caseIndex')
			} else {
				this.activeIndex = 0
			}
			// uni.hideTabBar()
		},
		mounted() {
			this.getComHeight()
		},
		methods: {
			// 自定义下拉刷新被触发
			refresherrefresh() {
				let top = document.documentElement.scrollTop || document.body.scrollTop
				// 实现滚动效果
				const timeTop = setInterval(() => {
					document.body.scrollTop = document.documentElement.scrollTop = top -= 50
					if (top <= 0) {
						clearInterval(timeTop)
					}
				}, 10)
				let _this = this
				if (_this._refresherTriggered) {
					return
				}
				_this._refresherTriggered = true
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true
				}
				this.loadStoreData()
			},
			// 自定义下拉刷新被复位 自定义下拉刷新被中止
			refresherrestore() {
				let _this = this
				_this.refresherTriggered = false
				_this._refresherTriggered = false
			},
			loadStoreData() {
				this.pageNum = 1
				this.articleList = []
				this.showtoast = false
				this.getArticle()
			},
			// 获取数据
			getArticle() {
				this.$axios({
					url: this.$url[48],
					data: {
						page: this.pageNum,
						limit: this.limit,
						query: this.articleSearch
					}
				}).then(res => {
					console.log('this.showtoast', this.showtoast)
					if (this.showtoast) {
						uni.showToast({
							title: '已加载全部',
							icon: 'none'
						})
						return
					}
					if (this.refresherTriggered) {
						this.refresherTriggered = false //触发onRestore，并关闭刷新图标
						this._refresherTriggered = false
						uni.showToast({
							title: '刷新成功',
							icon: 'none'
						})
					}
					if (res.data.data.length < this.limit) {
						this.showtoast = true
					}
					res.data.data.forEach(item => this.articleList.push(item))
					// #ifdef H5
					// if (this.activeIndex == 1) {
					// 	document.getElementsByClassName('recommend')[0].setAttribute('style', `height: auto !important`)
					// }
					// #endif

				})
			},
			lookHotList() {
				this.activeIndex = 1
			},
			// index点击事件
			indexClick(id) {
				this.activeIndex = 1
				this.index = true
			},
			//获取屏幕可用高度
			getHeight() {
				uni.getSystemInfo({
					success: res => {
						let height = res.windowHeight
						this.swiperheight = height
					}
				})
			},
			changeHot() {
				this.activeIndex = 1
			},
			tabHeights(res) {
				this.tabHeight = res
			},
			getComHeight() {
				let query = uni.createSelectorQuery().in(this)
				query
					.select('.nav-tab')
					.boundingClientRect(res => {
						this.navHeight = res.height
					})
					.exec()

				this.comHeight = this.swiperheight
			},
			navgit(res) {
				;
				(this.activeIndex = 1), (this.tasl = res)
			},
			scroll(res) {
				this.scollHeight = res.detail.scrollTop
				this.numTop = -1
			},
			video(i) {
				uni.navigateTo({
					url: '/packgeA/case/videoplay?id=' + i
				})
			},
			// 切换nav 将重新搜索热点
			tabEvent(index) {
				//缓存index值
				uni.setStorage({
					key: 'caseIndex',
					data: index
				});
				this.showtoast = false
				this.activeIndex = index
				this.articleList = []
				this.pageNum = 1
				if (index == 0) {
					this.articleSearch = {
						type: 1
					}
					this.getArticle()
				} else if (index == 1) {
					this.articleSearch = {
						is_best: 1
					}
					this.getArticle()
				} else if (index == 2) {
					return
				} else {
					this.articleSearch = {
						type: 2
					}
				}
			},
			//搜索
			search(index) {
				uni.navigateTo({
					url: '/packgeA/case/search/search?id=0'
				})
			}
		}
	}
</script>
<style>
	.dynamicList {
		/* 	background-color: #666; */
		/* padding-bottom:20rpx; */
		padding: 10rpx 20rpx 0rpx 20rpx;
		border-bottom: 20rpx solid #f6f6f6;

	}

	.u-mode-center-box {
		height: auto !important;
	}
</style>

<style scoped lang="scss">
	/deep/ .acr {
		width: 100%;
		top: 86rpx;
		position: fixed;
		padding-bottom: var(--window-bottom);
	}

	/deep/.uni-scroll-view-content {
		height: 110%;

	}

	/deep/ .recommend {
		padding: 0rpx;
	}

	/deep/ .dynamic1 {
		padding: 0;
	}

	.cell {
		background-color: #f6f6f6;

		>.content {
			background: #fff;
		}
	}

	.cell-first {
		display: flex;
		justify-content: center;
		background-color: #fff;
	}

	/deep/ .dynamic_ul {
		border-top: 0 !important;
	}

	/deep/ .dynamic-content {
		padding: 10rpx;
	}

	.content_item {
		display: flex;
		justify-content: space-between;
		align-items: end;
		height: 42rpx;
		width: 100%;
		padding: 0rpx 20rpx;
		margin-top: 39rpx !important;

		.spotName {
			font-size: 32rpx;
			color: #333;
			font-weight: bold;
			margin-left: 10rpx;
		}

		.more {
			line-height: 42rpx;
			margin-right: 10rpx;
			font-size: 28rpx;
			color: #888;
		}
	}

	.uni-navbar {
		// padding-top: var(--status-bar-height);
	}

	.padding {
		padding: 0 32upx;
	}

	.uni-tab-bar {
		background: #f9f9f9;
		/* padding-top: 80upx; */
	}

	.no-data {
		text-align: center;
		margin-top: 160upx;
	}

	.no-data>image {
		width: 450upx;
		height: 450upx;
	}

	.publish {
		position: fixed;
		bottom: 20px;
		right: 10px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		text-align: center;
		line-height: 44px;
		font-size: 50px;
		background: #007aff;
		color: #fff;
		font-weight: 200;
	}

	/deep/ .nav-bar {
		width: auto !important;
	}

	.information-warp {
		display: flex;
		justify-content: space-evenly;
		margin-top: 20px;
	}

	.big-shot {
		width: 690upx;
		height: 50px;
		background: #72ffff;
		font-size: 32upx;
		border-radius: 20px;
		margin: 0 auto;
		margin-top: 10px;
		color: #333;
		line-height: 50px;
		text-indent: 20px;
	}

	.information-warp>view {
		flex: 1;
		text-align: center;
		position: relative;
	}

	.information-warp .dots {
		position: absolute;
		right: 50upx;
		top: -20upx;
		z-index: 999;
	}

	.information-warp .icon {
		width: 100upx;
		height: 100upx;
	}

	.guide {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.guide>image {
		position: absolute;
		right: 5px;
		top: 50px;
	}

	.dynamic2 {
		width: 104rpx;
		height: 104rpx;
		position: fixed;
		right: 30rpx;
		bottom: 180rpx;
		border-radius: 50%;
		background-color: #FFF;
		image {
			width: 100%;
			height: 100%;
		}

		&:hover {
			transform: rotate(180deg);
		}
	}

	.release {
		display: flex;
		align-items: center;
		color: #ffffff;
		margin: 60rpx 0rpx;
		font-weight: bold;

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
	}

	.popupCenter {
		width: 100%;
		// height: 90vh;
		position: relative;

		.close {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: fixed;
			left: 50%;
			bottom: 100rpx;
			transform: translateX(-50%);

			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}

	.andimaiteList {
		animation: up 2s forwards;
	}

	/deep/.u-mode-center-box {
		background-color: transparent;
	}

	@keyframes up {
		0% {
			transform: rotate(0);
			transform: scale(1);
		}

		100% {
			transform: rotate(180deg);
			transform: scale(1.05);
		}
	}
</style>
