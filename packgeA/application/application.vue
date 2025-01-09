<template>
	<view style="background: #f6f6f6;overflow: hidden;">
		<view class="application-title">
			<view class="title-img">
				<img :src="common.imgUrl(list.img)">
			</view>
			<view class="title-name"> 
			{{list.name}} <br>
			{{list.effective_start_time}} - {{list.effective_end_time}}
			</view>
		</view>
		<view class="box" v-if="list.user_info">
			<view class="item u-f-ac">
				<view class="text">姓名</view>
				<u-input placeholder="请输入姓名" :custom-style="{
						fontSize: '32rpx',
						color: ' #2D2D2D',
					}" v-model="name" input-align="right" />
			</view>
			<view class="item u-f-ac">
				<view class="text">联系电话</view>
				<u-input placeholder="请输入联系电话" :custom-style="{
						fontSize: '32rpx',
						color: ' #2D2D2D',
					}" v-model="phone" input-align="right" />
			</view>
			<view class="item u-f-ac" v-if="list.user_info.indexOf('gender')!=-1">
				<!-- <view class="item u-f-ac" v-model="gender"> -->
				<view class="text">性别</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="selectGender1" :value="index2" :range="array2">
								<view class="uni-input" v-model="gender">{{ array2[index2] }}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="item u-f-ac" v-if="list.user_info.indexOf('birthday')!=-1">
				<!-- <view class="item u-f-ac" v-model="birthday"> -->
				<view class="text">生日</view>
				<view class="uni-list">
					<view class="uni-list-cell-db">
						<picker mode="date" :value="index" :end="endDate"  @change="bindDateChange" style="height: 70rpx;line-height: 70rpx; padding-right: 0;">
							<view class="uni-input" v-model="birthday">{{ date }}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="item u-f-ac" v-if="list.user_info.indexOf('school')!=-1">
				<view class="text">学校</view>
				<u-input placeholder="请输入学校名称" :custom-style="{
						fontSize: '32rpx',
						color: ' #2D2D2D',
					}"  v-model="school" input-align="right" />
			</view>
			<view class="item u-f-ac" v-if="list.user_info.indexOf('grade')!=-1">
				<!-- <view class="item u-f-ac" v-model="grade"> -->
				<view class="text">年级</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker @change="selectGender" :value="index1" :range="array1">
								<view class="uni-input" v-model="grade">{{ array1[index1] }}</view>
							</picker>
						</view>
						<!-- <view class="uni-list-cell-img" @change="selectGender" >
							<img :src="common.imgUrl('/static/right1.png')" alt="">
						</view> -->
					</view>
				</view>
			</view>
			<view class="item u-f-ac" v-if="list.user_info.indexOf('address')!=-1">
				<view class="text">地址</view>
				<u-input placeholder="请输入地址" :custom-style="{
						fontSize: '32rpx',
						color: ' #2D2D2D',
					}"  v-model="address" input-align="right" />
			</view>
			<view class="item u-f-ac" v-if="list.user_info.indexOf('remark')!=-1">
				<view class="text">备注</view> <br />
				<u-input placeholder="请输入备注" :custom-style="{
						fontSize: '32rpx',
						color: ' #2D2D2D',
					}"  v-model="remark" input-align="right" />
			</view>
			<!-- <view class="synopsis">
				<view style="line-height: 80rpx;color: #656565;">备注</view>
				<view style="margin-top: 10rpx;"><textarea placeholder="请输入你的备注" auto-height /></view>
			</view> -->
		</view>
		<view class="application" @click="application()"> 立即报名 </view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				array1: ['请选择年级', '小班', '大班', '学前班', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一',
					'高二', '高三'
				],
				array2: ['请选择性别','未知','男','女'],
				index: 0,
				index1: 0,
				index2: 0,
				date: '请选择生日',
				list: {},
				name: '',
				phone: '',
				birthday: '',
				gender: '',
				grade: '',
				school: '',
				address: '',
				remark: '',
				id: ''
			};
		},
		onLoad(option) {
			this.id = option.id
			this.$axios({
				url: this.$url[107],
				data: {
					id: option.id
				}
			}).then(res => {
				console.log(res);
				this.list = res.data
			})
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
			isPhone() {
				let mPattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
				return mPattern.test(this.phone)
			},
			application() {
				if (this.name == '') {
					this.$u.toast('请填写姓名')
					return
				}
				if (this.phone == '') {
					this.$u.toast('请填写手机号')
					return
				}
				if (this.list.user_info.indexOf('grade') != -1) {
					if (this.index1 == '') {
						this.$u.toast('请选择年级')
						return
					}
				}else{
					this.index1 = ''
				}
				if (this.list.user_info.indexOf('school') != -1) {
					if (this.school == '') {
						this.$u.toast('请填写学校')
						return
					}
				}else{
					this.school = ''
				}
				if (this.list.user_info.indexOf('birthday') != -1) {
					if (this.date == '请选择生日') {
						this.$u.toast('请选择生日')
						return
					}
				}else{
					this.date = ''
				}
				if (this.list.user_info.indexOf('gender') != -1) {
					if (this.index2 == '') {
						this.$u.toast('请选择性别')
						return
					}
				}else{
					this.index2 = ''
				}
				if (this.list.user_info.indexOf('address') != -1) {
					if (this.address == '') {
						this.$u.toast('请填写地址')
						return
					}
				}else{
					this.address = ''
				}
				if (this.list.user_info.indexOf('remark') != -1) {
					if (this.remark == '') {
						this.$u.toast('请填写备注')
						return
					}
				}else{
					this.remark = ''
				}
				this.$axios({
					url: this.$url[108],
					data: {
						id: this.id,
						name: this.name,
						phone: this.phone,
						birthday: this.date,
						gender: this.index2-1,
						grade: this.index1 == 0 ? '' : this.array1[this.index1],
						school: this.school,
						address: this.address,
						remark: this.remark,
					}
				}).then(res => {
					if (res.code == 0) {
						uni.stopPullDownRefresh()
						this.name = ''
						this.school = ''
						this.phone = ''
						this.birthday = ''
						this.gender = ''
						this.address = ''
						this.remark = ''
						this.grade = ''
						uni.showToast({
							title: '报名成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/packgeA/studentRegistration/studentRegistration?id=' + this
									.id,
							})
						}, 1000)
					}
				})
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			selectGender: function(e) {
				this.index1 = e.detail.value
			},
			selectGender1: function(e) {
				this.index2 = e.detail.value
			},
			getDate(type) {
				const dates = new Date()
				let year = dates.getFullYear()
				let month = dates.getMonth() + 1
				let day = dates.getDate()
				if (type === 'start') {
					year = year - 60
				} else if (type === 'end') {
					
				}
				month = month > 9 ? month : '0' + month
				day = day > 9 ? day : '0' + day
				return `${year}-${month}-${day}`
			}
		}
	}
