<template>
	<page-meta>

		<head>
			<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
		</head>
	</page-meta>
	<view>
		<video-player v-if="playerOptions.sources.length > 0" class="video-player vjs-custom-skin" ref="videoPlayer"
			:playsinline="true" :options="playerOptions"></video-player>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				playerOptions: {
					// controls: true,
					live: true,
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					autoplay: false, //如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [],
					poster: this.common.imgUrl("/static/images/test.jpg"), //你的封面地址
					// width: document.documentElement.clientWidth, //播放器宽度
					notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true //全屏按钮
					}
				},
				globalOptions: {
					autoplay: true,
					controls: true,
					// preload: 'auto',
					// fluid: false,
					// muted: false,
					controlBar: {
						remainingTimeDisplay: false,
						playToggle: {},
						progressControl: {},
						fullscreenToggle: {},
						volumeMenuButton: {
							inline: false,
							vertical: true,
						},
					},
					techOrder: ["html5"],
					plugins: {},
				},
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getSectionDetails()
		},
		methods: {
			// 获取科节详情
			getSectionDetails() {
				this.$axios({
					url: this.$url[15],
					data: {
						id: this.id
					}
				}).then(res => {
					if (!res.data.end) {
						uni.showModal({
							title: '提示',
							content: '课程已结束',
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									});
								}
							}
						});
						return
					}
					if (res.data.join_url) {
						this.playerOptions.sources = [{
							type: "application/x-mpegURL", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
							src: res.data.join_url //url地址
						}]
					} else {
						uni.showModal({
							title: '提示',
							content: '课程暂未开始',
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									});
								}
							}
						});
						return
					}
				})
			},
			//播放状态改变回调
			playerStateChanged(playerCurrentState) {
				// console.log('player current update state', playerCurrentState)
			},
		}
	}
</script>
