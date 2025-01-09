<template>
	<view>
		<image :src="common.imgUrl('/static/images/czjl2.png')" mode="widthFix"></image>
		<!-- <view class="personal">
			<view class="setUp"><img :src="common.imgUrl('/static/my/shezhi.png')" alt="" /></view>
			<view class="headPortrait" @click="personalHomepage1()">
				<img :src="common.imgUrl('/static/portrait.png')" alt="" />
			</view>
			<view class="personal1">
				<view class="personal1-name">大儿子</view>
				<view class="personalSignature">这个人很懒，什么都没留下~</view>
				<view class="specificInformation">
					<view class="accompanyingDays">
						<text class="accompanyingDays1"><strong>248</strong></text>
						<br />
						<text class="accompanyingDays2">陪伴天数</text>
					</view>
					<view class="specificInformation-height">
						<text class="accompanyingDays1"><strong>150</strong></text>
						<br />
						<text class="accompanyingDays2">身高(cm)</text>
					</view>
					<view class="specificInformation-weight">
						<text class="accompanyingDays1"><strong>41</strong></text>
						<br />
						<text class="accompanyingDays2">体重(kg)</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bindingDevice" style="opacity: 1;" @click="BindingDevice()">
			<img :src="common.imgUrl('/static/images/img18.png')" alt="" style="opacity: 0.8;" />
			<br />
			绑定设备
		</view>
		<view class="bindingDevice1">
			<view class="motion">
				<view class="motion1">
					<view class="motion1-img"><img :src="common.imgUrl('/static/motion.png')" alt="" /></view>
					<view class="motion1-content"><strong>运动</strong></view>
				</view>
				<view class="motion2"></view>
				<view class="motion3">
					运动&nbsp;
					<text class="xiaoshi"><strong>1.5</strong></text>
					小时&nbsp;
				</view>
			</view>
			<view class="learningSituation">
				<view class="motion1">
					<view class="motion1-img"><img :src="common.imgUrl('/static/situation.png')" alt="" /></view>
					<view class="motion1-content"><strong>学习情况</strong></view>
				</view>
				<view class="motion2"></view>
				<view class="motion3">
					学习&nbsp;
					<text class="xiaoshi"><strong>1.5</strong></text>
					小时&nbsp;
				</view>
			</view>
		</view>
		<view class="bindingDevice2">
			<view class="motion">
				<view class="motion1">
					<view class="motion1-img"><img :src="common.imgUrl('/static/trajectory.png')" alt="" /></view>
					<view class="motion1-content"><strong>定位轨迹</strong></view>
				</view>
				<view class="motion2"></view>
				<view class="motion3">
					轨迹&nbsp;
					<text class="xiaoshi"><strong>1.5</strong></text>
					小时&nbsp;
				</view>
			</view>
			<view class="learningSituation">
				<view class="motion1">
					<view class="motion1-img"><img :src="common.imgUrl('/static/sleep.png')" alt="" /></view>
					<view class="motion1-content"><strong>睡眠</strong></view>
				</view>
				<view class="motion2"></view>
				<view class="motion3">
					睡眠&nbsp;
					<text class="xiaoshi"><strong>1.5</strong></text>
					小时&nbsp;
				</view>
			</view>
		</view>
		<view class="sleepDuration">
			<view class="sleepDuration-content">
				<view class="sleepDuration1">睡眠总时长</view>
				<view class="sleepDuration2">8小时20分钟</view>
				<view class="sleepDuration3">睡眠质量较好</view>
				<view class="sleepDuration4">
					拥有正常的快速眼动睡眠，有助于你发挥
					<br />
					创造力和解决问题的能力
				</view>
			</view>
			<view class="sleepDuration5"></view>
		</view> -->
	</view>
</template>

<script>
export default {
	name: 'personalHomepage',
	components: {},
	data() {
		return {}
	},
	mounted() {},
	methods: {
		personalHomepage1() {
			uni.navigateTo({
				url: '/packgeB/timetable/personalHomepage1'
			})
		},
		BindingDevice() {
			uni.navigateTo({
				url: '/packgeB/timetable/BindingDevice'
			})
		}
	}
}
</script>

