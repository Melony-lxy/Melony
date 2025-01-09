<template>
	<view class="applyclassrepresentative">
		<view class="personalinformation">
			<view class="title">
				<view class="left_line"></view>
				<view class="TitleText">个人信息</view>
			</view>
			<view class="form">
				<view class="telephone">
					<view class="form_left">
						<view class="important">*</view>
						<view class="">手机号：</view>
					</view>
					<view class="form_right">
						<u-input
							v-model="telephone"
							placeholder="请输入手机号"
							:clearable="false"
							input-align="right"
						/>
					</view>
				</view>
				<view class="Verification_Code">
					<view class="form_left">
						<view class="important">*</view>
						<u-input v-model="code" placeholder="请输入验证码" :clearable="false" />
					</view>
					<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<!-- <u-button type="success" @click="getCode" size='mini'
							:custom-style='{background:"#FF6638"}'> {{tips}} </u-button> -->
					</view>
					<view class="form_right">
						<view class="CodeBtn" @click="getCode">{{ tips }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="personalinformation">
			<view class="title">
				<view class="left_line"></view>
				<view>账户信息绑定</view>
			</view>
			<view class="wechat">
				<view class="wechat-img"></view>
				<view class="wechat-content">提现至微信</view>
				<view class="wechat-binding"><view class="CodeBtn">获取验证码</view></view>
			</view>
			<view class="form">
				<view class="telephone">
					<view class="form_left">
						<view class="important">
							*
						</view>
						<view class="">
							持卡人姓名：
						</view>
					</view>
					<view class="form_right">
						<u-input v-model="name" placeholder='持卡人姓名' :clearable='false' input-align='right' />
					</view>
				</view>
				<view class="telephone">
					<view class="form_left">
						<view class="important">
							*
						</view>
						<view class="">
							持卡人身份证
						</view>
					</view>
					<view class="form_right">
						<u-input v-model="card" placeholder='持卡人身份证' :clearable='false' input-align='right' />
					</view>
				</view>
				<view class="telephone">
					<view class="form_left">
						<view class="important">
							*
						</view>
						<view class="">
							银行卡号
						</view>
					</view>
					<view class="form_right">
						<u-input v-model="bank_num" placeholder='银行卡号' :clearable='false' input-align='right' />
					</view>
				</view>
				<view class="telephone">
					<view class="form_left">
						<view class="important">
							*
						</view>
						<view class="">
							银行
						</view>
					</view>
					<view class="form_right bank_right" @click="show=true">
						<view class="" :style="{color:bank=='银行'?'#c0c4cc':'#000'}">
							{{bank}}
						</view>
						<view class="">
							<image :src="common.imgUrl('/static/images/table_right.png')" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- <view class="tips">
			<view class="tips_title">温馨提示:</view>
			<view class="tips_content">1.银行卡绑定后不可修改，所有课代表收入只能提现到该账户;</view>
			<view class="tips_content">2.持卡人姓名需要与课代表注册用户一致，否则会审核不通过;</view>
		</view> -->
		<view class="applybtn" @click="submit()">提交</view>
		<u-popup v-model="show" mode="bottom">
			<view class="search">
				<view class="search_input">
					<view class="popup_input">
						<u-input v-model="search" :clearable="false" placeholder="" @input="blur()" />
					</view>
					<view class="popup_outbox">
						<scroll-view scroll-y="true" class="popup_box">
							<view class="choose" v-for="(item, i) in bank_list" :key="i" @click="choose_bank(item)">
								{{ item.name }}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tips: '',
			seconds: 60,
			telephone: '',
			show: false,
			bank: '银行',
			bank_list: [],
			search: '',
			search_copy: '',
			code: '',
			card: '',
			bank_num: '',
			name: ''
		}
	},
	onShow() {
		this.$axios({
			url: this.$url[89]
		}).then(res => {
			if (res.code == 0) {
				if (res.data == false) {
					uni.switchTab({
						url: '/pages/my/my'
					})
				}
			}
		})
		this.$axios({
			url: this.$url[91]
		}).then(res => {
			if (res.code == 0) {
				this.bank_list = res.data
			}
		})
	},
	watch: {
		search(newValue, oldValue) {
			if (newValue == '') {
				this.$axios({
					url: this.$url[91]
				}).then(res => {
					if (res.code == 0) {
						this.bank_list = res.data
					}
				})
			}
		}
	},
	methods: {
		codeChange(text) {
			this.tips = text
		},
		//验证码
		isPhone() {
			let mPattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
			return mPattern.test(this.telephone)
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
						phone: this.telephone
					}
				}).then(res => {
					if (res.code == 0) {
						uni.hideLoading()
						this.$u.toast('验证码已发送')
						this.$refs.uCode.start()
					}
				})
			} else {
				this.$u.toast('倒计时结束后在发送')
			}
		},
		submit() {
			this.$axios({
				url: this.$url[92],
				data: {
					phone: this.telephone,
					card_name: this.name,
					card_identify: this.card,
					code: this.code
				}
			}).then(res => {
				if (res.code == 0) {
					this.bank_list = res.data
					 uni.navigateBack({
					         delta: 1})
					uni.showToast({
						title:'提交成功'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,//返回层数，2则上上页
						})
					},2000)

				}
			})
		},
		blur() {
			if (this.search_copy == this.search) {
				return
			}
			this.$axios({
				url: this.$url[91],
				data: {
					name: this.search
				}
			}).then(res => {
				if (res.code == 0) {
					this.bank_list = res.data
				}
			})
		},
		choose_bank(i) {
			this.show = false
			this.bank = i.name
		}
	}
}
</script>

