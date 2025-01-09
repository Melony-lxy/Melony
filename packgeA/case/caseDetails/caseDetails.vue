<template>
	<view v-if="detail">
		<scroll-view scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true"
			:style="{ height: contentH + 'px' }">
			<!-- 主体 -->
			<view class="" v-if="detail.file || detail.video_url">
				<video :src="common.imgUrl(detail.video_url ? detail.video_url : '')" controls style="width: 100%;"
					autoplay v-if="detail.video_url"></video>
				<swiper :indicator-dots="true" :interval="3000" :duration="500" style="height:440upx;" circular="true"
					indicator-color="rgba(232, 232, 232, 1)" indicator-active-color="#2f6bdd" v-else>
					<swiper-item v-for="(item, index) in detail.file" :key="index">
						<view class="swiper-items">
							<image style="object-fit: cover;" mode="aspectFill" :src="common.imgUrl(item)"
								@tap="previewImage(index)"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="account">
					<view class="main-user" v-if="detail.user">
						<view class="user-l">
							<view class="user-l-img" @click="gocenter(detail)">
								<image :src="common.imgUrl(detail.user.avatar_url)" mode="aspectFill"
									class="user-img-shaw"></image>
								<view class="user-l-r">
									<view class="user-l-r-t">
										<view class="user-l-title">{{ detail.user.nick }}</view>
										<view class="user-nick" v-if="detail.user.gender !== '0'">
											<image :src="sex[detail.user.gender - 1]" mode=""></image>
										</view>
									</view>
								</view>
							</view>
							<template v-if="informationlist.id != detail.user.id">
								<view class="userbutton" v-if="showbutton">
									<button type="default" plain @click="tofollow(0)" v-if="!detail.follow"
										class="isfollow">
										<text>关注</text>
									</button>
									<button type="default" plain @click="tofollow(1)" v-else class="outfollow">
										<text>取消关注</text>
									</button>
								</view>
							</template>
							<template v-else>
								<view @click="deleteId()">
									<image :src="common.imgUrl('/static/images/delete.png')" mode="widthFix"
										class="deleteImg"></image>
								</view>
							</template>
						</view>
					</view>
					<!-- 标题 -->
					<view class="case-list">
						<view class="list-title">{{ detail.title }}</view>
						<view class="case-list" style="white-space: pre-line;line-height: 1.5 !important;"
							v-html="common.content(detail.instructions)" />
						<view v-html="common.content(detail.content)" v-if="detail.content"></view>
					</view>
					<!-- 标签 -->
					<view class="autolabel" v-if="detail.label.length !== 0">
						<view class="autolabel-title">标签:</view>
						<view class="autolabel-item ">
							<view class="lock autolabel-margin" v-for="(item, index) in detail.label" :key="index"> #
								{{ item.name }}
							</view>
						</view>
					</view>
					<!-- 专题 -->
					<view class="autolabel" v-if="detail.special != ''">
						<view class="autolabel-title">专题:</view>
						<view class="autolabel-item ">
							<view class="lock autolabel-margin" @click="tospecial(detail.special.id)"> #
								{{ detail.special.title }}
							</view>
						</view>
					</view>
					<!-- 交流圈 -->
					<view class="autolabel" v-if="detail.exchange != ''">
						<view class="autolabel-title">交流圈:</view>
						<view class="autolabel-item ">
							<view class="lock autolabel-margin" @click="jumpCase(detail.exchange.id)"> #
								{{ detail.exchange.title }}
							</view>
						</view>
					</view>
					<!-- 机构 -->
					<view class="autolabel" v-if="detail.orgName">
						<view class="autolabel-title">所在机构:</view>
						<view class="autolabel-item">
							<view class="lock autolabel-margin"># {{ detail.orgName }}</view>
						</view>
					</view>
					<!-- 课程 -->
					<view class="autolabel" v-if="detail.course">
						<view class="autolabel-title">课程:</view>
						<!-- <view class="autolabel-item" @click="getUrl">
							<view class="lock autolabel-margin"># {{ detail.course.name }}</view>
						</view> -->
						<view class="item" @click="getUrl">
							<view class="itemLeft">
								<image :src="common.imgUrl(detail.course.img)" mode="aspectFill" class=""></image>
							</view>
							<view style="" class="info">
								<view class="itemName">{{ detail.course.name }}</view>
								<view class="teacherText"></view>
								<view class="bottomBox space-between u-f-ac">
									<view class="price">
										<text style="font-size: 20rpx;">￥</text>
										{{ detail.course.price }}
									</view>
									<view class="purchase">去购买</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 时间 -->
					<!-- 		<view class="ctimer" v-if="item.utime">
						{{item.utime}}
					</view> -->
				</view>
			</view>
			<!-- 评论列表 -->
			<view class="assess-wrap">
				<view class="assess-wrap-flex">
					<view class="assess-title" v-if="detail.comment">共{{ detail.comment.length }}条评论</view>
					<!-- <view class="assess-title" @click="feedPack(detail.title)">举报</view> -->
				</view>
				<template v-if="detail.comment.length != 0">
					<block v-for="(item, index) in detail.comment" :key="index">
						<assess :assessList="item" @focusEvent="focusEvent" @refresh="refresh"></assess>
					</block>
				</template>
				<template v-else>
					<view class="no-data" style="margin-top: 40upx;">
						<image :src="common.imgUrl('/static/images/no-comment.png')" mode="aspectFit"></image>
						<view class="">暂无评论</view>
					</view>
				</template>
				<view id="last">

				</view>
			</view>
		</scroll-view>
		<!-- 评论-->
		<view class="assess-bottom align-center">
			<view class="assess-input" style="transition: .8s;">
				<input type="text" confirm-type="send" placeholder="说点什么吧..." v-model="release" :focus="focus"
					@confirm="getRelease" @tap="focesEve" style="padding-left: 20rpx;" />
			</view>
			<view class="assess-right align-center" v-show="detail.comment">
				<view class="statistics align-center">
					<view class="iconfont" @tap="changeLike">
						<image v-if="!detail.like_status" class="img" :src="common.imgUrl('/static/case/blove.png')"
							mode="">
						</image>
						<image v-else class="img" :src="common.imgUrl('/static/case/blove2.png')" mode=""></image>
						<text class="icon-text">{{ detail.like }}</text>
					</view>
					<view class="iconfont" @tap="changeCollection">
						<image v-if="!detail.collection_status" class="img"
							:src="common.imgUrl('/static/case/collection1.png')" mode="">
						</image>
						<image v-else class="img" :src="common.imgUrl('/static/case/collection2.png')" mode=""></image>
						<text class="icon-text">{{ detail.collection }}</text>
					</view>
					<view class="iconfont icon-pinglun">
						<image class="img" :src="common.imgUrl('/static/images/eyes.png')" mode=""></image>
						<!-- <image class="img" :src="common.imgUrl('/static/eyes.png')" mode=""></image> -->
						<text class="icon-text">{{ detail.view_count }}</text>
					</view>
				</view>
				<!-- <view class="submit" @tap="getRelease">发表</view> -->
			</view>
		</view>
		<!-- 分享 -->
		<share :show="show" @hide="hide" @sharefriend='sharefriend' :url="'caseShare?id=' + id" :shareData="detail">
		</share>
		<QrcodePoster ref="poster" :title="detail.title" :headerImg="detail.file[0]" subTitle='' abImg=''
			:item="detail.id" v-if="detail.file" type='page' :show='QrcodePoster' @show='showQrcodePoster'>
		</QrcodePoster>
	</view>
