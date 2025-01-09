<template>
	<view>
		<view class="" style="height: 86rpx;">
			
		</view>
		<view class="coupon_img">
			<view class="coupon_content">
				<view class="coupon_my">我的卡劵</view>
				<view class="coupon_num">
					<view class="coupon_num1">{{ navTab[0].list.length }}</view>
					<view class="" style="margin-left: 10rpx;font-size: 35rpx;margin-top: 10rpx;">张</view>
				</view>
			</view>
			<view class="coupon_images"><img :src="common.imgUrl('/static/images/coupon5.png')" alt="" /></view>
		</view>
		<nav-tab class="nav-tab" :navTab="navTab" :activeIndex.sync="activeIndex" @tabEvent="tabEvent" />
		<view class="notUsed" v-if="activeIndex == 0">
			<view
				class="notUsed_coupon"
				v-for="(item, index) in navTab[0].list"
				:key="index"
				:style="{ 'background-image': `url(${common.imgUrl('/static/images/coupon1.png')})` }"
			>
				<view class="notUsed_left">
					<view class="notUsed_money">
						{{ item.type === 2 ? item.discount / 10 + '折' : '￥' + item.cou_money }}
					</view>
					<view class="notUsed_fullUse" v-if="item.type !== 2 && item.cou_man">满{{ item.cou_man }}可用</view>
				</view>
				<view class="notUsed_right">
					<view class="notUsed_content">
						<view class="notUsed_content1">
							{{ item.name }}({{ item.product_scope ? '部分商品可用' : '通用' }})
						</view>
						<view class="notUsed_content2">
							可使用次数: {{ item.count }} / {{ item.available_times ? item.available_times : '无限次' }}
						</view>
						<view class="notUsed_content3">有效期:{{ item.start_time }}-{{ item.end_time }}</view>
					</view>
					<view class="notUsed_toUse" @click="switchTab('/pages/shop/index',item.oid)">去使用</view>
				</view>
			</view>
			<u-empty
				v-if="navTab[0].list.length === 0"
				text="暂无优惠券"
				icon-size="180"
				font-size="30"
				class="empty-u"
			/>
		</view>
		<view class="used" v-else-if="activeIndex == 1">
			<view
				class="used_coupon"
				v-for="(item, index) in navTab[1].list"
				:key="index"
				:style="{ 'background-image': `url(${common.imgUrl('/static/images/coupon4.png')})` }"
			>
				<view class="used_left">
					<view class="notUsed_money">
						{{ item.type === 2 ? item.discount / 10 + '折' : '￥' + item.cou_money }}
					</view>
					<view class="notUsed_fullUse" v-if="item.type !== 2 && item.cou_man">满{{ item.cou_man }}可用</view>
				</view>
				<view class="used_right">
					<view class="notUsed_content">
						<view class="notUsed_content1">
							{{ item.name }}({{ item.product_scope ? '部分商品可用' : '通用' }})
						</view>
						<view class="notUsed_content2">
							可使用次数: {{ item.count }} / {{ item.available_times ? item.available_times : '无限次' }}
						</view>
						<view class="notUsed_content3">有效期:{{ item.start_time }}-{{ item.end_time }}</view>
					</view>
					<view class="notUsed_img"><image :src="common.imgUrl('/static/images/coupon2.png')" mode="widthFix"></image></view>
				</view>
			</view>
			<u-empty
				v-if="navTab[1].list.length === 0"
				text="暂无优惠券"
				icon-size="180"
				font-size="30"
				class="empty-u"
			/>
		</view>
		<view class="expired" v-else="activeIndex == 2">
			<view
				v-for="(item, index) in navTab[2].list"
				:key="index"
				class="expired_coupon"
				:style="{ 'background-image': `url(${common.imgUrl('/static/images/coupon4.png')})` }"
			>
				<view class="expired_left">
					<view class="notUsed_money">
						{{ item.type === 2 ? item.discount / 10 + '折' : '￥' + item.cou_money }}
					</view>
					<view class="notUsed_fullUse" v-if="item.type !== 2 && item.cou_man">满{{ item.cou_man }}可用</view>
				</view>
				<view class="expired_right">
					<view class="notUsed_content">
						<view class="notUsed_content1">
							{{ item.name }}({{ item.product_scope ? '部分商品可用' : '通用' }})
						</view>
						<view class="notUsed_content2">
							可使用次数: {{ item.count }} / {{ item.available_times ? item.available_times : '无限次' }}
						</view>
						<view class="notUsed_content3">有效期:{{ item.start_time }}-{{ item.end_time }}</view>
					</view>
					<view class="notUsed_img"> <image :src="common.imgUrl('/static/images/coupon3.png')" mode="widthFix"></image></view>
				</view>
			</view>
			<u-empty
				v-if="navTab[2].list.length === 0"
				text="暂无优惠券"
				icon-size="180"
				font-size="30"
				class="empty-u"
			/>
		</view>
	</view>
