<template>
	<view>
		<view class="balance" v-if="people && peoples">
			<view class="my-balance"> 我的余额 </view>
			<view class="balance-num"> {{(people.balance - people.amountWithdrawal) / 100}} </view>
		</view>
		<view class="title">
			<view class="left_line"></view>
			<view class="TitleText"> 提现金额 </view>
		</view>
		<input class="balance-input" v-model="select" name="input" placeholder="请输入提现金额" type="digit"
			:disabled="disabled" />
		<view class="num">
			<div v-for="(item, index) in Balance" :key="index" :class="{ active: selectPayment == index }"
				@click="clickNum(index)">{{item.num}}</div>
		</view>
		<view class="tips" @click="navigateTo()" v-if="peoples">
			<img :src="common.imgUrl('/static/wechat.png')" alt="">
			<text :class="{'isbinding':peoples.user.openid!=''}">{{peoples.user.openid!='' ? '已绑定'+(peoples.user.wx_nick==null? '': ':'+peoples.user.wx_nick): '去绑定'}}</text>
		</view>
		<view class="submit-button" @click="pushmoney()"> 申请提现 </view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				disabled: false,
				people: '',
				peoples:'',
				select: '',
				selectPayment: 5,
				Balance: [{
					num: '5元',
					value: 5
				}, {
					num: '10元',
					value: 10
				}, {
					num: '20元',
					value: 20
				}, {
					num: '50元',
					value: 50
				}, {
					num: '100元',
					value: 100
				}, {
					num: '自定义',
					value: ''
				}, ]
			};
		},
		onShow() {
			this.$axios({
				url: this.$url[113]
			}).then(res => {
				if (res.code == 0) {
					this.people = res.data
				}
			})
			this.$axios({
				url: this.$url[93]
			}).then(res => {
				if (res.code == 0) {
					this.peoples = res.data
				}
			})
		},
		methods: {
			navigateTo(){
				console.log(1111)
				uni.navigateTo({
					url: '/packgeA/empower/w'
				})
			},
			pushmoney() {
				if (this.select == '') {
					uni.showToast({
						title: '提现金额不能为空',
						icon: 'none'
					})
					return
				}
				if (this.select > (this.people.balance - this.people.amountWithdrawal) / 100) {
					uni.showToast({
						title: '提现金额不能大于余额',
						icon: 'none'
					})
					return
				}
				this.$axios({
					url: this.$url[117],
					data: {
						money: this.select * 100
					}
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '申请提现成功'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1, //返回层数，2则上上页
							})
						}, 2000)
					}
				})
			},
			clickNum(index) {
				if (index == 5) {
					this.disabled = false
				} else {
					this.disabled = true
				}
				this.selectPayment = index
				this.select = this.Balance[index].value
			}

		},
	}
</script>
<style lang="scss">
	.balance {
		width: 90%;
		height: 300rpx;
		background-color:  $project-color;
		border-radius: 20rpx;
		margin-left: 5%;
		margin-top: 20rpx;
		color: #fff;

		.my-balance {
			width: 90%;
			height: 100rpx;
			margin-left: 5%;
			line-height: 100rpx;
			font-size: 16px;
		}

		.balance-num {
			width: 90%;
			margin-left: 5%;
			font-size: 30px;
			font-weight: bold;
		}
	}

	.title {
		width: 90%;
		margin-left: 5%;
		height: 100rpx;
		display: flex;
		font-size: 32rpx;
		align-items: center;

		.left_line {
			margin-right: 20rpx;
			background-color:  $project-color;
			width: 6rpx;
			height: 40rpx;
		}

		.TitleText {
			line-height: 100rpx;
		}
	}

	.tips {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 20rpx;
		img {
			width: 30rpx;
			height: 30rpx;
			padding-right: 10rpx;
		}
	}

	.balance-input {
		width: 90%;
		height: 100rpx;
		margin-top: 20rpx;
		margin-left: 5%;
		border: 2rpx solid black;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
	}

	.num {
		width: 90%;
		margin-left: 5%;
		height: 270rpx;
		margin-top: 50rpx;
		display: flex;
		justify-content: space-between;
		flex-flow: row wrap;

		div {
			width: 30%;
			border-radius: 20rpx;
			height: 100rpx;
			border: 2rpx solid black;
			text-align: center;
			line-height: 100rpx;
			font-size: 20px;
		}
	}

	.submit-button {
		width: 90%;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 5%;
		background-color:  $project-color;
		border-radius: 20rpx;
		text-align: center;
		color: #fff;
		margin-top: 50rpx;
	}
	.isbinding{
		opacity: .9;
	}
	.active {
		border: 2rpx solid  $project-color !important;
		color:  $project-color;
	}
</style>
