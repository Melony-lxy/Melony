<template>
	<view>
		<view class="screenBox space-between u-f-ac">
			<view
				class="screenItem flex u-f-ac"
				v-for="(item, index) in screenList"
				:key="index"
				@click="selectShow(index)"
			>
				<view class="leftMargin">{{ item.text }}</view>
				<img :src="common.imgUrl('/static/images/round.png')" alt="" />
				<!-- <u-icon name="arrow-down-fill" color="#CACACA " size="22"></u-icon> -->
			</view>

			<view class="flex u-f-ac searchbgc" @click="navTo('/packgeB/search/search')">
				<view><u-icon color="#FF6638" size="30rpx" name="search"></u-icon></view>
				<view style="font-size: 26rpx;color:#FF6638;margin-left: 20rpx;">搜索</view>
			</view>
		</view>

		<commodityItem :dataList="dataList"></commodityItem>

		<!-- 综合排序 -->
		<u-select v-model="screenList[0].show" mode="single-column" :list="courseList" @confirm="confirm"></u-select>
		<!-- 选择课程 -->
		<u-select
			v-model="screenList[1].show"
			mode="single-column"
			:list="classDayList"
			@confirm="curricuConfirm"
		></u-select>
		<!-- 选择讲师 -->
		<u-select
			v-model="screenList[2].show"
			mode="single-column"
			:list="classTeacherList"
			@confirm="typeConfirm"
		></u-select>

		<!-- 分割线 -->
		<!-- <view class="divider">
			<u-divider border-color="#ccc" color="#989898" half-width="250">店铺信息</u-divider>
			<image class="logoimg" :src="common.imgUrl('/static/samll-logo.png')"></image>
			<view class="tip" style="font-size: 11px;color: #989898;">邻米网络提供技术支持</view>
		  </view> -->
	</view>
</template>

<script>
import commodityItem from '../../components/commodityItem.vue'
export default {
	components: {
		commodityItem
	},
	data() {
		return {
			page: 1,
			limit: 10,
			totalCount: 0, //总数
			dataList: [],
			courseList: [
				{ value: 2, label: '综合排序' },
				{ value: 1, label: '价格升序' },
				{ value: 0, label: '价格降序' }
			],
			classDayList: [{ value: 0, label: '全部类型' }], //课程筛选数据
			classTeacherList: [
				{ value: -1, label: '全部' },
				{ value: 0, label: '1对1' },
				{ value: 1, label: '班课' },
				{ value: 2, label: '试听课' },
				{ value: 3, label: '视频课' }
			],
			screenList: [
				{ text: '综合排序', show: false },
				{ text: '全部类型', show: false },
				{ text: '全部方式', show: false }
			],
			query: {
				subject_id: 0,
				type: -1
			}
		}
	},
	onLoad(option) {
		console.log(option)
		if (option.id) {
			this.query.subject_id = option.id
		}
		if (option.curricuName) {
			this.screenList[1].text = option.curricuName
		}
		if (option.type) {
			this.query.type = option.type
			this.screenList[2].text = this.classTeacherList[parseInt(option.type) + 1].label
		}
		this.getNavlist()
		this.getJsonList()
	},
	onPullDownRefresh() {
		this.page = 1
		this.getJsonList()
	},
	onReachBottom() {
		const pageNum = this.totalCount / this.limit
		if (this.page <= pageNum) {
			this.page++
			this.getJsonList()
		}
	},
	methods: {
		confirm(e) {
			if (e[0].value == 2) {
				this.screenList[0].text = e[0].label
				this.page = 1
				delete this.query.price_sort
				console.log(this.query)
				// this.getJsonList()
			} else {
				this.screenList[0].text = e[0].label
				this.page = 1
				let text = { price_sort: e[0].value }
				let a = this.query
				this.query = { ...a, ...text }
				this.getJsonList()
			}
		},
		selectShow(index) {
			this.screenList[index].show = true
		},
		//获取课程类型
		getNavlist() {
			this.$axios({
				url: this.$url[45]
			}).then(res => {
				if (res.code == 0) {
					res.data.forEach(item => {
						this.classDayList.push({ value: item.id, label: item.name })
					})
				}
			})
		},

		navTo(url) {
			uni.navigateTo({
				url: url
			})
		},

		//获取课程列表
		getJsonList(type) {
			this.$axios({
				url: this.$url[9],
				data: {
					limit: this.limit,
					page: this.page,
					query: this.query
				}
			}).then(res => {
				if (res.code == 0) {
					this.totalCount = res.data.totalCount
					if (this.page === 1) {
						this.dataList = res.data.data
					} else {
						this.dataList = [...this.dataList, ...res.data.data]
					}
					uni.stopPullDownRefresh()
				}
			})
		},

		curricuConfirm(e) {
			this.page = 1
			this.screenList[1].text = e[0].label
			this.query.subject_id = e[0].value
			this.getJsonList()
		},
		typeConfirm(e) {
			this.page = 1
			this.screenList[2].text = e[0].label
			this.query.type = e[0].value
			this.getJsonList()
		}
	}
}
</script>

<style>
page {
	background-color: F9FAFB;
}
</style>

<style scoped>
.screenBox {
	padding: 10rpx 30rpx;
}
.screenBox img {
	width: 20rpx;
	height: 20rpx;
	margin-top: 6rpx;
}
.screenItem {
	padding: 25rpx 0;
	font-size: 26rpx;
	font-family: Source Han Sans SC;
	font-weight: 400;
	color: #2d2d2d;
}
.leftMargin {
	width: 118rpx;
	margin-right: 10rpx;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	text-align: center;
}
.searchbgc {
	width: 160rpx;
	height: 58rpx;
	padding-left: 30rpx;
	border-radius: 80rpx;
	font-weight: 500;
	background-color: #fff4ee;
}
/* .divider{
	padding-top:40rpx;
	text-align: center;
	padding-bottom:40rpx;
}
.logoimg{
	width:200rpx;
	height:50rpx;
	margin:40rpx 0;
}
.tip{
	margin-top:-25rpx;
	margin-left:10rpx;
} */
</style>
