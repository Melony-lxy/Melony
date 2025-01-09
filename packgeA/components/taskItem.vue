<template>
	<view class="taskBox">
		<nullData v-if="list.length <= 0" :paddingTop="paddingTop"></nullData>
		<view class="taskItem" @click="getNavTo(item)" v-for="(item, index) in list" :key="index">
			<view
				class="statusBox flex space-between u-f-ac"
				v-if="(current == 3 && item.category == 1) || current == 2"
			>
				<view class="flex u-f-ac">
					<view class="lines" v-if="current == 3"></view>
					<view class="statusText" v-if="current == 3">{{ item.category == 1 ? '客观题' : '主观题' }}</view>
				</view>
				<view class="taskStatus">
					{{ item.status == -1 ? '未提交' : item.status == 0 ? '已提交' : '已批阅' }}
				</view>
			</view>

			<view class="taskDetails">
				<view class="taskName space-between u-f-ac">
					<text>{{ item.name }}</text>
					<!-- <text class="fraction" v-if="item.status === 1">{{ item.fraction }}分</text> -->
				</view>
				<view class="flex" style="margin-top:29rpx;">
					<view class="roundLine">时间</view>
					<view class="taskTime">{{ item.ctime }}</view>
				</view>
				<view class="flex u-f-ac" style="margin-top: 16rpx;">
					<view class="roundLines">教师</view>
					<view class="taskTime flex-shrink">{{ item.teacher ? item.teacher.name : teacher }}</view>
					<view><view class="seeResult" v-if="item.status == 1">查看结果</view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'taskItem',
	props: {
		current: Number,
		list: Array,
		courseId: [Number, String],
		teacher: String,
		isTaskList: {
			type: Boolean,
			default() {
				return false
			}
		},
		paddingTop: {
			// 距离顶部距离 单位 rpx
			type: [String, Number],
			default() {
				return 40
			}
		}
	},
	data() {
		return {}
	},
	methods: {
		getNavTo(item) {
			//作业列表引用组件
			if (this.isTaskList) {
				uni.navigateTo({
					url:
						'/packgeA/taskDetails/taskDetails?courseId=' +
						item.day_id +
						'&&taskId=' +
						item.task_id +
						'&&status=' +
						item.status
				})
				return
			}

			// '/packgeA/testAnswer/testAnswer?id='+item.test_id+'&dayId='+item.day_id
			uni.navigateTo({
				url:
					this.current === 2
						? '/packgeA/taskDetails/taskDetails?courseId=' +
						  `${item.day_id ? item.day_id : this.courseId}` +
						  '&&taskId=' +
						  item.id +
						  '&&status=' +
						  item.status
						: item.category == 1
						? item.status == -1
							? '/packgeA/testAnswer/testAnswer?id=' +
							  item.test_id +
							  '&dayId=' +
							  `${item.day_id ? item.day_id : this.courseId}`
							: '/packgeA/answerResult/answerResult?id=' +
							  item.id +
							  '&dayId=' +
							  `${item.day_id ? item.day_id : this.courseId}`
						: '/packgeA/objectiveDetails/objectiveDetails?id=' + item.id
			})
		}
	}
}
</script>

<style scoped>
.taskBox {
	padding: 0 29rpx 29rpx;
}
.taskItem {
	background: #ffffff;
	border: 1px solid #e9e9e9;
	border-radius: 20rpx;
	margin-top: 27rpx;
}
.statusBox {
	padding: 12rpx 41rpx 10rpx 22rpx;
	border-bottom: 1px solid #ebeaea;
}
.lines {
	width: 5rpx;
	height: 33rpx;
	background: #fea406;
	border-radius: 3rpx;
	margin-right: 17rpx;
}
.statusText {
	font-size: 26rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	color: #ff6638;
	margin-top: 10rpx;
}
.taskStatus {
	font-size: 26rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	color: #ff6638;
}
.taskDetails {
	padding: 16rpx 41rpx 42rpx 24rpx;
}
.taskName {
	font-size: 28rpx;
	font-family: Source Han Sans SC;
	font-weight: bold;
	color: #2d2d2d;
}
.roundLine {
	width: 76rpx;
	height: 32rpx;
	border-radius: 20rpx;
	font-size: 24rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	line-height: 32rpx;
	color: #2d2d2d;
}
.roundLines {
	color: #2d2d2d;
	width: 76rpx;
	height: 32rpx;
	border-radius: 20rpx;
	font-size: 24rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	line-height: 32rpx;
}
.taskTime {
	font-size: 22rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	color: #666666;
	margin-left: 20rpx;
}
.fraction {
	width: 24%;
	font-size: 32rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	color: #fea406;
	text-align: right;
}
.seeResult {
	width: 159rpx;
	height: 45rpx;
	border: 1px solid #ff6638;
	border-radius: 86rpx;
	font-size: 26rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	line-height: 45rpx;
	text-align: center;
	color: #ff6638;
}
</style>
