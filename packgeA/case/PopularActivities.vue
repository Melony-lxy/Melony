<template>
	<view>
		<!-- <view class="header">
			<p>
				<i
					class="uni-btn-icon"
					@click="back()"
					style="color: rgb(0, 0, 0); font-size: 27px; float: left; margin-top:21rpx;"
				>
					
				</i>
			</p>
			<p class="popular"><strong>专题</strong></p>
			<p></p>
		</view> -->

		<view class="PopularContent" v-if="special">
			<view class="Content" v-for="(item, i) in special" :key="i" @click="TopicDetails(item.id)">
				<view class="Content-img">
					<img :src="common.imgUrl(item.fileList[0])" alt="" />
					<view class="Content-content">
						<view class="Originator1">进行中</view>
					</view>
				</view>
				<p class="content1">#{{ item.title }}#</p>
				<p class="content2" v-html="common.content(item.content)" v-if='item.content'></p>
				<view class="NumberP">
					<view class="people">{{ item.total_count }}人</view>
					<view class="participate">
						去参与
						<image class="rightIcon" :src="common.imgUrl('/static/my/right.png')" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="wrap">
			<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
				<view class="Content">
					<view class="Content-img">
						<view class="Content-content">
							<view class="Originator1">进行中</view>
							<view class="Originator">发起人</view>
						</view>
					</view>
					<p class="content1"><strong>#艺术问答#</strong></p>
					<p class="content2">不及格笔记覅不及格笔记</p>
					<p class="content2"><strong>...</strong></p>
					<view class="NumberP">
						<view class="people">366人</view>
						<view class="participate" @click="topicDetails()">去参与></view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'PopularActivities',
		components: {},
		data() {
			return {
				triggered: false,
				status: 'loadmore',
				list: 15,
				page: 0,
				special: []
			}
		},
		onReachBottom() {
			if (this.page >= 3) return
			this.status = 'loading'
			this.page = ++this.page
			setTimeout(() => {
				this.list += 10
				if (this.page >= 3) this.status = 'nomore'
				else this.status = 'loading'
			}, 2000)
		},
		onLoad() {
			this._freshing = false
			setTimeout(() => {
				this.triggered = true
			}, 1000)
		},
		mounted() {
			this.getList()
		},
		methods: {
			TopicDetails(index) {
				uni.navigateTo({
					url: '/packgeA/case/topicDetails?id=' + index
				})
			},
			back() {
				if (window.history.length <= 1) {
					this.$router.push({
						path: '/'
					})
					return false
				} else {
					this.$router.go(-1)
				}
			},
			onPulling(e) {
				console.log('onpulling', e)
			},
			onRefresh() {
				if (this._freshing) return
				this._freshing = true
				setTimeout(() => {
					this.triggered = false
					this._freshing = false
				}, 3000)
			},
			onRestore() {
				this.triggered = 'restore' // 需要重置
				console.log('onRestore')
			},
			onAbort() {
				console.log('onAbort')
			},
			getList() {
				this.$axios({
					method: 'POST',
					url: '/communication/specialList',
					data: {
						page: 1,
						limit: 20
					}
				}).then(res => {
					if (res.code == 0) {
						this.special = res.data.data
					}
					console.log('专题', res)
				})
			}
			// getList(Refresh) {
			// 	let arctanList = this.arctanList[this.activeIndex]
			// 	if ((arctanList.page - 1) * this.limit >= arctanList.totalCount && arctanList.page > 1) {
			// 		return
			// 	}
			// 	this.loadding = true
			// 	this.$axios({
			// 		url: this.$url[48],
			// 		data: {
			// 			page: arctanList.page,
			// 			limit: this.limit,
			// 			query: {
			// 				label_id: this.label_id,
			// 				ctime: arctanList.ctime
			// 			}
			// 		}
			// 	}).then(data => {
			// 		if (data.code == 0) {
			// 			const res = data.data
			// 			this.loadding = false
			// 			if (this.refresherTriggered) {
			// 				this.refresherTriggered = false //触发onRestore，并关闭刷新图标
			// 				this._refresherTriggered = false
			// 				uni.showToast({
			// 					title: '刷新成功',
			// 					icon: 'none'
			// 				})
			// 			}
			// 			arctanList.hackReset = true
			// 			if (arctanList.page === 1) {
			// 				arctanList.ctime = res.ctime
			// 			}
			// 			arctanList.page++
			// 			arctanList.totalCount = res.totalCount
			// 			res.data.forEach(item => {
			// 				arctanList.data.push({
			// 					...item
			// 				})
			// 			})
			// 		}
			// 	})
			// }

		}
	}
</script>

<style>
	.rightIcon {
		width: 12rpx;
		height: 20rpx;
		margin-left: 10rpx;
		color: black;
	}

	.item {
		font-size: 28rpx;
	}

	body {
		background-color: gainsboro;
	}

	.header {
		width: 100%;
		height: 100rpx;
		background: white;
		line-height: 100rpx;
	}

	.popular {
		width: 100rpx;
		height: 80rpx;
		font-size: 20px;
		margin-left: 40rpx;
		text-align: center;
		line-height: 88rpx;
	}

	.Content {
		width: 90%;
		margin-left: 5%;
		height: 600rpx;
		margin-top: 50rpx;
		background: white;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		border: 1px solid #e6e6e6;
	}

	.Originator1 {
		text-align: center;
		line-height: 50rpx;
		margin-top: 43rpx;
		margin-left: 23rpx;
		font-size: 20rpx;
		color: #ffffff;
		width: 110rpx;
		height: 50rpx;
		background: #f24646;
		border-radius: 20px 20px 20px 20px;
		opacity: 1;
	}

	.Content-img {
		width: 100%;
		height: 400rpx;
		position: relative;
		color: azure;
	}

	.Content-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.Content-content {
		width: 100%;
		line-height: 80rpx;
		position: absolute;
		top: 0%;
		left: 0%;
		display: flex;
		justify-content: space-between;
	}

	.NumberP {
		width: 90%;
		margin-left: 5%;
		margin-top: 20rpx;
		line-height: 50rpx;
		height: 50rpx;
		display: inline-block;
		display: flex;
		justify-content: space-between;
	}

	.content1 {
		font-size: 38rpx;
		font-weight: bold;
		color: #333333;
		width: 90%;
		margin-left: 5%;
		height: 100rpx;
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 120rpx;
	}

	.content2 {
		width: 90%;
		margin-left: 5%;
		height: 100rpx;
		display: block;
		font-size: 30rpx;
		font-weight: 400;
		color: #999999;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 50rpx;
	}

	/deep/ .content2 p {
		width: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		white-space: break-spaces;
		text-overflow: ellipsis;
	}
	/deep/ .content2 p:nth-child(2){
		width: 100%;
		overflow: hidden !important;
		white-space:nowrap !important;
		display: block !important;
		height: 50rpx;
		text-overflow: ellipsis;
	}

	.people {
		color: #666666;
	}

	.participate {
		color: #666666;
	}
</style>
