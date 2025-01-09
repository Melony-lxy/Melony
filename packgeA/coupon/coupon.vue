<template>
	<view>
		<view class="tabsBox">
			<u-tabs :list="tablist" :is-scroll="false" :current="current" @change="change" active-color='#FEA406'></u-tabs>
		</view>

		<view class="listBox">
			<view class="item">
				<view class="green" :style="current!=0?'background-color: #999999':''"></view>
				<view class="centerBox flex u-f-ac">
					<image :src="common.imgUrl('/static/couponImg/beOverdue.png')" mode="" class="invalid" v-if="current==2"></image>
					<image :src="common.imgUrl('/static/couponImg/img1.png')" mode="" class="invalid" v-if="current==1"></image>
					<view class="leftBox" :class="{textGrey:current!=0}">
						<view><text class="icon">￥</text><text class="price">200</text></view>
						<view class="text">满199元可用</view>
					</view>
					<view class="rightBox flex-shrink" :class="{textGrey:current!=0}">
						<view class="rightText u-f-ac flex">
						
								<image class="icon" v-if="current==0" :src="common.imgUrl('/static/couponImg/img2.png')" mode=""></image>
								<image class="icon"  v-else   :src="common.imgUrl('/static/couponImg/img3.png')" mode=""></image>
							
							<text>仅购买课程时使用</text>
						</view>
						<view class="buttonBox flex u-f-ac">
							<text class="date" :class="{textGrey:current!=0}">2021.02.28-2021.03.12</text>
							<view class="button" v-if="current===0">
								去使用
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tablist: [{
					name: '未使用',
					count: 1
				}, {
					name: '已失效',
					count: 1
				}, {
					name: '已过期',
					count: 5
				}],
				current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
	}
</style>
<style lang="scss" scoped>
	.tabsBox {
		padding-top: 44rpx;
		background-color: white;
		box-shadow: 0 0 5px rgba(184, 184, 184, 0.7);
	}

	.listBox {
		padding: 21rpx 29rpx;
		.item {
			background-color: white;
			border-radius: 20rpx;
			margin-bottom: 22rpx;
			.green {
				background: #FF6638;
				height: 14rpx;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
			}
			.centerBox {
				position: relative;
				padding: 32rpx 0;
				.invalid{
					position: absolute;
					top: 0;
					right: 0;
					width: 100rpx;
					height: 75rpx;
				}
				.leftBox {
					color: #FF6638;
					text-align: center;
					font-family: Source Han Sans SC;
					margin-left: 42rpx;
					margin-right: 83rpx;
					.icon {
						font-size: 24rpx;
						font-weight: bold;
				
					}
					.price {
						font-size: 66rpx;
						font-weight: bold;
					}
					.text {
						font-size: 28rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
					}
				}
				.rightBox {
					.rightText {
						font-size: 28rpx;
						font-family: Source Han Sans SC;
						font-weight: bolder;
						.icon{
							width: 73rpx;
							height: 30rpx;
						    margin-right: 20rpx;
						}
					}
					.date {
						font-size: 20rpx;
						font-family: Source Han Sans SC;
						font-weight: 400;
						color: #666666;
						// margin-right: 86rpx;
					}

					.buttonBox {
						margin-top: 41rpx;
						padding-bottom: 10rpx;
						border-bottom: 1px dashed #999999;
						.button {
							width: 134rpx;
							height: 38rpx;
							background: #FF6638;
							line-height: 38rpx;
							text-align: center;
							border-radius: 19rpx;
							font-size: 24rpx;
							color: white;
							margin-left: 30rpx;
						}
					}
				}
			}
		}
	}

	.textGrey {
		color: #999999 !important;
	}
</style>
