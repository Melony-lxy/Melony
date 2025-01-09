<template>
	<view class="u-waterfall">
		<view id="u-left-column" class="u-column" v-if="leftList">
			<view v-for="(item, index) in leftList" :key="index">
				<view class="list listL" style="width: 98%;" data-class="listL">
					<view class="list-image" @tap.stop="details(item.id)">
						<image class="image-text" :src="common.imgUrl(item.file[0])" mode="aspectFill"
							lazy-load="true" v-if="item.video_url==null" />
						<image class="image-text"
							:src="common.imgUrl(item.video_url)+'?x-oss-process=video/snapshot,t_1000,m_fast' "
							mode="aspectFill" lazy-load="true" v-else />
					</view>
					<view class="list-text">
						<view class="list-title" @tap.stop="details(item.id)">
							{{ item.title }}
						</view>
						<view class="list-user" v-if="item.user">
							<view class="list-user-l" @tap.stop="godetails(item)">
								<image class="list-user-images" :src="common.imgUrl(item.user.avatar_url)"
									mode="aspectFill" lazy-load="true" />
								<view class="list-user-nick list-user-width">
									{{ item.user.nick }}
								</view>
							</view>
							<view class="list-user-l">
								<view v-if="item.user.user_status" @click="pressEdit(item.id)">
									<u-icon name="more-dot-fill" style="margin-right: 10rpx;" />
								</view>
								<view v-else class="align-center" @click="fabulous(item)">
									<!-- <u-icon name="play-circle" style="margin-right: 10rpx;" /> -->
									<image v-if="!item.like_status" class="img" :src="common.imgUrl('/static/case/blove.png')"
										mode=""></image>
									<image v-else class="img" :src="common.imgUrl('/static/case/blove2.png')" mode="">
									</image>
									<view class="list-user-nick">
										{{ item.like_count }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view id="u-right-column" class="u-column" v-if="rightList">
			<view v-for="(item, index) in rightList" :key="index"
				style="display: flex;justify-content: flex-end">
				<view class="list listR" data-class="listR" style="width: 98%;">
					<view class="list-image" @tap.stop="details(item.id)">
						<image class="image-text" :src="common.imgUrl(item.file[0])" mode="aspectFill"
							lazy-load="true" v-if="item.video_url==null" />
						<image class="image-text"
							:src="common.imgUrl(item.video_url)+'?x-oss-process=video/snapshot,t_1000,m_fast' "
							mode="aspectFill" lazy-load="true" v-else />
					</view>
					<view class="list-text">
						<view class="list-title" @tap.stop="details(item.id)">
							{{ item.title }}
						</view>
						<view class="list-user" v-if="item.user">
							<view class="list-user-l" @tap.stop="godetails(item)">
								<image class="list-user-images" :src="common.imgUrl(item.user.avatar_url)"
									mode="aspectFill" lazy-load="true" />
								<view class="list-user-nick list-user-width">
									{{ item.user.nick }}
								</view>
							</view>
							<view class="list-user-l">
								<view v-if="item.user.user_status" @click="pressEdit(item.id)">
									<u-icon name="more-dot-fill" style="margin-right: 10rpx;" />
								</view>
								<view v-else class="align-center" @click="fabulous(item)">
									<!-- <u-icon name="play-circle" style="margin-right: 10rpx;" /> -->
									<image v-if="!item.like_status" class="img" :src="common.imgUrl('/static/case/blove.png')"
										mode=""></image>
									<image v-else class="img" :src="common.imgUrl('/static/case/blove2.png')" mode="">
									</image>
									<view class="list-user-nick">
										{{ item.like_count }}
									</view>
								</view>
			
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * waterfall 瀑布流
 * @description 这是一个瀑布流形式的组件，内容分为左右两列，结合uView的懒加载组件效果更佳。相较于某些只是奇偶数左右分别，或者没有利用vue作用域插槽的做法，uView的瀑布流实现了真正的 组件化，搭配LazyLoad 懒加载和loadMore 加载更多组件，让您开箱即用，眼前一亮。
 * @tutorial https://www.uviewui.com/components/waterfall.html
 * @property {Array} flow-list 用于渲染的数据
 * @property {String Number} add-time 单条数据添加到队列的时间间隔，单位ms，见上方注意事项说明（默认200）
 * @example <u-waterfall :flowList="flowList"></u-waterfall>
 */
	import {
		TYPE,
		STATUS
	} from "@/plugin/communication.js";
	import {verifyLogin} from '@/plugin/api/index.js'
export default {
	name: "u-waterfall",
	props: {
		judgeWhich: Number,
		uid: Number,
		value: {
			// 瀑布流数据
			type: Array,
			required: true,
			default: function() {
				return [];
			}
		},
		// 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
		// 单位ms
		addTime: {
			type: [Number, String],
			default: 200
		},
		// id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{idx: 22, name: 'lisa'}
		// 那么该把idKey设置为idx
		idKey: {
			type: String,
			default: 'id'
		}
	},
	data() {
		return {
			leftList: [],
			rightList: [],
			tempList: [],
			children: [],
			show: true,
			shows: true,
			flowList: [],
			colCount: 2,
			isLogin:false
		}
	},
	onShow() {
		
	},	
	watch: {
		copyFlowList(nVal, oVal) {
			// 取差值，即这一次数组变化新增的部分
			let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
			// 拼接上原有数据
			this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
			this.splitData();
		}
	},
	mounted() {
		verifyLogin().then(res => {
			if (res.code == 0) {
				this.isLogin = true
			}else{
				this.isLogin = false
			}
		})
		this.tempList = this.cloneData(this.copyFlowList);
		this.splitData();
	},
	computed: {
		// 破坏flowList变量的引用，否则watch的结果新旧值是一样的
		copyFlowList() {
			return this.cloneData(this.value);
		}
	},
	methods: {
		async splitData() {
			if (!this.tempList.length) return;
			let leftRect = await this.$uGetRect('#u-left-column');
			let rightRect = await this.$uGetRect('#u-right-column');
			// 如果左边小于或等于右边，就添加到左边，否则添加到右边
			let item = this.tempList[0];
			// 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
			// 数组可能变成[]，导致此item值可能为undefined
			if(!item) return ;
			if (leftRect.height < rightRect.height) {
				this.leftList.push(item);
			} else if (leftRect.height > rightRect.height) {
				this.rightList.push(item);
			} else {
				// 这里是为了保证第一和第二张添加时，左右都能有内容
				// 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
				if (this.leftList.length <= this.rightList.length) {
					this.leftList.push(item);
				} else {
					this.rightList.push(item);
				}
			}
			// 移除临时列表的第一项
			this.tempList.splice(0, 1);
			// 如果临时数组还有数据，继续循环
			if (this.tempList.length) {
				setTimeout(() => {
					this.splitData();
				}, this.addTime)
			}else{
				console.log(this.leftList)
				console.log(this.rightList)
			}
		},
		// 复制而不是引用对象和数组
		cloneData(data) {
			return JSON.parse(JSON.stringify(data));
		},
		// 清空数据列表
		clear() {
			this.leftList = [];
			this.rightList = [];
			// 同时清除父组件列表中的数据
			this.$emit('input', []);
			this.tempList = [];
		},
		// 清除某一条指定的数据，根据id实现
		remove(id) {
			// 如果findIndex找不到合适的条件，就会返回-1
			let index = -1;
			index = this.leftList.findIndex(val => val[this.idKey] == id);
			if(index != -1) {
				// 如果index不等于-1，说明已经找到了要找的id，根据index索引删除这一条数据
				this.leftList.splice(index, 1);
			} else {
				// 同理于上方面的方法
				index = this.rightList.findIndex(val => val[this.idKey] == id);
				if(index != -1) this.rightList.splice(index, 1);
			}
			// 同时清除父组件的数据中的对应id的条目
			index = this.value.findIndex(val => val[this.idKey] == id);
			if(index != -1) this.$emit('input', this.value.splice(index, 1));
		},
		godetails(item) {
				if(this.isLogin){
					uni.navigateTo({
						url: "/packgeA/PersonalCenter/PersonalCenter?uid=" + item.user.id
					})
				}else{
					uni.showToast({
						icon: "none",
						title: '请登录',
						position: "bottom",
					});
					setTimeout((res) => {
						uni.reLaunch({
							url: "/packgeA/login/login",
						});
					}, 1000);
				}
			},
			// 编辑和删除
			pressEdit(id) {
				this.$emit('pressEdit', id)
			},
			details(index) {
				if (this.judgeWhich == undefined || this.judgeWhich == 0) {
					uni.navigateTo({
						url: "/packgeA/case/caseDetails/caseDetails?id=" + index,
						animationType: 'slide-in-bottom',
						animationDuration: 300
					});
				} else if (this.judgeWhich == 3) {
					uni.navigateTo({
						url: "/packgeA/case/videoplay?id=" + index,
						animationType: 'slide-in-bottom',
						animationDuration: 300
					});
				} else if (this.judgeWhich == 2) {
					uni.navigateTo({
						url: `/packgeA/case/videoplay?id=${index}&uid=${this.uid}`,
						animationType: 'slide-in-bottom',
						animationDuration: 300
					});
				} else if (this.judgeWhich == 4) {
					uni.navigateTo({
						url: "/packgeA/worksDetail/worksDetail?id=" + index,
						animationType: 'slide-in-bottom',
						animationDuration: 300
					});
				}
				// console.log(index)
			},
			fabulous(item) {
				if (this.like_status == true) {
					this.shows = false;
				} else {
					this.shows = true;
				}
				let changeStatus = 0;
				if (item.like_status) {
					changeStatus = 1;
				}
				this.$axios({
					url: this.$url[51],
					data: {
						id: item.id,
						type: TYPE.COMMUNICATION,
						status: STATUS.LIKE,
						changeStatus: changeStatus,
					}
				}).then((res) => {
					if (res.code == 0) {
						if (item.like_status) {
							uni.showToast({
								title: '取消点赞成功',
								icon: 'none'
							})
							item.like_count--;
						} else {
							uni.showToast({
								title: '点赞成功',
								icon: 'none'
							})
							item.like_count++;
						}
						item.like_status = !item.like_status
					}
				})
			},
		// 修改某条数据的某个属性
		modify(id, key, value) {
			// 如果findIndex找不到合适的条件，就会返回-1
			let index = -1;
			index = this.leftList.findIndex(val => val[this.idKey] == id);
			if(index != -1) {
				// 如果index不等于-1，说明已经找到了要找的id，修改对应key的值
				this.leftList[index][key] = value;
			} else {
				// 同理于上方面的方法
				index = this.rightList.findIndex(val => val[this.idKey] == id);
				if(index != -1) this.rightList[index][key] = value;
			}
			// 修改父组件的数据中的对应id的条目
			index = this.value.findIndex(val => val[this.idKey] == id);
			if(index != -1) {
				// 首先复制一份value的数据
				let data = this.cloneData(this.value);
				// 修改对应索引的key属性的值为value
				data[index][key] = value;
				// 修改父组件通过v-model绑定的变量的值
				this.$emit('input', data);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-waterfall {
	@include vue-flex;
	flex-direction: row;
	align-items: flex-start;
	margin: 0 5px;
}

.u-column {
	@include vue-flex;
	flex: 1;
	flex-direction: column;
	height: auto;
}

.u-image {
	width: 100%;
}
	.align-center image {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.radio-flex {
		display: flex;
		align-items: center;
	}

	.radio {
		width: 6rpx;
		height: 6rpx;
		margin-right: 6rpx;
		background-color: #999;
		border-radius: 50%;
	}

	.list-user-width {
		width: 120upx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.list-user-nick {
		color: rgb(128,129,131);
		font-size: 22upx;
	}

	.list-user {
		padding: 14upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.list-user-l {
		display: flex;
		align-items: center;
	}

	.list-user-image {
		width: 32upx;
		height: 32upx;

	}

	.list-user-images,
	.list-user-image {
		border-radius: 50%;
		margin-right: 10upx;
	}

	.list-user-images {
		width: 36upx;
		height: 36upx;
		box-shadow: 0 3upx 10upx #00000010;
	}

	.list-text {
		padding: 0 26upx;
	}

	.lock>image {
		width: 18.46upx;
		height: 18.56upx;
		margin-right: 13upx;
	}

	.lock-img {
		display: inline-block;
	}

	.lock {
		width: 140px;
		margin: 14upx 0 0;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		display: inline-block;
		padding: 6upx 13upx;
		background: rgba(255, 238, 228, 1);
		border-radius: 6upx;
		line-height: 1.2;
		/* 		border: 1px solid rgba(255, 94, 0, 1); */
		color: rgba(255, 94, 0, 1);
		font-size: 20upx;
	}

	.list-title {
		color: rgba(26, 36, 48, 1);
		padding: 14upx 0 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		font-weight: 700;
		/* 		white-space: nowrap;
		text-overflow: ellipsis; */
		font-size: 30rpx;
		-webkit-box-orient: vertical;
		overflow: hidden;
		box-sizing: border-box;
		/* 		max-height: 134rpx; */
	}

	.list-bottom {
		margin-top: 0;
	}

	.align-center {
		display: flex;
		align-items: center;
	}

	.list-bottom uni-view {
		line-height: normal;
	}

	.main-wrap {
		display: flex;
		/* 	flex-wrap: wrap; */
	}


	.list {
		margin-top: 20upx;
		position: relative;
		border-radius: 5px;
		overflow: hidden;
		transition: 1.3s;

		box-shadow: 0 3upx 10upx #00000005;
	}

	.image-text {
		vertical-align: bottom;
		background: #e6e6e6;
		width: 100%;
		object-fit: cover;
		max-height: 400rpx;
		border-radius: 3upx 3upx 0 0;
		overflow: hidden;
	}

	.list {
		background: #fff;
	}

	.type {
		position: absolute;
		bottom: 5px;
		left: 20upx;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		font-size: 20upx;
		padding: 0 20upx;
		border-radius: 10px;
	}


	.nickname {
		font-size: 14px;
		margin-left: 9upx;
		color: #999;
	}

	.title {
		line-height: 1;
		font-size: 30upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 30upx 0;
	}
</style>
