<template>
	<view class="apply">
		<view class="content">
			<view class="commodityInfo">
				<u-form class="whiteBg info">
					<u-form-item :label="item.title" v-for="item in commodityInfo" label-width="200">
						<u-input class="orderNumber" :disabled="true" v-model="item.value" input-align="right" />
					</u-form-item>
				</u-form>
			</view>
			<u-form :model="invoiceData" class="whiteBg info">
				<!-- <u-form-item label="发票类型" label-width="200">
					<u-input :disabled="true" value="增值税电子普通发票" input-align="right" />
				</u-form-item>
				<u-form-item label="抬头类型" label-width="200">
					<u-radio-group v-model="invoiceData.type">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.id"
							:disabled="isHaveInvoice">
							<view class="color999 size28">
								{{ item.name }}
							</view>
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="发票抬头" prop="title" label-width="200">
					<u-input placeholder="必填" v-model="invoiceData.title" input-align="right"
						:disabled="isHaveInvoice" />
				</u-form-item> -->

				<!-- <view class="" v-if="invoiceData.type === 2">
					<u-form-item label="企业税号" prop="duty_paragraph" label-width="200">
						<u-input placeholder="必填" v-model="invoiceData.duty_paragraph" input-align="right"
							:disabled="isHaveInvoice" />
					</u-form-item>
					<u-form-item label="邮箱" prop="email" label-width="200">
						<u-input placeholder="必填" v-model="invoiceData.email" input-align="right"
							:disabled="isHaveInvoice" />
					</u-form-item>
					<u-form-item label="手机号" prop="phone" label-width="200">
						<u-input placeholder="必填" v-model="invoiceData.phone" input-align="right"
							:disabled="isHaveInvoice" />
					</u-form-item>
					<u-form-item label="开户银行" label-width="200">
						<u-input placeholder="选填" v-model="invoiceData.bank" input-align="right"
							:disabled="isHaveInvoice" />
					</u-form-item>
					<u-form-item label="银行账户" label-width="200">
						<u-input placeholder="选填" v-model="invoiceData.bank_account" input-align="right"
							:disabled="isHaveInvoice" />
					</u-form-item>
					<u-form-item label="企业地址" label-width="200">
						<u-input placeholder="选填" v-model="invoiceData.address" input-align="right"
							:disabled="isHaveInvoice" />
					</u-form-item>
					<u-form-item label="企业电话" label-width="200">
						<u-input placeholder="选填" v-model="invoiceData.business_phone" input-align="right"
							:disabled="isHaveInvoice" />
					</u-form-item>
				</view>
				<view class="" v-else> -->
				<u-form-item label="手机号" label-width="200">
					<u-input placeholder="必填" v-model="invoiceData.phone" input-align="right"
						:disabled="isHaveInvoice" />
				</u-form-item>
				<u-form-item label="邮箱" prop="email" label-width="200">
					<u-input placeholder="必填" v-model="invoiceData.email" input-align="right"
						:disabled="isHaveInvoice" />
				</u-form-item>
				<!-- <u-form-item label="地址" label-width="200">
						<u-input placeholder="选填" v-model="invoiceData.address" input-align="right"
							:disabled="isHaveInvoice" />
					</u-form-item> -->

				<!-- </view> -->
			</u-form>
			<view class="center red tips">"敬请留意电子信箱是否收到二维码" 并请自动开票</view>
			<view class="footer">
				<view class="submit center size32" @click="submit" :disabled="isHaveInvoice" v-if="!isHaveInvoice">提交
				</view>
				<view class="submit center size32 issubmit" v-else>已申请</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addInvoice,
		orderInfo,
		invoiceInfo
	} from "@/plugin/api/order.js";
	export default {
		data() {
			return {
				isHaveInvoice: false,
				orderId: 0,
				commodityInfo: [{
						title: "订单编号",
						value: "1238567896654",
					},
					{
						title: "开票金额",
						value: "￥222",
					},
				],
				invoiceData: {
					type: 1,
					title: "",
					email: "",
					duty_paragraph: "",
					bank: "",
					bank_account: "",
					address: "",
					phone: "",
					business_phone: "",
				},
				list: [{
						id: 1,
						name: "个人",
						disabled: false,
					},
					{
						id: 2,
						name: "企业",
						disabled: false,
					},
				],
			};
		},
		onLoad(option) {
			this.orderId = parseInt(option.id);
			this.invoiceInfo();
		},
		methods: {
			invoiceInfo() {
				invoiceInfo({
					id: this.orderId,
				}).then((res) => {
					if (res.data.phone) {
						this.isHaveInvoice = true;
						this.commodityInfo[0].value = res.data.order_number;
						this.commodityInfo[1].value = res.data.total_price;
						this.invoiceData = {
							type: res.data.type,
							title: res.data.title,
							email: res.data.email,
							duty_paragraph: res.data.duty_paragraph || "",
							bank: res.data.bank,
							bank_account: res.data.bank_account,
							address: res.data.address,
							phone: res.data.phone,
							business_phone: res.data.business_phone || "",
						};
					} else {
						this.orderInfo();
					}
				});
			},
			orderInfo() {
				orderInfo({
					id: this.orderId,
				}).then((res) => {
					this.commodityInfo[0].value = res.data.order_number;
					this.commodityInfo[1].value = res.data.total_price;
				});
			},
			radioChange(e) {
				this.invoiceData.type = e;
			},
			submit() {
				if (this.isHaveInvoice) {
					uni.showToast({
						icon: "none",
						title: "您已申请过发票",
					});
					return;
				}
				let invoiceData = this.invoiceData;
				let data = {};
				if (this.invoiceData.type === 1) {
					if (!invoiceData.phone) {
						uni.showToast({
							icon: "none",
							title: "请填写手机号",
						});
						return;
					}
					// if (!invoiceData.title) {
					//   uni.showToast({
					//     icon: "none",
					//     title: "请填写发票抬头",
					//   });
					//   return;
					// }
					if (!invoiceData.email) {
						uni.showToast({
							icon: "none",
							title: "请填写邮箱",
						});
						return;
					}
					data = {
						id: this.orderId,
						type: invoiceData.type,
						title: invoiceData.title,
						phone: invoiceData.phone,
						address: invoiceData.address,
						email: invoiceData.email,
					};
				} else {
					// if (!invoiceData.title) {
					//   uni.showToast({
					//     icon: "none",
					//     title: "请填写发票抬头",
					//   });
					//   return;
					// }
					if (!invoiceData.duty_paragraph) {
						uni.showToast({
							icon: "none",
							title: "请填写税号",
						});
						return;
					}
					if (!invoiceData.email) {
						uni.showToast({
							icon: "none",
							title: "请填写邮箱",
						});
						return;
					}

					if (!invoiceData.phone) {
						uni.showToast({
							icon: "none",
							title: "请填写手机号",
						});
						return;
					}
					data = {
						id: this.orderId,
						type: invoiceData.type,
						title: invoiceData.title,
						email: invoiceData.email,
						duty_paragraph: "",
						bank: invoiceData.bank,
						bank_account: invoiceData.bank_account,
						address: invoiceData.address,
						phone: invoiceData.phone,
						business_phone: invoiceData.business_phone,
					};
				}
				console.log(data, "data");
				addInvoice(data).then((res) => {
					if (res.code === 0) {
						uni.showToast({
							icon: "none",
							title: "申请成功",
						});
						setTimeout(() => {
							uni.navigateBack({ // 返回上一页
								delta: 1
							})
						}, 2000);
					} else {
						uni.showToast({
							icon: "error",
							title: res.msg,
						});
					}
				});

				console.log("验证成功");
			},
		},
	};
</script>

<style scoped lang="scss">
	.apply {
		.tips {
			display: flex;
			justify-content: center;
			color: red;
			font-size: 28rpx;
			padding: 30rpx 0;
		}

		.commodityInfo {
			margin-bottom: 30rpx;
		}

		.info {
			padding: 0 28rpx;
		}

		.orderNumber {
			width: 50% !important;
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
