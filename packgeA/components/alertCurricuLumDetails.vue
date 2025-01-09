<template>
	<view>
		<!-- 课节详情 -->
		<view class="flex" v-if="details">
			<image
				v-if="details.course"
				style="width: 271rpx;height:117rpx;margin-right: 21rpx;"
				:src="common.imgUrl(details.course.img)"
				mode="heightFix"
			></image>
			<view class="purchaseRight">
				<view class="purchaseBoxName">{{ details.course.name }}</view>
				<view class="purchasePrice flex u-f-ac">
					<view class="statusBox">{{ common.courseType(details.type) }}</view>
					<view>课节 {{ details.schedule_count }}/{{ details.positive_class + details.give_class }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		details: Object
	},
	data() {
		return {}
	}
}
</script>

<style scoped>
.purchaseBoxName {
	font-size: 28rpx;
	font-weight: bold;
	color: #333333;
}
.purchasePrice {
	font-size: 28rpx;
	font-weight: 500;
	color: #fea406;
	margin-top: 15rpx;
}
.statusBox {
	background: #ff6638;
	border-radius: 14rpx;
	font-size: 20rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 0.87);
	width: 98rpx;
	height: 26rpx;
	line-height: 26rpx;
	text-align: center;
	margin-right: 10rpx;
}
</style>
