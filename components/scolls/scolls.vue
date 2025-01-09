<template>
	<view style="margin-left:50rpx">
		<scroll-view
			scroll-x
			class="nav-tab-wrap"
			:throttle="false"
			@scroll="scrollEvent"
			scroll-with-animation
			:scroll-left="scrollLeft"
		>
			<view class="nav-tab">
				<block v-for="(item, index) in list" :key="index">
					<template v-if="item.name!=undefined">
						<view
							class="nav-tab-item"
							:style="index == list.length - 1 ? 'margin-right:0;' : ''"
							:class="{ active: currentIndex == index }"
							@tap="changeTab(index, item.id)"
						>
							{{ item.name }}
						</view>
					</template>
				</block>
				<view class="underline" :style="'left:' + left + 'px;width:' + width + 'px;'"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		list: Array,
		activeIndex: Number
	},
	data() {
		return {
			withs: false,
			currentIndex: 0, //当前选中的索引值
			left: 0, //滑动条左边距离
			width: 0, //滑动条宽度
			scrollX: 0, //滚动条的位置
			space: uni.upx2px(-60), //滑动条和item的左右间距
			scrollLeft: 0, //滚动条到左边的距离
			contentScroll: 0 //滚动条的宽度
		}
	},
	mounted() {
		let that = this
		if (!that.index) {
			that.changeTab(0)
		}
	},

	methods: {
		changeTab(num) {
			let that = this
			that.currentIndex = num
			this.scollChange(num)
			this.$emit('getIndex', num, that.list[num].id)
		},
		scollChange(num) {
			let that = this
			let selectorQuery = uni.createSelectorQuery().in(that)
			selectorQuery
				.selectAll('.nav-tab-item')
				.boundingClientRect(function(data) {
					// data 为当前选中tab的节点信息
					
					num == 0 ? (that.left = 0) : (that.left = data[num].left + that.scrollX + that.space-10)
					
					// #ifdef MP-WEIXIN
					num == 0 ? (that.left = 0) : (that.left = data[num].left + that.scrollX + that.space+5)
					// #endif
					that.width = data[num].width
				})
				.exec()
			// 获取滚动条的宽度
			selectorQuery
				.select('.nav-tab-wrap')
				.boundingClientRect(data => {
					this.contentScroll = data.width
				})
				.exec()
			this.scrollLeft = parseInt(this.left) - parseInt(this.contentScroll / 2) + parseInt(that.width / 2)
			setTimeout(res => {
				this.scrollLeft = parseInt(this.left) - parseInt(this.contentScroll / 2) + parseInt(that.width / 2) //再次刷新下横向滚动条。防止出现手机端不居中的情况
			}, 100)
		},
		changeIndex(index) {
			this.currentIndex = index
			return this.list[index].id
		},
		scrollEvent(e) {
			this.scrollX = e.detail.scrollLeft
		}
	}
}
</script>

<style lang="scss">
// .active{border-bottom: 1px solid #FF6100;}
scroll-view ::-webkit-scrollbar {
	width: 0;
	height: 0;
	background-color: transparent;
}
.nav-tab-wrap {
	max-width: 100%;
	white-space: nowrap;

	.nav-tab {
		position: relative;
		.nav-tab-item {
			margin-right: 60rpx;
			line-height: 80rpx;
			display: inline-block;
			color: #000;
			font-size: 28rpx;
			&.active {
				color: $project-color;
				font-weight: 700;
			}
		}
		.underline {
			position: absolute;
			height: 5rpx;
			background-color: $project-color;
			bottom: 0;
			transition: 0.3s;
		}
	}
}
</style>
