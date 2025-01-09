<template>
	<view class="index">
		<view class="content">
			<view class="title"> 常见问题 </view>
			<view class="question"> · 合伙人佣金是多少? </view>
			<view class="answer"> 因设置不同,商品的佣金金额存在差异，具体佣金金额以总后台设置为准。 </view>
			<view class="question"> · 如何邀请客户购买? </view>
			<view class="answer"> 1.进入自己的商城/商品详情,点击“转发”生成海报分享出去，或直接将商品链接分享出去。 </view>
			<view class="answer"> (注:请确认所使用账号为合伙人账号，否则将不计入业绩。) </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.index{
	.content{
		padding: 30rpx;
		.title{
			font-size: 36rpx;
			margin-bottom: 40rpx;
			padding-left: 14rpx;
			color: #000000;
		}
		.question{
			margin-bottom: 20rpx;
			font-size: 32rpx;
			color: #000000;
		}
		.answer{
			font-size: 26rpx;
			color: #999;
			padding-left: 14rpx;
			margin-bottom: 20rpx;
			line-height: 2;
		}
	}
}
</style>
