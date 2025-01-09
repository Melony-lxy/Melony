<template>
	<view>
		<view :style="{paddingTop:paddingTop+'rpx'}" class="flex-center">
				<u-empty  :text="tip"  :mode="mode" ></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tip: { // 提示文字
			    type: String,
			    default() {
			        return "暂无";
			    },
			},
			paddingTop: { // 距离顶部距离 单位 rpx
			    type: [String, Number],
			    default() {
			        return 40;
			    },
			},
			mode: { // 距离顶部距离 单位 rpx
			    type: [String, Number],
			    default() {
			        return 'order';
			    },
			},
		},
		name:"nullData",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
