<template>
	<view v-if="detail">
		<scroll-view scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true"
			:style="{ height: contentH + 'px' }">
			<!-- 主体 -->
			<view class="" v-if="detail.file_url">
				<video :src="common.imgUrl(detail.file_url ? detail.file_url : '')" controls style="width: 100%;"
					autoplay v-if="detail.type === 1"></video>
				<image class="image-text" :src="common.imgUrl(detail.file_url)" mode="aspectFill" style="width: 100%;"
					lazy-load="true" v-else />
				</swiper>
			</view>
			<view class="account">
				<!-- 标题 -->
				<view class="case-list title-name">
					<view class="list-title">{{ detail.name }}</view>
					<view class="">{{ detail.ctime }}</view>
				</view>
				<view class="information">详情：</view>
				<view class="case-list" style="white-space: pre-line;" v-html="common.content(detail.content)" />
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import {
		verifyLogin
	} from '@/plugin/api/index.js'
	export default {
		components: {},
		data() {
			return {
				id: 0,
				contentH: 0,
				scrollTop: 0,
				detail: false,
			}
		},
		onLoad(option) {
			this.id = option.id
			this.initdata()
		},
		onShow() {},
		methods: {
			initdata() {
				uni.showLoading({
					title: '加载中'
				})
				this.$axios({
					url: this.$url[101],
					data: {
						id: this.id
					}
				}).then(res => {
					if (res.code == 0) {
						this.detail = res.data
						uni.hideLoading()
					}
				}).catch(res => {
					uni.hideLoading()
				})
				try {
					const sty = uni.getSystemInfoSync()
					this.contentH = sty.windowHeight - uni.upx2px(98)
				} catch (e) {}
			},
		}
	}
