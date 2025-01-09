<template>
	<view>
		<view class="align-center">
			<view class="title" @click="timeShow()">
				{{ date }}
				<img :src="common.imgUrl('/static/images/round.png')" alt="" />
			</view>
		</view>
		<view class="info space-between align-center">
			<view class="info-left align-center">
				<image :src="common.imgUrl(user.avater_url)" mode=""></image>
				<view class="">
					<view class="name">{{ user.nick }}</view>
					<view class="mechanism">{{ user.org }}</view>
				</view>
			</view>
			<view class="" @click="toClass">
				<view class="flexsCenter">
					<u-icon name="order" class="icon" size="40" color="#989898"></u-icon>
				</view>
				<view class="toClass">进入课表</view>
			</view>
		</view>
		<view class="signCenter">
			<view class="centerTop flex">
				<view class="record" :style="day.id === item.id ? 'border: 2rpx solid #FF6638;' : ''"
					v-for="(item, index) in recordList" :key="index" v-if="index < 2" @click="changeDay(item,'null')">
					<view class="recordName">{{ item.name }}</view>
					<view class="align-center">
						<view class="miss" v-if="item.status == 1">缺卡</view>
						<u-icon name="checkmark-circle-fill" color="#FF6638" size="32" class="icon"
							v-if="item.status == 0"></u-icon>
						{{ item.time + (item.status == 0 ? "已打卡" : "") }}
					</view>
				</view>
				<view class="arrow flex-center" v-if="recordList.length > 2" @click="showRecord">
					<u-icon name="arrow-down" color="#989898" size="24"></u-icon>
				</view>
			</view>
			<view class="centerBottom">
				<view class="flex-center">
					<view class="sign" @click="sign" :style="
              day.id > 0 || day.status != 1
                ? ''
                : 'background: #989898;box-shadow: none'
            ">
						<view class="">{{ day.signTime ? "已" : "" }}签到打卡</view>
						<view class="time">{{ day.signTime ? day.signTime : time }}</view>
					</view>
				</view>
				<view class="address flex-center">
					<u-icon name="map" color="#FF6638" size="32" class="icon"></u-icon>
					课程打卡: {{ address }}
				</view>
				<view v-if="day.id > 0" class="lastRess" @click="goGeturl(day.order_id)">
					<view class="address flex-center">课程: {{ day.name }}</view>
					<view class="address flex-center">时间: {{ day.time }}</view>
				</view>
			</view>
		</view>
		<signTab current="0"></signTab>
		<u-popup v-model="recordPopup" mode="center" width="690" border-radius="10">
			<view class="popupCenter">
				<view class="align-center">
					<view class="popupTitle">
						{{ date }}
						<u-icon name="arrow-down-fill" color="#FF6638" class="icon" size="22"></u-icon>
					</view>
				</view>
				<view class="popupRecord flex flex-wrap">
					<view class="record-item" :style="day.id === item.id ? 'border: 2rpx solid #FF6638;' : ''"
						@click="changeDay(item,index)" v-for="(item, index) in recordList" :key="index">
						<view class="recordName">{{ item.name }}</view>
						<view class="align-center">
							<view class="miss" v-if="item.status == 1">缺卡</view>
							<u-icon name="checkmark-circle-fill" color="#FF6638" size="32" class="icon"
								v-if="item.status == 0"></u-icon>
							{{ item.time + (item.status == 0 ? "已打卡" : "未打卡") }}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-picker mode="time" v-model="startTimeShow" :params="params" @confirm="timeConfirm"></u-picker>
	</view>
