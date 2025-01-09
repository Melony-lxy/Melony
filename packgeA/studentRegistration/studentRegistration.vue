<template>
	<view>
		<img class="student" :src="common.imgUrl(lists.img)">
		<view class="content" style="margin-top: -8rpx;">
			<view class="content-f">
				<view class="Name">
					<view class="name">
						{{lists.name}}
					</view>
					<view class="share" @click="sharePoster1()" v-if="type==1">
						<img :src="common.imgUrl('/static/shares.png')" alt=""> 分享
					</view>
					<view class="share" @click="sharePosters()" v-else>
						<img :src="common.imgUrl('/static/shares.png')" alt=""> 分享
					</view>
				</view>
				<u-popup v-model="showshare" mode="bottom" @maskClick="hide" :isDirectClose="true">
					<view class="more-list align-center">
						<view class="more-item" @tap="sharePoster()">
							<image :src="common.imgUrl('/static/more-weixin.png')" mode=""></image>
							<view class="more-title">生成海报</view>
						</view>
						<!-- #ifdef APP -->
						<view class="more-item" @tap="sharecircle('WXSceneSession')">
							<image :src="common.imgUrl('/static/more-friend.png') mode=""></image>
							<view class="more-title">朋友圈</view>
						</view>
						<!-- #endif -->
					</view>
				</u-popup>
				<view class="details" v-if="lists.introduce!=null">
					{{lists.introduce}}
				</view>
				<view class="time" v-if="lists.is_effective===0 && lists.status=='0'">
					<img :src="common.imgUrl('/static/time.png')" alt=""/>
					<span style="margin-right: 20rpx;">距 离 开 始 仅 剩</span>
					<u-count-down :timestamp="timestamp1" color="#ff3b00" font-size="30" separator-color="#000000"
						separator="zh" :show-seconds="false"></u-count-down>
				</view>
				<view class="time" v-if="lists.is_effective===0 && lists.status=='1'">
					<img :src="common.imgUrl('/static/time.png')" alt=""/>
					<span style="margin-right: 20rpx;">距 离 结 束 仅 剩</span>
					<u-count-down :timestamp="timestamp" color="#ff3b00" font-size="30" separator-color="#000000"
						separator="zh" :show-seconds="false"></u-count-down>
				</view>
			</view>
			<view class="marketing">
				<span>千芒营销宝</span>老师都爱用的招生工具
			</view>
			<view class="content-c r" v-if="show">
				<view class="Content">
					<view :class="{ active: selectPayment == index }" v-for="(item, index) in list" :key="index"
						@click="changelist(index)">
						{{item.name}}
						<view class="line" :class="{ active: selectPayment == index }"></view>
					</view>
				</view>
			</view>
			<view class="content-c r" style="position: fixed;top: 44px;z-index: 1;" v-else>
				<view class="Content">
					<view :class="{ active: selectPayment == index }" v-for="(item, index) in list" :key="index"
						@click="changelist(index)">
						{{item.name}}
						<view class="line" :class="{ active: selectPayment == index }"></view>
					</view>
				</view>
			</view>
			<view class="content-b q" style="margin-top: 30rpx;">
				<view class="title"> 活动介绍 </view>
				<view class="" v-for="(item, index) in lists.content" :key="index">
					<view class="article" v-if="item.type===0">
						<rich-text :nodes="item.data"></rich-text>
					</view>
					<view class="picture" v-else>
						<image :src="common.imgUrl(item.data)" mode=""></image>
					</view>
				</view>
				<!-- <view class="title1">
					课程表
				</view>
				<view class="picture">
					<image src="" mode=""></image>
				</view>
				<view class="title1">
					强大的师资
				</view>
				<view class="picture">
					<image src="" mode=""></image>
				</view>
				<view class="title1">
					优质的环境
				</view>
				<view class="picture">
					<image src="" mode=""></image>
				</view> -->
			</view>
			<view class="content-b w">
				<view class="title"> 学校介绍 </view>
				<view class="article">
					{{lists1.profile}}
				</view>
			</view>
			<view class="content-b e">
				<view class="home" style="margin-top: 50rpx;">
					<img :src="common.imgUrl('/static/home.png')" alt="">{{lists1.name}}
				</view>
				<view class="home">
					<img :src="common.imgUrl('/static/phone.png')" alt="">{{lists1.phone}}
					<view class="calling" @click="calling1()" v-if="type==1"> 拨打 </view>
					<view class="calling" @click="calling()" v-else> 拨打 </view>
				</view>
				<view class="home wz"
					style="margin-bottom: 50rpx;display: flex; align-items: center;line-height: 150%;">
					<img :src="common.imgUrl('/static/position.png')" alt="">{{lists1.address}}
				</view>
			</view>
			<view class="marketing1"> —— 7mango千芒营销宝 —— </view>
			<view class="Marketing">
				<view class="marketing2" @click="go()" v-if="lists.status=='1' && type!=1"> 我要报名 </view>
				<view class="marketing2" @click="go1()" v-if="type==1"> 我要报名 </view>
			</view>
		</view>
		<!-- 分享 -->
		<share :show="isShow" :lists="lists" @hide="hide"></share>
		<QrcodePoster ref="poster" :title="lists.name" :headerImg="lists.img" :url="url" subTitle='' abImg=''
			:item="lists.id" :show='QrcodePoster' @show='showQrcodePoster'></QrcodePoster>
	</view>
