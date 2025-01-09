<template>
	<view class="box">
		<view class="bgWhite taskDetailsBox">
			<view class="nameBox space-between u-f-ac">
				<view class="name">第1节 · {{detailsDay.name}} </view>
				<view class="status">{{status==-1?'未提交':status==0?'已提交':'已批阅'}} </view>
			</view>

			<view class="detailsBox">
				<view class="details" v-if="details.task">
					{{details.task.name}}
				</view>
				<view class="space-between detailsTeacher">
					<view class="flex u-f-ac" v-if="detailsDay.teacher">
						  <view class="roundLine">教师</view> {{detailsDay.teacher.name}}
					</view>
					<view class="flex u-f-ac">
						 <view class="roundLine">时间</view> 02-20 23:20 至 02-25 23:20
					</view>
				</view>
			</view>

			<view class="paddingBoxs">
				<!-- #ifdef MP-WEIXIN -->
				<view class="fileBox flex u-f-ac" @click="download(details.task.file_url)" v-if="details.task.file_url">
					<view class="fileType" :style="colorIndex==1?'background: #E66B2E':''">W</view>
					<view class="fileName flex-shrink">{{details.task.file_name}}</view>
				</view>
				<!-- #endif -->
				
				
				<!-- #ifdef H5 -->
				<a :href="common.imgUrl(details.task.file_url)"  class="table-btn"  target='_blank' v-if="details.task.file_url">
					<view class="fileBox flex u-f-ac"  >
						<view class="fileType" :style="colorIndex==1?'background: #E66B2E':''">W</view>
						<view class="fileName flex-shrink">{{details.task.file_name}}</view>
					</view>
				</a>
				<!-- #endif -->
				<!-- #ifdef APP -->
				<a :href="common.imgUrl(details.task.file_url)"  class="table-btn"  target='_blank' v-if="details.task.file_url">
					<view class="fileBox flex u-f-ac"  >
						<view class="fileType" :style="colorIndex==1?'background: #E66B2E':''">W</view>
						<view class="fileName flex-shrink">{{details.task.file_name}}</view>
					</view>
				</a>
				<!-- #endif -->
				<view v-html="common.content(details.task.introduce)">
				</view>

				<view class="write">
					<view class="flex u-f-ac linesBox">
						<view class="lines"></view>
						<view style="margin-top: 7rpx;">写作业</view>
					</view>
				</view>

				<!-- 输入内容 -->
				<view style="margin-top: 21rpx;">
					<u-input v-model="content" :disabled="status>-1" type="textarea" :border="true" :height="437" />
				</view>


				<!-- 上传的照片内容 -->
				<view class="imgBox flex">
					<view class="imgsBox" style="position: relative; " @click="seeImg(index)"
						:class="{marginRight:(index+1)%4!==0}" v-for="(item,index) in imgList" :key='"a"+index'>
						<image :src="common.imgUrl(item)" class="imgs" mode="scaleToFill"></image>
						<u-icon name="close-circle-fill" class="delectImg" v-if="status==-1"
							@click.stop="delectImg(index)">
						</u-icon>
					</view>
				</view>

				<!-- //上传照片 -->
				<view class="uploadImg flex-center" v-if="status==-1" @click="pictureUpload">
					<u-icon name="plus" color="#989898" size="50"></u-icon>
				</view>


				<!-- 教师批语 -->
				<view v-if="status==1">
					<view class="write">
						<view class="flex u-f-ac linesBox">
							<view class="lines"></view>
							<view style="margin-top: 7rpx;">教师批语</view>
						</view>
					</view>
					<view class="fractionBox">分数：<text class="fraction">{{details.taskSubmit.review_fraction}}</text></view>
					<view class="fractionBox">
						批阅内容:{{details.taskSubmit.review_content}}
					</view>
				</view>


				<u-button v-if="status==-1"  @click="submitTask" shape="circle" 
				:custom-style='{height:"70rpx",marginTop:"108rpx"}'
				type="success">提交作业
				</u-button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dayId: 0,
				taskId: 0,
				status: -1,
				details: {
					taskSubmit:{},
					task:{},
				},
				colorIndex:1,
				detailsDay: {},
				content: '', //作业内容
				imgList: [], //上传的图片
			}
		},
		onLoad(option) {
			this.dayId = option.courseId
			this.taskId = option.taskId
			this.status = option.status
			this.getTaskDetails()
			this.getSectionDetails()
		},
		methods: {
			//获取作业详情
			getTaskDetails() {
				this.$axios({
					url: this.$url[17],
					data: {
						id: this.dayId,
						task_id: this.taskId
					}
				}).then(res => {
					console.log(res)
					this.details = res.data
			        if(this.status!=-1){
						this.content=res.data.taskSubmit.content
						this.imgList=res.data.taskSubmit.file_list
					}
				})
			},
			// 获取课节详情
			getSectionDetails() {
				this.$axios({
					url: this.$url[15],
					data: {
						id: this.dayId
					}
				}).then(res => {
					this.detailsDay = res.data
				})
			},
			//下载文件
			download(url) {
				this.common.openFile(this.common.imgUrl(url))
			},

			//上传图片
			pictureUpload() {
				let url = this.$base_url + this.$url[19]
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res)
						this.common.loading();
						res.tempFilePaths.forEach(v => {
							uni.uploadFile({
								url: url, //仅为示例，非真实的接口地址
								filePath: v,
								fileType: 'image',
								method:'POST',
								name:'file',
								formData: {
									name: 'file'
								},
								success: (uploadFileRes) => {
									console.log("上传成功")
									console.log(uploadFileRes.data)
									this.imgList.push(JSON.parse(
										uploadFileRes.data).data.url)
									uni.hideLoading();
								}
							});
						})
					}
				});
			},

			//查看照片
			seeImg(index) {
				this.common.previewImage(this.imgList,index)
			},

			//删除照片
			delectImg(index) {
				this.imgList.splice(index, 1)
			},
			// 提交作业
			submitTask() {
				if(!this.content){
				    this.$u.toast('请填写作业');
					return false
				}	
				this.$axios({
					url: this.$url[18],
					data: {
						id: this.dayId,
						task_id: this.taskId,
						content: this.content,
						file_list: this.imgList
					}
				}).then(res => {
					if (res.code == 0) {
						this.$u.toast('提交成功');
						uni.navigateBack({
							delta:1
						})
					  }
				})
		},
		}
	}
