<template>
	<view>
		<view class="personal">
			<view class="personal1">
				<view class="headPortrait" @click="personalHomepage()">
					<img :src="common.imgUrl('/static/portrait.png')" alt="" />
				</view>
				<view class="nameGrade">
					<view class="personal1-name">大儿子</view>
					<view class="personalSignature">群星小学-三年级班</view>
				</view>
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
		<view class="motion">
			<view class="motion1">
				<view class="motion1-img"><img :src="common.imgUrl('/static/motion.png')" alt="" /></view>
				<view class="motion1-content"><strong>运动</strong></view>
			</view>
			<view class="numberSteps">
				<view class="actual">
					<text class="w">
						<text class="actual-num">4592</text>
						<br />
						<text class="actual-content">实际步数</text>
					</text>
				</view>
				<view class="w">
					<text class="actual-num">5000</text>
					<br />
					<text class="actual-content">目标步数</text>
				</view>
			</view>
			<view class="motion-columnChart" id="main"></view>
			<view class="motion-evaluate">
				<view class="yuandian"></view>
				<text style="margin-left: 10rpx;">运动量较好，即将达成设置的每日运动目标</text>
			</view>
		</view>
		<view class="userHeight">
			<view class="motion1">
				<view class="motion1-img"><img :src="common.imgUrl('/static/motion.png')" alt="" /></view>
				<view class="motion1-content"><strong>身高</strong></view>
				<view class="setUp"><img :src="common.imgUrl('/static/growUp/addIcon.png')" alt="" /></view>
			</view>
			<view class="motion-columnChart" id="main1"></view>
			<view class="motion-evaluate">
				<view class="yuandian"></view>
				<text style="margin-left: 10rpx;">运动量较好，即将达成设置的每日运动目标</text>
			</view>
		</view>
		<view class="userWeight">
			<view class="motion1">
				<view class="motion1-img"><img :src="common.imgUrl('/static/motion.png')" alt="" /></view>
				<view class="motion1-content"><strong>体重</strong></view>
			</view>
			<view class="motion-columnChart" id="main2"></view>
			<view class="motion-evaluate">
				<view class="yuandian"></view>
				<text style="margin-left: 10rpx;">运动量较好，即将达成设置的每日运动目标</text>
			</view>
		</view>
		<view class="userWeight">
			<view class="motion1">
				<view class="motion1-img"><img :src="common.imgUrl('/static/situation.png')" alt="" /></view>
				<view class="motion1-content"><strong>学习情况()</strong></view>
			</view>
			<view class="motion-columnChart" id="main3"></view>
			<view class="motion-evaluate">
				<view class="yuandian"></view>
				<text style="margin-left: 10rpx;">运动量较好，即将达成设置的每日运动目标</text>
			</view>
		</view>
		<view class="userWeight">
			<view class="motion1">
				<view class="motion1-img"><img :src="common.imgUrl('/static/sleep.png')" alt="" /></view>
				<view class="motion1-content"><strong>睡眠</strong></view>
			</view>
			<view class="motion-columnChart" id="main4"></view>
			<view class="motion-evaluate">
				<view class="yuandian"></view>
				<text style="margin-left: 10rpx;">运动量较好，即将达成设置的每日运动目标</text>
			</view>
		</view>
		<view class="userWeight">
			<view class="motion1">
				<view class="motion1-img"><img :src="common.imgUrl('/static/trajectory.png')" alt="" /></view>
				<view class="motion1-content"><strong>定位轨迹</strong></view>
			</view>
			<view class="motion-columnChart" id="main5"></view>
			<view class="motion-evaluate">
				<view class="yuandian"></view>
				<text style="margin-left: 10rpx;">运动量较好，即将达成设置的每日运动目标</text>
			</view>
		</view>
	</view>
</template>

