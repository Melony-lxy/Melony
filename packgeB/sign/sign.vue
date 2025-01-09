<template>
	<view class="signCenter" v-if="info.length != 0">
		<view class="signTop">
			<view class="">
				报名：{{ info.length }}人
			</view>
			<view class="">
				签到：{{ info | applicationList }}人
			</view>
		</view>
		<template v-if="info.length != 0">
			<view class="signBox" v-for="(item,index) in info" :key="index">
				<image :src="common.imgUrl(item.user.avatar)" mode="aspectFill"></image>
				<view class="">
					<view class="nick">
						{{ item.user.nick }}
					</view>
					<view class="ctime">
						报名时间：{{ item.ctime }}
					</view>
					<view class="inTime">
						签到时间：{{ item.sign_in_time ?  item.sign_in_time : '未签到'}}
					</view>
				</view>
			</view>
		</template>
		<view class="" v-else style="height:85vh;">
			<u-empty mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:[]
			};
		},
		onLoad(opt) {
			this.id = opt.id
			this.getInfo()
		},
		methods: {
			getInfo() {
				this.$axios({
					url: this.$url[120],
					data: {
						id: this.id
					}
				}).then(res => {
					if (res.code == 0) {
						this.info = res.data.applicationList
						console.log(res.data.applicationList);
					}
				})
			}
		},
		filters: {
			applicationList: function(value) {
				let num = 0
				value.forEach((item)=>{
					if(item.sign_in_time){
						num++
					}
				})
				return num;
			}
		}
	}
</script>

<style lang="scss">
.signCenter{
	line-height: 1;
	.signTop{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		background-color: #f9f9f9;
		view{
			width: 50%;
			box-sizing: border-box;
			padding-left: 30rpx;
			font-size: 28rpx;
		}
	}
	.signBox{
		display: flex;
		box-sizing: border-box;
		margin: 0 auto;
		background: #FFF;
		padding: 20rpx 30rpx;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #0000001a;
		image{
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
		}
		>view{
			width: 540rpx;
		}
		.nick{
			font-weight: bold;
			font-size: 30rpx;
		}
		.ctime{
			font-size: 26rpx;
			color: #6b6b6b;
			padding: 10rpx 0;
		}
		.inTime{
			font-size: 26rpx;
			color: #6b6b6b;
		}
	}
}
</style>