</template>
<script>
	import share from '@/components/share/share.vue';
	import QrcodePoster from '@/components/zhangyu-qrcode-poster1/zhangyu-qrcode-poster.vue'
	export default {
		components: {
			share,
			QrcodePoster,
		},
		data() {
			return {
				showshare: false,
				is_show_model: true,
				QrcodePoster: false,
				isShow: false,
				lists: {},
				lists1: {},
				id: '',
				type: '',
				timestamp: 100,
				timestamp1: 100,
				show: true,
				swiperHeight: '',
				swiperHeight1: '',
				swiperHeight2: '',
				swiperHeight3: '',
				selectPayment: 0,
				url: '',
				list: [{
					name: '活动介绍'
				}, {
					name: '学校介绍'
				}, {
					name: '联系方式'
				}],
			};
		},
		onPageScroll(e) {
			let that = this;
			let height = e.scrollTop
			if (height > that.swiperHeight3) {
				this.show = false
			} else {
				this.show = true
			}
		},
		onShareAppMessage(res) {
			this.share()
			return {
				title: this.lists.name,
				imageUrl: this.common.imgUrl(this.lists.img),
				path: '/packgeA/login/login?' + this.lists.param
			}
		},
		onShareTimeline() {
			this.share()
			return {
				title: this.lists.name,
				imageUrl: this.common.imgUrl(this.lists.img),
				path: '/packgeA/login/login?' + this.lists.param
			}
		},
		onLoad(option) {
			this.id = option.id
			if (option.type) {
				this.type = option.type
			}
			this.url = this.type == 0 ? this.$base_url + '/orgCode?receive=' + option.id : this.$base_url +
				'/orgCode?market=' + option.id
			this.$axios({
				url: this.$url[107],
				data: {
					id: option.id,
					type: option.type
				}
			}).then(res => {
				console.log(res);
				this.lists = res.data
				this.lists.content.map(res => {
					if (res.type == 1) {
						return
					}
					return res.data = res.data.replace(/[\n\r]/g, '<br>')
				})
				let time1 = `${res.data.effective_start_time} 00:00:00`
				let now1 = new Date()
				this.timestamp1 = Math.round(parseInt(new Date(time1) - now1) / 1000)
				let time = `${res.data.effective_end_time} 24:00:00`
				let now = new Date()
				this.timestamp = Math.round(parseInt(new Date(time) - now) / 1000)
				if (this.lists.status == '0') {
					uni.showModal({
						title: '提示',
						content: '活动未开始',
					})
				} else if (this.lists.status == '2') {
					uni.showModal({
						title: '提示',
						content: '活动已结束',
					})
					this.timestamp = 0
				} else if (this.lists.status == '3') {
					uni.showModal({
						title: '提示',
						content: '活动已下架',
					})
					this.timestamp = 0
				}
				this.$axios({
					url: this.$url[110],
					data: {
						id: res.data.oid
					}
				}).then(res => {
					this.lists1 = res.data
					console.log(this.lists1);
				})
			})
		},
		mounted() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
			setTimeout(() => {
				let that = this;
				uni.getSystemInfo({
					success: resu => {
						// resu 可以获取当前屏幕的高度
						const query = uni.createSelectorQuery();
						query.select('.r').boundingClientRect();
						query.exec(res => {
							that.swiperHeight3 = res[0].top + 50;
							console.log('页面的剩余高度', that.swiperHeight3);
						});
					},
					fail: res => {}
				});
				uni.getSystemInfo({
					success: resu => {
						// resu 可以获取当前屏幕的高度
						const query = uni.createSelectorQuery();
						query.select('.q').boundingClientRect();
						query.exec(res => {
							that.swiperHeight = res[0].top - 65;
							console.log('页面的剩余高度', that.swiperHeight);
						});
					},
					fail: res => {}
				});
				uni.getSystemInfo({
					success: resu => {
						// resu 可以获取当前屏幕的高度
						const query = uni.createSelectorQuery();
						query.select('.w').boundingClientRect();
						query.exec(res => {
							that.swiperHeight1 = res[0].top - 130;
							console.log('页面的剩余高度', that.swiperHeight1);
						});
					},
					fail: res => {}
				});
				uni.getSystemInfo({
					success: resu => {
						// resu 可以获取当前屏幕的高度
						const query = uni.createSelectorQuery();
						query.select('.e').boundingClientRect();
						query.exec(res => {
							that.swiperHeight2 = res[0].top - 65;
							console.log('页面的剩余高度', that.swiperHeight2);
						});
					},
					fail: res => {}
				});
			}, 300)
		},
		onReady() {},
		methods: {
			share() {
				this.$axios({
					url: this.$url[111],
					data: {
						id: this.id,
						type: this.type
					}
				})
			},
			sharePosters() {
				this.showshare = true
			},
			showQrcodePoster() {
				this.QrcodePoster = false
			},
			sharecircle() {
				const _this = this
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: this.$base_url + '/h5/packgeA/studentRegistration/studentRegistration?id=' + this.id,
					title: this.lists.name,
					imageUrl: this.common.imgUrl(this.lists.img),
					success: function(res) {
						_this.share()
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			sharePoster() {
				this.showshare = false
				//获取带参数二维码
				// this.is_show_model = false
				// this.$refs.poster.showCanvas(this.details.img)
				this.QrcodePoster = true
				this.share()
			},
			sharePoster1() {
				uni.showModal({
					title: '提示',
					content: '预览不提供分享功能',
				})
			},
			shareShow() {
				this.isShow = true;
			},
			hide(e) {
				this.isShow = e;
			},
			go() {
				uni.navigateTo({
					url: `/packgeA/application/application?id=${this.id}&type=${this.type} `
				})
			},
			go1() {
				uni.showModal({
					title: '提示',
					content: '预览不提供报名功能',
				})
			},
			calling() {
				uni.makePhoneCall({
					phoneNumber: '18025922565'
				});
			},
			calling1() {
				uni.showModal({
					title: '提示',
					content: '预览不提供拨打功能',
				})
			},
			changelist(index) {
				let that = this
				if (index == 0) {
					uni.pageScrollTo({
						scrollTop: that.swiperHeight,
						duration: 300
					});
				} else if (index == 1) {
					uni.pageScrollTo({
						scrollTop: that.swiperHeight1,
						duration: 300
					});
				} else if (index == 2) {
					uni.pageScrollTo({
						scrollTop: that.swiperHeight2,
						duration: 300
					});
				}
				this.selectPayment = index
			}
		}
	}
</script>
<style lang="scss" scoped>
	.more-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.more-title {
		font-size: 24rpx;
	}

	.more {
		position: absolute;
		bottom: 0;
		width: 100%;
		background: #fff;
		z-index: 2;
	}

	.more-list {
		justify-content: space-around;
		padding: 20upx 0;
	}

	.more-item {
		text-align: center;
		margin: 0 20upx;
		font-size: 24rpx;
	}

	.more-item>image {
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}

	.more-item>view {
		/* margin-top: -20upx; */
	}

	.cancel {
		border-top: 1px solid #e6e6e6;
		padding: 10upx 0;
		text-align: center;
	}

	.wz {
		img {
			margin-top: 0rpx !important;
		}
	}

	.active {
		color: #323232 !important;
		display: block !important;
	}

	.student {
		width: 100%;
		height: auto;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover !important;
		}
	}

	.content {
		width: 100%;
		height: auto;
		background-color: #F5F5F5;
		overflow: hidden;

		.content-f {
			width: 100%;
			height: auto;
			background-color: white;
			border-radius: 38rpx;
			overflow: hidden;

			.details {
				width: 90%;
				display: flex;
				height: 60rpx;
				margin: auto;
				align-items: center;
				color: #989898;
				font-size: 28rpx;
				margin-bottom: 30rpx;
			}

			.Name {
				width: 90%;
				margin: auto;
				height: 110rpx;
				margin-top: 0rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10rpx;
				margin-bottom: 10rpx;

				.name {
					width: 85%;
					font-size: 40rpx;
					font-weight: bold;
				}

				.share {
					width: 136rpx;
					height: 60rpx;
					border-radius: 50rpx;
					margin-left: 20rpx;
					// background-color: red;
					background-color: #F5F6F8;
					text-align: center;
					line-height: 60rpx;
					color: #444444;
					font-size: 28rpx;
					display: flex;
					justify-content: center;

					img {
						width: 32rpx;
						height: 32rpx;
						margin-top: 15rpx;
						margin-right: 8rpx;
						margin-left: 6rpx;
					}
				}
			}

			.time {
				width: 90%;
				margin: auto;
				height: auto;
				// line-height: 100rpx;
				display: flex;
				margin-bottom: 40rpx;
				font-size: 30rpx;

				img {
					width: 34rpx;
					height: 34rpx;
					margin-top: 4rpx;
					margin-right: 20rpx;
				}
			}
		}

		.marketing {
			width: 90%;
			height: 60rpx;
			margin: auto;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			border-radius: 50rpx;
			background-color: white;
			text-align: center;
			line-height: 60rpx;
			color: #6A6A6A;
			font-size: 24rpx;

			span {
				color: #FF6638;
				margin-right: 20rpx;
			}
		}

		.marketing1 {
			width: 90%;
			height: 80rpx;
			margin: auto;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			text-align: center;
			line-height: 80rpx;
			color: #CCCCCC;
			font-size: 28rpx;
		}

		.Marketing {
			padding: 50rpx;
			border-top-left-radius: 38rpx;
			border-top-right-radius: 38rpx;
			background-color: white;

			.marketing2 {
				width: 95%;
				height: 100rpx;
				margin: auto;
				border-radius: 50rpx;
				background: #FF6638;
				text-align: center;
				line-height: 100rpx;
				color: white;
				font-size: 32rpx;
			}
		}

		.content-c {
			width: 100%;
			height: 100rpx;
			background-color: white;

			.Content {
				width: 70%;
				display: flex;
				margin: auto;

				>view {
					width: 33.33%;
					text-align: center;
					height: 100rpx;
					line-height: 100rpx;
					color: #9E9FA1;
					position: relative;

					>view {
						position: absolute;
						width: 50%;
						height: 8rpx;
						background: #FF1400;
						border-radius: 10rpx;
						bottom: 0%;
						left: 25%;
						display: none;
					}
				}
			}
		}

		.content-b {
			width: 100%;
			height: auto;
			background-color: white;
			border-radius: 38rpx;
			overflow: hidden;
			margin-bottom: 30rpx;

			.title {
				width: 90%;
				margin: auto;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 34rpx;
				color: #444444;
				font-weight: bold;
			}

			.article {
				width: 90%;
				height: auto;
				margin: auto;
				font-size: 30rpx;
				color: #444444;
				line-height: 1.8;
				margin-bottom: 30rpx;
			}

			.picture {
				width: 90%;
				margin: auto;
				height: auto;
				// background-color: pink;	
				margin-bottom: 30rpx;

				image {
					width: 100%;
				}
			}

			.title1 {
				width: 90%;
				margin: auto;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 36rpx;
				color: #444444;
			}

			.home {
				width: 90%;
				margin: auto;
				height: 100rpx;
				line-height: 100rpx;
				display: flex;
				font-size: 30rpx;
				color: #464646;
				position: relative;

				img {
					width: 50rpx;
					height: 50rpx;
					margin-top: 25rpx;
					margin-right: 50rpx;
				}

				.calling {
					width: 100rpx;
					height: 60rpx;
					position: absolute;
					right: 0;
					top: 20rpx;
					text-align: center;
					line-height: 60rpx;
					background: #FF6638;
					color: white;
					border-radius: 50rpx;
				}
			}
		}
	}
</style>