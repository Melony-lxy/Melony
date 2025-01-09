<template>
	<view>
		<aliplayer :videoId="videoId" :showvideo="showvideo" />
		<image class="classImg" :src="common.imgUrl(details.img)" mode="aspectFill" @click="seeImg()" v-if="!showvideo">
		</image>
		<view class="detailsBox">
			<view class="nameBox flex u-f-ac">
				<view class="curriculumDetails">
					<view class="statusBox">{{curriculumType[details.type]}}</view>
					<view class="name">{{details.name}}</view>
				</view>
			</view>
			<!-- <view class="classDetails"> -->
			<!-- {{details.introduce}} -->
			<u-read-more :toggle="true" ref="uReadMore">
				<rich-text :nodes="content"></rich-text>
			</u-read-more>
			<!-- </view> -->
			<view class="priceBox" style="margin-top: 20rpx;">
				<view class="flex priceBoxRight introduce">
					<!-- <view class="flex little"> -->
					<view class="flex little">
						<!-- <view class="activityPrice" v-if="details.is_gratis == 0">活动价</view> -->
						<view class="price" v-if="details.is_gratis == 0">￥{{details.price*details.positive_class/100}}
						</view>
						<view class="price" v-else-if="details.is_gratis == 1">免费</view>
					</view>
					<!-- </view> -->
					<view class="originalPrice" v-if="details.market_price">原价￥{{details.market_price/100}}/每节</view>
				</view>
			</view>
			<view style="margin-top: 20rpx;" class="flex priceBoxLeft">
				<view>
					<image :src="common.imgUrl('/static/icon/kj.png')" class="kjIcon" mode=""></image>课节 · {{details.positive_class}}
				</view>
				<view style="margin-left: 8px;" v-if="details.give_class">
					<image :src="common.imgUrl('/static/icon/lw.png')" class="lwIcon" mode=""></image>赠送课程 · {{details.give_class}}
				</view>
			</view>
		</view>
		<view class="tabsBox">
			<u-tabs :list="tablist" :is-scroll="false" :current="current" @change="change" active-color='#FF6638'>
			</u-tabs>
		</view>
		<!-- 课程详情 -->
		<view style="padding-left: 33rpx;padding-right: 33rpx;white-space: pre-line;" v-if="current==pageNum1">
			<nullData v-if="!details.content"></nullData>
			<view
				style="white-space: pre-line;padding-top: 33rpx;line-height:1.5;max-width:100%;font-size:30rpx;white-space: pre-wrap;"
				v-html="common.content(details.content)">
			</view>
		</view>
		<!-- 课程大纲 -->
		<view v-if="current==pageNum2" style="padding-left: 33rpx;padding-right: 33rpx;">
			<uni-collapse v-if="details.chapterSection[0][0]!=undefined">
				<uni-collapse-item v-for="(item,i) in details.chapterSection[0]" :key='i'>
					<template v-slot:title>
						<view class="classtitle" @click="changefree(item)">
							<view>{{item.title}}</view>
							<view class="free " v-if="judge(item)"> 免费试听 </view>
						</view>
					</template>
					<view class="content">
						<view v-for="(cell,index) in item.children" :key='index' class="chapter">
							<view v-if="selectClass==i&&selectPage==index" class="noselect">
								<view class="chapter-first selectcolor">
									<view class='titlecircle'>·</view>{{cell.title}} | 播放中
								</view>
								<view @click="gotop()">
									<image :src="common.imgUrl('/static/images/stop.png')"></image>
								</view>
							</view>
							<view v-else class="noselect" @click="getvideo(cell.videoId,index,i)">
								<view class="chapter-first">
									<view class='titlecircle'>·</view>{{cell.title}}
								</view>
								<view v-if="cell.is_free" class="free"> 免费试听 </view>
								<view v-else-if="details.paymentVideo">
									<image :src="common.imgUrl('/static/images/classplay.png')"></image>
								</view>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
			<nullData v-else></nullData>
		</view>
		<!-- 上课讲师 -->
		<view class="whiteBox" v-if="current==pageNum3">
			<view class="teacherItem" v-for="(item,index) in details.teacher" :key='index'>
				<view class="twoBox flex">
					<image class="img" :src="common.imgUrl(item.user.avatar_url)" mode=""></image>
					<view class="rightBox flex-shrink">
						<view class="teacherName">{{item.user.nick}} <text v-if="item.educational" class="level">
								{{item.educational || '无'}}</text>
						</view>
						<view class="teacherDetail space-between u-f-ac"> 擅长领域：{{item.work_experience || '无'}}
						</view>
					</view>
					<view class="evaluate" @click="consulting1(item)">
						评价
					</view>
				</view>
			</view>
			<nullData v-if="!details.teacher"></nullData>
		</view>
		<!-- 评价 -->
		<u-modal v-model="show1" width="682rpx" title='请填写您对该老师的评价' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able >
			<view  style="padding:30rpx 42rpx 30rpx 42rpx;">
				<textarea v-model="newreMarks" placeholder="请输入你的评价" auto-height />
			</view>
			<view style="padding:30rpx 42rpx 30rpx 42rpx;">
				<view @click="AddNew()"
					style="background:#FF6638;height:63rpx;line-height: 64rpx;color:white;text-align: center;border-radius: 20px;"
					type="success">提交</view>
			</view>
		</u-modal>
		<!-- 推荐课程 -->
		<view style="padding: 0 29rpx;" v-if="current==pageNum4">
			<curriculumItem :dataList='courseList' :isPrice='true'></curriculumItem>
		</view>
		<storeInformation></storeInformation>
		<view style="height: 53px;"></view>
		<view>
			<view class="bottomBox flex space-around u-f-ac">
				<!-- #ifdef MP-WEIXIN -->
				<view class="share">
					<button class="flex u-f-ac" @click="flag = true">
						<image class="shareIcon" :src="common.imgUrl('/static/share.png')" mode="" style="margin-top: 6rpx;"></image>
						<text>分享</text>
					</button>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="share">
					<button class="flex u-f-ac" @click="sharePoster()">
						<image class="shareIcon" :src="common.imgUrl('/static/share.png')" mode="" style="margin-top: 6rpx;"></image>
						<text>分享</text>
					</button>
				</view>
				<!-- #endif -->
				<u-popup v-model="flag" mode="center">
					<view class="arrow">
						<uni-icons type="arrow-up" size="80" color="white"></uni-icons>
					</view>
					 <view class="arrow-content">
					 	请点击此按钮进行分享
					 </view>
				</u-popup>
				<view class="service" @click="consulting">合作咨询</view>
				<view class="purchase" @click="ToCustomerService" v-if="details.time_status && !details.paymentVideo && isios">
					{{details.is_gratis == 1?'立即添加':'立即购买'}}
				</view>
				<view class="purchase1" v-else-if="isios">
					{{details.is_gratis == 1?'已添加':'已购买'}}
				</view>
				<view class="purchase" style="background-color: #c3bfc2;" v-else-if="isios">不在购买时间</view>
			</view>
		</view>
		<!-- 咨询弹框 -->
		<u-modal v-model="show" width="682rpx" title='院校合作' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able v-if='details.org'>
			<view class="border-bottom"></view>
			<view class="textCenter codeBox" v-if='details.org.qr_code'>
				<!-- <image class="codeImg" :src="common.imgUrl('/orgCode?abbreviation=institutions2')" mode="">
				</image> -->
				<image class="codeImg" :src="common.imgUrl(details.org.qr_code)" mode=""></image>
			</view>
			<view class="phoneText textCenter" v-if='details.org.phone'>联系电话: {{details.org.phone}}</view>
			<view class="phoneText textCenter" v-if='details.org.email'>邮箱地址: {{details.org.email}}</view>
			<view style="padding:30rpx 42rpx 30rpx 42rpx;">
				<view @click="()=>{show=false}" 
					style="background:#FF6638;height:63rpx;line-height: 64rpx;color:white;text-align: center;border-radius: 20px;"
					type="success">确定 </view>
			</view>
		</u-modal>
		<!-- 选课咨询 -->
		<!-- <u-modal v-model="courseShow" width="682rpx" title='选课咨询' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able>
			<view class="border-bottom"> </view>
			<view class="textCenter codeBox" style="margin-bottom: 31rpx;">
				<image class="codeImg" :src="common.imgUrl('/static/7mang.jpg')" mode=""></image>
			</view>

			<view class="phoneText textCenter">联系电话: 021-50770206</view>
			<view style="padding:31rpx 42rpx 55rpx 42rpx;">
				<u-button @click="()=>{courseShow=false}" shape="circle" :custom-style='{height:"63rpx"}'
					type="success">确定
				</u-button>
			</view>
		</u-modal> -->
		<!-- 立即购买弹框 -->
		<u-popup v-model="isPurchase" mode='bottom'>
			<view class="purchaseBox">
				<view class="flex">
					<view class='shoppingImg'>
						<image style="margin-right: 21rpx;" :src="common.imgUrl(details.img)" mode="widthFix">
					</view>
					<view class="purchaseRight">
						<view>
							<view class="statusBox" style="margin-left: 0;">{{curriculumType[details.type]}}</view>
							<view class="purchaseBoxName">{{details.name}}</view>
						</view>
						<view class="purchasePrice" v-if="details.is_gratis == 0">
							￥{{details.price*details.positive_class/100}}</view>
						<view class="orderPrice" v-else-if="details.is_gratis == 1">免费</view>
					</view>
				</view>
				<view class="paymentBox">
					<view v-if="details.is_gratis == 0">
						<view class="paymentText">支付方式</view>
						<view v-for="(item,index) in paymentList" :key='index' class="flex u-f-ac paymentItem"
							@click="clickPayment(index)">
							<image :style="item.styles" :src="item.img" mode=""></image>
							<view class="paymentName flex-shrink">{{item.name}}</view>
							<view class="quan flex-center" :style="payment==index?'background: #FF6638;':''">
								<u-icon name="checkbox-mark" color="#ffffff" size="28"></u-icon>
							</view>
						</view>
					</view>
					<view class="space-between" style="margin: 20px 0;"
						v-if="details.is_gratis == 0 &&  details.type != 3 &&details.positive_class!=1">
						<view class="" style="font-size: 15px;font-weight: bold;color: #333333;"> 下单课节数 </view>
						<u-number-box :min="details.first_phase_class" :max="details.positive_class"
							@change="numberChange" :disabled-input="true" v-model="payment_class" :step="1">
						</u-number-box>
					</view>
					<uni-collapse v-if="showpeopleList">
						<uni-collapse-item titleBorder="none" :show-animation="true">
							<template v-slot:title>
								<view style="display:flex;" class="peopleList">
									<view class="peopleList-first"> 学习对象 </view>
									<view class="peopleList-last">{{people.name}}({{people.member_type | whichPeople}})
									</view>
								</view>
							</template>
							<view class="content1" v-if="showList">
								<view v-for="(item,i) in peopleList" :key='i' @click="choosePeople(i)">
									<span>{{item.name}}</span>
									<span>({{item.member_type | whichPeople}})</span>
								</view>
								<!-- <text class="text">折叠内容主体，可自定义内容及样式</text> -->
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="flex space-between orderBox">
						<view class="orderMoney">订单金额</view>
						<view class="orderPrice" v-if="details.is_gratis == 0"> ￥{{details.price*payment_class/100}}
						</view>
						<view class="orderPrice" v-else-if="details.is_gratis == 1">免费</view>
					</view>
					<view class="paymentBottom" @click="addOrder" v-if="isios">
						{{details.is_gratis == 1?'立即添加':'立即支付'}}
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 分享 -->
		<share :show="isShow" :shareData="shareData" @hide="hide" :url="'caseShare?id='+id"></share>
		<QrcodePoster ref="poster" :title="details.name" :headerImg="details.img" subTitle='' abImg=''
			:item="details.id" type='type' :show='QrcodePoster' @show='showQrcodePoster'></QrcodePoster>
		<view class="distribution" v-if="details.is_class_representive" :style="{opacity:transparency}">
			预计分成比例:{{parseInt(details.settlement_proportion)}}% </view>
		<view class="CustomerService"  :class="{'shrink3':state3,'open3':!state3}"  style="background-color: #FFBA6D;" >
			<view style="width: 20%;margin-left:-5%;margin-top: 25%;">
				<u-icon color="#fff" size="26rpx" name="arrow-right" :class="{'shrink2':state2,'open2':!state2}" @click="Change1"></u-icon>
			</view>
			<view  style="width: 70%;margin-left: 10%;" @click="ToCustomerService1()">
				<img :src="common.imgUrl('/static/images/service.png')"><view>客服</view>
			</view>
			
		</view>
		<view class="CustomerService" :class="[state1?'shrink1':'open1']" style="bottom: 12%;background-color:#FD383F;" >
			<view style="width: 20%;margin-left:-5%;margin-top: 25%;">
				<u-icon color="#fff" size="26rpx" name="arrow-right" :class="[state?'shrink':'open']" @click="Change"></u-icon>
			</view>
			<view  style="width: 70%;margin-left: 10%;" @click="ToCustomerService2()">
			<img :src="common.imgUrl('/static/images/home.png')"><br> <view>首页</view>
			</view>
		</view>
	</view>
