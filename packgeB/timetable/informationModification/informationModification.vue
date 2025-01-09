<template>
	<view>
		<!-- 用户选择 -->
		<view class="userSelection" v-if="show" style="height: 220rpx;">
			<view class="relationship">
				<span class="must">*</span>
				关系
			</view>
			<scroll-view>
				<view class="scroolTd">
					<view class="image-box1">
						<view class="image1" style="opacity: 1;">
							<img :src="common.imgUrl(peopleimg[lists.member_type - 1])" alt="" />
							<p class="m">{{ peoplelist[lists.member_type - 1] }}</p>
						</view>
					</view>
				</view>
			</scroll-view>
			</view>
			<view class="userSelection" v-if="isshow">
				<view class="relationship">
					<span class="must">*</span>
					关系
				</view>
			<zcscrool :lL="relationship.length">
				<view class="scroolTd">
					<view class="image-box3" v-for="(item, index) in relationship" :key="index">
						<view
							class="image1"
							:class="{ active: index == member_type - 1 }"
							@click="member_type = index + 1"
						>
							<img :src="common.imgUrl(item.img)" :style="{ width: item.width, height: item.height }" alt="" />
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
			<p class="information1" v-if="show">{{ lists.name }}</p>
			<u-input
				placeholder="请输入姓名"
				:custom-style="{
					fontSize: '32rpx',
					color: ' #2D2D2D',
					borderBottom: '3rpx solid gainsboro'
				}"
				v-model="name"
				v-if="isshow"
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
				v-if="isshow"
			/>
			<p class="information1" v-if="show">{{ lists.nick }}</p>
			<p class="information">
				手机号
				<!-- #ifdef H5 -->
				<span style="font-size: 25rpx;color: gray;margin-left: 20rpx;" v-if="isshow && this.lists.phone != ''">
					(修改手机号请用此手机号登录修改)
				</span>
				<!-- #endif -->
				<!-- #ifdef APP -->
				<span style="font-size: 25rpx;color: gray;margin-left: 20rpx;" v-if="isshow && this.lists.phone != ''">
					(修改手机号请用此手机号登录修改)
				</span>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<span style="font-size: 25rpx;color: gray;margin-left: 20rpx;" v-if="isshow && this.lists.phone != undefined">
					(修改手机号请用此手机号登录修改)
				</span>
				<!-- #endif -->
			</p>
			<u-form
				:model="phoneForm"
				ref="uForm"
				:label-style="{ color: '#2D2D2D', fontSize: '32rpx', fontWeight: '400' }"
				v-if="isshow"
			>
				<u-form-item>
					<!-- #ifdef H5 -->
					<view class="inputType" style="width:100%;" v-if="this.lists.phone == ''">
						<u-input :border="true" placeholder="请输入手机号" v-model="phone" @input="change()" />
					</view>
					<view v-else style="line-height: 0rpx;margin-top: 20rpx;font-size: 32rpx;color: gray;">
						{{ lists.phone }}
					</view>
					<!-- #endif -->
					<!-- #ifdef APP -->
					<view class="inputType" style="width:100%;" v-if="this.lists.phone == ''">
						<u-input :border="true" placeholder="请输入手机号" v-model="phone" @input="change()" />
					</view>
					<view v-else style="line-height: 0rpx;margin-top: 20rpx;font-size: 32rpx;color: gray;">
						{{ lists.phone }}
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view class="inputType" style="width:100%;" v-if="this.lists.phone == undefined">
						<u-input :border="true" placeholder="请输入手机号" v-model="phone" @input="change()" />
					</view>
					<view v-else style="line-height: 0rpx;margin-top: 20rpx;font-size: 32rpx;color: gray;">
						{{ lists.phone }}
					</view>
					<!-- #endif -->
				</u-form-item>

				<u-form-item class="u-input-bottom" v-if="qwe">
					<u-input :border="true" placeholder="请输入验证码" v-model="code" />
					<view class="getVerification" @click="getCode">{{ tips }}</view>
					<view class="">
						<view class="wrap">
							<u-toast ref="uToast"></u-toast>
							<u-verification-code
								:seconds="seconds"
								ref="uCode"
								@change="codeChange"
							></u-verification-code>
						</view>
					</view>
				</u-form-item>
			</u-form>
			<p class="information1" v-if="show">{{ lists.phone }}</p>
			<!-- <p class="information">
				<span class="must">*</span>
				性别
			</p>
			<view class="uni-list" v-if="isshow">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input" v-model="gender">{{ array[gender] }}</view>
						</picker>
					</view>
				</view>
			</view>
			<p class="information1" v-if="show">{{ array[lists.gender] }}</p> -->
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
				v-if="isshow"
			/>
			<p class="information1" v-if="show">{{ lists.height }}</p>
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
				v-if="isshow"
			/>
			<p class="information1" v-if="show">{{ lists.weight }}</p>
			<p class="information">
				<span class="must">*</span>
				出生日期
			</p>
			<view class="uni-list">
				<view class="uni-list-cell-db" v-if="isshow">
					<picker mode="date" :value="brith" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input" v-model="brith">{{ brith }}</view>
					</picker>
				</view>
				<p class="information1" v-if="show">{{ brith }}</p>
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
				v-if="isshow"
			/>
			<p class="information1" v-if="show">{{ lists.school }}</p>
			<p class="information">
				<span class="must">*</span>
				年级
			</p>
			<view class="uni-list" v-if="isshow">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="selectGender" :value="index" :range="array1">
							<view class="uni-input" v-model="grade">{{ array1[grade] }}</view>
						</picker>
					</view>
				</view>
			</view>
			<p class="information1" v-if="show">{{ array1[lists.grade] }}</p>
			<view class="confimBox1" v-if="show" @click="xiugai()">修改信息</view>
			<view class="confimBox1" v-if="isshow" @click="xiugaicg()">修改完成</view>
		</view>
	</view>
