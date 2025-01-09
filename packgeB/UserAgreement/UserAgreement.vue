<template>
	<view>
		<view class="UserAgreement" v-html="common.content(text)" v-if="show">	
		</view>
		<view class="UserAgreement1" v-else>
			<view class="" @click="more({name:'千芒商汇俱乐部第三方信息共享清单'})">
				《千芒商汇俱乐部第三方信息共享清单》
			</view>
			<view class=""  @click="more({name:'儿童隐私保护声明'})">
				《儿童隐私保护声明》
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:'',
				show:true
			};
		},
		onLoad(option) {
			this.more(option)
		},
		methods: {
			more(option) {
				uni.setNavigationBarTitle({
					title:option.name,
				})
				if(option.name != '关于千芒商汇俱乐部'){
					this.$axios({
						url: this.$url[98],
						data: {
							name:option.name
						}
					}).then(res => {
						if (res.code == 0) {
							this.text=res.data.content
							this.show=true
						}
					})
				}else{
					this.show=false
				}
			}
		},
		onShow() {

		}
	}
</script>

<style lang="scss">
.UserAgreement{
	width: 90%;
	margin: 0 auto;
	padding: 20rpx 0;
	line-height: 1.7 !important;
}
.UserAgreement1{
	width: 90%;
	margin: 0 auto;
	padding: 20rpx 0;
	color: $project-color;
	view{
		line-height: 100rpx;
	}
}
</style>
