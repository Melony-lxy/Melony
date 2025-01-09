<template>
	<view>
		<view class="grow">
			<view class="growPlan">成长计划</view>
			<view class="" @click="show = true"><img :src="common.imgUrl('static/growUp/addIcon.png')" alt="" /></view>
		</view>
		<view class="grow-content">
			<view class="content-mouth">六月</view>
			<view class="content-plan" v-for="(item, index) in persons" :key="index">
				<view class="tick">
					<checkbox-group>
						<label><checkbox value="cb" /></label>
					</checkbox-group>
				</view>
				<view class="grow-plan">
					<view class="plan-title">{{ item.biaoti }}</view>
					<view class="plan-time">{{ item.shijian }}</view>
					<view class="plan-yuanyin">{{ item.neirong }}</view>
				</view>
				<view class="" style="float: right;margin-top: 45rpx;">
					<icon :type="value" size="20" @click="removeitem(item, index)" />
				</view>
			</view>
		</view>
		<!-- <view class="growPlan-pop-up" v-show="isShow">
			标题：
			<input type="text" v-model="newId" placeholder="请输入标题" />
			时间：
			<input type="text" v-model="newName" placeholder="请输入时间" />
			内容：
			<input type="text" v-model="newAge" placeholder="请输入内容" />
			<input type="button" v-on:click="AddNew()" value="添加" @click="toggle()" />
		</view> -->
		<view><view class="mar10">使用成长计划</view></view>

		<u-popup v-model="show" mode="bottom">
			<view class="releasePlan">发布计划</view>
			<view
				style="width: 710rpx;height: 670rpx;margin-left: 20rpx;line-height: 72rpx;
		"
			>
				标题：
				<u-input placeholder="请输入标题" v-model="newId" clearable></u-input>
				时间：
				<view class="example-body" v-model="newName">
					<uni-datetime-picker type="datetime" v-model="newName" />
				</view>
				内容：
				<u-input placeholder="请输入内容" v-model="newAge" clearable></u-input>
				<!-- <input type="button" v-on:click="AddNew()" value="添加" class="mar10" /> -->
				<u-button type="primary" @click="AddNew()" style="height: 100rpx;margin-top: 80rpx;">添加</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	name: 'growthPlan',
	components: {},
	data() {
		return {
			value: 'clear',
			datetimesingle: '',
			show: false,
			newId: '',
			newName: '',
			newAge: '',
			persons: [{ biaoti: '给儿子过生日', shijian: '2022.08.11', neirong: '水电费是否GV对方回复给您改好发你' }]
		}
	},
	methods: {
		//删除计划
		removeitem(i, index) {
			if (this.persons[index] == i) {
				this.persons.splice(index, 1)
			}
		},
		AddNew() {
			if (this.newId == '' || this.newName == '' || this.newAge == '') {
				//内容按自己实际的内容填写
				this.$u.toast('信息填写不全')
				return
			}
			this.persons.push({ biaoti: this.newId, shijian: this.newName, neirong: this.newAge })
			this.newId = ''
			this.newName = ''
			this.newAge = ''
			this.show = false
		},
		open() {
			// console.log('open');
		},
		close() {
			this.show = false
			// console.log('close');
		}
	}
}
</script>

