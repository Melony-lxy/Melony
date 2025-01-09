<template>
	<view>
		<view class="tabsBox">
			<u-tabs :list="tablist" :is-scroll="false" :current="current" @change="change" active-color="#FF6638">
			</u-tabs>
		</view>
		<view class="listBox">
			<nullData v-if="tablist[current].list.length <= 0" style="margin-top:50%;"></nullData>
			<curriculumItem :dataList="tablist[current].list"></curriculumItem>
		</view>
	</view>
</template>

<script>
	import curriculumItem from "../curriculumItem.vue";
	export default {
		components: {
			curriculumItem
		},
		data() {
			return {
				tablist: [{
						name: '全部课程',
						page: 1,
						list: [],
						type: -1,
						totalCount: 0
					},
					{
						name: '1v1课程',
						page: 1,
						list: [],
						type: 0,
						totalCount: 0
					},
					{
						name: '班课',
						page: 1,
						list: [],
						type: [1, 2],
						totalCount: 0
					},
					{
						name: '视频课',
						page: 1,
						list: [],
						type: 3,
						totalCount: 0
					}
				],
				current: 0,
				limit: 8
			}
		},
		onLoad() {
			this.getCourse()
		},
		onReachBottom() {
			const pageNum = Math.ceil(this.tablist[this.current].totalCount / this.limit)
			if (this.tablist[this.current].page < pageNum) {
				this.tablist[this.current].page++
				this.getCourse(true)
			}
		},
		onPullDownRefresh() {
			this.tablist[this.current].page = 1
			this.tablist[this.current].list = []
			this.getCourse(true)
		},
		methods: {
			change(index) {
				this.current = index
				this.tablist[this.current].page = 1
				this.tablist[this.current].list = []
				this.getCourse()
			},
			// 获取课程列表
			getCourse(ispush = false) {
				this.$axios({
					url: this.$url[11],
					data: {
						page: this.tablist[this.current].page,
						limit: this.limit,
						query: {
							type: this.tablist[this.current].type,
							is_teaching: true
						}
					}
				}).then(res => {
					if (res.code == 0) {
						this.tablist[this.current].totalCount = res.data.totalCount
						res.data.data.forEach(item => {
							if (item.payment_status == 2) {
								item.is_teaching = 3
							} else {
								if (item.is_teaching != 0) {
									if (item.class_count >= item.positive_class + item.give_class) {
										item.is_teaching = 2
									} else {
										item.is_teaching = 1
									}
								}
							}
						})
						this.tablist[this.current].list = this.tablist[this.current].list.concat(res.data.data)
						uni.stopPullDownRefresh()
						// if(this.page===1){
						//    this.listData=res.data.data
						// }else{
						//  this.listData=[...this.listData,...res.data.data]
						// }
					}
				})
			}
		}
	}
</script>

<style scoped>
	.listBox {
		padding: 0 24rpx;
	}
</style>
