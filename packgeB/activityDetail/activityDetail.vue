<template>
	<view class="activityDetail" v-if="info">
		<view class="top">

		</view>
		<view class="activity">
			<div class="activityImg">
				<u-swiper :list="list"></u-swiper>
			</div>
			<view class="activityTitle">
				{{ info.name }}
			</view>
			<view class="activityNum">
				<image src="@/static/activity/eye.png" mode="heightFix"></image>
				<view class="">
					{{ info.browseCount }}人查看
				</view>
			</view>

			<view class="activityInfo">
				<view class="">
					<view class="">
						<image src="../../static/activity/clock.png" mode="widthFix"></image>
						<view class="">
							开始时间:
						</view>
					</view>
					<view class="">
						{{ info.start_time }}
					</view>
				</view>
				<view class="">
					<view class="">
						<image src="../../static/activity/clock.png" mode="widthFix"></image>
						<view class="">
							结束时间:
						</view>
					</view>
					<view class="">
						{{ info.end_time }}
					</view>
				</view>
				<view class="">
					<view class="">
						<image src="../../static/activity/address.png" mode="widthFix"></image>
						<view class="">
							活动地址:
						</view>
					</view>
					<view class="">
						{{ info.address }}
					</view>
				</view>
				<view class="" style="margin-bottom: 0;">
					<view class="">
						<image src="../../static/activity/price.png" mode="widthFix"></image>
						<view class="">
							报名费用:
						</view>
					</view>
					<view class="price">{{ price }}</view>
				</view>
				<view class="">
					<view class="">
						<image src="../../static/activity/clock.png" mode="widthFix"></image>
						<view class="">
							报名截止时间:
						</view>
					</view>
					<view class="">
						{{ enroll_time() }}
					</view>
				</view>
			</view>
		</view>
		<view class="detailBox">
			<view class="detailBoxTop">
				<view class="">
					活动介绍
				</view>
				<view class="detailLine">

				</view>
				<view class="" @click="sign()">
					参与动态
				</view>
			</view>
			<view class="detailBottomLine">

			</view>
			<view class="" v-html="common.content(info.content)">
			</view>
		</view>
		<view class="" style="height: 120rpx;">
		</view>
		<view class="activityBottomBtn">
			<view class="chat" @click="homeSkip()">
				<u-image class="img" width="32rpx" height="32rpx"
					:src="common.imgUrl('/static/pageShop/index.png')"></u-image>
				<view class="themeColor size24 center">首页</view>
			</view>
			<view class="activityBottomBtn1" @click="submit()"
				:style="{filter: info.end  || info.status == 2 ? 'grayscale(100%)' : 'grayscale(0%)' }">
				{{ info.isApplication ?  info.applicationStatus == 0 ? '审核中' : info.applicationStatus == 1 ? (info.sign_in_time ? '已签到':'已报名') : '审核中'  : info.end ? '报名已截止' : info.status === 0 ? '报名参加' : info.status === 1 ? '报名参加' :  '已结束' }}
			</view>
		</view>
		<u-popup v-model="show" mode="center" border-radius='8'>
			<view class="submitBox">
				<view class="submitTitle">
					活动报名
				</view>
				<view class="submitInputBox">
					<view class="submitInputTitle">
						<view class="">

						</view>
						<view class="">
							姓名
						</view>
						<view class="">
							*
						</view>
					</view>
					<u-input v-model="post.name" placeholder="请输入姓名"
						:custom-style="{'font-size':'28rpx','color':'#666666'}"
						placeholder-style='font-size:28rpx;color: #666666;' height='28' />
				</view>
				<view class="submitInputBox">
					<view class="submitInputTitle">
						<view class="">

						</view>
						<view class="">
							联系方式
						</view>
						<view class="">
							*
						</view>
					</view>
					<u-input v-model="post.phone" type="number" placeholder="请输入联系方式"
						:custom-style="{'font-size':'28rpx','color':'#666666'}"
						placeholder-style='font-size:28rpx;color: #666666;' height='28' />
				</view>
				<view class="submitBtn" @click="application">
					<view class="submitInnerBtn">
						立即报名
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 票种 -->
		<u-popup class="box" v-model="isShow" mode="bottom" :safe-area-inset-bottom="true" height="900rpx"
			:closeable="true">
			<view class="categoryList">
				<view class="info flex">
					<u-image class="img" width="170rpx" height="170rpx" :src="list ? list[0].image : ''">
					</u-image>
					<view class="">
						<view class="size36" style="margin-bottom: 10rpx;">{{ info.name }}</view>
						<view class="size36 fontWight flex a-center" style="margin-bottom: 10rpx;">
							<view class="themeColor">{{ detail.price > 0 ? '￥' + detail.price : '免费' }}</view>
							<view class="discount size26 originalPrice" v-if="detail.original_price">
								￥{{ detail.original_price }}</view>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="flex a-center">
						<view class="categoryType" :class="priceIndex == index ? 'active' : ''"
							@click="commodityChange(index)" v-for="(item, index) in info.price" :key="index">
							<view class="flex a-center">
								<view class="size26 content">{{ item.name }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="member" v-if="info.memberType === 0" @click="member()">您还不是千芒会员，成为会员享受更多优惠! ></view>
			<view class="whiteBg bottom">
				<view class="submit center size32" @click="pay()">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null,
				show: false,
				list: [],
				post: {
					name: '',
					phone: ''
				},
				id: 0,
				user: false,
				price: '免费',
				isShow: false,
				priceIndex: 0,
				detail: {
					price: ''
				},
				loginType: ''
			};
		},
		onLoad(opt) {
			// #ifdef MP-WEIXIN
			this.loginType = '小程序端'
			// #endif
			// #ifdef APP
			this.loginType = '手机app'
			this.weixin = false
			// #endif
			// #ifdef H5
			this.loginType = 'h5端'
			// #endif
			this.id = opt.id
			if (opt.user) {
				this.user = true
			}
		},
		onShow(){
			this.getInfo()
		},
		onShareAppMessage(res) {
			return {
				title: this.info.name,
				imageUrl: this.list ? this.common.imgUrl(this.list[0].image) : '',
				path: '/packgeB/activityDetail/activityDetail?id=' + this.id
			}
		},
		onShareTimeline() {
			return {
				title: this.info.name,
				imageUrl: this.list ? this.common.imgUrl(this.list[0].image) : '',
				path: '/packgeB/activityDetail/activityDetail?id=' + this.id
			}
		},
		methods: {
			enroll_time() {
				if (this.info == null) {
					return ''
				} else {
					let time = new Date(this.info.enroll_time)
					return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`
				}
			},
			homeSkip() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			member() {
				uni.navigateTo({
					url: "/packgeB/my/activateNowContent"
				})
			},
			getInfo() {
				this.$axios({
					url: this.$url[120],
					data: {
						id: this.id,
						loginType: this.loginType
					}
				}).then(res => {
					if (res.code == 0) {
						this.list = []
						res.data.img.forEach((item) => {
							this.list.push({
								image: this.common.imgUrl(item)
							})
						})
						this.info = res.data
						// this.share = {
						// 	title: this.info.name,
						// 	imageUrl: this.list ? this.common.imgUrl(this.list[0]) : '',
						// 	path: '/packgeB/activityDetail/activityDetail?id=' + this.id
						// }
						const text = res.data.price
						this.price = !text || text.length === 0 || Math.max.apply(null, text.map((obj) => obj
								.price)) === 0 ?
							'免费' :
							Math.min.apply(null, text.map((obj) => obj.price)) == Math.max.apply(null, text.map((
								obj) => obj.price)) ?
							'￥' + Math.min.apply(null, text.map((obj) => obj.price)) :
							'￥' + Math.min.apply(null, text.map((obj) => obj.price)) + '~' + Math.max.apply(null,
								text.map((obj) => obj.price))
						if (text) {
							this.detail = text[0]
						}
						if (this.user && this.info.isApplication) {
							this.signLog()
						} else if(this.user){
							if (this.info.status == 2) {
								uni.showToast({
									title: "活动已结束",
									icon: "none"
								})
								return
							}
							if (this.info.number > 0 && this.info.applicationCount >= this.info.number) {
								uni.showToast({
									title: "活动报名人数已满",
									icon: "none"
								})
								return
							}
							uni.navigateTo({
								url: '/packgeB/activityDetail/application?id=' + this.id + '&user=true'
							})
						}
					}
				})
			},
			commodityChange(index) {
				this.priceIndex = index
				this.detail = this.info.price[index]
			},
			signLog() {
				if (!this.info.isLogin) {
					uni.showToast({
						title: "请登录",
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/packgeA/login/login"
						})
					}, 1500)

					return
				}
				if (this.info.sign_in_time) {
					return
				}
				if (this.info.applicationStatus !== 1) {
					uni.showToast({
						title: "报名审核中",
						icon: "none"
					})
					return
				}
				if (this.info.status == 2) {
					uni.showToast({
						title: "活动已结束",
						icon: "none"
					})
					return
				}
				this.$axios({
					url: this.$url[122],
					data: {
						id: this.id
					}
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '活动签到成功',
							icon: 'none'
						})
						this.user = false
						this.getInfo()
					}
				})
			},
			application() {
				if (!this.post.name) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return
				}
				if (!this.post.phone) {
					uni.showToast({
						title: '请输入联系方式',
						icon: 'none'
					})
					return
				}
				if (!this.isPhone()) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '报名中'
				})
				this.$axios({
					url: this.$url[121],
					data: {
						id: this.id,
						...this.post
					}
				}).then(res => {
					if (res.code == 0) {
						uni.hideLoading()
						this.show = false
						uni.showToast({
							title: "报名成功",
							icon: "none"
						})
						this.getInfo()
					}
				})
			},
			isPhone() {
				let mPattern = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
				return mPattern.test(this.post.phone)
			},
			sign() {
				uni.navigateTo({
					url: "/packgeB/sign/sign?id=" + this.id
				})
			},
			submit() {
				if (!this.info.isLogin) {
					uni.showToast({
						title: "请登录",
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/packgeA/login/login"
						})
					}, 1500)
					return
				}
				if (this.info.isApplication) {
					uni.showToast({
						title: "活动已报名",
						icon: "none"
					})
					return
				}
				if (this.info.end) {
					uni.showToast({
						title: "活动报名时间已截止",
						icon: "none"
					})
					return
				}
				if (this.info.status == 2) {
					uni.showToast({
						title: "活动已结束",
						icon: "none"
					})
					return
				}
				if (this.info.number > 0 && this.info.applicationCount >= this.info.number) {
					uni.showToast({
						title: "活动报名人数已满",
						icon: "none"
					})
					return
				}
				if (!this.info.price) {
					uni.navigateTo({
						url: '/packgeB/activityDetail/application?id=' + this.id
					})
				} else {
					this.isShow = true
				}
			},
			pay() {
				this.isShow = false
				uni.navigateTo({
					url: '/packgeB/activityDetail/application?id=' + this.id + '&index=' + this.priceIndex
				})
			},
		},
	}
</script>

<style lang="scss">
	.themeColor {

		color: $project-color;
	}

	.size24 {
		line-height: 1;
		margin-top: 14rpx;
		font-size: 24rpx;
	}

	.chat {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	page {
		background-color: #f9f9f9;
	}

	.detailBox {
		width: 690rpx;
		margin: 0 auto;
		border-radius: 12rpx;
		margin-top: 50rpx;
		background-color: #FFF;
		box-sizing: border-box;
		padding: 30rpx 18rpx;

		.detailBottomLine {
			margin: 30rpx 0;
			height: 2rpx;
			background-color: #000;
			opacity: .1;
		}

		.detailBoxTop {
			display: flex;
			align-items: center;
			justify-content: space-between;

			>view:first-child,
			>view:last-child {
				width: 49.5%;
				text-align: center;
				font-size: 30rpx;
				line-height: 1;
			}

			>view:first-child {
				font-weight: bold;
				color: $project-color;
			}

			.detailLine {
				width: 2rpx;
				height: 30rpx;
				background-color: #000;
				opacity: .1;

			}
		}
	}

	.activityBottomBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFF;

		.activityBottomBtn1 {
			background-color: $project-color;
			color: #FFF;
			text-align: center;
			width: 600rpx;
			font-weight: bold;
			line-height: 80rpx;
			font-size: 30rpx;
			border-radius: 100rpx;
		}
	}

	.activityDetail {
		.activity {
			width: 690rpx;
			margin: 0 auto;
			border-radius: 12rpx;
			margin-top: -250rpx;
			background-color: #FFF;
			box-sizing: border-box;
			padding: 18rpx 18rpx 30rpx 18rpx;

			.price {
				color: $project-color;
				font-weight: bold;
			}

			.activityInfo {
				>view {
					margin: 25rpx 0;
					display: flex;
					align-items: flex-start;
					font-size: 28rpx;
					line-height: 1.5;
					color: #000;

					>view:first-child {
						display: flex;
						align-items: center;
						white-space: nowrap;
						// width: 250rpx;
					}

					>view:last-child {
						margin-left: 10rpx;
					}

					image {
						margin-right: 10rpx;
						width: 30rpx;
					}
				}
			}

			.activityImg {
				width: 100%;
				height: auto;
				margin-bottom: 18rpx;
			}

			.activityNum {
				margin-top: 18rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				image {
					height: 26rpx;
					width: auto;
					margin-right: 5rpx;
				}

				view {
					line-height: 1;
					font-size: 26rpx;
					color: #666;
				}
			}

			.activityTitle {
				font-size: 36rpx;
				line-height: 1.5;
				font-weight: bold;
			}
		}

		.top {
			width: 750rpx;
			height: 300rpx;
			background-color: $project-color;
		}
	}

	.submitBox {
		width: 690rpx;
		padding: 40rpx 35rpx;
		box-sizing: border-box;
		background-color: #FFF;

		.submitBtn {
			margin-top: 65rpx;
			position: relative;
			width: 627rpx;
			height: 85rpx;

			.submitInnerBtn {
				width: 627rpx;
				line-height: 85rpx;
				text-align: center;
				background: $project-color;
				font-size: 32rpx;
				font-weight: bold;
				color: #FFFFFF;
				border-radius: 1000rpx;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
			}
		}

		.submitTitle {
			text-align: center;
			font-size: 32rpx;
			font-weight: bold;
			color: #000000;
			margin-bottom: 30rpx;
		}

		.submitInputBox {
			margin-bottom: 30rpx;
			padding-bottom: 36rpx;
			border-bottom: 1rpx solid #00000033;
		}

		.submitInputTitle {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			>view:first-child {
				width: 8rpx;
				height: 30rpx;
				background: $project-color;
				border-radius: 5rpx 5rpx 5rpx 5rpx;
				margin-right: 10rpx;
			}

			>view:nth-child(2) {
				font-size: 32rpx;
				font-weight: bold;
				color: #000000;
				margin-right: 5rpx;
			}

			>view:last-child {
				font-size: 32rpx;
				font-weight: bold;
				color: #FF0000;
			}
		}
	}

	.categoryList {
		padding: 26rpx 28rpx 120rpx;

		.img {
			border: 2rpx solid #f1f1f1;
			margin-right: 32rpx;
		}

		.info {
			padding-bottom: 26rpx;
		}

		.originalPrice {
			font-size: 30rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #989898;
			margin-left: 20rpx;
			text-decoration: line-through;
		}

		.active {
			color: $project-color;
			background-color: #1a79ff33;
		}

		.list {
			border-bottom: 2rpx solid #f2f2f2;
			padding: 25rpx 0;
			margin-bottom: 25rpx;
		}

		.categoryType {
			background-color: #f2f2f2;
			padding: 10rpx 16rpx;
			margin-right: 20rpx;
			// height: 57rpx;
			line-height: 57rpx;
			border-radius: 6rpx;

			.typeImg {
				padding-right: 18rpx;
			}
		}
	}

	.member {
		text-align: center;
		position: absolute;
		width: 100%;
		bottom: 60px;
		color: #2f6bdd;
	}

	.bottom {
		position: absolute;
		padding: 20rpx 0;
		bottom: 0;
		width: 100%;
		color: #ffffff;
		background-color: $project-color;

		.center {
			text-align: center;
		}

		.size32 {
			font-size: 32rpx;
		}
	}
</style>