<style>
/* body {
	background-color: powderblue;
}
.personal {
	width: 100%;
	height: 230rpx;
	background: linear-gradient(180deg, #e6f7ff 0%, #f9f9f9 100%);
	border-radius: 0px 0px 0px 0px;
	opacity: 1;
	position: relative;
}
.setUp {
	width: 96%;
	height: 100rpx;
	margin-left: 2%;
}
.setUp img {
	width: 45rpx;
	height: 45rpx;
	float: right;
	margin-top: 30rpx;
}
.personal1 {
	width: 96%;
	height: 382rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	opacity: 1;
	position: absolute;
	background-color: white;
	box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.06);
	top: 100rpx;
	left: 2%;
}
.headPortrait {
	width: 20%;
	height: 150rpx;
	border-radius: 50%;
	background-color: pink;
	position: absolute;
	top: 30rpx;
	left: 40%;
	z-index: 1;
}
.headPortrait img {
	width: 100%;
	height: 100%;
}
.personal1-name {
	width: 100%;
	height: 70rpx;

	text-align: center;
	line-height: 70rpx;
	margin-top: 80rpx;
	font-size: 34rpx;
	color: #4d505f;
}
.personalSignature {
	width: 100%;
	height: 30rpx;
	text-align: center;
	line-height: 40rpx;

	font-size: 24rpx;
	color: #91939b;
}
.specificInformation {
	width: 100%;
	height: 150rpx;
	margin-top: 50rpx;
	display: flex;
	justify-content: space-around;
}
.specificInformation view {
	width: 20%;
	height: 150rpx;
	text-align: center;
}
.accompanyingDays1 {
	height: 50rpx;
	font-size: 46rpx;
	opacity: 0.85;
	color: #2d2d2d;
}
.accompanyingDays2 {
	font-size: 26rpx;
	color: #91939b;
}
.bindingDevice {
	width: 96%;
	height: 200rpx;
	margin-left: 2%;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	opacity: 1;
	box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.08);
	margin-top: 275rpx;
	text-align: center;
	line-height: 50rpx;
	font-size: 28rpx;
	color: #e6e6e6;
}
.bindingDevice img {
	width: 80rpx;
	height: 80rpx;
	margin-top: 40rpx;
	margin-left: 0rpx;
}
.bindingDevice1,
.bindingDevice2 {
	width: 96%;
	height: 280rpx;
	margin-left: 2%;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	opacity: 1;
	margin-top: 17rpx;
	display: flex;
	justify-content: space-between;
}
.motion {
	width: 48.5%;
	height: 100%;
	border-radius: 20rpx 20rpx 20rpx 20rpx;

	box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.06);
	opacity: 1;
}
.motion1 {
	width: 100%;
	height: 120rpx;
	overflow: hidden;
}
.motion1-img {
	width: 80rpx;
	height: 80rpx;
	margin-top: 20rpx;
	margin-left: 20rpx;
	opacity: 1;
	float: left;
}
.motion1-img img {
	width: 100%;
	height: 100%;
}
.motion1-content {
	width: 150rpx;
	height: 50rpx;
	margin-top: 35rpx;
	margin-left: 20rpx;
	opacity: 1;
	float: left;
	text-align: left;
	font-size: 30rpx;
	font-weight: 500;
	color: #2d2d2d;
	line-height: 50rpx;
}
.xiaoshi {
	font-size: 30rpx;
	color: #2d2d2d;
}
.motion2 {
	width: 100%;
	height: 90rpx;
	margin-top: 10rpx;
}
.motion3 {
	width: 100%;
	height: 50rpx;
	margin-top: 5rpx;
	text-align: center;
	line-height: 30rpx;
	font-size: 20rpx;
	color: #989898;
}
.learningSituation {
	width: 48.5%;
	height: 100%;
	border-radius: 20rpx 20rpx 20rpx 20rpx;

	box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.06);
}
.sleepDuration {
	width: 96%;
	height: 300rpx;
	margin-left: 2%;
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	opacity: 1;
	box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.06);
	margin-top: 17rpx;
	overflow: hidden;
}
.sleepDuration-content {
	width: 64%;
	height: 100%;
	float: left;
}
.sleepDuration1 {
	line-height: 80rpx;
	margin-left: 30rpx;
	font-size: 27rpx;
	color: #2d2d2d;
}
.sleepDuration2 {
	line-height: 50rpx;
	margin-left: 30rpx;
	font-size: 40rpx;
	color: #2d2d2d;
}
.sleepDuration3 {
	line-height: 80rpx;
	margin-left: 30rpx;
	font-size: 27rpx;
	color: #2d2d2d;
}
.sleepDuration4 {
	width: 100%;
	line-height: 35rpx;
	font-size: 22rpx;
	color: #989898;
	margin-left: 30rpx;
}
.sleepDuration5 {
	width: 180rpx;
	height: 180rpx;
	margin-top: 60rpx;
	margin-right: 50rpx;
	float: right;
}
.sleepDuration5 img {
	width: 100%;
	height: 100%;
} */
image {
	width: 100%;
}
</style>
