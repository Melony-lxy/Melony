<template>
	<view>
		<view class="footer flex">
			<view class="footerItem" v-for="(item,index) in tab" :key="index" @click="link(item,index)">
				<view class="">
					<u-icon :name="item.icon" class="icon" size="44" :color="current==index?'#FF623E':'#989898'">
					</u-icon>
				</view>
				<view :class="[current==index?'active':'']">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			current: { // 提示文字
				type: String,
				default () {
					return "0";
				},
			},
		},
		name: "signTab",
		data() {
			return {
				tab: [{
					name: '打卡',
					icon: 'calendar',
					url: '/packgeA/sign/sign'
				}, {
					name: '统计',
					icon: 'clock',
					url: '/packgeA/sign/statistics'
				}, {
					name: '课表',
					icon: 'order',
					url: '/pages/timetable/timetable'
				}]
			};
		},
		methods: {
			link(item, index) {
				if (this.current == index) {
					return
				}
				if (item.url.indexOf("timetable") != -1) {
					uni.switchTab({
						url: item.url
					})
				} else {
					uni.navigateTo({
						url: item.url
					})
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.footer {
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #FFFFFF;

		.footerItem {
			width: 33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #989898;
			font-size: 22rpx;

			.icon {
				margin-bottom: 6rpx;
			}
		}

		.active {
			color: #FF623E;
		}
	}
</style>