</template>
<script>
	import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'
	import {
		TYPE,
		STATUS
	} from '@/plugin/communication.js'
	import assess from '@/packgeA/components/assess.vue'
	import share from '@/components/share/share.vue'
	import {
		verifyLogin
	} from '@/plugin/api/index.js'
	export default {
		components: {
			assess,
			share,
			QrcodePoster
		},
		data() {
			return {
				space: uni.upx2px(-10), //滑动条和item的左右间距
				QrcodePoster: false,
				status: ['jpg'],
				sex: [this.common.imgUrl('/static/case/boy.png'), this.common.imgUrl('/static/case/girl.png')],
				shows: true,
				showss: true,
				id: 0,
				uid: 0,
				contentH: 0,
				scrollTop: 0,
				follow: false,
				title: '',
				nickname: '',
				content: [],
				ctime: '',
				collection: 0,
				collection_status: false,
				like_status: false,
				like: 0,
				comment_count: 0,
				release: '',
				assessList: [],
				show: false,
				focus: false,
				comment_id: 0,
				user_state: true,
				shareData: {},
				instructions: '',
				imageList: [],
				imgStatus: true,
				detail: {
					avatar: '',
					label: [],
					comment: []
				},
				type: '',
				typetitle: '',
				showbutton: true,
				informationlist: '',
				is_show_model: true,
				urloption: '',
				isLogin: false
			}
		},
		onLoad(option) {
			this.urloption = option
			this.type = this.urloption.type
			//option为object类型，会序列化上个页面传递的参数
			this.id = parseInt(option.id)
			this.initdata()
			this.getpeople()
			// this.anchorPoint()
		},
		onShow() {
			verifyLogin().then(res => {
				if (res.code == 0) {
					this.isLogin = true
				} else {
					this.isLogin = false
				}
			})
		},
		mounted() {
			// 	console.log(this.status)
			// if (this.urloption.type != undefined) {
			// 	this.getType()
			// }
		},
		onUnload() {
			if (this.$store.state.page != '') {
				uni.reLaunch({
					url: '/pages/my/my'
				})
				this.$store.commit('changepage', '')
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.show = true
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.detail.title,
				imageUrl: this.detail.file ? this.common.imgUrl(this.detail.file[0]) : '',
				path: '/packgeA/case/caseDetails/caseDetails?id=' + this.detail.id
			}
		},
		onShareTimeline() {
			return {
				title: this.detail.title,
				imageUrl: this.detail.file ? this.common.imgUrl(this.detail.file[0]) : '',
				path: '/packgeA/case/caseDetails/caseDetails?id=' + this.detail.id
			}
		},
		methods: {
			showQrcodePoster() {
				this.QrcodePoster = false
			},
			sharefriend() {
				this.is_show_model = false
				this.QrcodePoster = true
				// this.$refs.poster.showCanvas(this.detail.file[0])
			},
			getUrl() {
				uni.navigateTo({
					url: '/packgeA/curriculumDetails/curriculumDetails?id=' + this.detail.cid +
						'&communicationId=' + this.detail.id
				})
			},
			deleteId() {
				uni.showModal({
					title: '提示',
					content: '您确定删除该动态吗?',
					success: res => {
						if (res.confirm) {
							this.$axios({
								url: this.$url[52],
								data: {
									id: this.detail.id
								}
							}).then(data => {
								if (data.code == 0) {
									uni.showToast({
										title: '删除成功',
										icon: 'none'
									})
									setTimeout(() => {
										uni.reLaunch({
											url: '/pages/case/case'
										})
									}, 1000)
								}
							})
						}
					}
				})
			},
			getpeople() {
				this.$axios({
					url: this.$url[79]
				}).then(res => {
					if (res.code == 0) {
						this.informationlist = res.data
					}
				})
			},
			// 跳转到个人中心
			gocenter(i) {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/packgeA/PersonalCenter/PersonalCenter?uid=' + i.uid
					})
				} else {
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
			// 关注
			tofollow(i) {
				if (this.isLogin) {
					if (i == 1) {
						uni.showModal({
							title: "提示",
							content: "您确定取消关注么?",
							success: (res) => {
								if (res.confirm) {
									this.$axios({
										url: this.$url[51],
										data: {
											id: this.detail.user.id,
											status: 3,
											changeStatus: i
										}
									}).then(res => {
										if (res.code == 0) {
											this.detail.follow = false
											uni.showToast({
												title: '取消关注',
												icon: 'none'
											})
										}
									})
								}
							}
						})
					} else {
						this.$axios({
							url: this.$url[51],
							data: {
								id: this.detail.user.id,
								status: 3,
								changeStatus: i
							}
						}).then(res => {
							if (res.code == 0) {
								this.detail.follow = true
								uni.showToast({
									title: '关注成功',
									icon: 'none'
								})
							}
						})
					}
				} else {
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
			// 跳转到交流圈列表
			jumpCase(i) {
				uni.navigateTo({
					url: '/packgeA/case/circleDetails?id=' + i
				})
			},
			feedPack(title) {
				uni.navigateTo({
					url: '/pages/me/feedback/feedback?title=' + title
				})
			},
			// 查看用户详情
			details(item) {
				if (item.is_anonymous == 0) {
					uni.navigateTo({
						url: '/pages/others-core/others-core?uid=' + item.user.id
					})
				} else {
					console.log(item.is_anonymous)
				}
			},
			refresh() {
				this.initdata()
			},
			//查看图片
			previewImage(index) {
				console.log(this.detail.file)
				let file = []
				this.detail.file.forEach(item => {
					file.push(this.common.imgUrl(item))
				})
				uni.previewImage({
					current: index,
					urls: file
				})
			},
			hide(e) {
				this.show = e
			},
			tospecial(i) {
				uni.navigateTo({
					url: '/packgeA/case/topicDetails?id=' + i
				})
			},
			focesEve() {
				this.comment_id = 0
				this.detail.comment_id = 0
			},
			initdata() {
				uni.showLoading({
					title: '加载中'
				})
				this.$axios({
					url: this.$url[49],
					data: {
						id: this.id
					}
				}).then(res => {
					if (res.code == 0) {
						this.detail = res.data
						this.comment_id = this.detail.id
						let status1 = this.detail.file.map(res => {
							var index1 = res.lastIndexOf('.')
							var status = res.substring(index1 + 1, res.length)
							return status
						})
						if (status1[0] == 'png' || status1[0] == 'jpg' || status1[0] == 'jpeg' || status1[0] ==
							'gif' || status1[0] == 'img') {
							this.status = true
						} else {
							this.status = false
						}
						uni.hideLoading()
					}
				}).catch(res => {
					uni.hideLoading()
				})
				try {
					const sty = uni.getSystemInfoSync()
					this.contentH = sty.windowHeight - uni.upx2px(98)
				} catch (e) {}
			},
			anchorPoint() {
				let q = uni.createSelectorQuery().in(this)
				let itemH = q.select('.assess-wrap')
				itemH.fields({
					rect: true,
					size: true
				}, data => {
					this.scrollTop = data.height + data.top
				}).exec()
			},
			changeCollection() {
				if (this.collection_status) {
					this.showss = false
				} else {
					this.showss = true
				}
				let changeStatus = 0
				if (this.detail.collection_status) {
					changeStatus = 1
				}
				this.$axios({
					url: this.$url[51],
					data: {
						id: this.id,
						type: TYPE.COMMUNICATION,
						status: STATUS.COLLECTION,
						changeStatus: changeStatus
					}
				}).then(res => {
					if (res.code == 0) {
						if (this.detail.collection_status) {
							uni.showToast({
								title: '取消收藏',
								icon: 'none'
							})
							this.detail.collection--
						} else {
							uni.showToast({
								title: '收藏成功',
								icon: 'none'
							})
							this.detail.collection++
						}
						this.detail.collection_status = !this.detail.collection_status
					}
				})
			},
			changeLike() {
				console.log(this.detail.like_status)
				if (this.detail.like_status) {
					this.shows = false
				} else {
					this.shows = true
				}
				let changeStatus = 0
				if (this.detail.like_status) {
					changeStatus = 1
				}
				this.$axios({
					url: this.$url[51],
					data: {
						id: this.detail.id,
						type: TYPE.COMMUNICATION,
						status: STATUS.LIKE,
						changeStatus: changeStatus
					}
				}).then(res => {
					if (res.code == 0) {
						if (this.detail.like_status) {
							uni.showToast({
								title: '取消点赞',
								icon: 'none'
							})
							this.detail.like--
						} else {
							uni.showToast({
								title: '点赞成功',
								icon: 'none'
							})
							this.detail.like++
						}
						this.detail.like_status = !this.detail.like_status
					}
				})
			},
			chat() {
				uni.navigateTo({
					url: '/pages/chat/chat?id=' + this.detail.uid + '&type=1&name=' + this.detail.user.nick
				})
			},
			getRelease() {
				if (this.isLogin) {
					this.focus = false
					if (!this.release) {
						uni.showToast({
							title: '请填写评论内容',
							icon: 'none'
						})
					} else {
						let loginType = 0
						// #ifdef MP-WEIXIN
						loginType = 1
						// #endif
						// #ifdef H5
						loginType = 2
						// #endif
						this.$axios({
							url: this.$url[53],
							data: {
								id: this.id,
								type: 1,
								comment_id: this.comment_id,
								content: this.release,
								openId: uni.getStorageSync("openId"),
								loginType
							}
						}).then(res => {
							if (res.code == 0) {
								this.detail.comment_count = res.data.comment_count
								this.detail.comment = []
								res.data.comment.forEach((item, index) => {
									this.detail.comment.push({
										...item
									})
								})
								this.focus = false
								this.release = ''
								setTimeout(() => {
									this.scrollTop = this.detail.comment.length * 5000
								}, 100)

							}
						})
					}
				} else {
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
			other() {
				uni.navigateTo({
					url: '/pages/others-core/others-core?uid=' + this.detail.uid
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		z-index: 1;
	}

	.deleteImg {
		width: 40rpx;
	}

	.autolabel-margin {
		margin: 0 10rpx 10rpx 0;
	}

	.user-img-shaw {
		border: 1rpx solid rgba(232, 232, 232, 1);
	}

	/* 任务 */
	.task-block {
		width: 20.93upx;
		height: 20.93upx;
		margin-right: 12upx;
	}

	.task-radio {
		padding: 6upx 34upx;
		background: #f5f5f5;
		border-radius: 28upx;
		line-height: 1.5;
		font-size: 22upx;
		color: #969799 !important;
		margin-left: 14upx;
		display: flex;
		align-items: center;
	}

	.tasks {
		display: flex;
		margin-bottom: 20upx;
		justify-content: space-between;
		align-items: center;
	}

	.lock>image {
		width: 18.46upx;
		height: 18.56upx;
		margin-right: 13upx;
	}

	.lock {
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding: 12upx 24upx;
		margin-top: 18upx;
		background: $xc;
		border-radius: 6upx;
		line-height: 1.2;
		color: $project-color;
		/* font-size: 24upx; */
	}

	.icon-text {
		margin-left: 6upx;
		height: 34upx;
		font-size: 28upx !important;
	}

	/* 时间 */
	.ctimer {
		color: rgba(150, 151, 153, 1);
		font-size: 20upx;
		padding: 20upx 0;
		position: relative;
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

	.content-img {
		min-width: 100%;
		object-fit: cover;
	}

	.content-img>image {
		width: 100%;
		object-fit: cover;
	}

	.noticed {
		border: 2rpx solid #ff5e00;
		background-color: #ff5e00;
	}

	.color {
		border: 2rpx solid #ff5e00;
		color: #ff5e00;
	}

	.has {
		border: 2rpx solid #b5b6b4;
		color: #b5b6b4;
	}

	.ctimer::after {
		content: '';
		width: 100%;
		height: 1px;
		transform: scaleY(0.5);
		background: rgba(232, 232, 232, 1);
		position: absolute;
		bottom: 0;
		left: 0;
	}

	/* 标签 */
	.autolabel {
		margin-bottom: 20upx;
	}

	.item {
		margin-top: 25rpx;
		background: #EEEEEE;
		margin: 20rpx 0rpx;
		border-radius: 20rpx;
		// box-shadow: 0px 0px 5px #EEEEEE;
		display: flex;
		// border-radius: 8rpx;
		padding: 20rpx 20rpx;

		.itemLeft {
			width: 204rpx;
			height: 136rpx;

			image {
				width: 100%;
				height: 136rpx;
				border-radius: 10rpx;
			}
		}

		.info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
		}

		.price {
			color: #ff6638;
		}

		.purchase {
			width: 99rpx;
			height: 46rpx;
			background: #ff6638;
			opacity: 1;
			line-height: 46rpx;
			/* border-radius: 4rpx; */
			font-size: 26rpx;
			color: white;
			text-align: center;
			border-radius: 23rpx;
		}

	}

	.autolabel-item {
		display: flex;
		flex-wrap: wrap;
	}

	.autolabel-list {
		background: rgba(245, 245, 245, 1);
		line-height: 1.2;
		border-radius: 22upx;
		margin-right: 30upx;
		padding: 6upx 23upx;
		color: rgba(255, 94, 0, 1);
		font-size: 22upx;
		margin-top: 19upx;
	}

	.assess-wrap-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.autolabel-title {
		color: rgba(150, 151, 153, 1);
		font-size: 28upx;
	}

	/* 标题 */
	.case-price {
		display: flex;
		color: rgba(255, 94, 0, 1);
		font-size: 36upx !important;
	}

	.case-list {
		white-space: pre-line !important;
		padding: 19upx 0 20upx;
		color: rgba(5, 15, 26, 1);
		font-size: 28upx;
	}

	.list-title {
		color: rgba(5, 15, 26, 1);
		font-size: 36upx;
		font-weight: 700;
	}

	/* 用户信息 */
	.user-map-title {
		font-size: 20upx;
	}

	.user-map {
		display: flex;
		align-items: center;
		color: rgba(204, 204, 204, 1);
	}

	.user-map>image {
		width: 16upx;
		height: 20upx;
		margin-right: 6upx;
	}

	.user-l-r-t {
		display: flex;
		align-items: center;
	}

	.user-nick>image {
		width: 25.7upx;
		height: 25.7upx;
		margin: 0 14upx;
	}

	.user-card {
		color: rgba(26, 181, 2, 1);
		font-size: 20upx;
		padding: 4upx 16upx;
		border: 1px solid rgba(55, 174, 3, 1);
		background: #fff;
		border-radius: 7upx;
		line-height: 1;
	}

	.main-user {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 18upx 0;
		position: relative;
	}

	.account {
		padding: 0 30upx;
	}

	.user-l-img {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.main-user::after {
		content: '';
		width: 100%;
		height: 1px;
		transform: scaleY(0.5);
		background: rgba(232, 232, 232, 1);
		position: absolute;
		bottom: 0;
	}

	.user-l-img>image {
		width: 70upx;
		height: 70upx;
		margin-right: 25upx;
		border-radius: 50%;
	}

	.swiper-items>image {
		width: 100%;
		height: 440upx;
	}

	.no-data {
		text-align: center;
	}

	.no-data>image {
		width: 554rpx;
		height: 252upx;
	}

	.nav {
		border-top: 1px solid #e6e6e6;
		position: fixed;
		width: 100%;
	}

	.main-wrap {
		padding: 30upx;
	}

	.title {
		font-weight: bold;
		font-size: 38upx;
		margin-bottom: 10px;
	}

	.nickname {
		margin-left: 10upx;
		font-size: 26upx;
		color: #666;
	}

	.head-portrait {
		width: 75upx;
		height: 75upx;
		border-radius: 50%;
	}

	.follow {
		font-size: 24upx;
		height: 50upx;
		text-align: center;
		width: 50px;
		line-height: 50upx;
		border: 1px solid #ffab3d;
		color: #ffab3d;
		border-radius: 20px;
	}

	.chat {
		font-size: 24upx;
		border: 1px solid #bdbdbd;
		height: 50upx;
		text-align: center;
		width: 50px;
		line-height: 50upx;
		color: #333;
		margin-right: 10px;
		border-radius: 20px;
	}

	.content {
		margin-top: 15px;
		color: #333;
	}

	.content-text {
		white-space: pre-wrap;
		line-height: 1.7;
		font-size: 17px;
		color: #333;
	}

	.content>image {
		margin: 15px 0;
		width: 100%;
	}

	.publish-time {
		text-align: right;
		color: #999;
		font-size: 22upx;
	}

	.assess-wrap {
		padding: 0 30upx;
		padding-bottom: 80upx;
	}

	.assess-title {
		padding: 20upx 0;
		color: rgba(100, 101, 102, 1);
		font-size: 24upx;
	}

	.assess-bottom {
		height: 98upx;
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		border-top: 1px solid #f7f7f7;
		z-index: 1;
		background: #fff;
	}

	.assess-input {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		margin: 0 30upx;
		background: #f5f5f5;
		border-radius: 20px;
	}

	.statistics {
		justify-content: space-evenly;
		flex: 1;
	}

	.assess-right {
		flex: 1;
		justify-content: space-between;
	}

	.assess-input>input {
		height: 60upx;
		border-radius: 20px;
		text-align: left;
		padding-left: 10upx;
		padding-right: 30upx;
		font-size: 26upx;
		color: #333;
	}

	.align-center>view {
		line-height: initial;
		text-align: center;
		color: #333;
	}

	.align-center>view>text {
		font-size: 12px;
	}

	.iconfont {
		font-size: 40upx;
		display: flex;
		align-items: center;
		color: #969799;
		margin-right: 5px;
	}

	.iconfont image {
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
	}

	.submit {
		background: #fbe76a;
		color: #1e2728;
		margin-right: 10px;
		padding: 3px 7px;
		border-radius: 5px;
	}

	.user-l {
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
	}

	.userbutton .isfollow {
		color: white;
		font-size: 26rpx;
		border: 1rpx solid $project-color;
		background-color: $project-color;
		line-height: 2;
		display: inline-block;
		padding: 0 20rpx;
	}

	.isfollow text {
		display: inline-block;
		width: 120rpx;
	}

	.outfollow {
		color: white;
		font-size: 30rpx;
		border: 1rpx solid #646566;
		background-color: #646566;
		line-height: 2;
		padding: 0 20rpx;
	}
</style>