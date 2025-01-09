<template>
	<view class="fileBox">
		<nullData v-if="list.length<=0"></nullData>
		
		<!-- #ifdef MP-WEIXIN -->
		<view class="fileItem flex u-f-ac space-between" v-for="(item,index) in list" :key='index'>
					  <view class="fileType"  :style="index==1?'background: #E66B2E':''">W</view>
					  <view class="fileName flex-shrink">{{item.name}}</view>
					  <view class="button"  @click="download(item.file_url)">查看</view>
		</view>
		<!-- #endif -->
		
		
		
		<!-- #ifdef H5 -->
		<view v-for="(item,index) in list" :key='index'> 
		<a :href="common.imgUrl(item.file_url)"  class="table-btn"  target='_blank' >
			<view class="fileItem flex u-f-ac space-between" >
						  <view class="fileType"  :style="index==1?'background: #E66B2E':''">W</view>
						  <view class="fileName flex-shrink">{{item.name}}</view>
						  <view class="button" >查看</view>
			</view>
		</a>
		</view>
		<!-- #endif -->

		 <!-- #ifdef APP -->
		 <view v-for="(item,index) in list" :key='index'> 
		 <a :href="common.imgUrl(item.file_url)"  class="table-btn"  target='_blank' >
		 	<view class="fileItem flex u-f-ac space-between" >
		 				  <view class="fileType"  :style="index==1?'background: #E66B2E':''">W</view>
		 				  <view class="fileName flex-shrink">{{item.name}}</view>
		 				  <view class="button" >查看</view>
		 	</view>
		 </a>
		 </view>
		 <!-- #endif -->
	</view>
</template>

<script>
	export default {
		name:"fileItem",
		props:{
			list:{
				type:Array,
				default:function () {
                   return []
			    },
			}
		
		},
		data() {
			return {
				
			};
		},
		methods:{
			download(url){
				this.common.openFile(this.common.imgUrl(url))
			}
		}
	}
</script>

<style scoped>
    .fileBox{
		padding: 0 29rpx;
	}
	.fileItem{
		padding: 19rpx 35rpx;
		background: #FFFFFF;
		border: 1px solid #E9E9E9;
		border-radius: 20rpx;
		margin-top: 23rpx;
	}
	.fileType{
		width: 90rpx;
		height: 90rpx;
		background: #4392F2;
		border-radius: 2px;
		font-size: 51rpx;
		font-family: FZHei-B01S;
		color: #FFFFFF;
		text-align: center;
		line-height: 90rpx;
		margin-right: 19rpx;
	}
	.fileName{
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2D2D2D;
	}
	.button{
		width: 125rpx;
		height: 47rpx;
		background: #FF6638;
		border-radius: 9rpx;
		font-size: 21rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 47rpx;
		color: #FFFFFF;
		text-align: center;
		}

</style>
