<template>
	<!-- <page-meta>
		<head>
			<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
		</head>
	</page-meta> -->
	<view>
		<view>
			<aliplayer :videoId="videoId" :showvideo="showvideo"></aliplayer>
			<!-- #ifndef MP-WEIXIN -->
			<video-player v-if="playerOptions.sources.length > 0" class="video-player vjs-custom-skin" ref="videoPlayer"
					:playsinline="true" :options="playerOptions"></video-player>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<video :src="playerOptions.sources[0].src" controls style="width: 750rpx;"  v-if="playerOptions.sources.length > 0"></video>
			<!-- #endif -->
			<image class="classImg" :src="common.imgUrl(course.img)" mode="" v-if="ifshow"></image>
				<!-- <view class="mask">
					<u-icon name="play-right" color='white' :size='70' class="playIcon"></u-icon>
				</view> -->

				<!-- :poster='common.imgUrl(details.course.img)' -->
				<!-- 				<video id="myVideo" autoplay @ended='endVideo'
					v-if="dataTime>details.end_time&&details.video_list.length>0"
					:src="common.imgUrl(details.video_list[videoIndex].local_path)" style="width: 100%;"></video> -->
			<!-- 课程介绍 -->
			<view class="bgWhite curriculumBox">
				<view class="curricuLumName flex space-between buttonheight">
					<view v-if="course">
						{{details.name}}
					</view>
					<view class="showbutton" v-if="details.video_playback">
						<template v-if="details.video_playback.length!=1&&details.video_playback.length!=0">
							<span :class="{'dontchoose':num==0}" v-if='num==0' @click='showToasts(1)'>上一视频</span>
							<span v-else @click='num--'>上一视频</span>
							<span :class="{'dontchoose':num==details.video_playback.length-1}"
								v-if='num==details.video_playback.length-1' @click='showToasts(0)'>下一视频</span>
							<span v-else @click='num++'>下一视频</span>
						</template>
					</view>
