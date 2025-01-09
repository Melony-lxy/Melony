<template>
	<view style="padding: 0 22rpx">
		<view class="classbox">
			<view class="class" v-for="(item,idx) in list" :key="idx" @click="gonext(item.id)">
				<img :src="common.imgUrl(item.img)">
				<view style="padding: 12rpx 18rpx;">
					<view class="itemName">
						{{item.name}}
					</view>
					<view class="classmoney" v-if="isios">
						<view class="price">
							￥{{item.price}}
						</view>
						<view class="purchase" >
							购买
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="no-arr" v-if="list.length === 0">
			<image :src="common.imgUrl('/static/images/no-comment.png')" mode=""></image>
			<text class="text">没有找到想要的</text>
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" v-if="list.length > 0" />
	</view>
</template>

<script>
	import caseList from "@/components/case-list/case-list.vue";
	export default {
		components: {
			caseList,
		},
		data() {
			return {
				scrollTop: 0,
				isios:false,				status: "loadmore",
				iconType: "flower",
				loadText: {
					loadmore: "轻轻上拉",
					loading: "努力加载中",
					nomore: "没有更多了",
				},
				search: "",
				swiperheight: 0,
				list: [],
				type: 0,
				page: 1,
				limit: 9,
				totalCount: 1,
			};
		},
		onLoad(option) {
			this.search = option.search;
			this.type = option.type;
			this.getList();
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight;
					this.swiperheight = height;
				},
			});
		},
		onShow() {
		  uni.getSystemInfo({
		      success: (res) => {
		       if(res.platform=='ios'){
		        this.$axios({
		         url: this.$url[103]
		        }).then(res => {
		         this.isios=res.data
		        })
		       }else{
		        this.isios=true
		       }
		      }
		     })
		 },
		methods: {
			gonext(i){
				uni.navigateTo({
					url:'/packgeA/curriculumDetails/curriculumDetails?id='+i
				})
			},
			getList() {
				if (this.page * this.limit >= this.totalCount && this.page != 1) {
					this.status = "nomore";
					return;
				}
				this.status = "loading";
				this.$axios({
					url: this.$url[9],
					data: {
						page: this.page,
						limit: this.limit,
						query: {
							search: this.search,
						},
					},
				}).then((data) => {
					if (data.code == 0) {
						const res = data.data;
						res.data.forEach((item) => {
							this.list.push({
								...item,
							});
						});
						uni.stopPullDownRefresh();
						// this.list = res.data
						this.totalCount = res.totalCount;
						this.page++;
						if (res.data.length == res.totalCount) {
							this.status = "nomore";
						} else {
							this.status = "loadmore";
						}
					}
				});
			},
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		/* 上拉刷新 */
		onPullDownRefresh() {
			this.page = 1;
			this.list = [];
			this.getList();
		},
		// 下拉加载
		onReachBottom() {
			this.getList();
		},
	};
</script>

<style scoped lang="scss">
	.classbox {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0 22rpx;
	}

	.class {
		padding-top: 24rpx;
		width: 324rpx;
		background: #fff;
		border-radius: 12rpx;
	}

	.purchase {
		width: 98rpx;
		height: 46rpx;
		background: #ff6638;
		opacity: 1;
		line-height: 46rpx;
		font-size: 26rpx;
		color: #fff;
		text-align: center;
		border-radius: 22rpx;
	}

	.price {
		font-size: 34rpx;
		font-weight: bold;
		color: #ff6638;
		opacity: 1;
	}

	.classmoney {
		justify-content: space-between;
		display: flex;
		align-items: center;
	}

	.class img {
		width: 100%;
		height: 216rpx;
		object-fit: cover;
	}

	.itemName {
		padding-bottom: 6rpx;
		width: 100%;
		height: 70rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #272727;
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin: 0;
		margin-bottom: 16rpx;
	}

	.no-arr {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 100rpx;
		text-align: center;
	}

	.text {
		margin-top: 20rpx;
		display: block;
		color: #989898;
	}

	.no-arr>image {
		width: 554rpx;
		height: 230rpx;
		object-fit: cover;
	}

	.uni-tab-bar {
		/* padding-top: 88px; */
		background: #f9f9f9;
		padding-top: 66upx;
	}

	.no-data {
		text-align: center;
		margin-top: 160upx;
	}

	.no-data>image {
		width: 450upx;
		height: 450upx;
	}
</style>
