<template>
	<view class="box">
		<u-form :model="newform" ref="uForm" :label-style='{color:"#2D2D2D",fontSize:"32rpx",fontWeight:"400"}'>
			<u-form-item label="手机号" label-width='163rpx'>
				<u-input placeholder="请输入手机号" v-model="newform.phone" />
			</u-form-item>
			<view class="" style="height: 1rpx;background-color: #ddd;">
				
			</view>
			<u-form-item label="验证码" label-width='163rpx'>
				<view class="space-between">
					<u-input placeholder="请输入验证码" v-model="newform.code" />
					<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button type="success" @click="getCode" size='medium' :custom-style='{background:"#042BE3"}'>
							{{tips}}
						</u-button>
					</view>
				</view>
			</u-form-item>
		</u-form>
		<view class="buttonBox">
			<u-button shape="circle" v-if="title==='绑定手机号'" :custom-style='{height:"90rpx",background:"#042BE3"}'
				type="success" @click="submit">绑定手机号</u-button>
			<u-button shape="circle" v-else
				:custom-style='{height:"90rpx",background:"#042BE3",fontWeight:"bold",marginTop:"80rpx"}' type="success"
				@click="nextTo">下一步</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newform: {
					phone: '',
					code: '',
				},

				seconds: 60,
				tips: '',
				title: '',
				code: '',
				peopletype: '',
				username: '',
				page: '',
				coupon:'',
				decrypt:''
			}
		},

		onLoad(option) {
			this.title = option.title
			uni.setNavigationBarTitle({
				title: option.title
			})
			this.peopletype=uni.getStorageSync('ThousandAwn_share')
			this.code=uni.getStorageSync('ThousandAwn_share_code')
			this.username=uni.getStorageSync('username')
			this.page=uni.getStorageSync('page')
			this.decrypt=uni.getStorageSync('decrypt')
			this.coupon=uni.getStorageSync('coupon')
		},
		methods: {
			// 验证手机号码
			isPhone() {
				let mPattern = /^1[23456789]\d{9}$/;
				return mPattern.test(this.newform.phone);
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
							phone: this.newform.phone
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
			submit() {
				this.$axios({
					url: this.$url[44],
					data: {
						...this.newform
					}
				}).then((res) => {
					if (res.code == 0) {
						this.loginStatus(res)
					}
				})
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
				} else if (this.decrypt && this.coupon){
					uni.removeStorage({
						key:'decrypt'
					})
					uni.removeStorage({
						key:'coupon'
					})
					uni.reLaunch({
						url: '/pagesShop/coupon/coupon'
					})
				}else{
					uni.reLaunch({
						url: '/pages/my/my'
					})
				}
			},
			nextTo() {
				this.$axios({
					url: this.$url[5],
					data: {
						...this.newform,
						invite_id: this.username
					}
				}).then((res) => {
					if (res.code == 0) {
						uni.navigateTo({
							url: '/packgeA/newPassword/newPassword?phone=' + this.newform.phone +
								'&code=' + this.newform.code
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
	.box {
		padding: 66rpx 42rpx;
		
	}

	.buttonBox {
		margin-top: 50rpx;
	}
    /deep/.u-form-item__body {
        height: 70rpx;
    }
	/deep/ .u-size-medium {
		padding: 0 40rpx;
	}
</style>
