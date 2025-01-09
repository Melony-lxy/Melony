<template>
	<view>
		<view class="student">
			<view class="student-img">
				<img :src="common.imgUrl(list.img)">
			</view>
			<view class="student-time" v-if="list.is_effective===0 && list.status=='0'">
				<view class="times"> 距 离 开 始 仅 剩 </view>
				<view class="time">
					<u-count-down :timestamp="timestamp1" color="#ff3b00" separator-color="#000000" separator="zh"
						:show-seconds="false"></u-count-down>
				</view>
			</view>
			<view class="student-time" v-if="list.is_effective===0 && list.status=='1'">
				<view class="times"> 距 离 结 束 仅 剩 </view>
				<view class="time">
					<u-count-down :timestamp="timestamp" color="#ff3b00" separator-color="#000000" separator="zh"
						:show-seconds="false"></u-count-down>
				</view>
			</view>
			<view class="student-content">
				<view class="title" :style="{borderColor:list.border_color,}"> {{list.name}} </view>
				<view class="content" :style="{borderColor:list.border_color,}">
					<view class="content-title" v-if="list.border_type==1"  :style="{borderColor:list.border_color,background:list.border_color,}"> 活动介绍 </view>
					<view class="content-title q" :style="{borderColor:list.border_color,}" v-else> 活动介绍 </view>
					<view class="introduce" v-for="(item, index) in list.content" :key="index" >
						<rich-text v-if="item.type===0" :nodes="item.data"></rich-text>
						<image :src="common.imgUrl(item.data)" mode="" v-else></image>
					</view>
					
				</view>
			</view>
			<!-- <view class="music">
				<img :src="common.imgUrl('/static/music.png')" alt="">
			</view> -->
			<view class="contact" style="top: 108rpx;" @click="consulting"> 联 系 <br> 机 构 </view>
			<view class="contact" style="top: 228rpx;" @click="share"> 分 享 <br> 好 友 </view>
			<!-- <view class="contact" @click="go()" style="top: 358rpx;"> 再 报 <br> 一 个 </view> -->
			<view class="contact" @click="go()" style="top: 348rpx;line-height: 90rpx;" v-if="list.status=='1' && type!=1"> 报 名 </view>
			<!-- <view class="application"> 已报名 ( 查看报名学员 ) </view> -->
			<view class="application" @click="go()" v-if="list.status=='1' && type!=1"> 报名 </view>
		</view>
		<!-- 咨询弹框 -->
		<u-modal v-model="show" width="682rpx" title='机构联系方式' :border-radius='20' :show-confirm-button='false'
			:title-style="{color: '#2D2D2D',fontSize:'32rpx',fontWeight:'bold'}" mask-close-able >
			<!-- <view class="textCenter">
				<image :src="common.imgUrl('/static/more3.png')" mode="widthFix"></image>
			</view> -->
			<view class="phoneText">联系电话 : {{list.phone}}</view>
			<view style="padding:30rpx 42rpx 30rpx 42rpx;">
				<view @click="()=>{show=false}"
					style="background: #ff3b00;height:84rpx;line-height: 84rpx;color:white;text-align: center;border-radius: 20px;"
					type="success">确定 </view>
			</view>
		</u-modal>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				timestamp: 0,
				timestamp1: 0,
				list: {},
				id:'',
				type:'',
				show:false,
			};
		},
		onLoad(option) {
			this.id=option.id
			if(option.type){
				this.type=option.type
			}
			this.$axios({
				url: this.$url[107],
				data: {
					id:option.id,
					type:option.type
				}
			}).then(res => {
				console.log(res);
				this.list = res.data
				this.list.content.map(res=>{
					if(res.type==1){
						return
					}
					return res.data=res.data.replace(/[\n\r]/g,'<br>')
				})
				let time1 = `${res.data.effective_start_time} 24:00:00`
				let now1 = new Date()
				this.timestamp1 = Math.round(parseInt(new Date(time1) - now1) / 1000)
				let time = `${res.data.effective_end_time} 24:00:00`
				let now = new Date()
				this.timestamp = Math.round(parseInt(new Date(time) - now) / 1000)
				if(this.list.status=='0'){
				   uni.showModal({
				   	    title: '提示',
				   		content: '活动未开始',
				   })
				} else if(this.list.status=='2') {
					uni.showModal({
						    title: '提示',
							content: '活动已结束',
					})
					this.timestamp=0
				} else if(this.list.status=='3') {
					uni.showModal({
						    title: '提示',
							content: '活动已下架',
					})
					this.timestamp=0
				}

			})
		},
		methods: {
			consulting() {
				this.show = true;
			},
			go() {
				uni.navigateTo({
					url:  `/packgeA/application/application?id=${this.id}&type=${this.type} `
				})
			},
			share(){
				let that = this
				// #ifdef H5
				uni.setClipboardData({
					data: that.$base_url+'/h5'+that.$route.fullPath,
					success: function () {
						console.log('success');
					}
				});
				// #endif
			}
		}
	}
