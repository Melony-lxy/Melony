<template>
	<view class="main">
		<view class="SelfPickupBox" :style="{margin:is_pickup?'14rpx 0 0' : '14rpx 0'}">
			<view class="">
				是否自提商品
			</view>
			<u-checkbox v-model="is_pickup" style="display: inline-block;" active-color="#2f6bdd" size="35"
				shape="circle"></u-checkbox>
		</view>
		<view class="top whiteBg addressbox" v-if="!is_pickup">
			<view class="flex a-center j-between address" @click="skip()">
				<view v-if="address.length !== 0">
					<view class="flex a-center">
						<view class="default size22" v-if="address.is_default === '1'">
							默认
						</view>
						<view class="color666">
							{{ address.province }}
							{{ address.city === "市辖区" ? "" : address.city }}
							{{ address.district }}
						</view>
					</view>
					<view class="size34 detailedAddress fontWight">
						{{ address.details }}
					</view>
					<view class="flex fontWight">
						<view class="name"> {{ address.name }} </view>
						<view class="phone"> {{ address.phone }} </view>
					</view>
				</view>
				<view class="" v-else> 请选择地址 </view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="PaymentOrder_box">
			<view style="height: 1rpx;">

			</view>
			<view v-for="(row, idx) in purchaseInfo" :key="idx" class="PaymentOrder">
				<view class="storename">
					{{row.name}}
				</view>
				<view class="flex j-between a-center whiteBg purchasedItem" v-if="row.isAdditionalPurchase"
					@click="purchased(idx)">
					<view class="tips3 size26" style="text-align: center; width: 200rpx">
						享低价加购
					</view>
					<view class="themeColor center size26">
						去加购<u-icon name="arrow-right" color="#2f6bdd" size="28"></u-icon>
					</view>
				</view>
				<view class="flex j-between a-center whiteBg purchasedItem" v-if="row.total.isFullGift"
					@click="fullGift(idx)">
					<view class="tips3 size26"> 享满{{ row.total.modeAct }}赠品 </view>
					<view class="themeColor center size26">
						{{ row.fullGiftList.length > 0 ? "已添加" : "选赠品" }}
						<u-icon name="arrow-right" color="#2f6bdd" size="28"></u-icon>
					</view>
				</view>
				<view class="content">
					<view class="commodityInfo whiteBg" v-for="(item, index) in row.list" :key="index"
						@click="skip(!isSeparate ? item.product.id : item.product_id)">
						<view class="flex j-between">
							<u-image class="img" width="160rpx" height="160rpx" :src="common.imgUrl(item.product.img)">
							</u-image>
							<view class="flex flex-column j-between title">
								<view class="fontWight ellipsis2"> {{ item.product.name }} </view>
								<view class="size24 color999 ellipsis2 describe">
									{{ specificationsStatus(item) }}
								</view>
							</view>
							<view class="flex1">
								<view class="size32 themeColor flex j-end">￥{{ item.specificationsStatus.price }}</view>
								<view class="size24 flex j-end color666"> x{{ item.number }} </view>
							</view>
						</view>
						<view class="giftItem" v-if="item.gift.length">赠品</view>
						<view class="flex j-between giftItem" v-for="(j, i) in item.gift" :key="i">
							<u-image class="img" width="160rpx" height="160rpx" :src="common.imgUrl(j.img)">
							</u-image>
							<view class="flex flex-column j-between title">
								<view class="fontWight ellipsis2"> {{ j.name }} </view>
								<view class="size24 color999 ellipsis2 describe">
									{{ j.specifications.join("/") }}
								</view>
							</view>
							<view class="flex1">
								<view class="size24 flex j-end color666">
									x{{ j.number * (item.number / item.product.min_count) }}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="content continueShopping whiteBg" v-if="row.additionalPurchaseList.length">
					<view class="size28 fontWight title"> 加购商品 </view>
					<view class="commodityInfo whiteBg" v-for="(item, index) in row.additionalPurchaseList" :key="index"
						@click="skip(item.product_id)">
						<view class="flex j-between">
							<u-image class="img" width="160rpx" height="160rpx" :src="common.imgUrl(item.product.img)">
							</u-image>
							<view class="flex flex-column j-between title">
								<view class="fontWight ellipsis2"> {{ item.product.name }} </view>
								<view class="size24 color999 ellipsis2 describe">
									{{ specificationsStatus(item) }}
								</view>
							</view>
							<view class="flex1">
								<view class="size32 themeColor flex j-end">￥{{ item.specificationsStatus.price }}</view>
								<view class="size24 flex j-end color666"> x{{ item.number }} </view>
							</view>
						</view>
					</view>
				</view>
				<view class="content continueShopping whiteBg" v-if="row.fullGiftList.length">
					<view class="size28 fontWight title"> 满赠商品 </view>
					<view class="commodityInfo whiteBg" v-for="(item, index) in row.fullGiftList" :key="index"
						@click="skip(item.product_id)">
						<view class="flex j-between">
							<u-image class="img" width="160rpx" height="160rpx" :src="common.imgUrl(item.product.img)">
							</u-image>
							<view class="flex flex-column j-between title">
								<view class="fontWight ellipsis2"> {{ item.product.name }} </view>
								<view class="size24 color999 ellipsis2 describe">
									{{ specificationsStatus(item) }}
								</view>
							</view>
							<view class="flex1">
								<view class="size24 flex j-end color666"> x{{ item.number }} </view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex flex-column j-around orderInfo ">
					<view class="flex j-between orderItem orderremarks" v-if='!is_pickup'>
						<view class="fontWight lable"> 配送方式 </view>
						<view class="flex1 flex j-end">
							<view class="color999 tips1">普通快递 -
								{{ (row.total.postage * 100 + row.total.postage_amount *100) > 0 ? '￥' + ((row.total.postage * 100 + row.total.postage_amount *100) / 100 ).toFixed(2) : '免邮' }}
							</view>
						</view>
					</view>
					<!-- <view class="flex j-between">
					<view class="fontWight">
						开具发票
					</view>
					<view class="color999">
						本次不开具发票
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view> -->
					<view class="flex j-between a-center orderItem orderremarks">
						<view class="fontWight"> 订单备注 </view>
						<view class="remarks">
							<u-input v-model="row.remarks" placeholder="选填 请和商家协调一致" />
						</view>
					</view>
				</view>

				<view class="flex j-between a-center whiteBg purchasedItem" @click="discounts('coupon',idx)">
					<view class="poupon"> 优惠券 </view>
					<view class="themeColor center">
						{{
			  row.couponInfo && row.couponInfo.name
			    ? row.couponInfo.name + "-￥" + row.couponInfo.price
			    : "会员优惠"
			}}

						<u-icon name="arrow-right" color="#2f6bdd" size="28"></u-icon>
					</view>
				</view>
				<view class="flex j-between a-center whiteBg purchasedItem" @click="discounts('postage',idx)"
					v-if="row.total.postage || row.total.postage_amount">
					<view class="poupon"> 邮费券 </view>
					<view class="themeColor center">
						{{ row.postageInfo && row.postageInfo.name ? row.postageInfo.name + "-￥" + row.postageInfo.price : "会员优惠" }}
						<u-icon name="arrow-right" color="#2f6bdd" size="28"></u-icon>
					</view>
				</view>
				<view class="flex j-end totalPrice">
					<view class=""> 合计： </view>
					<view class="themeColor size32 fontWight">
						￥{{ row.total.total_price.toFixed(2) }}
						<!-- {{ (item.specificationsStatus.price * item.number).toFixed(2) }} -->
					</view>
				</view>
			</view>
			<view style="height: 1rpx;">

			</view>
		</view>
		<view class="PaymentDetailed">
			<view class="PaymentDetailed_title">
				价格明细
			</view>
			<view class="flex-between">
				<view class="">
					商品总价
				</view>
				<view class="">
					￥{{productTotal}}
				</view>
			</view>
			<view class="flex-between">
				<view class="">
					邮费
				</view>
				<view class="">
					￥{{postage}}
				</view>
			</view>
			<view class="flex-between">
				<view class="">
					优惠
				</view>
				<view class="orange">
					￥{{discount_amount}}
				</view>
			</view>
			<view class="flex-between">
				<view class="">
					合计
				</view>
				<view class="">
					￥{{ordertotal}}
				</view>
			</view>
		</view>

		<!-- <view class="creditPoints flex j-between whiteBg" v-if="integralInfo.max > 0 && integralInfo.proportion > 0 && integralInfo
						.integral > 0">
			<view class="flex">
				<u-icon name="red-packet-fill" color="#2f6bdd" size="35"></u-icon>
				<view class="deduction">
					{{ integralText }}
				</view>
			</view>
			<u-checkbox @change="creditPoints" v-model="isIntegral" active-color="#2f6bdd" shape="circle" />
		</view> -->
		<view class="flex j-between whiteBg payment">
			<view class="paymentText">支付方式</view>
			<view v-for="(item,index) in paymentList" :key='index' class="flex u-f-ac paymentItem"
				@click="() => payment = index">
				<image :style="item.styles" :src="common.imgUrl(item.img)" mode=""></image>
				<view class="paymentName flex-shrink">{{item.name}}</view>
				<view class="quan flex-center" :style="payment==index?'background: #2f6bdd;':''">
					<u-icon name="checkbox-mark" color="#ffffff" size="28"></u-icon>
				</view>
			</view>
		</view>
		<view class="footer whiteBg flex j-between a-center">
			<view class="money_box">
				<view class="flex a-center size24">
					<view class="leftBox moneysize"> 总计： </view>
					<text class="rightBox themeColor fontWight size36">
						￥{{ ordertotal }}
					</text>
				</view>
				<!-- 				<view class="flex a-center size24">
					<view class="leftBox"> 邮费： </view>
					<view class="rightBox themeColor size36">
						￥{{ postage }}
					</view>
				</view>
				<view class="flex a-center color999 size22">
					<view class="leftBox"> 总共优惠： </view>
					<view class="rightBox"> ￥{{ discount_amount }} </view>
				</view> -->
			</view>
			<view class="pay" @click="goPay" v-if="isios">提交订单</view>
		</view>

		<!-- 赠品 -->
		<u-popup v-model="isShowGift" mode="bottom" :safe-area-inset-bottom="true" height="900rpx" :closeable="true"
			@close="close">
			<view class="categoryList">
				<view class="center giftTips">
					请选择赠品。 ({{ isSingle === 0 ? "多选" : "单选" }})</view>
				<view class="flex a-center" v-for="(item, index) in giftInfo" :key="index"
					@click="giftCategory(item, index)">
					<view>
						<u-checkbox :name="item.id" @change="pitchOn" active-color="#2f6bdd" v-model="item.checked"
							size="35rpx" shape="circle">
						</u-checkbox>
					</view>

					<!-- <u-image class="img" width="154rpx" height="154rpx" :src="common.imgUrl(item.product.img)">
							</u-image> -->
					<view class="popupItem">
						<view class="fontWight lable">
							{{ item.name }}
						</view>
						<view class="color999 categoryType ellipsis1">
							{{ item.content }}
						</view>
					</view>
				</view>
			</view>
			<view class="whiteBg bottom">
				<view class="submit center size32" @click="addCartChange">确定</view>
			</view>
		</u-popup>
		<!-- 赠品规格 -->
		<u-popup v-model="isShowGiftCategory" mode="bottom" :safe-area-inset-bottom="true" height="900rpx"
			:closeable="true" @close="isShowGiftCategoryClose">
			<view class="categoryList" v-if="giftInfo.length">
				<view class="list" v-for="(item, index) in giftStockList.type" :key="index">
					<view class="lable">
						{{ item.name }}
					</view>
					<view class="flex a-center">
						<view class="categoryType" :class="
                giftSpecification[index] &&
                giftSpecification[index].index === idx
                  ? 'active'
                  : ''
              " @click="gifeChange(index, idx, j)" v-for="(j, idx) in item.list" :key="idx"
							v-if="usableGiftListChange(j, index)">
							<view class="flex a-center">
								<view class="" v-if="j.img">
									<u-image class="typeImg" width="52rpx" height="52rpx" :src="common.imgUrl(j.img)">
									</u-image>
								</view>
								<view class="size26 content" style="margin: 5px 14px">
									{{ j.name }}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex a-center j-between">
					<view class=""> 数量 </view>
					<view class="flex a-center">
						<u-number-box :min="1" :max="giftInfo[giftIndex].max_count" :disabled-input="true"
							v-model="giftInfo[giftIndex].number">
						</u-number-box>
					</view>
				</view>
			</view>
			<view class="whiteBg bottom">
				<view class="submit center size32" @click="isShowGiftCategoryChange">提交</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		orderAdd,
		getIntegral,
		WxPayOrder,
		orderFee,
		AliPayOrder,
	} from "@/plugin/api/order.js";
	import {
		getDetail
	} from "@/plugin/api/personal.js";
	import {
		getCartList
	} from "@/plugin/api/product.js";
	const PAYMENT = {
		WECHAT: 0x1,
		WECHAT_CH: "微信",
		ALIPAY: 0x2,
		ALIPAY_CH: "支付宝",
	};
	export default {
		components: {},
		data() {
			return {
				isios: false,
				productTotal: 0,
				ordertotal: 0,
				orderId: 0,
				isShowGift: false,
				isSingle: 0,
				giftInfo: [],
				giftSpecification: [],
				giftIndex: 0,
				giftStockList: [],
				usableGiftList: [],
				isShowGiftCategory: false,
				integralInfo: {},
				isSeparate: false,
				purchaseInfo: [],
				idx: -1,
				addressId: 0,
				idList: [],
				address: [],
				isIntegral: false,
				integralText: "",
				discount_amount: "",
				postage: 0,
				is_pickup: false,
				paymentList: [{
						id: PAYMENT.WECHAT,
						img: "/static/wechat.png",
						name: PAYMENT.WECHAT_CH,
						styles: "width:30rpx;height:30rpx",
					},
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
				],
				payment: 0,
			};
		},
		onLoad(options) {
			uni.showLoading({
				title: "加载中",
			});
			if (options.id) {
				this.addressId = options.id;
			}
			this.paymentList = [{
				id: PAYMENT.WECHAT,
				img: "/static/wechat.png",
				name: PAYMENT.WECHAT_CH,
				styles: "width:30rpx;height:30rpx",
			}]
			// #ifdef H5
			// let ua = window.navigator.userAgent.toLowerCase();
			// if (ua.match(/MicroMessenger/i) != "micromessenger") {
			// 	this.paymentList.push({
			// 		id: PAYMENT.ALIPAY,
			// 		img: "/static/zfb.png",
			// 		name: PAYMENT.ALIPAY_CH,
			// 		styles: "width:30rpx;height:30rpx",
			// 	})
			// }
			// #endif
			this.isSeparate = this.$store.state.isSeparate;
			this.idList = this.$store.state.orderIdList;
			this.getIntegral();
			this.purchaseInfoData();
			this.purchasedData();
			this.getAddress();
			this.postageData();
			this.discountsData();
		},
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					if (res.platform == 'ios') {
						this.$axios({
							url: this.$url[103]
						}).then(res => {
							this.isios = res.data
						})
					} else {
						this.isios = true
					}
				}
			})
		},
		methods: {
			// 订单金额
			orderFeeChange() {

				let data = {
					productList: this.purchaseInfo,
				};
				orderFee(data).then((res) => {
					if (res.code == 0) {
						res.data.forEach(item => {
							this.purchaseInfo.forEach((v, i) => {
								if (v.oid == item.oid) {
									if (!item.total.isFullGift) {
										this.purchaseInfo[i].fullGiftList = [];
									}
									this.purchaseInfo[i].total = item.total
								}
							})
						})
					}
					let price = 0
					let postagetotal = 0
					let discount_amount = 0
					let productTotal = 0;
					this.purchaseInfo.forEach(item => {
						price += item.total.total_price * 100
						productTotal += item.total.price * 100
						postagetotal += item.total.postage * 100
						discount_amount +=
							item.total.coupons_amount * 100 +
							item.total.postage_amount * 100;
					})
					this.postage = postagetotal / 100
					this.ordertotal = price / 100
					this.productTotal = productTotal / 100
					this.discount_amount = discount_amount / 100;
					if (this.integralInfo.max > 0 && this.integralInfo.proportion > 0 && this.integralInfo
						.integral > 0) {
						const max = parseInt(price * this.integralInfo.max / 100 / 100)
						let deductible = parseInt(this.integralInfo.integral / this.integralInfo.proportion)
						deductible = deductible > max ? max : deductible
						this.integralText =
							"现有积分" +
							this.integralInfo.integral +
							",可使用" +
							deductible * this.integralInfo.proportion +
							"积分抵用" +
							+deductible +
							"元";
						if (this.isIntegral) {
							this.ordertotal = (price - deductible * 100) / 100
							this.discount_amount = (discount_amount + deductible * 100) / 100;
						}
					}
				});
			},
			// 拨打电话
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
				});
			},
			// 单个商品价格
			commodityPrice(data) {
				return (
					(data.specificationsStatus.price * 100 * data.number) /
					100
				).toFixed(2);
			},

			//邮费券
			postageData() {
				const postageInfo = this.$store.state.postageCoupon;
				if (postageInfo.id) {
					this.purchaseInfo = this.purchaseInfo.map((v) => {
						if (v.oid === postageInfo.oid) {
							v.postageId = postageInfo.id;
							v.postageInfo = postageInfo
						}
						return v
					})
					this.orderFeeChange();
				}
			},
			//优惠券
			discountsData() {
				const couponInfo = this.$store.state.discountCoupon;
				if (couponInfo.id) {
					this.purchaseInfo = this.purchaseInfo.map((v) => {
						if (v.oid === couponInfo.oid) {
							v.couponsId = couponInfo.id;
							v.couponInfo = couponInfo
						}
						return v
					})
					this.orderFeeChange();
				}
			},

			//初始化订单信息
			purchaseInfoData() {
				let purchaseInfo = [];
				let data = this.$store.state.purchaseInfo
				let indexList = []
				let additionalPurchaseList = []
				let fullGiftList = []
				const purchasedSource = this.$store.state.purchasedSource
				if (purchasedSource) {
					additionalPurchaseList = purchasedSource.additionalPurchaseList
					fullGiftList = purchasedSource.fullGiftList
				}
				this.$store.state.purchaseInfo.forEach((item) => {
					if (indexList[item.org.oid] !== undefined) {
						purchaseInfo[indexList[item.org.oid]].list.push({
							...item,
							remarks: "",
						})
					} else {
						indexList[item.org.oid] = indexList.length
						purchaseInfo.push({
							remarks: '',
							oid: item.org.oid,
							name: item.org.name,
							fullGiftList: fullGiftList[item.org.oid] ? fullGiftList[item.org.oid] : [],
							isAdditionalPurchase: item.isAdditionalPurchase,
							additionalPurchaseList: additionalPurchaseList[item.org.oid] ?
								additionalPurchaseList[item.org.oid] : [],
							couponsId: 0,
							postageId: 0,
							postageInfo: {},
							total: {
								modeAct: 0,
								isSingle: 0,
								isFullGift: false,
								coupons_amount: 0,
								discount_amount: 0,
								postage: 10,
								postage_amount: 0,
								price: 100,
								total_price: 110
							},
							list: [{
								...item,
								remarks: "",
							}]
						})
					}
				});
				this.purchaseInfo = purchaseInfo;
				this.orderFeeChange();
			},
			//加购信息
			purchasedData() {
				const {
					addPurchasedList,
					purchasedSource
				} = this.$store.state
				this.purchaseInfo = this.purchaseInfo.map((v) => {
					if (v.oid === purchasedSource.oid) {
						v.additionalPurchaseList = []
						addPurchasedList.forEach((item) => {
							v.additionalPurchaseList.push({
								product: item.product,
								product_id: item.product_id,
								specificationsStatus: item.specificationsStatus,
								specifications: item.specificationsStatus.name.map(
									(item) => item.name
								),
								id: item.id ? item.id : 0,
								number: item.number,
							});
						});
					}
					return v
				})
				this.orderFeeChange();
			},
			// 选择邮费券
			discounts(type, idx) {
				let data = {};
				const detail = this.purchaseInfo[idx]
				if (type === "postage") {
					data = {
						isPostage: true,
						oid: detail.oid
					};
				} else {
					let product = [];
					detail.list.forEach((item) => {
						let specifications = item.specificationsStatus.name.map(
							(j) => j.name
						);
						product.push({
							id: item.id ? item.product.id : item.product_id,
							specifications,
						});
					});
					detail.additionalPurchaseList.forEach((item) => {
						let specifications = item.specificationsStatus.name.map(
							(j) => j.name
						);
						product.push({
							id: item.product_id || item.id,
							specifications,
						});
					});
					data = {
						product,
						isPostage: false,
						price: detail.total.total_price,
						oid: detail.oid
					};
				}
				this.$store.commit("filterCoupon", data);
				let additionalPurchaseList = [];
				let fullGiftList = [];
				this.purchaseInfo.forEach((rect) => {
					additionalPurchaseList[rect.oid] = rect.additionalPurchaseList;
					fullGiftList[rect.oid] = rect.fullGiftList
				});
				this.$store.commit("purchasedSource", {
					oid: detail.oid,
					type: "order",
					additionalPurchaseList,
					fullGiftList
				});
				uni.navigateTo({
					url: "/pagesShop/members/discountCoupon?use=true",
				});
			},
			// 加购跳转
			purchased(idx) {
				let additionalPurchaseList = [];
				let fullGiftList = [];
				this.purchaseInfo.forEach((rect) => {
					additionalPurchaseList[rect.oid] = rect.additionalPurchaseList;
					fullGiftList[rect.oid] = rect.fullGiftList
				});
				const detail = this.purchaseInfo[idx]
				this.$store.commit("addPurchasedList", detail.additionalPurchaseList);
				this.$store.commit("purchasedSource", {
					oid: detail.oid,
					type: "order",
					additionalPurchaseList,
					fullGiftList
				});
				uni.navigateTo({
					url: "/pagesShop/order/purchased",
				});
			},
			// 满赠
			fullGift(idx) {
				this.idx = idx
				const detail = this.purchaseInfo[idx]
				let fullGiftList = [];
				detail.fullGiftList.forEach((rect) => {
					fullGiftList[rect.product_id] = rect;
				});
				this.giftInfo = detail.total.fullGiftList
				this.giftInfo.map((item) => {
					item.content = "请选择";
					item.specifications = [];
					item.checked = false;
					item.number = 1
					if (fullGiftList[item.id]) {
						item.content =
							"已选：" + this.specificationsStatus(fullGiftList[item.id]);
						item.specifications = fullGiftList[
							item.id
						].specificationsStatus.name.map((item) => item.name);
						item.checked = true;
						item.number = fullGiftList[item.id].number
					}
					return item;
				});
				this.isShowGift = true;
			},
			close() {
				this.isShowGift = false;
			},
			addCartChange() {
				let fullGiftList = [];
				this.purchaseInfo[this.idx].fullGiftList.forEach((rect) => {
					fullGiftList[rect.product_id] = rect;
				});
				this.purchaseInfo[this.idx].fullGiftList = [];
				this.giftInfo.forEach((item) => {
					if (item.checked && item.specifications.length > 0) {
						let specificationsStatus = [];
						item.specifications.forEach((v, k) => {
							specificationsStatus.push({
								type: item.stock_list.type[k].name,
								name: v,
							});
						});
						this.purchaseInfo[this.idx].fullGiftList.push({
							product: {
								img: item.img,
								name: item.name,
							},
							product_id: item.id,
							specificationsStatus: {
								name: specificationsStatus,
							},
							specifications: specificationsStatus.map(
								(item) => item.name
							),
							number: item.number,
							remarks: fullGiftList[item.id] ? fullGiftList[item.id].remarks : "",
						});
					}
				});
				this.isShowGift = false;
			},
			pitchOn(e) {
				this.giftInfo.map((item) => {
					if (item.id === e.name) {
						if (!e.value) {
							item.content = "请选择";
							item.specifications = [];
						}
						item.checked = e.value;
					}
					return item;
				});
				this.$forceUpdate();
			},
			giftCategory(item, index) {
				if (!item.checked) {
					uni.showToast({
						icon: "none",
						title: "请先选中该赠品",
					});
					return;
				}
				this.giftStockList = item.stock_list;
				this.usableGiftList = item.list;
				this.isShowGiftCategory = true;
				this.giftSpecification = [];
				this.giftStockList.type.map((item, idx) => {
					this.giftSpecification.push({
						index: 0,
						name: item.list[0].name,
					});
				});
				this.giftIndex = index;
			},
			gifeChange(index, idx, item) {
				this.giftSpecification[index] = {
					index: idx,
					name: item.name,
				};
				this.$forceUpdate();
			},
			isShowGiftCategoryChange() {
				if (
					this.giftSpecification.length ===
					this.giftInfo[this.giftIndex].stock_list.type.length
				) {
					this.giftInfo[this.giftIndex].content =
						"已选：" + this.giftSpecification.map((item) => item.name).join("/");
					this.giftInfo[this.giftIndex].specifications =
						this.giftSpecification.map((item) => item.name);
					this.giftInfo[this.giftIndex].checked = true;
				} else {
					this.giftInfo[this.giftIndex].content = "请选择";
					this.giftInfo[this.giftIndex].specifications = [];
					this.giftInfo[this.giftIndex].checked = false;
				}
				if (this.isSingle === 1) {
					this.giftInfo.map((item) => {
						if (this.giftInfo[this.giftIndex].id !== item.id) {
							item.content = "请选择";
							item.specifications = [];
							item.checked = false;
						}
						return item;
					});
				}
				this.isShowGiftCategory = false;
			},
			isShowGiftCategoryClose() {
				this.giftInfo.map((item) => {
					if (item.specifications.length === 0) {
						item.checked = false;
					}
					return item;
				});
				this.isShowGiftCategory = false;
			},
			usableGiftListChange(item, index) {
				return this.usableGiftList[index].indexOf(item.name) > -1 ? true : false;
			},
			// 积分信息
			getIntegral() {
				getIntegral().then((res) => {
					if (res.code === 0) {
						this.isAdditionalPurchase = res.data.isAdditionalPurchase;
						this.integralInfo = {
							integral: res.data.integral,
							max: res.data.max,
							proportion: res.data.proportion,
						};
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg,
						});
					}
				});
			},
			// 商品规格
			specificationsStatus(item) {
				return item.specificationsStatus.name.map((item) => item.name).join("/");
			},
			skip(id) {
				console.log(id, "id");
				if (id) {
					uni.navigateTo({
						url: "/pagesShop/commodity/detail?id=" + id + "&forbid=true",
					});
				} else {
					uni.redirectTo({
						url: "/pagesShop/address/index?mode=change",
					});
				}
			},
			// 收货地址
			getAddress() {
				getDetail({
					id: this.addressId,
				}).then((res) => {
					uni.hideLoading();
					if (res.data.id) {
						this.address = res.data;
						this.addressId = res.data.id;
					}
				});
			},
			// 支付
			goPay() {
				uni.showLoading({
					title: "加载中",
				});
				if (this.orderId > 0) {
					this.payOrder();
					uni.hideLoading();
					return;
				}
				if (!this.is_pickup) {
					if (!this.addressId) {
						uni.showToast({
							icon: "none",
							title: "请选择地址",
						});
						uni.hideLoading();
						return;
					}
				}
				let data = {}
				if (this.is_pickup) {
					data = {
						productList: this.purchaseInfo,
						is_pickup: this.is_pickup,
						isIntegral: this.isIntegral,
					};
				} else {
					data = {
						productList: this.purchaseInfo,
						addressId: this.addressId,
						isIntegral: this.isIntegral,
					}

				};
				orderAdd(data)
					.then((res) => {
						uni.hideLoading();
						if (res.code === 0) {
							this.$store.commit("filterCoupon", {});
							this.$store.commit("postageCoupon", {});
							this.$store.commit("addPurchasedList", []);
							this.$store.commit("discountCoupon", {});
							this.orderId = res.data.id;
							this.payOrder();
						} else {
							uni.showToast({
								icon: "error",
								title: res.msg,
							});
						}
					})
					.catch(() => {
						uni.hideLoading();
					});
			},
			payOrder() {
				uni.showLoading({
					title: "加载中",
				});
				const payment = this.paymentList[this.payment].id;
				if (payment === PAYMENT.WECHAT) {
					let status = 0;
					// #ifdef H5
					let ua = window.navigator.userAgent.toLowerCase();
					if (ua.match(/MicroMessenger/i) == "micromessenger") {
						status = 1;
					} else {
						status = 2;
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
						icon: "none",
						title: "暂时只支付h5和微信小程序支付！",
					});
					uni.hideLoading();
					// #endif
					WxPayOrder({
						id: this.orderId,
						status,
						openId: uni.getStorageSync("openId"),
					}).then((res) => {
						uni.hideLoading();
						if (res.code === 0) {
							if (status === 2) {
								window.location.href = res.data.url;
							} else {
								this.common
									.payment(res.data)
									.then((res) => {
										if (res.code === 0) {
											this.paymentSuccess()
										}
									})
									.catch((err) => {});
							}
						}
					}).catch(() => {
						uni.hideLoading();
					})
				} else if (payment === PAYMENT.ALIPAY) {
					AliPayOrder({
						id: this.orderId,
					}).then((res) => {
						uni.hideLoading();
						document.querySelector('body').innerHTML = res.data.resp;
						document.forms[0].submit()
					}).catch(() => {
						uni.hideLoading();
					})
				} else {
					uni.hideLoading();
				}
			},
			paymentSuccess() {
				uni.showModal({
					title: "提示",
					content: "支付成功",
					showCancel: false,
					confirmText: "关闭",
					success: function(res) {
						uni.switchTab({
							url: '/pages/my/my'
						})
					},
				});
			},
			// 购物车角标
			getCartList() {
				getCartList().then((res) => {
					if (res.data.length) {
						uni.setTabBarBadge({
							index: 2,
							text: res.number
						});
					} else {
						uni.removeTabBarBadge({
							index: 2,
						});
					}
				});
			},
			// 是否抵扣积分
			creditPoints(e) {
				this.isIntegral = e.value;
				this.orderFeeChange();
			},
		},
	};