</template>

<script>
import navTab from '@/components/nav-tab'
import { couponList } from '@/plugin/api/personal.js'

export default {
	components: {
		navTab
	},
	data() {
		return {
			activeIndex: 0,
			navTab: [
				{
					name: '未使用',
					list: []
				},
				{
					name: '已使用',
					list: []
				},
				{
					name: '已过期',
					list: []
				}
			]
		}
	},
	onShow() {
		this.couponList(0)
		this.couponList(1)
		this.couponList(2)
	},
	methods: {
		switchTab(url,oid) {
			console.log(oid !=0)
			if (oid !=0) {
				this.$axios({
				  url: this.$url[47],
				}).then((res) => {
					
				  if (res.code == 0) {
				   //获取这张优惠券的机构名称
				   for (let i = 0; i < res.data.data.length; i++) {
				   	if(res.data.data[i].id === oid){
						console.log(res.data.data[i].abbreviation)
						this.$storage.setStorage('abbreviation', res.data.data[i].abbreviation)
					}
				   }
				  }
				});
			}else{
				uni.removeStorage({
					key: 'abbreviation',
					success: function (res) {
						console.log('success');
					}
				});
				// this.$storage.setStorage('abbreviation', '')
			}
			uni.switchTab({
				url
			})
		},
		couponList(status) {
			couponList({
				status
			}).then(res => {
				if (res.code === 0) {
					this.navTab[status].list = res.data.data
				}
			})
		},
		// 切换nav 将重新搜索热点
		tabEvent(index) {
			this.activeIndex = index
			let i = 0
			let List = document.getElementsByClassName('nav-one')
			for (let i = 0; i < List.length; i++) {
				if (i == index) {
					List[i].className += ' choosewhich'
				} else {
					List[i].className = 'nav-one'
				}
			}
		}
	}
}
</script>
<style lang="scss">
.empty-u {
	height: 1000rpx;
	background-color: white;
}
/deep/.line {
	height: 4rpx;
	background: $project-color;
	box-shadow: 0 1rpx 5rpx white;
	position: absolute;
	bottom: 6rpx;
	z-index: 1;
	opacity: 0.7;
	transition: 0.3s;
	border-radius: 4rpx;
}

/deep/.nav-one {
	font-size: 28rpx;
	font-family: Source Han Sans CN-Medium, Source Han Sans CN;
	font-weight: 500;
	color: #2d2d2d;
}

/deep/ .success {
	color: $project-color !important;
	font-weight: bold !important;
}

/deep/ .choosewhich {
	font-size: 28rpx !important;
	font-family: Source Han Sans CN-Medium, Source Han Sans CN !important;
	font-weight: bold !important;
	color: #ff6638;
}

