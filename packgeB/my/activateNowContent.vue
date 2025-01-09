<template>
	<view v-if="vipdata">
		<view class="memberCenterContent">
			<view class="memberCenterInformation">
				<view class="backgroundPicture" v-if="vipdata.is_new_member || vipdata.is_member == false">
					<img :src="common.imgUrl('/static/images/img13.png')" alt="" />
				</view>
				<view class="backgroundPicture1" v-else>
					<img :src="common.imgUrl('/static/images/vip.png')" alt="" />
				</view>
				<view class="headPortrait">
					<image :src="common.imgUrl(vipdata.avatar_url)" class="headP" alt="aspectFill" />
					<view class="beOverdue">
						<view class="bjxj">
							<view class="vipname">{{ vipdata.nick_name }}</view>
							<view class="vipnick">
								<image :src="common.imgUrl(vipdata.rank.icon)" mode="widthFix" class="vipimg"
									v-if="vipdata.rank.icon"></image>
								<span :style="{ color: vipdata.rank.color ? vipdata.rank.color : 'black' }"
									class="rankName" v-if="vipdata.rank.icon && vipdata.rank.rank_name">
									{{ vipdata.rank.rank_name }}
								</span>
								<span :style="{ color: vipdata.rank.color ? vipdata.rank.color : 'black' }"
									v-if="!vipdata.rank.icon && vipdata.rank.rank_name" class="rankName1">
									{{ vipdata.rank.rank_name }}
								</span>
							</view>
						</view>
						<view class="bjx" v-if="vipdata.is_new_member">开通会员即享更多服务</view>
						<view class="bjx" v-else-if="vipdata.is_new_member == false && vipdata.is_member == false">
							您的会员已到期
						</view>
						<view class="bjx" v-else-if="vipdata.is_new_member == false && vipdata.is_member == true">
							{{ vipdata.end_time }}到期
						</view>
					</view>
				</view>
				<view class="growth">
					<view class="growUp" v-if="!vipdata.is_new_member" style="margin-top:20rpx;">
						<span class="czz" style="font-size: 44rpx;">{{ vipdata.vip.name }}</span>
						<span class="growthValue">{{ vipdata.vip.description }}</span>
					</view>
					<view class="growUp" v-else style="width: 90%;">
						<span class="czz">{{ vipdata.level_score ? vipdata.level_score : 0 }}</span>
						<span class="growthValue">成长值</span>
						<view class="" style="margin-top: -15rpx;">
							<u-line-progress height="22" activeColor="#042BE3" showText="false"></u-line-progress>
						</view>
					</view>
					<view class="renew" @click="show=true" v-if="!vipdata.is_new_member">立即续费</view>
				</view>
			</view>
		</view>
		<view v-if="show">
			<view class="membershipInterests"><strong>会员套餐</strong></view>
			<scroll-view scroll-x="true" show-scrollbar="true">
				<view class="scroolTd">
					<view class="image-box" style="display: flex" v-if="memberShip">
						<view class="image" v-for="(item, index) in memberShip" :key="index"
							:class="{ active: selectPayment == index }" @click="selectPayment = index">
							<view class="image1">{{ item.name }}</view>
							<view class="image2">
								<text class="money1">￥</text>
								{{ item.discount_price }}
							</view>
							<view class="image3" style="text-decoration-line: line-through;">原价￥{{ item.price }}</view>
							<view class="image3" style="font-size: 24rpx" v-if="item.description">{{ item.description }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view style="font-size: 34rpx;width: 90%;margin-left: 5%;margin-bottom: 20rpx;"
				v-if="memberShip[selectPayment] && memberShip[selectPayment].membership_benefits"><strong>会员权益</strong>
			</view>
			<view style="margin-bottom: 20rpx;"
				v-html="common.content(memberShip[selectPayment].membership_benefits)"
				v-if="memberShip[selectPayment] && memberShip[selectPayment].membership_benefits"></view>
		</view>
		<view v-else>
			<view class="membershipInterests"><strong>会员权益</strong>
			</view>
			<view style="margin-bottom: 20rpx;"
				v-html="common.content(vipdata.vip.membership_benefits)"></view>
		</view>
		<!-- <view class="interestsContent">
			<view class="interestsContent1">
				<p class="interestsContent1-big"><strong>会员专属课</strong></p>
				<p class="interestsContent1-small">多种计划会员期内无限使用</p>
			</view>
			<view class="interestsContent2"><img :src="common.imgUrl('/static/images/zhuanshu.png')" alt="" /></view>
		</view> -->
		<!-- <view class="interestsContent">
			<view class="interestsContent1">
				<p class="interestsContent1-big"><strong>免费直播课</strong></p>
				<p class="interestsContent1-small">多种计划会员期内无限</p>
			</view>
			<view class="interestsContent22" style=""><img :src="common.imgUrl('/static/images/zhibo.png')" alt="" /></view>
		</view> -->
		<!-- <view class="interestsContent">
			<view class="interestsContent1">
				<p class="interestsContent1-big"><strong>报告分析</strong></p>
				<p class="interestsContent1-small">多种计划会员期内无限</p>
			</view>
			<view class="interestsContent21"><img :src="common.imgUrl('/static/images/baogao.png')" alt="" /></view>
		</view> -->
		<view class="renewNow" @click="findMor()" v-if="vipdata.is_new_member && show">立即开通</view>
		<view class="renewNow" @click="findMor()" v-else-if="show">立即续费</view>
	</view>
</template>
<script>
	import {
		WxOrder,
		AliOrder
	} from '@/plugin/api/order.js'
	export default {
		name: 'activateNowContent',
		components: {},
		data() {
			return {
				selectPayment: 0,
				memberShip: [],
				vipdata: '',
				show: true
			}
		},
		mounted() {
			this.getPrice()
			this.getVip()
		},
		methods: {
			getPrice() {
				this.$axios({
					url: this.$url[76]
				}).then(res => {
					if (res.code == 0) {
						this.memberShip = res.data
					}
				})
			},
			getVip() {
				this.$axios({
					url: this.$url[72]
				}).then(res => {
					if (res.code == 0) {
						this.vipdata = res.data
						let score = this.vipdata.level_max - this.vipdata.level_min
						let now_score = this.vipdata.level_score - this.vipdata.level_min
						let len = now_score / score
						let List = document.getElementsByClassName('u-active')
						this.$nextTick(function() {
							List[0].style.width = `${len * 100}%`
							List[0].innerHTML = ''
						})
						this.show = !this.vipdata.is_member
					}
				})
			},
			findMor() {
				uni.showLoading({
					title: '加载中'
				})
				let status = 0
				// #ifdef H5
				let ua = window.navigator.userAgent.toLowerCase()
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					status = 1
				} else {
					status = 2
				}
				// #endif
				// #ifdef MP-WEIXIN
				// let _this = this
				// uni.login({
				// 	provider: 'weixin',
				// 	success: (res) => {
				// 		_this.payment(0, res.code)
				// 	},
				// 	fail: () => {
				// 		errdata.errlist("微信授权失败")
				// 	}
				// })
				// return
				// #endif

				// #ifndef H5 || MP-WEIXIN
				uni.showToast({
					icon: 'none',
					title: '暂时只支付h5和微信小程序支付！'
				})
				uni.hideLoading()
				// #endif
				WxOrder({
						id: this.memberShip[this.selectPayment].id,
						status,
						openId: uni.getStorageSync('openId')
					})
					.then(res => {
						uni.hideLoading()
						if (res.code === 0) {
							if (status === 2) {
								window.location.href = res.data.url
							} else {
								this.common
									.payment(res.data)
									.then(res => {
										if (res.code === 0) {
											this.paymentSuccess()
										}
									})
									.catch(err => {})
							}
						}
					})
					.catch(() => {
						uni.hideLoading()
					})
			},
			paymentSuccess() {
				uni.showModal({
					title: '提示',
					content: '支付成功',
					showCancel: false,
					confirmText: '关闭',
					success: function(res) {
						uni.reLaunch({
							url: '/pages/my/my'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.vipnick {
		display: flex;
		align-items: center;
		margin-left: 10rpx;
	}

	.rankName1 {
		background-color: #ffdfdf;
		padding: 5rpx;
		font-size: 30rpx;
		line-height: 30rpx;
		border-radius: 10rpx;
	}

	.rankName {
		display: inline-block;
		font-size: 30rpx;
		line-height: 30rpx;
		background-color: #ffdfdf;
		padding: 5rpx;
		margin-left: -22rpx;
		border-radius: 10rpx;
		padding-left: 22rpx;
	}

	.vipimg {
		width: 46rpx;
		z-index: 999;
	}

	.memberCenterContent {
		width: 100%;
		height: 200rpx;
		background-color: #3c3837;
		line-height: 100rpx;
		position: relative;
	}

	.memberCenterContent1 {
		width: 100%;
		font-size: 32rpx;
		height: 100rpx;
		color: #ffffff;
		line-height: 100rpx;
		text-align: left;
		margin-left: 20rpx;
	}

	.memberCenterInformation {
		width: 96%;
		height: 300rpx;
		line-height: 100rpx;
		position: absolute;
		top: 100rpx;
		left: 2%;
		border-radius: 24rpx;
		display: flex;
		flex-direction: column;
		background-color: #cecece;
	}

	.backgroundPicture {
		width: 60%;
		height: 295rpx;
		position: absolute;
	}

	.backgroundPicture img {
		width: 100%;
		height: 295rpx;
	}

	.backgroundPicture1 {
		position: absolute;
		width: 720rpx;
		height: 295rpx;
		z-index: 1;
	}

	.backgroundPicture1 img {
		width: 720rpx;
		height: 295rpx;
	}

	.headPortrait {
		width: 90%;
		height: 150rpx;
		margin-top: 3%;
		margin-left: 5%;
		overflow: hidden;
		z-index: 2;
	}

	.bjxj {
		/* width: 180rpx; */
		display: flex;
		height: 46rpx;
		line-height: 60rpx;
		font-size: 44rpx;
		color: black;
		font-weight: bold;
		align-items: center;
	}

	.bjx {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		color: grey;
	}

	.growthValue {
		height: 40rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: grey;
		margin-left: 10rpx;
	}

	.czz {
		width: 131rpx;
		height: 20rpx;
		font-size: 50rpx;
		color: black;
		margin-top: -20rpx;
	}

	.growth {
		width: 90%;
		height: 80rpx;
		margin-left: 5%;
		overflow: hidden;
		z-index: 2;
	}

	.headP {
		width: 120rpx;
		height: 120rpx;
		margin-top: 10rpx;
		float: left;
		border-radius: 50%;
		overflow: hidden;
	}

	.headP img {
		width: 100%;
		height: 100%;
	}

	.beOverdue {
		/* width: 50%; */
		height: 100%;
		margin-left: 30rpx;
		margin-top: 26rpx;
		line-height: 60rpx;
		float: left;
		color: #a19ea7;
	}

	.growUp {
		width: 60%;
		height: 50rpx;
		float: left;
		color: #a19ea7;
		line-height: 40rpx;
	}

	.renew {
		width: 192rpx;
		height: 65rpx;
		background: #252324;
		border-radius: 29px 29px 29px 29px;
		opacity: 1;
		float: right;
		font-size: 30rpx;
		color: #e3e3e3;
		line-height: 65rpx;
		text-align: center;
		margin-top: 15rpx;
	}

	.membershipInterests {
		width: 90%;
		height: 70rpx;
		margin-left: 5%;
		text-align: left;
		margin-top: 220rpx;
		font-size: 34rpx;
		color: #333333;
		line-height: 70rpx;
	}

	.interestsContent {
		width: 96%;
		height: 200rpx;
		background: #fef9f3;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		opacity: 1;
		margin-left: 2%;
		margin-top: 20rpx;
	}

	.interestsContent1 {
		width: 50%;
		height: 120rpx;
		margin-left: 5%;
		margin-top: 40rpx;
		line-height: 30px;
		float: left;
	}

	.interestsContent1-big {
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		line-height: 72rpx;
	}

	.interestsContent1-small {
		font-size: 28rpx;
		color: #9a958f;
		line-height: 36rpx;
	}

	.interestsContent2 {
		width: 200rpx;
		height: 200rpx;
		opacity: 1;
		float: right;
		margin-right: 30rpx;
	}

	.interestsContent21 {
		width: 200rpx;
		height: 200rpx;
		opacity: 1;
		float: right;
		margin-right: 20rpx;
	}

	.interestsContent2 img {
		width: 100%;
		height: 100%;
	}

	.interestsContent21 img {
		width: 100%;
		height: 100%;
	}

	.interestsContent22 {
		width: 200rpx;
		height: 200rpx;
		opacity: 1;
		float: right;
		margin-right: 5rpx;
	}

	.interestsContent22 img {
		width: 82%;
		height: 100%;
	}

	.renewNow {
		margin-left: 2%;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
		text-align: center;
		line-height: 84rpx;
		font-size: 34rpx;
		color: white;
		width: 96%;
		height: 84rpx;
		background: $project-color;
		border-radius: 10px 10px 10px 10px;
		opacity: 1;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.scroolTd {
		height: 320rpx;
		display: flex;
		justify-content: space-between;
		background-color: white;
		margin-top: 25rpx;
	}

	.image {
		width: 210rpx;
		height: 300rpx;
		margin-left: 20rpx;
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		opacity: 1;
		border: 2rpx solid #d9d9d9;
	}

	.image1 {
		height: 100rpx;
		line-height: 130rpx;
		color: black;
		text-align: center;
		font-size: 35rpx;
		color: #2d2d2d;
		font-weight: bold;
	}

	.image2 {
		line-height: 70rpx;
		color: black;
		text-align: center;
		font-size: 50rpx;
		color: #ff6638;
	}

	.image3 {
		margin-bottom: 10rpx;
		color: black;
		text-align: center;
		font-size: 25rpx;
		color: #989898;
	}

	.money1 {
		font-size: 30rpx;
	}

	.active {
		border: red 2rpx solid;
	}
</style>