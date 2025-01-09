<template>
	<view class="padding">
<!-- 		<u-sticky style="background-color: #fff">
			<view class="tab align-center">
				<block v-for="(item, index) in tablist" :key="index">
					<view class="list tabList" @tap="clickEvent(index)" :class="activeIndex == index ? 'active' : ''">
						{{ item.title }}
					</view>
				</block>
			</view>
		</u-sticky> -->
		<!-- <view class="uni-tab-bar"> -->
<!-- 			<view class="" v-show="activeIndex == 0">
				<view class="three-padding"> </view>
			</view> -->
			<view class="">
				<view class="three-padding" v-if="showlist">
					<case-list :list="arctanList.data" @pressEdit="pressEdit"/>
				</view>
				<view class="no-data" v-if="arctanList.totalCount == 0">
					<u-empty text="收藏列表为空" mode="" :src="common.imgUrl('/static/images/no-data.png')" />
				</view>
			</view>
			<casePopup ref="casePopup"  @isDelete="isDelete" :id="editId"/>
		<!-- </view> -->
	</view>
</template>

<script>
	import caseList from "@/components/case-list/case-list.vue";
	import casePopup from "@/components/case-list/case-popup.vue";
	export default {
		components: {
			caseList,
			casePopup
		},
		data() {
			return {
				editId:0,
				loadding: false,
				swiperheight: 0,
				activeIndex: 1,
				tablist: [{
						title: "课程",
						number: 0,
					},
					{
						title: "动态",
						number: 0,
					},
				],
				arctanList: {
					data: [],
					page: 1,
					ctime: "",
					totalCount: 1,
				},
				tabListW: 0,
				tabListL: 0,
				id: 0,
				limit: 10,
				transition: false,
				showlist:true
			};
		},
		onLoad(option) {
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		let height = res.windowHeight - uni.upx2px(120);
			// 		this.swiperheight = height;
			// 	},
			// });
		},
		onShow() {
			this.getList();
		},
		onReady() {
			// this.clickEvent(this.activeIndex);
		},
		onPullDownRefresh() {
			if (this.activeIndex == 0) {} else {
				this.arctanList = {
					data: [],
					page: 1,
					ctime: "",
					totalCount: 1,
				}
				this.showlist=false
				this.$nextTick(function(){
					this.showlist=true
					this.getList()
				})
			}
		},
		onReachBottom() {
			if (this.activeIndex == 0) {} else {
				this.getList();
			}
		},
		methods: {
			// 用户长按操作
			pressEdit(item) {
			  this.editId = item;
			  this.$refs.casePopup.share();
			},
			// 删除指定数据
			isDelete(id) {
			  this.$refs.casePopup.cancel();
			  const _this = this;
			  uni.showModal({
			    title: "提示",
			    content: "您确定删除该动态?",
			    success: (res) => {
			      if (res.confirm) {
			        _this
			          .$axios({
			            url: this.$url[52],
			            data: {
			              id,
			            },
			          })
			          .then((data) => {
			            if (data.code == 0) {
			              uni.showToast({
			                title: "删除成功",
			                icon: "none",
			              });
			            }
			          });
			      }
			    },
			  });
			},
			// 获取晒一晒
			getList() {
				if (
					(this.arctanList.page - 1) * this.limit >= this.arctanList.totalCount &&
					this.arctanList.page > 1
				) {
					return;
				}
				this.loadding = true;
				this.$axios({
						url: this.$url[48],
						data: {
							page: this.arctanList.page,
							limit: this.limit,
							query: {
								// ctime: this.arctanList.ctime,
								collection: true,
							},
						},
					})
					.then((data) => {
						if (data.code == 0) {
							const res = data.data;
							if (this.arctanList.page === 1) {
								this.arctanList.ctime = res.ctime;
							}

							this.arctanList.page++;
							this.arctanList.totalCount = res.totalCount;
							res.data.forEach((item) => {
								this.arctanList.data.push({
									...item,
								});
							});
							uni.stopPullDownRefresh();
							this.tablist[1].number = res.totalCount;
							this.loadding = false;
						}
					})
					.catch((res) => {
						uni.stopPullDownRefresh();
						this.loadding = false;
					});
			},
			clickEvent(index) {
				this.activeIndex = index;
				let query = uni.createSelectorQuery().in(this);
				query
					.selectAll(".tabList")
					.boundingClientRect((res) => {
						this.tabListW = res[index].width * 0.6;
						this.tabListL = res[index].left - 10;
					})
					.exec();
			},
		},
	};
</script>

<style scoped>
	.transition {
		transition: 0.3s;
	}

	.No_transition {
		transition: 0s;
	}

	.three-padding {
		padding: 0 27upx;
	}

	.followList::after {
		content: "";
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 1px;
		background: rgba(232, 232, 232, 1);
		transform: scaleY(0.5);
	}

	.no-data {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.padding {
		padding-bottom: 40rpx;
	}

	.block-left {
		display: flex;
		align-items: center;
	}

	.block-user {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}

	.active {
		/* 		transition: .2s; */
		font-size: 32rpx;
		font-weight: 700;
		color: #000000;
	}

	.block-nick {
		width: 24upx;
		height: 24upx;
		border-radius: 50%;
	}

	.block-name {
		color: rgba(51, 51, 51, 1);
		margin: 0 15upx 0 25upx;
	}

	.has,
	.noticed,
	.color {
		color: rgba(255, 255, 255, 1);
		font-size: 24upx;
		padding: 8upx 40upx;
		border-radius: 60upx;
		display: inline-block;
	}

	.noticed {
		background-color: #ff5e00;
	}

	.color {
		border: 2rpx solid #ff5e00;
		color: #ff5e00;
	}

	.has {
		background: rgba(232, 232, 232, 1);
	}

	.disappearing {
		animation: disappearing 1s normal;
		animation-fill-mode: forwards;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transform-origin: 0 50%;
	}

	.uni-tab-bar {
		background: #f9f9f9;
		min-height: 100vh;
	}

	@keyframes disappearing {
		from {
			opacity: 1;
			transform: scale(1);
		}

		to {
			position: fixed;
			opacity: 0;
			transform: scale(0);
		}
	}

	.tab {
		padding: 55upx 0 10upx;
		display: flex;
		justify-content: space-around;
		margin: 0 auto;
		background-color: #fff;
		top: 0;
		color: #999;
		transition: 0.3s;
		font-size: 28upx;
	}

	.list {
		padding-right: 10px;
	}

	.line {
		transition: 0.2s;
		background: rgba(255, 94, 0, 1);
		height: 5upx;
		border-radius: 3upx;
		/* 	width: 100upx; */
		margin: 0 auto;
	}

	.follow-list {
		flex-wrap: wrap;
		width: 690upx;
		margin: 0 auto;
		margin-top: 20px;
	}

	.name {
		font-size: 30upx;
		color: #333;
		margin-top: -60upx;
	}
</style>