<!-- 					<view class="getInto" @click="getInto()"
						v-if="advance>details.start_time&&dataTime<details.end_time">进入教室</view> -->
				</view>
				<view class="flex curriculumText space-between u-f-ac">
					<view class="classDay">
						<image :src="common.imgUrl('/static/icon/kj.png')" class="kjIcon" mode=""></image>
						课程开始时间：{{details.start_time}}
					</view>
					<!-- <view  class="curriculumStates"  v-if="dataTime<details.start_time">未开始</view>
					<view  class="curriculumStates" style="background-color:#999999;" v-if="dataTime>details.end_time">已结束</view> -->
					<!-- 	<view  class="curriculumStates" style="background-color:#999999;" v-if="dataTime<details.start_time&&dataTime>details.end_time">上课中</view> -->
				</view>
			</view>

			<!-- 章节介绍 -->
			<view class="bgWhite marginTop9 section flex">
				<view>
					<image :src="common.imgUrl('/static/kjIcon.png')" mode="" class="television"></image>
				</view>
				<view>
					<view class="sectionName">第{{course.index}}节 {{details.name }}</view>
					<view class="sectionText">课时{{details.duration}}分钟
						<text style="margin-left: 40rpx;" v-if="details.teacher"> 讲师：{{details.teacher.name }}</text>
					</view>
				</view>
				<view class="flex" style="margin-left: 100rpx;margin-top: 10rpx;">
					<view class="teacherButton" @click="consulting1(details.teacher)">评价</view>
				</view>
                <!-- 评价 -->
                <u-modal v-model="show1" width="682rpx" title='请填写您对该老师的评价' :border-radius='20' :show-confirm-button='false'
                	:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able >
                	<view  style="padding:30rpx 42rpx 30rpx 42rpx;">
                		<textarea v-model="newreMarks" placeholder="请输入你的评价" auto-height />
                	</view>
                	<view style="padding:30rpx 42rpx 30rpx 42rpx;">
                		<view @click="AddNew()"
                			style="background:#FF6638;height:63rpx;line-height: 64rpx;color:white;text-align: center;border-radius: 20px;"
                			type="success">提交</view>
                	</view>
                </u-modal>
				<view class="">
					<!-- 		 <view class="teacherButton"  v-if="dataTime<details.start_time">调课</view> -->
				</view>
			</view>
			<!-- 切换tab -->
			<view class="tabBox marginTop9 bgWhite">
				<u-tabs :list="tablist" :is-scroll="false" :current="current" @change="change" active-color='#00CB84'>
				</u-tabs>
			</view>

			<view v-if="currentName==='预习'">
				<fileItem :list='dayResources.preview'></fileItem>
			</view>

			<view v-if="currentName==='复习'">
				<fileItem :list='dayResources.review'></fileItem>
			</view>

			<view v-if="currentName==='作业'">
				<taskItem :current='2' :teacher='details.teacher.name' :list='taskList' :courseId='id'></taskItem>
			</view>

			<view v-if="currentName==='测验'">
				<u-tabs :list="testNavlist" :is-scroll="false" :current="testCurrent" @change="changes"
					active-color='#00CB84'></u-tabs>
				<taskItem :list='testCurrent == 1 ? testList : testList2' :teacher='details.teacher.name' :current='3'
					:courseId='id'></taskItem>
			</view>

			<view v-if="currentName==='教师评价'">
				<nullData v-if="details.evaluate==''" :paddingTop='40'></nullData>
				<view class="g" v-else>{{details.evaluate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import fileItem from "@/packgeA/components/fileItem.vue";
	import taskItem from '@/packgeA/components/taskItem.vue'
	import aliplayer from '@/packgeB/aliplayer.vue'
	import {
		getTimeWeex
	} from "../../plugin/time.js";
	export default {
		components: {
			fileItem,
			taskItem,
			aliplayer
		},
		data() {
			return {
				show1:false,
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
				testCurrent: 0,
				testNavlist: [{
						name: "客观题",
					},{
						name: "主观题",
					},
					
				],
				tablist: [{
					name: "教师评价",
				}, ],
				videoIndex: 0,
				videoContext: "",
				testList: [],
				testList2: [],
				taskList: [],
				current: 0,
				currentName: "教师评价",
				id: 0,
				course: {},
				details: {},
				dataTime: getTimeWeex(0).time,
				dayResources: {}, //列表数据\
				orderId: 0,
				indexs: 0,
				advance: null,
				ifshow: true,
				videoId: '',
				showvideo: false,
				num: 0,
			};
		},
		onLoad(option) {
			this.getAdvance();
			console.log(option);
			this.id = option.id;
			if (option.course) {
				// #ifdef MP-WEIXIN
				this.course = JSON.parse(option.course);
				// #endif
				// #ifndef MP-WEIXIN
				this.course = JSON.parse(decodeURIComponent(option.course));
				// #endif
			}
			if (option.orderId) {
				this.orderId = option.orderId;
			}
			if (option.index) {
				this.indexs = option.index;
			}
			this.getSectionDetail();
			this.getTypeList();
			this.getTaskList();
			this.getTestList();
		},
		// onLoad(option) {
		// 	this.getAdvance();
		// 	console.log(this.$route.query);
		// 	this.id = this.$route.query.id;
		// 	if (this.$route.query.course) {
		// 		this.course = JSON.parse(decodeURIComponent(this.$route.query.course));
		// 	}
		// 	if (this.$route.query.orderId) {
		// 		this.orderId = this.$route.query.orderId;
		// 	}
		// 	if (this.$route.query.index) {
		// 		this.indexs = this.$route.query.index;
		// 	}
		// 	this.getSectionDetails();
		// 	this.getTypeList();
		// 	this.getTaskList();
		// 	this.getTestList();
		// },

		onPullDownRefresh() {
			this.dataTime = getTimeWeex(0).time;
			this.getAdvance();
			this.videoIndex = 0;
			console.log(this.dataTime);
			this.getSectionDetail();
		},
		watch: {
			num(newValue, oldValue) {
				this.showvideo = false
				this.$nextTick(function() {
					this.showvideo = true
					this.videoId = this.details.video_playback[newValue].video_id
				})
			}
		},
		methods: {
			AddNew() {
				if (this.newreMarks == '') {
					this.$u.toast('请填写评价')
					return
				}
				this.$axios({
					url: this.$url[109],
					data: {
						teacherUid: this.uid,
						content: this.newreMarks,
					}
				}).then(res => {
						this.newreMarks = ''
						uni.showToast({
							title: '评价成功',
							icon: 'none'
						})
						setTimeout(() => {
							this.show1 = false;
						}, 1000)
					
				})
			},
			consulting1(i) {
				this.uid=i.uid;
				this.show1 = true;
			},
			// 获取科节详情
			getSectionDetail() {
				this.$axios({
					url: this.$url[15],
					data: {
						id: this.id
					}
				}).then(res => {
					this.details = res.data;
					// if (!res.data.end) {
						
						// uni.showModal({
						// 	title: '提示',
						// 	content: '课程已结束',
						// 	success: (res) => {
						// 		if (res.confirm) {
						// 			uni.navigateBack({
						// 				delta: 1
						// 			});
						// 		}
						// 	}
						// });
						
					// }
					if(res.data.end){
						if(res.data.join_url){
							this.ifshow=false
							this.playerOptions.sources = [{
								type: "application/x-mpegURL", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
								src: res.data.join_url //url地址
							}]
						}else{
							if(res.data.video_playback.length!=0){
								this.getSectionDetails()
								this.ifshow=false
							}else{
								uni.showModal({
									title: '提示',
									content: '课程暂未开始',
									// success: (res) => {
									// 	if (res.confirm) {
									// 		uni.navigateBack({
									// 			delta: 1
									// 		});
									// 	}
									// }
								});
								this.ifshow=true
								this.getSectionDetails()
							}
						}
					}else{
						this.getSectionDetails()
					}
				})
			},
			//播放状态改变回调
			playerStateChanged(playerCurrentState) {
				// console.log('player current update state', playerCurrentState)
			},
			showToasts(i) {
				if (i == 0) {
					uni.showToast({
						icon: 'none',
						title: '这是最后一个视频'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '这是第一个视频'
					})
				}
			},
			endVideo() {
				if (this.videoIndex < this.details.video_list.length - 1) {
					this.videoIndex = ++this.videoIndex;
				}
			},

			getAdvance() {
				let state = new Date(new Date().getTime() + 900000);
				let date = new Date(state);
				this.advance =
					date.getFullYear() +
					"-" +
					this.common.getNumber(date.getMonth() + 1) +
					"-" +
					this.common.getNumber(date.getDate()) +
					" " +
					this.common.getNumber(date.getHours()) +
					":" +
					this.common.getNumber(date.getMinutes());
			},
			changes(index) {
				this.testCurrent = index;
			},
			change(index) {
				this.current = index;
				this.currentName = this.tablist[index].name;
			},
			// 获取科节详情
			getSectionDetails() {
				this.$axios({
					url: this.$url[15],
					data: {
						id: this.id,
					},
				}).then((res) => {
					if (this.details.video_playback.length != 0) {
						this.ifshow = false
						this.showvideo = true
						this.videoId = this.details.video_playback[this.num].video_id
					} else {
						uni.showToast({
							icon: 'none',
							title: '暂未上传视频'
						})
					}
					uni.stopPullDownRefresh();
					// this.videoContext = uni.createVideoContext("myVideo");
				});
			},
			// 获取  预习  复习  作业  检测
			getTypeList() {
				this.$axios({
					url: this.$url[16],
					data: {
						id: this.id,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.dayResources = res.data;
						if (this.dayResources.preview.length != 0) {
							let test = 0
							this.tablist.forEach(item => {
								if (item.name == "预习") {
									test++
								}
							})
							if (test == 0) {
								this.tablist.push({
									name: "预习",
								});
							}
						}
						if (this.dayResources.review.length != 0) {
							let test = 0
							this.tablist.forEach(item => {
								if (item.name == "复习") {
									test++
								}
							})
							if (test == 0) {
								this.tablist.push({
									name: "复习",
								});
							}
						}
					}
				});
			},

			//获取测验列表
			getTaskList() {
				this.$axios({
					url: this.$url[21],
					data: {
						order_id: this.orderId,
						section: this.indexs,
						category: this.testCurrent,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.testList = res.data.data;
						this.$axios({
							url: this.$url[21],
							data: {
								order_id: this.orderId,
								section: this.indexs,
								category: 1,
							},
						}).then((ress) => {
							if (ress.code == 0) {
								if(ress.data.data.length==0){
									this.testCurrent=1
								}
								this.testList2 = ress.data.data;
								if (this.testList.length + this.testList2.length != 0) {
									let test = 0
									this.tablist.forEach(item => {
										if (item.name == "测验") {
											test++
										}
									})
									if (test == 0) {
										this.tablist.push({
											name: "测验",
										});
									}
								}
							}
						});
					}
				});
			},
			//获取作业列表
			getTestList() {
				this.$axios({
					url: this.$url[20],
					data: {
						order_id: this.orderId,
						section: this.indexs,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.taskList = res.data.data;
						if (this.taskList.length != 0) {
							let test = 0
							this.tablist.forEach(item => {
								if (item.name == '作业') {
									test++
								}
							})
							if (test == 0) {
								this.tablist.push({
									name: "作业",
								});
							}
						}
					}
				});
			},
			//进入教室
			getInto() {
				if (!this.details.join_url) {
					this.$u.toast("课程暂未开始");
					return;
				}
				if (!this.details.end) {
					this.$u.toast("课程已结束");
					return;
				}
				uni.navigateTo({
					url: "/packgeA/tencent/tencent?id=" + this.id,
				});
				// // #ifdef H5
				// this.common.handleClipboard(this.details.join_url, event, () => {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '直播房间号复制成功,请去 zoom APP观看直播'
				// 	})
				// }, () => {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '复制失败'
				// 	})
				// })
				// // #endif

				// // #ifdef MP-WEIXIN
				// uni.setClipboardData({
				// 	data: this.details.join_url,
				// 	success: function () {
				// 		this.$u.toast('房间号复制成功,请去 zoom APP观看直播');
				// 	}
				// });
				// // #endif
			},
		},
	};
</script>
<style>
	page {
		background: rgb(252, 252, 253);
	}
</style>
<style scoped>
	.uni-textarea-wrapper {
	    display: block;
	    position: relative;
	    width: 100%;
	    height: 100% !important;
	    min-height: inherit;
	    overflow-y: hidden;
	}
	.g{
		line-height: 1.8;
		padding: 18rpx 29rpx 22rpx;
		
	}
	.buttonheight {
		height: 60rpx;
		align-items: center;
	}

	.showbutton span {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2d2d2d;
		margin: 0 5px;
		padding: 3px 5px;
		border: 1px solid #2d2d2d;
		border-radius: 6px;
	}

	.dontchoose {
		background-color: grey;
		color: white !important;
	}

	.classImg {
		width: 100%;
		height: 421rpx;
	}

	.mask {
		width: 100%;
		height: 421rpx;
		position: absolute;
		top: 0;
		background-color: rgb(0, 0, 0, 0.5);
	}

	.topBox {
		position: relative;
	}

	.curriculumBox {
		padding: 18rpx 29rpx 22rpx;
	}

	.curricuLumName {
		font-size: 34rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: #262626;
	}

	.curriculumStates {
		width: 126rpx;
		height: 40rpx;
		background: #fea406;
		border-radius: 6px;
		text-align: center;
		line-height: 40rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.87);
	}

	.kjIcon {
		width: 25rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.classDay {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2d2d2d;
	}

	.curriculumText {
		margin-top: 29rpx;
	}

	.marginTop9 {
		margin-top: 9px;
	}

	.section {
		padding: 31rpx 0 29rpx 30rpx;
		border-radius: 13px 13px 0 0;
	}

	.television {
		width: 36rpx;
		height: 28rpx;
		margin-right: 20rpx;
	}

	.sectionName {
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2d2d2d;
	}

	.sectionText {
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #989898;
		margin-top: 12rpx;
	}

	.tabBox {
		padding: 0 0rpx;
	}

	.teacherButton {
		width: 144rpx;
		height: 54rpx;
		border: 2rpx solid #00cb84;
		border-radius: 37rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #00cb84;
		text-align: center;
		line-height: 54rpx;
		margin-left: 20rpx;
	}

	.playIcon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.getInto {
		padding: 7rpx 38rpx;
		background: #00cb84;
		font-size: 26rpx;
		color: #ffffff;
		border-radius: 37rpx;
	}

	.evaluateBox {
		padding: 0 29rpx 29rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #2d2d2d;
		background: #ffffff;
		border: 1px solid #e9e9e9;
		border-radius: 20rpx;
		margin-top: 27rpx;
	}
</style>
