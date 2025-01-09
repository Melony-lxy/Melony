<template>
	<view>
		<view :style="{height:imgheight}" v-if="">
			<image class="imgs" :src="common.imgUrl('/static/skip/skip.png')" mode="heightFix" :style="{height:imgheight}" ></image>
			<!-- <u-swiper
			        :list="imgs"
					:autoplay="false"
					:circular="false"
					:style="{height:imgheight}"
					v-else
			></u-swiper> -->
			<view class="skip1" @click="skipClick()">
				跳过 {{second}}
			</view>
		</view>
		<view class="login-absolute" v-if="iffirst">
			<swiper class="swiper" :indicator-dots="true" indicator-active-color="#FF5E00">
				<swiper-item class="item">
					<image :src="common.imgUrl('/static/skip/skip2.png')" mode="widthFix" class="start"></image>
					<view class="skip" @tap="skip">跳过</view>
					<view>
						<view class="item-title">个性化学习计划</view>
						<view class="item-content">
							为你量身定制学习计划<br>让你的学习更加高效
						</view>
					</view>
				</swiper-item>
				<swiper-item class="item">
					<image :src="common.imgUrl('/static/skip/skip3.png')" mode="widthFix" class="start"></image>
					<view class="skip" @tap="skip">跳过</view>
					<view>
						<view class="item-title">专业教师团队</view>
						<view class="item-content">
							我们拥有一支专业的教师团队<br>能给出最合适的解决方案
						</view>
					</view>
				</swiper-item>
				<swiper-item class="item">
					<image :src="common.imgUrl('/static/skip/skip4.png')" mode="widthFix" class="start"></image>
					<view class="skip" @tap="skip">跳过</view>
					<view>
						<view class="item-title">丰富的学习资源</view>
						<view class="item-content">
							我们为你提供全面的学习资源<br>包括课程视频、课件资料、在线测试等
						</view>
						<view class="end" @tap="skip">开始体验</view>
					</view>
				</swiper-item>
				<!-- <swiper-item class="item">
					<image :src="common.imgUrl('/static/skip/skip5.png')" mode="widthFix" class="start"></image>
					<view>
						<view class="item-title">挑战自我</view>
						<view class="item-content">
							迈出自己那一步<br>走出平凡生活，多做一步 <br>才是迈出未来的一步
						</view>
						<view class="end" @tap="skip">开始体验</view>
					</view>
				</swiper-item> -->
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgheight: '',
				imgs:[],
				start:false,
				second:5,
				Interval:null,
				iffirst:false
			}
		},
		onReady() {
		},
		methods: {
			gonext(){
				let s=uni.getStorageSync('start');
				if(s===true){
						uni.switchTab({
							url: '/pages/index/index'
						})
				}else{
					this.iffirst=true
				}
			},
			skipClick() {
				clearInterval(this.Interval)
				this.Interval=null
				this.gonext()
			},
			skip() {
				uni.setStorageSync('start', true);
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
		},
		mounted() {
			uni.getSystemInfo({
				success: (resu) => {
					const query = uni.createSelectorQuery()
					this.imgheight = resu.windowHeight + 'px'
				},
				fail: (res) => {}
			})
			this.Interval=setInterval(()=>{
				if(this.second==0){
					clearInterval(this.Interval)
					this.Interval=null
					this.gonext()
					return
				}
				this.second--
			},1000)

		}
	}
</script>

<style scoped>
	.end {
		position: absolute;
		right: 50%;
		bottom: 100rpx;
		width: 300rpx;
		margin-right: -150rpx;
		height: 80rpx;
		text-align: center;
		color: #fff;
		font-size: 14px;
		background-color: #FF5E00;
		line-height: 80rpx;
		border-radius: 20px;
	}
	
	.swiper {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: white;
		backdrop-filter: blur(40upx);
	}
	
	.item {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	.item-title {
		font-weight: 700;
		color: black;
		line-height: 1.5;
		font-size: 18px;
		text-align: center;
	}
	
	.item-content {
		padding: 0 0px;
		line-height: 1.5;
		font-size: 14px;
		text-align: center;
		color: gray;
	}
	
	.item>image {
		margin-bottom: 0px;
		width: 200px;
		height: 200px !important;
	}
	
	.login-absolute {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
	}
	
	/deep/  uni-swiper {
	    display: block;
	    height: 100% !important;
	}
	/deep/  swiper {
	    display: block;
	    height: 100% !important;
	}
	/deep/ .u-swiper-wrap {
		height: 100% !important;
	}
	.imgs {
		width: 100% !important;
	}

	.skip {
		width: 100rpx;
		height: 52rpx;
		border: 1px solid #FF5E00;
		color:#FF5E00;
		position: absolute;
		top: 140rpx;
		right: 20px;
		border-radius: 30px;
		text-align: center;
		line-height: 52rpx;
	}
	.skip1 {
		width: 100rpx;
		height: 52rpx;
		border: 1px solid #fff;
		color: #fff;
		position: absolute;
		top: 50rpx;
		right: 20px;
		border-radius: 30px;
		text-align: center;
		line-height: 52rpx;
	}
</style>
