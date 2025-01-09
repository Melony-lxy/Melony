<template>
	<view>
		<image :src="common.imgUrl('/static/images/AIczgh.png')" mode="widthFix"></image>
		<!-- <view class="root-view">
			<view v-for="(item, index) in question" :key="index" v-show="index == idx" class="question">
				<view class="title">
					<view class="singleDouble">
						<span class="select" v-if="item.ismultiple">多选题</span>
						<span class="select" v-else>单选题</span>
					</view>
					<view class="singleDouble1">
						<span style="fontSize:35rpx">{{ idx + 1 }}</span>
						/{{ question.length }}题
					</view>
				</view>
				<view class="subject">{{ item.name }}</view>
				<view>
					<view
						:class="val.checked ? 'active' : ''"
						v-for="(val, index) in item.option"
						:key="val.id"
						class="list"
						@click="handleCilck(val, index)"
					>
						{{ val.letter }}.&nbsp;&nbsp;&nbsp;{{ val.name }}
						<view class="check-style-unequal-width" v-if="index == whichone"></view>
					</view>
				</view>
			</view>
			<view class="btn-box">
				<button
					@click="back()"
					:style="idx == 0 ? 'background-color:#ccc;' : ''"
					:disabled="idx == 0 ? true : false"
				>
					上一题
				</button>
				<button
					@click="next()"
					:style="idx == question.length - 1 ? 'background-color:#ccc;' : ''"
					:disabled="idx == question.length - 1 ? true : false"
				>
					下一题
				</button>
				<button @click="sumbit" style="background-color: rgb(250, 142, 0);color: aliceblue;">提交</button>
				<button
					v-show="isshow"
					@click="answerShow = true"
					style="background-color: rgb(238, 190, 79);color: rgb(255, 255, 255);"
				>
					查看答案
				</button>
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	name: 'choiceQuestion',
	components: {},
	data() {
		return {
			whichone: -1,
			idx: 0,
			allSocre: 0,
			isshow: false,
			answerShow: false,
			ismultipleAnswer: [],
			question: [
				{
					id: 1,
					ismultiple: false,
					name:
						'乾隆时江南地主“所居在城或他州异县，地亩山场皆委之佃户”。苏州甚至出现“土著安业者田不满百亩，余皆佃农也。上田半归于郡城之富户”。由此可知，当江南()',
					answer: '2012年11月8日',
					score: 2,
					option: [
						{ id: 1, name: '2012年11月8日', checked: false, letter: 'A' },
						{ id: 2, name: '2012年11月15日', checked: false, letter: 'B' },
						{ id: 3, name: '2012年12月18日', checked: false, letter: 'C' },
						{ id: 4, name: '2012年12月18日', checked: false, letter: 'D' }
					]
				},
				{
					id: 2,
					ismultiple: false,
					name: '你喜欢吃什么?',
					answer: 'C',
					score: 2,
					option: [
						{ id: 1, name: '香蕉', checked: false, letter: 'A' },
						{ id: 2, name: '苹果', checked: false, letter: 'B' },
						{ id: 3, name: '橘子', checked: false, letter: 'C' },
						{ id: 4, name: '凤梨', checked: false, letter: 'D' }
					]
				},
				{
					id: 3,
					ismultiple: false,
					name: '你的梦想是什么?',
					answer: 'B',
					score: 2,
					option: [
						{ id: 1, name: '当一名程序员', checked: false, letter: 'A' },
						{ id: 2, name: '当一名测试员', checked: false, letter: 'B' },
						{ id: 3, name: '当一名运维', checked: false, letter: 'C' },
						{ id: 4, name: '当一名设计师', checked: false, letter: 'D' }
					]
				},
				{
					id: 4,
					ismultiple: false,
					name: '你喜欢吃什么?',
					answer: 'C',
					score: 2,
					option: [
						{ id: 1, name: '香蕉', checked: false, letter: 'A' },
						{ id: 2, name: '苹果', checked: false, letter: 'B' },
						{ id: 3, name: '橘子', checked: false, letter: 'C' },
						{ id: 4, name: '凤梨', checked: false, letter: 'D' }
					]
				},
				{
					id: 5,
					ismultiple: false,
					name: '你的梦想是什么?',
					answer: 'B',
					score: 2,
					option: [
						{ id: 1, name: '当一名程序员', checked: false, letter: 'A' },
						{ id: 2, name: '当一名测试员', checked: false, letter: 'B' },
						{ id: 3, name: '当一名运维', checked: false, letter: 'C' },
						{ id: 4, name: '当一名设计师', checked: false, letter: 'D' }
					]
				}
			]
		}
	},
	methods: {
		next() {
			this.idx++
			this.whichone = -1
		},
		back() {
			this.idx--
			this.whichone = -1
		},

		handleCilck(info, a) {
			if (a == this.whichone) {
				this.whichone = -1
			} else {
				this.whichone = a
			}

			let question = this.question[this.idx]
			let option = this.question[this.idx].option
			option.forEach(item => {
				if (item.id == info.id) {
					item.checked = !item.checked
				} else if (!question.ismultiple) {
					item.checked = false
				}
			})
			let isAnswer = info.letter
			let answer = this.question[this.idx].answer
			if (question.ismultiple) {
				this.ismultipleAnswer = []
				option.forEach(item => {
					if (item.checked) {
						this.ismultipleAnswer.push(item.letter)
					}
				})
				isAnswer = this.ismultipleAnswer.join('')
			}
			if (isAnswer == answer) {
				this.question[this.idx].isOk = true
			} else {
				this.question[this.idx].isOk = false
			}
		},
		sumbit() {
			this.allSocre = 0
			let result = []
			this.question.forEach(item => {
				let selsetArr = item.option.map(val => {
					if (val.checked) {
						return val.checked
					}
				})
				console.log('selsetArr', selsetArr)
				const isTrue = selsetArr.includes(true)
				if (isTrue) {
					result.push(isTrue)
				}
				if (item.isOk) {
					this.allSocre += item.score
				}
			})
			if (result.length < this.question.length) {
				this.$u.toast('还有题目没做呢')
				return
			}
			uni.navigateTo({
				url: '/packgeB/timetable/growthPlan'
			})
		}
	}
}
</script>
<style lang="less" scoped>
// div.cur {
// 	background-color: red;
// }
// .question {
// 	border-radius: 10rpx;
// 	color: #515152;
// 	font-size: 30rpx;
// 	padding: 10rpx 20rpx;
// 	margin: 50rpx 10rpx 0;
// }
// .subject {
// 	margin-top: 20rpx;
// 	font-size: 32rpx;
// 	font-weight: bold;
// 	color: #3a3f45;
// 	line-height: 55rpx;
// }
// .singleDouble {
// 	width: 100rpx;
// 	height: 50rpx;
// 	background: #f5f5f5;
// 	border-radius: 6px 6px 6px 6px;
// 	opacity: 1;
// 	border: 1px solid #e6f0f1;
// 	float: left;
// 	line-height: 50rpx;
// 	text-align: center;
// 	font-size: 26rpx;
// 	color: #7e8f96;
// }
// .singleDouble1 {
// 	float: right;
// 	line-height: 50rpx;
// 	text-align: center;
// 	font-size: 30rpx;
// 	color: #666666;
// }
// .btn-box {
// 	width: 90%;
// 	height: 90rrpx;
// 	margin-left: 5%;
// }

