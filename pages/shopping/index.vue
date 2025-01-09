<template>
	<view class="main">
		<!--  <u-navbar back-text="返回" :is-back="false" title=""></u-navbar> -->
		<!-- #ifdef H5 -->
		<view class="fixedTop whiteBg" style="margin-top: 44px;">
		<!-- #endif -->
			<!-- #ifdef APP -->
			<view class="fixedTop whiteBg">
			<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="fixedTop whiteBg">
				<!-- #endif -->
					<!-- :class="isPc && 'distance'" -->
					<view class="flex a-center j-between">
						<view class="size32 fontWight">购物车（{{ commodityInfo.length }}）</view>
						<view @click="isEdit" :class="mode !== 'normal' && 'accomplish'">
							{{ mode === 'normal' ? '编辑' : '完成' }}
						</view>
					</view>
				</view>
				<view class="content" v-if="commodityInfo.length !== 0" :style="{'min-height':height+'px'}">
					<view class="color">
					</view>
					<view v-for="(row, i) in commodityInfo" :key="i" class="store">
						<!-- #ifdef APP -->
						<view class="StoreName StoreName1">
							<u-checkbox activeColor="#042BE3" @change='changestore' :name="row.id"
								:value="row.isChenkAll" size="35rpx" shape="circle"></u-checkbox>
							<view class="" style="font-size: 32rpx;">
								{{row.name}}
							</view>
						</view>
						<!-- #endif -->
						<!-- #ifndef APP -->
						<view class="StoreName">
							<u-checkbox activeColor="#042BE3" @change='changestore' :name="row.id"
								:value="row.isChenkAll" size="35rpx" shape="circle"></u-checkbox>
							<view class="" style="font-size: 32rpx;">
								{{row.name}}
							</view>
						</view>
						<!-- #endif -->

						<view class="commodity" :class="isDisabled(item) ? 'whiteBg' : 'disabled'"
							v-for="(item, index) in row.list" @click="currId = item.id" :key="index">
							<view class="">
								<view class="themeColor">{{ item.type ? '加购' : '' }}</view>
								<view class="flex a-center commodityInfo">
									<!-- #ifdef APP -->
									<view class="checkbox StoreName1">
										<u-checkbox @change="pitchOn" :name="item.id" :value="item.status"
											activeColor="#042BE3" size="35rpx" shape="circle"></u-checkbox>
									</view>
									<!-- #endif -->
									<!-- #ifndef APP -->
									<view class="checkbox">
										<u-checkbox @change="pitchOn" :name="item.id" :value="item.status"
											activeColor="#042BE3" size="35rpx" shape="circle"></u-checkbox>
									</view>
									<!-- #endif -->
									<view class="flex a-center j-around contentBox" @click="skip(item.product.id)">
										<view class="imgBox">
											<image class="img" :src="common.imgUrl(item.product.img)" mode="aspectFill" style="width: 154rpx;height: 154rpx;border-radius: 12rpx;"></image>
										</view>
										<view class="rightBox">
											<view class="fontWight ellipsis2" style="font-size: 30rpx;">{{ item.product.name }}</view>
											<view class="specification color999 ellipsis2">
												{{ specificationsStatus(item) }}
											</view>
											<view class="flex a-center" v-if="item.specificationsStatus.original_price * 1 !==
													item.specificationsStatus.price">

												<view class="size28 fontWight original color999">
													￥{{ item.specificationsStatus.original_price }}
												</view>
												<view class="preferential themeColor size28"> 优惠价￥{{ item.specificationsStatus.price }}
												</view>
											</view>
											<view class="themeColor size28" v-else>
												￥{{ item.specificationsStatus.price }}
											</view>
										</view>
									</view>
								</view>
								<view class="numberbox flex j-end">
									<u-number-box :min="item.product.min_count" :max="item.specificationsStatus.stock"
										@change="numberChange" :disabled-input="true" :index="item.id"
										:step="item.product.min_count" :disabled="isDisabled(item) ? false : true"
										:value="item.number"></u-number-box>
								</view>
							</view>
							<view class="" v-if="item.gift.length">
								<text>赠品</text>
								<view class="" v-for="(giftItem,ind) in item.gift" :key='ind'>
									<view class="flex a-center commodityInfo">
										<view class="imgBox">
											<u-image class="img" width="154rpx" height="154rpx"
												:src="common.imgUrl(giftItem.img)" @error="imgerror(index,'gift',ind)">
											</u-image>
										</view>
										<view class="rightBox">
											<view class="fontWight ellipsis2">{{ giftItem.name }}</view>
											<view class="specification color999">{{ giftItem.specifications.join('/') }}
											</view>
										</view>
									</view>
									<view class="numberbox flex j-end">
										<u-number-box :min="1" :max="
									giftItem.stock - giftItem.max_count > giftItem.max_count
										? giftItem.max_count
										: giftItem.stock
								" @change="giftNumberChange($event,index,ind)" :disabled-input="true" :index="giftItem.id"
											:value="giftItem.number" :step="1"
											:disabled="giftIsDisabled(giftItem) ? false : true">
										</u-number-box>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="empty" v-else>
					<u-empty text="您的购物车暂无商品" icon-size="180" font-size="30" margin-top="80"></u-empty>
					<view class="" style="height: 40vh;">
						
					</view>
				</view>
				<view class="footer whiteBg flex j-between a-center" style="bottom: 100rpx;">
					<!-- #ifdef APP -->
					<view class="flex a-center StoreName1">
						<u-checkbox @change="checkAll" v-model="isChenkAll" active-color="#042BE3" size="35rpx"
							shape="circle">
						</u-checkbox>
						<text class="color666 checkAll">全选</text>
						<view class="flex a-center" v-if="mode === 'normal'">
							<view class="">
								<view class=""> 合计： <text class="themeColor fontWight">￥{{ totalPrice }}</text>
								</view>
								<!-- <view class="size20 color999">优惠券减{{commodityInfo.length ? '￥100' : '0.00'}}</view> -->
							</view>
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef APP -->
					<view class="flex a-center">
						<u-checkbox @change="checkAll" v-model="isChenkAll" active-color="#042BE3" size="35rpx"
							shape="circle">
						</u-checkbox>
						<text class="color666 checkAll" style="padding-right: 0rpx;">全选 &nbsp;&nbsp;&nbsp; 合计：</text>
						<view class="flex a-center" v-if="mode === 'normal'">
							<view class="">
								<view class="" style="line-height: 36rpx;">  <text class="themeColor fontWight" style="font-size: 36rpx;">￥{{ totalPrice }}</text>
								</view>
								<!-- <view class="size20 color999">优惠券减{{commodityInfo.length ? '￥100' : '0.00'}}</view> -->
							</view>
						</view>
					</view>
					<!-- #endif -->

					<view class="size32 payment" @click="paymentOrDeletion">
						{{ mode === 'normal' ? '结算' : '删除' }}({{ checkedId.length }})
					</view>
				</view>
				<u-modal v-model="show" width="682rpx" title='请电话联系购买' :border-radius='20' :show-confirm-button='false'
					:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able>
					<!-- <view class="textCenter">
				<image src="../../static/more3.png" mode="widthFix"></image>
			</view> -->
					<view class="phoneText" style="text-align: center;line-height: 200rpx;"> 联系电话 : 021-50770206 </view>
					<view style="padding:30rpx 42rpx 30rpx 42rpx;">
						<view @click="()=>{show=false}"
							style="background: #ea261e;height:84rpx;line-height: 84rpx;color:white;text-align: center;border-radius: 20px;"
							type="success">确定 </view>
					</view>
				</u-modal>
			</view>
