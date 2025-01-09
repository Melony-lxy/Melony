<template>
	<view class="home">
		<view class="u-search-box">
			<u-search placeholder="请输入您要搜索的内容" @custom="search" @search="search"></u-search>
		</view>

		<scroll-view scroll-y style="height: 90%; width: 100% background: #007AFF" @scrolltolower="onreachBottom">
			<view class="commodity" v-if="commodityList.length">
				<view class="commodityData flex wrap a-center j-between">
					<view class="commodityList" v-for="(item, index) in commodityList"
						@click="skip('/pagesShop/commodity/detail?id=' + item.id)" :key='index' style="height: 540rpx;">
						<u-image width="300rpx" height="330rpx" :src="common.imgUrl(item.img)" @error="imgerror(index)"></u-image>
						<view class="text ellipsis2 size32 fontWight">
							{{ item.name }}
						</view>
	
						<view class="flex a-center j-between">
							<view class="size22">
								<text class="price xprice">￥{{ item.price }}</text>
							</view>
							<view class="salesVolume flex j-end" style="align-items: center;">
								<!-- <text class="size22">{{ item.number }}</text> -->
								<text class="size22">销量:{{ item.salesVolume }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-empty v-else icon-size="350" text="暂无记录">
			</u-empty>
		</scroll-view>
	</view>
</template>

<script>
	import {
		browseList
	} from "@/plugin/api/product.js";
	export default {
		data() {
			return {
				commodityList: [],
				query: {},
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
			imgerror(i){
				this.commodityList[i].img='/static/images/default.png'
			},
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
				browseList({
					page: 1,
					limit: 20,
					query,
				}).then((res) => {
					if (type === "search") {
						this.commodityList = res.data.data;
					} else {
						this.commodityList = this.commodityList.concat(res.data.data);
					}
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

<style lang="scss" scoped>
	@import "@/pagesShop/scss/home.scss";
</style>
