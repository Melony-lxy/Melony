<template>
	<view class="classrepresentative">
		<view class="topimg">
			<image :src="common.imgUrl('/static/kdb.jpg')" mode="widthFix"></image>
		</view>
		<view class="button" @click="gonext()" :style="{background:detail[status].color}">
			<view>
				{{detail[status].button}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: [{
						button: '审核中',
						color: 'gray'
					},
					{
						button: '已通过',
						color: 'gray'
					},
					{
						button: '申请成为课代表',
						color: '#FF6638'
					},
					{
						button: '申请成为课代表',
						color: '#FF6638'
					},
				],
				status: 0
			};
		},
		methods: {
			gonext() {
				if(this.status==1 || this.status==0){
					return
				}
				uni.navigateTo({
					url: '/packgeB/applyclassrepresentative/applyclassrepresentative'
				})
			}
		},
		onShow() {
			this.$axios({
				url: this.$url[90],
			}).then((res) => {
				if (res.code == 0) {
					this.status = res.data.status
					if (this.status == 2) {
						uni.showModal({
							content: '申请课代表被拒绝，是否继续申请',
							confirmText:'是',
							cancelText:'否',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/packgeB/applyclassrepresentative/applyclassrepresentative'
									})
								}
							}
						})
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}

			})
		}
	}
</script>

<style lang="scss">
	.classrepresentative {
		.topimg {
			display: flex;
			justify-content: center;

			image {
				width: 95%;
				display: block;
			}

			padding-bottom:100rpx;
		}

		.button {
			border-radius: 10rpx 10rpx 0 0;
			width: 100vw;
			display: flex;
			justify-content: center;
			position: fixed;
			bottom: 0;
			color: #ffffff;
			font-size: 32rpx;
			line-height: 100rpx;
		}
	}
</style>