</script>

<style>
	page {
		background: #F9FAFB;
	}
</style>

<style scoped>
	.box {
		padding: 25rpx 29rpx;
	}

	.taskDetailsBox {
		background: #FFFFFF;
		border: 1px solid #E9E9E9;
		border-radius: 20rpx;
		padding-bottom: 130rpx;
	}

	.nameBox {
		padding: 30rpx 41rpx 23rpx 24rpx;
		border-bottom: 1px solid #EBEAEA;
	}

	.name {
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #2D2D2D;
	}

	.status {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FEA406;
	}

	.detailsBox {
		padding: 24rpx 32rpx;
		border-bottom: 1px solid #EBEAEA;
	}

	.details {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2D2D2D;
	}

	.roundLine {
		width: 76rpx;
		height: 32rpx;
		border: 1px solid #75C9A8;
		border-radius: 20rpx;
		font-size: 22rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 32rpx;
		text-align: center;
		color: #75C9A8;
		margin-right: 15rpx;
	}

	.detailsTeacher {
		margin-top: 24rpx;
		font-size: 22rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #666666;
	}

	.paddingBoxs {
		padding: 48rpx 32rpx 0;
	}

	.fileBox {
		padding: 19rpx 35rpx;
		background: #F4FDFA;
		border: 1px solid #E9E9E9;
		border-radius: 20rpx;
	}

	.fileType {
		width: 90rpx;
		height: 90rpx;
		background: #4392F2;
		border-radius: 2px;
		font-size: 51rpx;
		font-family: FZHei-B01S;
		color: #FFFFFF;
		text-align: center;
		line-height: 90rpx;
		margin-right: 19rpx;
	}

	.fileName {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2D2D2D;
	}

	.write {
		margin-top: 70rpx;
	}

	.lines {
		width: 5rpx;
		height: 33rpx;
		background: #FF6638;
		border-radius: 3px;
		margin-right: 20rpx;
	}

	.linesBox {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FF6638;
	}

	.uploadImg {
		width: 116rpx;
		height: 116rpx;
		background: #FFFFFF;
		border: 1px solid #dcdfe6;
		margin-top: 25rpx;
	}

	.fractionBox {
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #808080;
		margin-top: 25rpx;
		line-height: 1.6;
	}

	.fraction {
		color: #FEA406;
	}

	.imgsBox {
		width: 116rpx;
		height: 116rpx;
		margin-top: 25rpx;
	}

	.imgs {
		width: 100%;
		height: 100%;
	}

	.marginRight {
		margin-right: 54rpx;
	}

	.imgBox {
		flex-wrap: wrap;
	}

	.delectImg {
		position: absolute;
		right: -10rpx;
		top: -20rpx;
	}
	
</style>