// button {
// 	height: 90rpx;
// 	line-height: 90rpx;
// 	margin-top: 50rpx;
// 	outline: none;
// 	background: #ff6638;
// 	color: white;
// 	border-radius: 5rpx;
// }

// button:active {
// 	background-color: rgba(248, 161, 121, 0.664);
// }

// .title {
// 	height: 60rpx;
// }

// .list {
// 	height: 90rpx;
// 	line-height: 90rpx;
// 	margin-top: 40rpx;
// 	padding: 10rpx 40rpx;
// 	border: 1rpx #eee solid;
// 	border-radius: 10rpx;
// 	font-size: 35rpx;
// 	font-weight: bold;
// 	color: #3a3f45;
// }
// .active {
// 	background: rgba(255, 102, 56, 0.1);
// 	border-radius: 12rpx 12rpx 12rpx 12rpx;
// 	border: 2rpx solid #ff6638;
// }
// .check-style-unequal-width {
// 	width: 16rpx;
// 	height: 32rpx;
// 	border-color: #009933;
// 	border-style: solid;
// 	border-width: 0 6rpx 7rpx 0;
// 	transform: rotate(45deg);
// 	float: right;
// 	margin-top: 20rpx;
// }
image {
	width: 100%;
	display: block;
	// height: 100%;
}
</style>
