<template>
	<view class="task">
		<view class="task-menu">
			<view class="task-list" :class="type == index ? 'menu-current' : ''" v-for="(item, index) in taskMenu"
				:key="index" @click="changeMenu(index)">
				{{ item }}
			</view>
		</view>
		<view class="padding">
			<!-- 上传 -->
			<view class="">
				<view class="" v-if="type == 2">
					<image :src="common.imgUrl(form.video) + '?x-oss-process=video/snapshot,t_1000,m_fast'"
						v-if="form.video" mode=""></image>
					<u-button :type="form.file.length > 0 ? 'success' : 'primary'" :customStyle="customStyle"
						:ripple="true" @click="chooseVideo()">
						<u-icon name="play-circle" color="#fff" size="42"></u-icon>
						{{ message }}
					</u-button>
				</view>
				<view class="form-upload" v-if="type !== 2"
					style="justify-content: space-between;display: flex;flex-wrap: wrap;margin-top: 0rpx;">
					<!--  -->
					<!-- 					<u-upload :action="url" :formData="formData" :file-list="fileList" @on-success="uploadSuccess"
						:show-progress='false' @on-remove="remove"></u-upload> -->
					<view class="" style="width: 210rpx;height: 210rpx;margin-bottom: 30rpx;position:relative;"
						v-for="(item,index) in imgList" :key="index">
						<u-image width="210rpx" height="210rpx" :src="common.imgUrl(item)" :webp='true'></u-image>
						<image :src="common.imgUrl('/static/dynamic/add.png')" mode="aspectFit"
							style="width: 50rpx;height:50rpx;position: absolute;right: 0;top: 0;transform: rotate(45deg) translate(0%,-50%);"
							@click="deleteImg(index)"></image>
					</view>
					<image :src="common.imgUrl('/static/add.png')" mode="aspectFill"
						style="width: 210rpx;height:210rpx;margin-bottom: 26rpx;" @click="ossImage()"
						v-if="imgList.length!==9"></image>
					<view class="" style="width: 210rpx;height:210rpx;margin-bottom: 26rpx;"
						v-for="i in (2-imgList.length%3)" v-if="imgList.length!==9">
					</view>

				</view>
			</view>

			<view class="form-title border">
				<input type="text" class="form-title-input" v-model="form.title" maxlength="20"
					placeholder="写标题，能吸引更多人看哦" placeholder-style="color:#969799;font-size:34upx"
					style="font-weight: 700;" />
			</view>
			<view>
				<!-- 正文 -->
				<view class="border" v-if="type == 0 || type == 1">
					<textarea v-model="form.instructions" class="form-textarea-input" maxlength="5000"
						placeholder="添加正文" placeholder-style="color:#C4C8CC;font-size:30upx" />
				</view>
				<!-- <view  v-if="type==1">
					<editor id="editor" v-model="form.instructions" class="ql-container form-textarea-input" placeholder="添加正文" @ready="onEditorReady"></editor>
				</view> -->
				<!-- 上传 -->
				<view class="border" style="padding-bottom:20upx" v-if="type == 1">
					<dragSort :list="dragSortList" @contentInput="contentInput" :props="props"
						@change="onDragSortChange" @chooseImage="chooseImage" @Remove="Remove"
						@previewImage="previewImage"></dragSort>
				</view>
			</view>
		</view>
		<!-- 标签 -->
		<view class="form-card  margin">
			<view class="card">
				<text style="color: #F56C6C;margin-right: 10rpx;line-height: 54rpx;"></text>
				标签
			</view>
			<view class="card-flex" style="">
				<view class="card-list" v-for="(item, index) in form.label" :key="index" v-show="item.type">
					<view v-if="item.name" class="flex-center">
						{{ item.name }}
						<image class="close-img" @click="deletes(index)" :src="common.imgUrl('/static/case/closes.png')" mode=""></image>
					</view>
				</view>
				<popus @card="getCard" :type="1" :labelId="form.label_id" />
			</view>
		</view>
		<!-- 绑定课程 -->
		<!-- <view class="form-card  margin">
			<view class="card">
				<text style="color: #F56C6C;margin-right: 10rpx;line-height: 54rpx;">*</text>
				绑定课程
			</view>
			<view class="card-flex" style="">
				<view class="card-list" v-if="form.cid > 0">
					<view class="flex-center">
						{{ form.course }}
						<image class="close-img" @click="form.cid = 0" :src="common.imgUrl('/static/case/closes.png')" mode=""></image>
					</view>
				</view>
				<course @card="getCourse" :cid="form.cid" />
			</view>
		</view> -->
		<!-- 选择是否匿名发布 -->
		<!-- <view  class="margin binding">
			<u-checkbox-group>
				<u-checkbox icon-size="24rpx" @change="checkboxChange" v-model="buttons" active-color="rgba(255, 72, 0, 1)"><text style="color: #C4C8CC; font-size: 22rpx;">匿名发布</text></u-checkbox>
			</u-checkbox-group>
		</view> -->
		<!-- 发布 -->
		<view class="button">
			<view class="button-1" @tap="primary()">发布</view>
		</view>
	</view>
