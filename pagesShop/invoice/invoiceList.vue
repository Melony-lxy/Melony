<template>
	<view class="main">
		<view class="" v-if="list.length !== 0">
			<view class="item whiteBg" v-for="(item, index) in list" :key="index">
				<view class="flex productItem" v-for="product in item.product">
					<u-image class="img" width="158rpx" height="158rpx" :src="common.imgUrl(product.img)"></u-image>
					<view class="flex flex-column j-between right flex1">
						<view class="size30 fontWight ellipsis2">
							{{ product.product_name }}
						</view>
						<view class="size24 color999">
							购买数量：{{ product.number }}件
						</view>
					</view>
				</view>
				<view class="flex j-end">
					<view class="themeColor lookOver size26" @click="skip(item.order_id)">
						查看发票
					</view>
				</view>
			</view>
		</view>

		<u-empty v-else text="暂无发票" icon-size="180" font-size="30" margin-top="80"></u-empty>
	</view>
</template>

<script>
	import {
		invoiceList
	} from "@/plugin/api/order.js";

	export default {
		data() {
			return {
				list: [],
			};
		},
		onLoad() {
			this.invoiceList();
		},
		methods: {
			invoiceList() {
				invoiceList({
					page: -1,
					limit: -1,
				}).then((res) => {
					if (res.code === 0) {
						this.list = res.data.data;
					}
				});
			},
			skip(id) {
				uni.navigateTo({
					url: "/pagesShop/invoice/apply?id=" + id,
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	@import "@/pagesShop/scss/invoice/list.scss";
</style>
