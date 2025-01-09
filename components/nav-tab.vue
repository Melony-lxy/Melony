<template>
	<view>
		<view class="example-body" id="example-body" style="padding-top: var(--status-bar-height);">
			<view class="nav-bar">
				<view class="nav-flex">
					<view class="nav-first" v-for="(item, index) in navTab" :key="index" @tap="tabEvent(index)">
						<view :class="{ success: index == activeIndex }" class="nav-one">{{ item.name }}</view>
					</view>
				</view>
				<view class="line" :style="'width:' + width + 'px;left:' + left + 'px;'" />
			</view>
			<!-- 搜索栏 -->
			<!-- <template>
				<view class="search-wrap flex" v-if="searchs&&activeIndex!==0">
					<view class="flex-center search" @tap="search" style="transition: .3s;">
						<image class="search-img" :src="common.imgUrl('/static/case/search.png')" mode=""></image>
						<view class="search-title">请输入您要搜索的内容</view>
					</view>
				</view>
			</template> -->
		</view>
	</view>
</template>

<script>
export default {
	props: {
		navTab: {
			type: Array
		},
		activeIndex: {
			type: Number
		},
		searchs: {
			type: Boolean,
			default: true
		},
		videoType: {
			type: Number
		}
	},
	data() {
		return {
			width: 0,
			block: true,
			left: 0,
			changeIndex: 0
		}
	},
	mounted() {
		console.log('333=>', this.navTab)
		this.tabEvent(this.activeIndex)
		this.getBodyHeight()
	},
	watch: {
		activeIndex: function(newVal) {
			var that = this
			that.tabEvent(newVal)
		}
	},
	methods: {
		// f
		getBodyHeight() {
			var query = uni.createSelectorQuery().in(this)

			query.select('#example-body').boundingClientRect(res => {
				console.log(res)
				this.$emit('getNavTab', res.height)
			})
		},
		tabEvent(index) {
			if (!this.block) return
			let query = uni.createSelectorQuery().in(this)
			query
				.selectAll('.nav-one')
				.boundingClientRect(res => {
					this.width = res[index].width
					this.left = res[index].left
				})
				.exec()
			this.$emit('tabEvent', index)
			this.block = false
			setTimeout(res => {
				this.block = true
			}, 500)
		},
		search() {
			this.$emit('search')
		}
	}
}
</script>

<style lang="scss" scoped>
/* 	.nav-first{flex: 1;text-align: center;} */
.success {
	color: $project-color !important;
}

.nav-one {
	text-align: center;
	color: #333;
	font-weight: 700;
	font-size: 32upx;
	z-index: 2;
	display: inline-block;
}

.nav-flex {
	display: flex;
	padding: 23upx 90upx;
	justify-content: space-around;
}

.map {
	display: flex;
	align-items: center;
	height: 60upx;
}

.map-img {
	width: 23.81upx;
	height: 30.1upx;
	margin: 0 13upx 0 19upx;
}

.map-title {
	color: $project-color;
	font-size: 28rpx;
	font-weight: 700;
}

.search-search {
	color: rgba(150, 151, 153, 1);
	font-size: 20upx;
	line-height: 1;
}

.search-img {
	width: 22.98upx;
	height: 22.98upx;
	margin-right: 21upx;
}

.uni-navbar__placeholder-view {
	height: 44px;
}

.line {
	height: 8upx;
	background: $project-color;
	box-shadow: 0 3upx 10upx $project-color;
	position: absolute;
	bottom: 0upx;
	z-index: 1;
	opacity: 0.7;
	transition: 0.3s;
	border-radius: 8upx;
}
.example-body{
		width: 100%;
		position: fixed;
		top: 0%;
		background-color: white;
		z-index: 999;
	}
.nav-bar {
	position: relative;
	/* 	background: #fff; */
	z-index: 2;
	width: 100%;
}

.nav-tab {
	position: sticky;
	top: 0rpx;
	background: #fff;
	z-index: 999;
}

.search-wrap {
	height: 40px;
	padding: 15upx 15px;
	align-items: center;
	background-color: rgba(0, 0, 0, 0) !important;
}

.search {
	width: 690upx;
	height: 60upx;
	background: #f5f5f5;
	border-radius: 20px;
	margin: 10upx auto;
	flex: 1;
	line-height: 2;
	font-size: 26upx;
	/* 	padding: 15upx 0; */
}

.search > view:nth-child(2) {
	font-size: 26upx;
	margin-left: 5px;
	color: #999;
}
</style>
