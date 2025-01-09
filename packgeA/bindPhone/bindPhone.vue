<template>
	<view class="box">
		<u-form
			:model="form"
			ref="uForm"
			:label-style="{ color: '#2D2D2D', fontSize: '32rpx', fontWeight: '400' }"
		>
			<u-form-item label="原手机号" label-width="163rpx">
				<u-input placeholder="请输入手机号" disabled v-model="form.primary_phone" />
			</u-form-item>
			<u-form-item label="验证码" label-width="163rpx">
				<view class="space-between">
					<u-input placeholder="请输入验证码" v-model="form.primary_code" />
					<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button type="success" @click="getCode" size="mini" :custom-style="{ background: '#042BE3' }">
							{{ tips }}
						</u-button>
					</view>
				</view>
			</u-form-item>
			<u-form-item label="新手机号" label-width="163rpx">
				<u-input placeholder="请输入手机号" v-model="form.new_phone" />
			</u-form-item>
			<u-form-item label="验证码" label-width="163rpx">
				<view class="space-between">
					<u-input placeholder="请输入验证码" v-model="form.new_code" />
					<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code
							:seconds="seconds"
							ref="uCodes"
							@change="codeChanges"
						></u-verification-code>
						<u-button
							type="success"
							@click="getCodes"
							size="mini"
							:custom-style="{ background: '#042BE3' }"
						>
							{{ tipss }}
						</u-button>
					</view>
				</view>
			</u-form-item>
		</u-form>

		<view class="buttonBox">
			<!-- <u-button v-if="!nextTrue" shape="circle" :custom-style='{height:"90rpx",background:"#042BE3"}' type="success" @click="next()">下一步</u-button> -->
			<view
			    class="button"
				@click="uploadPhone"
				
				
			>
				确认修改
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				primary_phone: '',
				primary_code: '',
				new_phone: '',
				new_code: ''
			},

			seconds: 60,
			tips: '',
			secondss: 60,
			tipss: ''
		}
	},
	onLoad() {
		this.getInfo()
	},
	methods: {
		// 原手机号
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: '正在获取验证码'
				})
				this.$axios({
					url: this.$url[2],
					data: {
						phone: this.form.primary_phone
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
		// 新手机号
		getCodes() {
			if (this.$refs.uCodes.canGetCode) {
				if (!this.isPhone(this.form.new_phone)) {
					this.$u.toast('请输入正确的手机号')
					return
				}
				uni.showLoading({
					title: '正在获取验证码'
				})
				this.$axios({
					url: this.$url[2],
					data: {
						phone: this.form.new_phone
					}
				}).then(res => {
					if (res.code == 0) {
						uni.hideLoading()
						this.$u.toast('验证码已发送')
						this.$refs.uCodes.start()
					}
				})
			} else {
				this.$u.toast('倒计时结束后再发送')
			}
		},
		codeChange(text) {
			this.tips = text
		},
		codeChanges(text) {
			this.tipss = text
		},

		// 验证手机号码
		isPhone(phone) {
			let mPattern = /^1[3456789]\d{9}$/
			return mPattern.test(phone)
		},

		// 获取个人信息
		getInfo() {
			this.$axios({
				url: this.$url[6]
			}).then(res => {
				if (res.code == 0) {
					this.form.primary_phone = res.data.phone
				}
			})
		},

		//修改手机号
		uploadPhone() {
			if (!this.form.primary_code) {
				this.$u.toast('请输入原手机号验证码')
				return
			}
			if (!this.form.new_phone) {
				this.$u.toast('请输入新手机号')
				return
			}
			if (!this.form.new_code) {
				this.$u.toast('请输入新手机号验证码')
				return
			}
			if (!this.isPhone(this.form.new_phone)) {
				this.$u.toast('请输入正确的手机号')
				return
			}
			this.$axios({
				url: this.$url[23],
				data: {
					...this.form
				}
			}).then(res => {
				if (res.code == 0) {
					this.$u.toast('修改成功')
				}
				// uni.navigateBack({})
			})
		},

		next() {
			uni.navigateTo({
				url: '/packgeA/phoneCode/phoneCode?title=绑定手机号'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.box {
	padding: 66rpx 24rpx;
}

.buttonBox {
	margin-top: 100rpx;
}
.button{
	width: 90%;
	margin: 0 auto;
	height: 90rpx;
	background:$project-color;
	border-radius: 50rpx;
	text-align: center;
	line-height: 90rpx;
	color: white;
}
</style>