.coupon_img {
	width: 100%;
	height: 350rpx;
	background: $project-color;
	display: flex;
	justify-content: space-between;

	.coupon_content {
		width: 40%;
		height: 100%;

		.coupon_my {
			width: 100%;
			line-height: 200rpx;
			margin-left: 64rpx;
			font-size: 45rpx;
			font-weight: 500;
			color: #ffffff;
		}

		.coupon_num {
			width: 100%;
			line-height: 80rpx;
			margin-left: 64rpx;
			font-weight: 500;
			font-size: 60rpx;
			color: #ffffff;
			display: flex;
		}
	}

	.coupon_images {
		height: 100%;

		img {
			width: 400rpx;
			height: 290rpx;
			margin-top: 30rpx;
			padding-right: 20rpx;
		}
	}
}

.tab_tit {
	width: 100%;
	height: 90rpx;
	display: flex;
	justify-content: space-around;
}

.tab_tit li {
	list-style: none;
	width: 100rpx;
	height: 75rpx;
	line-height: 90rpx;
	font-size: 32rpx;
	text-align: center;
}

.active {
	color: #ff6638;
	border-bottom: 2rpx #ff6638 solid;
	font-weight: bold;
}

.notUsed,
.used,
.expired {
	width: 100%;
	height: auto;
	background-color: #f5f5f5;
	overflow: hidden;
}

.notUsed_coupon {
	width: 90%;
	height: 200rpx;
	margin: 5%;
	background-size: 100% 100%;
	overflow: hidden;
	display: flex;

	.notUsed_left {
		width: 25%;
		height: 100%;
		overflow: hidden;

		.notUsed_money {
			margin-top: 55rpx;
			text-align: center;
			font-size: 45rpx;
			color: #ffe9bf;
		}

		.notUsed_fullUse {
			margin-top: 5rpx;
			text-align: center;
			font-size: 20rpx;
			color: #ffe9bf;
		}
	}

	.notUsed_right {
		width: 75%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;

		.notUsed_content1 {
			font-size: 33rpx;
			font-weight: bold;
			color: #ff6638;
			margin-top: 20rpx;
			margin-left: 20rpx;
		}

		.notUsed_content2 {
			font-size: 19rpx;
			font-weight: 400;
			color: #262626;
			margin-top: 15rpx;
			margin-left: 20rpx;
		}

		.notUsed_content3 {
			font-size: 19rpx;
			font-weight: 400;
			color: #989898;
			margin-top: 20rpx;
			margin-left: 20rpx;
		}
	}

	.notUsed_toUse {
		width: 100rpx;
		height: 50rpx;
		border-radius: 42rpx 42rpx 42rpx 42rpx;
		opacity: 1;
		border: 2rpx solid #ff6638;
		text-align: center;
		line-height: 50rpx;
		font-size: 22rpx;
		margin-top: 70rpx;
		margin-right: 20rpx;
		font-weight: 500;
		color: #ff6638;
	}
}

.used_coupon,
.expired_coupon {
	width: 90%;
	height: 200rpx;
	margin: 5%;
	background-size: 100% 100%;
	display: flex;
	img{
		object-fit: contain;
	}
	.used_left,
	.expired_left {
		width: 25%;
		height: 100%;
		overflow: hidden;

		.notUsed_money {
			margin-top: 55rpx;
			text-align: center;
			font-size: 45rpx;
			color: #ffffff;
		}

		.notUsed_fullUse {
			margin-top: 5rpx;
			text-align: center;
			font-size: 18rpx;
			color: #ffffff;
		}
	}

	.used_right,
	.expired_right {
		width: 75%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;

		.notUsed_content1 {
			font-size: 33rpx;
			font-weight: bold;
			color: #999999;
			margin-top: 20rpx;
			margin-left: 20rpx;
		}

		.notUsed_content2 {
			font-size: 14rpx;
			font-weight: 400;
			color: #999999;
			margin-top: 15rpx;
			margin-left: 20rpx;
		}

		.notUsed_content3 {
			font-size: 14rpx;
			font-weight: 400;
			color: #999999;
			margin-top: 20rpx;
			margin-left: 20rpx;
		}
	}

	.notUsed_img {
		height: 120rpx;
		margin-top: 40rpx;
		margin-right: 10rpx;

		img,image {
			width: 130rpx;
			height: 100%;
		}
	}
}
</style>