</template>
<!-- <script type="text/javascript" charset="utf-8" src="@/common/aliplayercomponents-1.0.8.min.js"></script> -->
<script>
	import storeInformation from "@/components/storeInformation.vue";
	import curriculumItem from "@/packgeA/components/curriculumItem.vue";
	import share from '@/components/share/share.vue';
	import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'
	import aliplayer from '@/packgeA/components/aliplayer.vue'
	import {
		verifyLogin
	} from '@/plugin/api/index.js'
	const PAYMENT = {
		WECHAT: 0x1,
		WECHAT_CH: "微信",
		ALIPAY: 0x2,
		ALIPAY_CH: "支付宝",
	};
	export default {
		filters: {
			whichPeople(value) {
				switch (value) {
					case 0:
						return '本人'
						break;
					case 1:
						return '儿子'
						break;
					case 2:
						return '女儿'
						break;
					case 3:
						return '孙子'
						break;
					case 4:
						return '孙女'
						break;
					case 5:
						return '父亲'
						break;
					case 6:
						return '母亲'
						break;
					case 7:
						return '爷爷'
						break;
					case 8:
						return '奶奶'
						break;
					case 9:
						return '姥爷'
						break;
					case 10:
						return '姥姥'
						break;
				}
			}
		},
		onPageScroll(e) {
			let height = e.scrollTop
			let getWindowInfo = uni.getWindowInfo()
			if (height > getWindowInfo.screenHeight / 4) {
				this.transparency = 0
			} else {
				let scrollTop = getWindowInfo.screenHeight / 4 - height
				this.transparency = scrollTop / (getWindowInfo.screenHeight / 4)
			}
		},
		components: {
			curriculumItem,
			share,
			QrcodePoster,
			aliplayer,
			storeInformation
		},
		onUnload() {
			if (this.$store.state.peopletype != '') {
				uni.reLaunch({
					url: '/pages/my/my'
				})
				this.$store.commit('changetype', '')
			}
		},
		data() {
			return {
				value1:'',
				state:false,
				state1:false,
				state2:false,
				state3:false,
				transparency: 1,
				QrcodePoster: false,
				classList: [],
				extraIcon: {
					color: '#4cd964',
					size: '26',
					type: 'image'
				},
				isShow: false,
				is_show_model: true,
				content: "",
				id: 0, //商品id
				communicationId: 0,
				details: {}, //商品详情数据
				curriculumType: ["1v1", "班课", "试听", "视频课"], //课程类型
				show: false,
				show1: false,
				courseShow: false,
				isPurchase: false,
				tablist: [],
				current: 0,
				peopleList: [],
				showpeopleList: true,
				people: {},
				showList: true,
				showPeople: false,
				courseList: [],
				payment_class: 1,
				paymentList: [{
						id: PAYMENT.WECHAT,
						img: this.common.imgUrl("/static/wechat.png"),
						name: PAYMENT.WECHAT_CH,
						styles: "width:30rpx;height:30rpx",
					},
					// #ifdef H5
					// {
					//   id: PAYMENT.ALIPAY,
					//   img: this.common.imgUrl("/static/zfb.png"),
					//   name: PAYMENT.ALIPAY_CH,
					//   styles: "width:30rpx;height:30rpx",
					// },
					// #endif
					// {
					// 	img: this.common.imgUrl('/static/yinlian.png')
					// 	name: '银联',
					// 	styles: 'width:30rpx;height:18rpx'
					// },
				],
				payment: 0,
				showvideo: false,
				pageNum1: 5,
				pageNum2: 5,
				pageNum3: 5,
				pageNum4: 5,
				videoId: '',
				selectClass: null,
				selectPage: null,
				shareData: {},
				h5Wx: false,
				htmlload: '',
				code: '',
				isLogin: false,
				isios:false,			
				flag : false,
				uid:-1,
				newreMarks:''
			};
		},
		onShareAppMessage(res) {
			return {
				title: this.details.name,
				imageUrl: this.common.imgUrl(this.details.img),
				path: '/packgeA/login/login?' + this.details.param
			}
		},
		onShareTimeline() {
			return {
				title: this.details.name,
				imageUrl: this.common.imgUrl(this.details.img),
				path: '/packgeA/login/login?' + this.details.param
			}
		},
		onLoad(option) {
			this.code = option.code
			this.paymentList = [{
				id: PAYMENT.WECHAT,
				img: this.common.imgUrl("/static/wechat.png"),
				name: PAYMENT.WECHAT_CH,
				styles: "width:30rpx;height:30rpx",
			}]
			this.h5Wx = false
			//#ifdef H5
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) != "micromessenger") {
				this.paymentList.push({
					id: PAYMENT.ALIPAY,
					img: this.common.imgUrl("/static/zfb.png"),
					name: PAYMENT.ALIPAY_CH,
					styles: "width:30rpx;height:30rpx",
				})
			} else {
				this.h5Wx = true
			}
			// #endif
			//#ifdef MP-WEIXIN
			uni.createVideoContext('player')
			// #endif
			this.id = option.id;
			// 模拟后端请求
			setTimeout(() => {
				this.content = this.details.introduce
				this.$nextTick(() => {
					this.$refs.uReadMore.init();
				})
			}, 1000);
			if(option.communicationId){
				this.communicationId = option.communicationId
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

			verifyLogin().then(res => {
				if (res.code == 0) {
					this.isLogin = true
				} else {
					this.isLogin = false
				}
			})
			this.tablist = []
			this.$nextTick(function() {
				this.getDetails(this.id)
				this.change(0)
			})
		},
		onReachBottom() {},
		methods: {
			AddNew() {
				if (this.newreMarks == '') {
					this.$u.toast('请填写评价')
					return
				}
				this.$axios({
					url: this.$url[109],
					data: {
						teacherUid: this.uid,
						content: this.newreMarks,
					}
				}).then(res => {
						this.newreMarks = ''
						uni.showToast({
							title: '评价成功',
							icon: 'none'
						})
						setTimeout(() => {
							this.show1 = false;
						}, 1000)
					
				})
			},
			Change1(){
				  this.state2=!this.state2;
				  this.state3=!this.state3;
			},
			Change(){
				  this.state=!this.state;
				  this.state1=!this.state1;
			},
			ToCustomerService1() {
				if (this.isLogin) {
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '/pagesShop/chat/index'
					})
					// #endif
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: '/pagesShop/chat/index?id=' + this.$mp.query.id
					})
					// #endif
				} else {
					uni.showToast({
						icon: "none",
						title: '请登录',
						position: "bottom",
					});
					setTimeout((res) => {
						uni.reLaunch({
							url: "/packgeA/login/login",
						});
					}, 1000);
				}
			},
			ToCustomerService2() {
				if (this.isLogin) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						icon: "none",
						title: '请登录',
						position: "bottom",
					});
					setTimeout((res) => {
						uni.reLaunch({
							url: "/packgeA/login/login",
						});
					}, 1000);
				}
			},
			ToCustomerService() {
				if (this.isLogin) {
					this.isPurchase = true
				} else {
					uni.showToast({
						icon: "none",
						title: '请登录',
						position: "bottom",
					});
					setTimeout((res) => {
						uni.reLaunch({
							url: "/packgeA/login/login",
						});
					}, 1000);
				}
			},
			showQrcodePoster() {
				this.QrcodePoster = false
			},
			sharePoster() {
				//获取带参数二维码
				this.is_show_model = false
				// this.$refs.poster.showCanvas(this.details.img)
				this.QrcodePoster = true
			},
			getvideo(videoId, index, i) {
				if (!videoId) {
					uni.showToast({
						title: '暂未上传视频',
						icon: 'none'
					});
					return
				}
				this.showvideo = false
				this.$nextTick(function() {
					this.showvideo = true
					this.videoId = videoId
					this.selectPage = index
					this.selectClass = i
				})
			},
			changefree(i) {
				let judge = false
				if (i.children != undefined) {
					for (let o = 0; o < i.children.length; o++) {
						if (i.children[o].is_free == 1) {
							judge = true
						}
					}
				}
				if (judge == true) {
					let whichone = false
					let mark = []
					for (let z = 0; z < this.classList.length; z++) {
						if (this.classList[z] == i.id) {
							whichone = true
							mark.push(z)
						}
					}
					if (whichone) {
						if (mark.length == 1) {
							this.classList.splice(mark[0], 1)
						} else {
							let marks = 0
							for (let loop = 0; loop < mark.length; loop++) {
								this.classList.splice(mark[loop - marks], 1)
								marks++
							}
						}
					} else {
						this.classList.push(i.id)
					}
				}
				let len = this.details.chapterSection[0].length - 1
				let list = this.details.chapterSection[0]
				if (i == list[len]) {
					setTimeout(() => {
						document.documentElement.scrollTop += 40
					}, 500)
				}
			},
			judge(item) {
				let answer = false
				this.classList.forEach(x => {
					if (x == item.id) {
						answer = true
					}
				})
				return answer
			},
			choosePeople(i) {
				this.showList = false
				this.showpeopleList = false
				let whichone = this.peopleList[i]
				this.peopleList[i] = this.people
				this.people = whichone
				this.$nextTick(function() {
					this.showList = true
					this.showpeopleList = true
				})
			},
			getPeople() {
				this.$axios({
					url: this.$url[66]
				}).then(res => {
					if (res.code == 0) {
						console.log('people', res)
						if (res.data.length == 1) {
							this.people = res.data[0]
							this.showpeopleList = false
						} else {
							res.data[0].member_type = 0
							this.people = res.data[0]
							res.data.splice(0, 1)
							this.peopleList = res.data
						}
					}
				})
			},
			share() {
				this.isShow = true;
			},
			hide(e) {
				this.isShow = e;
			},
			load() {
				this.$refs.uReadMore.init();
			},
			//查看照片
			seeImg(index) {
				console.log(this.common.imgUrl(this.details.img))
				let imgsArray = [];
				imgsArray[0] = this.common.imgUrl(this.details.img);
				console.log(imgsArray, "imgsArray")
				uni.previewImage({
					current: 0, //图片索引值
					urls: imgsArray //需要预览的图片链接列表
				});
				// this.common.previewImage([this.common.imgUrl(this.details.img)]);
			},
			gotop() {
				let top = document.documentElement.scrollTop || document.body.scrollTop
				// 实现滚动效果
				const timeTop = setInterval(() => {
					document.body.scrollTop = document.documentElement.scrollTop = top -= 50
					if (top <= 0) {
						clearInterval(timeTop)
					}
				}, 10)
				uni.showToast({
					title: '视频播放中',
					icon: 'none'
				})
			},
			getCurricuId(id) {
				console.log(id)
				this.id = id
				this.getDetails();
			},
			change(index) {
				console.log('111')
				this.current = index;
				if (this.details.chapterSection != undefined) {
					let item = this.details.chapterSection[0]
					this.classList = []
					for (let i = 0; i < item.length; i++) {
						let y = []
						y = item[i].children
						if (y != undefined) {
							for (let x = 0; x < y.length; x++) {
								if (item[i].children[x].is_free == 1) {
									this.classList.push(item[i].id)
								}
							}
						}
					}
				}
			},
			consulting() {
				this.show = true;
			},
			consulting1(i) {
				this.uid=i.uid
				this.show1 = true;
			},
			clickPayment(index) {
				this.payment = index;
			},
			//获取商品详情
			getDetails(i) {
				this.common.loading();
				this.$axios({
					url: this.$url[7],
					data: {
						id: this.id,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.details = res.data;
						if (this.details.uid != 0) {
							this.getPeople();
						}
						this.shareData = {
							id: i,
							title: res.data.name,
							instructions: res.data.introduce,
							img: res.data.img
						}
						if (this.details.content != '') {
							this.pageNum1 = 0
							this.tablist.push({
								name: '课程介绍'
							})
						}
						if (this.details.chapterSection[0][0] != undefined) {
							this.pageNum2 = this.tablist.length
							this.tablist.push({
								name: '课程大纲'
							})
						}
						if (this.details.teacher != '') {
							this.pageNum3 = this.tablist.length
							this.tablist.push({
								name: '上课讲师'
							})
						}
						this.getCourseList();
						this.payment_class = res.data.class_status === 0 ? res.data.positive_class : res.data
							.first_phase_class
						if (res.data.chapterSection != undefined) {
							let item = res.data.chapterSection[0]
							for (let i = 0; i < item.length; i++) {
								let y = []
								y = item[i].children
								if (y != undefined) {
									for (let x = 0; x < y.length; x++) {
										if (item[i].children[x].is_free == 1) {
											this.classList.push(item[i].id)
										}
									}
								}
							}
						}
						uni.hideLoading();
						//#ifdef H5
						let ua = window.navigator.userAgent.toLowerCase();
						if (ua.match(/MicroMessenger/i) == "micromessenger") {
							this.$axios({
								url: this.$url[43],
								data: {
									id: this.id,
									pic: this.common.imgUrl(this.details.img),
									title: this.details.name,
									description: this.details.introduce,
									url: "/h5/packgeA/login/login?type=" + this.id,
									realAuthUrl: location.href
								}
							}).then(res => {
								if (res.code == 0) {
									this.common.hShare(res.data)
								}
							})
						}
						//#endif
					}
				});
			},
			numberChange(e) {
				this.payment_class = e.value;
			},
			//获取课程列表
			getCourseList() {
				this.$axios({
					url: this.$url[9],
					data: {
						query: {
							is_recommend: 1,
						},
					},
				}).then((res) => {
					if (res.code == 0) {
						this.courseList = res.data.data;
						if (this.courseList != '') {
							this.pageNum4 = this.tablist.length
							this.tablist.push({
								name: '推荐课程'
							})
						}
					}
				});
			},
			//添加订单
			addOrder() {
				uni.showLoading({
					title: "加载中",
				});
				const payment = this.paymentList[this.payment].id;
				this.$axios({
					url: this.$url[10],
					data: {
						cid: this.id,
						payment,
						member_id: this.people.id,
						communicationId: this.communicationId,
						invitation_code: this.code
					},
				}).then((res) => {
					uni.hideLoading();
					if (res.code == 0) {
						if (res.data.is_gratis) {
							this.isPurchase = false;
							uni.showModal({
								title: "提示",
								content: "报名成功",
								showCancel: false,
								confirmText: "关闭",
								success: function(res) {
									uni.navigateTo({
										url: "/packgeA/myOrder/myOrder",
									});
								},
							});
							return;
						}
						this.isPurchase = false;
						if (payment === PAYMENT.WECHAT) {
							let status = 0;
							//#ifdef H5
							let ua = window.navigator.userAgent.toLowerCase();
							if (ua.match(/MicroMessenger/i) == "micromessenger") {
								status = 1;
							} else {
								status = 2;
							}
							//#endif
							this.$axios({
								url: this.$url[33],
								data: {
									id: res.data.id,
									status,
									payment_class: this.payment_class,
									openId: uni.getStorageSync("openId"),
								},
							}).then((res) => {
								if (res.code === 0) {
									if (status === 2) {
										window.location.href = res.data.url;
									} else {
										this.common.payment(res.data).then((res) => {
											if (res.code === 0) {
												uni.showModal({
													title: "提示",
													content: "支付成功",
													showCancel: false,
													confirmText: "关闭",
													success: function(res) {
														uni.navigateTo({
															url: "/packgeA/myOrder/myOrder",
														});
													},
												});
											}
										}).catch((err) => {});
									}
								}
							});
						} else if (payment === PAYMENT.ALIPAY) {
							this.$axios({
								url: this.$url[70],
								data: {
									id: res.data.id,
									payment_class: this.payment_class,
								}
							}).then((res) => {
								uni.hideLoading();
								document.querySelector('body').innerHTML = res.data.resp;
								document.forms[0].submit()
							}).catch(() => {
								uni.hideLoading();
							})
						}
					}
				});
			},
		},
	};
