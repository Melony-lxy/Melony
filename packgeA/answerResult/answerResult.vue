<template>
  <view class="box">
    <view class="answerBox bgWhite">
      <view class="answerDetails">
        <view class="nameBox space-between u-f-ac">
          <view class="name">{{details.name}}</view>
        </view>

        <!-- 			<view class="space-between detailsTeacher">
					<view class="flex u-f-ac">
						<view class="roundLine">教师</view> 王老师
					</view>
					<view class="flex u-f-ac">
						<view class="roundLine">时间</view> 02-20 23:20 至 02-25 23:20
					</view>
				</view> -->
      </view>
      <view class="resultBox flex u-f-ac">
        <view class="resultNumber red">
          <view class="numBer">{{answer}}</view>
          <view>答对</view>
        </view>
        <view class="resultNumber young">
          <view class="numBer">{{answerIncorrectly}}</view>
          <view>答错</view>
        </view>
        <view class="resultNumber grey">
          <view class="numBer">{{Unanswered}}</view>
          <view>未答</view>
        </view>
        <view class="resultscore">得分：<text style="font-size: 44rpx;">{{totalScore}}</text></view>
      </view>
      <!-- 			<view class="texts">
				心理学原理测验的作业内容，心理学原理测验的作
				业内容，心理学原理测验的作业内容，心理学原理
				测验的作业内容，心理学原理测验的作业内容.
			</view> -->
    </view>

    <view class="answerBox bgWhite" style="margin-top: 20rpx;">
      <view class="subjectBox">
        <view>单选题 <text class="subjectNumber" v-if="details.list">共{{details.list.length}}题,共{{numBer}}分</text></view>
      </view>

      <view class="subjectItem" v-for="(item,indexs) in details.list" :key="indexs">
        <!-- //题目名称 -->
        <view class="flex space-between subjectNameBox">
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
        <view class="optionBox" style="padding-left: 0;">
          <view class="optionItem" v-for="(items,optionIndex) in item.answer_list" :key="optionIndex"
            :class="{'correct':item.answer==optionIndex,'error':item.answer!=item.submit_answer&&item.submit_answer==optionIndex}">
            {{list[optionIndex]}}: {{items}}</view>
        </view>
		
        <u-line class="u-line"></u-line>
        <!-- 是否回答正确 -->
        <view class="flex space-between u-f-ac answerResult">
          <view>正确答案：{{list[item.answer]}}</view>
          <view v-if="item.answer!=item.submit_answer">错误答案：{{list[item.submit_answer]}}</view>
          <view v-if="item.answer==item.submit_answer" class="correctBox statueBox">回答正确</view>
          <view v-else class="errorBox statueBox">回答错误</view>
        </view>
		
        <u-line class="u-line"></u-line>
        <!-- 回答解析 -->
        <view v-if="item.analysis">
          <view class="analysis">
            答案解析
          </view>
          <view class="analysisDetails analysis">
            {{item.analysis}}
          </view>
        </view>
      </view>
    </view>

    <view class="again" @click="again()">
      重新检测
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        id: 0,
        dayId: 0,
        details: {},
        list: ["A", "B", "C", "D", "E"],
        answer: 0,
        answerIncorrectly: 0,
        Unanswered: 0,
        totalScore: 0,
        numBer: 0,
      };
    },
    onLoad(option) {
	  console.log(option)
      this.id = option.id;
      this.dayId = option.dayId;
      this.getAnswer();
    },
    methods: {
      getAnswer() {
        this.$axios({
          url: this.$url[36],
          data: {
            dayId: this.dayId,
            test_id: this.id,
          },
        }).then((res) => {
          if (res.code == 0) {
            this.details = res.data;
            res.data.list.forEach((item) => {
              this.numBer += item.fraction;
              if (item.answer != item.submit_answer) {
                this.answerIncorrectly++;
              } else {
                this.answer++;
                this.totalScore += item.fraction;
              }
              if (item.submit_answer == -1) {
                Unanswered++;
              }
            });
          }
        });
      },
      again() {
        uni.navigateTo({
          url: "/packgeA/testAnswer/testAnswer?dayId=" + this.dayId + "&id=" + this.id,
        });
      },
    },
  };
</script>
<style>
  page {
    background: #f9fafb;
  }
</style>
<style scoped>
  @import "./../../common/css/answer.css";

  .optionItem {
    padding: 5rpx 0 5rpx 77rpx;
  }

  .correct {
    background-color: #f2fffb;
  }

  .error {
    background-color: #fff2f2;
  }

  .resultNumber {
    font-size: 22rpx;
    font-family: Source Han Sans SC;
    font-weight: 400;
    text-align: center;
    margin-right: 77rpx;
  }

  .red {
    color: #ff3534;
  }

  .young {
    color: #75c9a8;
  }

  .grey {
    color: #cbcbcb;
  }

  .resultBox {
    padding: 28rpx 24rpx;
    border-bottom: 1px solid #f2f2f2;
  }

  .numBer {
    margin-bottom: 10rpx;
  }

  .resultscore {
    font-size: 22rpx;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #fea406;
    opacity: 1;
  }

  .statueBox {
    width: 160rpx;
    height: 50rpx;
    border-radius: 10rpx;
    font-size: 26rpx;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 50rpx;
    text-align: center;
  }

  .correctBox {
    border: 1px solid #FF6638;
    color: #FF6638;
  }

  .errorBox {
    border: 1px solid #f98686;
    color: #f98686;
  }

  .answerResult {
    padding: 21rpx 0;
    font-size: 26rpx;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #666666;
  }

  .analysis {
    font-size: 26rpx;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #666666;
    padding: 18rpx 0;
  }

  .analysisDetails {
    color: #a9a9a9;
    padding: 0;
  }

  .again {
    width: 205rpx;
    height: 66rpx;
    background: #FF6638;
    border-radius: 33rpx;
    font-size: 28rpx;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 66rpx;
    color: #ffffff;
    text-align: center;
    margin: 63rpx auto;
  }
</style>