<template>
	<view>
		<view class="box">
			<view class="space-between u-f-ac headBox">
				<view class="text">头像</view>
				<button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar" class="header"
					style="padding-left: 0rpx;padding-right: 0rpx;    position: absolute;right: 80rpx">
					<image class="header" :src="common.imgUrl(form.avatar_url)" mode="aspectFill"></image>
				</button>
			</view>
			<view class="item space-between u-f-ac">
				<view class="text">昵称</view>
				<input type="nickname" placeholder="请输入昵称 " :custom-style="{ fontSize: '32rpx', color: ' #2D2D2D', }"
					input-align="right" :clearable="false" v-model="form.nick" maxlength="8" @change="onChooseName" style="text-align: right;color:#2D2D2D"  />
			</view>
			<view class="item space-between u-f-ac" @click="
					() => {
						show = true
					}
				">
				<view class="text">性别</view>
				<view class="text">{{ form.gender == 0 ? '未知' : form.gender == 1 ? '男' : '女' }}</view>
			</view>
			<view class="item space-between u-f-ac">
				<view class="text">绑定手机号</view>
				<u-input placeholder="请输入手机号 " disabled :custom-style="{ fontSize: '32rpx', color: ' #2D2D2D' }"
					input-align="right" v-model="form.phone" :clearable="false" />
			</view>
			<!-- <view class="item space-between u-f-ac">
				<view class="text">学校选择</view>
				<u-input
					placeholder="请输入学校 "
					:custom-style="{ fontSize: '32rpx', color: ' #2D2D2D' }"
					input-align="right"
					v-model="form.school"
				/>
			</view> -->
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">生日</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="form.birthday" :start="startDates" :end="endDates"
							@change="changebirthday">
							<view v-if="form.birthday">{{ form.birthday }}</view>
							<view class="uni-input" v-else>{{ date }}</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- <view class="uni-list-cell">
				<view class="uni-list-cell-left">年级选择</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input" v-if="form.grade">{{ array[form.grade] }}</view>
						<view class="uni-input" v-else>{{ array[index] }}</view>
					</picker>
				</view>
			</view> -->

			<u-select mode="single-column" :default-value="[parseInt(form.gender) - 1]" v-model="show" :list="list"
				@confirm="confirm"></u-select>
			<view class="synopsis">
				<view>简介</view>
				<view><textarea placeholder="请输入你的简介" v-model="form.profile" auto-height /></view>
			</view>
		</view>
		<view class="confimBox">
			<u-button shape="circle" @click="updateInfo" :custom-style="{ height: '90rpx', background: '#042BE3' }"
				type="success">
				确定
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		upLoadFile
	} from "@/plugin/api/index.js";
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				form: {},
				show: false,
				list: [{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				],
				title: 'picker',
				array: [
					'请选择',
					'小班',
					'大班',
					'学前班',
					'一年级',
					'二年级',
					'三年级',
					'四年级',
					'五年级',
					'六年级',
					'初一',
					'初二',
					'初三',
					'高一',
					'高二',
					'高三'
				],
				index: 0,
				date: currentDate,
				time: '12:01',
				textlist: '',
				startDates: '',
				endDates: ''
			}
		},
		onShow() {
			this.getInfo()
			let time = new Date()
			let y = time.getFullYear()
			let m = time.getMonth() + 1
			if (m < 10) {
				m = '0' + m
			}
			let d = time.getDate()
			if (d < 10) {
				d = '0' + d
			}
			this.startDates = `${y - 100}-01-01`
			this.endDates = `${y}-${m}-${d}`
		},
		computed: {
			startDate() {
				return this.getDate('start')
			},
			endDate() {
				return this.getDate('end')
			}
		},
		methods: {
			changebirthday(e) {
				this.form.birthday = e.detail.value
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				this.form.grade = e.detail.value
				// this.form.grade=this.index
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value
			},
			getDate(type) {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()

				if (type === 'start') {
					year = year - 60
				} else if (type === 'end') {
					year = year + 2
				}
				month = month > 9 ? month : '0' + month
				day = day > 9 ? day : '0' + day
				return `${year}-${month}-${day}`
			},
			confirm(e) {
				this.form.gender = e[0].value ? e[0].value : 1
			},
			// 获取个人信息
			getInfo() {
				this.$axios({
					url: this.$url[6]
				}).then(res => {
					if (res.code == 0) {
						this.form = res.data
						// this.index=this.grade
					}
				})
			},
			onChooseName(e){
				this.form.nick = e.detail.value
			},
			//修改个人信息
			updateInfo() {
				if (!this.form.avatar_url) {
					uni.showToast({
						title: '请上传头像',
						icon: "none"
					});
					return;
				}
				if (!this.form.nick) {
					uni.showToast({
						title: '请输入昵称',
						icon: "none"
					});
					return;
				}
				this.$axios({
					url: this.$url[22],
					data: {
						...this.form
					}
				}).then(res => {
					if (res.code == 0) {
						this.$u.toast('修改成功')
						uni.reLaunch({
							url: '/pages/my/my'
						})
					}
				})
			},
			onChooseavatar(e) {
				let {
					avatarUrl
				} = e.detail;
				uni.showLoading({
					title: '上传中'
				})
				upLoadFile(avatarUrl,this.$base_url +  this.$url[19]).then(res => {
					uni.hideLoading()
					this.form.avatar_url = res.url
				}).catch(() => {
					uni.hideLoading()
				})
			},
			//上传图片
			pictureUpload() {
				let url = this.$base_url + this.$url[19]
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: res => {
						console.log(res)
						res.tempFilePaths.forEach(v => {
							uni.uploadFile({
								url: url, //仅为示例，非真实的接口地址
								filePath: v,
								fileType: 'image',
								method: 'POST',
								name: 'file',
								formData: {
									name: 'file'
								},
								success: uploadFileRes => {
									console.log(uploadFileRes)
									console.log(JSON.parse(uploadFileRes.data))
									this.form.avatar_url = JSON.parse(uploadFileRes.data)
										.data.url
								}
							})
						})
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	/deep/.u-btn--success {
		color: #ffffff;
		border-color: $project-color;
		background-color: $project-color;
	}

	.box {
		padding: 66rpx 74rpx 0 24rpx;

		.headBox {
			margin-bottom: 92rpx;
		}

		.header {
			width: 123rpx;
			height: 123rpx;
			border-radius: 50%;
		}

		.text {
			font-size: 32rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #2d2d2d;
			opacity: 1;
		}

		.item {
			margin-bottom: 55rpx;
		}
	}

	.confimBox {
		padding: 0 29rpx;
		margin-top: 50rpx;

		/deep/ .u-success-hover {
			background-color: $project-color !important;
		}
	}

	.uni-list-cell {
		overflow: hidden;
		margin-bottom: 54rpx;
		font-size: 32rpx;
	}

	.uni-list-cell-left {
		width: 50%;
		float: left;
		font-size: 32rpx;
	}

	.uni-list-cell-db {
		width: 50%;
		float: right;
		text-align: right;
		font-size: 32rpx;
	}

	.synopsis {
		font-size: 32rpx;

		view {
			font-size: 32rpx;
		}
	}

	textarea {
		width: 648rpx;
		border-radius: 12rpx;
		margin-top: 10rpx;
	}
</style>