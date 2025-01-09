<template>
	<view class="main" v-if="detail">
		<swiper class="swiperBox" :autoplay="true" :style="{height:windowWidth+'px'}">
			<swiper-item v-for="(item,index) in detail.picture" :key='index'>
				<u-image :height="windowWidth + 'px'" :src="common.imgUrl(item.url)"
					v-if="item.type.indexOf('image') >= 0" @click="onPreviewImage(item.url)" @error='imgerror(index)' />
				<view class="page" v-else>
					<video class="video" id="myVideo" style="width: 100%;" :controls="true"
						:style="{height:windowWidth+'px'}" :enable-progress-gesture="false" :show-center-play-btn="true"
						:src="item.url"></video>
				</view>
			</swiper-item>
		</swiper>
		<!-- <u-swiper
      :list="detail.picture"
      name="url"
      mode="number"
      :height="660"
      indicator-pos="bottomRight"
    ></u-swiper> -->
		<view class="whiteBg item">
			<view class="">
				<view class="shareBox">
					<view class="flex a-cener" style="align-items: center;">
						<view class="price fontWight themeColor">
		
							<view v-if="commodityInfo.price != 0">
								<text class="size20">￥</text>
								<text class="size46 xprice" v-if="commodityInfo.is_discount==0">{{ commodityInfo.sale_price }}</text>
								<text class="size46 xprice" v-if="commodityInfo.is_discount==1"><text style="font-size: 28rpx;color: #333;">会员价：</text>￥{{commodityInfo.discount_price}}</text>
								<text class="originalPrice color999"
									v-if="commodityInfo.sale_price * 1 < commodityInfo.original_price * 1">
									{{ commodityInfo.original_price ? "￥" + commodityInfo.original_price : "" }}
								</text>
							</view>
							<view v-if="commodityInfo.price == 0">
								<text class="size46 xprice">面议</text>
							</view>
							
						</view>
						<view class="discount" style="" v-if="isDiscount">折后{{ detail.price }}起</view>
						<view class="purchasedEvents" v-if="detail.isAdditionalPurchase" @click="purchasedSkip()">
							点我￥{{ detail.additional_purchase_price }}加购
						</view>
					</view>
					<view class="shareBoxRight" @click="sharePopup = true">
						<image src="../../static/icon/share.png" mode="widthFix"></image>
						<view class="">
							分享
						</view>
					</view>
				</view>

				<view class="flex">
					<view class="flex" v-if="detail.activityList.length">
						<view class="events flex" v-for="item in detail.activityList">{{ item.name }}</view>
					</view>
				</view>
			</view>
			<view class="title size36 fontWight">{{ detail.name }}</view>
			<view class="flex">
				<view class="color999 flex a-center">
					<u-image class="img" width="30rpx" height="28rpx"
						:src="common.imgUrl('/static/shop/common/inventory.png')"></u-image>
					<text>库存 : {{ detail.stock ? '有' : '无' }}</text>
				</view>
				<view class=" color999 flex a-center distance">
					<u-image class="img" width="30rpx" height="28rpx"
						:src="common.imgUrl('/static/shop/common/sales.png')"></u-image>
					<text>销量 : {{ detail.salesVolume }}</text>
				</view>
			</view>
		</view>
		<view class="whiteBg item">
			<view class="flex size30 option">
				<view class="fontWight lable">规格</view>
				<view @click="isShowCategory = true" class="flex1">
					<view class="flex a-center j-between">
						<view class="">{{ commodityInfo.content }}</view>
						<u-icon name="arrow-right" color="#999" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="flex size30 option" v-if="giftInfo.length && !purchased">
				<view class="fontWight lable">赠品</view>
				<view @click="showGift" class="flex1">
					<view class="flex a-center j-between">
						<view class="ellipsis2">{{ giftText }}</view>
						<u-icon name="arrow-right" color="#999" size="28"></u-icon>
					</view>
				</view>
			</view>

			<view class="flex a-center size30 option" v-if="detail.introduction.length">
				<view class="color999 lable">简介</view>
				<view class="">{{ detail.introduction }}</view>
			</view>
		</view>
		<view class="whiteBg comment item">
			<view class="flex j-between a-center">
				<view class="color999">商品评价（{{ commentList.length }}）</view>
				<view class="themeColor" @click="commentLink">
					查看全部
					<u-icon name="arrow-right" color="#042BE3"></u-icon>
				</view>
			</view>
			<view v-if="commentList.length">
				<view class="commentList" v-for="(item, index) in commentList" :key="index">
					<view class="flex">
						<u-image class="img" width="75rpx" height="75rpx" :src="common.imgUrl(item.user.avatar_url)"
							shape="circle"></u-image>
						<view class="">
							<view class="">
								<view class="fontWight">{{ item.user.nick }}</view>
								<view class="color999 size26">{{ item.ctime }}</view>
							</view>
							<view class="commentText ellipsis2">{{ item.content }}</view>
							<view class="flex file" v-if="item.file.length">
								<u-image v-for="(j, idx) in item.file" width="90rpx" height="90rpx"
									:src="common.imgUrl(j.url)"></u-image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="center none" v-else>暂无评论~</view>
		</view>
		<view class="introduce whiteBg">
			<view class="themeColor center introduceTitle size30">—— 介绍详情 ——</view>
			<view class=""></view>
			<view v-html="common.content(detail.content)"></view>
		</view>
		<view class="more" v-if="commodityList.length">
			<view class="size36 themeColor center">—— 您可能还需要以下商品 ——</view>
			<view class="commodityData flex wrap a-center j-between">
				<view class="commodityList" v-for="(item, index) in commodityList"
					@click="skip('/pagesShop/commodity/detail?id=' + item.id)" :key='index'>
					<u-image width="300rpx" height="330rpx" :src="common.imgUrl(item.img)" mode="widthFix"
						@error="errorimg(index)"></u-image>
					<view class="text size32 ellipsis2 fontWight">{{ item.name }}</view>
					<view class="salesVolume flex j-end">
						<!-- <text class="size22">{{ item.number }}</text> -->
						<text class="size22">销量:{{ item.salesVolume }}</text>
					</view>
					<view class="flex a-center j-between priceItem">
						<view class="flex center">
							<view class="size22">
								<text class="price">￥{{ item.price ? item.price : item.original_price }}</text>
							</view>
							<text class="originalPrice color999" v-if="item.price">
								{{ item.original_price ? '￥' + item.original_price : '' }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品规格 -->
		<u-popup class="box" v-model="isShowCategory" mode="bottom" :safe-area-inset-bottom="true" height="900rpx"
			:closeable="true">
			<view class="categoryList">
				<view class="info flex">
					<u-image class="img" width="170rpx" height="170rpx" :src="common.imgUrl(commodityInfo.img)">
					</u-image>
					<view class="">
						<view class="size36 fontWight flex a-center">
							<view class="themeColor">￥{{ commodityInfo.sale_price }}</view>
							<view class="discount size26" v-if="isDiscount">折后{{ commodityInfo.price }}起</view>
						</view>
						<view class="color999 size26" v-if="commodityInfo.stock > 0" style="margin-bottom: 6rpx;">
							库存 : {{ commodityInfo.stock }}
						</view>
						<view class="size26" style="margin-bottom: 6rpx;">{{ commodityInfo.content }}</view>
						<view class="size26" v-if="commodityInfo.serialNumber" style="margin-bottom: 6rpx;">
							编号：{{ commodityInfo.serialNumber }}</view>
					</view>
				</view>
				<view class="list" v-for="(item, index) in detail.stock_list.type" :key="index">
					<view class="lable">{{ item.name }}</view>
					<view class="flex a-center">
						<view class="categoryType"
							:class="specification[index] && specification[index].index === idx ? 'active' : ''"
							@click="commodityChange(index, idx, j)" v-for="(j, idx) in item.list" :key="idx"
							v-if="usableSpecificationChange(j, index)">
							<view class="flex a-center">
								<view class="" v-if="j.img">
									<u-image class="typeImg" width="52rpx" height="52rpx" :src="common.imgUrl(j.img)">
									</u-image>
								</view>
								<view class="size26 content">{{ j.name }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex a-center j-between">
					<view class="">购买数量</view>
					<u-number-box :min="detail.min_count" :max="detail.stock" @change="numberChange"
						:disabled-input="true" v-model="commodityInfo.number" :step="detail.min_count"></u-number-box>
				</view>
			</view>
			<view class="whiteBg bottom">
				<view class="submit center size32" @click="ShowCategoryChange()">确定</view>
			</view>
		</u-popup>
		<!-- 赠品 -->
		<u-popup v-model="isShowGift" mode="bottom" :safe-area-inset-bottom="true" height="900rpx" :closeable="true"
			@close="close">
			<view class="categoryList">
				<view class="center giftTips">
					本商品有参予活动，请选择赠品。 ({{ activity.is_single === 0 ? '多选' : '单选' }})
				</view>
				<view class="flex a-center" v-for="(item, index) in giftInfo" :key="index"
					@click="giftCategory(item, index)">
					<view>
						<u-checkbox :name="item.id" @change="pitchOn" active-color="#042BE3" v-model="item.checked"
							size="35rpx" shape="circle"></u-checkbox>
					</view>

					<!-- <u-image class="img" width="154rpx" height="154rpx" :src="common.imgUrl(item.product.img)">
						</u-image> -->
					<view class="popupItem">
						<view class="fontWight lable">{{ item.name }}</view>
						<view class="color999 categoryType ellipsis1">{{ item.content }}</view>
					</view>
				</view>
			</view>
			<view class="whiteBg bottom">
				<view class="submit center size32" @click="addCartChange">确定</view>
			</view>
		</u-popup>
		<!-- 赠品规格 -->
		<u-popup v-model="isShowGiftCategory" mode="bottom" :safe-area-inset-bottom="true" height="900rpx"
			:closeable="true">
			<view class="categoryList" v-if="giftInfo.length">
				<view class="list" v-for="(item, index) in giftStockList.type" :key="index">
					<view class="lable">{{ item.name }}</view>
					<view class="flex a-center">
						<view class="categoryType"
							:class="giftSpecification[index] && giftSpecification[index].index === idx ? 'active' : ''"
							@click="gifeChange(index, idx, j)" v-for="(j, idx) in item.list" :key="idx"
							v-if="usableGiftListChange(j, index)">
							<view class="flex a-center">
								<view class="" v-if="j.img">
									<u-image class="typeImg" width="52rpx" height="52rpx" :src="common.imgUrl(j.img)">
									</u-image>
								</view>
								<view class="size26 content">{{ j.name }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex a-center j-between">
					<view class="">数量</view>
					<view class="flex a-center">
						<u-number-box :min="1" :max="maxNumber()" :disabled-input="true"
							v-model="giftInfo[giftIndex].number"></u-number-box>
						<view class="number">x{{ commodityInfo.number / detail.min_count }}</view>
					</view>
				</view>
			</view>
			<view class="whiteBg bottom">
				<view class="submit center size32" @click="isShowGiftCategory = false">确定</view>
			</view>
		</u-popup>
		<!-- 优惠券 -->
		<view class="popup" v-if="isShowDiscounts">
			<u-popup v-model="isShowDiscounts" mode="bottom" :safe-area-inset-bottom="true" height="900rpx">
				<view class="discounts">
					<view class="title center themeColor size32 fontWight">优惠明细</view>
					<view class="themeColor bottomPrice fontWight center">￥299</view>

					<view class="calculate flex j-center">
						<view>
							<view class="themeColor center fontWight size34">299</view>
							<view class="themeColor size22 discountsTips1">当前售价</view>
						</view>
						<view class="fontWight themeColor padding29">-</view>
						<view>
							<view class="themeColor fontWight center size34">20</view>
							<view class="discountsTips2">
								<view class="themeColor size22 discountsTips3">优惠券</view>
								<view class="themeColor center size22">满299</view>
								<view class="themeColor center size22">减20</view>
							</view>
						</view>
					</view>
					<view class="couponList">
						<view class="coupon flex a-center j-around">
							<view class="dotted">
								<view class="flex a-center">
									<view class="fontWight couponPrice">￥20</view>
									<view class="fontWight size34">购物福利优惠券</view>
								</view>
								<view class="flex j-between">
									<view class="size22 padding20">满299可用</view>
									<view class="size24 padding20">领取后15天内有效</view>
								</view>
							</view>
							<view class="couponStatus fontWight">立即领取</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<storeInformation></storeInformation>
		<view class="footer whiteBg" v-if="!forbid">
			<view class="flex a-center" v-if="!purchased">
				<view class="left flex a-center j-around">
					<view class="chat" @click="homeSkip('/pages/shop/index')">
						<u-image class="img" width="32rpx" height="32rpx"
							:src="common.imgUrl('/static/pageShop/index.png')"></u-image>
						<view class="themeColor size24 center">首页</view>
					</view>
					<view class="chat" @click="skip('/pagesShop/chat/index')">
						<u-image class="img" width="32rpx" height="32rpx"
							:src="common.imgUrl('/static/pageShop/chat.png')"></u-image>
						<view class="themeColor size24 center">客服</view>
					</view>
					<view class="chat" @click="skip('/pagesShop/shopping/index')">
						<u-badge :offset="[-10, 15]" :count="shoppingNumber"></u-badge>
						<u-image class="img" width="32rpx" height="32rpx"
							:src="common.imgUrl('/static/pageShop/car.png')"></u-image>
						<view class="themeColor size24 center">购物车</view>
					</view>
				</view>

				<view class="right">
					<view class="flex j-around" v-if="detail.stock && detail.status === '0'">
						<view class="add flex1 center" style='font-weight: bold;' @click="addCart">加入购物车</view>
						<view class="purchase flex1 center" style='font-weight: bold;' @click="purchase(commodityInfo.ismianyi)">{{commodityInfo.ismianyi == 1 ? '面议' : '立即购买'}}</view>

					</view>
					<view class="soldOut center" v-else>{{ detail.status === '1' ? '已下架' : '缺货' }}</view>
				</view>
			</view>
			<view class="purchased" v-else @click="addPurchasedList">
				<view class="center">加购</view>
			</view>
		</view>
		<u-modal v-model="show" width="682rpx" title='请电话联系购买' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able>
			<!-- <view class="textCenter">
				<image :src="common.imgUrl('/static/more3.png')" mode="widthFix"></image>
			</view> -->
			<view class="phoneText" style="text-align: center;line-height: 200rpx;"> 联系电话 : 021-50770206 </view>
			<view style="padding:30rpx 42rpx 30rpx 42rpx;">
				<view @click="()=>{show=false}"
					style="background: #ea261e;height:84rpx;line-height: 84rpx;color:white;text-align: center;border-radius: 20px;"
					type="success">确定 </view>
			</view>
		</u-modal>
		<u-popup v-model="sharePopup" mode="center" border-radius="8">
			<view class="sharePopup">
				<image :src="base64" mode="widthFix" v-if="base64" style="display: block;margin: 0 auto;
			width: 550rpx;box-sizing: border-box;"></image>
				<view class="shareInnnerBox" ref="imageWrapper" v-else id='imageWrapper'>
					<img :src="common.imgUrl(detail.picture[0].url)"
						style="width: 500rpx;height: 500rpx;object-fit: cover;" crossorigin="anonymous" />
					<view class="shareName">
						{{ detail.name }}
					</view>
					<view class="sharePriceBox">
						<view class="xprice innerPrice">
							<text>￥</text>
							{{ commodityInfo.priceList[0] == commodityInfo.priceList[1] ? commodityInfo.priceList[0] : `${commodityInfo.priceList[0]}~${commodityInfo.priceList[1]}` }}
						</view>
						<view style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
							<canvas canvas-id="qrcode" style="width:60px;height: 60px;" />
							<view class="" style="font-size: 24rpx;color: #999;margin-top: 10rpx;line-height: 1;">
								扫描或长按识别
							</view>
						</view>
					</view>
				</view>
				<view class="saveBtn">
					长按保存图片
				</view>
			</view>
		</u-popup>
		<u-modal v-model="showphone" width="682rpx" title='联系人' mask-close-able showConfirmButton showCancelButton @confirm='phonesucc'>
			<view class="phonecs">
				{{commodityInfo.name}}：{{commodityInfo.phone}}
			</view>
		</u-modal>
	</view>
</template>

<script>
	import html2canvas from "html2canvas"
	import storeInformation from "@/components/storeInformation.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		productInfo,
		addCart,
		commnentList,
		listJson,
		getCartList
	} from '@/plugin/api/product.js'
	// #ifdef H5
	import wxInit from '@/plugin/api/wxConfig.js'
	// #endif
	import uQRCode from '@/components/code.js' //引入uqrcode.js
	export default {
		components: {
			storeInformation
		},
		watch: {
			sharePopup(newValue, oldValue) {
				if (newValue) {
					if(!this.base64){
						this.generateQrCode()
					}
				}
			}
		},
		data() {
			return {
				showphone: false,
				titlephone: '联系方式',
				contentphone:'1',
				sharePopup: false,
				show: false,
				forbid: false,
				isDiscount: false,
				mode: '',
				shoppingNumber: 0,
				purchasedList: [],
				purchased: false,
				isShowGife: false,
				videoplay: '',
				id: 0,
				base64: '',
				detail: null,
				isShowDiscounts: false,
				isShowCategory: false,
				isShowGift: false,
				isShowGiftCategory: false,
				specification: [],
				usableSpecificationList: [],
				// 赠品
				activity: {
					is_single: 0,
					proportion: '',
					fixed: ''
				},
				// 选中的分类信息
				commodityInfo: {
					uid:0,
					id: '',
					img: '',
					number: 0,
					stock: 0,
					price: '',
					sale_price: '',
					content: '',
					selectedIndex: '',
					selectedText: [],
					serialNumber: '',
					priceList: [0,0],
					is_discount: 0,
					discount_price: ''
				},
				giftStockList: [],
				usableGiftList: [],
				giftText: '请选择',
				giftSpecification: [],
				giftIndex: 0,
				giftInfo: [],
				giftStatus: true,
				selectiveGift: [],
				// 可能需要的商品
				commodityList: [],
				currCategory: {},
				// 评论
				commentList: [],
				windowWidth: 0
			}
		},

		onReady() {
			this.videoplay = uni.createVideoContext('myVideo')
		},
		onLoad(option) {
			let token = uni.getStorageSync('token')
			this.windowWidth = uni.getWindowInfo().windowWidth
			// #ifdef H5
			wxInit()
			let query = window.location.search.substring(1)
			// #endif
			this.purchasedList = this.$store.state.addPurchasedList

			if (option.purchased) {
				this.purchased = true
			}
			if (option.forbid) {
				this.forbid = true
			}
			this.id = parseInt(option.id)
			this.getDetail()
			if(this.token){
				this.getCartList()
			}
			this.commnentList()
			let that = this
			// #ifdef H5
			wx.ready(function() {
				let _this = that
				wx.onMenuShareAppMessage({
					title: _this.detail.name, // 分享标题
					desc: '卖铺宝', // 分享描述
					link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: _this.common.imgUrl(_this.detail.picture[0].url), // 分享图标
					success: function() {}
				});
				wx.onMenuShareTimeline({
					title: that.projectDetail.project_name, // 分享标题
					link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: that.projectPic[0], // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
					}
				});
			});
			// #endif
			
		},
		onShareAppMessage(res) {
			return {
				title: this.detail.name,
				imageUrl: this.detail.picture ? this.common.imgUrl(this.detail.picture[0].url) : '',
				path: '/pagesShop/commodity/detail?id=' + this.id
			}
		},
		onShareTimeline() {
			return {
				title: this.detail.name,
				imageUrl: this.detail.picture ? this.common.imgUrl(this.detail.picture[0].url) : '',
				path: '/pagesShop/commodity/detail?id=' + this.id
			}
		},
		methods: {
			phonesucc() {
				wx.makePhoneCall({
					phoneNumber: this.commodityInfo.phone,
					success() {
						console.log(1);
					},
					fail() {
						console.log(0)
					}
				})
			},
			toImage() {
				let id = window.document.getElementById('imageWrapper')
				html2canvas(id, {
					backgroundColor: null, //画出来的图片有白色的边框,不要可设置背景为透明色（null）
					useCORS: true, //支持图片跨域
					scale: 5, //设置放大的倍数
				}).then(canvas => {
					let url = canvas.toDataURL("image/png");
					this.base64 = url.toString()
				});
			},
			generateQrCode() {
				let that = this
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: ` /h5/packgeA/login/login?commodityId=${this.commodityInfo.id}&store_id=${this.commodityInfo.uid}`,
					size: 60,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						that.toImage()
					}
				})
			},
			errorimg(i) {
				this.commodityList[i].img = this.common.imgUrl('/static/images/default.png')
			},
			imgerror(i) {
				this.detail.picture[i].url = this.common.imgUrl('/static/images/default.png')
				this.detail.picture[i].type = 'image/jpeg'
			},
			...mapMutations(['commodity']),
			init() {
				this.detail.stock_list.type.forEach((item, index) => {
					console.log(item.list, 'item.list')
					if (item.list.length === 1) {
						this.commodityChange(index, 0, item.list[0])
					}
				})
			},
			// 加购跳转
			purchasedSkip() {
				this.$store.commit('purchasedSource', {
					type: 'detail'
				})
				uni.navigateTo({
					url: '/pagesShop/order/purchased'
				})
			},
			getDetail() {
				productInfo({
					id: this.id,
					isAdditionalPurchase: this.purchased
				}).then(res => {
					console.log(res.data, 'data')
					if (res.code == 0) {
						this.detail = res.data
						res.data.picture.map(item => {
							item.url = this.common.imgUrl(item.url)
						})
						let content = '请选择 ' + res.data.stock_list.type.map(item => item.name).join('/')
						let price =
							res.data.sale_price === res.data.max_sale_price ?
							res.data.sale_price :
							res.data.sale_price + '~' + res.data.max_sale_price
						let discount_price = res.data.discount_price === res.data.discount_price_max ? res.data.discount_price : res.data.discount_price + '~' + res.data.discount_price_max	
						if (res.data.activityList.length) {
							let data = res.data.activityList.filter(item => item.mode === 0)
							if (data.length) {
								data = data[0].giftList.map(item => {
									item.checked = false
									item.content = '请选择'
									item.specifications = []
									item.number = 1
									return item
								})
								this.giftInfo = data
							}
							res.data.activityList.forEach(item => {
								if (item.mode === 0) {
									this.activity.is_single = item.is_single
									this.activity.giftList = item.giftList.map(j => j.name)
								}
								if (item.mode === 1) {
									this.activity.fixed = item.mode_act
								}
								if (item.mode === 2) {
									this.activity.proportion = item.mode_act
								}
							})
						}

						if (this.purchased && res.data.productList) {
							this.usableSpecificationList = res.data.productList
						}
						this.isDiscount = res.data.activityList.some(item => item.mode === 2)
						this.commodityInfo = {
							selectedIndex: '',
							id: res.data.id,
							img: res.data.img,
							number: res.data.min_count,
							stock: res.data.stock,
							sale_price: price ? price : res.data.price,
							price: res.data.price,
							original_price: res.data.original_price,
							content,
							priceList: res.data.priceList,
							uid:res.data.uid,
							is_discount: res.data.is_discount,
							discount_price: discount_price,
							ismianyi: res.data.mianyi,
							phone: res.data.phone,
							name: res.data.contact
						}
						console.log('this.commodityInfo',this.commodityInfo);
						if (res.data.recommend_id && res.data.recommend_id.length) {
							this.listJson(res.data.recommend_id)
						}
						this.init()
						this.$forceUpdate()
					}
				})
			},
			onPreviewImage(item) {
				uni.previewImage({
					urls: [this.common.imgUrl(item)],
					success: res => {
						console.log(res, 'res')
					},
					fail: err => {
						console.log(err, 'err')
					}
				})
			},
			ShowCategoryChange() {
				this.isShowCategory = false
				if (this.giftInfo.length && !this.purchased) {
					uni.showToast({
						icon: 'none',
						title: '请选择赠品规格'
					})
					this.isShowGift = true
				}
				if (!this.giftInfo.length && !this.purchased) {
					if (this.mode === 'immediately') {
						this.purchase()
					}
					if (this.mode === 'add') {
						this.addCart()
					}
				}
			},
			getCartList() {
				getCartList().then(res => {
					this.shoppingNumber = res.number
				})
			},

			listJson(id) {
				listJson({
					pages: 1,
					limit: 20,
					query: {
						idList: id
					}
				}).then(res => {
					console.log(res, 'res')
					this.commodityList = res.data.data
				})
			},
			usableGiftListChange(item, index) {
				return this.usableGiftList[index].indexOf(item.name) > -1 ? true : false
			},
			usableSpecificationChange(item, index) {
				return this.usableSpecificationList.length && this.purchased ?
					this.usableSpecificationList[index].indexOf(item.name) > -1 ?
					true :
					false :
					true
			},
			isShowGiftChange() {
				if (this.detail.activityList.length) {
					this.isShowGife = false
					for (let item of this.detail.activityList) {
						if (item.mode === 0) {
							this.isShowGife = true
							for (let i in item.list) {
								if (item.list[i].indexOf(this.commodityInfo.selectedText[i]) == -1) {
									this.isShowGife = false
								}
							}
						}
					}
					// this.isShowGife = this.detail.activityList.filter(item => item.mode === 0)[0].list.some(item =>
					// 	item.index === this.commodityInfo.selectedIndex)
					if (!this.isShowGife) {
						this.selectiveGift = []
					}
				}
			},
			maxNumber() {
				let specificationIndex = this.giftSpecification.map(item => item.index).join('-')
				let stock = this.detail.activityList.filter(item => item.mode === 0)
				stock = stock.length ?
					stock[0].giftList[this.giftIndex].stock_list.list.filter(item => item.index === specificationIndex)[
						0] :
					false
				// let max_number = this.giftInfo[this.giftIndex].max_count * (this.commodityInfo.number / this.detail
				// 	.min_count)
				let max_number = this.giftInfo[this.giftIndex].max_count
				return stock ? (stock.stock > max_number ? max_number : stock.stock) : 0
				// return 6
			},
			commnentList() {
				commnentList({
					id: this.id,
					page: 1,
					limit: 3
				}).then(res => {
					if (res.code === 0) {
						this.commentList = res.data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			close() {
				let data = []
				this.giftInfo.filter(item => {
					if (item.checked) {
						data.push({
							product_id: item.id,
							number: item.number,
							name: item.name,
							specifications: item.specifications,
							img: item.img
						})
					}
				})
				let value = data.every(item => item.specifications.length)
				if (!value) {
					uni.showToast({
						icon: 'none',
						title: '请选择赠品规格'
					})
					this.giftStatus = false
					return
				}
				let test = this.giftInfo
					.filter(item => item.checked)
					.map(item => item.name)
					.join('/')
				this.giftText = test.length ? '已选：' + test : '请选择'
				this.giftStatus = true
				this.selectiveGift = data
			},
			giftCategory(item, index) {
				if (!item.checked) {
					uni.showToast({
						icon: 'none',
						title: '请先选中该赠品'
					})
					return
				}
				this.giftStockList = item.stock_list
				this.usableGiftList = item.list
				this.isShowGiftCategory = true
				if (this.giftIndex !== index) {
					this.giftSpecification = []
				}
				this.giftIndex = index
			},
			pitchOn(e) {
				if (this.activity.is_single === 0) {
					this.giftInfo.map(item => {
						if (item.id === e.name) {
							if (!e.value) {
								item.content = '请选择'
								item.specifications = []
							}
							item.checked = e.value
						}
						return item
					})
				} else {
					this.giftInfo.map(item => {
						if (item.id === e.name) {
							if (!e.value) {
								item.content = '请选择'
								item.specifications = []
							}
							item.checked = e.value
						} else {
							item.content = '请选择'
							item.specifications = []
							item.checked = false
						}
						return item
					})
				}
				this.$forceUpdate()
			},
			showGift() {
				if (this.commodityInfo.content === '请选择 规格/颜色') {
					uni.showToast({
						icon: 'none',
						title: '请先选择商品规格'
					})
					return
				}
				this.isShowGift = true
			},
			addCartChange() {
				this.isShowGift = false
				if (this.mode === 'add') {
					this.close()
					this.addCart()
				} else {
					this.close()
					this.purchase()
				}
			},
			addCart() {
				this.mode = 'add'
				let gift = []
				console.log(this.selectiveGift, 'selectiveGift')
				if (this.selectiveGift.length) {
					this.selectiveGift.forEach(item => {
						gift.push({
							product_id: item.product_id,
							number: item.number,
							specifications: item.specifications,
							img: item.img
						})
					})
				}
				let data = {
					product_id: this.id,
					number: this.commodityInfo.number,
					specifications: this.commodityInfo.selectedText,
					gift,
					type: 0
				}
				if (!this.commodityInfo.selectedIndex && this.detail.stock_list.type.length !== 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择商品属性'
					})
					this.isShowCategory = true
					return
				}
				// console.log(this.giftInfo,!data.gift.length, !this.giftStatus)
				if (!data.gift.length && this.giftInfo.length) {
					uni.showToast({
						icon: 'none',
						title: '请选择赠品'
					})

					this.isShowGift = true
					return
				}
				// console.log(data,'data')
				// return
				addCart(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							icon: 'none',
							title: '添加成功',
							duration: 2000
						})
						this.getCartList()
						this.isShowCategory = false
					} else {
						uni.showToast({
							icon: 'none',
							title: '添加失败：' + res.msg,
							duration: 2000
						})
						this.isShowCategory = false
					}
				})
			},
			skip(url) {
				uni.navigateTo({
					url
				})
			},
			homeSkip(url) {
				uni.switchTab({
					url
				})
			},
			commentLink() {
				uni.navigateTo({
					url: '/pagesShop/commodity/commentList?id=' + this.id
				})
			},
			numberChange(e) {
				this.commodityInfo.number = e.value
			},
			gifeChange(index, idx, item) {
				this.giftSpecification[index] = {
					index: idx,
					name: item.name
				}
				if (this.giftSpecification.length === this.giftInfo[this.giftIndex].stock_list.type.length) {
					this.giftInfo[this.giftIndex].content =
						'已选：' + this.giftSpecification.map(item => item.name).join('/')
					this.giftInfo[this.giftIndex].specifications = this.giftSpecification.map(item => item.name)
				}
				this.$forceUpdate()
			},
			commodityChange(index, idx, item) {
				this.specification[index] = {
					index: idx,
					name: item.name
				}
				this.commodityInfo.number = this.detail.min_count
				if (index === 0 && item.img) {
					this.commodityInfo.img = item.img
				}

				if (this.specification.length === this.detail.stock_list.type.length) {
					this.commodityInfo.selectedIndex = this.specification.map(item => item.index).join('-')
					let value = this.detail.stock_list.list.find(item => item.index === this.commodityInfo.selectedIndex)
					this.commodityInfo.content = '已选：' + this.specification.map(item => item.name).join('/')
					this.commodityInfo.price = value.price
					this.commodityInfo.sale_price = value.sale_price ? value.sale_price : value.price
					this.commodityInfo.stock = value.stock
					this.commodityInfo.original_price = value.original_price
					this.commodityInfo.serialNumber = value.number
					this.commodityInfo.selectedText = this.specification.map(item => item.name)
				}
				this.isShowGiftChange()
				this.$forceUpdate()
			},
			addPurchasedList() {
				if (!this.commodityInfo.selectedIndex && this.detail.stock_list.type.length !== 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择商品属性'
					})
					this.isShowCategory = true
					return
				}
				this.isShowCategory = false
				let name = []
				this.commodityInfo.selectedText.forEach(item =>
					name.push({
						name: item
					})
				)
				console.log(this.detail, 'this.detail')
				let data = [{
					product_id: this.detail.id,
					number: this.commodityInfo.number,
					product: {
						activityList: this.detail.activityList,
						img: this.detail.img,
						name: this.detail.name,
						min_count: this.detail.min_count,
						postage: this.detail.postage
					},
					gift: this.selectiveGift,
					specificationsStatus: {
						img: this.commodityInfo.img,
						name,
						price: this.commodityInfo.price
					}
				}]

				let addPurchasedList = this.purchasedList
				if (this.purchasedList.length) {
					this.purchasedList.forEach((item, index) => {
						if (item.product_id === this.detail.id) {
							addPurchasedList.splice(index, 1, data[0])
						}
					})
					let flag = addPurchasedList.every(item => item.product_id !== this.detail.id)
					if (flag) {
						addPurchasedList = addPurchasedList.concat(data)
					}
				} else {
					addPurchasedList = data
				}
				this.$store.commit('addPurchasedList', addPurchasedList)
				uni.navigateBack()
			},
			purchase(mianyi) {
				if(mianyi==1){
					this.showphone = true
					
					return
				}
				this.mode = 'immediately'
				if (!this.commodityInfo.selectedIndex && this.detail.stock_list.type.length !== 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择商品属性'
					})
					this.isShowCategory = true
					return
				}
				this.isShowCategory = false
				let name = []
				this.commodityInfo.selectedText.forEach(item =>
					name.push({
						name: item
					})
				)
				let data = [{
					org: {
						oid: this.detail.org.id,
						name: this.detail.org.name
					},
					product_id: this.detail.id,
					number: this.commodityInfo.number,
					product: {
						activityList: this.detail.activityList,
						img: this.detail.img,
						name: this.detail.name,
						min_count: this.detail.min_count,
						postage: this.detail.postage
					},
					gift: this.selectiveGift,
					specificationsStatus: {
						img: this.commodityInfo.img,
						name,
						price: this.commodityInfo.price
					},
					specifications: name.map(
						(item) => item.name
					),
				}]
				this.$store.commit('purchaseInfo', data)
				this.$store.commit('isSeparate', true)
				uni.navigateTo({
					url: '/pagesShop/order/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .footer .u-image {
		margin: 0 auto;
	}
	
	.phonecs {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 40rpx;
		}
	
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

	.shareBox {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.shareBoxRight {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 35rpx;
				height: auto;
				margin-bottom: 6rpx;
			}

			font-size: 24rpx;
			color: #999;
		}
	}

	@import '@/pagesShop/scss/commodityDetail.scss';
</style>