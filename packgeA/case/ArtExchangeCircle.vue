<template>
	<view>
		<view class="demo_warp">
			<view class="tab_tit">
				<li :class="n == 1 ? 'active' : ''" @click="n = 1"><strong>未加入</strong></li>
				<li :class="n == 2 ? 'active' : ''" @click="n = 2"><strong>已加入</strong></li>
			</view>
			<!-- neirong -->
			<view v-show="n == 1 && listData">
				<!-- <view class="tab_con">
					<view class="tab_Content" v-show="numn == '1'">
						<view class="tab_img"></view>
						<view class="tab_content">
							<p class="tab_content1">#1111</p>
							<p class="tab_content2">132人参与</p>
						</view>
						<view class="tab_content3" @click="onto">加入</view>
					</view>
				</view> -->
				<view v-for="(item, index) in listData" :key="index">
					<view class="tab_Content" @click="circleDetails(item.id)">
						<view class="tab_img"><img :src="common.imgUrl(item.fileList[0])" alt="" /></view>
						<view class="tab_content">
							<p class="tab_content1">#{{ item.title }}#</p>
							<p class="tab_content2">{{ item.total_number }}人参与</p>
						</view>
						<view class="tab_content3" @click="joinExchange(item.id)">加入</view>
					</view>
				</view>
			</view>

			<view v-show="n == 2 && listData">
				<!-- 				<view class="tab1_Content" @click="circleDetails()" v-show="numn == '2'">
					<view class="tab1_img"></view>
					<view class="tab1_content">
						<p class="tab1_content1">#111#</p>
						<p class="tab1_content2">111人参与</p>
					</view>
				</view> -->
				<view v-for="(item, index) in listData" :key="index">
					<view class="tab_Content" @click="circleDetails(item.id)">
						<view class="tab_img"><img :src="common.imgUrl(item.fileList[0])" alt="" /></view>
						<view class="tab_content">
							<p class="tab_content1">#{{ item.title }}#</p>
							<p class="tab_content2">{{ item.total_number }}人参与</p>
						</view>
						<!-- <view class="tab_content3" @click="joinExchange(item.id)">加入</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ArtExchangeCircle',
		components: {},
		data() {
			return {
				//响应式的数据 data变化页面也会跟着变化
				n: 0,
				page: 1, //第几页
				limit: 20, //每页5条
				listData: [],
				numn: 1,
				num: 0
			}
		},
		watch: {
			n(newValue, oldValue) {
				if(newValue==0){
					return
				}
				newValue--
				this.listData = []
				this.getExchangeList(newValue)
			}
		},
		onShow() {
			this.listData = []
			this.n=0
			this.$nextTick(()=>{
				this.n = 1
			})
			// this.$nextTick(()=>{
				// this.getExchangeList()
			// })
		},
		methods: {
			onto() {
				this.numn = 2
			},
			circleDetails(index) {
				uni.navigateTo({
					url: `/packgeA/case/circleDetails?id=` + index
				})
			},
			joinExchange(item) {
				this.$axios({
					url: this.$url[65],
					data: {
						id: item
					}
				}).then(res => {
					if (res.code == 0) {
						// this.totalCount = res.data.totalCount

						// if (this.page === 1) {
						// 	this.listData = res.data.data
						// } else {
						// 	this.listData = [...this.listData, ...res.data.data]
						// }
						uni.stopPullDownRefresh()
					}
					this.$toast('加入成功')
				})
			},
			getExchangeList(index) {
				if (index != undefined) {
					this.num = index
				}
				this.$axios({
					method: 'POST',
					url: '/communication/exchangeList',
					data: {
						query: {
							type: this.num
						},
						page: this.page,
						limit: this.limit
					}
				}).then(res => {
					if (res.code == 0) {
						this.totalCount = res.data.totalCount

						if (this.page === 1) {
							this.listData = res.data.data
						} else {
							this.listData = [...this.listData, ...res.data.data]
						}
						uni.stopPullDownRefresh()
					}
				})
			}
		}
	}
</script>

<style>
	.header {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
	}

	.active {
		color: $project-color;
		border-bottom: 6rpx $project-color solid;
	}

	.tab_tit {
		width: 100%;
		height: 50rpx;
		display: flex;
		justify-content: space-around;
	}

	.demo_warp .active {
		color: $project-color;
	}

	.demo_warp {
		width: 100%;
		height: 54rpx;
		margin-top: 8rpx;
		border-bottom: 1px solid #e8e8e8;
	}

	.demo_warp li {
		list-style: none;
		width: 140rpx;
		height: 52rpx;
		font-size: 28rpx;
		text-align: center;
		color: #999999;
	}

	.demo_warp .tab_con {
		text-align: center;
	}

	.tab_Content {
		width: 90%;
		height: 165rpx;
		margin-left: 5%;
		margin-top: 15rpx;
		overflow: hidden;
		border-bottom: 2rpx gainsboro solid;
	}

	.tab1_Content {
		width: 90%;
		height: 165rpx;
		margin-left: 5%;
		margin-top: 15rpx;
		overflow: hidden;
		border-bottom: 2rpx gainsboro solid;
	}

	.tab_img,
	.tab1_img {
		width: 110rpx;
		height: 110rpx;
		border-radius: 6rpx;
		margin-left: 20rpx;
		margin-top: 25rpx;
		float: left;
	}

	.tab_content,
	.tab1_content {
		float: left;
		text-align: left;
		line-height: 80rpx;
		margin-left: 20rpx;
	}

	.tab_img img {
		object-fit: cover;
		width: 100%;
		border-radius: 6rpx;
		height: 100%;
	}

	.tab1_img img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.tab_content1,
	.tab1_content1 {
		white-space: nowrap;
		width: 300rpx;
		font-weight: bold;
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tab_content2,
	.tab1_content2 {
		font-size: 22rpx;
		color: #999999;
	}

	.tab_content3,
	.tab1_content3 {
		width: 102rpx;
		height: 46rpx;
		font-size: 26rpx;
		background: $project-color;
		border-radius: 27px 27px 27px 27px;
		opacity: 1;
		line-height: 46rpx;
		text-align: center;
		margin-left: 20rpx;
		margin-top: 50rpx;
		float: right;
		margin-right: 50rpx;
		color: whitesmoke;
	}
</style>