</template>
<script>
	import {
		getCartList,
		changeCart,
		deleteCart
	} from '@/plugin/api/product.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {},
		data() {
			return {
				show: false,
				mode: 'normal',
				totalPrice: '0.00',
				isChenkAll: false,
				commodityInfo: [],
				currId: 0,
				checkedId: [],
				isPc: true,
				height: 0
				// 购物列表
			}
		},
		computed: {
			...mapState({
				number: state => state.number,
				price: state => state.price
			})
		},
		onShow() {
			// #ifdef H5
			let ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				this.isPc = false
			} else {
				this.isPc = true
			}
			// #endif
			let windowHeight = ''
			let height = ''
			let height1 = ''
			uni.getSystemInfo({
				success(res) {
					windowHeight = res.windowHeight
				}
			})
			setTimeout(() => {
				uni.createSelectorQuery().in(this).select('.fixedTop').boundingClientRect(data => {
					height = data.height
				}).exec();
				uni.createSelectorQuery().in(this).select('.footer').boundingClientRect(data => {
					height1 = data.height
				}).exec();
				this.height = windowHeight + height + height1
			}, 1)

			this.$store.commit('filterCoupon', {})
			this.$store.commit('postageCoupon', {})
			this.$store.commit('addPurchasedList', [])
			this.$store.commit('discountCoupon', {})
			this.getList()
		},
		onHide() {
			this.mode = 'normal'
		},
		methods: {
			imgerror(i, item, ind) {
				if (item == 'top') {
					this.commodityInfo[i].product.img = '/static/images/default.png'
				}
				if (item == 'gift') {
					this.commodityInfo[i].gift[ind].img = '/static/images/default.png'
				}
			},
			skip(id) {
				uni.navigateTo({
					url: '/pagesShop/commodity/detail?id=' + id
				})
			},
			changestore(e) {
				let num = true
				for (let i = 0; i < this.commodityInfo.length; i++) {
					if (this.commodityInfo[i].id == e.name) {
						for (let index = 0; index < this.commodityInfo[i].list.length; index++) {
							changeCart({
								id: this.commodityInfo[i].list[index].id,
								status: e.value
							}).then(() => {
								this.getList()
							})
						}
					}
				}
			},
			isEdit() {
				this.mode === 'normal' ? (this.mode = 'edit') : (this.mode = 'normal')
			},
			isDisabled(item) {
				return item.product.status === '0' && item.specificationsStatus.stock ? true : false
			},
			giftIsDisabled(item) {
				return item.status === '0' && item.stock ? true : false
			},
			specificationsStatus(item) {
				return item.specificationsStatus.name.map(item => item.name).join('/')
			},
			changeTotalPrice() {
				let totalPrice = 0
				this.commodityInfo.forEach(item => {
					item.list.forEach(v => {
						if (v.status === true) {
							totalPrice += v.number * v.specificationsStatus.price
						}
					})
				})
				this.totalPrice = totalPrice.toFixed(2)
			},
			getList() {
				getCartList().then(res => {
					if (res.data.length) {
						uni.setTabBarBadge({
							index: 2,
							text: res.number
						})
					} else {
						uni.removeTabBarBadge({
							index: 2
						})
					}
					this.commodityInfo = res.data.map(item => {
						item.list = item.list.map(v => {
							if (v.status === 1 && v.product.status === '0') {
								v.status = true
							} else {
								v.status = false
							}
							return v
						})
						item.isChenkAll = item.list.every(val => val.status === true)
						return item
					})
					this.ifcheckall()
					this.changeTotalPrice()
					this.changeCheckedId()
					uni.hideLoading()
				})
			},
			changeCheckedId() {
				let id = []
				this.commodityInfo.filter(item => {
					item.list.filter(v => {
						if (v.status === true) {
							id.push(v.id)
						}
					})
				})
				this.checkedId = id
			},
			paymentOrDeletion1() {
				this.show = true
			},
			paymentOrDeletion() {
				// 支付或删除
				if (!this.checkedId.length) {
					uni.showToast({
						icon: 'none',
						title: '请选择商品进行结算'
					})
					return
				}
				// if(this.isPc){
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请使用微信进行购物'
				// 	})
				// 	return
				// }
				if (this.mode === 'normal') {
					let purchaseInfo = []
					let addPurchasedList = []
					if (this.commodityInfo.length === 0) {
						uni.showToast({
							icon: 'none',
							title: '请选择商品进行结算'
						})
						return
					}
					console.log(this.commodityInfo, '123123')
					this.commodityInfo.forEach(v => {
						v.list.filter(item => {
							if (item.status === true) {
								if (!item.type) {
									purchaseInfo.push({
										org: {
											oid: v.id,
											name: v.name
										},
										isAdditionalPurchase: v.isAdditionalPurchase,
										gift: item.gift,
										id: item.id,
										number: item.number,
										product: item.product,
										specificationsStatus: item.specificationsStatus,
										status: item.status
									})
								} else {
									addPurchasedList.push({
										gift: item.gift,
										product_id: item.product.id,
										id: item.id,
										number: item.number,
										product: {
											activityList: item.product.activityList,
											img: item.product.img,
											name: item.product.name,
											min_count: item.product.min_count,
											postage: item.product.postage
										},
										specificationsStatus: {
											img: item.specificationsStatus.img,
											name: item.specificationsStatus.name,
											price: item.specificationsStatus.price
										}
									})
								}
							}
						})
					})
					this.$store.commit('purchaseInfo', purchaseInfo)
					this.$store.commit('addPurchasedList', addPurchasedList)
					this.$store.commit('isSeparate', false)
					uni.navigateTo({
						url: '/pagesShop/order/index'
					})
				} else {
					uni.showModal({
						title: '确认将个' + this.checkedId.length + '宝贝删除？',
						cancelText: '我再想想',
						success: res => {
							if (res.confirm) {
								uni.showLoading({
									title: '加载中'
								})
								deleteCart({
									id: this.checkedId
								}).then(res => {
									this.getList()
								})
								console.log('用户点击确定')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
			},
			checkAll(e) {
				if (this.commodityInfo.length == 0) {
					return
				}
				uni.showLoading({
					title: '加载中'
				})
				let num = true
				for (let i = 0; i < this.commodityInfo.length; i++) {
					for (let index = 0; index < this.commodityInfo[i].list.length; index++) {
						if (this.commodityInfo[i].list[index].status != e.value) {
							this.commodityInfo[i].list[index].status = !e.value
							changeCart({
								id: this.commodityInfo[i].list[index].id,
								status: e.value ? 1 : 0
							}).then(() => {
								this.getList()
							})
						}
					}
				}
				// 是否全选
			},
			ifcheckall() {
				this.commodityInfo = this.commodityInfo.map(item => {
					item.isChenkAll = item.list.every(val => val.status === true)
					return item
				})
				if (this.commodityInfo.length == 0) {
					this.isChenkAll = false
				} else {
					this.isChenkAll = this.commodityInfo.every(v => {
						return v.isChenkAll == true
					})
				}
			},
			giftNumberChange(e, index, ind) {
				this.commodityInfo[index].gift[ind].number = e.value
				changeCart({
					id: e.index,
					number: e.value
				})
			},
			numberChange(e) {
				this.commodityInfo.forEach(v => {
					v.list.map(item => {
						if (item.id == e.index) {
							item.number = e.value
						}
					})
				})
				changeCart({
					id: e.index,
					number: e.value
				})
				this.changeTotalPrice()
			},
			pitchOn(e) {
				// 单选商品
				changeCart({
					id: e.name,
					status: e.value ? 1 : 0
				})
				this.commodityInfo.map(v => {
					v.list.map(item => {
						if (item.id == e.name) {
							item.status = e.value ? true : false
						}
					})
				})
				this.ifcheckall()
				this.changeTotalPrice()
				this.changeCheckedId()
			}
		}
	}
</script>
<style lang="scss">
	.StoreName1 {
		.u-checkbox .u-checkbox__icon-wrap text {
			top: 0rpx !important;
		}
	}

	.u-checkbox .u-checkbox__icon-wrap text {
		top: -8rpx !important;
	}
</style>
<style lang="scss" scoped>
	@import '@/pagesShop/scss/shopping.scss';
</style>