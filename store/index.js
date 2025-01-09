//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// import createPersistedState from 'vuex-persistedstate'
const store = new Vuex.Store({ //全局变量定义
	state: {
		number: 0,
		price: 0,
		orderIdList: [],
		purchaseInfo: [],//结算信息
		addPurchasedList:[],//加购信息
		discountCoupon: {},//优惠券信息
		postageCoupon: {},//邮费券信息
		filterCoupon: {},//优惠券筛选信息
		isSeparate: false,//是否立即购买
		isIPhoneX: false,
		isLogin: false,
		purchasedSource: '',
		showshare:false,
		username:'',
		peopletype:'',
		page:'',
		orgName:'',
		code:"",
		coupon:'',
		decrypt:'',
	},
	mutations: {
		changecode(state, option){
			state.code=option
		},
		purchasedSource(state, option){
			state.purchasedSource = option
		},
		isLogin(state, option){
			state.isLogin = option
		},
		commodity(state, option) {
			state.number = option.number
			state.price = option.price
		},
		orderIdList(state, option) {
			state.orderIdList = option
		},
		purchaseInfo(state, option) {
			state.purchaseInfo = option
		},
		addPurchasedList(state, option) {
			if(!option.length){
				state.addPurchasedList = option
				return
			}
			state.discountCoupon = {}
			state.postageCoupon = {}
			state.filterCoupon = {}
			state.addPurchasedList = option
		},
		discountCoupon(state, option) {
			state.discountCoupon = option
		},
		postageCoupon(state, option) {
			state.postageCoupon = option
		},
		filterCoupon(state, option) {
			state.filterCoupon = option
		},
		isSeparate(state, option) {
			console.log(option,'option')
			state.isSeparate = option
		},
		isIPhoneX(state, option) {
			state.isIPhoneX = option
		},
		changeusername(state,option){
			state.username=option
		},
		// 课程
		changetype(state,option){
			state.peopletype=option
		},
		changepage(state,option){
			state.page=option
		},
		changeOrgName(state,option){
			state.orgName=option
		},
		changeCoupon(state,option){
			state.coupon=option.coupon
			state.decrypt=option.decrypt
		}
	},
	// plugins: [createPersistedState()]
})
export default store
