<template>
	<view>
		<!-- 用户选择 -->
		<view class="userSelection">
			<view class="relationship">
				<span class="must">*</span>
				关系
			</view>

			<zcscrool  :lL="relationship.length">
				<view class="scroolTd">
					<view class="image-box3" v-for="(item, index) in relationship" :key="index">
						<view
							class="image1"
							:class="memberType == index + 1 ? 'active' : ''"
							@click="memberType = index + 1"
						>
							<img :src="common.imgUrl(item.img)" alt="" :style="{ width: item.width, height: item.height }" />
							<p class="q">{{ item.name }}</p>
						</view>
					</view>
				</view>
			</zcscrool>
			
			
		</view>
		<!-- 结束用户选择 -->
		<!-- 信息填写 -->
		<view class="informationFilling">
			<p class="information">
				<span class="must">*</span>
				姓名
			</p>
			<u-input
				placeholder="请输入姓名 "
				:custom-style="{
					fontSize: '32rpx',
					color: ' #2D2D2D',
					borderBottom: '3rpx solid gainsboro'
				}"
				v-model="name"
			/>
			<p class="information">
				<span class="must">*</span>
				昵称
			</p>
			<u-input
				placeholder="请输入昵称 "
				:custom-style="{
					fontSize: '32rpx',
					color: ' #2D2D2D',
					borderBottom: '3rpx solid gainsboro'
				}"
				v-model="nick"
			/>
			<p class="information" v-if="!$store.state.username">手机号</p>
			<u-form
				:model="phoneForm"
				ref="uForm"
				:label-style="{ color: '#2D2D2D', fontSize: '32rpx', fontWeight: '400' }"
				v-if="!$store.state.username"
			>
				<u-form-item>
					<view class="inputType" style="width:100%;">
						<u-input :border="true" placeholder="请输入手机号" v-model="phoneForm.phone" />
					</view>
				</u-form-item>
				<u-form-item class="u-input-bottom">
					<view class="" style="width:100%;overflow: hidden;display: flex;justify-content: space-between;">
						<view class="" style="width:400rpx;">
							<u-input
								:border="true"
								placeholder="请输入验证码"
								v-model="phoneForm.code"
								style="width:60%;overflow: hidden;"
							/>
						</view>

						<view class="getVerification" @click="getCode">{{ tips }}</view>
					</view>

					<view class="">
						<!-- <u-button type="success" size='mini' :custom-style='{background:"#FF6638"}'>获取验证码</u-button> -->
						<view class="wrap">
							<u-toast ref="uToast"></u-toast>
							<u-verification-code
								:seconds="seconds"
								ref="uCode"
								@change="codeChange"
							></u-verification-code>
							<!-- <u-button type="success" @click="getCode" size='mini'
								:custom-style='{background:"#FF6638"}'> {{tips}} </u-button> -->
						</view>
					</view>
				</u-form-item>
			</u-form>
			<!-- <p class="information">
				<span class="must">*</span>
				性别
			</p>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input" v-model="gender">{{ array[index] }}</view>
						</picker>
					</view>
				</view>
			</view> -->
			<p class="information">
				<span class="must">*</span>
				身高
			</p>
			<u-input
				placeholder="请输入身高(cm) "
				:custom-style="{
					fontSize: '32rpx',
					color: ' #2D2D2D',
					borderBottom: '3rpx solid gainsboro'
				}"
				v-model="height"
			/>
			<p class="information">
				<span class="must">*</span>
				体重
			</p>
			<u-input
				placeholder="请输入体重(kg) "
				:custom-style="{
					fontSize: '32rpx',
					color: ' #2D2D2D',
					borderBottom: '3rpx solid gainsboro'
				}"
				v-model="weight"
			/>
			<p class="information">
				<span class="must">*</span>
				出生日期
			</p>
			<view class="uni-list">
				<view class="uni-list-cell-db">
					<picker mode="date" :value="index" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input" v-model="brith">{{ date }}</view>
					</picker>
				</view>
			</view>
			<p class="information">
				<span class="must">*</span>
				学校
			</p>
			<u-input
				placeholder="请输入学校 "
				:custom-style="{
					fontSize: '32rpx',
					color: ' #2D2D2D',
					borderBottom: '3rpx solid gainsboro'
				}"
				v-model="school"
			/>
			<p class="information">
				<span class="must">*</span>
				年级
			</p>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="selectGender" :value="index1" :range="array1">
							<view class="uni-input" v-model="grade">{{ array1[index1] }}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="confimBox1" @click="addMember()">完成</view>
		</view>
		<storeInformation></storeInformation>
	</view>
</template>

