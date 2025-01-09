<template>
	<view v-if="informationlist">
		<view class="top" :style="{ 'background-image': `url(${common.imgUrl('/static/images/bc.png')})` }">
			<view class="title">
				<view class="title-img">
					<img :src="common.imgUrl(informationlist.avatar_url)" alt="">
				</view>
				<view class="title-name">
					<view class="first-name">{{ informationlist.nick }}</view>
					<view class="second-img">
						<image :src="common.imgUrl('/static/my/img4.png')" mode="widthFix"></image>
						<text>{{ informationlist.school ? informationlist.school : '未填学校' }}</text>
					</view>
				</view>
			</view>
			<view class="mytalk" v-if="informationlist.profile">{{ informationlist.profile }}</view>
			<view class="mytalk" v-else>
				向大家介绍一下你自己
				<u-icon name="edit-pen" color="#FFFFFF"></u-icon>
			</view>
			<view class="myhobby">
				<view class="myhobby1" v-if="informationlist.gender == 1">
					<image :src="common.imgUrl('/static/images/man.png')" mode="widthFix"></image>
					{{ birthday }}
				</view>
				<view class="myhobby1" v-if="informationlist.gender == 2">
					<image :src="common.imgUrl('/static/images/woman.png')" mode="widthFix"></image>
					{{ birthday }}
				</view>
				<!-- <view class="myhobby2">+添加地区、兴趣爱好</view> -->
			</view>
			<view class="myfans">
				<view class="myfans-left" v-if="informationlist.oneself != false">
					<view class="first-fans">
						<view class="myfans-num" @click="followFan(0)">{{ informationlist.follow_count }}</view>
						<view class="myfans-text" @click="followFan(0)">关注</view>
					</view>
					<view>
						<view class="myfans-num" @click="followFan(1)">{{ informationlist.fans_count }}</view>
						<view class="myfans-text" @click="followFan(1)">粉丝</view>
					</view>
					<view>
						<view class="myfans-num">{{ informationlist.like_count }}</view>
						<view class="myfans-text">获赞</view>
					</view>
				</view>
				<view class="myfans-left" v-else>
					<view class="first-fans">
						<view class="myfans-num">{{ informationlist.follow_count }}</view>
						<view class="myfans-text">关注</view>
					</view>
					<view>
						<view class="myfans-num">{{ informationlist.fans_count }}</view>
						<view class="myfans-text">粉丝</view>
					</view>
					<view>
						<view class="myfans-num">{{ informationlist.like_count }}</view>
						<view class="myfans-text">获赞</view>
					</view>
				</view>
				<view class="myfans-right1" v-if="informationlist.oneself != false">
					<view @click="gopersonalData()" class="first-right"><text>编辑资料</text></view>
					<view @click="gosetUp()" class="second-right">
						<image :src="common.imgUrl('/static/images/gear.png')" mode="widthFix"></image>
					</view>
				</view>
				<view class="myfans-right2" v-if="informationlist.oneself == false && informationlist.follow == true"
					@click="followUp(0)">
					<text>已关注</text>
				</view>
				<view class="myfans-right3" v-if="informationlist.oneself == false && informationlist.follow == false"
					@click="followUp(1)">
					<text>+ 关注</text>
				</view>
			</view>
		</view>
		<!-- <view class="choosehead"> -->
		<nav-tab class="nav-tab" :navTab="list1" :activeIndex.sync="activeIndex" @tabEvent="search" />
		<!-- </view> -->
		<view>
			<view v-if="activeIndex === 0">
				<caseList style="padding-bottom: 100rpx" :list="worksList" class="padding" :uid="informationlist.id" :judgeWhich="4" v-if="showworksList"/>
			</view>
			<view v-else>
				<template v-if="showbodylist">
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="getList" scroll-anchoring
						@refresherrefresh="refresherrefresh" @refresherrestore="refresherrestore"
						@refresherabort="refresherrestore" :refresher-triggered="refresherTriggered"
						:refresher-threshold="45" :refresher-enabled="true" refresher-background="#f9f9f9"
						v-if="bodylist">
						<view v-for="(item, i) in bodylist" :key="i">
							<dynamicInformation :data="item" />
						</view>
					</scroll-view>
				</template>
				<view v-if="showlist">
					<arctan :comHeight="comHeight" :padding="tabHeight" v-if="showlist" :uid="informationlist.id"
						:judgeWhich="searchwhich" personalcenter="personalcenter" :pageNum="pages" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import navTab from '@/components/nav-tab'
	import dynamicInformation from '@/components/dynamicInformation.vue'
	import arctan from '@/components/arctan'
	import caseList from "@/components/case-list/case-list.vue";
	export default {
		components: {
			navTab,
			dynamicInformation,
			arctan,
			caseList
		},
		data() {
			return {
				showworksList:false,
				reFresh: '',
				tabHeight: 0,
				comHeight: 0,
				swiperheight: 0,
				searchwhich: 0,
				activeIndex: 0,
				list1: [{
						name: '作品'
					},
					{
						name: '文章'
					},
					{
						name: '短视频'
					},
					{
						name: '动态'
					}
				],
				informationlist: [],
				pages: 1,
				limit: 20,
				pageWorks: 1,
				worksList: [],
				showlist: false,
				bodylist: [],
				showbodylist: true,
				i: 0,
				whichone: null,
				birthday: '',
				refresherTriggered: false,
				_refresherTriggered: false, //是否开启下拉刷新
				durations: 500,
				showtoast: false,
				urloption: ''
			}
		},
		onLoad(option) {
			this.getHeight()
			this.urloption = option
		},
		onShow(option) {
			this.pages = 1
			this.bodylist = []
			this.showtoast = false
			this.getlist()
		},
		mounted() {
			this.getComHeight()
		},
		onReachBottom() {
			if (this.activeIndex === 0) {
				this.pageWorks++
				this.$nextTick(()=>{
					this.getWorksList()
				})
			} else {
				this.pages++
				if (this.whichone == 1) {
					this.getarticle(this.whichone)
				}
			}
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
				this.bodylist = []
				this.pages = 1
				this.showtoast = false
				this.getarticle(this.whichone)
			},
			howold() {
				let ttime = new Date()
				let btime = new Date(this.informationlist.birthday)
				let tyear = ttime.getFullYear()
				let byear = btime.getFullYear()
				let tmonth = ttime.getMonth()
				let bmonth = btime.getMonth()
				let tday = ttime.getDate()
				let bday = btime.getDate()
				let age = Number(tyear) - Number(byear)
				if (Number(bmonth) > Number(tmonth)) {
					age--
				} else if (Number(bmonth) == Number(tmonth)) {
					if (Number(tday) > Number(bday)) {
						age--
					}
				}
				this.birthday = age
			},
			//获取屏幕可用高度
			getHeight() {
				uni.getSystemInfo({
					success: res => {
						let height = res.windowHeight -15
						this.swiperheight = height
					}
				})
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
			// 获取作品
			getWorksList() {
				this.$axios({
					url: this.$url[100],
					data: {
						page: this.pageWorks,
						limit: this.limit,
						query: {
							uid: this.informationlist.id
						}
					}
				}).then(res => {
					if (res.code == 0) {
						res.data.data.forEach(item => {
							this.worksList.push(item)
						})
						this.showworksList=true
					}
				})
			},
			// 获取文章
			getarticle(index) {
				this.$axios({
					url: this.$url[48],
					data: {
						page: this.pages,
						limit: this.limit,
						query: {
							type: index,
							uid: this.informationlist.id
						}
					}
				}).then(res => {
					if (res.code == 0) {
						if (this.showtoast) {
							uni.showToast({
								title: '已显示全部',
								icon: 'none'
							})
						}
						if (res.data.data.length < this.limit) {
							this.showtoast = true
						}
						res.data.data.forEach(item => {
							this.bodylist.push(item)
						})
						if (this.refresherTriggered) {
							this.refresherTriggered = false //触发onRestore，并关闭刷新图标
							this._refresherTriggered = false
							uni.showToast({
								title: '刷新成功',
								icon: 'none'
							})
						}
					}

				})
			},
			followFan(i) {
				uni.navigateTo({
					url: '/packgeA/followFans/followFans?type=' + i
				})
			},

			gosetUp() {
				uni.navigateTo({
					url: '/packgeA/setUp/setUp'
				})
			},
			gopersonalData() {
				uni.navigateTo({
					url: '/packgeA/personalData/personalData'
				})
			},
			// 点赞
			followUp(i) {
				let num = ''
				if (this.informationlist.follow == false) {
					num = 0
				} else {
					num = 1
				}
				if (i == 0) {
					uni.showModal({
						title: "提示",
						content: "您确定取消关注么?",
						success: (res) => {
							if (res.confirm) {
								this.$axios({
									url: this.$url[51],
									data: {
										id: this.informationlist.id,
										status: 3,
										changeStatus: num
									}
								}).then(res => {
									if (res.code == 0) {
										this.informationlist.follow = false
										uni.showToast({
											title: '取消关注',
											icon: 'none'
										})
									}
								})
								}
					}
					})
					return
				}
				this.$axios({
					url: this.$url[51],
					data: {
						id: this.informationlist.id,
						status: 3,
						changeStatus: num
					}
				}).then(res => {
					if (res.code == 0) {
						this.informationlist.follow = true
						uni.showToast({
							title: '关注成功',
							icon: 'none'
						})
					}
				})
			},
			// 页面列表
			getlist() {
				if (this.urloption.uid == undefined) {
					this.$axios({
						url: this.$url[79]
					}).then(res => {
						if (res.code == 0) {
							this.informationlist = res.data
							this.howold()
							this.whichone = 1
							this.getarticle(this.whichone)
							this.pageWorks = 1
							this.worksList = []
							this.showworksList=false
								this.getWorksList()
						}
					})
				} else {
					this.$axios({
						url: this.$url[79],
						data: {
							uid: this.urloption.uid
						}
					}).then(res => {
						if (res.code == 0) {
							this.informationlist = res.data
							this.howold()
							this.whichone = 1
							this.getarticle(this.whichone)
							this.pageWorks = 1
							this.worksList = []
							this.$nextTick(()=>{
								this.getWorksList()
							})
						}
					})
				}
			},
			//显示tabbar
			search(index) {
				console.log('index', index)
				this.activeIndex = index
				this.pages = 1
				this.showtoast = false
				// #ifndef H5
				// let List = document.getElementsByClassName('nav-one')
				// List[index].className += ' choosewhich'
				// for (let i = 0; i < List.length; i++) {
				// 	if (i != index) {
				// 		List[i].className = 'nav-one'
				// 	}
				// }
				// #endif

				this.bodylist = []
				this.searchwhich = index
				if (index == 1) {
					if (this.i == 0) {
						this.i++
						return
					}
					this.showlist = false
					this.showbodylist = true
					this.whichone = 1
					this.getarticle(this.whichone)
				} else if (index == 2) {
					this.showlist = false
					this.searchwhich = 2
					this.showbodylist = false
					this.$nextTick(function() {
						this.showlist = true
					})
				} else if (index == 3) {
					this.showlist = false
					this.searchwhich = 0
					this.showbodylist = false
					this.$nextTick(function() {
						this.showlist = true
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	 /deep/ .example-body{
		width: 100%;
		position: initial !important;
		top: 0%;
		background-color: white;
		z-index: 999;
	}
	/deep/ .padding1 {
		position: relative;
	}

	/deep/ uni-swiper {
		height: 1000rpx;
	}

	.top {
		padding-top: 60rpx;
		padding-left: 28rpx;
		background-repeat: no-repeat;
		background-size: 750rpx 700rpx;
		background-position: left bottom;
		padding-bottom: 43rpx;
	}

	.title {
		display: flex;
		align-items: center;
		margin-bottom: 35rpx;

		.title-img {
			width: 155rpx;
			height: 155rpx;

			img {
				width: 155rpx;
				height: 155rpx;
				object-fit: cover;
				border-radius: 50%;
			}
		}

		.title-name {
			margin-left: 28rpx;

			image {
				width: 32rpx;
				height: 32rpx;
				z-index: 1;
			}

			>.first-name {
				font-size: 44rpx;
				font-family: Source Han Sans SC-Medium, Source Han Sans SC;
				font-weight: 500;
				color: #ffffff;
			}

			>.second-img {
				margin-top: 13rpx;
				display: flex;
				align-items: center;

				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN-Normal, Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					margin-left: 8rpx;
				}
			}
		}
	}

	.mytalk {
		font-size: 24rpx;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		font-weight: 400;
		color: #ffffff;
		margin-bottom: 33rpx;
	
	.u-icon {
			margin-left: 10rpx;
		}
	}

	.myhobby {
		display: flex;
		margin-bottom: 52rpx;
	}

	.myhobby1 {
		display: flex;
		align-items: center;
		font-size: 20rpx;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		font-weight: 400;
		color: #ffffff;
		background-color: rgba($color: #ffffff, $alpha: 0.33);
		padding: 8rpx 19rpx;
		border-radius: 24rpx;

		image {
			width: 30rpx;
		}
	}

	.myhobby2 {
		font-size: 20rpx;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		font-weight: 400;
		color: #ffffff;
		padding: 8rpx 13rpx;
		background-color: rgba($color: #ffffff, $alpha: 0.33);
		border-radius: 24rpx;
		margin-left: 9rpx;
	}

	.myfans {
		display: flex;
		justify-content: space-between;
		margin-right: 29rpx;
	}

	.myfans-left {
		display: flex;
		text-align: center;

		>.first-fans {
			margin-right: 16rpx !important;
			margin-left: 0 !important;
		}

		>view {
			margin: 0 16rpx;
		}
	}

	.myfans-right1 {
		display: flex;

		>.first-right {
			font-size: 24rpx;
			font-family: Source Han Sans CN-Normal, Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
			padding: 13rpx 39rpx;
			background-color: rgba($color: #ffffff, $alpha: 0.33);
			border-radius: 38rpx;
			line-height: 48rpx;
			border: 2rpx solid #ffffff;
		}

		>.second-right {
			padding: 13rpx 33rpx;
			background-color: rgba($color: #ffffff, $alpha: 0.33);
			border-radius: 38rpx;
			line-height: 48rpx;
			border: 2rpx solid #ffffff;
			margin-left: 29rpx;
		}

		image {
			width: 24rpx;
		}
	}

	.myfans-num {
		font-size: 24rpx;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		font-weight: 400;
		color: #ffffff;
		margin-bottom: 13rpx;
	}

	.myfans-text {
		font-size: 22rpx;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		font-weight: 400;
		color: #ffffff;
	}

	/deep/.nav-one {
		font-size: 28rpx;
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;
		font-weight: 500;
		color: #969799;
	}

	/deep/ .success {
		color: #969799 !important;
	}

	/deep/ .choosewhich {
		font-size: 28rpx !important;
		font-family: Source Han Sans CN-Medium, Source Han Sans CN !important;
		font-weight: 500 !important;
		color: #000000 !important;
	}

	.myfans-right2 {
		font-size: 24rpx;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		font-weight: 400;
		line-height: 48rpx;
		color: #ffffff;
		padding: 13rpx 61rpx;
		background-color: rgba($color: #ffffff, $alpha: 0.33);
		border: 2rpx solid #ffffff;
		border-radius: 38rpx;
	}

	.myfans-right3 {
		font-size: 24rpx;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		font-weight: 400;
		line-height: 48rpx;
		color: #ffffff;
		padding: 13rpx 61rpx;
		background-color: #ff6638;
		border: 2rpx solid #ff6638;
		border-radius: 38rpx;
	}
</style>
