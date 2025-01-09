<template>
	<view>
		<view class="" @click="share()">
			<u-icon name="more-dot-fill" color="#fff" size="50" />
		</view>
		<u-popup v-model="operation" mode="bottom" borderRadius="20">
			<view class="share">
<!-- 				<view class="share-title" @click="edit()">
					<u-icon name="edit-pen-fill" style="margin-right: 10rpx;" />
					编辑
				</view> -->
				<view class="share-title" @click="shieldings()">
					<u-icon name="trash" style="margin-right: 10rpx;" />
					删除
				</view>
				<view class="cancel" @click="cancel">
					取消
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:'casePopup',
		props: {
			id: Number,
		},
		data() {
			return {
				operation: false
			}
		},
		methods: {
			shieldings() {
				this.$emit('isDelete', this.id)
			},
			share() {
				this.operation = !this.operation
			},
			edit() {
				uni.navigateTo({
					url: '/pages/tanning/tanning'
				})
				
				// this.cancel()
			},
			cancel() {
				this.operation = false
			}
		}
	}
</script>

<style scoped>
	.cancel {
		padding: 34rpx 0;
		text-align: center;
		color: #999999;
		font-size: 30rpx;
		position: relative;
	}

	.cancel::after {
		position: absolute;
		top: 0;
		width: 100%;
		height: 2rpx;
		background: #F7F7F7;
		content: "";
		transform: scaleY(0.5);
	}

	.share-title {
		padding: 40rpx 0 20rpx;
		text-align: center;
		color: #333333;
		font-size: 30rpx;
		font-weight: 400;
	}
</style>
