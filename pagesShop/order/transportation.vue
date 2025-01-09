<template>
	<view class="main">
		<view class="">
			<view class="fontWight size36"> 物流信息： </view>
			<view class="text">
				物流公司：<text>{{ data.express }}</text>
			</view>
			<view class="text">
				物流单号：<text>{{ data.shipping_no }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		orderInfo
	} from "@/plugin/api/order.js";
	export default {
		data() {
			return {
				data: {
					express: "",
					shipping_no: "",
				},
			};
		},
		onLoad(option) {
			this.orderInfo(option.id);
		},
		methods: {
			orderInfo(id) {
				orderInfo({
					id,
				}).then((res) => {
					this.data = res.data;
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.main {
		padding: 20rpx;
		background-color: #ffffff;

		.text {
			margin-top: 20rpx;
		}
	}
</style>
