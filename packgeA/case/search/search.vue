<template>
	<view>
		<!-- <uniStatusBar></uniStatusBar> -->
		<view class="top">
			<uni-nav-bar :fixed="false" :border="false" :statusBar="true" @click-left="back" left-icon="arrowleft">
				<view class="input-view">
					<input
						confirm-type="search"
						class="input"
						maxlength="10"
						type="text"
						placeholder="请输入您要搜索的动态"
						@confirm="confirm"
					/>
				</view>
				<block slot="right"><view class="iconfont icon-sousuo"></view></block>
			</uni-nav-bar>
		</view>
		<view class="search-history">
			<labeList
				:label="searchHistory"
				title="搜索历史"
				:remove="searchHistory.length > 0"
				@remove="rem"
				:type="id"
			></labeList>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
import uniNavBar from '@/packgeA/components/uni-nav-bar/uni-nav-bar.vue'
import labeList from '@/packgeA/components/label/label.vue'
export default {
	components: {
		uniNavBar,
		uniStatusBar,
		labeList
	},
	data() {
		return {
			searchHistory: [],
			popular: [],
			id: 0
		}
	},
	onLoad(option) {
		this.id = option.id
		this.initdata()
	},
	methods: {
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
				}
			})
		},
		back() {
			uni.navigateBack({
				delta: 1
			})
		},
		details(id) {
			uni.navigateTo({
				url: '/packgeA/case/caseDetails/caseDetails?id=' + id
			})
		},
		rem() {
			this.searchHistory = []
		},
		confirm(e) {
			if (e.target.value) {
				this.$axios({
					url: this.$url[56],
					data: {
						name: e.target.value,
						type: this.id
					}
				}).then(data => {
					if (data.code == 0) {
						uni.navigateTo({
							url: '/packgeA/case/search_list/search_list?search=' + e.target.value + '&type=' + this.id
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

.top {
	border-bottom: 1px solid #e6e6e6;
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
</style>
