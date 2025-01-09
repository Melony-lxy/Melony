<template>
	<!-- 课程列表 -->
	<view>

		<view class="curriculumListBox">
			<nullData v-if="listDay.length<=0"></nullData>
			<view class="curriculumItem flex bgWhite space-between u-f-ac" v-for="(item,index) in listDay" :key='index'
				@click="getNavTo(item.id,item.index)">
				<view class="textCenter curriculumItemLeft">
					<view class="classDay">
						{{item.start_time.split(' ')[0].split("-")[1]}}/{{item.start_time.split(' ')[0].split("-")[2]}}
					</view>
					<view class="classDayTime">{{item.start_time.split(' ')[1].substring(0,5)}}</view>
				</view>
				<view class="curriculumItemCenter flex-shrink">
					<view class="classDayName">第{{item.index}}节 {{item.name}} <text v-if="item.type==1"
							style="margin-left:10rpx;font-size: 25rpx;color: red;">(补课)</text></view>
					<view class="classHour">课时：{{item.duration}}分钟</view>
				</view>
				<view>
					<view class="flex u-f-ac" v-if="dataTime>item.end_time">
						<u-icon name="play-circle" color="#FF6638" size="38"></u-icon>
						<text class="playback">已结束</text>
				 </view>

					<view class="flex u-f-ac" v-if="advance<item.start_time">
						<u-icon name="play-circle" color="#999999" size="38"></u-icon>
						<text class="notStarted" style="color:#999999;">未开始</text>
						<!-- <image @click.stop="clickNav()"  :src="common.imgUrl('/static/icon/sandian.png')" class="ellipsis" mode=""></image> -->
					</view>
					<view class="flex u-f-ac" v-if="advance > item.start_time && dataTime<item.end_time">
						<u-icon name="play-circle" color="#FEA406" size="38"></u-icon>
						<text class="notStarted">进行中</text>
						<!--   <image    @click.stop="clickNav()" :src="common.imgUrl('/static/icon/sandian.png')" class="ellipsis" mode=""></image> -->
					</view>
				</view>
			</view>
		</view>





		<!-- 菜单弹框 -->
		<u-modal v-model="navShow" width="682rpx" title='  ' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able>
			<view style="padding:31rpx 42rpx 55rpx 42rpx;">
				<view class="buttonOne">
					<u-button @click="()=>{adjustingShow=true}" :custom-style='{height:"68rpx"}' type="success">调课
					</u-button>
				</view>
				<view class="buttonTwo">
					<u-button @click="()=>{cancelAppointment=true}"
						:custom-style='{height:"68rpx",background:"#FEA406"}' type="success">取消约课</u-button>
				</view>
			</view>
		</u-modal>

		<!-- 调课弹框 -->
		<u-modal v-model="adjustingShow" width="682rpx" title='  ' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able>
			<view style="padding:0rpx 32rpx 55rpx 32rpx;">
				<!-- 课节详情 -->
				<alertDetails />
				<!-- //选择老师 时间-->
				<view class="choiceBox flex u-f-ac space-between">
					<view class="choiceTeacher">选择老师:</view>
					<view class="choiceTeacherBox flex space-around u-f-ac" @click="()=>{teacherSelectShow=true}">
						<span>{{teacherText}}</span>
						<u-icon name="arrow-down" color="#FEA406" size="22"></u-icon>
					</view>
					<view class="flex u-f-ac ">
						<!-- 开始时间 -->
						<view class="choiceTeacherBox startTime flex space-around u-f-ac" @click="timeShow('start')">
							<span>{{startTime}}</span>
							<u-icon name="arrow-down" color="#FEA406" size="22"></u-icon>
						</view>

						<view style="margin-left:8rpx;">-</view>

						<!-- 结束时间 -->
						<view class="choiceTeacherBox startTime flex space-around u-f-ac" @click="timeShow('end')">
							<span>{{endTime}}</span>
							<u-icon name="arrow-down" color="#FEA406" size="22"></u-icon>
						</view>
					</view>
				</view>

				<!-- 选择课节 -->
				<view>
					<view class="adjustingItem flex u-f-ac space-between" v-for="(item,index) in  3" :key='index'
						@click="adjustingChoice(index)">
						<view class="yuan flex-center">
							<view class="activeYuan" v-if="adjustingIndex==index"></view>
						</view>
						<view class="flex-shrink">
							<view class="adjustingName">第1节 · 对重点知识点进行讲解 <text class="hoursText">课节时长</text></view>
							<view class="adjustingTime">2020-03-12 17:00 ~ 2020-03-13 18:00 <text
									class="hoursTime">30分钟</text> </view>
						</view>
					</view>
				</view>

				<view class="choiceText textCenter">
					已选择第一节
				</view>

				<u-button @click="adjustingConfirm()" :custom-style='{height:"59rpx"}' type="success">确定</u-button>
			</view>
		</u-modal>

		<!-- 取消约课弹框 -->
		<u-modal v-model="cancelAppointment" width="682rpx" title='  ' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able>
			<view style="padding:0rpx 32rpx 55rpx 32rpx;">
				<!-- 课节详情 -->
				<alertDetails />

				<view class="adjustingItem flex u-f-ac space-between greenBorder">
					<view class="yuan flex-center">
						<view class="activeYuan"></view>
					</view>
					<view class="flex-shrink">
						<view class="adjustingName">第1节 · 对重点知识点进行讲解 <text class="hoursText">课节时长</text></view>
						<view class="adjustingTime">2020-03-12 17:00 ~ 2020-03-13 18:00 <text
								class="hoursTime">30分钟</text> </view>
					</view>
				</view>

				<view class="aySure textCenter">
					是否取消已选预约课程
				</view>

				<view>
					<u-button :custom-style='{height:"59rpx",background:"#FEA406"}' type="success">确定</u-button>
					<u-button @click="()=>{cancelAppointment=false}"
						:custom-style='{height:"59rpx",border:"1px solid #FEA406",color:"#FEA406",marginTop:"30rpx"}'>
						返回
					</u-button>
				</view>
			</view>
		</u-modal>

		<u-select v-model="teacherSelectShow" :list="teacherlist" @confirm='teacherConfirm'></u-select>
		<u-picker mode="time" v-model="startTimeShow" :params='params' @confirm='timeConfirm'></u-picker>
	</view>