</script>
<style scoped>
	.content {
		z-index: 1;
	}

	.deleteImg {
		width: 40rpx;
	}

	.autolabel-margin {
		margin: 0 10rpx 10rpx 0;
	}

	.user-img-shaw {
		border: 1rpx solid rgba(232, 232, 232, 1);
	}

	/* 任务 */
	.task-block {
		width: 20.93upx;
		height: 20.93upx;
		margin-right: 12upx;
	}

	.task-radio {
		padding: 6upx 34upx;
		background: #f5f5f5;
		border-radius: 28upx;
		line-height: 1.5;
		font-size: 22upx;
		color: #969799 !important;
		margin-left: 14upx;
		display: flex;
		align-items: center;
	}

	.tasks {
		display: flex;
		margin-bottom: 20upx;
		justify-content: space-between;
		align-items: center;
	}

	.lock>image {
		width: 18.46upx;
		height: 18.56upx;
		margin-right: 13upx;
	}

	.lock {
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding: 12upx 24upx;
		margin-top: 18upx;
		background: #f5f5f5;
		border-radius: 6upx;
		line-height: 1.2;
		color: rgba(255, 94, 0, 1);
		/* font-size: 24upx; */
	}

	.icon-text {
		margin-left: 6upx;
		height: 34upx;
		font-size: 28upx !important;
	}

	/* 时间 */
	.ctimer {
		color: rgba(150, 151, 153, 1);
		font-size: 20upx;
		padding: 20upx 0;
		position: relative;
	}

	.has,
	.noticed,
	.color {
		color: rgba(255, 255, 255, 1);
		font-size: 24upx;
		padding: 8upx 40upx;
		border-radius: 60upx;
		display: inline-block;
	}

	.content-img {
		min-width: 100%;
		object-fit: cover;
	}

	.content-img>image {
		width: 100%;
		object-fit: cover;
	}

	.noticed {
		border: 2rpx solid #ff5e00;
		background-color: #ff5e00;
	}

	.color {
		border: 2rpx solid #ff5e00;
		color: #ff5e00;
	}

	.has {
		border: 2rpx solid #b5b6b4;
		color: #b5b6b4;
	}

	.ctimer::after {
		content: '';
		width: 100%;
		height: 1px;
		transform: scaleY(0.5);
		background: rgba(232, 232, 232, 1);
		position: absolute;
		bottom: 0;
		left: 0;
	}

	/* 标签 */
	.autolabel {
		margin-bottom: 20upx;
	}

	.autolabel-item {
		display: flex;
		flex-wrap: wrap;
	}

	.autolabel-list {
		background: rgba(245, 245, 245, 1);
		line-height: 1.2;
		border-radius: 22upx;
		margin-right: 30upx;
		padding: 6upx 23upx;
		color: rgba(255, 94, 0, 1);
		font-size: 22upx;
		margin-top: 19upx;
	}

	.assess-wrap-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.autolabel-title {
		color: rgba(150, 151, 153, 1);
		font-size: 28upx;
	}

	/* 标题 */
	.case-price {
		display: flex;
		color: rgba(255, 94, 0, 1);
		font-size: 36upx !important;
	}

	.case-list {
		white-space: pre-line !important;
		padding: 19upx 0 20upx;
		color: rgba(5, 15, 26, 1);
		font-size: 28upx;
	}

	.title-name {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-title {
		color: rgba(5, 15, 26, 1);
		font-size: 40upx;
		font-weight: 700;
	}

	.information {
		font-weight: 700;
		font-size: 18px;
		padding-top: 10px;
	}

	/* 用户信息 */
	.user-map-title {
		font-size: 20upx;
	}

	.user-map {
		display: flex;
		align-items: center;
		color: rgba(204, 204, 204, 1);
	}

	.user-map>image {
		width: 16upx;
		height: 20upx;
		margin-right: 6upx;
	}

	.user-l-r-t {
		display: flex;
		align-items: center;
	}

	.user-nick>image {
		width: 25.7upx;
		height: 25.7upx;
		margin: 0 14upx;
	}

	.user-card {
		color: rgba(26, 181, 2, 1);
		font-size: 20upx;
		padding: 4upx 16upx;
		border: 1px solid rgba(55, 174, 3, 1);
		background: #fff;
		border-radius: 7upx;
		line-height: 1;
	}

	.main-user {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 18upx 0;
		position: relative;
	}

	.account {
		padding: 0 30upx;
	}

	.user-l-img {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.main-user::after {
		content: '';
		width: 100%;
		height: 1px;
		transform: scaleY(0.5);
		background: rgba(232, 232, 232, 1);
		position: absolute;
		bottom: 0;
	}

	.user-l-img>image {
		width: 70upx;
		height: 70upx;
		margin-right: 25upx;
		border-radius: 50%;
	}

	.swiper-items>image {
		width: 100%;
		height: 1000upx;
	}

	.no-data {
		text-align: center;
	}

	.no-data>image {
		width: 554rpx;
		height: 252upx;
	}

	.nav {
		border-top: 1px solid #e6e6e6;
		position: fixed;
		width: 100%;
	}

	.main-wrap {
		padding: 30upx;
	}

	.title {
		font-weight: bold;
		font-size: 38upx;
		margin-bottom: 10px;
	}

	.nickname {
		margin-left: 10upx;
		font-size: 26upx;
		color: #666;
	}

	.head-portrait {
		width: 75upx;
		height: 75upx;
		border-radius: 50%;
	}

	.follow {
		font-size: 24upx;
		height: 50upx;
		text-align: center;
		width: 50px;
		line-height: 50upx;
		border: 1px solid #ffab3d;
		color: #ffab3d;
		border-radius: 20px;
	}

	.chat {
		font-size: 24upx;
		border: 1px solid #bdbdbd;
		height: 50upx;
		text-align: center;
		width: 50px;
		line-height: 50upx;
		color: #333;
		margin-right: 10px;
		border-radius: 20px;
	}

	.content {
		margin-top: 15px;
		color: #333;
	}

	.content-text {
		white-space: pre-wrap;
		line-height: 1.7;
		font-size: 17px;
		color: #333;
	}

	.content>image {
		margin: 15px 0;
		width: 100%;
	}

	.publish-time {
		text-align: right;
		color: #999;
		font-size: 22upx;
	}

	.assess-wrap {
		padding: 0 30upx;
		padding-bottom: 80upx;
	}

	.assess-title {
		padding: 20upx 0;
		color: rgba(100, 101, 102, 1);
		font-size: 24upx;
	}

	.assess-bottom {
		height: 98upx;
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		border-top: 1px solid #f7f7f7;
		z-index: 1;
		background: #fff;
	}

	.assess-input {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		margin: 0 30upx;
		background: #f5f5f5;
		border-radius: 20px;
	}

	.statistics {
		justify-content: space-evenly;
		flex: 1;
	}

	.assess-right {
		flex: 1;
		justify-content: space-between;
	}

	.assess-input>input {
		height: 60upx;
		border-radius: 20px;
		text-align: left;
		padding-left: 10upx;
		padding-right: 30upx;
		font-size: 26upx;
		color: #333;
	}

	.align-center>view {
		line-height: initial;
		text-align: center;
		color: #333;
	}

	.align-center>view>text {
		font-size: 12px;
	}

	.iconfont {
		font-size: 40upx;
		display: flex;
		align-items: center;
		color: #969799;
		margin-right: 5px;
	}

	.iconfont image {
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
	}

	.submit {
		background: #fbe76a;
		color: #1e2728;
		margin-right: 10px;
		padding: 3px 7px;
		border-radius: 5px;
	}

	.user-l {
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
	}

	.userbutton .isfollow {
		color: white;
		font-size: 30rpx;
		border: 1rpx solid #ff5e00;
		background-color: #ff5e00;
		line-height: 2;
		display: inline-block;
		padding: 0 20rpx;
	}

	.isfollow text {
		display: inline-block;
		width: 120rpx;
	}

	.outfollow {
		color: white;
		font-size: 30rpx;
		border: 1rpx solid #646566;
		background-color: #646566;
		line-height: 2;
		padding: 0 20rpx;
	}
</style>
