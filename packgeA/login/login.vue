<template>
	<view>
		<view class="box">
			<view class="logoBox">
				<image class="logo" :src="common.imgUrl('/club/uploads/20240321/171101470565fc03312c02d.png')"
					mode="widthFix"></image>
			</view>
			<view class="fromBox" v-if="loginType !== '小程序端' || show">
				<u-form :model="phoneForm" v-if="!isCode" ref="uForm"
					:label-style="{ color: '#2D2D2D', fontSize: '32rpx', fontWeight: '400' }">
					<u-form-item>
						<view class="inputType" style="width:100%">
							<u-input :border="true" placeholder="请输入账号" v-model="phoneForm.phone"
								border-color="#042BE3" />
							<view class="addNum">+86</view>
						</view>
					</u-form-item>
					<u-form-item class="u-input-bottom">
						<u-input :border="true" placeholder="请输入验证码" v-model="phoneForm.code" border-color="#042BE3" />
						<view class="getVerification" @tap="getCode">{{ tips }}</view>
						<view class="">
							<!-- <u-button type="success" size='mini' :custom-style='{background:"#042BE3"}'>获取验证码</u-button> -->
							<view class="wrap">
								<u-toast ref="uToast"></u-toast>
								<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange">
								</u-verification-code>
								<!-- <u-button type="success" @click="getCode" size='mini'
										:custom-style='{background:"#042BE3"}'> {{tips}} </u-button> -->
							</view>
						</view>
					</u-form-item>
				</u-form>
				<u-form :model="form" v-else ref="uForm"
					:label-style="{ color: '#2D2D2D', fontSize: '32rpx', fontWeight: '400' }">
					<u-form-item>
						<view class="inputType" style="width:100%">
							<u-input :border="true" placeholder="请输入账号" v-model="form.userName"
								border-color="#042BE3" />
							<view class="addNum">+86</view>
						</view>
					</u-form-item>
					<u-form-item class="u-input-bottom">
						<!-- <view class="forgot space-between" style="width: 100%;">
							<u-input :border="true" placeholder="请输入密码" :clearable="false" type="password"
								border-color="#042BE3" v-model="form.password" />
							<view @click="navigateTo('/packgeA/phoneCode/phoneCode?title=忘记密码')" class="forgotPass">
								忘记密码
							</view>
							
						</view> -->
						<u-input :border="true" placeholder="请输入密码" :clearable="false" type="password"
							border-color="#042BE3" v-model="form.password" />
						<view @click="navigateTo('/packgeA/phoneCode/phoneCode?title=忘记密码')" class="forgotPass"> 忘记密码
						</view>
						<view class="">
							<!-- <u-button type="success" size='mini' :custom-style='{background:"#042BE3"}'>获取验证码</u-button> -->
							<view class="wrap">
								<u-toast ref="uToast"></u-toast>
								<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange">
								</u-verification-code>
								<!-- <u-button type="success" @click="getCode" size='mini'
									:custom-style='{background:"#042BE3"}'> {{tips}} </u-button> -->
							</view>
						</view>
					</u-form-item>
				</u-form>
			</view>
			<view class="binding" v-if="uname">
				正在与 <span>{{uname}}</span> 合伙人绑定
			</view>
			<view class="loginBox">
				<button v-if="loginType === '小程序端' && !show && isAgreement" class="button" @getphonenumber="phoneLogin"
					open-type="getPhoneNumber">手机号快捷登录</button>
				<button v-if="loginType === '小程序端' && !show && !isAgreement" class="button"
					@click="getLogin2">手机号快捷登录</button>
				<view class="button show" v-if="loginType === '小程序端' && !show" @click="getLogin()">输入手机号码登录/注册</view>
				<view class="button" v-if="loginType !== '小程序端' || show" @click="login()"> 登录 </view>
				<view class="space-between loginBoxText" v-if="loginType !== '小程序端' || show"
					:style="loginType === '小程序端' ? 'margin-bottom: 0px' : ''">
					<view></view>
					<!-- <view style="color: #333333;" @click="navigateTo('/packgeA/register/register')">注册</view> -->
					<view style="color: #042BE3;" @click="
							() => {
								isCode = !isCode
							}
						">
						{{ !isCode ? '账号登录' : '验证码登录' }}
					</view>
				</view>
				<view v-if="weixin && loginType !== '小程序端'">
					<u-divider style="color:#999999">第三方账号登录</u-divider>
					<view class="wechatBox" v-if="loginType === '手机app'">
						<image class="wechatIcon" style="margin-top: -20rpx;"
							src="https://cdn.7mango.cn/club/static/wechats.png" mode="" @click="thirdPartyLogin()">
						</image>
						<view class="wechatText" style="margin-top: 0rpx;margin-bottom: 20rpx;">微信</view>
					</view>
					<button class="wechatBox" open-type="getUserInfo" lang="zh_CN" @click="oauthLogin()" v-else>
						<image class="wechatIcon" src="https://cdn.7mango.cn/club/static/wechats.png" mode=""></image>
						<view class="wechatText" style="margin-top: 0;">微信</view>
					</button>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="agreement">
				<u-checkbox-group>
					<u-checkbox icon-size="24rpx" @change="checkboxChange" v-model="isAgreement" active-color="#042BE3">
					</u-checkbox>
					<view class="" style="display: flex;">
						<text style="color: #C4C8CC;font-size: 24rpx;" @tap="isAgreement=!isAgreement">我已阅读并同意</text>
						<text class="agreements" style="color: #042BE3;" @tap="clickEvent('用户协议')">《用户协议》</text>
						<text style="color: #C4C8CC;font-size: 24rpx;" @tap="isAgreement=!isAgreement">和</text>
						<text class="agreements" style="color: #042BE3;" @tap="clickEvent('隐私政策')">《隐私政策》</text>
					</view>
				</u-checkbox-group>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="agreement">
				<u-checkbox-group>
					<u-checkbox icon-size="24rpx" @change="checkboxChange" v-model="isAgreement" active-color="#042BE3">
						<text style="color: #C4C8CC;font-size: 22rpx;">我已阅读并同意</text>
						<text class="agreements" style="color: #042BE3;" @tap="clickEvent('用户协议')">《用户协议》</text>
						<text style="color: #C4C8CC;font-size: 22rpx;">和</text>
						<text class="agreements" style="color: #042BE3;" @tap="clickEvent('隐私政策')">《隐私政策》</text>
					</u-checkbox>
				</u-checkbox-group>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP -->
			<view class="agreement agreement1">
				<u-checkbox-group>
					<u-checkbox icon-size="24rpx" @change="checkboxChange" v-model="isAgreement" active-color="#042BE3">
						<text style="color: #C4C8CC;font-size: 22rpx;">我已阅读并同意</text>
						<text class="agreements" style="color: #042BE3;" @tap="clickEvent('用户协议')">《用户协议》</text>
						<text style="color: #C4C8CC;font-size: 22rpx;">和</text>
						<text class="agreements" style="color: #042BE3;" @tap="clickEvent('隐私政策')">《隐私政策》</text>
					</u-checkbox>
				</u-checkbox-group>
			</view>
			<!-- #endif -->
		</view>
		<u-popup v-model="buttons" mode="bottom" border-radius="20" length="30%">
			<view class="top">请您阅读并同意以下条款</view>
			<view class="middle">
				<text @tap="clickEvent('用户协议')">《用户协议》和</text>
				<text @tap="clickEvent('隐私政策')">《隐私政策》</text>
			</view>
			<view class="bottom" @click="remind()">同意并继续</view>
		</u-popup>
		<image class="backBanner" :src="common.imgUrl('/static/setUp/mountain.png')" />
	</view>
