<template>
	<!-- #ifdef MP-WEIXIN -->
	<view :style="{ height: comHeight  - 43 + 'px' }" v-show="showBox" class="acr">
		<scoll :list="scoll" @getIndex="getIndex1" :activeIndex.sync="activeIndex" ref="scoll" />
		<swiper :style="{ height: comHeight   - 94 + 'px' }" :current="activeIndex"
			@change="changeIndex" :duration="durations" @animationfinish="animationfinish">
	<!-- #endif -->
	<!-- #ifndef MP-WEIXIN -->
	<view :style="{ height: comHeight - 43 + 'px' }" v-show="showBox" class="acr">
		<scoll :list="scoll" @getIndex="getIndex1" :activeIndex.sync="activeIndex" ref="scoll" />
		<swiper :style="{ height: comHeight  - 84  + 'px' }" :current="activeIndex"
			@change="changeIndex" :duration="durations" @animationfinish="animationfinish">
	<!-- #endif -->
				<block>
					<swiper-item v-for="(item, index) in scoll.length" :key="index">
						<view class="swiper-item" :style="{ 'padding-bottom': padding + 10 + 'px' }">
							<scroll-view scroll-y="true"  style="height:100%;" @scrolltolower="getList" scroll-anchoring
								@refresherrefresh="refresherrefresh" @refresherrestore="refresherrestore"
								@refresherabort="refresherrestore" :refresher-triggered="refresherTriggered"
								:refresher-threshold="45" :refresher-enabled="true" refresher-background="#f9f9f9">
								<caseList style="padding-bottom: 100rpx" :list="arctanList[index].data" class="padding"
									:uid="uid" v-if="arctanList[index].hackReset" @pressEdit="pressEdit"
									:judgeWhich="judgeWhich" :personalcenter="personalcenter" />
								<view class="u-loadding" v-if="loadding">
									<u-loading mode="flower" size="40" />
								</view>
								<!-- 							<u-divider
								v-if="
									arctanList[activeIndex].page > 1 &&
										(arctanList[activeIndex].page - 1) * limit >=
											arctanList[activeIndex].totalCount &&
										arctanList[activeIndex].data.length != 0
								"
								style=""
							>
								没有更多了
							</u-divider> -->
								<u-divider v-if="arctanList[activeIndex].data.length != 0 && showtoast" style="">
									没有更多了
								</u-divider>
								<view class="" v-else style="margin-top: 50%">
									<nullData :paddingTop="90" style="min-height: 300rpx"></nullData>
								</view>
							</scroll-view>
						</view>
					</swiper-item>
				</block>
			</swiper>
			<casePopup ref="casePopup" :id="editId" @isDelete="isDelete" />
	</view>
</template>