</script>
<style lang='scss' scoped>
	uni-textarea {
	    width: 100% !important;
	    display: block;
	    position: relative;
	    font-size: 16px;
	    line-height: normal;
	    white-space: pre-wrap;
	    word-break: break-all;
	}
	.arrow{
		position: fixed;
		top: 10rpx;
		right: 150rpx;
		transform: rotate(45deg);
	}
	.arrow-content{
		position: fixed;
		top: 250rpx;
		right: 150rpx;
		font-size: 40rpx;
		color: white;
	}
	.open1{
		 transition: all .5s;
	        right: 0% !important;
			display: block;
	    }
	    .shrink1{
	       right: -9% !important;
		    transition: all .5s;
			display: block;
	    }
	.open{
	        transition: all .5s;
			display: block;
	    }
	    .shrink{
	        transform:rotate(180deg);
	        transition: all .5s;
			display: block;
	    }
		.open3{
			 transition: all .5s;
		        right: 0% !important;
				display: block;
		    }
		    .shrink3{
		       right: -9% !important;
			    transition: all .5s;
				display: block;
		    }
		.open2{
		        transition: all .5s;
				display: block;
		    }
		    .shrink2{
		        transform:rotate(180deg);
		        transition: all .5s;
				display: block;
		    }
	.noselect {
		width: 686rpx;
		margin: 0;
		height: 70rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		image {
			width: 40rpx;
			height: 40rpx;
		}

		.chapter-first {
			font-size: 30rpx;
			font-family: Source Han Sans SC-Normal, Source Han Sans SC;
			font-weight: 400;
			color: #989898;
			display: flex;
			align-items: center;
		}
	}

	.free {
		font-family: Source Han Sans SC-Normal, Source Han Sans SC;
		font-weight: 400;
		display: inline-block;
		font-size: 26rpx;
		color: #FFF;
		background-color: #FF6638;
		padding: 5rpx 10rpx;
		border-radius: 16rpx;
	}

	.content1 {
		padding: 10rpx 0;
		width: auto;
	}

	.uni-collapse {
		margin-top: 20rpx !important;
	}

	.classtitle {
		margin: 20rpx 0;
		font-size: 15px;
		font-family: Source Han Sans SC-Regular, Source Han Sans SC;
		font-weight: 400;
		color: #2D2D2D;
		display: flex;
		align-items: center;
	}

	.peopleList {
		display: flex;
		justify-content: space-between;

		.peopleList-first {
			font-size: 30rpx;
			font-family: Source Han Sans SC-Medium, Source Han Sans SC;
			font-weight: bold;
			color: #333333;
		}

		.peopleList-last {
			font-size: 26rpx;
			font-family: Source Han Sans SC-Medium, Source Han Sans SC;
			font-weight: bold;
			color: #333333;
		}
	}

	.classtitle .free {
		margin-left: 36rpx;
	}

	.content1 {
		text-align: right;
		width: 635rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC-Medium, Source Han Sans SC;
		font-weight: bold;
		color: #333333;

		>view {
			margin-top: 15rpx;

			&:last-child {
				margin-bottom: 15rpx
			}
		}
	}

	/* 	.uni-collapse {
		margin-top: 45rpx !important;
	} */
	/deep/ .uni-collapse-item__title-arrow {
		margin-right: -5rpx !important;
	}

	/deep/ .u-content__showmore-wrap__readmore-btn {
		color: #FF6638 !important;
	}

	.curriculumDetails {
		view {
			vertical-align: middle;
			display: inline-block;
		}

		.name {
			display: inline;
		}
	}

	/deep/ .u-content {
		text-indent: 0 !important;
	}

	.introduce {
		/* justify-content: space-between; */
		align-items: center;
	}

	.little {
		align-items: center;
	}

	.classImg {
		width: 100%;
		height: 421rpx;
	}

	.detailsBox {
		padding: 33rpx;
	}

	.detailsBox /deep/ .u-content {
		height: 300rpx;
	}

	.nameBox {
		margin-bottom: 12rpx;
	}

	.img {
		border-radius: 10rpx;
		width: 146rpx;
		height: 146rpx;
		margin-right: 29rpx;
	}

	.whiteBox {
		padding: 0 24rpx;
	}

	.teacherName {
		font-size: 32rpx;
		font-weight: bold;
		color: #373e42;
	}

	.level {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		overflow: hidden;
		font-size: 24rpx;
		font-weight: 400;
		color: #75c9a8;
		margin-top: 12rpx;
		/* margin-left: 25rpx; */
	}

	.teacherDetail {
		font-size: 24rpx;
		font-weight: 400;
		color: #696969;
		margin-top: 13rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
    .evaluate{
		width: 100rpx;
		height: 60rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 62rpx;
		margin-top: 40rpx;
		color: white;
		margin-left: 20rpx;
		font-size: 28rpx;
		background-color:  #FF6638;
	}
	
	.name {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: rgba(21, 28, 42, 0.87);
		margin-left: 8rpx;
	}

	.teacherItem {
		margin-top: 38rpx;
		padding-bottom: 38rpx;
		/* border-bottom: 2px solid rgb(245, 245, 245); */
	}

	.CustomerService {
		position: fixed;
		right: 0%;
		bottom: 22%;
		width: 80rpx;
		padding: 15rpx 10rpx 15rpx 20rpx;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		font-size: 20rpx;
		background-color: #FF6638;
		color: #fff;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		overflow: hidden;
		text-align: center;
		view{
			width: 100%;
		}
		img {
			width: 40rpx;
			height: 30rpx;
		}
	}

	.distribution {
		position: fixed;
		right: 0%;
		top: 50%;
		padding: 15rpx 30rpx;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		font-size: 20rpx;
		background-color: #FF6638;
		color: #fff;
	}

	.statusBox {
		background: #FF6638;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 0.87);
		width: 80rpx;
		height: 42rpx;
		line-height: 42rpx;
		text-align: center;
		display: inline-block;
		margin-right: 10rpx;
	}

	.classDetails {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #666666;
		margin-bottom: 12rpx;
	}

	.priceBoxLeft {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #656565;
	}

	.activityPrice {
		width: 89rpx;
		height: 34rpx;
		background: #fffbf3;
		border: 1px solid #fea406;
		opacity: 1;
		border-radius: 8rpx;
		font-size: 22rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 34rpx;
		text-align: center;
		color: #fea406;
	}

	.price {
		font-size: 44rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: #FF6638;
		/* 	margin-left: 24rpx; */
	}

	.originalPrice {
		font-size: 22rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #989898;
		margin-left: 20rpx;
		text-decoration: line-through;
	}

	.selectcolor {
		color: #ff6638 !important;
	}

	.bottomBox {
		position: fixed;
		bottom: 0;
		height: 102rpx;
		width: 100%;
		background-color: white;
	}

	.service,
	.purchase,
	.purchase1 {
		width: 37.5%;
		height: 100%;
		line-height: 102rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #ffffff;
	}

	.service {
		background: linear-gradient(90deg, #FFBA6D 0%, #FC9218 100%);
	}

	.purchase {
		background: linear-gradient(90deg, #FD383F 0%, #FF7674 100%);
	}

	.purchase1 {
		background: linear-gradient(90deg, grey 0%, #656565 100%);
	}

	.share {
		width: 25%;
		height: 100%;
		font-size: 32rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #262626;
		opacity: 1;
		background: #fff;
	}

	.codeImg {
		width: 250rpx;
		height: 250rpx;
	}

	.codeBox {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.border-bottom {
		border-top: 1px solid #e9e9e9;
		margin-top: 53rpx;
	}

	.phoneText {
		font-size: 32rpx;
		font-weight: 500;
		line-height: 70rpx;
		color: #262626;
	}

	.purchaseBox {
		z-index: 999999999999999999999999;
		padding: 55rpx 41rpx 34rpx;
	}

	.shoppingImg {
		width: 300rpx;
		margin-right: 20rpx;

		image {
			width: 289rpx;
			height: 169rpx;
			border-radius: 10rpx;
		}
	}

	.purchaseBoxName {
		/* line-height:1.5; */
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		display: inline;
	}

	.purchasePrice {
		font-size: 40rpx;
		color: #FF6638;
		font-weight: bold;
		margin-top: 22rpx;
	}

	.purchaseRight {
		/* width:60%; */
	}

	.paymentText {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 65rpx;
	}

	.quan {
		width: 40rpx;
		height: 40rpx;
		background: #f2f2f2;
		border-radius: 50%;
		border: 1rpx solid #FF6638;
	}

	.paymentName {
		font-size: 26rpx;
		font-weight: 400;
		color: #2d2d2d;
		margin-left: 11rpx;
	}

	.paymentItem {
		margin-top: 25rpx;
	}

	.coupon {
		font-size: 22rpx;
		font-weight: 400;
		color: #2d2d2d;
	}

	.recommend {
		padding: 2rpx 10rpx;
		height: 20rpx;
		border: 1px solid #fa5151;
		border-radius: 4rpx;
		font-size: 16rpx;
		font-weight: 400;
		line-height: 20rpx;
		color: #fa5151;
		text-align: center;
		margin-left: 6rpx;
	}

	.couponPrice {
		font-size: 22rpx;
		font-weight: 400;
		color: #fea406;
	}

	.orderMoney {
		font-size: 30rpx;
		font-weight: bold;
		color: #2d2d2d;
	}

	.orderPrice {
		font-size: 30rpx;
		font-weight: bold;
		color: #FF6638;
	}

	.orderBox {
		margin-top: 24rpx;
		padding-top: 26rpx;
		border-top: 1px solid #ebebeb;
	}

	.paymentBottom {
		width: 376rpx;
		height: 70rpx;
		background: #FF6638;
		text-align: center;
		line-height: 70rpx;
		border-radius: 40rpx;
		margin: 0 auto;
		font-size: 30rpx;
		font-weight: bold;
		color: #ffffff;
		margin-top: 60rpx;
	}

	.kjIcon {
		width: 25rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.lwIcon {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	button::after {
		border: none;
		background-color: none;
		font-size: 30rpx;
	}

	button {
		background-color: white !important;
		color: #262626;
		font-size: 30rpx;
		line-height: 102rpx;
		justify-content: center;
	}

	.shareIcon {
		width: 26rpx;
		height: 26rpx;
		margin-right: 14rpx;
	}

	.titlecircle {
		width: 16rpx;
		height: 16rpx;
		background-color: #FF6638;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 6rpx;
	}

	#choosed {
		color: green;
	}
</style>