</script>
<style lang="scss" scoped>
	.phoneText{
		width: 100%;
		line-height: 200rpx;
		text-align: center;
		margin: 0 auto;
	}
	/deep/.u-countdown {
		width: 100% !important;
		display: contents !important;
	}

	/deep/.u-countdown-item {
		width: 50rpx !important;
		height: 50rpx !important;
		margin-top: 5rpx !important;
	}

	/deep/.u-countdown-colon {
		display: block !important;
		line-height: 65rpx !important;
	}

	.student {
		width: 100%;
		position: relative;

		img {
			width: 60rpx;
			height: 60rpx;
			margin-top: 20rpx;
			margin-left: 20rpx;
		}

		.student-img {
			width: 100%;
			height: 450rpx;

			img {
				width: 100%;
				height: 100%;
				margin-top: 0rpx !important;
				margin-left: 0rpx !important;
				object-fit: cover !important;
			}
		}

		.student-time {
			width: 100%;
			height: 152rpx;
			background: #E6E6E6 ;

			.times {
				text-align: center;
				height: 76rpx;
				width: 100%;
				line-height: 76rpx;
				color: black;
			}

			.time {
				text-align: center;
				height: 76rpx;
				width: 50%;
				margin: 0 auto;
				line-height: 50rpx;
				color: black;
				display: flex;
				justify-content: space-between;

				view {
					width: 50rpx;
					height: 50rpx;
					margin-top: 0rpx;
					background-color: white;
				}
			}
		}

		.student-content {
			width: 100%;
			height: auto;
			background: #F5F5F5 ;
			overflow: hidden;
			.title {
				width: 90%;
				color: #000000 ;
				margin: 0 auto;
				margin-top: 50rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				background: white;
				border-radius: 20rpx;
				font-size: 36rpx;
				font-weight: bold;
				border: 4rpx solid #CCCCCC;
			}

			.content {
				width: 90%;
				height: auto;
				margin: 0 auto;
				margin-top: 80rpx;
				position: relative;
				// background: rgb(255, 102, 56);
				background: white;
				border: 4rpx solid white;
				border-radius: 20rpx;
				margin-bottom: 150rpx;
                padding-bottom: 50rpx;
				.q{
					background: white !important;
					color: #000 !important;
				}
				.content-title {
					width: 30%;
					height: 60rpx;
					text-align: center;
					font-size: 32rpx;
					font-weight: bold;
					line-height: 60rpx;
					position: absolute;
					top: -30rpx;
					left: 35%;
					color: white;
					// background: white;
					// background: rgb(255, 102, 56);
					border: 4rpx solid white;
					border-radius: 20rpx;
					z-index: 99;
				}
				.introduce{
					width: 94%;
					margin-left: 3%;
					
					font-size: 32rpx;
					line-height: 1.8;
					margin-top: 50rpx;
					image{
						width: 100% !important;
					}
				}
			}
		}

		.music {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			background-color: gray;
			position: fixed;
			top: 108rpx;
			right: 20rpx;
		}

		.contact {
			width: 110rpx;
			text-align: center;
			height: 100rpx;
			border-radius: 100rpx;
			background-color:  rgba(255, 102, 56,0.8);
			position: fixed;
			top: 228rpx;
			right: 20rpx;
			padding-top: 10rpx;
			line-height: 45rpx;
			color: white;
			font-size: 28rpx;
		}

		.application {
			width: 100%;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			position: fixed;
			bottom: 0rpx;
			background-color: rgb(255, 102, 56);
			color: white;
		}
	}
</style>