</script>

<style scoped lang="scss">
	@import "@/pagesShop/scss/order/index.scss";

	.payment {
		margin: 28rpx auto !important;
		border-radius: 10rpx;
		width: 720rpx;
		background-color: #fff;
		display: block;
	}

	.u-checkbox {
		display: block;
		padding-right: 20rpx;
	}

	.creditPoints {
		margin: 14rpx auto !important;
		border-radius: 10rpx;
		width: 720rpx;
		background-color: #fff;
		padding-top: 30rpx !important;
		padding-bottom: 30rpx !important;
		// padding: 20rpx 0 !important;
	}

	.PaymentDetailed {
		margin: 14rpx auto;
		border-radius: 10rpx;
		width: 720rpx;
		background-color: #fff;

		.PaymentDetailed_title {
			margin: 28rpx;
			padding-top: 28rpx;
			font-weight: bold;
			font-size: 30rpx;
			margin-bottom: 14rpx;
			margin-top: 0;
		}

		.flex-between {
			display: flex;
			justify-content: space-between;
			margin: 0 28rpx;
			padding: 20rpx 0;
		}

		.orange {
			color: #2f6bdd;
		}
	}

	.paymentText {
		margin: 28rpx;
		padding-top: 28rpx;
		font-weight: bold;
		font-size: 30rpx;
		margin-top: 0;
		margin-bottom: 14rpx;
	}

	.main {
		background-color: #FAFAFA;
		padding-bottom: 130rpx;
	}

	.moneysize {
		font-size: 32rpx;
	}

	.quan {
		width: 40rpx;
		height: 40rpx;
		background: #f2f2f2;
		border-radius: 50%;
		border: 1rpx solid $project-color;
	}

	.paymentName {
		font-size: 26rpx;
		font-weight: 400;
		color: #2d2d2d;
		margin-left: 11rpx;
	}

	.paymentItem {
		display: flex;
		justify-content: space-between;
		margin: 0 28rpx;
		padding: 20rpx 0;
	}

	.SelfPickupBox {
		display: flex;
		justify-content: space-between;
		margin: 14rpx 0;
		padding: 24rpx 28rpx;
		box-sizing: border-box;
		background-color: #FFF;
		color: #303133;
		font-size: 28rpx;
		font-weight: bold;

		/deep/ .u-checkbox {
			padding-right: 0 !important;
		}
	}
</style>