</template>
<script>
import zcscrool from '@/components/zc-scroll/zc-scroll.vue'
export default {
	components: {
		zcscrool
	},
	data() {
		const currentDate = this.getDate({
			format: true
		})
		return {
			show: true,
			isshow: false,
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
			member_type: '', //成员类型
			name: '',
			nick: '',
			height: '',
			weight: '',
			school: '',
			grade: '',
			gender: '',
			brith: '',
			lists: {},
			peoplelist: ['儿子', '女儿', '孙子', '孙女', '父亲', '母亲', '爷爷', '奶奶', '姥爷', '姥姥'],
			peopleimg: [
				'/static/images/erzi1.png',
				'/static/images/nver1.png',
				'/static/images/erzi1.png',
				'/static/images/nver1.png',
				'/static/images/fuqin1.png',
				'/static/images/mom1.png',
				'/static/images/yeye1.png',
				'/static/images/nainai1.png',
				'/static/images/yeye1.png',
				'/static/images/nainai1.png'
			],
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
			],
			qwe: false,
			urloption: ''
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
	onLoad(option) {
		this.urloption = option
	},
	mounted() {
		this.modiyPlan()
	},
	methods: {
		change() {
			if (this.phone != this.lists.phone) {
				this.qwe = true
			} else {
				this.qwe = false
			}
		},
		xiugaicg() {
			if (
				this.name == this.lists.name &&
				this.member_type == this.lists.member_type &&
				this.nick == this.lists.nick &&
				this.height == this.lists.height &&
				this.weight == this.lists.weight &&
				this.brith == this.lists.brith &&
				this.gender == this.lists.gender &&
				this.grade == this.lists.grade &&
				this.school == this.lists.school &&
				this.phone==this.lists.phone
			) {
				this.$u.toast('未修改原有内容')
				return
			}
			// if (this.phone == this.lists.phone) {
			// 	this.phone = ''
			// }
			this.$axios({
				url: this.$url[86],
				data: {
					member_type: this.member_type,
					name: this.name,
					nick: this.nick,
					height: this.height,
					weight: this.weight,
					brith: this.brith,
					gender: this.relationship[this.member_type - 1].gender,
					grade: this.grade,
					school: this.school,
					phone: this.phone,
					code: this.code,
					id: Number(this.urloption.id)
				}
			}).then(res => {
				if (res.code == 0) {
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack({})
					}, 500)
				}
			})
		},
		xiugai() {
			this.show = false
			this.isshow = true
		},
		modiyPlan() {
			this.$axios({
				url: this.$url[85],
				data: {
					id: Number(this.urloption.id)
				}
			}).then(res => {
				if (res.code == 0) {
					this.lists = res.data
					this.member_type = this.lists.member_type
					this.name = this.lists.name
					this.nick = this.lists.nick
					this.height = this.lists.height
					this.weight = this.lists.weight
					this.brith = this.lists.brith
					this.gender = this.lists.gender
					this.grade = this.lists.grade
					this.school = this.lists.school
					this.phone = this.lists.phone
					this.code = this.lists.code
				}
			})
		},
		//验证码
		isPhone() {
			let mPattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
			return mPattern.test(this.phone)
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
						phone: this.phone
					}
				}).then(res => {
					if (res.code == 0) {
						uni.hideLoading()
						this.$u.toast('验证码已发送')
						this.$refs.uCode.start()
					}
				})
			} else {
				this.$u.toast('倒计时结束后再发送')
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
		//选择性别
		// bindPickerChange: function(e) {
		// 	console.log('picker发送选择改变，携带值为', e.detail.value)
		// 	this.gender = e.detail.value
		// 	console.log(e.detail.value)
		// 	this.index = e.detail.value
		// },
		//选择年级selectGender
		selectGender: function(e) {
			// console.log('picker发送选择改变，携带值为', e.detail.value)
			this.grade = e.detail.value
			// console.log(e.detail.value)
			this.index1 = e.detail.value
		},
		bindDateChange: function(e) {
			this.brith = e.detail.value
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
				year = year + 2
			}
			month = month > 9 ? month : '0' + month
			day = day > 9 ? day : '0' + day
			return `${year}-${month}-${day}`
		}
	}
}
</script>
<style scoped>
	/deep/ .scroll-view{
	    height: 190rpx;
	}
.scroolTd {
	height: 150rpx;
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
.scroolTd :first-child {
	margin-left: 0rpx;
}
.image-box,
.image-box3 {
	width: 76rpx;
	height: 89rpx;
	margin-left: 63rpx;
}
.image-box1 {
	width: 76rpx;
	height: 89rpx;
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
.active {
	color: #ff6638;
	opacity: 1;
	background-color: #ffd6a1;
}
.m {
	width: 76rpx;
	font-size: 30rpx;
	color: #ff6638;
}
.information1 {
	color: gray;
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
	background-color: #ff6638;
	color: white;
	text-align: center;
	font-size: 22rpx;
	margin-left: 55rpx;
	border-radius: 5rpx;
}
.must {
	color: red;
}
</style>