<style lang="scss">
.applyclassrepresentative {
	// background-color: #cfcfcf;
	padding-bottom: 30rpx;
	.applybtn {
		width: 95%;
		margin: 0 auto;
		margin-top: 100rpx;
		text-align: center;
		font-size: 36rpx;
		color: #fff;
		background-color: #ff6638;
		line-height: 100rpx;
		border-radius: 100rpx;
		font-weight: bold;
	}
	.tips {
		width: 95%;
		margin: 0 auto;
		margin-top: 80rpx;
		.tips_title {
			font-size: 36rpx;
			margin: 20rpx 0;
			opacity: 0.8;
		}
		.tips_content {
			font-size: 30rpx;
			opacity: 0.6;
			line-height: 1.8;
		}
	}
	.search {
		background: #c0c4cc;

		.search_input {
			width: 95%;
			margin: 0 auto;
			padding-top: 40rpx;

			.popup_input {
				background-color: #fff;
				border-radius: 100rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 20rpx;
			}

			.popup_outbox {
				padding: 40rpx 0;
			}

			.choose {
				width: 90%;
				margin: 0 auto;
				line-height: 100rpx;
				border-bottom: 2rpx solid #c0c4cc;
			}

			.popup_box {
				background-color: #fff;
				height: 500rpx;
				border-radius: 10rpx;
			}
		}
	}

	.personalinformation {
		background-color: #fff;

		.title {
			width: 95%;
			margin: 0 auto;
			display: flex;
			font-size: 32rpx;
			align-items: center;
			margin-top: 30rpx;

			.left_line {
				margin-right: 20rpx;
				background-color: #ff6638;
				width: 6rpx;
				height: 40rpx;
			}

			.TitleText {
				opacity: 0.8;
			}
		}
		.wechat {
			width: 95%;
			margin: 0 auto;
			display: flex;
			height: 100rpx;
			margin-top: 30rpx;
			.wechat-img {
				width: 17%;
				height: 100%;
			}
			.wechat-content {
				width: 60%;
				height: 100%;
			}
			.wechat-binding {
				width: 23%;
				height: 100%;
				.CodeBtn {
					padding: 16rpx 24rpx;
					background: #ff6638;
					color: #fff;
					font-size: 24rpx;
					border-radius: 100rpx;
				}
			}
		}

		.form {
			width: 95%;
			margin: 0 auto;

			.bank_right {
				display: flex;

				// > :first-child {
				// 	font-size: 24rpx;
				// 	color: #c0c4cc;
				// }

				uni-image {
					padding-left: 10rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}
			.form_left {
				display: flex;
				align-items: center;
			}

			.Verification_Code {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0rpx 0;
				.CodeBtn {
					padding: 16rpx 24rpx;
					background: #ff6638;
					color: #fff;
					font-size: 24rpx;
					border-radius: 100rpx;
				}
			}

			.important {
				color: red;
				padding-right: 10rpx;
			}

			.telephone {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 40rpx 0;
			}
		}
	}
}
</style>
