<template>
	<view class="box">
		<view class="text">
			为了保证你的帐号安全,请验证身份。验证成功后进
			行下一步操作。
			<view class="phone">
				{{phone}}
			</view>
			
			<view class="buttonBox">
				<u-button  :custom-style='{height:"90rpx",background:"#FF6638"}' type="success" @click="sendCode()">发送验证码</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo(){
				this.$axios({
					url: this.$url[6],
				}).then((res) => {
					if (res.code == 0) {
						this.phone = res.data.phone
					}
				})
			},
			
			sendCode(){
				this.$axios({
					url: this.$url[2],
					data: {
						phone: this.phone
					}
				}).then((res) => {
					if (res.code == 0) {
						this.$u.toast('验证码已发送');
						uni.navigateTo({
							url:'/packgeA/messageCode/messageCode?phone='+this.phone
						})
					}
				})
		
			}
		}
	}
</script>

<style lang="scss" scoped>
    .box{
		padding: 0 61rpx;
	}
	.text{
		text-align: center;font-size: 26rpx;color: #BFBFBF;margin-top: 175rpx;line-height:2;padding: 0 6rpx;
		.phone{
			font-size: 42rpx;font-weight: 500;color: #262626;margin-top: 58rpx;
		}
		.buttonBox{
			margin-top: 60rpx;
		}
	}
</style>