<script>
	import zcscrool from '@/components/zc-scroll/zc-scroll.vue'
	import storeInformation from "@/components/storeInformation.vue";
export default {
	components: {
		zcscrool,
		storeInformation
	},
	name: 'aiGrowUpPlan',
	data() {
		const currentDate = this.getDate({
			format: true
		})
		return {
			phoneForm: {
				phone: '',
				code: ''
			},
			tips: '',
			isCode: true,
			seconds: 60,
			title: 'picker',
			array: ['未知', '男', '女'],
			array1: [
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
			index1: 0,
			date: currentDate,
			time: '12:01',
			memberType: 1, //成员类型
			name: '',
			nick: '',
			height: '',
			weight: '',
			school: '',
			grade: '',
			gender: '',
			school: '',
			brith: '',
			username:'',
			relationship: [
				{
					img: '/static/images/erzi1.png',
					width: '44rpx',
					height: '70rpx',
					name: '儿子',
					gender: 1
				},
				{
					img: '/static/images/nver1.png',
					width: '50rpx',
					height: '70rpx',
					name: '女儿',
					gender: 2
				},
				{
					img: '/static/images/erzi1.png',
					width: '44rpx',
					height: '70rpx',
					name: '孙子',
					gender: 1
				},
				{
					img: '/static/images/nver1.png',
					width: '50rpx',
					height: '70rpx',
					name: '孙女',
					gender: 2
				},
				{
					img: '/static/images/fuqin1.png',
					width: '50rpx',
					height: '70rpx',
					name: '父亲',
					gender: 1
				},
				{
					img: '/static/images/mom1.png',
					width: '50rpx',
					height: '70rpx',
					name: '母亲',
					gender: 2
				},
				{
					img: '/static/images/yeye1.png',
					width: '50rpx',
					height: '70rpx',
					name: '爷爷',
					gender: 1
				},
				{
					img: '/static/images/nainai1.png',
					width: '50rpx',
					height: '70rpx',
					name: '奶奶',
					gender: 2
				},
				{
					img: '/static/images/yeye1.png',
					width: '50rpx',
					height: '70rpx',
					name: '姥爷',
					gender: 1
				},
				{
					img: '/static/images/nainai1.png',
					width: '50rpx',
					height: '70rpx',
					name: '姥姥',
					gender: 2
				}
			]
		}
	},
	computed: {
		startDate() {
			return this.getDate('start')
		},
		endDate() {
			return this.getDate('end')
		}
	},
	onUnload() {
		if (this.username != '') {
			this.$store.commit('changeusername', '')
			uni.reLaunch({
				url: '/pages/my/my'
			})
		}

	},
	onLoad() {
		this.username=this.$store.state.username
	},
	mounted() {},
	methods: {
		//验证码
		isPhone() {
			let mPattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
			return mPattern.test(this.phoneForm.phone)
		},
		getCode() {
			// 验证手机号合法性
			if (!this.isPhone()) {
				uni.showToast({
					title: '请输入正确的手机号码',
					icon: 'none'
				})
				return
			}
			if (this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: '正在获取验证码'
				})
				this.$axios({
					url: this.$url[2],
					data: {
						phone: this.phoneForm.phone
					}
				}).then(res => {
					if (res.code == 0) {
						uni.hideLoading()
						this.$u.toast('验证码已发送')
						this.$refs.uCode.start()
					}
				})
			} else {
				this.$u.toast('倒计时结束后在发送')
			}
		},
		codeChange(text) {
			this.tips = text
		},
		navigateTo(url) {
			uni.navigateTo({
				url
			})
		},
		//添加成员
		addMember() {
			if (this.name == '' || this.nick == '' || this.height == '' || this.weight == '' || this.school == '') {
				this.$u.toast('信息填写不全')
				return
			}
			// console.log(this.memberType, 'this.memberType')
			// console.log(this.name, 'this.name')
			// console.log(this.nick, 'this.nick')
			// console.log(this.height, 'this.height')
			// console.log(this.weight, 'this.weight')
			// console.log(this.brith, 'this.brith')
			// console.log(this.gender, 'this.gender')
			// console.log(this.grade, 'this.grade')
			// console.log(this.phoneForm.phone, 'this.phoneForm.phone')
			// console.log(this.school, 'this.school')
			if (this.username == '') {
				this.$axios({
					url: this.$url[67],
					data: {
						member_type: this.memberType,
						name: this.name,
						nick: this.nick,
						height: this.height,
						weight: this.weight,
						brith: this.date,
						gender: this.relationship[this.memberType - 1].gender,
						grade: this.grade,
						phone: this.phoneForm.phone,
						school: this.school,
						code: this.phoneForm.code
					}
				}).then(res => {
					if (res.code == 0) {
						uni.stopPullDownRefresh()
						this.name = ''
						this.nick = ''
						this.height = ''
						this.weight = ''
						this.school = ''
						this.phoneForm.phone = ''
						this.phoneForm.code = ''
						uni.showToast({
							title: '添加成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/timetable/timetable',
								success() {
									page.onLoad()
								}
							})
						}, 1000)
					}
				})
			} else {
				this.$axios({
					url: this.$url[83],
					data: {
						member_type: this.memberType,
						name: this.name,
						nick: this.nick,
						height: this.height,
						weight: this.weight,
						brith: this.date,
						gender: this.relationship[this.memberType - 1].gender,
						grade: this.grade,
						school: this.school,
						invite_id: this.username
					}
				}).then(res => {
					if (res.code == 0) {
						// this.totalCount = res.data.totalCount
						// if (this.page === 1) {
						// 	this.listData = res.data.data
						// } else {
						// 	this.listData = [...this.listData, ...res.data.data]
						// }
						uni.stopPullDownRefresh()
						this.name = ''
						this.nick = ''
						this.height = ''
						this.weight = ''
						this.school = ''
						uni.showToast({
							title: '添加成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/timetable/timetable',
								success() {
									page.onLoad()
								}
							})
						}, 1000)
					}
				})
			}
		},
		//选择性别
		bindPickerChange: function(e) {
			// console.log('picker发送选择改变，携带值为', e.detail.value)
			this.gender = e.detail.value
			// console.log(e.detail.value)
			this.index = e.detail.value
		},
		//选择年级selectGender
		selectGender: function(e) {
			// console.log('picker发送选择改变，携带值为', e.detail.value)
			this.grade = e.detail.value
			// console.log(e.detail.value)
			this.index1 = e.detail.value
		},
		bindDateChange: function(e) {
			this.date = e.detail.value
		},
		bindTimeChange: function(e) {
			this.time = e.detail.value
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
<style scoped>
	
	
	/deep/ ::-webkit-scrollbar {
			 //滚动条整体样式
			    display: none;
	}
	/deep/ .scroll-view{
	    height: 190rpx;
	}
.scroolTd {
	
	display: flex;
	background-color: white;
	margin-top: 40rpx;
	justify-content: space-between;
	text-align: center;
}
.scroolTd img {
	width: 50rpx;
	height: 70rpx;
	margin-top: 10rpx;
}
.image-box3 {
	width: 76rpx;
	height: 89rpx;
	margin-left: 63rpx;
}
.scroolTd :first-child {
	margin-left: 0rpx;
}
.image1,
.image3 {
	width: 76rpx;
	height: 89rpx;
	text-align: center;
	opacity: 0.5;
	background-color: #ffd6a1;
}
.image {
	width: 76rpx;
	height: 89rpx;
	opacity: 0.5;
	background-color: #ffd6a1;
}
.image3 img {
	width: 50%;
	height: 80%;
	margin-top: 10%;
}
.active {
	color: #ff6638;
	opacity: 1;
	background-color: #ffd6a1;
}
.q {
	width: 76rpx;
	font-size: 30rpx;
}
.userSelection {
	width: 84%;
	margin-left: 8%;
	height: 240rpx;
	margin-top: 20rpx;
	overflow: hidden;
}
.relationship {
	width: 100%;
	height: 40rpx;
	color: black;
	text-align: left;
	line-height: 60rpx;
	font-size: 30rpx;
}
.informationFilling {
	width: 84%;

	margin-left: 8%;
	overflow: hidden;
	line-height: 80rpx;
}
.information {
	height: 80rpx;
	line-height: 100rpx;
	font-size: 30rpx;
}
.userPeople {
	width: 100%;
	height: 280rpx;
	display: flex;
	justify-content: space-between;
}
.userPeople1 {
	width: 15%;
	height: 120rpx;
	background-color: pink;
	margin-top: 30rpx;
}

.uni-input {
	height: 70rpx;
	line-height: 90rpx;
	color: black;
	border-bottom: 3rpx solid gainsboro;
}
.confimBox1 {
	background: #ff6638;
	border-radius: 10px 10px 10px 10px;
	opacity: 1;
	width: 90%;
	height: 90rpx;
	margin-left: 5%;
	text-align: center;
	line-height: 90rpx;
	color: #ffffff;
	margin-top: 100rpx;
}
.getVerification {
	padding: 5rpx;
	width: 150rpx;
	height: 60rpx;
	line-height: 60rpx;
	background-color: #ff6638;
	color: white;
	text-align: center;
	font-size: 22rpx;
	/* margin-top: -80rpx; */
	border-radius: 5rpx;
	float: right;
}
.must {
	color: red;
}
</style>