<script>
	import * as echarts from 'echarts' //引入echarts
	import 'echarts-liquidfill'
	export default {
		name: 'personalHomepage1',
		components: {},
		data() {
			return {}
		},
		mounted() {
			this.echartsInit()
		},
		methods: {
			//初始化echarts
			echartsInit() {
				//柱形图
				//因为初始化echarts 的时候，需要指定的容器 id='main'
				echarts.init(document.getElementById('main')).setOption({
						xAxis: {
							type: 'category',
							data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: [12, 20, 22, 80, 70, 110, 130],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						}]
					}),
					echarts.init(document.getElementById('main1')).setOption({
						xAxis: {
							type: 'category',
							data: ['11', '12', '13', '14', '15', '16', '17']
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: [111, 101, 121, 111, 131],
							type: 'line',
							smooth: true
						}]
					}),
					echarts.init(document.getElementById('main2')).setOption({
						xAxis: {
							type: 'category',
							data: ['11', '12', '13', '14', '15', '16', '17']
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: [82, 93, 95, 100, 120, 133, 150],
							type: 'line',
							smooth: true
						}]
					}),
					echarts.init(document.getElementById('main3')).setOption({
						xAxis: {
							type: 'category',
							data: ['11', '12', '13', '14', '15', '16', '17']
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: [10, 93, 80, 100, 120, 133, 150],
							type: 'line',
							smooth: true
						}]
					}),
					echarts.init(document.getElementById('main4')).setOption({
						xAxis: {
							type: 'category',
							data: ['11', '12', '13', '14', '15', '16', '17']
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: [82, 93, 95, 100, 120, 133, 150],
							type: 'line',
							smooth: true
						}]
					}),
					echarts.init(document.getElementById('main5')).setOption({
						xAxis: {
							type: 'category',
							data: ['11', '12', '13', '14', '15', '16', '17']
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: [82, 93, 95, 100, 120, 133, 150],
							type: 'line',
							smooth: true
						}]
					})
			}
		}
	}
</script>

<style>
	#main {
		overflow: hidden;
	}

	.setUp img {
		width: 45rpx;
		height: 45rpx;
		float: right;
		margin-top: 40rpx;
		margin-right: 40rpx;
	}

	.personal {
		width: 750rpx;
		height: 230rpx;
		background: linear-gradient(180deg, #e6f7ff 0%, #f9f9f9 100%);
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		position: relative;
	}

	.personal1 {
		width: 710rpx;
		height: 382rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		opacity: 1;
		position: absolute;
		background-color: white;
		box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.06);
		top: 25rpx;
		left: 20rpx;
	}

	.headPortrait {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background-color: pink;
		float: left;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.headPortrait img {
		width: 100%;
		height: 100%;
	}

	.nameGrade {
		width: 500rpx;
		height: 120rpx;
		margin-top: 35rpx;
		margin-left: 30rpx;
		float: left;
	}

	.personal1-name {
		width: 100%;
		line-height: 50rpx;
		font-size: 40rpx;
		color: black;
	}

	.personalSignature {
		width: 100%;
		line-height: 90rpx;
		font-size: 30rpx;
		color: #91939b;
	}

	.specificInformation {
		width: 100%;
		height: 150rpx;
		margin-top: 200rpx;
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
		font-size: 55rpx;
		opacity: 0.85;
		color: #2d2d2d;
	}

	.accompanyingDays2 {
		line-height: 80rpx;
		font-size: 32rpx;
		color: #91939b;
	}

	.motion {
		width: 710rpx;
		height: 830rpx;
		margin-left: 20rpx;
		margin-top: 205rpx;
		box-shadow: 0px 3rpx 12rpx 1rpx rgba(0, 0, 0, 0.09);
		border-radius: 26rpx 26rpx 26rpx 26rpx;
		opacity: 1;
	}

	.userHeight,
	.userWeight {
		width: 710rpx;
		height: 650rpx;
		margin-left: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0px 3rpx 12rpx 1rpx rgba(0, 0, 0, 0.09);
		border-radius: 26rpx 26rpx 26rpx 26rpx;
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
		width: 400rpx;
		height: 50rpx;
		margin-top: 35rpx;
		margin-left: 20rpx;
		opacity: 1;
		float: left;
		text-align: left;
		font-size: 37rpx;
		font-weight: 500;
		color: #2d2d2d;
		line-height: 50rpx;
	}

	.numberSteps {
		width: 670rpx;
		height: 150rpx;
		margin-left: 20rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-around;
	}

	.actual {
		width: 50%;
		height: 100%;
		text-align: center;
	}

	.actual-num {
		width: 100%;
		font-size: 55rpx;
		font-weight: bold;
		color: #fd791a;
	}

	.actual-content {
		font-size: 25rpx;
		color: #2d2d2d;
	}

	.w {
		width: 50%;
		height: 100%;
		text-align: center;
	}

	.motion-columnChart {
		width: 670rpx;
		margin-left: 20rpx;
		height: 450rpx;
	}

	.motion-evaluate {
		width: 670rpx;
		margin-left: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #2d2d2d;
	}

	.yuandian {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: orange;
		float: left;
		margin-top: 37.5rpx;
	}
</style>