<script>
	import scoll from "@/components/scoll.vue";
	import casePopup from "@/components/case-list/case-popup.vue";
	import caseList from "@/components/case-list/case-list.vue";
	export default {
		components: {
			caseList,
			scoll,
			casePopup
		},
		props: {
			comHeight: Number,
			padding: Number,
			judgeWhich: Number,
			uid: Number,
			personalcenter: String,
			pageNum: Number,
		},
		data() {
			return {
				isCenterStyle: {},
				refresherTriggered: false,
				_refresherTriggered: false, //是否开启下拉刷新
				more: false, //没有更多了
				loadding: false,
				durations: 500,
				activeIndex: 0,
				swiperheight: 0,
				showtoast: false,
				arctanList: [{
					data: [],
					page: 1,
					ctime: "",
					totalCount: 0,
					hackReset: true,
					deleteId: 0,
				}, ],
				label_id: 0,
				limit: 20,
				scoll: [{
					id: 0,
					name: "全部",
					type: false,
				}, 
				],
				totalCount: 0,
				editId: 0,
				showBox: true
			};
		},
		mounted() {
			let query = uni.createSelectorQuery().in(this);
			this.arctanList = [{
				data: [],
				page: 1,
				ctime: "",
				totalCount: 0,
				hackReset: true,
				deleteId: 0,
			}, ];
			query
				.select(".padding")
				.boundingClientRect((res) => {
					this.swiperheight = res.height;
				})
				.exec();
			this.getList();
			this.getCard();
		},
		watch: {
			pageNum(newValue, oldValue) {
				if (newValue == 1) {
					this.showtoast = false;
				}
				this.arctanList[this.activeIndex].page = newValue;
				if (this.showtoast == false) {
					this.getList();
				}
			},
		},
		methods: {
			// 用户长按操作
			pressEdit(item) {
				this.editId = item;
				this.$refs.casePopup.share();
			},
			// 自定义下拉刷新被触发
			refresherrefresh() {
				let _this = this;
				if (_this._refresherTriggered) {
					return;
				}
				_this._refresherTriggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true;
				}
				this.loadStoreData();
			},
			// 自定义下拉刷新被复位 自定义下拉刷新被中止
			refresherrestore() {
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			loadStoreData() {
				let _this = this;
				_this.arctanList[_this.activeIndex] = {
					data: [],
					page: 1,
					ctime: "",
					totalCount: 1,
					hackReset: false,
				};
				setTimeout((res) => {
					_this.showtoast = false;
					_this.getList();
				}, 1);
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
										_this.refresherrefresh()
									}
								});
						}
					},
				});
			},
			// 获取列表
			getCard() {
				this.$axios({
					url: this.$url[50],
					data: {
						type: 0,
					},
				}).then((res) => {
					if (res.code == 0) {
						let typeList = [];
						for (let i = 0; i < res.data.length; i++) {
							this.scoll.push({
								id: res.data[i].id,
								name: res.data[i].name,
								type: false,
							});
							this.arctanList[i + 1] = {
								data: [],
								page: 1,
								ctime: "",
								totalCount: 0,
								hackReset: true,
							};
						}
					}
				});
			},
			animationfinish(res) {
				// if (this.arctanList[this.activeIndex].data.length == 0) {
				// 	this.getList()
				// }
			},
			// 滑动切换
			changeIndex(res) {
				this.label_id = this.$refs.scoll.changeIndex(res.detail.current);
				this.activeIndex = res.detail.current;
				if (this.arctanList[this.activeIndex].data.length == 0) {
					this.getList("Refresh");
				}
				this.$refs.scoll.scollChange(res.detail.current);
			},
			getIndex1(res, item) {
				this.showtoast = false;
				this.label_id = item;
				this.durations = 0;
				this.activeIndex = res;
				setTimeout((res) => {
					this.durations = 500;
				}, 30);
			},
			getList(Refresh) {
				let arctanList = this.arctanList[this.activeIndex];
				if (
					(arctanList.page - 1) * this.limit >= arctanList.totalCount &&
					arctanList.page > 1
				) {
					return;
				}
				this.loadding = true;
				let axiosText = {};
				if (this.personalcenter == "personalcenter") {
					console.log(this.judgeWhich, this.uid);
					if (this.judgeWhich == 2) {
						axiosText = {
							type: 2,
							uid: this.uid,
							label_id: this.label_id,
						};
					} else if (this.judgeWhich == 0) {
						axiosText = {
							type: 0,
							uid: this.uid,
							label_id: this.label_id,
						};
					}
				}
				if (this.personalcenter == undefined || this.personalcenter == 0) {
					if (this.judgeWhich == undefined || this.judgeWhich == 0) {
						axiosText = {
							type: 0,
							label_id: this.label_id,
						};
					} else if (this.judgeWhich == 3) {
						axiosText = {
							type: 2,
							label_id: this.label_id,
						};
					}
				}
				this.$axios({
					url: this.$url[48],
					data: {
						page: arctanList.page,
						limit: this.limit,
						query: axiosText,
					},
				}).then((data) => {
					if (data.code == 0) {
						const res = data.data;
						this.loadding = false;
						if (this.showtoast) {
							uni.showToast({
								title: "已加载全部",
								icon: "none",
							});
							return;
						}
						if (this.refresherTriggered) {
							this.showBox = false;
							this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
							this._refresherTriggered = false;
							uni.showToast({
								title: "刷新成功",
								icon: "none",
							});
							this.$nextTick(() => {
								this.showBox = true;
							});
						}
						arctanList.hackReset = true;
						if (arctanList.page === 1) {
							arctanList.ctime = res.ctime;
						}
						arctanList.page++;
						arctanList.totalCount = res.totalCount;
						console.log('personalcenter111', this.personalcenter)
						console.log("this.judgeWhich", this.judgeWhich);
						if (res.data.length < this.limit) {
							this.showtoast = true;
						}
						res.data.forEach((item) => {
							arctanList.data.push({
								...item,
							});
						});
					}
				});
			},
		},
	};
</script>

<style scoped>
	.popur-class {
		background: #fff;
		padding: 20rpx;
		border-radius: 20rpx;
	}

	.uninterested-title {
		font-size: 30rpx;
		font-weight: 700;
	}

	.uninterested-title>text {
		margin-left: 10rpx;
	}

	.uninterested-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.uninterested-list {
		border: 2rpx solid #d3d4d6;
		background: #f4f4f5;
		color: #909399;
		padding: 0 20rpx;
		width: 48%;
		text-align: center;
		margin-bottom: 10rpx;
	}

	.uninterested-list:nth-child(2n + 0) {
		margin-left: 17rpx;
	}

	.swiper-item {
		height: 100%;
	}

	/deep/ .u-divider {
		/* 	position: relative;
	bottom:-50%; */
		margin-top: -100rpx !important;
	}

	/deep/ .nav-tab {
		margin: 0 20rpx;
	}
</style>
