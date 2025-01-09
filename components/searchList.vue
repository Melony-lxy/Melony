<template>
	<view  style="flex: 1;">
		<view class="" style="position: relative;">
			<u-search placeholder="请输入您要搜索的内容" input-align='center' placeholder-color='#A7ABAE' color="#A7ABAE"
				:show-action='false' border-color='#EBEBEB' bg-color='#ffffff' v-model="keyword" :height='66' disabled >
			</u-search>
			<view class="" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;z-index: 99999;" @click="jumpSearch" :style="{width:q?'70%':'100%'}">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"searchList",
		data() {
			return {
				keyword:'',
			};
		},
		props: {
			q: {
				type: Boolean,
				default: false
			},
		},
		methods:{
			// 搜索页
			jumpSearch(){
				uni.navigateTo({
					url:'/pagesShop/classify/list?mode=search&value='
				})
			},
		}
	}
</script>

<style>

</style>
