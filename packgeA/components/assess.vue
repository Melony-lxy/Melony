<template>
	<view>
		<view class="flex assess-list">
			<image
				:src="common.imgUrl(list.user.avatar_url)"
				mode=""
				class="assess-head-portrait"
				@click="gocenter(list)"
			></image>
			<!-- @tap="other(list.uid)" -->
			<!-- @tap="focusEvent(list.id)" -->
			<!-- @longtap="actionSheet(list)" -->
			<view class="middle" >
				<view class="assess-nickname">{{ list.user.nick }}</view>
				<view class="assess-tiem">{{ list.time }}</view>
				<view class="assess-content">
					{{ list.content }}
					<template v-if="list.assessList">
						<block v-for="(item, index) in list.assessList" :key="index">
							<view class="flex assess-list" style="border:none">
								<image
									:src="common.imgUrl(item.user.avatar_url)"
									mode=""
									class="assess-head-portrait"
									@tap.stop="other(item.uid)"
								></image>
								<view class="middle" @longtap.stop="actionSheet(list)">
									<view class="assess-nickname">{{ item.user.nick }}</view>
									<view class="assess-tiem">{{ item.time }}</view>
									<view class="assess-content">{{ item.content }}</view>
								</view>
								<view
									class="flex"
									style="height: 34px;"
									@tap="likeEvent(item.id)"
									:style="[item.like_status ? { color: '#4B72DF' } : '']"
								>
									<text class="heat" :style="[item.like_status ? { color: '#4B72DF' } : '']">
										{{ item.like }}
									</text>
									<view class="iconfont icon-aixin"></view>
								</view>
							</view>
						</block>
					</template>
				</view>
			</view>
			<!-- <view class="assess-right"> -->
			<!-- 				<view class="flex" style="height: 34px;" @tap="likeEvent(list.id)"
					:style="[list.like_status ? {color:'#4B72DF'}:'']">
					<text class="heat" :style="[list.like_status ? {color:'#4B72DF'}:'']">{{list.like}}</text>
					<view class="iconfont icon-aixin"></view>
				</view> -->
			<!-- <uniIcons color="#333" type="more-filled" size="27" @tap="actionSheet(list.id)"></uniIcons> -->
			<!-- 			</view> -->
		</view>
	</view>
</template>

<script>
import { TYPE, STATUS } from '@/plugin/communication.js'
import uniIcons from '@/components/uni-icons.vue'
export default {
	props: {
		assessList: {
			type: Object
		}
	},
	components: {
		uniIcons
	},
	data() {
		return {
			list: {
				user: {}
			}
		}
	},
	mounted() {
		this.loadData()
	},
	watch: {
		assessList() {
			this.loadData()
		}
	},
	methods: {
		gocenter(i){
			uni.navigateTo({
				url:'/packgeA/PersonalCenter/PersonalCenter?uid='+i.uid
			})
		},
		actionSheet(data) {
			let itemList = []
			if (data.user_status) {
				itemList = ['回复', '删除']
			} else {
				itemList = ['回复']
			}
			let _this = this
			uni.showActionSheet({
				itemList,
				itemColor: '#000',
				success: function(res) {
					if (res.tapIndex === 0) {
						_this.focusEvent(data.id)
					} else if (res.tapIndex === 1) {
						this.$axios({
							url: this.$url[54],
							data: {
								id: data.id
							}
						})
							.then(res => {
								if (res.code == 0) {
									_this.$emit('refresh')
									uni.showToast({
										title: '删除评论成功',
										icon: 'none'
									})
								}
							})
							.catch(err => {
								return false
							})
					}
				},
				fail: function(err) {
					console.log(err.errMsg)
				}
			})
			return false
		},
		loadData() {
			this.list = this.assessList
		},
		focusEvent(id) {
			this.$emit('focusEvent', id)
		},
		likeEvent(id) {
			let changeStatus = 0
			let status = false
			let idType = true
			let index = 0
			if (this.list.id == id) {
				status = this.list.like_status
			} else {
				idType = false
				if (this.list.assessList) {
					this.list.assessList.forEach((item, i) => {
						if (item.id == id) {
							index = i
							status = item.like_status
						}
					})
				}
			}
			if (status) {
				changeStatus = 1
			}
			this.$axios({
				url: this.$url[51],
				data: {
					id: id,
					type: TYPE.COMMENT,
					status: STATUS.COLLECTION,
					changeStatus: changeStatus
				}
			}).then(res => {
				if (res.code == 0) {
					if (changeStatus == 1) {
						uni.showToast({
							title: '取消点赞成功',
							icon: 'none'
						})
						if (idType) {
							this.list.like--
						} else {
							this.list.assessList[index].like--
						}
					} else {
						uni.showToast({
							title: '点赞成功',
							icon: 'none'
						})
						if (idType) {
							this.list.like++
						} else {
							this.list.assessList[index].like++
						}
					}
					if (idType) {
						this.list.like_status = !this.list.like_status
					} else {
						this.list.assessList[index].like_status = !this.list.assessList[index].like_status
					}
				}
			})
		},
		other(id) {
			console.log(id)
			uni.navigateTo({
				url: '/pages/others-core/others-core?uid=' + id
			})
		}
	}
}
</script>

<style scoped>
.assess-list {
	/* margin: 10px 0; */
	border-top: 1px solid #e6e6e6;
	padding: 10px 0;
}

.assess-right {
	display: flex;
	justify-content: center;
	margin-left: 5px;
}

.assess-head-portrait {
	height: 72upx;
	width: 72upx;
	margin-top: 31upx;
	border-radius: 50%;
}

.middle {
	flex: 1;
	padding-left: 10px;
	line-height: 45upx;
}

.assess-nickname {
	font-size: 30upx;
	color: #666;
}

.assess-tiem {
	font-size: 22upx;
	color: #c7c7c7;
}

.assess-content {
	font-size: 26upx;
	color: #333;
}

.heat {
	font-size: 22upx;
	color: #c7c7c7;
	margin-top: 6px;
	margin-right: 4px;
}

.more {
	color: #333;
}
</style>
