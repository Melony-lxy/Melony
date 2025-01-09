<template>
	<view>
		<view class="search">
			<u-search
				class="search-u"
				placeholder="请输入您要搜索的内容"
				input-align="center"
				:show-action="false"
				v-model="keyword"
				:height="66"
				:focus="firstFocus"
			></u-search>
			<view class="search-button" @click="onSearch()">搜索</view>
		</view>
		<!-- 选项 -->
		<view class="tabsBox">
			<u-tabs
				:list="tablist"
				:is-scroll="false"
				:current="current"
				@change="change"
				active-color="#FF6638"
			></u-tabs>
		</view>
		<!-- 列表 -->

		<nullData v-if="searchList.length <= 0" :paddingTop="150"></nullData>

		<view class="search-item">
			<view class="search-list" v-for="(item, index) in searchList" :key="index" @click="courseDetails(item.id)">
				<view class="search-img"><image :src="common.imgUrl(item.img)" mode="aspectFill"></image></view>
				<view class="search-r">
					<view class="search-title">{{ item.name }}</view>
					<view class="search-teacher" v-html="common.content(item.introduce)"></view>
					<view class="price">
						<!-- <view class="activityPrice" v-if="item.is_gratis == 0">活动价</view> -->
						<view class="price" v-if="item.is_gratis == 0">
							￥{{ (item.price * item.positive_class) / 100 }}
						</view>
						<view class="price " v-else-if="item.is_gratis == 1">免费</view>
						<view class="originalPrice marginLeft" v-if="item.market_price">
							原价￥{{ item.market_price / 100 }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			firstFocus: true,
			current: 0,
			keyword: '',
			tablist: [
				{
					name: '全部'
				},
				{
					name: '1v1课程'
				},
				{
					name: '班课'
				},
				{
					name: '试听课'
				}
			],
			searchList: [],
			page: 1,
			limit: 8
		}
	},

	mounted() {
		this.getCourseList()
	},

	onload() {
		this.getCourseList()
	},

	methods: {
		change(index) {
			this.searchList = []
			this.current = index
			console.log(this.current)
			this.getCourseList()
		},

		onSearch() {
			this.searchList = []
			this.getCourseList()
		},

		getCourseList() {
			this.$axios({
				url: this.$url[9],
				data: {
					query: {
						search: this.keyword,
						type: this.current - 1
					},
					page: this.page,
					limit: this.limit
				}
			}).then(res => {
				if (res.code == 0) {
					this.searchList = this.searchList.concat(res.data.data)
				}
			})
		},

		//下拉加载更多
		onReachBottom() {
			const pageNum = Math.ceil(this.totalCount / this.limit)
			if (this.page < pageNum) {
				this.page++
				this.getCourseList()
			}
		},
		courseDetails(id) {
					let code = uni.getStorageSync('ThousandAwn_share_code'
					)
					let pageId = uni.getStorageSync('ThousandAwn_share'
					)
					if (pageId == id) {
						uni.navigateTo({
							url: `/packgeA/curriculumDetails/curriculumDetails?id=${id}&code=${code}`
						})
					
					} else {
						uni.navigateTo({
							url: '/packgeA/curriculumDetails/curriculumDetails?id=' + id
						})
					}
		}
	}
}
</script>

<style scoped>
.originalPrice {
	font-size: 24rpx;
	color: #858688;
	font-weight: 400;
}
/* 列表 */
/* 	page{background-color: #F9FAFB;} */
.search-list {
	display: flex;
	align-items: center;
	padding: 30rpx;
	position: relative;
}

.search-list::after {
	content: '';
	width: 100%;
	height: 1px;
	background: #f5f5f5;
	position: absolute;
	transform: scaleY(0.5);
	bottom: 0;
}

.search-img {
	width: 300rpx;
	height: 200rpx;
	margin-right: 20rpx;
}

.search-img > image {
	width: 100%;
	height: 100%;
	border-radius: 8rpx;
}

.search-r {
	width: 50%;
}

.search-title {
	color: #262626;
	font-size: 30rpx;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	font-weight: bold;
}

.search-teacher {
	color: #858688;
	font-size: 24rpx;
	margin: 11rpx 0;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.price {
	display: flex;
	color: #ff6638;
	font-size: 32rpx;
	align-items: flex-end;
	font-weight: bold;
}

.search-price {
	font-size: 32rpx;
}

.search {
	background: #fff;
	padding: 21rpx 32rpx;
	display: flex;
	justify-content: space-between;
}

.search-u {
	width: 79%;
}

.search-button {
	margin-left: 20rpx;
	color: #fff;
	font-size: 28rpx;
	background: #ff6638;
	border-radius: 50rpx;
	padding: 9rpx 32rpx;
	display: inline-block;
	text-align: center;
	height: 55rpx;
	line-height: 55rpx;
}

/* 选项 */
.tabsBox {
	position: relative;
}

.tabsBox::after {
	content: '';
	width: 100%;
	height: 1px;
	background-color: #f6f6f6;
	transform: scaleY(0.5);
	position: absolute;
}

.marginLeft {
	margin-left: 20rpx;
	text-decoration: line-through;
}
</style>
