<template>
	<view>
		<u-popup v-model="showshare" mode="bottom" @maskClick="hide" :isDirectClose="true">
			<view class="more-list align-center">
				<!-- #ifdef H5 -->
					<view class="more-item" @tap="sharefriend()">
						<image :src="common.imgUrl('/static/more-weixin.png')" mode=""></image>
						<view class="more-title">分享给好友</view>
					</view>
				<!-- #endif --> 
				<!-- #ifdef APP -->
					<view class="more-item" @tap="sharepeople('WXSceneSession')">
						<image :src="common.imgUrl('/static/more-weixin.png')" mode=""></image>
						<view class="more-title">微信</view>
					</view>
					<view class="more-item" @tap="sharecircle('WXSceneTimeline')">
						<image :src="common.imgUrl('/static/more-friend.png')" mode=""></image>
						<view class="more-title">朋友圈</view>
					</view>
				<!-- #endif -->
				
				<!-- <view class="more-item" @tap="shareEvent('qq')">
					<image :src="common.imgUrl('/static/more-qq.png')" mode=""></image>
					<view class="more-title">QQ</view>
				</view> -->
			</view>
			<view class="cancel" @tap="hide">取消</view>
		</u-popup>
		<!-- <view class="more-wrap" >
			<view class="more animated slideInUp">
				
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			url: {
				type: String,
			},
			shareData: {
				type: Object,
			},
		},
		data() {
			return {
				showshare: false,
			};
		},
		watch: {
			show(newValue, oldValue) {
				this.showshare = this.show;
			},
			showshare(newValue, oldValue) { 
				this.$emit("hide", newValue);
			},
		},
		mounted() {},
		methods: {
			hide() {
				this.$emit("hide", false);
			},
			sharefriend(){
				this.$emit("hide", false);
				this.$emit('sharefriend')
			},
			sharepeople(item) {
				console.log()
				// #ifdef H5
				let ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					this.$axios({
						url: this.$url[43],
						data: {
							id: this.shareData.id,
							pic: this.shareData.img,
							title: this.shareData.title,
							description: this.shareData.instructions,
							url: "/h5/packgeA/login/login?type=" + this.shareData.id,
						},
					}).then((res) => {
						if (res.code == 0) {
							this.common.hShare(res.data);
						}
					});
				}
				// #endif
			},
			sharepeople(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: this.$base_url + this.url,
					title: this.shareData.title,
					summary: this.shareData.instructions,
					imageUrl: this.common.imgUrl(this.shareData.img),
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			sharecircle(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneTimeline",
					type: 0,
					href: this.$base_url + this.url,
					title: this.shareData.title,
					summary: this.shareData.instructions,
					imageUrl: this.common.imgUrl(this.shareData.img),
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			shareEvent() {
				console.log('shareData',this.shareData)
				// this.getProvider(type, weixinType)
			},
			//获取服务供应商
			getProvider(type, weixinType) {
				if (this.shareData.title) {
					console.log(this.shareData)
				} else {
					this.shareData.title = this.shareData.user.nick + '的晒一晒'
				}
				uni.getProvider({
					service: 'share',
					success: e => {
						if (type == 'qq') {
							uni.share({
								provider: type,
								type: 1,
								href: this.$base_url + this.url,
								title: this.shareData.name,
								summary: this.shareData.instructions,
								mageUrl: this.common.imgUrl(this.shareData.img),
								success: function(res) {
									console.log('success:' + JSON.stringify(res))
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err))
								}
							})
						} else {
							this.share(type, weixinType)
						}
					}
				})
			},
			//分享
			share(type, weixinType) {
				if (weixinType) {
					uni.share({
						provider: type,
						scene: weixinType,
						href: this.$base_url + this.url,
						title: this.shareData.title,
						summary: this.shareData.instructions,
						imageUrl: this.common.imgUrl(this.shareData.img),
						success: function(res) {
							console.log('success:' + JSON.stringify(res))
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err))
						}
					})
				}
			}
		},
		created() {
			console.log("create");
		},
	};
</script>

<style scoped>
	.more-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.more-title {
		font-size: 24rpx;
	}

	.more {
		position: absolute;
		bottom: 0;
		width: 100%;
		background: #fff;
		z-index: 2;
	}

	.more-list {
		justify-content: space-around;
		padding: 20upx 0;
	}

	.more-item {
		text-align: center;
		margin: 0 20upx;
		font-size: 24rpx;
	}

	.more-item>image {
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}

	.more-item>view {
		/* margin-top: -20upx; */
	}

	.cancel {
		border-top: 1px solid #e6e6e6;
		padding: 10upx 0;
		text-align: center;
	}
</style>
