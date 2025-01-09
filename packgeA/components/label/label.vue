<template>
	<view>
		<view class="space-between">
			<view class="label-title">
				{{title}}
			</view>
			<view class="delete" v-if="remove" @tap="rem">清空</view>
		</view>
		<view class="label-type flex">
			<block v-for="(item,index) in typeList" :key="index">
				<view class="label" :class="{active:item.active}" @tap="labelChange(index)">{{item.title}}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: Array,
			},
			title: {
				type: String,
			},
			remove: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				typeList: []
			}
		},
		mounted() {
			this.typeList = this.label
		},
		watch: {
			label() {
				this.typeList = this.label
			}
		},
		methods: {
			rem() {
				if (this.remove) {
					this.$axios({
						url: this.$url[57],
					}).then((data) => {
						if (data.code == 0) {
							this.$emit('remove')
						}
					})
				}
			},
			labelChange(index) {
				this.$axios({
					url: this.$url[56],
					data: {
						name: this.typeList[index].title,
						type: this.type
					}
				}).then((data) => {
					if (data.code == 0) {
						uni.navigateTo({
							url: '/packgeA/case/search_list/search_list?search=' + this.typeList[index]
								.title +
								'&type=' + this.type
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
	.label-title {
		color: #666;
		font-size: 16px;
	}

	.label-type {
		flex-wrap: wrap;
		margin-top: 5px;
	}

	.label {
		margin: 0 5px;
		border: 1px solid #e6e6e6;
		padding: 2px 10px;
		border-radius: 30px;
		margin-top: 5px;
		font-size: 14px;
	}

	.delete {
		color: #e76a6a;
		font-size: 14px;
	}

	.active {
		border: 1px solid #fbe76a;
		color: #fbe76a;
	}
</style>
