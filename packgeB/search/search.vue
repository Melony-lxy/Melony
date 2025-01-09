<template>
	<view>
		<!-- <uniStatusBar></uniStatusBar> -->
		<view class="top">
			<view class="input-view">
				<input
					confirm-type="search"
					class="input"
					maxlength="10"
					type="text"
					placeholder="请输入您要搜索的课程"
					@confirm="confirm"
					v-model="inputValue"
				/>
			</view>
		</view>
		<img class="search-img" :src="common.imgUrl('/static/images/search.png')" @tap="confirm()">
		<!-- <button class="search-button" @click="confirm()">搜索</button> -->
		<!-- #ifdef H5 -->

		<!-- #endif -->
		<view class="search-history">
<!-- 			<label
				:label="searchHistory"
				title="搜索历史"
				:remove="searchHistory.length > 0"
				@remove="rem"
				:type="id"
			></label> -->
			<view>
				<view class="space-between">
					<view class="label-title">
						搜索历史
					</view>
					<view class="delete" v-if="remove" @tap="rem">清空</view>
				</view>
				<view class="label-type flex">
					<block v-for="(item,index) in searchHistory" :key="index">
						<view class="label" :class="{active:item.active}" @tap="labelChange(index)">{{item.title}}</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
import uniNavBar from '@/packgeA/components/uni-nav-bar/uni-nav-bar.vue'
export default {
	components: {
		uniNavBar,
		uniStatusBar,
	},
	data() {
		return {
			remove:false,
			inputValue:'',
			searchHistory: [],
			popular: [],
			id: '0'
		}
	},
	onLoad(option) {
		// this.id = option.id
	},
	onShow() {
		this.initdata()
	},
	methods: {
		rem() {
			if (this.remove) {
				this.$axios({
					url: this.$url[57]
				}).then((data) => {
					if (data.code == 0) {
						this.searchHistory=[]
						this.remove=false
					}
				})
			}
		},
		labelChange(index) {
			this.$axios({
				url: this.$url[56],
				data: {
					name: this.searchHistory[index].title,
					type: this.id
				}
			}).then((data) => {
				if (data.code == 0) {
					uni.navigateTo({
						url: '/packgeA/case/search_list/search_list?search=' + this.searchHistory[index]
							.title +
							'&type=' + this.id
					});
				}
			})
		},
		initdata() {
			this.$axios({
				url: this.$url[55],
				data: {
					type: this.id
				}
			}).then(data => {
				if (data.code == 0) {
					const res = data.data
					this.searchHistory = res.searchHistory.map(item => {
						return {
							title: item,
							active: false
						}
					})
					this.popular = res.popular.map(item => {
						return {
							title: item,
							active: false
						}
					})
					this.remove=this.searchHistory.length > 0
				}
			})
		},
		confirm() {
			if (this.inputValue) {
				this.$axios({
					url: this.$url[56],
					data: {
						name: this.inputValue,
						type: this.id
					}
				}).then(data => {
					if (data.code == 0) {
						uni.navigateTo({
							url: '/packgeA/case/search_list/search_list?search=' + this.inputValue + '&type=' + this.id
						})
					}
				})
			}
		}
	}
}
</script>

<style scoped>
.uni-navbar__header-btns {
	width: 40px !important;
	margin-left: 10px;
}
.input {
	height: 70rpx;
	line-height: 70rpx;
	margin-left: 20rpx;
}
.top {
	width: 94%;
	height: 70rpx;
	line-height: 70rpx;
	margin-left: 3%;
	border-radius: 40rpx;
	border: 1px solid #e6e6e6;
}

.search-history {
	padding: 0 30upx;
	margin-top: 10px;
}

.popular {
	padding: 0 30upx;
	margin-top: 10px;
}

.type-list {
	padding: 0 30upx;
	margin-top: 20px;
	border-top: 1px solid #e6e6e6;
}

.space-between {
	margin-top: 10px;
}

.title {
	font-size: 18px;
	color: #333;
}

.title > text {
	color: #fbe76a;
	font-size: 16px;
	margin-right: 3px;
	vertical-align: text-bottom;
}

.more {
	font-size: 16px;
	color: #666;
}

.type-warp {
	background: #f5f5f5;
	padding: 8px 0;
	border-radius: 5px;
}

.type-warp > image {
	width: 210upx;
	height: 205upx;
	margin: 0 10upx;
}
.search-button{
	
	height: 100rpx;
	font-size: 12rpx;
}
.search-img{
	position: absolute;
	top: -3rpx;
	right: 4%;
	width: 80rpx;
	height: 80rpx;
	z-index: 99999;
}
	.label-title {
		color: #666;
		font-size: 16px;
	}

	.label-type {
		flex-wrap: wrap;
		margin-top: 5px;
	}

	.label {
		margin: 0 5px;
		border: 1px solid #e6e6e6;
		padding: 2px 10px;
		border-radius: 30px;
		margin-top: 5px;
		font-size: 14px;
	}

	.delete {
		color: #e76a6a;
		font-size: 14px;
	}

	.active {
		border: 1px solid #fbe76a;
		color: #fbe76a;
	}
</style>
