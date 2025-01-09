<template>
	<view class="main">
		<view class="item" v-for="(item, index) in info" :key="index">
			<view class="flex">
				<img :src="common.imgUrl(item.img)" alt="" @error='error(index)' class='commentimg'>
				<view class="">
					<view class="fontWight ellipsis2 commentname">
						{{ item.name }}
					</view>
					<view class="size24 color999 commentnum"> 购买数量：{{ item.number }} </view>
				</view>
			</view>
			<view class="commentArea" @click="currIndex = index">
				<u-input placeholder="请认真书写有帮助性的评价噢~" v-model="item.content" type="textarea" height="200"
					:auto-height="true" :border="true" />

				<u-upload max-count="3" :action="action" @on-uploaded="uploaded" :index="index"></u-upload>
			</view>
		</view>
		<view class="footer">
			<view class="submit center size32" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		orderInfo,
		addComment
	} from "@/plugin/api/order.js";
	export default {
		data() {
			return {
				id: 0,
				info: [],
				currIndex: 0,
				action: this.$base_url + "/index/common/uploadFile",
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.orderInfo(option.id);
		},
		methods: {
			error(i) {
				this.info[i].img = this.common.imgUrl('/static/images/default.png')
			},
			orderInfo(id) {
				orderInfo({
					id,
				}).then((res) => {
					if (res.code === 0) {
						let data = [];
						res.data.product.forEach((item) => {
							let specification = this.specificationsStatus(item);
							data.push({
								product_id: item.product_id,
								img: item.img,
								name: item.product_name,
								number: item.number,
								content: "",
								specification,
								fileList: [],
							});
						});
						this.info = data;
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg,
						});
					}
				});
			},
			specificationsStatus(item) {
				return item.specifications.map((item) => item.name).join("/");
			},
			uploaded(e) {
				let data = [];
				e.forEach((item) => {
					data.push(item.response.data);
				});
				this.info[this.currIndex].fileList = data;
			},
			submit() {
				let data = [];
				this.info.forEach((item) =>
					data.push({
						productId: item.product_id,
						content: item.content,
						fileList: item.fileList,
					})
				);
				console.log(data, "data");
				addComment({
					id: this.id,
					comment: data,
				}).then((res) => {
					if (res.code === 0) {
						uni.showToast({
							icon: "none",
							title: "评论成功",
						});
						setTimeout(() => {
							uni.navigateBack({ // 返回上一页
								delta: 1
							})
						}, 2000);
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg,
						});
					}
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.main {
		padding-bottom: 114rpx;

		.item {
			background-color: #ffffff;
			padding: 28rpx;
			margin-bottom: 20rpx;

			.img {
				margin-right: 20rpx;
				border: 2rpx solid #f1f1f1;
			}

			.commentArea {
				margin-top: 30rpx;
			}
		}
		.commentimg{
			width: 184rpx;
			height: 184rpx;
			object-fit: cover;
			padding-right: 20rpx;
		}
		.commentname{
			line-height: 1.5;
			font-size: 30rpx;
		}
		.commentnum{
			    font-size: 26rpx;
			    padding: 4rpx 0;
			    opacity: .8;
		}
		.footer {
			padding: 20rpx 30rpx;
			text-align: center;

			.issubmit {
				background-color: grey !important;
			}

			.submit {
				background-color: #ff6638;
				color: #ffffff;
				padding: 30rpx 0;
				font-weight: lighter;
				border-radius: 100rpx;
			}
		}
	}
</style>
