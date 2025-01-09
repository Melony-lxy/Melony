<template>
	<view class="box">
		<view class="logoBox">
			<image class="logo" :src="common.imgUrl('/static/setUp/logo.png')" mode="widthFix"></image>
		</view>
		<u-form :model="form" ref="uForm" :label-style='{color:"#2D2D2D",fontSize:"32rpx",fontWeight:"400"}'>
			<u-form-item label="手机号" label-width='163rpx'>
				<u-input placeholder="请输入账号" v-model="form.phone" />
			</u-form-item>
			<u-form-item label="验证码" label-width='163rpx'>
				<view style="display: flex;">
				<view class="space-between">
					<u-input placeholder="请输入验证码" v-model="form.code" />
				</view>
				<view style="width: 180px;">
				<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
				<u-button type="success" @click="getCode" size='medium' :custom-style='{background:"#FF6638"}'>
					{{tips}}
				</u-button>
				</view>
				</view>
				<!-- <view class="wrap"> -->
					<!-- <u-toast ref="uToast"></u-toast> -->
				<!-- </view> -->
			</u-form-item>
			<u-form-item label="用户名" label-width='163rpx'>
				<u-input placeholder="4-20位字符 数字/字母/汉字" type="text" v-model="form.userName" />
			</u-form-item>
			<u-form-item label="密码" label-width='163rpx'>
				<u-input placeholder="6-16位字符 数字/字母/汉字" :clearable='false' type="password" v-model="form.password" />
			</u-form-item>
		</u-form>
			<view class="agreement agreement9">
				<u-checkbox-group>
					<u-checkbox icon-size="24rpx" @change="checkboxChange" v-model="isAgreement" active-color="#FF6638">
						<text style="color: #C4C8CC;font-size: 22rpx;">我已阅读并同意</text>
					</u-checkbox>
				</u-checkbox-group>
				<text class="agreements" style="color: #FF6638;margin-left:-25rpx"  @tap="clickEvent('用户协议')">《用户协议》</text>
				<text class="agreements" style="color: #C4C8CC;font-size: 22rpx;">和</text>
				<text class="agreements" style="color: #FF6638;" @tap="clickEvent('隐私政策')">《隐私政策》</text>
			</view>
		<u-button shape="circle" :custom-style='{height:"90rpx",background:"#FF6638",fontWeight:"bold",marginTop:"60rpx"}' type="success" lang="zh_CN"
			@click="oauthLogin()">注册</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: '',
					code: '',
					userName: '',
					password: '',
				},
				seconds: 60,
				tips: '',
				isAgreement: false,
				buttons: false,
				peopletype:'',
				code:'',
				username:'',
				page:''
			}
		},
		onLoad(option) {
			this.peopletype=uni.getStorageSync('ThousandAwn_share'
			)
			this.code=uni.getStorageSync('ThousandAwn_share_code'
			)
			this.username=uni.getStorageSync('username'
			)
			this.page=uni.getStorageSync('page'
			)
			let ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				let code = this.common.getUrlParam("code");
				let data = uni.getStorageSync("data");
				let dataList = data ? JSON.parse(data) : []
				if (code != null && code) {
						this.$axios({
							url: this.$url[42],
							data: {
								code,
								type: true,
								data: dataList
							}
						}).then((res) => {
							if (res.code == 0) {
								uni.removeStorageSync('data')
								uni.setStorageSync("openId", res.data.openId);
								uni.setStorageSync("token", res.data.session);
								this.loginStatus(res)
							}
						})
					
				} else {
					uni.removeStorageSync('data')
				}
			}
			return
		},
		methods: {
			clickEvent(i){
				if(i=='用户协议'){
					uni.navigateTo({
						url:'/packgeB/UserAgreement/UserAgreement?name=用户协议'
					})
				}else{
					uni.navigateTo({
						url:'/packgeB/UserAgreement/UserAgreement?name=隐私政策'
					})
				}
			},
			loginStatus(res) {
				if (this.page) {
					uni.removeStorage({
						key:'page'
					})
					uni.navigateTo({
						url: '/packgeA/case/caseDetails/caseDetails?id=' + this.page
					})
				} else if (this.peopletype) {
					if (this.code) {
						uni.navigateTo({
							url: `/packgeA/curriculumDetails/curriculumDetails?id=${this.peopletype}&code=${this.code}`
						})
					} else {
						uni.navigateTo({
							url: '/packgeA/curriculumDetails/curriculumDetails?id=' + this.peopletype
						})
					}
			
				} else if (this.username) {
					if (res.data.isBindInvite == false) {
						uni.navigateTo({
							url: '/packgeB/timetable/aiGrowUpPlan'
						})
					} else {
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
				} else {
					uni.reLaunch({
						url: '/pages/my/my'
					})
				}
			},
			//隐私政策同意
			checkboxChange(e) {
				console.log(e.value)
				this.isAgreement = e.value
			},
			// 验证手机号码
			isPhone() {
				let mPattern = /^1[3456789]\d{9}$/;
				return mPattern.test(this.form.phone);
			},
			getCode() {
				// 验证手机号合法性
				if (!this.isPhone()) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: "none"
					}); 
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$axios({
						url: this.$url[2],
						data: {
							phone: this.form.phone
						}
					}).then((res) => {
						if (res.code == 0) {
							uni.hideLoading();
							this.$u.toast('验证码已发送');
							this.$refs.uCode.start();
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			oauthLogin() {
				if (!this.isAgreement) {
					uni.showToast({
						title: '未同意《用户服务协议及隐私政策》',
						icon: "none"
					});
					return;
				}
				let form = this.form;
				if (!form.phone) {
					uni.showToast({
						title: '请输入手机号码',
						icon: "none"
					});
					return;
				}
				if (!form.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: "none"
					});
					return;
				}
				if (!form.userName) {
					uni.showToast({
						title: '请输入用户名',
						icon: "none"
					});
					return;
				}
				if (!form.password) {
					uni.showToast({
						title: '请输入密码',
						icon: "none"
					});
					return;
				}
					uni.setStorageSync("data", JSON.stringify(form));
					this.common.oauthLogin().then(userInfo => {
						this.$axios({
							url: this.$url[4],
							data: {
								...userInfo,
								...form
							}
						}).then((res) => {
							if (res.code == 0) {
								uni.removeStorageSync('data')
								uni.setStorageSync("openId", res.data.openId);
								uni.setStorageSync("token", res.data.session);
								this.loginStatus(res)
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
		}
	}
</script>
<style lang="scss">
	.agreement9{
	.u-checkbox .u-checkbox__icon-wrap text {
		top: -6rpx !important;
		left: 0rpx !important;
	}
	}
</style>
<style scoped lang="scss">
	
	.box {
		padding: 66rpx 72rpx;
	}
	.agreement {
		width: 90%;
		margin: 62rpx auto 0;
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
	// .agreement {
	// 	margin-top: 137rpx;
	// 	font-size: 24rpx;
	// 	margin-bottom: 21rpx;
	// }

	.circle {
		width: 36rpx;
		height: 36rpx;
		border: 1px solid #707070;
		border-radius: 50%;
		text-align: center;
		margin-right: 10rpx;
	}
	/deep/ .u-success-hover{
		background: #f43800 !important;
	}
	/deep/ .u-size-medium{
		padding:0 40rpx !important;
	}
	.logoBox {
		width: 100%;
		margin:100rpx 0 ;
		text-align: center;
		display: flex;
		align-items: center;
		.logo {
			width: 440rpx;
			height: 177rpx;
			margin: 0 auto;
		}
	}
</style>