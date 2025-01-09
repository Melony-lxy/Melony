<template>
	<view>
		<view class="topBox">
			<image class="classImg" v-if="details.course" :src="common.imgUrl(details.course.img)" mode="aspectFill">
			</image>
			<!-- <view class="mask"></view> -->
		</view>
		<!-- 课程介绍 -->
		<view class="bgWhite curriculumBox">
			<view class="space-between">
				<view class="curricuLumName" v-if="details.course"> {{details.course.name}} </view>
				<view class="flex " v-if="details.service_refund_status<0">
					<view class="teacherButton" @click="onAppointment()" v-if="details.appointment">约课</view>
					<view class="teacherButton" @click="courseAdjustment()" v-if="details.type==0&&details.adjustment">
						调课</view>
				</view>
			</view>
			<view class="flex curriculumText space-between u-f-ac">
				<view class="classDay">
					<image :src="common.imgUrl('/static/icon/kj.png')" class="kjIcon" mode=""></image>
					课节
					{{details.positive_class>details.class_count ? details.class_count : details.positive_class}}/{{details.positive_class}}
				</view>
				<view class="sendClassDay">
					<image :src="common.imgUrl('/static/icon/lw.png')" class="lwIcon" mode=""></image>
					赠送课节
					{{details.positive_class>details.class_count ? 0 : details.class_count - details.positive_class}}/{{details.give_class}}
				</view>
				<view style="width: 126rpx;"></view>
				<!-- <view class="curriculumStates" >排课中</view> -->
			</view>
		</view>

		<!-- 老师介绍 -->
		<view class="teacherBox bgWhite u-f-ac " v-if="details.teacher"style="justify-content: space-between;">
			<view class="flex" @click="teacherDetails" >
			<image class="teacherHeader" :src="common.imgUrl(details.teacher.img)" mode=""></image>
			<view style="margin:0 80rpx 0 20rpx;line-height: 104rpx;">
				<view class="teacherName">{{details.teacher.name}}</view>
				<view class="teacherType">{{details.teacher.lable}}</view>
			</view>
			</view>
			<view class="flex">
				<!-- <view class="teacherButton" @click="()=>{appointmentShow=true}" >约课</view> -->
				<!-- <view class="teacherButton" v-if="details.type==1" @click="()=>{shiftShow=true}">转班</view> -->
			</view>
			<view class="flex" style="margin-left: 100rpx;">
				<view class="teacherButton" @click="consulting1(details.teacher)">评价</view>
			</view>
		</view>
        <!-- 评价 -->
		<u-modal v-model="show1" width="682rpx" title='请填写您对该老师的评价' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able >
			<view  style="padding:30rpx 42rpx 30rpx 42rpx;">
				<textarea v-model="newreMarks" placeholder="请输入你的评价" auto-height />
			</view>
			<view style="padding:30rpx 42rpx 30rpx 42rpx;">
				<view @click="AddNew()"
					style="background:#FF6638;height:63rpx;line-height: 64rpx;color:white;text-align: center;border-radius: 20px;"
					type="success">提交</view>
			</view>
		</u-modal>
		<view class="curricuLumNav bgWhite" v-if="isTabs">
			<u-tabs :list="tablist" :is-scroll="false" :current="current" @change="change" active-color='#00CB84'>
			</u-tabs>
		</view>
		<!-- 课程列表 -->
		<view v-if="current===0">
			<classDayitem :advance='advance' :orderId='id' :listDay='listDay' :course='details.course'></classDayitem>
		</view>

		<!-- 课程介绍 -->
		<view v-if="current===1" class='contentDetails'>
			<nullData v-if="!details.course.content"></nullData>
			<view v-html="common.content(details.course.content)"></view>
		</view>

		<!-- 课消 -->
		<view v-if="current===2" class="consumption">
			<view class="numberBox  bgWhite space-between textCenter">
				<view class=" greenText">
					<view>{{details.positive_class}}</view>
					<view class="numberText ">总课节</view>
				</view>
				<view class="yellowText">
					<view>{{details.positive_class>details.class_count ? details.class_count : details.positive_class}}
					</view>
					<view class="numberText ">已消耗课节</view>
				</view>
				<view class="greyText">
					<view>
						{{details.positive_class-(details.positive_class>details.class_count ? details.class_count : details.positive_class)}}
					</view>
					<view class="numberText ">剩余课节</view>
				</view>
			</view>

			<view class="numberBox  bgWhite space-between textCenter">
				<view class=" greenText">
					<view>{{details.give_class}}</view>
					<view class="numberText">赠送课节</view>
				</view>
				<view class="yellowText">
					<view>
						{{details.positive_class>details.class_count ? 0 : details.class_count - details.positive_class}}
					</view>
					<view class="numberText">已消耗赠送</view>
				</view>
				<view class=" greyText">
					<view>
						{{details.positive_class>details.class_count ? details.give_class :details.give_class- details.class_count + details.positive_class}}
					</view>
					<view class="numberText">剩余赠送</view>
				</view>
			</view>

			<!--<view class="numberBox  bgWhite space-between textCenter">
        <view class=" greenText">
          <view>0</view>
          <view class="numberText ">作业</view>
        </view>
        <view class="yellowText">
          <view>0</view>
          <view class="numberText ">测验</view>
        </view>
        <view class=" greyText">
          <view>0</view>
          <view class="numberText ">课件</view>
        </view>
      </view> -->
		</view>

		<!-- 调课弹框 -->
		<u-modal v-model="courseAdjustmentShow" width="682rpx" title='  ' :border-radius='20'
			:show-confirm-button='false' :title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}"
			mask-close-able>
			<view style="padding:0rpx 32rpx 55rpx 32rpx;">
				<alertDetails :details='details'></alertDetails>
				<!-- //选择老师 时间-->
				<view class="choiceBox flex u-f-ac space-between">
					<view class="choiceTeacher">选择课节:</view>
					<view class="choiceTeacherBox flex space-around u-f-ac" @click="()=>{classSelectShow=true}">
						<span>{{classDayText}}</span>
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
				<scroll-view scroll-y="true" class="scroll-Y" style="height: 508rpx;" @scrolltolower='scrolltolower'>
					<nullData v-if="apptionList.length<=0" :paddingTop='150'></nullData>
					<view class="adjustingItem flex u-f-ac space-between greenBorder"
						:style="adjustmentChoick==index?'border-Color:#00CB84':''" v-for="(item,index) in  apptionList"
						:key='index' @click="()=>{adjustmentChoick=index}">
						<view class="yuan flex-center">
							<view class="activeYuan" v-if="adjustmentChoick==index"></view>
						</view>
						<view class="flex-shrink">
							<view class="adjustingName space-between">{{item.name}} <text class="hoursText">课节时长</text>
							</view>
							<view class="adjustingTime space-between">{{item.start_time}} ~ {{item.end_time}} <text
									class="hoursTime">{{item.duration}}分钟</text> </view>
						</view>
					</view>
				</scroll-view>
				<view class="tipsText textCenter">请选择调课课节</view>
				<view>
					<u-button :custom-style='{height:"59rpx"}' @click="adjustment" type="success">确定</u-button>
				</view>
			</view>
		</u-modal>

		<!-- 约课弹框 -->
		<u-modal v-model="appointmentShow" width="682rpx" title='' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able>
			<view style="padding:0rpx 32rpx 55rpx 32rpx;">
				<alertDetails :details='details'></alertDetails>
				<!-- //选择老师 时间-->
				<view class="choiceBox flex u-f-ac space-between">
					<view class="choiceTeacher">选择老师:</view>
					<view class="choiceTeacherBox flex space-around u-f-ac" @click="()=>{teacherSelectShow=true}">
						<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{teacherText}}
						</view>
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
				<scroll-view scroll-y="true" class="scroll-Y" style="height: 508rpx;" @scrolltolower='scrolltolower'>

					<nullData v-if="apptionList.length<=0" :paddingTop='150'></nullData>

					<view class="adjustingItem flex u-f-ac space-between greenBorder"
						:style="apptionChoice.indexOf(item.id)!==-1?'border-Color:#00CB84':''"
						v-for="(item,index) in  apptionList" :key='index' @click="choiceClassDay(item,index)">
						<view class="yuan flex-center">
							<view class="activeYuan" v-if="apptionChoice.indexOf(item.id)!==-1"></view>
						</view>
						<view class="flex-shrink">
							<view class="adjustingName space-between">{{item.name}}<text class="hoursText">课节时长</text>
							</view>
							<view class="adjustingTime space-between">{{item.start_time}} ~ {{item.end_time}} <text
									class="hoursTime">{{item.duration}}分钟</text> </view>
						</view>
					</view>
				</scroll-view>

				<view class="tipsText textCenter">请选择预约老师和时间</view>
				<view>
					<u-button :custom-style='{height:"59rpx"}' @click="appointmentClick" :throttle-time='2000'
						type="success">确定</u-button>
				</view>
			</view>
		</u-modal>

		<!-- 转班弹框 -->
		<u-modal v-model="shiftShow" width="682rpx" title='  ' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able>
			<view style="padding:0rpx 32rpx 55rpx 32rpx;">
				<alertDetails :details='details'></alertDetails>
				<!-- //选择老师 时间-->
				<view class="choiceBox flex u-f-ac">
					<view class="choiceTeacher">请选择转班老师:</view>
					<view class="choiceTeacherBox flex space-around u-f-ac" @click="()=>{teacherSelectShow=true}">
						<span>{{teacherText}}</span>
						<u-icon name="arrow-down" color="#FEA406" size="22"></u-icon>
					</view>
					<view class="flex flex-shrink u-f-ac space-around">
						<view class="choiceTeacher">消耗:</view>
						<view class="frame">5</view>
						<view class="choiceTeacher">剩余:</view>
						<view class="frame">15</view>
					</view>
				</view>

				<view class="classTextIn">
					已消耗课节数5, 可转班课节15, 系统已自动选择剩余可转班
					课节
				</view>

				<view class="adjustingItem flex u-f-ac space-between greenBorder">
					<view class="yuan flex-center">
						<view class="activeYuan"></view>
					</view>
					<view class="flex-shrink">
						<view class="adjustingName space-between">第1节 · 对重点知识点进行讲解 <text class="hoursText">课节时长</text>
						</view>
						<view class="adjustingTime space-between">2020-03-12 17:00 ~ 2020-03-13 18:00 <text
								class="hoursTime">30分钟</text> </view>
					</view>
				</view>

				<view class="aySure textCenter">
					是否进行转班操作
				</view>
				<view>
					<u-button :custom-style='{height:"59rpx",background:"#FEA406"}' type="success">确定</u-button>
					<u-button @click="()=>{shiftShow=false}"
						:custom-style='{height:"59rpx",border:"1px solid #FEA406",color:"#FEA406",marginTop:"30rpx"}'>
						返回
					</u-button>
				</view>
			</view>
		</u-modal>

		<!-- 老师弹框 -->
		<u-select v-model="teacherSelectShow" value-name='id' label-name='nick' :list="teacherlist"
			@confirm='teacherConfirm'></u-select>

		<!-- 课节弹框-->
		<u-select v-model="classSelectShow" value-name='id' label-name='name' :list="classDayList"
			@confirm='classSelectConfirm'></u-select>

		<!-- 时间弹框 -->
		<u-picker mode="time" v-model="startTimeShow" :params='params' @confirm='timeConfirm'></u-picker>
	</view>
