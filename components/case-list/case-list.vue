<template>
	<view>
		<view class="main-wrap" style="width: 100%;">
			<u-waterfall v-model="flowList" ref="uWaterfall" style="width: 100%;" :judgeWhich='judgeWhich' :uid='uid' @pressEdit='pressEdit'>
			</u-waterfall>
		</view>
	</view>
</template>

<script>
	import {
		TYPE,
		STATUS
	} from "@/plugin/communication.js";
	import {verifyLogin} from '@/plugin/api/index.js'
	export default {
		props: {
			judgeWhich: Number,
			list: {
				type: Array,
				default: []
			},
			refresherTriggered: {
				type: Boolean,
				befault: false
			},
			uid: Number
		},
		mounted() {
			this.flowList = this.list
		},
		watch: {
			deleteId(res) {
				this.$refs.uWaterfall.remove(res);
			},
			list() {
				this.flowList = this.list
			}
		},
		data() {
			return {
				show: true,
				shows: true,
				flowList: [],
				colCount: 2,
				isLogin:false
			};
		},
		onShow() {
			verifyLogin().then(res => {
				if (res.code == 0) {
					this.isLogin = true
				}else{
					this.isLogin = false
				}
			})
		},	
		methods: {
			godetails(item) {
				if(this.isLogin){
					uni.navigateTo({
						url: "/packgeA/PersonalCenter/PersonalCenter?uid=" + item.user.id
					})
				}else{
					uni.showToast({
						icon: "none",
						title: '请登录',
						position: "bottom",
					});
					setTimeout((res) => {
						uni.reLaunch({
							url: "/packgeA/login/login",
						});
					}, 1000);
				}
			},
			// 编辑和删除
			pressEdit(id) {
				console.log(id)
				this.$emit('pressEdit', id)
			},
			details(index) {
				if (this.judgeWhich == undefined || this.judgeWhich == 0) {
					uni.navigateTo({
						url: "/packgeA/case/caseDetails/caseDetails?id=" + index,
						animationType: 'slide-in-bottom',
						animationDuration: 300
					});
				} else if (this.judgeWhich == 3) {
					uni.navigateTo({
						url: "/packgeA/case/videoplay?id=" + index,
						animationType: 'slide-in-bottom',
						animationDuration: 300
					});
				} else if (this.judgeWhich == 2) {
					uni.navigateTo({
						url: `/packgeA/case/videoplay?id=${index}&uid=${this.uid}`,
						animationType: 'slide-in-bottom',
						animationDuration: 300
					});
				}
				// console.log(index)
			},
			fabulous(item) {
				if (this.like_status == true) {
					this.shows = false;
				} else {
					this.shows = true;
				}
				let changeStatus = 0;
				if (item.like_status) {
					changeStatus = 1;
				}
				this.$axios({
					url: this.$url[51],
					data: {
						id: item.id,
						type: TYPE.COMMUNICATION,
						status: STATUS.LIKE,
						changeStatus: changeStatus,
					}
				}).then((res) => {
					if (res.code == 0) {
						if (item.like_status) {
							uni.showToast({
								title: '取消点赞成功',
								icon: 'none'
							})
							item.like_count--;
						} else {
							uni.showToast({
								title: '点赞成功',
								icon: 'none'
							})
							item.like_count++;
						}
						item.like_status = !item.like_status
					}
				})
			},
		},
	};
</script>

<style scoped>
	.align-center image {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.radio-flex {
		display: flex;
		align-items: center;
	}

	.radio {
		width: 6rpx;
		height: 6rpx;
		margin-right: 6rpx;
		background-color: #999;
		border-radius: 50%;
	}

	.list-user-width {
		width: 120upx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.list-user-nick {
		color: rgb(128 129 131);
		font-size: 22upx;
	}

	.list-user {
		padding: 14upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.list-user-l {
		display: flex;
		align-items: center;
	}

	.list-user-image {
		width: 32upx;
		height: 32upx;

	}

	.list-user-images,
	.list-user-image {
		border-radius: 50%;
		margin-right: 10upx;
	}

	.list-user-images {
		width: 36upx;
		height: 36upx;
		box-shadow: 0 3upx 10upx #00000010;
	}

	.list-text {
		padding: 0 26upx;
	}

	.lock>image {
		width: 18.46upx;
		height: 18.56upx;
		margin-right: 13upx;
	}

	.lock-img {
		display: inline-block;
	}

	.lock {
		width: 140px;
		margin: 14upx 0 0;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		display: inline-block;
		padding: 6upx 13upx;
		background: rgba(255, 238, 228, 1);
		border-radius: 6upx;
		line-height: 1.2;
		/* 		border: 1px solid rgba(255, 94, 0, 1); */
		color: rgba(255, 94, 0, 1);
		font-size: 20upx;
	}

	.list-title {
		color: rgba(26, 36, 48, 1);
		padding: 14upx 0 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		font-weight: 700;
		/* 		white-space: nowrap;
		text-overflow: ellipsis; */
		font-size: 30rpx;
		-webkit-box-orient: vertical;
		overflow: hidden;
		box-sizing: border-box;
		/* 		max-height: 134rpx; */
	}

	.list-bottom {
		margin-top: 0;
	}

	.align-center {
		display: flex;
		align-items: center;
	}

	.list-bottom uni-view {
		line-height: normal;
	}

	.main-wrap {
		display: flex;
		/* 	flex-wrap: wrap; */
	}


	.list {
		margin-top: 20upx;
		position: relative;
		border-radius: 5px;
		overflow: hidden;
		transition: 1.3s;

		box-shadow: 0 3upx 10upx #00000005;
	}

	.image-text {
		vertical-align: bottom;
		background: #e6e6e6;
		width: 100%;
		object-fit: cover;
		max-height: 400rpx;
		border-radius: 3upx 3upx 0 0;
		overflow: hidden;
	}

	.list {
		background: #fff;
	}

	.type {
		position: absolute;
		bottom: 5px;
		left: 20upx;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		font-size: 20upx;
		padding: 0 20upx;
		border-radius: 10px;
	}


	.nickname {
		font-size: 14px;
		margin-left: 9upx;
		color: #999;
	}

	.title {
		line-height: 1;
		font-size: 30upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 30upx 0;
	}
</style>
