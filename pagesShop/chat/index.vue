<template>
	<view class="main flex flex-column">
		<view class="chatList">
			<scroll-view scroll-y="true" class="scroll-Y scroll" :style="'height:' +windowHeight+ 'px'"
				:scroll-into-view="scrollTop" @scrolltoupper="onreachTop" :scroll-top="scrollall"
				:scroll-with-animation='ScrollAnimation' @scroll="scroll()">
				<view class="message-list" v-if="list">
					<!-- 					<view class="left flex" id='s'>
						<u-image shape="circle" class="img" width="80rpx" height="80rpx" :src="common.imgUrl(avatar)">
						</u-image>
						<view class="content whiteBg">
							<view>客服</view>
						</view>
					</view> -->
					<view v-for="(item, index) in list" :key="index" :id="'s' + JSON.stringify(item.id)">
						<view class="left flex a-center " v-if="!item.self">
							<u-image shape="circle" class="img" width="80rpx" height="80rpx"
								:src="common.imgUrl(avatar)">
							</u-image>
							<view v-if="item.content_type === 1" class="content whiteBg flex a-center">
								<u-image class="img" width="300rpx" mode="widthFix" :src="common.imgUrl(item.content)"
									@click="onPreviewImage(item.content)" />
							</view>
							<view v-else>
								<view class="content whiteBg" v-html="common.content(item.content)"></view>
							</view>

						</view>
						<view class="right flex a-center j-end" v-else>
							<view v-if="item.content_type !== 1">
								<view class="content flex a-center" v-html="common.content(item.content)">
								</view>
								<!-- {{ item.content }} -->
							</view>
							<u-image class="imgBox" width="300rpx" mode="widthFix" v-else
								:src="common.imgUrl(item.content)" @click="onPreviewImage(item.content)">
							</u-image>
							<u-image shape="circle" class="img" width="80rpx" height="80rpx"
								:src="common.imgUrl(headPortrait)"></u-image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="bottomview" :style="{height:bottomheight+'px'}"></view>
		<view class="footer" ref='footer' id="inputs">
			<view class="flex tips1">
				<view class="whiteBg options color666" v-for="(item, index) in nav" :key="index" @click="select(item)">
					{{ item.title }}
				</view>
			</view>
			<view class="whiteBg flex a-center inputBox">
				<view class="imgboxs">
					<u-image shape="circle" class="icon" width="39rpx" height="39rpx"
						:src="common.imgUrl('/static/shop/common/keyboard.png')">
					</u-image>
				</view>
				<view class="flex1">
					<textarea v-model="centent" class="textarea_input" :auto-height="true" @linechange="linechange"
						id="textarea_input" :focus="focus" :auto-blur='true' ref="textarea" :class="{ifservice:isStaffService}"/>
				</view>
				<view class="flex">
					<u-icon v-if="isStaffService" class="img" name="photo" size="38" @click="onImage"></u-icon>
					<view class="medium size30 fontWight" @click="send"> 发送 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import MonitorKeyboard from '@/packgeA/components/common/monitorKeyboard.js'
	// #endif
	import {
		getList,
		adddArtificial,
		endArtificial,
		getAcceptList,
		sendMsg,
		serviceInfo
	} from "@/plugin/api/chat.js";
	import {
		userInfo
	} from "@/plugin/api/index.js";
	let timer;
	export default {
		data() {
			return {
				focus: false, //键盘焦点
				windowHeight: 1000,
				totalCount: 0,
				iskeyboard: false,
				centent: "",
				isStaffService: false,
				avatar: '',
				headPortrait: "",
				scrollTop: "",
				nav: [{
					title: "人工服务",
				}, ],
				list: [],
				isPc: true,
				scrollwhich: 0,
				scrollall: 999999,
				monitorKeyboard: null,
				serviceName: '客服',
				bottomheight: 0,
				scrollHeight: 0,
				ScrollAnimation: false,
				lookingmore: true,
				autoheight: true,
				wxheight: 0, //微信页面高度
			};
		},
		onLoad() {
			this.stop()
			// #ifdef H5
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				this.isPc = false;
			} else {
				this.isPc = true;
			}
			// #endif

			this.getList({
				limit: 20,
			});
			this.userInfo();
			if (this.$storage.getStorageSync("isStaffService")) {
				this.isStaffService = true;
				this.nav[0].title = this.isStaffService ? "结束人工对话" : "人工服务";
			}
			// #ifdef H5
			this.getKeyboardState();
			// #endif
			this.serviceInfo();
			this.$nextTick(() => {
				// #ifdef H5
				this.bottomheight = document.getElementById('inputs').offsetHeight
				uni.getSystemInfo({
					success: (res) => {
						if (this.isPc) {
							this.windowHeight = res.windowHeight - this.bottomheight
						} else {
							this.windowHeight = res.windowHeight - this.bottomheight
						}
					},
				});
				// #endif
				// #ifdef MP-WEIXIN
				let that = this
				uni.getSystemInfo({
					success: function(res) { // res - 各种参数
					that.wxheight=res.windowHeight
					}	
				});
				let info = uni.createSelectorQuery().select("#inputs");
				info.boundingClientRect(function(data) { //data - 各种参数
					that.windowHeight = that.wxheight - data.height
					// console.log(that.windowHeight);
				}).exec()
				that.setscroll()
				// #endif

			})
		},
		onShow() {
			uni.onKeyboardHeightChange(res => {
			  console.log(res.height)
			})
		},
		onUnload() {
			if (this.focus) {
				let platform = uni.getSystemInfoSync().platform
				this.focus = false
				if (platform == 'ios') {} else if (platform == 'android') {
					this.$nextTick(() => {
						// #ifdef H5
						this.bottomheight = document.getElementById('inputs').offsetHeight
						uni.getSystemInfo({
							success: (res) => {
								if (this.isPc) {
									this.windowHeight = res.windowHeight - this.bottomheight
								} else {
									this.windowHeight = res.windowHeight - this.bottomheight
								}
							},
						});
						// #endif

					})
				}
			}
			// #ifdef H5
			var box = function(e) {
				passive: false
			};
			document.body.style.overflow = '';
			document.removeEventListener("touchmove", box, false);
			clearInterval(timer);
			// #endif
		},
		watch: {
			centent(newValue, oldValue) {
				this.$nextTick(() => {
					// #ifdef H5
					const textarea = document.getElementById('textarea_input');
					textarea.scrollTop = textarea.scrollHeight;
					// #endif
				})
			},
			list: function(nexto, preo) {
				if (nexto.length) {
					// const last = nexto[nexto.length - 1];
					// this.scrollTop = ''
					// this.$nextTick(function() {
					// 	this.scrollTop = "s" + JSON.stringify(last.id)
					// })
					// 限制展示在页面上的消息条数
				}
			}
		},
		methods: {
			scroll() {
				if (this.focus) {
					let platform = uni.getSystemInfoSync().platform
					if (platform == 'ios') {
						this.focus = false
					}
				}
			},
			stop() {
				// #ifdef H5
				var box = function(e) {
					passive: false;
				};
				document.body.style.overflow = 'hidden';
				document.addEventListener("touchmove", box, false);
				// #endif
			},
			getKeyboardState() {
				this.monitorKeyboard = new MonitorKeyboard();
				this.monitorKeyboard.onStart();
				// 监听虚拟键盘弹出事件
				this.monitorKeyboard.onShow(() => {
					this.focus = true
					this.scrollwhich = this.windowHeight
					let platform = uni.getSystemInfoSync().platform
					if (platform == 'ios') {} else if (platform == 'android') {
						setTimeout(() => {
							this.bottomheight = document.getElementById('inputs').offsetHeight
							uni.getSystemInfo({
								success: (res) => {
									if (this.isPc) {
										this.windowHeight = res.windowHeight - this.bottomheight
									} else {
										this.windowHeight = res.windowHeight - this.bottomheight
									}
								},
							});
							let res = uni.getSystemInfoSync()
							this.windowHeight =res.windowHeight - this.bottomheight
							setTimeout(() => {
								this.setscroll()
							}, 200)
						}, 300)
					}

				})
				//监听键盘收起的事件
				this.monitorKeyboard.onHidden(() => {
					this.$nextTick(function() {
						this.windowHeight = this.scrollwhich
						this.setscroll()
					})
				})
			},

			onPreviewImage(item) {
				uni.previewImage({
					urls: [this.common.imgUrl(item)],
					success: (res) => {
						console.log(res, "res");
					},
					fail: (err) => {
						console.log(err, "err");
					},
				});
			},
			linechange(e) {
				// console.log(e.detail.lineCount);
				// this.autoheight = e.detail.lineCount < 3
			},
			onImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						res.tempFilePaths.forEach((v) => {
							uni.uploadFile({
								url: this.$base_url + "/index/common/uploadFile",
								filePath: v,
								fileType: "image",
								method:'POST',
								name:'file',
								formData: {
									name: "file",
								},
								success: (uploadFileRes) => {
									this.sendMsg({
										content: JSON.parse(uploadFileRes.data)
											.data.url,
										content_type: 1,
									});
								},
							});
						});
					},
				});
			},
			onreachTop() {
				if (this.lookingmore) {
					this.lookingmore = false
					if (this.list.length < this.totalCount) {
						this.getList({
								chatId: this.list[0].id,
								limit: 20,
							},
							true
						);
						return;
					}
					uni.showToast({
						icon: "none",
						title: "到底了",
					});
				}
			},
			userInfo() {
				userInfo().then((res) => {
					if (res.code === 0) {
						this.headPortrait = res.data.avatar_url;
					}
				});
			},
			getList(params, isInit) {
				// 消息列表
				uni.showLoading({
					title: "加载中",
				});
				getList(params)
					.then((res) => {
						if (isInit) {
							this.list = res.data.concat(this.list);
						} else {
							this.list = this.list.concat(res.data);
						}
						this.totalCount = res.count;
						this.$storage.setStorage("isStaffService", res.status);
						this.nav[0].title = res.status ? "结束人工对话" : "人工服务";
						// this.avatar = res.avatar
						uni.hideLoading();
						if (res.status) {
							this.setInterval();
						}
						setTimeout(() => {
							if (!isInit) {
								setTimeout(() => {
									this.setscroll()
								}, 100)
							}
							// #ifdef H5
							this.$nextTick(async () => {
								const query = uni.createSelectorQuery().in(this)
								query
									.select('.message-list')
									.boundingClientRect(data => {
										// data.height 为已经渲染的聊天列表内容高度
										// this.scrollHeight 为上一次聊天列表内容高度, 如果当前为第一次, 那么this.scrollHeight应该为0
										// 设置滚动条的高度
										this.scrollall = data.height - this.scrollHeight
										// (注意: 如果在模板中, upper-threshold设置的值不为0, 为50, 那么可以加上该值), 如:
										// this.scrollTop = data.height - this.scrollHeight + 50
										// 将本次列表渲染后的内容高度记录下来, 方便下次加载时使用
										this.scrollHeight = data.height
									})
									.exec()
							})
							// #endif

							if (this.lookingmore == false) {
								this.lookingmore = true
							}
						}, 100)

					})
					.catch((err) => {
						uni.hideLoading();
					});
			},
			setscroll() {
				this.scrollTop = ''
				this.$nextTick(() => {
					if(this.list.length!=0){
						this.scrollTop = `s${this.list[this.list.length-1].id}`
					}
				})
			},
			imgUrl(e) {
				if (!e) {
					return "";
				} else if (e.substring(0, 4) != "http") {
					return this.$base_url + e;
				} else {
					return e;
				}
			},
			adddArtificial() {
				// 人工聊天开启
				adddArtificial().then((res) => {
					this.$storage.setStorage("isStaffService", true);
					this.isStaffService = true;
					this.list = this.list.concat(res.data);
					setTimeout(() => {
						this.setscroll()
					}, 100)
					this.nav[0].title = this.isStaffService ? "结束人工对话" : "人工服务";
					this.setInterval();
				});
			},
			endArtificial() {
				// 人工聊天关闭
				endArtificial().then((res) => {
					this.isStaffService = false;
					this.nav[0].title = this.isStaffService ? "结束人工对话" : "人工服务";
					this.list = this.list.concat(res.data);
					setTimeout(() => {
						this.setscroll()
					}, 100)
					this.$storage.removeStorage("isStaffService");
					clearInterval(timer);
				});
			},
			setInterval() {
				timer = setInterval(() => {
					this.getAcceptList({
						chatId: this.list.length > 1 ? this.list[this.list.length - 1].id : 0,
					});
				}, 5000);
			},
			getAcceptList(params) {
				// 人工消息列表
				getAcceptList(params).then((res) => {
					this.list = this.list.concat(res.data);
					this.$storage.setStorage("isStaffService", res.status);
					this.nav[0].title = this.isStaffService ? "结束人工对话" : "人工服务";
					if (!res.status) {
						clearInterval(timer);
						this.nav[0].title = "人工服务";
					}
					if (res.data.length != 0) {
						setTimeout(() => {
							this.setscroll()
						}, 100)
					}

				});
			},
			sendMsg(params) {
				// 发送消息
				sendMsg(params).then((res) => {
					this.list = this.list.concat(res.data);
					this.centent = "";
					setTimeout(() => {
						this.setscroll()
					}, 100)
				});
			},

			send() {
				if (!this.centent) {
					return;
				}
				let centent = {
					content: this.centent,
					content_type: 0,
				};
				this.sendMsg(centent);
				// this.list.push(centent);
			},

			select(item) {
				if (item.title === "门店查询") {
					uni.navigateTo({
						url: item.url,
					});
				} else {
					if (this.$storage.getStorageSync("isStaffService")) {
						this.isStaffService = false;
						this.endArtificial();
					} else {
						this.adddArtificial();
					}
				}
			},
			skip(url) {
				uni.navigateTo({
					url,
				});
			},
			serviceInfo() {
				serviceInfo().then((res) => {
					this.serviceName = res.data.service_name;
					this.avatar = res.data.service_avatar_url
				})
			}
		},
	};
</script>

<style scoped lang="scss">
	.ifservice{
		width: 480rpx !important;
	}
	.imgboxs{
		display: flex;
		align-items: center
	}
	@import "@/pagesShop/scss/chat.scss";
</style>