</template>

<script>
	import classDayitem from "@/packgeB/classDayItem.vue";
	import alertDetails from '@/packgeA/components/alertCurricuLumDetails.vue'
	import {
		getTimeWeex
	} from "../../plugin/time.js";
	export default {
		components: {
			classDayitem,
			alertDetails,
		},
		data() {
			return {
				newreMarks:'',
				uid:-1,
				show1: false,
				isTabs: false,
				advance: null,
				id: 0,
				teacherlist: [], //
				apptionList: [],
				apptionChoice: [],
				appointmentShow: false,
				teacherText: "请选择",
				teacherSelectShow: false,
				startTimeShow: false,
				courseAdjustmentShow: false,
				classSelectShow: false,
				shiftShow: false,
				endTime: "请选择",
				startTime: "请选择",
				classDayText: "请选择",
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false,
				},
				tablist: [{
						name: "课程",
					},
					{
						name: "课程详情",
					},
					{
						name: "课消",
					},
				],
				queryfrom: {
					start_time: "",
					end_time: "",
					teacher_id: 0,
				},
				type: 0,
				current: 0,
				details: {},
				page: 1, //第几页
				limit: 10, //每页5条
				totalCount: 0, //总数
				listDay: [], //课节列表
				coursePage: 1,
				courseLimit: 8,
				courseTotal: 0,
				classDayList: [], //可以调课的课节
				dateTime: null, //当前时间
				adjustmentId: 0, //选中的要调课的课节
				adjustmentChoick: 0, //选中被调课的课节
				isTrue: true,
			};
		},
		created() {
			setInterval(() => {
				this.isTabs = true
			}, 500)
		},
		onLoad(option) {
			this.id = option.id;
			this.getTeachingDetails();
			this.getClassList();
			this.getAdvance()
		},
		onPullDownRefresh() {
			this.getAdvance()
		},
		onReachBottom() {
			const pageNum = Math.ceil(this.totalCount / this.limit);
			if (this.page <= pageNum) {
				this.page++;
				this.getClassList();
			}
		},
		methods: {
			AddNew() {
				if (this.newreMarks == '') {
					this.$u.toast('请填写评价')
					return
				}
				this.$axios({
					url: this.$url[109],
					data: {
						teacherUid: this.uid,
						content: this.newreMarks,
					}
				}).then(res => {
						this.newreMarks = ''
						uni.showToast({
							title: '评价成功',
							icon: 'none'
						})
						setTimeout(() => {
							this.show1 = false;
						}, 1000)
					
				})
			},
			consulting1(i) {
				this.uid=i.uid;
				this.show1 = true;
			},
			change(index) {
				this.current = index;
			},

			teacherDetails() {
				uni.navigateTo({
					url: '/packgeA/teacherDetails/teacherDetails?uid=' + this.details.teacher.uid
				})
			},

			getAdvance() {
				let state = new Date(new Date().getTime() + 900000)
				let date = new Date(state)
				this.advance = date.getFullYear() + "-" + this.common.getNumber((date.getMonth() + 1)) + "-" + this.common
					.getNumber(date.getDate()) + ' ' + this.common.getNumber(date.getHours()) + ':' + this.common
					.getNumber(date.getMinutes())
				uni.stopPullDownRefresh()
			},


			//获取授课详情
			getTeachingDetails() {
				this.$axios({
					url: this.$url[13],
					data: {
						id: this.id,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.details = res.data;
					} else {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					}
				});
			},

			//获取课节列表
			getClassList() {
				this.$axios({
					url: this.$url[14],
					data: {
						// page: this.page,
						// limit: this.limit,
						query: {
							id: this.id,
						},
					},
				}).then((res) => {
					if (res.code == 0) {
						this.listDay = res.data.data;
					}
				});
			},

			//打开时间菜单
			timeShow(value) {
				(this.startTimeShow = true), (this.isTime = value);
			},

			//确认选择老师
			teacherConfirm(e) {
				this.apptionList = []
				this.teacherText = e[0].label;
				this.queryfrom.teacher_id = e[0].value;
				this.getApptionList();
			},

			// 选择时间
			timeConfirm(value, e) {
				console.log(value)
				this.apptionList = []
				if (this.isTime === "start") {
					this.queryfrom.start_time = value.year + '-' + value.month + "-" + value.day + " " + value.hour + ":" +
						value.minute;
					this.startTime = value.month + "-" + value.day + " " + value.hour + ":" + value.minute;
				} else {
					this.queryfrom.end_time = value.year + '-' + value.month + "-" + value.day + " " + value.hour + ":" +
						value.minute;
					this.endTime = value.month + "-" + value.day + " " + value.hour + ":" + value.minute;
				}
				this.getApptionList();
			},

			appointmentClick() {
				if (this.apptionChoice.length == 0) {
					this.$u.toast("请选择约课课节");
					return;
				}

				if (!this.isTrue) {
					this.$u.toast("正在约课中请稍等");
					return
				}
				this.isTrue = false
				this.$axios({
					url: this.$url[25],
					data: {
						id: this.id,
						list: this.apptionChoice,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.$u.toast("约课成功");
						this.appointmentShow = false;
						this.getClassList();
					} else {
						this.appointmentShow = false;
						this.$u.toast(res.msg);
					}
					this.isTrue = true
				}).catch(msg => {
					this.$u.toast(msg.data.msg);
					this.isTrue = true
				});
			},

			// 获取约课列表
			getApptionList(isTrue = false) {
				this.$axios({
					url: this.$url[26],
					data: {
						page: this.coursePage,
						limit: this.courseLimit,
						query: {
							id: this.id,
							type: this.type,
							...this.queryfrom,
						},
					},
				}).then((res) => {
					if (res.code == 0) {
						this.courseTotal = res.data.totalCount;
						if (isTrue) {
							this.teacherlist = res.data.userList;
							this.apptionList = []
							this.apptionList = this.apptionList.concat(res.data.data);
						} else {
							this.apptionList = this.apptionList.concat(res.data.data);
						}
					}
				});
			},

			//上拉加载更多
			scrolltolower() {
				const pageNum = Math.ceil(this.courseTotal / this.courseLimit);
				if (this.coursePage < pageNum) {
					this.coursePage++;
					this.getApptionList();
				}
			},

			//多选约课课节
			choiceClassDay(item, index) {
				if (this.apptionChoice.indexOf(item.id) === -1) {
					this.apptionChoice.push(item.id);
				} else {
					this.apptionChoice.splice(this.apptionChoice.indexOf(item.id), 1);
				}
			},

			//点击约课
			onAppointment() {
				this.appointmentShow = true;
				this.type = 0
				this.default()
				this.getApptionList(true);
			},
			default () {
				this.apptionChoice=[]
				this.adjustmentChoick=0
				this.coursePage=1
				this.adjustmentId=0
				this.endTime = "请选择"
				this.startTime = "请选择"
				this.teacherText = "请选择"
				this.classDayText = "请选择"
				this.queryfrom = {
					start_time: "",
					end_time: "",
					teacher_id: 0,
				}
			},
			//点击调课
			courseAdjustment() {
				this.classSelectShow=true
				this.classDayList = [];
				this.dateTime = getTimeWeex(0).time;
				this.listDay.forEach((item) => {
					if (item.start_time > this.dateTime) {
						this.classDayList.push({
							id: item.id,
							name: `第${item.index}课节`
						});
					}
				});
				//       if(this.classDayList.length==0){
				//   this.$u.toast("暂时没有可调的课");
				// }
				// return 
				this.courseAdjustmentShow = true;
				this.type = 1
				this.default()
				this.getApptionList(true);
			},

			classSelectConfirm(e) {
				this.adjustmentId = e[0].value;
				this.classDayText = e[0].label;
			},

			//确认调课
			adjustment() {
				
				if (this.adjustmentId == 0) {
					this.courseAdjustmentShow = false;
					this.$u.toast("请选择需要调课的课节");
					return false;
				}
				this.$axios({
					url: this.$url[38],
					data: {
						id: this.adjustmentId,
						time: this.apptionList[this.adjustmentChoick].id,
					},
				}).then((res) => {
					if (res.code == 0) {
						this.$u.toast("调课成功");
						this.courseAdjustmentShow = false
						this.getClassList();
					}else{
						//弹窗隐藏
						this.courseAdjustmentShow = false;
					}
				});
			},
		},
	};
