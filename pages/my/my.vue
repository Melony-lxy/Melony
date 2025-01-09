<template>
	<view class="box">
		<!-- <view class="headers" :style="{
				'background-image': `url(${common.imgUrl('/static/images/headerImg.png')})`
			}" style="padding-top: 0;"> -->
		<view class="headers" style="padding-top: 0;">
			<view class="headBox space-between u-f-ac">
				<view class="flex u-f-ac" v-if="user">
					<image @click="navigateTo('/packgeA/PersonalCenter/PersonalCenter')" class="head"
						:src="common.imgUrl(user.avatar_url)" mode="aspectFill"></image>
					<view class="headCenter" v-if="vipdata.rank">
						<view class="flex u-f-ac" v-if="user">
							<view class="name">{{ user.nick }}</view>
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
						<view class="classBox flex u-f-ac" @click="seescore()">
							<image class="classIcon" :src="common.imgUrl('/static/my/score.png')" mode=""></image>
							<text class="class">{{ vipdata.consumption_score }}积分</text>
						</view>
					</view>
				</view>
				<image class="setUp" @click="navigateTo('/packgeA/setUp/setUp')"
					:src="common.imgUrl('/static/my/shezhi.png')" mode=""></image>
			</view>
			<view class="transverseNav space-around u-f-ac" style="display: none;">
				<!-- 				<view @click="navigateTo('/packgeB/myCurriculum/myCurriculum')">
					<view class="number">{{ statistics.order }}</view>
					<view class="navName">我的课程</view>
				</view>
				<view>
					<view class="number" @click="navigateTo('/packgeA/myTask/myTask')">{{ statistics.task }}</view>
					<view class="navName">我的作业</view>
				</view>
				<view>
					<view class="number" @click="navigateTo('/packgeA/myTest/myTest')">{{ statistics.test }}</view>
					<view class="navName">我的测验</view>
				</view> -->
				<view v-if='showbag'>
					<view class="number" @click="navigateTo('/packgeB/coursecenter/coursecenter')" v-if="money">
						{{(money.detail.balance - money.amountWithdrawal) / 100}}
					</view>
					<view class="navName">我的钱包</view>
				</view>
			</view>
		</view>
		<view class="member">
			<view class="memberContent" v-if="isios">
				<view class="memberContentTop">
					<view class="" style="height: 40rpx;float: left;margin-top: 6rpx;">
						<img :src="common.imgUrl('/static/images/img16.png')" alt="" />
					</view>
					<text style="margin-left: 10rpx;">
						{{ user.is_member ? '续费千芒商汇会员' : '开通千芒商汇会员' }}
					</text>
				</view>
				<view class="memberContentBottom">享受会员权益</view>
			</view>
			<view class="memberContent1" @click="activateNow()" v-if="isios">
				<strong>{{ user.is_member ? '立即续费' : '立即开通' }}</strong>
			</view>
		</view>
		<view class="orderList">
			<view class="orderList1">
				<view v-for="(item, index) in  orderList" :key="index" class="item " @click="navigateTo(item.path)">
					<view class="itemList">
						<image :src="common.imgUrl(item.imgUrl)" mode=""
							:style="{ width: item.width, height: item.height }"></image>
						<view class="flex-shrink itemName">{{ item.text }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="teaching">
			<view class="title">教学服务</view>
			<view class="service">
				<view v-for="(item, index) in serviceList" :key="index" class="item " @click="navigateTo(item.path)">
					<view class="itemList">
						<image :src="common.imgUrl(item.imgUrl)" mode="" :style="{ width: item.width, height: item.height }"></image>
						<view class="flex-shrink itemName">{{ item.text }}</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="teaching">
			<view class="title">商城服务</view>
			<zcscrool :lL="serviceMall.length">
				<view class="scroolTd">
					<view class="service-shop">
						<view v-for="(item, index) in serviceMall" :key="index" class="item "
							@click="navigateTo(item.path)">
							<view class="itemList">
								<image :src="common.imgUrl(item.imgUrl)" mode=""
									:style="{ width: item.width, height: item.height }">
								</image>
								<uni-badge class="uni-badge-left-margin" v-if="index === 2" :text="statistics.cart" />
								<view class="flex-shrink itemName">{{ item.text }}</view>
							</view>
						</view>
					</view>
				</view>
			</zcscrool>
		</view>
		<view class="teaching" v-if="user.isStore">
			<view class="title">商家服务</view>
			<zcscrool :lL="businessList.length">
				<view class="scroolTd">
					<view class="service-shop" style="width: 100%;">
						<view v-for="(item, index) in businessList" :key="index" class="item "
							@click="navigateTo(item.path)">
							<view class="itemList">
								<image :src="item.imgUrl" mode="" :style="{ width: item.width, height: item.height }">
								</image>
								<uni-badge class="uni-badge-left-margin" v-if="index === 2" :text="statistics.cart" />
								<view class="flex-shrink itemName">{{ item.text }}</view>
							</view>
						</view>
					</view>
				</view>
			</zcscrool>
		</view>
		<view class="teaching">
			<view class="title">常用工具</view>
			<view class="service" v-if="toolList.length<=4">
				<view v-for="(item, index) in toolList" :key="index" class="item " @click="navigateTo(item.path)">
					<view class="itemList">
						<image :src="item.imgUrl" mode="" :style="{ width: item.width, height: item.height }"></image>
						<view class="flex-shrink itemName">{{ item.text }}</view>
					</view>
				</view>
			</view>
			<zcscrool :lL="toolList.length" v-if="toolList.length>4">
				<view class="scroolTd">
					<view class="service-shop" :style="{width:scroll_width}">
						<view v-for="(item, index) in toolList" :key="index" class="item "
							@click="navigateTo(item.path)">
							<view class="itemList">
								<image :src="item.imgUrl" mode="" :style="{ width: item.width, height: item.height }">
								</image>
								<view class="flex-shrink itemName">{{ item.text }}</view>
							</view>
						</view>
					</view>
				</view>
			</zcscrool>
		</view>
		<u-popup v-model="sharePopup" mode="center" border-radius="8">
			<view class="sharePopup">
				<image
					:src="user.h5_code ? common.imgUrl(user.h5_code) : `https://swan.imlimit.com/orgCode?store=${user.id}`"
					mode="widthFix" style="display: block;margin: 0 auto;
			width: 550rpx;box-sizing: border-box;"></image>
				<view class="saveBtn">
					长按保存图片
				</view>
			</view>
		</u-popup>
		<!-- <image src="" mode=""></image> -->
	</view>
</template>

<script>
	import zcscrool from '@/components/zc-scroll/zc-scroll.vue'
	export default {
		components: {
			zcscrool
		},
		data() {
			return {
				sharePopup: false,
				isios: false,
				showbag: false,
				customStyle: {
					backgroundColor: '#62ed0d',
					color: '#fff'
				},
				cucourseTotalCount: 0,
				user: {
					nick: '',
					phone: '',
					avatar_url: '',
					isStore: false
				},
				statistics: {
					order: 0,
					task: 0,
					test: 0,
					message: 0,
					cart: 0
				},
				counts: {},
				scroll_width: '125%',
				businessList: [{
						imgUrl: require('@/static/icon/4.png'),
						text: '数据中心',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeB/coursecenter/coursecenter'
					},
					{
						imgUrl: require('@/static/icon/3.png'),
						text: '我的二维码',
						width: '72rpx',
						height: '72rpx',
						path: ''
					},

					{
						imgUrl: require('@/static/icon/2.png'),
						text: '我的邀请',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeB/cumulativeCustomers/cumulativeCustomers'
					},
					{
						imgUrl: require('@/static/icon/5.png'),
						text: '客户订单',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeB/cumulativeOrders/cumulativeOrders'
					}
				],
				orderList: [{
						imgUrl: '/static/my/icon1.png',
						text: '商城订单',
						width: '50rpx',
						height: '50rpx',
						path: '/pagesShop/order/orderList?id=0'
					},
					{
						imgUrl: '/static/my/icon2.png',
						text: '待付款',
						width: '50rpx',
						height: '50rpx',
						path: '/pagesShop/order/orderList?id=1'
					},
					{
						imgUrl: '/static/my/icon3.png',
						text: '待收货',
						width: '50rpx',
						height: '50rpx',
						path: '/pagesShop/order/orderList?id=3'
					},
					{
						imgUrl: '/static/my/icon4.png',
						text: '退款/售后',
						width: '50rpx',
						height: '50rpx',
						path: '/pagesShop/order/afterSaleList'
					}
				],
				serviceList: [{
						imgUrl: '/static/my/img1.png',
						text: '课程订单',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeA/myOrder/myOrder'
					},
					{
						imgUrl: '/static/my/img2.png',
						text: '我的课程',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeB/myCurriculum/myCurriculum'
					},
					{
						imgUrl: '/static/my/img5.png',
						text: '我的作业',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeA/myTask/myTask'
					},
					{
						imgUrl: '/static/my/img7.png',
						text: '我的测验',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeA/myTest/myTest'
					}
				],
				serviceMall: [{
						imgUrl: '/static/my/img8.png',
						text: '地址管理',
						width: '72rpx',
						height: '72rpx',
						path: '/pagesShop/address/index'
					},
					{
						imgUrl: '/static/my/img10.png',
						text: '购物车',
						width: '72rpx',
						height: '72rpx',
						path: '/pagesShop/shopping/index'
					},
					{
						imgUrl: '/static/my/img11.png',
						text: '浏览记录',
						width: '72rpx',
						height: '72rpx',
						path: '/pagesShop/user/browsingHistory'
					},
					{
						imgUrl: '/static/my/img15.png',
						text: '优惠券',
						width: '72rpx',
						height: '72rpx',
						path: '/pagesShop/coupon/coupon'
					}
				],
				toolList: [
					// {
					// 	imgUrl: '/static/icon/icon4.png',
					// 	text: '家庭管理',
					// 	width: '72rpx',
					// 	height: '72rpx',
					// 	path: '/packgeA/comingSoon/comingSoon'
					// },
					{
						imgUrl: '/static/icon/myActivity.png',
						text: '活动报名',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeB/myActivity/myActivity'
					},
					{
						imgUrl: '/static/my/img4.png',
						text: '我的收藏',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeB/dynamic/dynamic'
					},
					{
						imgUrl: '/static/my/img3.png',
						text: '我的消息',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeA/newsList/newsList'
					},
					{
						imgUrl: '/static/my/img9.png',
						text: '客服管理',
						width: '72rpx',
						height: '72rpx',
						path: '/pagesShop/chat/index'
					},
					{
						imgUrl: '/static/my/img6.png',
						text: '设置',
						width: '72rpx',
						height: '72rpx',
						path: '/packgeA/setUp/setUp'
					}
					// {
					//   imgUrl: "/static/my/icon7.png",
					//   text: "我的优惠卷",
					//   width: "29rpx",
					//   height: "23rpx",
					//   path: "/packgeA/coupon/coupon",
					// },
				],
				vipdata: '',
				money: '',
			}
		},
		onShow() {
			this.isios = true
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		if(res.platform=='ios'){
			// 			this.$axios({
			// 				url: this.$url[103]
			// 			}).then(res => {
			// 				this.isios=res.data
			// 			})
			// 		}else{
			// 			this.isios=true
			// 		}
			// 	}
			// })
			this.getvip()
			this.getuser()
			this.getCourse()
			// this.getclass()
			if (this.$storage.getStorageSync('abbreviation') != '') {
				this.getmoney()
				this.showbag = true
			}
		},
		mounted() {
			// const timer = setInterval(() => {
			// 	if (this.value >= 199) {
			// 		clearInterval(timer)
			// 		return
			// 	}
			// 	this.value++
			// }, 100)
		},
		methods: {
			seescore() {
				uni.navigateTo({
					url: '/packgeB/scorecenter/scorecenter'
				})
			},
			getmoney() {

				this.$axios({
					url: this.$url[93]
				}).then(res => {
					if (res.code == 0) {
						this.money = res.data
						console.log(res);
					}
				})
			},
			getclass() {
				this.$axios({
					url: this.$url[89]
				}).then(res => {
					if (res.code == 0) {
						if (res.data == true) {
							this.scroll_width = '125%'
							this.$axios({
								url: this.$url[90],
							}).then((res) => {
								if (res.code == 0) {
									// if (res.data.status == 1) {
									// 	this.toolList = [{
									// 			imgUrl: '/static/icon/icon4.png',
									// 			text: '家庭管理',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeA/comingSoon/comingSoon'
									// 		},
									// 		{
									// 			imgUrl: '/static/my/img3.png',
									// 			text: '我的消息',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeA/newsList/newsList'
									// 		},
									// 		{
									// 			imgUrl: '/static/my/img4.png',
									// 			text: '我的收藏',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeB/dynamic/dynamic'
									// 		},
									// 		{
									// 			imgUrl: '/static/kdb.png',
									// 			text: '课代表',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeB/coursecenter/coursecenter'
									// 		},
									// 		{
									// 			imgUrl: '/static/my/img6.png',
									// 			text: '设置',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeA/setUp/setUp'
									// 		}
									// 	]
									// } else {
									// 	this.toolList = [{
									// 			imgUrl: '/static/icon/icon4.png',
									// 			text: '家庭管理',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeA/comingSoon/comingSoon'
									// 		},
									// 		{
									// 			imgUrl: '/static/my/img3.png',
									// 			text: '我的消息',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeA/newsList/newsList'
									// 		},
									// 		{
									// 			imgUrl: '/static/my/img4.png',
									// 			text: '我的收藏',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeB/dynamic/dynamic'
									// 		},
									// 		{
									// 			imgUrl: '/static/kdb.png',
									// 			text: '课代表',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeB/classrepresentative/classrepresentative'
									// 		},
									// 		{
									// 			imgUrl: '/static/my/img6.png',
									// 			text: '设置',
									// 			width: '72rpx',
									// 			height: '72rpx',
									// 			path: '/packgeA/setUp/setUp'
									// 		}
									// 	]
									// }
								}

							})

						}
					}
				})
			},
			getuser() {
				this.$axios({
					url: this.$url[6]
				}).then(res => {
					if (res.code == 0) {
						if (!res.data.nick) {
							uni.showModal({
								title: '提示',
								content: '请完善个人信息',
								showCancel: false,
								success(res) {
									uni.reLaunch({
										url: `/packgeA/personalData/personalData`
									})
								}
							});
						}
						this.user = res.data
					}
				})
			},
			getvip() {
				this.$axios({
					url: this.$url[72]
				}).then(res => {
					if (res.code == 0) {
						this.vipdata = res.data
					}
				})
			},
			activateNow() {
				uni.navigateTo({
					url: '/packgeB/my/activateNowContent'
				})
			},
			navigateTo(url) {
				if (url) {
					uni.navigateTo({
						url
					})
				} else {
					this.sharePopup = true
				}

			},
			// 获取统计
			getCourse() {
				this.$axios({
					url: this.$url[37]
				}).then(res => {
					if (res.code == 0) {
						this.statistics = res.data
					}
				})
			}
		}
	}
</script>
<style>
	page {
		min-height: 100vh;
		background: #f6f6f6;
	}
</style>
<style lang="scss" scoped>
	.sharePopup {
		background-color: #FFF;
		width: 600rpx;
		border-radius: 8rpx;
		padding: 20rpx 0 30rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		.saveBtn {
			margin-top: 60rpx;
			color: $project-color;
			border-radius: 500rpx;
			line-height: 80rpx;
			text-align: center;
			font-weight: bold;
			width: 500rpx;
		}

		.shareInnnerBox {
			padding-top: 10rpx;
			width: 550rpx;
			background-color: #FFF;
			border-radius: 8rpx;
			overflow: hidden;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;

			.shareName {
				min-height: 150rpx;
				line-height: 1.8;
				width: 500rpx;
				font-size: 36rpx;
				color: #303133;
				font-weight: bold;
			}

			.sharePriceBox {
				width: 550rpx;
				display: flex;
				align-items: center;
				height: 200rpx;
				box-sizing: border-box;
				padding: 0 25rpx;
				background: #f3f3f3;
				justify-content: space-between;

				.innerPrice {
					font-weight: bold;
					color: $project-color;
					font-size: 46rpx;

					text {
						font-size: 24rpx;
					}
				}
			}
		}
	}

	/deep/ .nav-box {
		height: 160rpx !important;
	}

	/deep/ .scroll-box {
		display: none;
	}

	/deep/ ::-webkit-scrollbar {
		//滚动条整体样式
		display: none;
		width: 10rpx !important;
		height: 10rpx !important;
		-webkit-appearance: auto !important;
		overflow: auto !important;
	}

	/deep/ ::-webkit-scrollbar-thumb {
		//滚动条里面小方块
		border-radius: 10px !important;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
		// background-color: #535353 !important;
	}

	/deep/ ::-webkit-scrollbar-track {
		//滚动条
		border-radius: 10px !important;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
		background-color: #ededed !important;
	}

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

	.medalImg {
		width: 46rpx;
	}

	.box {
		// padding: 0 27rpx;
	}

	/deep/.uni-badge--info {
		color: #fff;
		background-color: red;
	}

	/deep/.uni-badge {
		// width: 50rpx !important;
		// height: 40rpx;
		// line-height: 35rpx;
		// font-size: 25rpx;
	}

	.headers {
		padding: 0 30rpx;
		padding-top: 60rpx;
		background-size: cover;
	}

	.headBox {
		margin: 69rpx 0 43rpx 0;
	}

	.head {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.headCenter {
		margin-left: 27rpx;

		.name {
			font-size: 34rpx;
			font-family: Source Han Sans SC;
			font-weight: bold;
			color: #4d505f;
		}

		// .lable {
		// 	width: 74rpx;
		// 	height: 28rpx;
		// 	background: #ffb521;
		// 	border-radius: 4rpx;
		// 	margin-left: 13rpx;

		// 	.lableIcon {
		// 		width: 15rpx;
		// 		height: 16rpx;
		// 	}
		// 	.lableName {
		// 		font-size: 24rpx;
		// 		color: white;
		// 	}
		// }
	}

	.classBox {
		margin-top: 8rpx;

		.classIcon {
			width: 30rpx;
			height: 30rpx;
			margin-right: 9rpx;
		}

		.class {
			font-size: 24rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #91939b;
		}
	}

	.teaching_box {
		margin-bottom: 20rpx;

	}

	.setUp {
		width: 40rpx;
		height: 37rpx;
	}

	.transverseNav {
		width: 100%;
		height: 162rpx;
		// border-radius: 10rpx;
		// background-color: white;
		text-align: center;

		.number {
			font-size: 40rpx;
			font-family: Source Han Sans SC;
			font-weight: bold;
			color: #666666;
			margin-bottom: 10rpx;
		}

		.navName {
			font-size: 26rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #2d2d2d;
		}
	}

	.member {
		margin: 20rpx 30rpx 0 30rpx;
		height: 120rpx;
		display: flex;
		justify-content: space-around;
		background: linear-gradient(90deg, #3d4359 0%, #252a3a 100%);
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		opacity: 1;
	}

	.memberContent {
		width: 50%;
		height: 150rpx;
	}

	.memberContentTop {
		height: 70rpx;
		color: #ebca91;
		font-size: 35rpx;
		line-height: 80rpx;
	}

	.memberContentTop img {
		width: 45rpx;
		height: 40rpx;
	}

	.memberContentBottom {
		height: 50rpx;
		font-size: 25rpx;
		color: #ffffff;
	}

	.memberContent1 {
		width: 148rpx;
		height: 58rpx;
		background: #ebca91;
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		opacity: 1;
		color: #00020e;
		font-size: 24rpx;
		margin-top: 32rpx;
		text-align: center;
		line-height: 58rpx;
	}

	.orderList {
		margin: -2rpx 30rpx 0rpx 30rpx;
		height: 168rpx;
		background: linear-gradient(90deg, #3d4359 0%, #252a3a 100%);
		border-radius: 0rpx 0rpx 24rpx 24rpx;
		display: flex;
		justify-content: space-around;

		.orderList1 {
			margin: 0rpx 0rpx 0rpx 0rpx;
			width: 110%;
			height: 169rpx;
			background: white;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			justify-content: space-around;

			.item {
				width: 25%;
			}

			.itemList {
				margin-top: 50rpx;
				text-align: center;

				.itemName {
					font-size: 24rpx;
					color: #454545;
				}
			}
		}
	}

	.teaching {
		margin: 20rpx 30rpx 0 30rpx;
		background: #ffffff;
		border-radius: 20rpx;

		.title {
			font-size: 28rpx;
			color: #262626;
			padding-top: 24rpx;
			margin-left: 24rpx;
			padding-bottom: 28rpx;
			font-weight: bold;
		}

		.service {
			margin-top: 18rpx;
			display: flex;
			// justify-content: space-around;

			.item {
				width: 25%;
			}

			.itemList {
				text-align: center;

				.itemName {
					font-size: 24rpx;
					color: #454545;
					padding-bottom: 28rpx;
				}
			}
		}

		.service-shop {
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-top: 18rpx;

			.item {
				width: 25%;
			}

			.itemList {
				text-align: center;
				position: relative;

				.itemName {
					font-size: 24rpx;
					color: #454545;
					padding-bottom: 28rpx;
				}

				.uni-badge-left-margin {
					position: absolute;
					top: -16rpx;
					right: 20rpx;
					color: red;
				}
			}
		}
	}
</style>