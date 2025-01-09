<template>
	<view>
		<view class="rulebox" v-if="rule">
			<view class="title">
				常见问题
			</view>
			<view class="question">
				· 我的积分规则?
			</view>
			<view class="answer">
				发送一条动态可得{{rule.trends}}积分
			</view>
			<view class="answer">
				每日首次签到可得{{rule.sign_in}}积分
			</view>
			<view class="answer">
				发送一条计划可得{{rule.plan}}积分
			</view>
			<view class="answer">
				每日首次登录可得{{rule.login}}积分
			</view>
			<view class="answer">
				每日最多可得{{rule.max}}积分（不包括商场获取）
			</view>
			<view class="answer">
				购买商场商品每{{rule.shop}}元可得1积分
			</view>
			<view class="answer">
				购买商场商品每{{rule.deduction}}积分可抵扣1元
			</view>
			<view class="answer">
				积分最大抵扣比例为{{rule.scale}}%
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rule: ''
			};
		},
		onShow() {
			this.$axios({
				url: this.$url[102]
			}).then(res => {
				if (res.code == 0) {
					this.rule = res.data
				}
			})
		}
	}
</script>

<style lang="scss">
	.rulebox {
		padding: 30rpx;

		.title {
			font-size: 36rpx;
			margin-bottom: 40rpx;
			padding-left: 14rpx;
			color: #000;
		}

		.question {
			margin-bottom: 20rpx;
			font-size: 32rpx;
			color: #000;
		}

		.answer {
			font-size: 26rpx;
			color: #999;
			padding-left: 14rpx;
			margin-bottom: 20rpx;
			line-height: 2;
		}
	}
</style>
