<template>
	<view v-show="list">
		<view class="plan-content">
			<view class="title-font"><strong>计划标题：</strong></view>
			<p v-show="show">{{ list.plan_title }}</p>
			<p v-show="isShow"><input type="text" v-model="title" class="title-font1" /></p>
			<view class="title-font"><strong>计划时间：</strong></view>
			<p v-show="show">{{ list.remind_time }}</p>
			<view class="title-time" v-show="isShow"><uni-datetime-picker type="datetime" v-model="time" /></view>
			<!-- <view class="title-time" v-if="isShow"><uni-datetime-picker type="datetime" v-model="time" /></view> -->
			<view class="title-font"><strong>计划详情：</strong></view>
			<p v-show="show">{{ list.content }}</p>
			<textarea placeholder-style="color:#F76260;" maxlength="160" v-show="isShow" v-model="content" />
			<view class="title-font"><strong>类型：</strong></view>
			<p v-show="show">{{ items[current].name }}</p>
			<view v-if="isShow">
				<radio-group @change="changeType"
				>
					<label class="radio" v-for="(item, index) in items"
						:key="item.value"
						>
						<radio :value="item.value" :checked="index === current"/>
<span :class='{RadioDistance:index==0}'>{{item.name}}</span>
					</label>
				</radio-group>
			</view>
			<u-button type="primary" @click="Modify()" class="modify" v-show="modifyShow">修改计划</u-button>
			<u-button type="primary" @click="confirmModification()" class="modify" v-show="determineShow">
				确定修改
			</u-button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			single: '',
			datetimesingle: '',
			datetimerange: [],
			modifyShow: true,
			determineShow: false,
			show: true,
			isShow: false,
			list: {},
			title: '',
			time: '',
			content: '',
			member_id: '',
			urloption: '',
			current: 0,
			items:[
			{
			    value: '0',
			    name: '子女任务'
			},{
			    value: '1',
			    name: '家长任务',
			    checked: 'true'
			},],
		}
	},
	onLoad(option) {
		this.urloption = option
	},
	mounted() {
		this.modifyPlan()
	},
	methods: {
		confirmModification() {
			if (
				this.title == this.list.plan_title &&
				this.time == this.list.remind_time &&
				this.content == this.list.content &&
				this.current == this.list.type 
			) {
				this.$u.toast('未修改原有内容')
				return
			}
			this.$axios({
				url: this.$url[73],
				data: {
					plan_title: this.title,
					remind_time: this.time,
					content: this.content,
					member_id: Number(this.urloption.member_id),
					id: Number(this.urloption.id),
					type:this.current
				}
			}).then(res => {
				if (res.code == 0) {
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack({})
					}, 510)
				}
			})
		},
		Modify() {
			this.show = false
			this.isShow = true
			this.modifyShow = false
			this.determineShow = true
		},
		modifyPlan() {
			this.$axios({
				url: this.$url[78],
				data: {
					id: Number(this.urloption.id),
					member_id: Number(this.urloption.member_id)
				}
			}).then(res => {
				if (res.code == 0) {
					this.list = res.data
					this.title = this.list.plan_title
					this.time = this.list.remind_time
					this.content = this.list.content
					this.current = this.list.type
					this.modifyShow = this.list.is_admin === 0 ? true:false
				}
			})
		},
		changeType(e) {
			this.current = e.detail.value
		}
	}
}
</script>
<style lang="scss" scoped>
.title-font1 {
	color: black;
	font-size: 30rpx;
}
uni-textarea {
	width: 610rpx;
}
.plan-content {
	width: 610rpx;
	margin-left: 70rpx;
	line-height: 100rpx;
	margin-top: 50rpx;
}
	.RadioDistance{
		margin-right: 20rpx;
	}
.title-font {
	font-size: 35rpx;
}
.title-time {
	height: 82rpx;
	line-height: 45rpx;
}
/deep/.u-btn--primary {
	border-color: #ff6638 !important;
	background-color: #ff6638 !important;
}
/deep/ .u-primary-hover {
	background-color: #ff6638 !important;
}
input {
	height: auto;
}
p {
	line-height: 80rpx;
	color: #b1b1b1;
}
.modify {
	width: 264rpx;
	height: 76rpx;
	background: #ff6638;
	box-shadow: 0rpx 3rpx 12rpx 1rpx rgba(255, 102, 56, 0.6);
	border-radius: 38rpx 38rpx 38rpx 38rpx;
	opacity: 1;
	margin-top: 200rpx;
}
</style>
