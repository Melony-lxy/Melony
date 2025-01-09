<template>
	<view>
		<view v-if="show==0">
			<view class="account"> 注销账号 </view>
			<view class="account-content"><text @click="goto()">点击这里</text>填写并注销申请，工作人员会协助你完成注销。</view>
			<view class="account-content"> 您主动注销后，我们将停止为您提供产品/服务，根据适用法律的要求删除您的个人信息，或是其匿名化处理。 </view>
		</view>
		<view v-if="show==1">
			<view class="account1">
				<text style="font-size: 50rpx;">账号注销</text><br>
				<text style="font-size: 30rpx;color: gray;">永久注销，无法恢复，请谨慎操作</text>
			</view>
			<view class="account-q"> 请选择注销账号的原因： </view>
			<view class="payment">
				<view class="weixin">
					<view class="paymentMethod"><strong>多账号，释放手机号</strong></view>
					<view class="paymentMethod-btn" :class="paymentMethod == 1 ? 'activ' : ''"
						@click="paymentMethod = 1"></view>
				</view>
				<view class="Alipay">
					<view class="paymentMethod"><strong>不想使用了</strong></view>
					<view class="paymentMethod-btn" :class="paymentMethod == 2 ? 'activ' : ''"
						@click="paymentMethod = 2"></view>
				</view>
				<view class="Alipay">
					<view class="paymentMethod"><strong>其他</strong></view>
					<view class="paymentMethod-btn" :class="paymentMethod == 3 ? 'activ' : ''"
						@click="paymentMethod = 3"></view>
				</view>
			</view>
			<view class="renewNow" @click="goto()">下一步</view>
		</view>
		<view v-if="show==2">
			<view class="account-q"> 账号注销后将放弃以下权益和资产： </view>
			<view class="account-content"> 1.您主动注销后，我们将停止为您提供产品/服务，根据适用法律的要求删除您的个人信息，或是其匿名化处理。 </view>
			<view class="account-content"> 1.您主动注销后，我们将停止为您提供产品/服务，根据适用法律的要求删除您的个人信息，或是其匿名化处理。 </view>
			<view class="account-content"> 1.您主动注销后，我们将停止为您提供产品/服务，根据适用法律的要求删除您的个人信息，或是其匿名化处理。 </view>
			<view class="account-content"> 1.您主动注销后，我们将停止为您提供产品/服务，根据适用法律的要求删除您的个人信息，或是其匿名化处理。 </view>
			<view class="account-content"> 1.您主动注销后，我们将停止为您提供产品/服务，根据适用法律的要求删除您的个人信息，或是其匿名化处理。 </view>
			<view class="account-content" style="text-align: center;font-size: 26rpx;"> 轻按以下按钮，即表示你已阅读并了解以上风险 </view>
			<view class="renewNow" @click="goto()">我已清楚风险，确认继续</view>
			<view class="renewNow" style="background-color: white;color: #042BE3;border: #042BE3 2rpx solid;"
				@click="goto1()">返回</view>
		</view>
		<view v-if="show==3">
			<view style="width: 90%;margin-left: 5%;">
			<u-form :model="form" ref="uForm">
				<u-form-item label="手机号" label-width="163rpx">
					<u-input placeholder="请输入手机号" disabled v-model="form.primary_phone" />
				</u-form-item>
				<u-form-item label="验证码" label-width="163rpx">
					<view class="space-between">
						<u-input placeholder="请输入验证码" v-model="form.primary_code" />
						<view class="wrap">
							<u-toast ref="uToast"></u-toast>
							<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange">
							</u-verification-code>
							<u-button type="success" @click="getCode" size="mini"
								:custom-style="{ background: '#042BE3' }">
								{{ tips }}
							</u-button>
						</view>
					</view>
				</u-form-item>
			</u-form>
			</view>
			<view class="renewNow" @click="goto2()">下一步</view>
			<view class="renewNow" style="background-color: white;color: #042BE3;border: #042BE3 2rpx solid;"
				@click="goto1()">返回</view>
		</view>
		<view v-if="show==4">
			<view class="" style="display: flex;justify-content: center;">
				<img :src="common.imgUrl('/static/setUp/icon7.png')" alt="">
			</view>
			<view style="width: 90%;margin-left: 5%;margin-top: 20rpx;"> 根据适用法律的要求删除您的个人信息，或是其匿名化处理。 </view>
			<view class="renewNow" @click="submit()">我已清楚风险，确认继续</view>
			<view class="renewNow" style="background-color: white;color: #042BE3;border: #042BE3 2rpx solid;"
				@click="goto1()">返回</view>
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
				},
				seconds: 60,
				tips: '',
				secondss: 60,
				tipss: '',
				paymentMethod: 1,
				show: 0,
			};
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				this.$axios({
					url: this.$url[6]
				}).then(res => {
					if (res.code == 0) {
						this.form.primary_phone = res.data.phone
					}
				})
			},
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
			codeChange(text) {
				this.tips = text
			},
			goto() {
				
				this.show++
			},
			goto2() {
				console.log(this.form);
				if (this.form.primary_code.trim() == '') {
					this.$u.toast('请输入手机号验证码')
					return
				} else {
					this.$axios({
						url: this.$url[5],
						data: {
							phone: this.form.primary_phone,
							code: this.form.primary_code
						}
					}).then((res) => {
						if (res.code == 0) {
							this.show++
						}
					})
				}
			},
			goto1() {
				this.show--
			},
			submit(){
				const _this = this
				uni.showModal({
				    title: '提示',
				    content: '确定要注销账号吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.logOff()
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			logOff() {
				this.$axios({
					url: this.$url[104],
				}).then((res) => {
					if (res.code == 0) {
						this.$u.toast('注销成功')
						setTimeout(() => {
							uni.removeStorageSync('token')
							uni.navigateTo({
								url: '/packgeA/login/login'
							})
						}, 1000)
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	/deep/.u-btn--success {
		color: #ffffff;
		border-color: $project-color;
		background-color: $project-color;
	}

	/deep/ .u-success-hover[data-v-6e15e680] {
		background-color:$project-color !important;
	}

	.account {
		width: 100%;
		padding-left: 5%;
		background-color: gainsboro;
		line-height: 80rpx;
		font-size: 34rpx;
		color: gray;
	}

	.account-content {
		width: 90%;
		margin-left: 5%;
		font-size: 30rpx;
		line-height: 1.5;
		margin-top: 20rpx;
		color: gray;

		text {
			color: $project-color;
		}
	}

	.account1 {
		width: 100%;
		height: auto;
		padding-left: 5%;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		background-color: gainsboro;
	}

	.account-q {
		width: 100%;
		height: auto;
		height: 100rpx;
		padding-left: 5%;
		line-height: 120rpx;
		font-size: 40rpx;
	}

	.payment {
		width: 100%;
		height: 260rpx;
		overflow: hidden;
	}

	.weixin {
		width: 100%;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
	}

	.Alipay {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
	}

	.paymentMethod-btn {
		width: 45rpx;
		height: 45rpx;
		background-color: gainsboro;
		float: right;
		margin-top: 22rpx;
		margin-right: 50rpx;
		border-radius: 40rpx;
	}

	.paymentMethod {
		float: left;
		margin-left: 5%;
		font-size: 34rpx;
		font-weight: 500;
		color: #2d2d2d;
	}

	.alipayAgrees {
		width: 76%;
		float: left;
		margin-left: 12%;
		line-height: 40rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #2d2d2d;
		opacity: 0.8;
	}

	.money1 {
		font-size: 30rpx;
	}

	.active {
		border: red 2rpx solid;
	}

	.medalImg {
		width: 46rpx;
	}

	.activ {
		background: url(../../static/success.png);
		background-size: 100% 100%;
	}

	.renewNow {
		margin-left: 2%;
		margin-top: 40rpx;
		text-align: center;
		line-height: 84rpx;
		color: white;
		width: 96%;
		height: 84rpx;
		background: $project-color;
		border-radius: 10px 10px 10px 10px;
		opacity: 1;
	}
</style>