</template>

<script>
	import dragSort from '@/packgeA/components/drag-sort/index.vue'
	import popus from '@/packgeA/components/popus/popus.vue'
	import course from '@/packgeA/components/popus/course.vue'
	export default {
		components: {
			popus,
			course,
			dragSort
		},
		data() {
			return {
				buttons: false,
				is_anonymous: 0,
				formData: {
					name: 'file'
				},
				nodes: [{
					name: 'div',
					attrs: {
						class: 'div-class',
						style: 'line-height: 60px; color: red; text-align:center;'
					},
					children: [{
						type: 'text',
						text: 'Hello&nbsp;uni-app!'
					}]
				}],
				message: '拍摄/上传视频',
				customStyle: {
					background: '#042BE3'
				},
				fileList: [

				],
				imagesUrlPath: '',
				imageList: [], //图片
				src: '', //视频存放
				checkedValue: true,
				checkedIndex: 0,
				index: 0,
				imageValue: [],
				taskMenu: ['动态', '文章', '短视频'],
				form: {
					title: '',
					instructions: '',
					label: [],
					video: '',
					file: [],
					money: '',
					label_id: [],
					cid: 0,
					course: ''
				},
				src: '',
				type: 0,
				dragSortList: [{
					image: '',
					content: '',
					img: ''
				}],
				props: {
					label: 'label'
				},
				image: [],
				src: '',
				editId: 0,
				url: this.$base_url + this.$url[19],
				urloption: '',
				tempFilePaths: [],
				tempFilePath: [],
				imgList: []
			}
		},
		onLoad(options) {
			// this.$axios({
			// 	url: this.$url[112],
			// 	data: {
			// 		extension: 'blob'
			// 	}
			// }).then(data => {
			// 	console.log(data);
			// })
			this.urloption = options
			this.editId = options.editId
			if (options.type) {
				this.type = parseInt(options.type)
			}
			if (options.editId) {
				this.getCaseDetail(options.editId)
				uni.setNavigationBarTitle({
					title: '编辑动态'
				})
			}
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				uni.showModal({
					title: '提示',
					content: '离开本页面将不会保存您输入的任何数据',
					success: res => {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
				return true //阻止默认返回行为
			}
		},
		methods: {
			uploads(i) {
				uni.showLoading({
					title: `正在上传第${i+1}张图片`,
					mask: true
				})
				this.$axios({
					url: this.$url[112],
					data: {
						// #ifdef H5
						extension: this.tempFilePath[i].name.split('.')[this.tempFilePath[i].name.split('.').length - 1]
						// #endif
						// #ifndef H5
						extension: this.tempFilePath[i].split('.')[this.tempFilePath[i].split('.').length - 1]
						// #endif
					}
				}).then(res => {
					let that = this
					if (res.code == 0) {
						uni.uploadFile({
							url: res.data.host, // 开发者服务器的URL。
							filePath: that.tempFilePath[i],
							// filePath: that.tempFilePath[i].path.slice(5),
							name: 'file', // 必须填file。
							formData: {
								key: res.data.key,
								policy: res.data.policy,
								OSSAccessKeyId: res.data.OSSAccessKeyId,
								signature: res.data.signature,
								// 'x-oss-security-token': securityToken // 使用STS签名时必传。
							},
							success: (ress) => {
								console.log(ress)
								if (ress.statusCode === 204) {
									if (that.tempFilePath.length - 1 != i) {
										i++
										that.uploads(i)
									}
									uni.hideLoading()
									that.image.push("/" + res.data.key)
									that.dragSortList[that.index].image = "/" + res.data.key
									that.dragSortList[that.index].img = "/" + res.data.key
									that.index++
									if (that.index < 9) {
										that.dragSortList.push({
											image: '',
											content: '',
											img: ''
										})
									}
								} else {
									if (that.tempFilePath.length - 1 != i) {
										i++
										that.upload(i)
									}
									uni.hideLoading()
								}
							},
							fail: err => {
								console.log(err);
							}
						});
					}
				})
			},
			upload(i) {
				// uni.showLoading({
				// 	title: `正在上传第${i+1}张图片`,
				// 	mask: true
				// })
				this.$axios({
					url: this.$url[112],
					data: {
						// #ifdef H5
						extension: this.tempFilePaths[i].name.split('.')[this.tempFilePaths[i].name.split('.').length - 1]
						// #endif
						// #ifndef H5
						extension: this.tempFilePaths[i].split('.')[this.tempFilePaths[i].split('.').length - 1]
						// #endif
					}
				}).then(res => {
					let that = this
					if (res.code == 0) {
						console.log({
							url: res.data.host, // 开发者服务器的URL。
							filePath: that.tempFilePaths[i].path,
							name: 'file', // 必须填file。
							formData: {
								key: res.data.key,
								policy: res.data.policy,
								OSSAccessKeyId: res.data.OSSAccessKeyId,
								signature: res.data.signature,
								// 'x-oss-security-token': securityToken // 使用STS签名时必传。
							}});
						uni.uploadFile({
							url: res.data.host, // 开发者服务器的URL。
							filePath: that.tempFilePaths[i].path,
							name: 'file', // 必须填file。
							formData: {
								key: res.data.key,
								policy: res.data.policy,
								OSSAccessKeyId: res.data.OSSAccessKeyId,
								signature: res.data.signature,
								// 'x-oss-security-token': securityToken // 使用STS签名时必传。
							},
							success: (ress) => {
								console.log(ress)
								if (ress.statusCode === 204) {
									if (that.tempFilePaths.length - 1 != i) {
										i++
										that.upload(i)
									}
									uni.hideLoading()
									console.log(res.data.key);
									that.imgList.push("/" + res.data.key)
									console.log('上传成功');
								} else {
									if (that.tempFilePaths.length - 1 != i) {
										i++
										that.upload(i)
									}
									uni.hideLoading()
								}
							},
							fail: err => {
								console.log(err);
							}
						});
					}
				})
			},
			ossImage() {
				let count = 9 - this.imgList.length
				let that = this
				uni.chooseImage({
					count: count,
					sizeType: ['compressed'],
					success: (chooseImageRes) => {
						// #ifdef H5
						that.tempFilePaths = chooseImageRes.tempFiles;
						that.upload(0)
						// #endif
						// #ifndef H5
						that.tempFilePaths = chooseImageRes.tempFilePaths;
						that.upload(0)
						// #endif
					}
				});
			},
			//匿名发布
			checkboxChange(e) {
				// console.log(e.value);
				if (e.value) {
					this.is_anonymous = 1
					// console.log(this.is_anonymous,"this.is_anonymous")
				} else {
					this.is_anonymous = 0
					// console.log(this.is_anonymous,"this.is_anonymous")
				}
			},
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId')
				// #endif
				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery()
					.select('#editor')
					.context(res => {
						this.editorCtx = res.context
					})
					.exec()
				// #endif
			},
			// 移除图片
			remove(res) {

				this.fileList.splice(res, 1)
				this.form.file.splice(res, 1)
			},
			// 上传视频
			chooseVideo() {
				if (this.imgList.length > 0) {
					this.imgList = []
				}
				let _this = this
				uni.chooseVideo({
					maxDuration: 60,
					sourceType: ['camera', 'album'],
					success: function(res1) {
						if (res1.size > 1048576 * 200) {
							uni.showToast({
								title: '上传大小超过最大值',
								icon: 'none'
							})
							return
						}
						uni.showLoading({
							title: '上传中',
						});
						_this.message = '上传中'
						_this.$axios({
							url: _this.$url[112],
							data: {
								// #ifdef H5
								extension: res1.tempFile.name.split('.')[res1.tempFile.name.split('.').length - 1]
								// #endif
								// #ifndef H5
								extension:res1.tempFilePath.split('.')[res1.tempFilePath.split('.')
								.length - 1]
								// #endif
							}
						}).then(res => {
							if (res.code == 0) {
								uni.uploadFile({
									url: res.data.host, // 开发者服务器的URL。
									filePath: res1.tempFilePath,
									name: 'file', // 必须填file。
									formData: {
										key: res.data.key,
										policy: res.data.policy,
										OSSAccessKeyId: res.data.OSSAccessKeyId,
										signature: res.data.signature,
										// 'x-oss-security-token': securityToken // 使用STS签名时必传。
									},
									success: (ress) => {
										if (ress.statusCode === 204) {
											uni.hideLoading()
											_this.message = '重新上传'
											_this.form.video = '/' + res.data.key
										} else {
											uni.showToast({
												title: '上传失败',
												icon: 'none'
											})
										}
									},
									fail: err => {
										console.log(err);
									}
								});
							}
						})
					}
				});
			},
			deleteImg(index) {
				this.imgList.splice(index, 1)
			},
			//发布
			primary() {
				let exchange_id = this.urloption.circleId
				let special_id = this.urloption.topicId
				let axiosRequest = {}
				//标题的必填项
				if (this.type == 0 || this.type == 1) {
					if (this.imgList.length == 0) {
						uni.showToast({
							title: '请上传图片',
							icon: 'none'
						})
						return
					}
				} else {
					this.imgList = []
				}
				let content = []

				for (let i = 0; i < this.dragSortList.length; i++) {
					if (this.dragSortList[i].img || this.dragSortList[i].content) {
						content.push({
							img: this.dragSortList[i].img,
							content: this.dragSortList[i].content
						})
					}
				}
				if (this.type == 0 || this.type == 2) {
					content = []
				}
				let file = []
				this.imgList.forEach(res => {
					file.push(res)
				})
				if (exchange_id == undefined && special_id == undefined) {
					axiosRequest = {
						url: this.$url[58],
						data: {
							id: this.editId,
							type: this.type,
							title: this.form.title,
							cid: this.form.cid,
							instructions: this.form.instructions,
							label_id: this.form.label_id,
							content: content,
							file,
							video: this.form.video,
							is_anonymous: this.is_anonymous
						}
					}
				} else if (exchange_id != undefined && special_id == undefined) {
					axiosRequest = {
						url: this.$url[58],
						data: {
							id: this.editId,
							type: this.type,
							title: this.form.title,
							cid: this.form.cid,
							instructions: this.form.instructions,
							label_id: this.form.label_id,
							content: content,
							file,
							exchange_id,
							video: this.form.video,
							is_anonymous: this.is_anonymous
						}
					}
				} else if (exchange_id == undefined && special_id != undefined) {
					axiosRequest = {
						url: this.$url[58],
						data: {
							id: this.editId,
							type: this.type,
							title: this.form.title,
							cid: this.form.cid,
							instructions: this.form.instructions,
							label_id: this.form.label_id,
							content: content,
							file,
							special_id,
							video: this.form.video,
							is_anonymous: this.is_anonymous
						}
					}
				}
				this.$axios(axiosRequest).then(data => {
					if (data.code == 0) {
						let that = this
						uni.showModal({
							title: '提示',
							content: this.editId ? '编辑成功' : '发布成功',
							cancelText: '返回',
							success: function(res) {
								if (res.confirm) {
									console.log(res)
									uni.switchTab({
										url: '/pages/case/case'
									})
									uni.setStorageSync('is_shile', true)
								} else if (res.cancel) {
									uni.switchTab({
										url: '/pages/case/case'
									})
								}
							}
						})
					}
				})
			},

			// 编辑得时候获取页面得数据
			getCaseDetail(id) {
				this.$axios({
					url: this.$url[49],
					data: {
						id
					}
				}).then(data => {
					if (data.code == 0) {
						const res = data.data
						this.type = res.type
						res.file.forEach(file => {
							this.fileList.push({
								url: this.common.imgUrl(file)
							})
						})
						if (res.content) {
							this.dragSortList = []
							res.content.forEach(item => {
								console.log(item)
								this.dragSortList.push({
									...item,
									image: this.common.imgUrl(item.img)
								})
							})
						}
						this.form.title = res.title
						this.form.instructions = res.instructions
						this.form.cid = res.cid
						this.form.course = res.course.name;
						(this.form.label_id = res.label_id),
						(this.form.file = res.file),
						console.log(this.form.file, 'file');
						(this.form.video = res.video_url), console.log(res, this.form, 'res')
						res.label.forEach(item => {
							this.form.label.push({
								...item,
								type: true
							})
						})
					}
				})
			},
			uploadSuccess(res) {
				if (res.code == 0) {
					this.form.file.push(res.data)
				} else {
					uni.showModal({
						title: '上传图片失败',
						content: res.msg,
						showCancel: false,
						confirmText: '确定'
					});
				}

			},
			//获取图片
			chooseImage() {
				let count = 9 - this.image.length
				console.log(count);
				let that = this
				uni.chooseImage({
					count: count,
					sizeType: ['compressed'],
					success: (chooseImageRes) => {
						// console.log(chooseImageRes.tempFiles[0].name);
						// #ifndef H5
						console.log(chooseImageRes);
						that.tempFilePath = chooseImageRes.tempFilePaths;
						that.uploads(0)
						// #endif
					}
				});
			},
			previewImage: function(e) {
				//预览图片
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			delect(index) {
				uni.showModal({
					title: '提示',
					content: '是否要删除该图片',
					success: res => {
						if (res.confirm) {
							this.imageList.splice(index, 1)
						}
					}
				})
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 删除
			Remove(index) {
				this.index--
				this.dragSortList.splice(index, 1)
				this.image.splice(index, 1)
			},
			//获取文本
			contentInput(e) {
				this.dragSortList[e.index].content = e.content
			},
			changeMenu(index) {
				// this.form.file = []
				this.type = index
			},
			bindPickerChange(e) {
				this.index = e.target.value
			},
			// 获取选中的标签
			// 获取组件传过来的值
			getCard(res) {
				console.log(res, 'resss')
				if (res.length != 0) {
					this.form.label = res
					// this.form.label_id=[]
					// 	for(let i=0;i<this.form.label.length;i++){
					// 		console.log(this.form.label[i].id)
					// 		this.form.label_id.push(
					// 			this.form.label[i].id
					// 		)
					// 	}

					this.form.label_id = []
					this.form.label.forEach(item => {
						this.form.label_id.push(item.id)
					})
				}
			},
			getCourse(res) {
				this.form.cid = res.id
				this.form.course = res.name
			},
			// 删除选定的标签
			deletes(res) {
				this.form.label.splice(res, 1)
				this.form.label_id.splice(res, 1)
				console.log(this.form.label, this.form.label_id)
			},
			//获取草稿信息
			getDraft() {
				let that = this
				uni.getStorage({
					key: 'draft' + that.type,
					success(res) {
						that.title = res.data.title
						that.caseText = res.data.caseText
						that.labelActive = res.data.labelActive
						that.imageList = res.data.imageList
						that.index = res.data.imageList.length - 1
						that.imageList.forEach((item, i) => {
							if (item.img) {
								that.imageList[i].image = this.$request.img_url + item.img
								that.image.push(that.imageList[i].image)
							}
						})
					}
				})
			},
			onDragSortChange(e) {
				let imageList = []
				let img = []
				let index = 0
				let image = []
				this.dragSortList.forEach((item, i) => {
					if (item.img == e.data.img) {
						img = item
					} else {
						imageList.push(item)
						if (item.image) {
							image.push(item.image)
						}
					}
				})
				if (!e.frontData) {
					imageList.unshift(img)
					if (img.image) {
						image.unshift(img.image)
					}
				} else {
					this.dragSortList.forEach((item, i) => {
						if (item.img == e.frontData.img) {
							imageList.splice(i + 1, 0, img)
							if (img.image) {
								image.splice(i + 1, 0, img.image)
							}
						}
					})
				}
				this.image = image
				this.dragSortList = imageList
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-list {
		font-weight: 700;
	}

	.base64 {
		width: 100%;
		margin-top: 10rpx;
		border-radius: 10rpx;
		height: 480rpx;
		overflow: hidden;
	}

	.base64>image {
		width: 100%;
		object-fit: cover;
		height: 100%;
	}

	.uni-input {
		display: flex;
		align-items: center;
	}

	.select-success {
		color: #ff5e00 !important;
		border: 1px solid #ff5e00 !important;
	}

	.burst-wrap {
		width: 100%;
		height: 100%;
	}

	.burst-wrap .burst-wrap-bg>view {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		position: absolute;
		top: 65upx;
		left: 0;
		right: 0;
	}

	.form-item {
		width: 100%;
	}

	.form-item textarea {
		display: block;
		height: 220upx;
		width: 100%;
		color: #aaaaaa;
		font-size: 28upx;
	}

	.uni-uploader__file,
	.uploader_video {
		position: relative;
		z-index: 1;
		width: 200upx;
		height: 200upx;
	}

	.uni-uploader__img {
		width: 200upx;
		height: 200upx;
	}

	.icon-cuo {
		position: absolute;
		right: 0;
		top: 5upx;
		background: linear-gradient(90deg, rgba(251, 91, 80, 1) 0%, rgba(240, 45, 51, 1) 100%);
		color: #ffffff;
		z-index: 999;
		border-top-right-radius: 20upx;
		border-bottom-left-radius: 20upx;
	}

	.video {
		width: 100%;
		height: 100%;
	}

	.login-input-box {
		position: relative;
		border-bottom: 1upx solid #eeeeee;
	}

	.login-input-box .forget,
	.login-input-box .phone {
		position: absolute;
		top: 0;
		height: 100%;
		z-index: 100;
	}

	.login-input-box .phone {
		width: 100upx;
		left: 0;
		color: #666666;
		font-weight: bold;
	}

	.login-input-box .phone-input {
		padding-left: 100upx;
	}

	.address-wrap,
	.open-info {
		margin-top: 20upx;
	}

	.open-info>view:last-child {
		font-size: 28upx;
		color: #999999;
	}

	.address-wrap .address {
		background: #f2f2f2;
		border-radius: 40upx;
		padding: 0 20upx;
	}

	.user-set-btn {
		margin: 40upx;
		background: linear-gradient(90deg, rgba(251, 91, 80, 1) 0%, rgba(240, 45, 51, 1) 100%);
		color: #ffffff;
		text-align: center;
		height: 88upx;
		line-height: 88upx;
	}

	.task-menu {
		position: sticky;
		top: 0rpx;
		padding: 20rpx;
		background: #fff;
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #e9e9e9;
		z-index: 9;
		font-size: 24rpx;
	}

	.menu-current {
		color:$project-color;
	}

	.lock-flex {
		display: flex;
		align-items: center;
	}

	.card-flex {
		display: flex;
		flex-wrap: wrap;
		flex: 1;
		align-items: center;
	}

	.flex-center {
		display: flex;
		align-items: center;
	}

	.bindAdd {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.uni-input {
		color: #c4c8cc;
		font-size: 28upx;
		padding: 0 40upx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: 10%;
	}

	.select-item {
		display: flex;
		padding-bottom: 29upx;
	}

	.close-img {
		width: 30rpx;
		height: 30rpx;
	}

	.select-list {
		border: 1px solid #f9f9f9;
		padding: 0 24upx;
		background: #f9f9f9;
		border-radius: 20upx;
		margin-right: 25upx;
		color: #000;
		font-size: 24upx;
	}

	.binding {
		display: flex;
		align-items: center;
		padding: 38upx;
		background-color: #fff;
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
		border: 1px solid #ff5e00;
		padding: 6upx 34upx;
		background: #ffeee4;
		border-radius: 28upx;
		/* 	font-size: 30rpx; */
		line-height: 1.1;
		color: rgba(255, 94, 0, 1);
		font-size: 26upx;
		margin-right: 10rpx;
	}

	.binding-image {
		color: #000;
		font-size: 30upx;
		line-height: 1;
		display: flex;
		align-items: center;
		margin-right: 15upx;
	}

	.binding-image>image {
		width: 28upx;
		height: 28upx;
		margin-right: 11upx;
	}

	.button {
		display: flex;
		justify-content: center;
		margin: 40upx 0;
	}

	.button-1 {
		width: 70%;
		padding: 12upx 0;
		color: #fff;
		font-size: 30upx;
		background: $project-color;
		border-radius: 35upx;
		text-align: center;
		font-weight: 700;
	}

	.money-input {
		width: 100%;
	}

	.money {
		display: flex;
		align-items: center;
		padding-top: 47upx !important;
		padding-bottom: 47upx !important;
	}

	.money-image {
		width: 27.57upx;
		height: 27.57upx;
		margin-right: 20upx;
	}

	.address {
		width: 25.55upx !important;
		height: 33.53upx !important;
	}

	.form-picker {
		display: flex;
		align-items: center;
	}

	.arrow {
		width: 9.9upx;
		height: 18.24upx;
	}

	.uni-list-cell {
		max-width: 50%;
	}

	.form-select {
		display: flex;
		justify-content: space-between;
	}

	.uni-list-cell-left {
		display: flex;
		align-items: center;
		color: #0a0a0a;
		font-size: 28upx;
		padding: 28upx 0;
	}

	.uni-list-cell-left>image {
		width: 27.29upx;
		height: 27.29upx;
		margin-right: 17upx;
	}

	.card-add {
		padding: 8upx 22upx;
		background: #e9e9e9;
		border-radius: 14upx;
		line-height: 1;
		color: #b1acac;
	}

	.card-list {
		margin-bottom: 10rpx;
		padding: 0 20rpx;
		background: #2f6bdd33;
		border: 1px solid $project-color;
		border-radius: 14upx;
		line-height: 1;
		color: $project-color;
		align-items: center;
		margin-right: 20upx;
		font-size: 30rpx;
	}

	.form-card {
		display: flex;
		padding: 38upx;
		align-items: flex-start;
		background: #fff;
	}

	/* 标签 */
	.card {
		color: #000;
		font-size: 26upx;
		margin-right: 20upx;
	}

	.padding {
		padding: 20rpx 35upx 0;
		background: #fff;
	}

	.margin {
		margin: 20upx 0;
	}

	.task {
		background: #f9fafb;
		padding-bottom: 30rpx;
		min-height: 100vh;
	}

	.border {
		position: relative;
	}

	.border::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 1px;
		transform: scaleY(0.5);
		bottom: 0;
		left: 0;
		background: #f1f1f1;
	}

	.form-title {
		color: #a1a1a1;
		font-size: 20upx;
		display: flex;
		align-items: center;
		padding: 46upx 0 21upx;
	}

	.form-title-input {
		width: 95% !important;
		color: #000000 !important;
	}

	.form-textarea-input {
		width: 100%;
		margin: 21upx 0;
		color: #000000 !important;
		color: #a1a1a1;
	}
</style>