</template>
<script>
	import QQMapWX from "@/plugin/qqmap-wx-jssdk.js";
	import signTab from "@/packgeA/components/signTabbar.vue";
	import {
		getLatitude
	} from "@/plugin/api/index.js";
	export default {
		components: {
			signTab,
		},
		data() {
			return {
				qqMap: new QQMapWX({
					key: "B4UBZ-E63CQ-7X35P-GZBDW-V76FT-JABBC",
					vm: this,
				}),
				recordPopup: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
				},
				recordList: [],
				date: "",
				time: "",
				startTimeShow: false,
				timer: null,
				user: {
					nick: "",
					org: "",
					avater_url: "",
				},
				day: {
					id: 0,
					order_id: 0,
					name: "",
					time: "",
					status: 0,
					signTime: "",
				},
				now: "",
				address: "",
				latitude: "",
				longitude: "",
			};
		},
		onLoad() {
			this.date =
				new Date().getFullYear() +
				"-" +
				(new Date().getMonth() + 1) +
				"-" +(new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate());
			console.log(this.date)
			this.now = this.date;
			this.getClassDayList();
			let member_id = uni.getStorageSync('peoplenumber');
			if (member_id == 0) {
				this.$axios({
					url: this.$url[6],
				}).then((res) => {
					if (res.code == 0) {
						this.user = res.data;
						this.user.avater_url = res.data.avatar_url
					}
				});
			} else {
				this.$axios({
					url: this.$url[88],
					data: {
						member_id
					}
				}).then((res) => {
					if (res.code == 0) {
						this.user = res.data;
						this.user.avater_url = res.data.avatar_url
					}
				});
			}
			this.timer = setInterval(() => {
				this.getNowTime();
			});
			this.wxConfig();
		},
		onUnload() {
			clearInterval(this.timer);
		},
		methods: {
			wxConfig() {
				const _this = this;
				uni.getLocation({
					//type: "gcj02",
					success: (res) => {
						// #ifdef  APP-PLUS
						_this.latitude = res.latitude;
						_this.longitude = res.longitude;
						getLatitude({
							latitude:res.latitude,
							longitude :res.longitude
						}).then(data=>{
							let address_component=data.data.address_component
							_this.address=`${address_component.city}${address_component.district}${address_component.street}`
						})
						// #endif
						
						// #ifndef APP-PLUS
						_this.latitude = res.latitude;
						_this.longitude = res.longitude;
						_this.qqMap.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude,
							},
							success: (res) => {
								console.log(res);
								_this.address = res.result.address;
							},
							fail(err) {
								console.log(err);
							},
						});
						// #endif

					},
					fail() {
						uni.showToast({
							icon: "none",
							title: "请允许获取您的地理位置，否则部分功能不能使用",
							duration: 2000,
						});
					},
				});
			},
			//课程跳转
			goGeturl(id) {
				console.log(id, "dajksdlajsoij");
				uni.navigateTo({
					url: "/packgeB/liveDetails/liveDetails?id=" + id,
				});
			},
			timeShow() {
				this.startTimeShow = true;
			},
			timeConfirm(value) {
				this.date = value.year + "-" + value.month + "-" + value.day;
				this.getClassDayList();
			},
			changeDay(item,index) {
				let list=[]
				this.day = {
					id: item.id,
					order_id: item.order_id,
					name: item.course_name + "-" + item.name,
					time: item.start_time.split(" ")[1] + "-" + item.end_time,
					status: item.signInstatus,
					signTime: item.signTime ? item.signTime.split(" ")[1] : "",
				};
				if(index!='null'){
					list=this.recordList[index]
					this.recordList[index]=this.recordList[0]
					this.recordList[0]=list
					this.recordPopup = false;
				}
			},
			// 获取当天的课表课节
			getClassDayList() {
				this.common.loading();
				let member_id = uni.getStorageSync('peoplenumber');
				this.$axios({
					url: this.$url[28],
					data: {
						query: {
							time: this.date,
							member_id:member_id
						},
					},
				}).then((res) => {
					let status = false;
					if (res.data.data.length > 0) {
						const item = res.data.data[0];
						this.day = {
							id: item.id,
							order_id: item.order_id,
							name: item.course_name + "-" + item.name,
							time: item.start_time.split(" ")[1] + "-" + item.end_time,
							status: item.signInstatus,
							signTime: item.signTime ? item.signTime : "",
						};
					} else {
						this.$axios({
							url: this.$url[61],
							data: {
								date: this.date,
								member_id:member_id
							},
						}).then((res) => {
							this.day = {
								id: 0,
								order_id: 0,
								name: "",
								time: "",
								status: res.time ?
									0 :
									new Date(this.now) == new Date(this.date) ?
									2 :
									1,
								signTime: res.time ? res.time : "",
							};
						});
					}
					res.data.data.forEach((item) => {
						item.name = item.course_name + "-" + item.name;
						item.status = item.signInstatus;
						item.time = "上课" + item.start_time.split(" ")[1];
						if (!status && item.signInstatus > 0) {
							this.day = {
								id: item.id,
								order_id: item.order_id,
								name: item.course_name + "-" + item.name,
								time: item.start_time.split(" ")[1] + "-" + item.end_time,
								status: item.signInstatus,
								signTime: "",
							};
							status = true;
						}
					});
					this.recordList = res.data.data;
					uni.hideLoading();
				});
			},
			toClass() {
				uni.switchTab({
					url: "/pages/timetable/timetable",
				});
			},
			showRecord() {
				this.recordPopup = true;
			},
			sign() {
				if (this.day.id > 0 || this.day.status != 1) {
					if (this.day.id === 0 && this.recordList.length > 0) {
						this.$u.toast("请选择课程");
						return;
					}
					if (this.day.status === 0) {
						this.$u.toast("已签到，请勿重复签到");
						return;
					}
					if (new Date(this.now) < new Date(this.date)) {
						this.$u.toast("未到签到时间");
						return;
					}
					let member_id = uni.getStorageSync('peoplenumber');
					const _this = this;
					uni.showModal({
						title: "提示",
						content: "确认签到吗?",
						success: function(res) {
							if (res.confirm) {
								_this.common.loading();
								_this
									.$axios({
										url: _this.$url[60],
										data: {
											member_id:member_id,
											date: _this.date,
											day_id: _this.day.id,
											address: _this.address,
											latitude: _this.latitude,
											longitude: _this.longitude,
										},
									})
									.then((res) => {
										_this.getClassDayList();
										uni.vibrateLong();
										uni.hideLoading();
									});
							}
						},
					});
				}
			},
			getNowTime() {
				let dateTime;
				let hh = new Date().getHours();
				let mf =
					new Date().getMinutes() < 10 ?
					"0" + new Date().getMinutes() :
					new Date().getMinutes();
				let ss =
					new Date().getSeconds() < 10 ?
					"0" + new Date().getSeconds() :
					new Date().getSeconds();
				dateTime = hh + ":" + mf + ":" + ss;
				// console.log(dateTime)
				this.time = dateTime;
			},
		},
	};
