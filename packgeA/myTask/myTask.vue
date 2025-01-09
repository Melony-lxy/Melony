<template>
	<view class="box">
		<view class="screenBox space-between">
			<view class="screenItem flex u-f-ac" v-for="(item, index) in screenList" :key="index"
				@click="selectShow(index)">
				<view class="leftMargin">{{ item.text }}</view>
				<img :src="common.imgUrl('/static/images/round.png')" alt="" />
			</view>
		</view>

		<taskItem :list="dataList" :paddingTop="300" :isTaskList="true" :current="2"></taskItem>
		<!-- 选择课程 -->
		<u-select v-model="screenList[0].show" mode="single-column" :list="courseList" @confirm="confirm"></u-select>
		<!-- 选择课节 -->
		<u-select v-model="screenList[1].show" mode="single-column" :list="classDayList" @confirm="classDayConfim">
		</u-select>
		<!-- //选择开始时间 -->
		<u-picker mode="time" v-model="startTimeShow" :params="params" @confirm="timeConfirm"></u-picker>
	</view>
</template>

<script>
	import taskItem from '@/packgeA/components/taskItem.vue'
	export default {
		components: {
			taskItem
		},
		data() {
			return {
				screenList: [{
						text: '选择课程',
						show: false
					},
					{
						text: '选择课节',
						show: false
					},
					{
						text: '开始时间',
						show: false
					},
					{
						text: '结束时间',
						show: false
					}
				],
				startTimeShow: false, //时间弹窗
				classDayList: this.classDay(),
				dataList: [],
				page: 1, //第几页
				limit: 999, //每页5条
				totalCount: 0, //总数
				courseList: [],
				params: {
					year: true,
					month: true,
					day: true
				},
				forms: {
					order_id: null,
					section: null,
					start_time: '',
					end_time: ''
				},
				isTime: ''
			}
		},
		onShow() {
			this.getTaskList()
		},
		onLoad() {
			this.getCourse()
			this.getTaskList()
		},
		methods: {
			selectShow(index) {
				if (index > 1) {
					if (index == 2) {
						this.isTime = 'start'
					} else {
						this.isTime = 'end'
					}
					this.startTimeShow = true
					return false
				}
				this.screenList[index].show = true
			},
			// 选择时间
			timeConfirm(value, e) {
				if (this.isTime === 'start') {
					this.screenList[2].text = value.year + '-' + value.month + '-' + value.day
					this.forms.start_time = this.screenList[2].text
				} else {
					this.screenList[3].text = value.year + '-' + value.month + '-' + value.day
					this.forms.end_time = this.screenList[3].text
				}
				this.getTaskList()
			},

			//确定课程
			confirm(e) {
				this.screenList[0].text = e[0].label
				this.forms.order_id = e[0].value
				this.getTaskList()
			},

			//确定科节
			classDayConfim(e) {
				this.screenList[1].text = e[0].label
				this.forms.section = e[0].value
				this.getTaskList()
			},
			// 获取课程列表
			getCourse() {
				this.$axios({
					url: this.$url[11],
					data: {
						page: this.page,
						limit: this.limit,
						query: {
							is_teaching: true
						}
					}
				}).then(res => {
					if (res.code == 0) {
						res.data.data.forEach(item => {
							this.courseList.push({
								value: item.id,
								label: item.course.name
							})
						})
					}
				})
			},
			//获取作业列表
			getTaskList() {
				this.$axios({
					url: this.$url[20],
					data: this.forms
				}).then(res => {
					if (res.code == 0) {
						this.dataList = res.data.data
					}
				})
			},
			//100节课节
			classDay() {
				let array = []
				for (let i = 1; i <= 100; i++) {
					array.push({
						value: i,
						label: `第${i}课节`
					})
				}
				return array
			}
		}
	}
</script>

<style>
	page {
		background: #f9f9f9;
	}
</style>

<style scoped>
	.screenBox img {
		width: 20rpx;
		height: 20rpx;
		margin-top: 6rpx;
	}

	.screenBox {
		background: #ffffff;
		padding: 0rpx 30rpx;
	}

	.screenItem {
		padding: 25rpx 0;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2d2d2d;
	}

	.leftMargin {
		width: 118rpx;
		margin-right: 10rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
