<template>
	<view class="comment">
		<view class="size30 fontWight title">
			全部评论（{{ commentList.length }}）
		</view>
		<view v-if="commentList.length">
			<scroll-view scroll-y style="height: 100%; width: 100%" @scrolltolower="onreachBottom">
				<view class="commentList commentItem" v-for="(item, index) in commentList" :key="index">
					<view class="flex">
						<u-image class="img" width="75rpx" height="75rpx" :src="common.imgUrl(item.user.avatar)"
							shape="circle">
						</u-image>
						<view class="">
							<view class="">
								<view class="fontWight">
									{{ item.user.nick }}
								</view>
								<view class="color999 size26">
									{{ item.ctime }}
								</view>
							</view>
							<view class="commentText ellipsis2">
								{{ item.content }}
							</view>

							<u-upload :file-list="item.file" width="100rpx" height="100rpx" :show-progress="false"
								:deletable="false" :max-count="item.file.length"></u-upload>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="center none" v-else> 暂无评论~ </view>
	</view>
</template>

<script>
	
	import {
		commnentList
	} from "@/plugin/api/product.js";
	export default {
		
		data() {
			return {
				id: 0,
				commentList: [],
				page: 1,
				limit: 10,
				count: 0,
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.commnentList();
		},
		methods: {
			onreachBottom() {
				if (this.commentList.length < this.count) {
					uni.showLoading({
						title: "加载中",
					});
					this.page = 2;
					this.commnentList();
					return;
				}
				uni.showToast({
					icon: "none",
					title: "到底了",
				});
			},
			commnentList() {
				commnentList({
					id: this.id,
					page: this.page,
					limit: this.limit,
				}).then((res) => {
					if (res.code === 0) {
						let data = res.data.data.map((item) => {
							console.log(item.file, "item.file");
							item.file = item.file.map((j) => {
								j.url = this.common.imgUrl(j.url);
								return j;
							});
							return item;
						});
						console.log(data, "data");
						this.commentList = this.commentList.concat(data);
						this.$forceUpdate();
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg,
						});
					}
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/pagesShop/scss/commodityDetail.scss";
</style>
