<template>
	<view class="box">
		<view class="answerBox bgWhite">
			<view class="answerDetails">
				<view class="nameBox space-between u-f-ac">
					<template v-if="details">
						<view class="name" v-if="details.test">{{details.test.name}}</view>
					</template>
					<view class="status">答题中</view>
				</view>
				<!-- 				<view class="space-between detailsTeacher">
					<view class="flex u-f-ac">
						<view class="roundLine">教师</view> 王老师
					</view>
					<view class="flex u-f-ac">
						<view class="roundLine">时间</view> 02-20 23:20 至 02-25 23:20
					</view>
				</view> -->
			</view>
			<!-- 	<view class="texts">
				心理学原理测验的作业内容，心理学原理测验的作
				业内容，心理学原理测验的作业内容，心理学原理
				测验的作业内容，心理学原理测验的作业内容.
			</view> -->
		</view>

		<view class="answerBox bgWhite" style="margin-top: 20rpx;">
			<view class="subjectBox">
				<template v-if="details">
					<view v-if="details.topic">单选题 <text class="subjectNumber">共{{details.topic.length}}题,共{{details.test.fraction}}分</text>
					</view>
				</template>
			</view>
			<template v-if="details.topic">
				<view class="subjectItem" v-for="(item,indexs) in details.topic" :key="indexs">
					<!-- //题目名称 -->
					<view class="flex  subjectNameBox">
						<view class="flex-center" style="flex-direction: column;">
							<view class="serial">{{indexs+1}}</view>
							<view class="fraction">{{item.fraction}}分</view>
						</view>
						<view class="subjectName flex-shrink">
							<view style="font-weight: bold;">{{item.name}}</view>
							<view v-html="common.content(item.content)" v-if="item.content"></view>
						</view>
					</view>
					<u-line class="u-line"></u-line>
					<!-- 题目选项 -->
					<view class="optionBox">
						<view class="optionItem" v-for="(items,answerIndex)  in  item.answer_list" :key='answerIndex' @click="choosequestion(answerIndex,item)">
							{{list[answerIndex]}}: {{items}}
						</view>
					</view>
					<u-line class="u-line"></u-line>
					<view class="readioBox" v-if="showbutton">
						<u-radio-group v-model="answerlist[item.id]" class="space-between" :width='151' :icon-size='30'>
							<u-radio v-for="(optionItem, optionIndex) in list" :key="optionIndex" :name="optionIndex+1"
								v-if="item.answer_list.length>optionIndex">
								{{optionItem}}
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</template>

		</view>

		<view>
			<u-button @click="submitPaper()" shape="circle" :custom-style='{height:"70rpx",marginTop:"108rpx"}'
				type="success">我要交卷
			</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				id: 0,
				dayId: 0,
				details: {},
				answerlist: {}, //答案列表
				list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
				showbutton:true
			}
		},
		onLoad(option) {
			this.id = option.id
			this.dayId = option.dayId
			this.getDetails()
		},
		methods: {
			choosequestion(i,item){
				this.showbutton=false
				this.answerlist[item.id]=i+1
				this.$nextTick(function(){
					this.showbutton=true
				})
			},
			getDetails() {
				this.$axios({
					url: this.$url[30],
					data: {
						dayId: this.dayId,
						test_id: this.id,
					}
				}).then((res) => {
					if (res.code == 0) {
						this.details = res.data
						res.data.topic.forEach(item => {
							this.answerlist[item.id] = 1
						})
					}
				})
			},

			// 交卷
			submitPaper() {
				for (let i in this.answerlist) {
					if (this.answerlist[i] != '') {
						this.answerlist[i] = this.answerlist[i] - 1
					}
				}
				this.$axios({
					url: this.$url[34],
					data: {
						dayId: this.dayId,
						test_id: this.id,
						answer: this.answerlist,
					}
				}).then((res) => {
					if (res.code == 0) {
						this.$u.toast('交卷成功');
						uni.navigateTo({
							url: '/packgeA/answerResult/answerResult?dayId=' + this.dayId + '&id=' + this.id
						})
					}
				})
			},
		}
	}
</script>
<style>
	page {
		background: #F9FAFB;
	}
</style>
<style scoped>
	@import './../../common/css/answer.css';
</style>