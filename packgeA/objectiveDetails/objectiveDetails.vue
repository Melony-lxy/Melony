<template>
  <view class="box">
    <view class="answerBox bgWhite">
      <view class="answerDetails">
        <view class="nameBox space-between u-f-ac">
          <view class="name">{{details.name}}</view>
        </view>

        <!-- 	<view class="space-between detailsTeacher">
					<view class="flex u-f-ac">
						<view class="roundLine">教师</view> 王老师
					</view>
					<view class="flex u-f-ac">
						<view class="roundLine">时间</view> 02-20 23:20 至 02-25 23:20
					</view>
				</view>	 -->
      </view>
      <view class="resultBox flex space-between u-f-ac">
		<view class="resultscore">总分：<text style="font-size: 44rpx;">{{totalScore}}</text></view>
        <view class="resultscore">得分：<text style="font-size: 44rpx;">{{scoreFraction}}</text></view>
      </view>
      <!-- 			<view class="texts">
				心理学原理测验的作业内容，心理学原理测验的作
				业内容，心理学原理测验的作业内容，心理学原理
				测验的作业内容，心理学原理测验的作业内容.
			</view> -->
    </view>

    <view class="answerBox bgWhite" style="margin-top: 20rpx;">
      <!-- 			<view class="subjectBox">
				<view>单选题 <text class="subjectNumber">共100分</text></view>
			</view> -->

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

 
        <!-- 是否回答正确 -->
        <view class="flex space-between u-f-ac answerResult">
          得分：{{item.score_fraction}}
        </view>
        <u-line class="u-line" v-if="item.analysis"></u-line>
        <!-- 回答解析 -->
        <view v-if="item.analysis">
          <view class="analysis">
            答案解析
          </view>
          <view class="analysisDetails analysis">
            {{item.analysis}}
          </view>
        </view>
		
		<u-line class="u-line"></u-line>
		<!-- 得分原因 -->
		<view v-if="item.review">
		  <view class="analysis">
		    得分原因
		  </view>
		  <view class="analysisDetails analysis">
		    {{item.review}}
		  </view>
		</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        id: 0,
        details: {},
		totalScore:0,
		scoreFraction:0,
      };
    },

    onLoad(option) {
      this.id = option.id;
      this.getDetails();
    },

    methods: {
      getDetails() {
        this.$axios({
            url: this.$url[36],
            data: {
              id: this.id,
            },
          })
          .then((res) => {
			res.data.list.forEach(item=>{
				this.totalScore+=item.fraction
				this.scoreFraction+=item.score_fraction
			})
            this.details = res.data;
          })
          .catch();
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

  .resultNumber {
    font-size: 22rpx;
    font-family: Source Han Sans SC;
    font-weight: 400;
    text-align: center;
    margin-right: 77rpx;
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