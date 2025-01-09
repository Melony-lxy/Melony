<template>
	<view class="addvlog">
		<view class="dynamic2" @tap="open" style="z-index:100"><image :src="common.imgUrl('/static/dynamic/add.png')" mode="" v-show="showOpen"></image></view>
		<u-popup v-model="popup" mode="center" :mask-custom-style="maskStyle" :bgColor="'transparent'" @close='closePop'>
				<view class="release" v-for="(item, index) in released" :key="index" @tap="jump(item.path)" :class="item.class">
					<image class="" :src="common.imgUrl(item.icon)" />
					<view class="releaseText">{{ item.text }}</view>
				</view>
				<view class="close" @tap="close()"><image class="close_img" :src="common.imgUrl('/static/dynamic/add.png')" /></view>
		</u-popup>
	</view>
</template>

<script>
	import {verifyLogin} from '@/plugin/api/index.js'
	export default{
		name:'addvlog',
		props:{
			circleId:String,
			topicId:String
		},
		data(){
			return {
				popup:false,
				maskStyle: {
					background: 'rgba(0, 0, 0, 0.4)'
				},
				showOpen:true,
				released: [
					{
						class:'dynamic',
						text: '动态',
						icon: '/static/dynamic/icon2.png',
						path: '/packgeA/case/tanning/tanning?type=0' //页面路
					},
					{
						class:'video',
						text: '短视频',
						icon: '/static/dynamic/icon3.png',
						path: '/packgeA/case/tanning/tanning?type=2' //页面路
					},
					{
						class:'article',
						text: '文章',
						icon: '/static/dynamic/icon1.png',
						path: '/packgeA/case/tanning/tanning?type=1' //页面路
					}
				],
				urlAddress:'',
				isLogin:false
			}
		},
		mounted() {
			verifyLogin().then(res => {
				if (res.code == 0) {
					this.isLogin = true
				}else{
					this.isLogin = false
				}
			})
		},
		methods:{
			getPopHeight(){
				// let whichDom=document.getElementsByClassName('uni-scroll-view-content')
				// let domLength=whichDom.length-1
				if(this.circleId==undefined&&this.topicId==undefined){
					this.urlAddress=''
				}else if(this.circleId!=undefined&&this.topicId==undefined){
					this.urlAddress='&circleId='+this.circleId
				}else if(this.circleId==undefined&&this.topicId!=undefined){
					this.urlAddress='&topicId='+this.topicId
				}
				// whichDom[domLength].setAttribute('style','height:auto !important')
			},
			// 打开+号
			open() {
				if(this.isLogin){
					this.popup = true
					this.showOpen=false
					this.$nextTick(function(){
						this.getPopHeight()
					})
				}else{
					uni.showToast({
						icon: "none",
						title: '请登录',
						position: "bottom",
					});
					setTimeout((res) => {
						uni.reLaunch({
							url: "/packgeA/login/login",
						});
					}, 1000);
				}
			},
			// 关闭加号
			close() {
				this.popup = false
				this.showOpen=true
			},
			closePop(){
				this.showOpen=true
			},
			// 加号跳转
			jump(url) {
				let address=url+this.urlAddress
				console.log('address',address)
				uni.navigateTo({
					url: address
				})
				setTimeout(res => {
					this.popup = false
				}, 0)
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .uni-scroll-view-content{
		width: 750rpx;
		height: 100vh !important;
	}
	.dynamic2 {
		width: 92rpx;
		height: 92rpx;
		position: fixed;
		right: 30rpx;
		bottom: 180rpx;
		border-radius: 50%;
		background-color: #FFF;
		image {
			width: 100%;
			height: 100%;
		}
		&:hover {
			transform: rotate(180deg);
		}
	}

		.release{
			display: flex;
			align-items: center;
			position: fixed;
			image {
				width: 92rpx;
				height: 92rpx;
			}
			
		}
		.article {
			bottom:300rpx;
			right:75rpx;
			>view{
				width:2rem;
			}
		}
		.video {
			bottom:184rpx;
			right:145rpx;
			>view{
				width:3rem;
			}
		}
		.dynamic{
			bottom:84rpx;
			right:75rpx;
			>view{
				width:2rem;
			}
		}
	.close{

		position: fixed;
		right: 30rpx;
		bottom: 180rpx;
		border-radius: 50%;

		.close_img{
			width: 92rpx;
			height: 92rpx;
			-webkit-transform: rotate(135deg);
			// animation: rotation;

		}

	}
	.release {
		display: flex;
		align-items: center;
		position: fixed;
		color: #ffffff;
		font-weight: bold;
		image {
			width: 92rpx;
			height: 92rpx;
			border-radius: 50%;
			margin-right: 10rpx;
		}
	}
</style>