</template>
<script>
	import {
		verifyLogin
	} from '@/plugin/api/index.js'
	import {
		receive
	} from '@/plugin/api/order.js'

	export default {
		data() {
			return {
				show: false,
				isios: false,
				form: {
					userName: '',
					password: ''
				},
				phoneForm: {
					phone: '',
					code: ''
				},
				weixin: false,
				seconds: 60,
				isAgreement: false,
				isCode: false,
				buttons: false,
				tips: '',
				loginType: '', //登入方式
				dealer: '',
				uname: '',
				uid: '',
				coupon: '', //优惠券
				decrypt: '', //优惠券
				store_id: 0,
				commodityId: 0,
				order_id: 0,
				activity_id: 0,
				code: ''
			}
		},
		onLoad(option) {
			if (option.order_id != undefined) {
				this.order_id = option.order_id
			}
			if (option.scene != undefined) {
				const item = this.getRemainingString(option.scene, 'order_');
				if (item) {
					this.order_id = item
				} else {
					this.activity_id = option.scene
				}
			} else if (option.activity_id != undefined) {
				this.activity_id = option.activity_id
			}
			if (option.store_id != undefined) {
				this.store_id = option.store_id
			}
			if (option.commodityId != undefined) {
				this.commodityId = option.commodityId
			}

			if (option.id != undefined) {
				this.$store.commit('changeusername', option.id)
			}
			if (option.type != undefined) {
				this.$store.commit('changetype', option.type)
			}
			if (option.page != undefined) {
				this.$store.commit('changepage', option.page)
			}
			if (option.ucode != undefined) {
				this.$store.commit('changecode', option.ucode)
			}
			if (option.coupon != undefined && option.decrypt != undefined) {
				this.coupon = option.coupon
				this.decrypt = option.decrypt
				this.$store.commit('changeCoupon', {
					coupon: option.coupon,
					decrypt: option.decrypt
				})
			}
			if (option.dealer != undefined) {
				this.$axios({
					url: this.$url[105],
					data: {
						string: option.dealer
					}
				}).then(res => {
					if (res.code == 0) {
						this.uname = res.data.name
						console.log(res);
					}
				})
				this.dealer = option.dealer
				const data = this.common.base64_decode(option.dealer)
				// console.log(data);
				let uid = ''
				let uname = ''
				if (data.split('-').length === 2) {
					uid = data.split('-')[1]
					uname = data.split('-')[0]
				} else {
					uid = data.split('-')[data.split('-').length - 1]
					for (var i = 0; i < data.split('-').length - 1; i++) {
						if (i === data.split('-').length - 2) {
							uname += data.split('-')[i]
						} else {
							uname = uname + data.split('-')[i] + '-'
						}
					}
				}
				this.uname = uname
			}
			// #ifdef MP-WEIXIN
			let that = this;
			uni.login({
				success(res) {
					that.code = res.code;
				}
			});
			this.loginType = '小程序端'
			// #endif
			// #ifdef APP
			this.loginType = '手机app'
			this.weixin = false
			// #endif
			// #ifdef H5
			this.loginType = 'h5端'
			// #endif
			verifyLogin({
				dealer: this.dealer,
				invite_id: this.$store.state.username,
				store_id: this.store_id
			}).then(res => {
				if (res.code == 0) {
					this.getCoupon(res, 'islogin')
				} else {
					// #ifdef H5
					let ua = window.navigator.userAgent.toLowerCase()
					this.weixin = ua.match(/MicroMessenger/i) == 'micromessenger'
					if (this.weixin) {
						let code = this.common.getUrlParam('code')
						let data = uni.getStorageSync('data')
						let dataList = data ? JSON.parse(data) : []
						if (code != null && code) {
							this.$axios({
								url: this.$url[32],
								data: {
									code,
									type: true,
									data: dataList,
									dealer: this.dealer,
									invite_id: this.$store.state.username,
									store_id: this.store_id
								}
							}).then(res => {
								if (res.code == 0) {
									uni.removeStorageSync('data')
									uni.setStorageSync('openId', res.data.openId)
									uni.setStorageSync('token', res.data.session)
									this.getCoupon(res)
									this.$axios({
										url: this.$url[47],
										data: {
											abbreviation: uni.getStorageSync('abbreviation')
										}
									}).then(item => {
										if (item.code == 0) {
											if (uni.getStorageSync('abbreviation') === '') {
												uni.setStorageSync('abbreviation', item.data.data[
													0].abbreviation)
											}
										}
									})
								}
							})
						} else {
							uni.removeStorageSync('data')
						}
					}
					return
					// #endif
					this.weixin = true
				}
			})
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
			getRemainingString(originalString, start) {
				if (originalString.startsWith(start)) {
					// 如果字符串以start开始，则返回剩余的字符串
					return originalString.slice(start.length);
				} else {
					// 如果字符串不以start开始，则返回空字符串或null，或其他你需要的行为
					return '';
				}
			},
			clickEvent(i) {
				if (i == '用户协议') {
					uni.navigateTo({
						url: '/packgeB/UserAgreement/UserAgreement?name=用户协议'
					})
				} else {
					uni.navigateTo({
						url: '/packgeB/UserAgreement/UserAgreement?name=隐私政策'
					})
				}
			},
			//隐私政策同意
			checkboxChange(e) {
				this.isAgreement = e.value
			},
			remind() {
				if (this.buttons) {
					this.isAgreement = true
					this.login()
				}
			},
			getLogin() {
				if (!this.isAgreement) {
					uni.showToast({
						title: '未同意《用户服务协议及隐私政策》',
						icon: "none"
					});
					return;
				}
				this.show = true
			},
			getLogin2() {
				uni.showToast({
					title: '未同意《用户服务协议及隐私政策》',
					icon: "none"
				});
			},
			phoneLogin(e) {
				if (!this.isAgreement) {
					uni.showToast({
						title: '未同意《用户服务协议及隐私政策》',
						icon: "none"
					});
					let that = this;
					uni.login({
						success(res) {
							that.code = res.code;
						}
					});
					return;
				}
				let data = {
					code: this.code,
					iv: e.detail.iv,
					encryptedData: e.detail.encryptedData,
					dealer: this.dealer,
					invite_id: this.$store.state.username,
					store_id: this.store_id
				}
				let that = this;
				uni.login({
					success(res) {
						that.code = res.code;
						console.log(res);
					}
				})
				this.$axios({
					url: this.$url[125],
					data
				}).then(res => {
					if (res.code == 0) {
						uni.setStorageSync('openId', res.data.openId)
						uni.setStorageSync('token', res.data.session)
						this.getCoupon(res)
						this.$axios({
							url: this.$url[47],
							data: {
								abbreviation: uni.getStorageSync('abbreviation')
							}
						}).then(item => {
							if (item.code == 0) {
								if (uni.getStorageSync('abbreviation') === '') {
									uni.setStorageSync('abbreviation', item.data.data[0]
										.abbreviation)
								}
							}
						})
					}
				})
			},
			loginroute(res) {
				const {
					peopletype,
					username,
					page,
					code,
					coupon,
					decrypt
				} = this.$store.state
				if (page) {
					uni.navigateTo({
						url: '/packgeA/case/caseDetails/caseDetails?id=' + page
					})
				} else if (peopletype) {
					if (code) {
						uni.setStorage({
							key: 'ThousandAwn_share',
							data: peopletype
						})
						uni.setStorage({
							key: 'ThousandAwn_share_code',
							data: code
						})
						uni.navigateTo({
							url: `/packgeA/curriculumDetails/curriculumDetails?id=${peopletype}&code=${code}`
						})
					} else {
						uni.navigateTo({
							url: '/packgeA/curriculumDetails/curriculumDetails?id=' + peopletype
						})
					}
				} else if (username) {
					if (res.data.isBindInvite == false) {
						uni.navigateTo({
							url: '/packgeB/timetable/aiGrowUpPlan'
						})
					} else {
						this.$store.commit('changeusername', '')
						uni.showToast({
							title: '已和该用户绑定关系',
							icon: 'none'
						})
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/my/my'
							})
						}, 1000)
					}
				} else if (coupon && decrypt) {
					uni.reLaunch({
						url: '/pagesShop/coupon/coupon'
					})
				} else if (this.commodityId != 0) {
					uni.reLaunch({
						url: "/pagesShop/commodity/detail?id=" + this.commodityId
					})
				} else if (this.order_id != 0) {
					uni.reLaunch({
						url: "/pagesShop/order/order?order_id=" + this.order_id
					})
				} else if (this.activity_id != 0) {
					uni.reLaunch({
						url: "/packgeB/activityDetail/activityDetail?id=" + this.activity_id + '&user=true'
					})
				} else {
					uni.reLaunch({
						url: '/pages/my/my'
					})
				}
			},
			getCoupon(result, i) {
				if (this.coupon && this.decrypt) {
					receive({
						coupon: this.coupon,
						decrypt: this.decrypt
					}).then(res1 => {
						let that = this
						setTimeout(() => {
							that.loginStatus(result, i)
						}, 2000)
						uni.showToast({
							title: res1.code == 0 ? res1.data.name + '领取成功' : res1.msg,
							duration: 2000,
							icon: "none"
						})
					})
				} else {
					this.loginStatus(result, i)
				}
			},
			loginStatus(res, i) {
				uni.removeStorage({
					key: 'ThousandAwn_share'
				})
				uni.removeStorage({
					key: 'ThousandAwn_share_code'
				})
				if (i == 'islogin') {
					this.loginroute(res)
				} else {
					const {
						peopletype,
						username,
						page,
						code,
						coupon,
						decrypt
					} = this.$store.state
					if (!res.data.phone) {
						if (peopletype) {
							if (code) {
								uni.setStorage({
									key: 'ThousandAwn_share',
									data: peopletype
								})
								uni.setStorage({
									key: 'ThousandAwn_share_code',
									data: code
								})

							} else {
								uni.setStorage({
									key: 'ThousandAwn_share',
									data: peopletype
								})
							}
						} else if (username) {
							uni.setStorage({
								key: 'username',
								data: username
							})
						} else if (page) {
							uni.setStorage({
								key: 'page',
								data: page
							})
						} else if (coupon && decrypt) {
							uni.setStorage({
								key: 'coupon',
								data: coupon
							})
							uni.setStorage({
								key: 'decrypt',
								data: decrypt
							})
						}
						uni.reLaunch({
							url: `/packgeA/phoneCode/phoneCode?title=绑定手机号`
						})
					} else if (!res.data.nick) {
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
					} else {
						this.loginroute(res)
					}
				}
			},
			oauthLogin() {
				if (!this.isAgreement) {
					uni.showToast({
						title: '未同意《用户服务协议及隐私政策》',
						icon: "none"
					});
					return;
				}
				this.common.oauthLogin().then(userInfo => {
					this.$axios({
						url: this.$url[3],
						data: {
							...userInfo,
							loginType: this.loginType,
							dealer: this.dealer,
							invite_id: this.$store.state.username,
							store_id: this.store_id
						}
					}).then(res => {
						if (res.code == 0) {
							uni.setStorageSync('openId', res.data.openId)
							uni.setStorageSync('token', res.data.session)
							this.getCoupon(res)
							this.$axios({
								url: this.$url[47],
								data: {
									abbreviation: uni.getStorageSync('abbreviation')
								}
							}).then(item => {
								if (item.code == 0) {
									if (uni.getStorageSync('abbreviation') === '') {
										uni.setStorageSync('abbreviation', item.data.data[0]
											.abbreviation)
									}
								}
							})
						}
					})
				}).catch(res => {
					if (res.msg) {
						uni.showToast({
							icon: 'none',
							title: res.msg,
							position: 'bottom'
						})
					}
				})
			},
			thirdPartyLogin() {
				if (!this.isAgreement) {
					uni.showToast({
						title: '未同意《用户服务协议及隐私政策》',
						icon: "none"
					});
					return;
				}
				this.common.oauthLogin().then(userInfo => {
					this.$axios({
						url: this.$url[106],
						data: {
							...userInfo,
							loginType: this.loginType,
							dealer: this.dealer,
							invite_id: this.$store.state.username,
							store_id: this.store_id
						}
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.setStorageSync('openId', res.data.openId)
							uni.setStorageSync('token', res.data.session)
							this.getCoupon(res)
							this.$axios({
								url: this.$url[47],
								data: {
									abbreviation: uni.getStorageSync('abbreviation')
								}
							}).then(item => {
								if (item.code == 0) {
									if (uni.getStorageSync('abbreviation') === '') {
										uni.setStorageSync('abbreviation', item.data.data[0]
											.abbreviation)
									}
								}
							})
						}

					})
				}).catch(res => {
					console.log(res)
					if (res.msg) {
						uni.showToast({
							icon: 'none',
							title: res.msg,
							position: 'bottom'
						})
					}
				})
			},
			login() {
				if (!this.isAgreement) {
					uni.showToast({
						title: '未同意《用户协议》和 《隐私政策》',
						icon: 'none'
					})
					return
				}
				if (!this.isAgreement) {
					this.buttons = !this.buttons
					return
				}
				let data = {}
				if (this.isCode) {
					let form = this.form
					if (!form.userName) {
						uni.showToast({
							title: '请输入用户名',
							icon: 'none'
						})
						return
					}
					if (!form.password) {
						uni.showToast({
							title: '请输入密码',
							icon: 'none'
						})
						return
					}
					data = {
						type: 0,
						...form,
						loginType: this.loginType,
						dealer: this.dealer,
						invite_id: this.$store.state.username,
						store_id: this.store_id
					}
				} else {
					let phoneForm = this.phoneForm
					if (!phoneForm.phone) {
						uni.showToast({
							title: '请输入手机号码',
							icon: 'none'
						})
						return
					}
					if (!phoneForm.code) {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none'
						})
						return
					}
					data = {
						type: 1,
						dealer: this.dealer,
						invite_id: this.$store.state.username,
						store_id: this.store_id,
						...phoneForm
					}
				}
				if (this.weixin) {
					uni.setStorageSync('data', JSON.stringify(data))
					this.common.oauthLogin().then(userInfo => {
						this.submit({
							...data,
							...userInfo
						})
					}).catch(res => {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg,
								position: 'bottom'
							})
						}
					})
					return
				} else {
					this.submit(data)
				}
			},
			submit(data) {
				uni.showLoading({
					title: '登录中'
				})
				this.$axios({
					url: this.$url[0],
					data
				}).then(res => {
					if (res.code == 0) {
						uni.hideLoading()
						if (res.data.openId) {
							uni.setStorageSync('openId', res.data.openId)
						}
						uni.removeStorageSync('data')
						uni.setStorageSync('token', res.data.session)
						this.getCoupon(res)
						this.$axios({
							url: this.$url[47],
							data: {
								abbreviation: uni.getStorageSync('abbreviation')
							}
						}).then(item => {
							console.log(item);
							if (item.code == 0) {
								if (uni.getStorageSync('abbreviation') === '') {
									uni.setStorageSync('abbreviation', item.data.data[0].abbreviation)
								}
							}
						})
					}
				})
			},
			// 验证手机号码
			isPhone() {
				let mPattern = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
				return mPattern.test(this.phoneForm.phone)
			},
			getCode() {
				// 验证手机号合法性
				if (!this.isPhone()) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					})
					return
				}
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$axios({
						url: this.$url[2],
						data: {
							phone: this.phoneForm.phone
						}
					}).then(res => {
						if (res.code == 0) {
							uni.hideLoading()
							this.$u.toast('验证码已发送')
							this.$refs.uCode.start()
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送')
				}
			},
			codeChange(text) {
				this.tips = text
			},
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>
<style lang="scss">
	.agreement1 {
		.u-checkbox .u-checkbox__icon-wrap text {
			top: -13rpx !important;
			left: 0rpx !important;
		}
	}

	.u-checkbox .u-checkbox__icon-wrap text {
		top: -6rpx !important;
		left: 1rpx !important;
	}

	.u-divider {
		background-color: transparent !important;
	}
</style>
<style lang="scss" scoped>
	.binding {
		width: 100%;
		height: 50rpx;
		color: rgb(196, 200, 204);
		font-size: 28rpx;
		text-align: center;

		span {
			font-size: 32rpx;
			color: rgb(255, 102, 56);
			margin-left: 10rpx;
			margin-right: 10rpx;
		}
	}

	.button {
		width: 100%;
		margin: 0 auto;
		height: 90rpx;
		background: #042BE3;
		border-radius: 50rpx;
		text-align: center;
		line-height: 90rpx;
		color: white;
	}

	.button.show {
		background-color: #fff;
		color: #000;
		border: 1px solid #000;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.box {
		position: relative;
		z-index: 999;
	}

	.logoBox {
		width: 100%;
		padding-top: 100rpx;
		text-align: center;
		display: flex;
		align-items: center;

		.logo {
			width: 360rpx;
			height: 200rpx;
			margin: 0 auto;
		}
	}

	.u-input-bottom {
		/deep/ .u-input--border {
			border-radius: 48rpx;
		}
	}

	/deep/ .u-form-item--right__content__slot {
		position: relative;
	}

	/deep/ .u-input--border {
		border-radius: 48rpx;
	}

	.inputType {
		/deep/ .u-input--border {
			border-radius: 48rpx;
			padding-left: 112rpx !important;
		}
	}

	.addNum {
		position: absolute;
		top: 0;
		left: 28rpx;
		font-size: 30rpx;
		color: #666666;
	}

	.getVerification {
		position: absolute;
		top: 0;
		right: 28rpx;
		font-size: 30rpx;
		color: #333333;
		z-index: 9999999;
	}

	.forgotPass {
		position: absolute;
		top: 0;
		right: 68rpx;
		font-size: 30rpx;
		color: #333333;
		z-index: 9999999;
	}

	.forgot {
		/deep/ .u-input {
			border-radius: 48rpx;
			width: 158%;
		}

		/deep/ .u-input__right-icon__item {
			margin-left: -166rpx;
		}
	}

	.fromBox {
		margin-top: 100rpx;
		padding: 0 76rpx;
	}

	/deep/ .u-input__right-icon {
		z-index: 999999999;
	}

	.agreement {
		width: 80%;
		margin: 20rpx auto 0;
		font-size: 24rpx;

		// #ifdef MP
		.agreements {
			vertical-align: -webkit-baseline-middle;
		}

		// #endif
		.text {
			display: inline-block;
			width: 90%;
			text-align: center;
		}
	}

	.circle {
		width: 36rpx;
		height: 36rpx;
		border: 1px solid #707070;
		border-radius: 50%;
		text-align: center;
		margin-right: 10rpx;
		display: inline-block;
		vertical-align: middle;
	}

	.loginBox {
		padding: 0 72rpx;
		margin-top: 76rpx;
		font-weight: bold;

		/deep/ .u-success-hover[data-v-6e15e680] {
			background-color: #042BE3 !important;
		}
	}

	.loginBoxText {
		margin-bottom: 50rpx;
		padding: 34rpx 10rpx;
		font-size: 27rpx;
		font-weight: 400;
		font-family: Source Han Sans SC;
		font-weight: bold;
	}

	.wechatBox {
		margin-top: 28rpx;
		text-align: center;
		background-color: transparent;

		.wechatIcon {
			width: 78rpx;
			height: 78rpx;
		}

		.wechatText {
			font-size: 27rpx;
			color: #666666;
			font-family: Source Han Sans SC;
			margin-top: -30rpx;
		}
	}

	button {
		// background-color: white;
		font-size: 30rpx;
	}

	button::after {
		border: none;
	}

	.backBanner {
		position: fixed;
		width: 100%;
		height: 400rpx;
		bottom: -20rpx;
		background-position: -400rpx 0;
		z-index: -1;
		background-repeat: no-repeat;
	}

	/deep/ .uni-button {
		background-color: none !important;
	}

	.top {
		margin-top: 20rpx;
		text-align: center;
		vertical-align: middle;
	}

	.middle {
		width: 100%;
		text-align: center;
		color: #042BE3;
		margin-top: 60rpx;
		vertical-align: middle;
	}

	.bottom {
		width: 90%;
		border-radius: 100rpx;
		color: #fff;
		padding: 20rpx 0rpx;
		margin: 0 auto;
		background-color: #042BE3;
		text-align: center;
		margin-top: 40rpx;
	}
</style>