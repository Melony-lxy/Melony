<template>
	<view>
		<view style="margin: 0 auto;">
			<nullData v-if="dataList.length <= 0" :paddingTop="50"></nullData>
		</view>
		<view class="" v-if="type == 1">
			<view v-for="(item, index) in dataList" :key="index" class="item" @click="commodityDetails(item.id)">
				<view class="itemLeft">
					<image :src="common.imgUrl(item.img)" mode="aspectFill" class=""></image>
				</view>
				<view style="" class="info">
					<view class="itemName">{{ item.name }}</view>
					<view class="teacherText">{{ item.introduce }}</view>
					<view class="bottomBox space-between u-f-ac" v-if="isios">
						<view class="price" v-if="item.is_gratis == 0">
							<text style="font-size: 20rpx;">￥</text>
							{{ (item.price * item.positive_class) / 100 }}
						</view>
						<view class="price" v-if="item.is_gratis == 1">免费</view>
						<view class="purchase">购买</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box" v-else>
			<view class="box_list">
				<view v-for="(item, index) in dataList" :key="index" class="itemBox" @click="commodityDetails(item.id)">
					<image :src="common.imgUrl(item.img)" mode="aspectFill" class="itemImg"></image>
					<!-- <image v-else :src="common.imgUrl('/static/default1.png')" mode="aspectFill" class="itemImg"></image> -->
					<view style="padding: 12rpx 18rpx;">
						<view class="itemName">{{ item.name }}</view>
						<view class="bottomBox space-between u-f-ac" v-if="isios">
							<view class="price" v-if="item.is_gratis == 0">
								<text style="font-size: 20rpx;">￥</text>
								{{ (item.price * item.positive_class) / 100 }}
							</view>
							<view class="price" v-if="item.is_gratis == 1">免费</view>
							<view class="purchase">购买</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			dataList: Array,
			type: Number,
		},
		data() {
			return {
				isios:false,			
			}
		},
		created(){
			let that=this
			uni.getSystemInfo({
				success: (res) => {
					if (res.platform == 'ios') {
						that.$axios({
							url: that.$url[103]
						}).then(res => {
							that.isios = res.data
						})
					} else {
						that.isios=true
				}
				}
			})
		},
		onShow() {

		},
		methods: {
			commodityDetails(id) {
				let code = uni.getStorageSync('ThousandAwn_share_code')
				let pageId = uni.getStorageSync('ThousandAwn_share')
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
<style scoped lang="scss">
	/deep/ .flex-center {
		background: #fff;
		margin: 0 22rpx;
		border-radius: 0 0 12rpx 12rpx;
	}

	.itemBox {
		padding-top: 25rpx;
		width: 324rpx;
		background: #ffffff;
		/* border: 1px solid #E6E6E6; */
		border-radius: 12rpx;
		// box-shadow: 0px 0px 5px #EEEEEE
	}

	.teacherText {
		font-size: 12px;
		font-weight: 400;
		color: #858688;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.item {
		margin-top: 25rpx;
		background: #ffffff;
		margin: 0 23rpx;
		// border-radius: 10rpx;
		// box-shadow: 0px 0px 5px #EEEEEE;
		display: flex;
		// border-radius: 8rpx;
		padding: 28rpx 26rpx;

		&:last-child {
			border-radius: 0 0 12rpx 12rpx;
		}

		.itemLeft {
			width: 279rpx;

			image {
				width: 100%;
				height: 186rpx;
				border-radius: 10rpx;
			}
		}

		.info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
		}
	}

	.itemImg {
		width: 100%;
		height: 216rpx;
		border-radius: 12rpx;
	}

	.itemName {
		padding-bottom: 6rpx;
		width: 100%;
		height: 70rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #272727;
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin: 0;
		margin-bottom: 17rpx;
	}

	.price {
		font-size: 34rpx;
		font-weight: bold;
		color: #ff6638;
		opacity: 1;
	}

	.purchase {
		width: 99rpx;
		height: 46rpx;
		background: #ff6638;
		opacity: 1;
		line-height: 46rpx;
		/* border-radius: 4rpx; */
		font-size: 26rpx;
		color: white;
		text-align: center;
		border-radius: 23rpx;
	}

	.box {
		margin: 0 23rpx;
		background: #fff;
		border-radius: 0 0 12rpx 12rpx;
	}

	.box_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0 23rpx;
	}
</style>