<style scoped>
/deep/.u-btn--primary[data-v-6e15e680] {
	border-color: #ff6638 !important;
	background-color: #ff6638 !important;
}
/deep/ .u-primary-hover {
	background-color: #ff6638 !important;
}
/deep/.uni-calendar__weeks-day[data-v-94becebc] {
	height: 30px;
}
/deep/.dialog-close {
	margin-top: 0px;
}
/deep/.uni-calendar__header-mobile {
	padding: 0px;
}
/deep/.uni-calendar__weeks {
	height: 70rpx;
}
/deep/.uni-calendar__header {
	height: 70rpx;
}
/deep/.uni-date-changed--time-date {
	line-height: 70rpx;
}
/deep/.uni-date-changed {
	height: 70rpx;
}
/deep/.uni-date-btn--ok {
	padding: 5px 15px;
}
/deep/.uni-calendar--fixed {
	bottom: 0rpx;
}
/deep/ .uni-checkbox-input {
	margin-right: 5rpx;
	margin-top: 6rpx;
	-webkit-appearance: none;
	appearance: none;
	outline: 0;
	background-color: gainsboro;
	border-radius: 30rpx;
	width: 40rpx;
	height: 40rpx;
	position: relative;
}
/deep/ uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
	border-color: #fff;
}
/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	background: url(../../static/success.png);
	background-size: 100%;
}
/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
	font: normal normal normal 14px/1 uni;
	content: '\EA08';
	font-size: 22px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -48%) scale(0.73);
	-webkit-transform: translate(-50%, -48%) scale(0.73);
	display: none;
}
/deep/uni-checkbox .uni-checkbox-input {
	border: 1rpx solid white;
}
/deep/.uni-date-editor--x .uni-date__icon-clear[data-v-6e13d7e2] {
	border: 0 !important;
}
/deep/.uni-date__x-input[data-v-6e13d7e2] {
	height: 37rpx;
}

.mar10 {
	width: 90%;
	margin-left: 5%;
	height: 100rpx;
	text-align: center;
	line-height: 100rpx;
	margin-top: 100rpx;
	background: #ff6638;
	border-radius: 10rpx 10rpx 10rpx 10rpx;
	opacity: 1;
	font-size: 31rpx;
	color: #ffffff;
}
.grow {
	width: 90%;
	height: 100rpx;
	margin-left: 5%;
	display: flex;
	justify-content: space-between;
	line-height: 100rpx;
}
.growPlan {
	font-size: 38rpx;
	font-weight: bold;
	color: rgba(21, 28, 42, 0.87);
}
.grow img {
	width: 40rpx;
	height: 40rpx;
	margin-top: 30rpx;
}
.grow-content {
	width: 90%;
	height: auto;
	margin-left: 5%;
}
.content-mouth {
	font-size: 38rpx;
	line-height: 100rpx;
	font-weight: bold;
	color: rgba(21, 28, 42, 0.87);
}
.content-mouth1 {
	font-size: 38rpx;
	line-height: 130rpx;
	font-weight: bold;
	color: rgba(21, 28, 42, 0.87);
}
.content-plan {
	width: 100%;
	height: 180rpx;
	overflow: hidden;
	margin-top: 20rpx;
}
.tick {
	width: 8%;
	height: 150rpx;
	float: left;
}
.grow-plan {
	width: 80%;
	height: 150rpx;
	float: left;
	margin-left: 10rpx;
}
.uni-checkbox-input {
	width: 40rpx;
	height: 40rpx;
	margin-top: 7rpx;
	background-color: gainsboro;
	border-radius: 40rpx;
}
.plan-title {
	width: 100%;
	height: 55rpx;
	font-size: 35rpx;
	font-weight: bold;
	color: #2d2d2d;
}
.plan-time {
	width: 100%;
	height: 55rpx;
	font-size: 26rpx;
	color: #989898;
}
.plan-yuanyin {
	width: 100%;
	height: 55rpx;
	font-size: 28rpx;
	color: #666666;
}
.plan-title,
.plan-time,
.plan-yuanyin {
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	line-height: 50rpx;
}
.growPlan-pop-up {
	width: 710rpx;
	margin-left: 20rpx;
	height: 500rpx;
	line-height: 100rpx;
	position: fixed;
	background-color: pink;
}
.growPlan-pop-up input {
	width: 90%;
	height: 50rpx;
	border-bottom: 2rpx solid grey;
}
.releasePlan {
	text-align: center;
	height: 80rpx;
	width: 100%;
	line-height: 100rpx;
	font-size: 33rpx;
}
</style>