</script>
<style scoped lang="scss">
	page {
		background: rgba(243, 243, 243, 0.39);
	}

	.miss {
		color: #ff6638;
		margin-right: 10rpx;
	}

	.title {
		width: 100%;
		line-height: 80rpx;
		background-color: #ffffff;
		padding-left: 30rpx;
		color: #181818;
		font-size: 32rpx;
		border-top: 1rpx solid #f3f3f3;

		img {
			width: 20rpx;
			height: 20rpx;
			margin-left: 10rpx;
			margin-top: 6rpx;
		}
	}

	.info {
		margin: 30rpx;
		padding: 30rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 16rpx;

		.info-left {
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.name {
				font-size: 34rpx;
				color: #333333;
				margin-bottom: 10rpx;
			}

			.mechanism {
				font-size: 24rpx;
				color: #666666;
			}
		}

		.toClass {
			font-size: 22rpx;
			color: #989898;
			margin-top: 10rpx;
		}
	}

	.signCenter {
		margin: 0 30rpx 30rpx 30rpx;
		background-color: #ffffff;
		padding: 30rpx;
		border-radius: 16rpx;

		.record {
			padding: 30rpx 20rpx;
			background: #f8f8f8;
			color: #767676;
			width: 290rpx;
			font-size: 24rpx;
			border-radius: 10rpx;
			margin-right: 16rpx;

			.recordName {
				color: #191d1e;
				font-size: 26rpx;
				margin-bottom: 10rpx;
				font-weight: 500;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.icon {
				margin-right: 6rpx;
			}
		}

		.arrow {
			background: #f8f8f8;
			border-radius: 10rpx;
			width: 40rpx;
		}

		.centerBottom {
			margin-top: 140rpx;
			padding-bottom: 100rpx;

			.sign {
				width: 270rpx;
				height: 270rpx;
				border-radius: 50%;
				background: linear-gradient(180deg, #ff9a7c 0%, #ff6638 100%);
				box-shadow: 0px 10px 20px rgba(255, 102, 56, 0.3);
				color: #ffffff;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.time {
					margin-top: 10rpx;
					opacity: 0.6;
				}
			}

			.address {
				color: #191d1e;
				font-size: 26rpx;
				margin-top: 84rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.lastRess {
				.address {
					margin-top: 20rpx;
				}
			}
		}
	}

	.popupCenter {
		padding: 30rpx 20rpx;

		.popupTitle {
			font-size: 28rpx;
			color: #f8f8f8;
			font-weight: 500;

			.icon {
				margin-left: 10rpx;
			}
		}

		.popupRecord {
			margin-top: 30rpx;

			.record-item {
				padding: 30rpx 20rpx;
				background: #f8f8f8;
				color: #767676;
				width: 270rpx;
				font-size: 24rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;

				.recordName {
					color: #191d1e;
					font-size: 26rpx;
					margin-bottom: 10rpx;
					font-weight: 500;
				}

				.miss {
					color: #ff6638;
					margin-right: 10rpx;
				}

				.icon {
					margin-right: 6rpx;
				}

				&:nth-child(2n) {
					margin-right: 0;
				}
			}
		}
	}
</style>
