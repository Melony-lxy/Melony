<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<video v-if="currentResource" id="videoPlayer" autoplay :poster="currentPoster" :src="currentResource" style="width: 750rpx;">
		</video>
		<!-- #endif -->
		<!-- #ifdef H5 -->

		<view v-if="showvideo">
			<view ref="videos">
			  <view id="J_prismPlayer"></view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<video v-if="currentResource" id="videoPlayer" class="videoPlayer" autoplay :poster="currentPoster" :src="currentResource">
		</video>
		<!-- #endif -->
	</view>
</template>

<script>
	//#ifdef H5
	import '@/packgeA/components/common/aliplayercomponents-1.0.8.min.js'
	// #endif
	export default {
		name: "aliplayer",
		props: {
			videoId: {
				type: String,
				default: ''
			},
			showvideo: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				base_url: this.$base_url,
				currentPoster: '',
				currentResource: ''
			}
		},
		watch: {
			videoId(val) {
				this.getvideo(val)
			}
		},
		created() {
			// #ifdef H5
			// 使用阿里云播放器
			this.loadLinkString('https://g.alicdn.com/de/prismplayer/2.11.0/skins/default/aliplayer-min.css')
			this.loadScriptString('https://g.alicdn.com/de/prismplayer/2.11.0/aliplayer-min.js')
			// #endif
			this.getvideo(this.videoId)
		},
		methods: {
			loadScriptString(src) {
				var script = document.createElement('script') //创建一个script标签
				script.type = 'text/javascript'
				script.src = src
				script.charset = 'utf-8'
				document.getElementsByTagName('head')[0].appendChild(script)
			},
			loadLinkString(src) {
				var link = document.createElement('link') //创建一个link标签
				link.rel = 'stylesheet'
				link.href = src
				document.getElementsByTagName('head')[0].appendChild(link)
			},
			getvideo(videoId) {
				if (!videoId) {
					return
				}
				let data = {
					id: videoId
				}
				// #ifdef MP-WEIXIN
				data = {
					id: videoId,
					status: true
				}
				// #endif
				// #ifdef APP
				data = {
					id: videoId,
					status: true
				}
				// #endif
				this.$axios({
					url: '/course/getVideoUrl',
					data: data
				}).then(res => {
					if (res.code == 0) {
						// #ifdef MP-WEIXIN
						this.currentPoster = res.data.poster
						this.currentResource = res.data.url
						wx.createVideoContext("videoPlayer")
						// #endif
						// #ifdef APP
						this.currentPoster = res.data.poster
						this.currentResource = res.data.url
						wx.createVideoContext("videoPlayer")
						// #endif
						// #ifdef H5
				var player = new Aliplayer({
						vid: res.data.videoId, // 视频id
						playauth: res.data.PlayAuth, // 播
						id: 'J_prismPlayer',
						width: '100%',
						autoplay: true, // 自动播放,
						format: 'm3u8',
						mediaType: 'video',
						encryptType: 1,
						skinLayout: [{
								name: 'bigPlayButton',
								align: 'cc'
							},
							{
								name: 'H5Loading',
								align: 'cc'
							},
							{
								name: 'errorDisplay',
								align: 'tlabs',
								x: 0,
								y: 0
							},
							{
								name: 'infoDisplay'
							},
							{
								name: 'tooltip',
								align: 'blabs',
								x: 0,
								y: 56
							},
							{
								name: 'thumbnail'
							},
							{
								name: 'controlBar',
								align: 'blabs',
								x: 0,
								y: 0,
								children: [{
										name: 'progress',
										align: 'blabs',
										x: 0,
										y: 44
									},
									{
										name: 'playButton',
										align: 'tl',
										x: 15,
										y: 12
									},
									{
										name: 'timeDisplay',
										align: 'tl',
										x: 10,
										y: 7
									},
									{
										name: 'fullScreenButton',
										align: 'tr',
										x: 10,
										y: 12
									},
									{
										name: 'volume',
										align: 'tr',
										x: 5,
										y: 10
									}
								]
							}
						],
						components: [{
								name: 'QualityComponent',
								type: AliPlayerComponent.QualityComponent,
								args: [
									function(definition, desc) {
										console.log(definition + '-----' + desc)
									}
								]
							},
							{
								name: 'RateComponent',
								type: AliPlayerComponent.RateComponent
							}
						]
					},
					function(player) {
						console.log('播放器创建成功')
						// player.play()
						player.on('sourceloaded', function(params) {
							var paramData = params.paramData
							var desc = paramData.desc
							var definition = paramData.definition
							player.getComponent('QualityComponent').setCurrentQuality(desc,
								definition)
						})
					}
				)
				let top = document.documentElement.scrollTop || document.body.scrollTop
				// 实现滚动效果
				const timeTop = setInterval(() => {
					document.body.scrollTop = document.documentElement.scrollTop = top -= 50
					if (top <= 0) {
						clearInterval(timeTop)
					}
				}, 10)
						// #endif
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.videoPlayer{
		width: 750rpx;
	}
</style>
