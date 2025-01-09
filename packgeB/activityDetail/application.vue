<template>
	<view>
		<view class="box">
			<view class="item space-between u-f-ac">
				<view class="text">姓名 <view class="red">*</view>
				</view>
				<u-input placeholder="请输入姓名" :custom-style="{ fontSize: '32rpx', color: ' #2D2D2D' }"
					input-align="right" :clearable="false" v-model="form.name" maxlength="8" />
			</view>
			<view class="item space-between u-f-ac">
				<view class="text">联系方式 <view class="red">*</view>
				</view>
				<u-input placeholder="请输入联系方式" type="number" :custom-style="{ fontSize: '32rpx', color: ' #2D2D2D' }"
					input-align="right" :clearable="false" v-model="form.phone" maxlength="11" />
			</view>
			<view class="item space-between u-f-ac">
				<view class="text">公司名称 <view class="red">*</view>
				</view>
				<u-input placeholder="请输入公司名称" :custom-style="{ fontSize: '32rpx', color: ' #2D2D2D' }"
					input-align="right" :clearable="false" v-model="form.company" />
			</view>
			<view class="item space-between u-f-ac">
				<view class="text">公司职位 <view class="red">*</view>
				</view>
				<u-input placeholder="请输入公司职位" :custom-style="{ fontSize: '32rpx', color: ' #2D2D2D' }"
					input-align="right" :clearable="false" v-model="form.position" />
			</view>
		</view>
		<view class="confimBox">
			<u-button shape="circle" @click="application"
				:custom-style="{ height: '90rpx', background: '#042BE3',margin: '20rpx' }" type="success">
				{{ user ? '线下报名签到' : price == 0 ? '立即报名' : '去支付'}}
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				index: 0,
				price: 0,
				form: {},
				user: false,
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.index = opt.index || 0
			if (opt.user) {
				this.user = true
			}
		},
		onShow() {
			this.$axios({
				url: this.$url[120],
				data: {
					id: this.id
				}
			}).then(res => {
				if (res.code == 0) {
					const text = res.data.price
					this.price = 0
					if (text) {
						this.price = text[this.index].price
					}
					if (res.data.application) {
						this.form = res.data.application
					}
					if (res.data.isApplication) {
						uni.showToast({
							title: "活动已报名",
							icon: "none"
						})
						uni.navigateBack()
						return
					}
					if (!this.user && res.data.end) {
						uni.showToast({
							title: "活动报名时间已截止",
							icon: "none"
						})
						uni.navigateBack()
						return
					}
					if (res.data.status == 2) {
						uni.showToast({
							title: "活动已结束",
							icon: "none"
						})
						uni.navigateBack()
						return
					}
				}
			})
		},
		methods: {
			application() {
				if (!this.form.name) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return
				}
				if (!this.form.phone) {
					uni.showToast({
						title: '请输入联系方式',
						icon: 'none'
					})
					return
				}
				if (!this.isPhone()) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					})
					return
				}
				if (!this.form.company) {
					uni.showToast({
						title: '请输入公司名称',
						icon: 'none'
					})
					return
				}
				if (!this.form.position) {
					uni.showToast({
						title: '请输入公司职位',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '报名中'
				})
				this.$axios({
					url: this.$url[121],
					data: {
						id: this.id,
						index: this.index,
						...this.form,
						offline: this.user ? 1 : 0
					}
				}).then(res => {
					if (res.code == 0) {
						uni.hideLoading()
						if(this.user){
							uni.showToast({
								title: "报名签到成功",
								icon: "none"
							})
							uni.navigateBack()
						} else if (res.data.status) {
							uni.redirectTo({
								url: '/packgeB/activityDetail/payment?id=' + res.data.id
							})
						} else {
							uni.showToast({
								title: "报名成功",
								icon: "none"
							})
							setTimeout(()=>{
								uni.navigateBack()
							},100)
						}
					}
				})
			},
			isPhone() {
				let mPattern = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
				return mPattern.test(this.form.phone)
			},
		}
	}
</script>
<style lang="scss" scoped>
	/deep/.u-btn--success {
		color: #ffffff;
		border-color: $project-color;
		background-color: $project-color;
	}

	.box {
		padding: 36rpx 24rpx 0 24rpx;

		.headBox {
			margin-bottom: 92rpx;
		}

		.header {
			width: 123rpx;
			height: 123rpx;
			border-radius: 50%;
		}

		.text {
			display: flex;
			font-size: 32rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #2d2d2d;
			opacity: 1;

			.red {
				color: red;
			}
		}

		.item {
			padding: 20rpx 0;
			border-bottom: 1px solid #F1F1F1;
		}
	}

	.confimBox {

		/deep/ .u-success-hover {
			background-color: $project-color !important;
		}

		position: absolute;
		width: 100%;
		bottom: 0;
	}

	.uni-list-cell {
		overflow: hidden;
		margin-bottom: 54rpx;
		font-size: 32rpx;
	}

	.uni-list-cell-left {
		width: 50%;
		float: left;
		font-size: 32rpx;
	}

	.uni-list-cell-db {
		width: 50%;
		float: right;
		text-align: right;
		font-size: 32rpx;
	}

	.synopsis {
		font-size: 32rpx;

		view {
			font-size: 32rpx;
		}
	}

	textarea {
		width: 648rpx;
		border-radius: 12rpx;
		margin-top: 10rpx;
	}
</style>