</script>
<style lang="scss">
	/deep/.uni-textarea-placeholder {
		color: rgb(192, 196, 204) !important;
		overflow: hidden;
	}

	.application-title {
		width: 100%;
		display: flex;
		background-color: white;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
		padding: 30rpx 0;

		.title-img {
			width: 300rpx;
			// background-color: red;
			height: 170rpx;
			margin-left: 24rpx;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.title-name {
			width: 400rpx;
			height: 170rpx;
			line-height: 85rpx;
			margin-left: 26rpx;
			color: #2d2d2d;
		}
	}

	.box {
		.item {
			height: 100rpx;
			background-color: white;
			padding: 0 20rpx;
			margin-bottom: 4rpx;

			// border-bottom: #656565 2rpx solid;
			.uni-list {
				width: 70%;
				text-align: right;
				// color: rgb(192, 196, 204);
				overflow: hidden;
				// .uni-list-cell{
				// 	display: flex;
				// 	justify-content: space-between;
				// 	align-items: center;
				// 	.uni-list-cell-db{
				// 		line-height: 72rpx;
				// 	}
				// }
			}
		}

		.headBox {
			margin-bottom: 92rpx;
		}

		.header {
			width: 123rpx;
			height: 123rpx;
			border-radius: 50%;
		}

		.text {
			width: 30%;
			color: #656565 !important;
			font-size: 34rpx;
			font-family: Source Han Sans SC;
			color: #2d2d2d;
			opacity: 1;
		}
	}

	.application {
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		margin-top: 100rpx;
		background-color: rgb(255, 102, 56);
		color: white;
	}
</style>
