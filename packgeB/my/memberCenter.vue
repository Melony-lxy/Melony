<template>
	<view v-if="vipdata">
		<view class="memberInformation">
			<view class="memberInformation-img"><img :src="common.imgUrl(vipdata.avatar_url)" alt="" /></view>
			<view class="memberInformation-content">
				<view class="memberInformation-content1">
					<view>{{ vipdata.nick_name }}({{ userTelephoneNum }})</view>
					<view class="vipnick">
						<image
							:src="common.imgUrl(vipdata.rank.icon)"
							mode="widthFix"
							class="vipimg"
							v-if="vipdata.rank.icon"
						></image>
						<span
							:style="{ color: vipdata.rank.color ? vipdata.rank.color : 'black' }"
							class="rankName"
							v-if="vipdata.rank.icon && vipdata.rank.rank_name"
						>
							{{ vipdata.rank.rank_name }}
						</span>
						<span
							:style="{ color: vipdata.rank.color ? vipdata.rank.color : 'black' }"
							v-if="!vipdata.rank.icon && vipdata.rank.rank_name"
							class="rankName1"
						>
							{{ vipdata.rank.rank_name }}
						</span>
					</view>
				</view>
				<br />
				<view class="memberInformation-content2" v-if="vipdata.is_new_member">新会员</view>
				<view
					class="memberInformation-content2"
					v-else-if="vipdata.is_new_member == false && vipdata.is_member == false"
				>
					已到期
				</view>
				<view
					class="memberInformation-content2"
					v-else-if="vipdata.is_new_member == false && vipdata.is_member == true"
				>
					千芒商汇俱乐部vip {{ vipdata.end_time }}到期
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true" show-scrollbar="true">
			<view class="scroolTd">
				<view class="image-box" style="display: flex" v-if="memberShip">
					<view
						class="image"
						v-for="(item, index) in memberShip"
						:key="index"
						:class="{ active: selectPayment == index }"
						@click="selectPayment = index"
					>
						<view class="image1">{{ item.duration | price }}</view>
						<view class="image2">
							<text class="money1">￥</text>
							{{ item.discount_price }}
						</view>
						<view class="image3">原价￥{{ item.price }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 		<view class="automaticRenewal" v-if="memberShip[selectPayment].id!=2">
			<p class="automaticRenewal1">
				会员到期当天
				<text class="automaticRenewal2">自动续费</text>
				{{ memberShip[selectPayment].memberMoney }}元,可随时取消
			</p>
		</view> -->
		<view class="clearance"></view>
		<view class="payment">
			<view class="weixin">
				<img :src="common.imgUrl('/static/images/wechat.png')" alt="" />
				<view class="paymentMethod"><strong>微信支付</strong></view>
				<view
					class="paymentMethod-btn"
					:class="paymentMethod == 1 ? 'activ' : ''"
					@click="paymentMethod = 1"
				></view>
			</view>
<!-- 			<view class="Alipay">
				<img :src="common.imgUrl('/static/images/zfb.png')" alt="" />
				<view class="paymentMethod"><strong>支付宝支付</strong></view>
				<view
					class="paymentMethod-btn"
					:class="paymentMethod == 2 ? 'activ' : ''"
					@click="paymentMethod = 2"
				></view> -->
				<!-- 				<br />
				<p class="alipayAgrees" v-if="memberShip[selectPayment].id!=2">
					已阅读并同意
					<text class="automaticRenewal2">《自动续费》</text>
					开通后到期前24小时将
					<br />
					发起续费可随时在支付宝关闭续费扣款
				</p> -->
			<!-- </view> -->
		</view>
		<view class="member-footer">
			<view class="member-footer1">
				<span class="member-footerContext">应付金额:</span>
				<span class="member-footerContext1" v-if='memberShip'>
					￥
					<span class="member-footerContext2">{{ memberShip[selectPayment].discount_price }}</span>
					.00
				</span>
			</view>
			<view class="member-footer2" @click="goplay" v-if="isios">确认支付</view>
		</view>
	</view>
</template>

<script>
const PAYMENT = {
	WECHAT: 0x1,
	WECHAT_CH: '微信',
	ALIPAY: 0x2,
	ALIPAY_CH: '支付宝'
}
import { WxOrder, AliOrder } from '@/plugin/api/order.js'
export default {
	filters: {
		price(i) {
			if (i == 30) {
				return '包月会员'
			} else if (i == 90) {
				return '包季会员'
			} else if (i == 360) {
				return '包年会员'
			}
		}
	},
	name: 'memberCenter',
	data() {
		return {
			isios:false,			userTelephoneNum: '',
			vedioDataList: [],
			param: '', //设置默认值为1，即设置第一个单选框为选中状态
			isChecked: 0,
			selectPayment: 0,
			paymentMethod: 1,
			vipdata: '',
			memberShip: [],
			paymentList: [
				{
					id: PAYMENT.WECHAT,
					img: '/static/wechat.png',
					name: PAYMENT.WECHAT_CH,
					styles: 'width:30rpx;height:30rpx'
				}
				// #ifdef H5
				// {
				// 	id: PAYMENT.ALIPAY,
				// 	img: "/static/zfb.png",
				// 	name: PAYMENT.ALIPAY_CH,
				// 	styles: "width:30rpx;height:30rpx",
				// },
				// #endif
				// {
				// 	img: '/static/yinlian.png',
				// 	name: '银联',
				// 	styles: 'width:30rpx;height:18rpx'
				// },
			]
		}
	},
	onShow() {
		uni.getSystemInfo({
			success: (res) => {
				if(res.platform=='ios'){
					this.$axios({
						url: this.$url[103]
					}).then(res => {
						this.isios=res.data
					})
				}else{
					this.isios=true
				}
			}
		})
	},
	mounted() {
		this.getVip()
		this.getPrice()
		this.paymentList = [
			{
				id: PAYMENT.WECHAT,
				img: '/static/wechat.png',
				name: PAYMENT.WECHAT_CH,
				styles: 'width:30rpx;height:30rpx'
			}
		]
		// #ifdef H5
		let ua = window.navigator.userAgent.toLowerCase()
		if (ua.match(/MicroMessenger/i) != 'micromessenger') {
			this.paymentList.push({
				id: PAYMENT.ALIPAY,
				img: '/static/zfb.png',
				name: PAYMENT.ALIPAY_CH,
				styles: 'width:30rpx;height:30rpx'
			})
		}
		// #endif
	},
	methods: {
		goplay() {
			uni.showLoading({
				title: '加载中'
			})
			const payment = this.paymentList[this.paymentMethod - 1].id
			if (payment === PAYMENT.WECHAT) {
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
			} else if (payment === PAYMENT.ALIPAY) {
				AliOrder({
					id: this.memberShip[this.selectPayment].id
				})
					.then(res => {
						uni.hideLoading()
						document.querySelector('body').innerHTML = res.data.resp
						document.forms[0].submit()
					})
					.catch(() => {
						uni.hideLoading()
					})
			} else {
				uni.hideLoading()
			}
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
		getVip() {
			this.$axios({
				url: this.$url[72]
			}).then(res => {
				if (res.code == 0) {
					this.vipdata = res.data
					//手机号中间四位隐藏
					this.userTelephoneNum = res.data.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
				}
			})
		},
		getPrice() {
			this.$axios({
				url: this.$url[76]
			}).then(res => {
				if (res.code == 0) {
					this.memberShip = res.data
				}
			})
		}
	}
}
</script>
<style>
.vipnick {
	display: flex;
	align-items: center;
	margin-left: 10rpx;
}
.rankName1 {
	background-color: #cecece;
	padding: 5rpx;
	font-size: 30rpx;
	line-height: 30rpx;
	border-radius: 10rpx;
}
.rankName {
	display: block;
	font-size: 30rpx;
	line-height: 30rpx;
	background-color: #cecece;
	padding: 5rpx;
	margin-left: -22rpx;
	border-radius: 10rpx;
	padding-left: 22rpx;
}
.vipimg {
	width: 48rpx;
	z-index: 999;
}
/deep/ ::-webkit-scrollbar {
	/* 滚动条整体样式 */
	display: none;
	width: 10px !important;
	height: 10px !important;
	-webkit-appearance: auto !important;
	background: red;
	overflow: auto !important;
}

/deep/ ::-webkit-scrollbar-thumb {
	/* 滚动条里面小方块 */
	border-radius: 10px !important;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
	background-color: #535353 !important;
}

/deep/ ::-webkit-scrollbar-track {
	/* 滚动条 */
	border-radius: 10px !important;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
	background-color: #ededed !important;
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
	height: 280rpx;
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
	line-height: 70rpx;
	color: black;
	text-align: center;
	font-size: 25rpx;
	color: #989898;
}

.memberCenterContent {
	font-size: 32rpx;
	color: #333333;
	width: 100%;
	height: 120rpx;
	color: black;
	line-height: 120rpx;
	text-align: left;
	margin-left: 30rpx;
}

.memberInformation {
	width: 100%;
	height: 120rpx;

	overflow: hidden;
}

.memberInformation-img {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	overflow: hidden;
	margin-top: 15rpx;
	margin-left: 25rpx;
	float: left;
}

.memberInformation-img img {
	width: 100%;
	height: 100%;
}

.memberInformation-content {
	margin-top: 15rpx;
	margin-left: 25rpx;
	width: 600rpx;
	height: 100rpx;
	line-height: 50rpx;
	float: left;
}

.content1-img {
	width: 40rpx;
	height: 40rpx;
	float: right;
	margin-top: 5rpx;
	margin-left: 10rpx;
}

.content1-img img {
	width: 30rpx;
	height: 30rpx;
}

.memberInformation-content1 {
	float: left;
	font-size: 35rpx;
	font-weight: 500;
	font-weight: bold;
	color: #2d2d2d;
	line-height: 50rpx;
	display: flex;
	align-items: center;
}

.memberInformation-content2 {
	font-size: 25rpx;
	font-weight: 400;
	color: #2d2d2d;
	width: 100%;
	line-height: 50rpx;
	float: left;
}

.xf {
	width: 100%;
	height: 300rpx;
}

.automaticRenewal {
	width: 100%;
	height: 80rpx;
	line-height: 65rpx;
	font-size: 20rpx;
	opacity: 0.8;
}

.automaticRenewal1 {
	margin-left: 20rpx;
}

.automaticRenewal2 {
	color: #ff6638;
}

.clearance {
	width: 100%;
	height: 20rpx;
	background-color: #f6f7f9;
}

.payment {
	width: 100%;
	height: 300rpx;
	overflow: hidden;
	margin-top: 20rpx;
}

.weixin {
	width: 100%;
	height: 90rpx;
	text-align: center;
	line-height: 90rpx;
}

.weixin img {
	width: 42rpx;
	height: 42rpx;
	float: left;
	margin-left: 25rpx;
	margin-top: 24rpx;
}

.Alipay {
	width: 100%;
	height: 200rpx;
	line-height: 90rpx;
}

.Alipay img {
	width: 42rpx;
	height: 42rpx;
	float: left;
	margin-left: 25rpx;
	margin-top: 24rpx;
}

.paymentMethod-btn {
	width: 45rpx;
	height: 45rpx;
	background-color: gainsboro;
	float: right;
	margin-top: 22rpx;
	margin-right: 50rpx;
	border-radius: 40rpx;
}

.paymentMethod {
	float: left;
	margin-left: 20rpx;
	font-size: 30rpx;
	font-weight: 500;
	color: #2d2d2d;
}

.alipayAgrees {
	width: 76%;
	float: left;
	margin-left: 12%;
	line-height: 40rpx;
	font-size: 22rpx;
	font-weight: 400;
	color: #2d2d2d;
	opacity: 0.8;
}

.money1 {
	font-size: 30rpx;
}

.active {
	border: red 2rpx solid;
}
.medalImg {
	width: 46rpx;
}
.activ {
	background-color: #009933;
	background: url(../../static/success.png);
	background-size: 100% 100%;
}

.member-footer {
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 0%;
	overflow: hidden;
}

.member-footer1 {
	width: 50%;
	margin-left: 6%;
	text-align: left;
	line-height: 100rpx;
	float: left;
}

.member-footer2 {
	width: 33%;
	height: 100rpx;
	background-color: #fd383f;
	text-align: center;
	line-height: 100rpx;
	text-align: center;
	float: right;
	font-size: 32rpx;
	color: #ffffff;
}

.member-footerContext {
	font-size: 24rpx;
	color: #463123;
}

.member-footerContext1 {
	font-size: 24rpx;
	color: #ff7f36;
}

.member-footerContext2 {
	font-size: 35rpx;
	color: #ff7f36;
}
</style>
