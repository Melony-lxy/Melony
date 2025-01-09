<template>
	<view>
		<view class="card-add" @click="open">
			+
		</view>
		<u-popup v-model="popup" mode='bottom'>
			<view class="popup-item">
				<!-- <view class="popup-mark" @click="closePopup" /> -->
				<view class="list-item">
					<view class="card-search">
						<view class="search-input">
							#<input type="text" v-model="search" placeholder="请输入课程名称"
								placeholder-class="search-placeholder" @input="changeSearch" />
						</view>
						<view v-if="show" class="search-submit" @click="closePopup">
							确定
						</view>
					</view>
					<scroll-view class="card-item" style="height: 800rpx;" scroll-y>
						<view class="" v-if="card.length>0">
							<view class="card-list" v-for="(item,index) in card"
								:class="item.type?'card-list-success':''" :key="index" @click="choiceCard(index)"
								v-if="item.name">
								{{item.name}}
							</view>
						</view>
						<view class="no-arr" v-else>
							<image :src="common.imgUrl('/static/images/no-cart.png')" mode="" />
							<text class="text">没有找到想要的</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "popus",
		props: {
			cid: {
				type: Number
			}
		},
		data() {
			return {
				popup: false,
				show: true,
				search: '',
				card: [],
				cards: []
			};
		},
		created() {
			if (this.$route.query.search == 'true') {
				this.popup = true
			}
		},
		methods: {
			getCard() {
				this.$axios({
					url: this.$url[9],
					data: {}
				}).then((data) => {
					if (data.code == 0) {
						const res = data.data.data
						let typeList = [];
						for (let i = 0; i < res.length; i++) {
							typeList.push({
								id: res[i].id,
								name: res[i].name,
								type: false,
							});
						}
						if (this.cid > 0) {
							for (let i = 0; i < res.length; i++) {
								if (typeList[i].id == this.cid) {
									typeList[i].type = true
								}

							}
						}

						this.cards = typeList
						this.card = typeList;
					}
				})
			},
			choiceCard(index) {
				this.card = this.card.map((item, idx) => {
					if (idx !== index) {
						item.type = false
					}
					return item
				})
				this.card[index].type = !this.card[index].type
			},
			changeSearch(e) {
				this.card = this.cards.filter((v) => {
					return !this.search || v.name.indexOf(this.search) > -1
				})

				if (this.card) {
					if (this.card.length == 0) {
						this.show = false
					} else {
						this.show = true
					}
				}
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.popup = true
				this.getCard()
			},
			closePopup() {
				let data = {
					id: 0,
					name: ''
				}
				this.card.forEach(res => {
					if (res.type) {
						data = res
					}
				})
				this.$emit('card', data)
				if (this.card.length == 0) {
					this.getCard()
				}
				this.popup = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-placeholder {
		font-size: 28rpx;
		line-height: 1;
	}

	.no-arr {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 100rpx;
		text-align: center;
	}

	.text {
		margin-top: 20rpx;
		display: block;
		color: #989898;
	}

	.no-arr>image {
		width: 554rpx;
		height: 326rpx;
		object-fit: cover;
	}

	.card-search {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40upx;
	}

	.search-input {
		width: 75%;
		background: rgb(245, 245, 245);
		border-radius: 14upx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 16upx;
	}

	.search-input>input {
		width: 90%;
		padding-left: 10rpx;
		font-size: 28rpx;
	}

	/* 	.card-item{display: flex;} */
	.card-list {
		float: left;
		padding: 8upx 40upx;
		background: #E9E9E9;
		border: 1px solid #E9E9E9;
		border-radius: 14upx;
		line-height: 1;
		color: rgba(0, 0, 0, .9);
		margin: 0 20upx 20upx 0;
	}

	.card-list-success {
		background: #2f6bdd33;
		border: 1px solid $project-color;
		color: $project-color;
	}

	.search-submit {
		display: inline-block;
		padding: 10upx 30upx;
		border-radius: 14upx;
		background: #FF5E00;
		font-weight: 700;
		color: #fff;
	}

	.popup-mark {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
	}

	.popup-item {
		padding: 10rpx 10rpx 10rpx;
	}

	.list-item {
		padding: 20rpx;
		left: 0rpx;
		right: 0rpx;
		bottom: 0;
		background: #fff;
		z-index: 99;
		border-radius: 20upx 20upx 0 0;
	}

	.popup-list {
		display: flex;
		padding: 20rpx;
		background: #fff;
		border-radius: 10rpx;
		justify-content: space-between;
		margin-top: 10rpx;
	}

	.card-add {
		padding: 12rpx 22upx;
		background: #E9E9E9;
		border-radius: 14upx;
		line-height: 1;
		color: #B1ACAC;
		margin-bottom: 10rpx;
	}
</style>
