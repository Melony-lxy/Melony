<template>
	<view>
		<scroll-view scroll-x="true" show-scrollbar="true">
			<view class="scroolTd">
				<view class="image-box" v-for="(item,idx) in dataList" :key="idx" @click="commodityDetails(item.id)">
					<image class="image" :src="common.imgUrl(item.img)" mode="aspectFill" @error='error(idx)'></image>
					<view>{{ item.name }}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'videoTd',
	props: {
		dataList: {
			type: Array,
			required: true
		}
	},
	methods: {
		error(i){
			this.dataList[i].img = '/static/images/noneImg.png'
		},
		commodityDetails(id) {
			let code=uni.getStorageSync('ThousandAwn_share_code')
			let pageId=uni.getStorageSync('ThousandAwn_share')
			if(pageId==id){
				uni.navigateTo({
					url: `/packgeA/curriculumDetails/curriculumDetails?id=${id}&code=${code}`
				})

			}else{
				uni.navigateTo({
					url: '/packgeA/curriculumDetails/curriculumDetails?id=' + id
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
/deep/ ::-webkit-scrollbar {
	//滚动条整体样式
	display: none;
	width: 10px !important;
	height: 10px !important;
	-webkit-appearance: auto !important;
	background: red;
	overflow: auto !important;
}
/deep/ ::-webkit-scrollbar-thumb {
	//滚动条里面小方块
	border-radius: 10px !important;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
	background-color: #535353 !important;
}
/deep/ ::-webkit-scrollbar-track {
	//滚动条
	border-radius: 10px !important;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
	background-color: #ededed !important;
}
.scroolTd {
	display: flex;
	margin-top: 26rpx;
	> view {
		width: 290rpx;
		margin-right: 32rpx;
		padding-bottom: 30rpx;
		view {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 30rpx;
			font-weight: 400;
			color: #262626;
			margin-top: 16rpx;
			font-weight: bold;
		}
		image {
			width: 300rpx;
			height: 194rpx;
			background: #ffffff;
			border-radius: 6px 6px 6px 6px;
			opacity: 1;
		}
	}
}
</style>
