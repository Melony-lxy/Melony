<template>
	<view class="home">
		<view class="u-search-box">
			<u-search placeholder="请输入您要搜索的内容" @custom="search" @search="search"></u-search>
		</view>

		<scroll-view scroll-y style="height: 90%; width: 100% background: #007AFF" @scrolltolower="onreachBottom"
			class="xscroll">
			<view class="commodity" v-if="commodityList.length">
				<view class="commodityData flex wrap a-center j-between">
					<view class="commodityList" v-for="(item, index) in commodityList"
						@click="skip('/pagesShop/commodity/detail?id=' + item.id)" style="height: 535rpx;">
						<img :src="common.imgUrl(item.img)"
							style="width: 100% !important;height:330rpx;object-fit:cover;" />
						<view class="" style="height: 100rpx;">
							<view class="text size32 ellipsis2 fontWight"> {{ item.name }} </view>
						</view>
						<!-- <view class="salesVolume flex a-center"
							:class="item.isAdditionalPurchase ? 'j-between' : 'j-end'">
							<view class="events" v-if="item.isAdditionalPurchase">
								享加购优惠
							</view>
							<text class="size22">{{ item.number }}</text>
						</view> -->
						<view class="flex j-between a-center priceItem">
							<view class="flex a-center">
								<text class="price size22">￥{{ item.price ? item.price : item.original_price }}</text>
								<text class="originalPrice color999 size22"
									v-if="item.price && item.price !== item.original_price * 1">{{
                    item.original_price ? "￥" + item.original_price : ""
                  }}</text>
							</view>
							<div class="size22">销量:{{ item.salesVolume }}</div>
						</view>
					</view>
				</view>
			</view>
			<u-empty v-else icon-size="350" text=" ">
			</u-empty>
		</scroll-view>
	</view>
</template>

<script>
	import {
		listJson
	} from "@/plugin/api/product.js";
	export default {
		data() {
			return {
				commodityList: [],
				query: {},
				totalCount: 0,
				page: 1
			};
		},
		onLoad(option) {
			if (option.mode === "search") {
				this.query = {
					search: option.value,
				};
			} else {
				this.query = {
					category_id: option.value,
				};
			}
			this.getList("search", this.query);
		},
		methods: {
			onreachBottom() {
				if (this.commodityList.length < this.totalCount) {
					this.page = this.page + 1;
					this.getList("concat", this.query);
					return;
				}
				uni.showToast({
					icon: "none",
					title: "到底了",
				});
			},
			search(value) {
				if (value) {
					this.query = {
						search: value,
					};
				} else {
					this.query = {};
				}
				this.getList("search", this.query);
			},
			getList(type, query) {
				listJson({
					page: this.page,
					limit: 20,
					query,
				}).then((res) => {
					if (type === "search") {
						this.commodityList = res.data.data;
					} else {
						this.commodityList = this.commodityList.concat(res.data.data);
					}
					this.totalCount = res.data.totalCount
				});
			},
			skip(url) {
				uni.navigateTo({
					url,
				});
			},
		},
	};
</script>

<style lang="scss">
	@import "@/pagesShop/scss/home.scss";
</style>