</template>

<script>
	import alertDetails from '@/packgeA/components/alertCurricuLumDetails.vue'
	import {
		getTimeWeex
	} from "@/plugin/time.js"
	export default {
		components: {
			alertDetails
		},
		props: {
			listDay: Array,
			course: Object,
			advance: [Number, String],
			orderId: [Number, String]
		},
		data() {
			return {
				dataTime: getTimeWeex(0).time,
				navShow: false,
				adjustingShow: false,
				cancelAppointment: false,
				teacherText: '请选择',
				teacherSelectShow: false,
				startTimeShow: false,
				endTime: '请选择',
				startTime: '请选择',
				isTime: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				adjustingIndex: 0,
				teacherlist: []
			}
		},
		methods: {
			//打开时间菜单
			timeShow(value) {
				this.startTimeShow = true,
					this.isTime = value
			},
			//打开课节操作
			clickNav() {
				this.navShow = true
			},
			//确认选择老师
			teacherConfirm(e) {
				console.log(e)
				this.teacherText = e[0].label
			},
			adjustingChoice(index) {
				this.adjustingIndex = index
			},
			adjustingConfirm() {
				this.adjustingShow = false
			},
			timeConfirm(value, e) {
				if (this.isTime === 'start') {
					this.startTime = value.month + '-' + value.day + ' ' + value.hour + ':' + value.minute
				} else {
					this.endTime = value.month + '-' + value.day + ' ' + value.hour + ':' + value.minute
				}
			},

			getNavTo(id, index) {
				this.course.index = index
				const course = {
					index: this.course.index,
					img: this.course.img,
					name: this.course.name,
				}
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '/packgeB/sectionDetails/sectionDetails?id=' + id + '&course=' + JSON.stringify(course)  + '&orderId=' + this.orderId + '&index=' + index
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: '/packgeB/sectionDetails/sectionDetails?id=' + id + '&course=' + encodeURIComponent(JSON
						.stringify(course)) + '&orderId=' + this.orderId + '&index=' + index
				})
				// #endif

			}


		}
	}
</script>

<style scoped>
	@import '/common/css/currency.css';

	/* 课程列表 */
	.curriculumListBox {
		padding: 24rpx 29rpx;
		background-color: rgb(252, 252, 253);
	}

	.curriculumItem {
		padding: 22rpx 38rpx 23rpx 26rpx;
		margin-bottom: 24rpx;
		border: 1px solid #E9E9E9;
		border-radius: 20rpx;
	}

	.classDay {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2D2D2D;
	}

	.classDayTime {
		font-size: 22rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #989898;
	}

	.classDayName {
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2D2D2D;
	}

	.classHour {
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #989898;
	}

	.curriculumItemLeft {
		padding-right: 20rpx;
		border-right: 1px solid #F5F5F5;
	}

	.curriculumItemCenter {
		padding-left: 20rpx;
	}

	.playback {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FF6638;
		margin-left: 11rpx;
		margin-bottom: 5rpx;
	}

	.notStarted {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FEA406;
		margin-left: 11rpx;
		margin-bottom: 5rpx;
	}

	.ellipsis {
		width: 8rpx;
		height: 36rpx;
		margin-left: 23rpx;
	}

	.buttonOne {
		margin-bottom: 52rpx;
	}

	.buttonTwo {
		padding-top: 52rpx;
		border-top: 1px solid #DCDCDC;
	}

	.choiceText {
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #BFBFBF;
		padding: 32rpx 0;
	}

	.greenBorder {
		border: 1px solid #FF6638;
	}
</style>
