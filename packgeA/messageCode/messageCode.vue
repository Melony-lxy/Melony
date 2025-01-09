<template>
	<view>
		       <view class="text">
				   短信已发送至{{phone}}
			   </view>
			   
			   <view class="inputText"><u-message-input mode="bottomLine"   @finish="finish" width='100rpx'></u-message-input></view>
			   
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
		        code:'',
			}
		},
		onLoad(option) {
	 	   this.phone=option.phone
		},
		methods: {
		      finish(e){
				  this.code=e
				  this.$axios({
				  	url: this.$url[5],
				  	data: {
				  		phone: this.phone,
						code:e
				  	}
				  }).then((res) => {
				  	if (res.code == 0) {
						uni.navigateTo({
							url:'/packgeA/newPassword/newPassword?phone='+this.phone+'&code='+this.code
						})
				  	}
				  })
			  }
		}
	}
</script>

<style scoped>
.text{
	text-align: center;
	font-size: 26rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	color: #BFBFBF;
	margin-top: 175rpx;
}
.inputText{
	margin-top: 50rpx;
}
.codeText{
	font-size: 26rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;color: #BFBFBF;text-align: center;
	margin-top: 106rpx;
}
</style>
