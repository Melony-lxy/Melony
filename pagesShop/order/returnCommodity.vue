<template>
	<view class="main whiteBg">
		<view class="content">
			<view class="fontWight"> 请您将商品寄到指定地址,并填写快递单号请您7日内寄出，并填写寄件资讯如下表格，退件不接受到货付款，谢谢您的合作！ </view>
			
			<view class="">
				<view class="size24 color999 tips"> 指定地点： </view>
				<view class="">
					<u-input v-model="address" type="textarea" height="200" :disabled="true" />
				</view>
			</view>
			<view class="flex j-between a-center">
				<view class="size24 color999 tips"> 快递公司： </view>
				<view class="search">
					<u-search placeholder="请输入快递关键字" v-model="expressText" shape="square" @custom="search"
						:clearabled="false"></u-search>
					<!-- <u-input /> -->
					<!-- {{expressText ? expressText : '请选择快递公司'}}<u-icon name="arrow-right" size="22"></u-icon> -->
				</view>
			</view>
			<view class="">
				<view class="size24 color999 tips"> 快递单号： </view>
				<view class="">
					<u-input v-model="shipping_no" type="textarea" />
				</view>
			</view>
		</view>
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
		<view class="whiteBg footer">
			<view class="submit center size32" @click="submit">完成</view>
		</view>
	</view>
</template>

<script>
	import {
		returnGoodsInfo,
		writeReturnGoods,
		expressList,
	} from "@/plugin/api/order.js";
	export default {
		data() {
			return {
				address: "",
				shipping_no: "",
				orderId: 0,
				infoId: 0,
				list: [],
				copyList: [],
				expressText: "",
				show: false,
			};
		},
		onLoad(option) {
			this.orderId = parseInt(option.orderId);
			this.infoId = parseInt(option.infoId);
			this.returnGoodsInfo();
			this.expressList();
		},
		methods: {
			search(e) {
				console.log(e, "eee");
				this.list = this.copyList.filter((item) => item.value.includes(e));
				this.show = true;
			},
			expressList() {
				expressList().then((res) => {
					this.list = res.data;
					this.copyList = res.data;
				});
			},
			expressType() {
				this.show = true;
			},
			confirm(e) {
				console.log(e, "e");
				this.expressText = e[0].value;
			},
			returnGoodsInfo() {
				returnGoodsInfo({
					id: this.orderId,
					infoId: this.infoId,
				}).then((res) => {
					console.log(res, "res");
					this.address = res.data.admin_address;
					this.shipping_no = res.data.admin_shipping_no;
				});
			},
			submit() {
				if (this.address === "") {
					uni.showToast({
						icon: "none",
						title: "请填写地址",
					});
					return;
				}
				let expressText = this.copyList.filter(
					(item) => item.value === this.expressText
				);
				if (this.expressText === "" || !expressText.length) {
					uni.showToast({
						icon: "none",
						title: "请选择快递公司",
					});
					return;
				}
				if (this.orderNo === "") {
					uni.showToast({
						icon: "none",
						title: "请填写快递单号",
					});
					return;
				}
				let data = {
					id: this.orderId,
					infoId: this.infoId,
					address: this.address,
					shipping_no: this.shipping_no,
					express: this.expressText,
				};
				writeReturnGoods(data).then((res) => {
					if (res.code === 0) {
						uni.showToast({
							icon: "none",
							title: "提交成功",
						});
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1500);
					}
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.main {
		.fontWight{
			line-height: 1.5;
		}
		.search {
			width: 70%;
			padding: 28rpx 0;
		}

		.content {
			padding: 35rpx 40rpx;

			.tips {
				padding: 28rpx 0;
				line-height: 2;
			}

			.u-input {
				padding: 10rpx !important;
				background-color: #f1f1f1;
				border-radius: 10rpx;
			}
		}

		.footer {
			
			margin-top: 100rpx;
			width: 90%;
			margin-left: 5%;
			text-align: center;
			z-index: 1111;

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