</script>

<style scoped>
	page {
		background: #f2f2f2;
	}
</style>

<style scoped lang="scss">
	@import "/common/css/currency.css";

	.classImg {
		width: 100%;
		height: 421rpx;
	}

	.mask {
		width: 100%;
		height: 421rpx;
		position: absolute;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.topBox {
		position: relative;
		display: flex;
	}

	.curriculumBox {
		padding: 18rpx 29rpx 22rpx;
	}

	.curricuLumName {
		font-size: 34rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: #262626;
	}

	.curriculumStates {
		width: 126rpx;
		height: 40rpx;
		background: #fea406;
		border-radius: 6px;
		text-align: center;
		line-height: 40rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.87);
	}

	.curriculumText {
		margin-top: 31rpx;
	}

	.classDay,
	.sendClassDay {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2d2d2d;
	}

	.teacherBox {
		margin-top: 9rpx;
		padding: 40rpx 29rpx;
	}

	.teacherHeader {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 12rpx;
	}

	.teacherName {
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: #333333;
	}

	.teacherType {
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #333333;
		margin-top: 6rpx;
	}

	.teacherButton {
		width: 144rpx;
		height: 54rpx;
		border: 2rpx solid #00cb84;
		border-radius: 37rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #00cb84;
		text-align: center;
		line-height: 54rpx;
		margin-left: 20rpx;
	}

	.curricuLumNav {
		margin-top: 9rpx;
	}

	.curricuLumNav {
		padding-top: 13rpx;
	}

	.kjIcon {
		width: 25rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.lwIcon {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.purchaseRight {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.schooleBox {
		padding: 30rpx 0 39rpx 49rpx;
	}

	.schoolName {
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2d2d2d;
	}

	.classIn {
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #989898;
		margin-top: 16rpx;
	}

	.consumption {
		padding: 27rpx 30rpx;
		background: rgb(252, 252, 253);
	}

	.greenText {
		color: #00cb84;
	}

	.yellowText {
		color: #fea406;
	}

	.greyText {
		color: #adadad;
	}

	.numberBox {
		padding: 32rpx 75rpx;
		font-size: 30px;
		font-family: Source Han Sans SC;
		font-weight: bold;
		/*    margin-top: 29rpx; */
	}

	.numberText {
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
	}

	.numberBox>view {
		width: 24%;
	}

	.tipsText {
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #bfbfbf;
		padding: 30rpx 0;
		border-top: 1px solid #f2f2f2;
	}

	.frame {
		width: 45rpx;
		height: 38rpx;
		border: 1px solid #fea406;
		border-radius: 4rpx;
		line-height: 38rpx;
		text-align: center;
		font-size: 20rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #fea406;
	}

	.classTextIn {
		padding: 18rpx 24rpx;
		background: #f9f9f9;
		border-radius: 4rpx;
		font-size: 22rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #999999;
	}

	.contentDetails {
		padding: 32rpx;
		font-size: 30rpx;
		line-height: 1.5;
		max-width: 100%;
	}
</style>
