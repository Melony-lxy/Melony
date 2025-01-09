<template>
	<view class="member">
		<view class="member-list" v-for="(item,index) of list">
			<view class="list-name">{{item.head}}</view>
			<view class="member-info" v-for="(items,indexs) in item.list">
				<view class="info-img">
					<image :src=" items.avatar_url == '' ? '../../static/tx.png' : common.imgUrl(items.avatar_url)"
						mode="widthFix"></image>
				</view>
				<view class="info-right">
					<view> {{items.nick}} </view>
					<!-- <view> 祁阳程度有限公司 </view> -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id: 0,
				info: '',
				page: 1,
				type_id: [],
				list: [{
					head: '名誉合伙人',
					list: []
				}, {
					head: '企业家会员',
					list: []
				}, {
					head: '基础会员',
					list: []
				}]
			}
		},
		onLoad() {
			this.memberlist()
		},
		onReachBottom() {
			this.page += 1
			this.memberlist()
		},
		onShow() {},
		mounted() {},
		methods: {
			memberlist() {
				this.$axios({
					url: this.$url[126],
					data: {
						page: this.page,
						limit: 10
					},
				}).then(res => {
					res.data.data.forEach(item => {
						
						if(item.member_type_id == 4) this.list[2].list.push(item)
						if(item.member_type_id == 6) this.list[1].list.push(item)
						if(item.member_type_id == 7) this.list[0].list.push(item)
					})
					
				})
			}
		}
	}
</script>
<style>
	.member {
		padding: 30rpx;
		background: rgb(245, 245, 245);
	}
</style>
<style scoped lang="scss">
	.member-list {
		margin: 40rpx 0;

		.list-name {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}

		.member-info {
			display: flex;
			margin: 20rpx 0;
			background-color: #fff;
			padding: 10px;

			.info-img {
				width: 16%;

				image {
					width: 100%;
					border-radius: 50%;
				}
			}

			.info-right {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 20rpx;

				>view:first-child {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
				}

				// >view:last-child {
				// 	font-size: 28rpx;
				// 	font-weight: 400;
				// 	color: rgba(51, 51, 51, 0.6);
				// }
			}
		}
	}
</style>