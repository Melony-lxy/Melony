<template>
	<view class="main">
		<view class="flex j-between whiteBg top">
			<view class="fontWight"> 我的收货地址 </view>
			<view class="theme" @click="isManage = !isManage" :class="isManage && 'accomplish'"
				v-if="mode !== 'change'">
				{{ isManage ? "完成" : "管理" }}
			</view>
		</view>
		<view class="centent" :class="!isManage && 'whiteBg'" v-if="list.length">
			<view class="whiteBg item" v-for="(item, index) in list" :key="index" :class="isManage && 'edit'">
				<view class="flex a-center j-between">
					<view class="lastName center">
						{{ item.name.split("")[0] }}
					</view>
					<view class="flex1 address" @click="changeAddress(item.id)">
						<view>
							<text class="size30 fontWight">{{ item.name }}</text>
							<text class="size26 color999 phone">{{ item.phone }}</text>
							<text class="size22 default themeColor" v-if="item.is_default">默认</text>
						</view>
						<view class="size28 district ellipsis2">
							{{ item.province }} {{ item.city }} {{ item.district }}
							{{ item.details }}
						</view>
					</view>
					<view @click="skip('edit', item.id)">
						<u-icon name="edit-pen" size="35"></u-icon>
					</view>
				</view>
				<view class="manage flex a-center j-between" v-if="isManage">
					<view @click="changeDefault(item.id)">
						<u-checkbox v-model="item.is_default" active-color="#FFAF00" size="30rpx"
							shape="circle">
							<text class="color666 size24">默认地址</text>
						</u-checkbox>
					</view>
					<view class="color666 size24" @click="remove(item.id)"> 删除 </view>
				</view>
			</view>
		</view>
		<u-empty v-else text="暂无地址" icon-size="180" font-size="30" margin-top="80"></u-empty>
		<view class="whiteBg footer">
			<view class="submit center size32" @click="submit('add')">新增收货地址</view>
		</view>
	</view>
</template>

<script>
	import {
		getList,
		changeDefault,
		remove
	} from "@/plugin/api/personal.js";
	export default {
		data() {
			return {
				mode: "normal",
				isManage: false,
				currId: 0,
				list: [],
			};
		},
		onLoad(options) {
			if (options.mode) {
				this.mode = options.mode;
			}
		},
		onShow() {
			this.getList();
		},
		methods: {
			changeAddress(id) {
				if (this.mode !== "normal") {
					uni.redirectTo({
						url: "/pagesShop/order/index?id=" + id,
					});
				}
			},
			changeDefault(id) {
				changeDefault({
					id,
				}).then(() => {
					this.getList();
				});
			},
			skip(mode, id) {
				uni.navigateTo({
					url: "/pagesShop/address/addOrEdit?mode=" + mode + "&id=" + id,
				});
			},
			submit(mode) {
				uni.navigateTo({
					url: "/pagesShop/AddMoreAddress?mode=" + mode,
				});
			},
			remove(id) {
				uni.showModal({
					title: "确定要删除该地址吗？",
					success: (res) => {
						if (res.confirm) {
							remove({
								id,
							}).then(() => {
								this.getList();
							});
						}
					},
				});
			},
			getList() {
				getList({
					page: 1,
					limit: 999,
				}).then((res) => {
					this.list = res.data.map(item=>{
						item.is_default = item.is_default === '1'
						return item
					});
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/pagesShop/scss/user/address.scss";
</style>
