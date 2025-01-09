<template>
	<view>
		 <view class="box">
			        <view class="whiteBox">
						    <view class="headBox"> <image class="headImg" :src="common.imgUrl(details.img)" mode=""></image>  </view>
							<view class="name"> {{details.name}}</view>
							<view class="details">
							        {{details.profile}}
							</view>
							
							<view class="title" style="margin-top: 101rpx;"> 教授科目 </view>
							<view>
								<view style="margin-top: 20rpx;" class="flex u-f-ac" v-for="(item,index) in details.sub" :key='index'> <view class="quan"></view>  <view class="typeText">{{item}}</view> </view>
							</view>
							<view class="title" style="margin-top:48rpx;"> 教育工作和背景 </view>
								<view style="margin-top: 20rpx;" class="flex u-f-ac" > <view class="quan"></view>  <view class="typeText">{{details.educational}}</view> </view>
								<view style="margin-top: 20rpx;" class="flex u-f-ac" > <view class="quan"></view>  <view class="typeText">{{details.work_experience}}</view> </view>
					</view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:0,
				details:{}
			}
		},
		onLoad(option) {
			this.uid=option.uid
			this.getDetails()
		},
		methods: {
			getDetails(){
				 this.$axios({
				   url: this.$url[46],
				   data: {
				     uid: this.uid,
				   },
				 }).then((res) => {
				   if (res.code == 0) {
				     this.details = res.data;
				   }
				 });
			}
		}
	}
</script>

<style>
	page{
		background: #F3F3F3;
	}
	
</style>

<style scoped>
    .box{
		padding: 28rpx;
	}
	.whiteBox{
		box-sizing: border-box;
		width: 100%;
		background-color: white;
		border-radius: 2px;
		padding: 0 28rpx 100rpx;
	}
	.headBox{
		width: 230rpx;
		height: 230rpx;
		border-radius: 50%;
		padding: 48rpx 0;
		margin: 0 auto;
	}
	.headImg{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.name{
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 500;
		color: #2D2D2D;
		opacity: 1;
		text-align: center;
	}
	.details{
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 36rpx;
		color: #666666;
		margin-top: 23rpx;
	}
	.title{
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: #2D2D2D;
		margin-bottom: 27rpx;
	}
	.quan{
		width: 17rpx;
		height: 17rpx;
		background: #FEA406;
		border-radius: 50%;
		margin-right: 12rpx;
	}
	.typeText{
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #666666;
	}
</style>
