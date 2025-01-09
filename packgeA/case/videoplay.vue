<template>
	<view class="content">
		<videoPlay v-if="showVideo" video-height="100vh" :data="videoData" @refresh="refresh" @loadMore="loadMore"
			@fabulous="fabulous" @follow="follow" @commentFabulous="commentFabulous" :pageNum='pageNum'
			:limitNum='limitNum' @setpage='setpage' :showfollowup='showfollowup'>
		</videoPlay>
		<view v-else>
			<!-- #ifdef H5 -->
			<image :src="common.imgUrl('/static/images/right_black.png')" mode="widthFix" class="video_out"
				@click="out()"></image>
			<!-- #endif -->
			<!-- #ifdef APP -->
			<image :src="common.imgUrl('/static/images/right_black.png')" mode="widthFix" class="video_out"
				@click="out()"></image>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<image :src="common.imgUrl('/static/images/right_black.png')" mode="widthFix" class="video_out"
				@click="out()"></image>
			<!-- #endif -->
			<view class="out_text">视频已全部加载</view>
		</view>
	</view>
</template>

<script>
	import videoPlay from '@/packgeA/components/y-video-slide/y-video-slide.vue'
	export default {
		components: {
			videoPlay
		},
		data() {
			return {
				pageNum: 0,
				limitNum: 5,
				showmore: true,
				showVideo: false,
				videoData: [],
				urloption: '',
				page: 0,
				showfollowup: true
			}
		},
		onShow() {
			if (this.videoData.length != 0) {
				this.showfollowup = false
				this.$axios({
					url: this.$url[49],
					data: {
						id: this.videoData[this.page].id
					}
				}).then(res => {
					console.log('res', res)
					let restext = res.data
					let resListText = {}
					let resList = []
					for (let i = 0; i < restext.comment.length; i++) {
						resListText = {
							// 准备id在子页面显示
							userId: restext.comment[i].id,
							//用户头像
							userHead: restext.comment[i].user.avatar_url,
							//用户昵称
							userNick: restext.comment[i].user.nick,
							//评论内容
							content: restext.comment[i].content,
							//评论时间
							time: restext.comment[i].ctime,
							//点赞数量
							fabulousCount: restext.comment[i].like,
							//是否点赞
							isFabulous: restext.comment[i].like_status,
							//用户id 
							user: restext.comment[i].uid
						}
						resList.push(resListText)
					}

					let videoData = {
						// 关注的用户
						commentId: restext.user.id,
						videoUrl: restext.video_url,
						id: restext.id.toString(),
						// 是否关注
						followup: restext.follow,
						// 关注数量
						FollowCount: restext.collection,
						//是否关注
						isFollow: restext.collection_status,
						//是否点赞
						isFabulous: restext.like_status,
						//用户昵称
						userNick: restext.user.nick,
						//用户头像        
						userHead: restext.user.avatar_url,
						//视频描述信息
						videoContent: restext.title,
						//点赞数量
						fabulousCount: restext.like,
						//评论数量
						commentCount: restext.comment.length,
						commentObj: {
							count: restext.comment.length,
							list: resList
						},
						cid: restext.cid,
						course: restext.course
					}
					this.videoData[this.page] = videoData
					this.showfollowup = true
				})
			}
		},
		onLoad(option) {
			this.urloption = option
			this.getDataList()
			var box = function(e) {
				passive: false;
			};
			document.body.style.overflow = 'hidden';
			document.addEventListener("touchmove", box, false);
			// this.$nextTick(function(){
			// 	this.getMoreList()
			// })
		},
		beforeDestroy() {
			var box = function(e) {
				passive: false
			};
			document.body.style.overflow = ''; // 出现滚动条
			document.removeEventListener("touchmove", box, false);
		},
		methods: {
			setpage(i) {
				this.page = i
			},
			getDataList(i) {
				let pageId = ''
				if (i == undefined) {
					pageId = this.urloption.id
				} else {
					pageId = i
				}
				this.$axios({
					url: this.$url[49],
					data: {
						id: pageId
					}
				}).then(res => {
					console.log('res', res)
					let restext = res.data
					let resListText = {}
					let resList = []
					for (let i = 0; i < restext.comment.length; i++) {
						resListText = {
							// 准备id在子页面显示
							userId: restext.comment[i].id,
							//用户头像
							userHead: restext.comment[i].user.avatar_url,
							//用户昵称
							userNick: restext.comment[i].user.nick,
							//评论内容
							content: restext.comment[i].content,
							//评论时间
							time: restext.comment[i].ctime,
							//点赞数量
							fabulousCount: restext.comment[i].like,
							//是否点赞
							isFabulous: restext.comment[i].like_status,
							//用户id 
							user: restext.comment[i].uid
						}
						resList.push(resListText)
					}

					let videoData = {
						// 关注的用户
						commentId: restext.user.id,
						videoUrl: restext.video_url,
						id: restext.id.toString(),
						// 是否关注
						followup: restext.follow,
						// 关注数量
						FollowCount: restext.collection,
						//是否关注
						isFollow: restext.collection_status,
						//是否点赞
						isFabulous: restext.like_status,
						//用户昵称
						userNick: restext.user.nick,
						//用户头像        
						userHead: restext.user.avatar_url,
						//视频描述信息
						videoContent: restext.title,
						//点赞数量
						fabulousCount: restext.like,
						//评论数量
						commentCount: restext.comment.length,
						commentObj: {
							count: restext.comment.length,
							list: resList
						},
						cid: restext.cid,
						course: restext.course
					}
					this.videoData.push(videoData)
					console.log(this.videoData)
					this.$nextTick(function() {
						this.showVideo = true
					})
				})
			},
			getMoreList() {
				let query = {}
				if (this.urloption.uid == undefined) {
					query = {
						type: 2
					}
				} else {
					query = {
						uid: this.urloption.uid,
						type: 2
					}
				}
				this.$axios({
					url: this.$url[48],
					data: {
						page: this.pageNum,
						limit: this.limitNum,
						query
					}
				}).then(res => {
					if (res.code == 0) {
						if (res.data.data.length < this.limitNum) {
							this.showmore = false
						}
						res.data.data.forEach(item => {
							if (item.id != this.urloption.id) {
								this.getDataList(item.id)
							}
						})
					}
				})
			},
			refresh() {
				this.showVideo = false
				this.pageNum++
				this.getMoreList()
				this.videoData.splice(0, 2);
				console.log('video', this.videoData)
				if (this.videoData.length != 0) {
					this.$nextTick(function() {
						this.showVideo = true
					})
				}

			},
			loadMore() {
				if (!this.showmore) {
					uni.showToast({
						title: '视频已全部加载',
						icon: 'none'
					});
				} else {
					this.pageNum++
					this.getMoreList()
					uni.showToast({
						title: '请再次下滑',
						icon: 'none'
					});
				}
			},
			fabulous(video, flag) {
				// uni.showToast({
				//     title:'点赞',
				//     icon:'none'
				// });
			},
			follow(video, flag) {
				console.log(video, flag)
			},
			out() {
				uni.navigateBack()
			},
			commentFabulous(comment) {
				console.log(comment)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: auto !important;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.video_out {
		position: absolute;
		top: 30rpx;
		left: 30rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.out_text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%);
	}
</style>