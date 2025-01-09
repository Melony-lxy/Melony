<template>
	<view class="box">
		<!-- <view class="searchBox ">
			<searchList />
		</view> -->
		<view class="headBox space-between u-f-ac">
			<view class="flex u-f-ac">
				<image class="head" :src="common.imgUrl(listUrl.avatar_url)" mode="aspectFill"></image>
				<view class="headCenter">
					<view class="flex u-f-ac"> 
						<view class="name">{{ listUrl.nick }}</view>
						<!-- 						<view class="lable flexsCenter">
							<image class="lableIcon" :src="common.imgUrl('/static/my/icon10.png')" mode=""></image>
							<text class="lableName">萌新</text>
						</view> -->
					</view>
					<view class="classBox flex u-f-ac">
						<image class="classIcon" :src="common.imgUrl('/static/my/img4.png')" mode=""></image>
						<text class="class">
							{{ listUrl.school ? listUrl.school : '未填学校' }}
						</text>
					</view>
				</view>
			</view>
			<view class="personnel" @click="flag = true">
				<image class="setUp" :src="common.imgUrl('/static/growUp/addIcon.png')" mode=""></image>
				成员列表
			</view>
		</view>
		<view class="gorwup">
			<view class="upDate" :style="{
					'background-image': `url(${common.imgUrl('/static/images/growUp.png')})`
				}">
				<view>
					<image :src="common.imgUrl('/static/growUp/upIcon.png')" mode=""></image>
				</view>
				<view @click="choiceQuestion()">AI成长规划</view>
			</view>
			<view class="record" :style="{
					'background-image': `url(${common.imgUrl('/static/images/record.png')})`
				}">
				<view>
					<image :src="common.imgUrl('/static/growUp/recordIcon.png')" mode=""></image>
				</view>
				<view @click="personalHomepage()">成长记录</view>
			</view>
		</view>
		<!-- 旧版日历 -->
		<!-- 	<view>
		<uni-calendar style="height: 800rpx;" :insert="true" @change="selectChange()" :selected='selected' />
			<uni-calendar style="height: 504rpx;" :insert="true" @monthSwitch="monthChange" @change="selectChange"
				:selected='selected' />
		</view> -->
		<!-- 新日历 -->
		<view class="calendar">
			<zsyCalendar ref="myName" @change="change" dateActiveColor="#FF6638" :type="true" @picker="picker"
				:key="calendarTimeLoad" :selected='selected' v-if='selected.length!=0'/>
		</view>
		<u-calendar v-model="show" mode="date" @change="changepiker" active-bg-color="#FF6638" btn-type="success">
		</u-calendar>
		<!-- //课程列表 -->
		<view class="paddingBox">
			<view class="bgWhite keBox">
				<view>
					<uni-segmented-control :current="tabCurrent" :values="tabItems" @clickItem="onClickItem"
						styleType="button" activeColor="#FF6638"></uni-segmented-control>
					<view class="content">
						<view v-show="tabCurrent === 0">
							<nullData v-if="handwritingList.length == 0 && calssList.length == 0 && checkedlist.length == 0"
								:paddingTop="90" style="min-height: 600rpx;"></nullData>
							<view v-if="calssList">
								<view class="item flex u-f-ac" v-for="(item, index) in calssList" :key="index">
									<view class="selectQuan flex-center">
										<checkbox-group>
											<label>
												<checkbox value="cb" />
											</label>
										</checkbox-group>
									</view>
									<view class="flex-shrink space-between" @click="navUrl(item)">
										<view>
											<view class="itemName">
												{{ item.course_name }}-{{ item.name }}
												<view class="plan">课程</view>
											</view>
											<view class="time">
												<view class="n" style="width: 30rpx;height: 25rpx;float: left;margin-top: 5rpx;">
													<img :src="common.imgUrl('/static/images/time.png')" alt="" />
												</view>
												<view class="" style="width: 400rpx; margin-left: 35rpx;">
													{{ item.start_time }}
													<text style="margin-left: 36rpx;">第{{ item.index }}节</text>
												</view>
											</view>
										</view>
							
										<view class="statueBox" v-if="dataTime >= item.start_time && dataTime < item.end_time">
											上课中
										</view>
										<view class="statueBox" style="background: #999999;" v-if="dataTime > item.end_time">
											已结束
										</view>
										<view class="statueBox" style="background: #FEA406;" v-if="dataTime < item.start_time">
											未开始
										</view>
									</view>
								</view>
							</view>
							<!-- 手动添加计划 -->
							<view v-if="handwritingList">
								<view class="item flex u-f-ac" ref="li" v-for="(item, index) in handwritingList" :key="index">
									<!-- #ifdef H5 -->
									<view class="selectQuan flex-center">
										<checkbox-group @click="chackA(item, index)">
											<label>
												<checkbox disabled />
											</label>
										</checkbox-group>
										<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
									</view>
									<!-- #endif -->
									<!-- #ifdef APP -->
									<view class="selectQuan flex-center">
										<checkbox-group @click="chackA(item, index)">
											<label>
												<checkbox disabled />
											</label>
										</checkbox-group>
										<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
									</view>
									<!-- #endif -->
									<!-- #ifdef MP-WEIXIN -->
									<view class="selectQuan flex-center">
										<checkbox-group @click="chackA(item, index)">
											<label>
												<checkbox />
											</label>
										</checkbox-group>
										<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
									</view>
									<!-- #endif -->
									<view class="flex-shrink space-between" style="width: 200rpx;" @click="planDetails(item)">
										<view>
											<view class="itemName">
												{{ item.plan_title }}
												<view class="plan">计划</view>
											</view>
											<view class="time">
												<view class="n" style="width: 30rpx;height: 25rpx;float: left;margin-top: 5rpx;">
													<img :src="common.imgUrl('/static/images/time.png')" alt="" />
												</view>
												<view style="width: 500rpx; margin-left: 35rpx;">{{ item.remind_time }}</view>
											</view>
											<!-- <view class="itemName" style="margin-top: 15rpx;">{{ item.content }}</view> -->
										</view>
									</view>
							
									<icon :type="del" size="18" @click="removeitem(item, index)" />
								</view>
							</view>
						</view>
						<view v-show="tabCurrent === 1">
							<nullData v-if="handwritingList.length == 0 && calssList.length == 0 && checkedlist.length == 0"
								:paddingTop="90" style="min-height: 600rpx;"></nullData>
							<!-- 手动添加计划 -->
							<view v-if="handwritingList">
								<view class="item flex u-f-ac" ref="li" v-for="(item, index) in handwritingList" :key="index">
									<!-- #ifdef H5 -->
									<view class="selectQuan flex-center">
										<checkbox-group @click="chackA(item, index)">
											<label>
												<checkbox disabled />
											</label>
										</checkbox-group>
										<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
									</view>
									<!-- #endif -->
									<!-- #ifdef APP -->
									<view class="selectQuan flex-center">
										<checkbox-group @click="chackA(item, index)">
											<label>
												<checkbox disabled />
											</label>
										</checkbox-group>
										<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
									</view>
									<!-- #endif -->
									<!-- #ifdef MP-WEIXIN -->
									<view class="selectQuan flex-center">
										<checkbox-group @click="chackA(item, index)">
											<label>
												<checkbox />
											</label>
										</checkbox-group>
										<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
									</view>
									<!-- #endif -->
									<view class="flex-shrink space-between" style="width: 200rpx;" @click="planDetails(item)">
										<view>
											<view class="itemName">
												{{ item.plan_title }}
												<view class="plan">计划</view>
											</view>
											<view class="time">
												<view class="n" style="width: 30rpx;height: 25rpx;float: left;margin-top: 5rpx;">
													<img :src="common.imgUrl('/static/images/time.png')" alt="" />
												</view>
												<view style="width: 500rpx; margin-left: 35rpx;">{{ item.remind_time }}</view>
											</view>
											<!-- <view class="itemName" style="margin-top: 15rpx;">{{ item.content }}</view> -->
										</view>
									</view>
							
									<icon :type="del" size="18" @click="removeitem(item, index)" />
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="title">课程计划</view> -->
				<!-- <nullData v-if="handwritingList.length == 0 && calssList.length == 0 && checkedlist.length == 0"
					:paddingTop="90" style="min-height: 600rpx;"></nullData>
				<view v-if="calssList">
					<view class="item flex u-f-ac" v-for="(item, index) in calssList" :key="index">
						<view class="selectQuan flex-center">
							<checkbox-group>
								<label>
									<checkbox value="cb" />
								</label>
							</checkbox-group>
						</view>
						<view class="flex-shrink space-between" @click="navUrl(item)">
							<view>
								<view class="itemName">
									{{ item.course_name }}-{{ item.name }}
									<view class="plan">课程</view>
								</view>
								<view class="time">
									<view class="n" style="width: 30rpx;height: 25rpx;float: left;margin-top: 5rpx;">
										<img :src="common.imgUrl('/static/images/time.png')" alt="" />
									</view>
									<view class="" style="width: 400rpx; margin-left: 35rpx;">
										{{ item.start_time }}
										<text style="margin-left: 36rpx;">第{{ item.index }}节</text>
									</view>
								</view>
							</view>

							<view class="statueBox" v-if="dataTime >= item.start_time && dataTime < item.end_time">
								上课中
							</view>
							<view class="statueBox" style="background: #999999;" v-if="dataTime > item.end_time">
								已结束
							</view>
							<view class="statueBox" style="background: #FEA406;" v-if="dataTime < item.start_time">
								未开始
							</view>
						</view>
					</view>
				</view> -->
				
				<!-- //手动添加计划 -->
				<view v-if="checkedlist">
					<view class="item flex u-f-ac" ref="li" v-for="(item, index) in checkedlist" :key="index">
						<!-- #ifdef H5 -->
						<view class="selectQuan flex-center">
							<checkbox-group @click="chackA(item, index)">
								<label>
									<checkbox :checked="item.status ? true : false" disabled />
								</label>
							</checkbox-group>
							<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
						</view>
						<!-- #endif -->
						<!-- #ifdef APP -->
						<view class="selectQuan flex-center">
							<checkbox-group @click="chackA(item, index)">
								<label>
									<checkbox :checked="item.status ? true : false" disabled />
								</label>
							</checkbox-group>
							<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="selectQuan flex-center">
							<checkbox-group @click="chackA(item, index)">
								<label>
									<checkbox :checked="item.status ? true : false" />
								</label>
							</checkbox-group>
							<!-- <view class="paymentMethod-btn" @click="chackA(item, index)"></view> -->
						</view>
						<!-- #endif -->
						<view class="flex-shrink space-between" style="width: 200rpx;" @click="planDetails(item)">
							<view>
								<view class="itemName cur1">
									{{ item.plan_title }}
									<view class="plan">计划</view>
								</view>
								<view class="time">
									<view class="n" style="width: 30rpx;height: 25rpx;float: left;margin-top: 5rpx;">
										<img :src="common.imgUrl('/static/images/time.png')" alt="" />
									</view>
									<view class="" style="width: 500rpx; margin-left: 35rpx;">
										{{ item.remind_time }}
									</view>
								</view>
								<!-- <view class="itemName" style="margin-top: 15rpx;">{{ item.content }}</view> -->
							</view>
						</view>

						<icon :type="del" size="18" @click="removeitem(item, index)" />
					</view>
				</view>

				<u-popup v-model="show1" mode="bottom">
					<view class="" style="height:auto;background-color: red;opacity: 1;"></view>
					<view class="releasePlan">发布计划</view>
					<view style="width: 710rpx;height: 800rpx;margin-left: 20rpx;line-height: 72rpx;
				">
						计划：
						<u-input placeholder="请输入计划" v-model="newPlan" clearable></u-input>
						时间：
						<view class="example-body" v-model="newPlanTime">
							<uni-datetime-picker type="datetime" v-model="newPlanTime" />
						</view>
						备注：
						<u-input placeholder="请输入备注" v-model="newreMarks" clearable></u-input>
						类型：
						<view>
							<radio-group @change="changeType">
								<label class="radio" v-for="(item, index) in items" :key="item.value">
									<radio :value="item.value"  :checked='current==item.value'/>
									<span :class='{RadioDistance:index==0}'>{{item.name}}</span>
								</label>
							</radio-group>
						</view>
						<view class="button" @click="AddNew()" style="height: 100rpx;margin-top: 100rpx;">
							添加
						</view>
					</view>
				</u-popup>
			</view>
		</view>
		<view class="dynamic2" style="z-index:0" @click="show1 = true">
			<image :src="common.imgUrl('/static/dynamic/add.png')" mode=""></image>
		</view>
		<view class="dynamic" @tap="toSign">签到</view>
		<u-popup v-model="flag" mode="right">
			<view class="members">
				<template v-if="addMembers">
					<view class="membersList" v-for="(item, i) in addMembers" :key="i" :class="{ cur: whichone == i }">
						<view class="membersList-img" @click="coursePlan(item, i)">
							<img :src="common.imgUrl(item.portrait)" alt="" />
						</view>
						<view class="membersList-content" @click="coursePlan(item, i)">
							<view class="membersList-content1">
								<text class="xm">{{ item.name }}</text>
								<view class="mengxin" v-if="item.member_id != 0 && i != 0">已绑定</view>
							</view>
							<view class="membersList-content2" v-if="listUrl">
								<image :src="common.imgUrl('/static/my/img4.png')" alt="" style="float: left;margin-top: 17rpx;" />
								<p class="qunxing">{{ item.school ? item.school : '未填学校' }}</p>
							</view>
						</view>
						<view class="deleteModification" v-if="i != 0">
							<img :src="common.imgUrl('/static/images/print.png')" @click="memberDetails(item)" alt="" />
							<img :src="common.imgUrl('/static/images/delete.png')" @click="removeite(item)" alt="" />
						</view>
					</view>
				</template>
				<!-- #ifdef MP-WEIXIN -->
				<view class="members-footer"  @click="flags = true">我的分享</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="members-footer" @click="sharefriend()">我的分享</view>
				<!-- #endif -->
				<view class="members-footer1" @click="aiGrowUp()">添加新成员</view>
			</view>
		</u-popup>
		<u-popup v-model="flags" mode="center">
			<view class="arrow">
				<uni-icons type="arrow-up" size="80" color="white"></uni-icons>
			</view>
			 <view class="arrow-content">
			 	请点击此按钮进行分享
			 </view>
		</u-popup>
		<QrcodePoster ref="poster" title="千芒商汇俱乐部添加新成员" :headerImg="common.imgUrl('/static/images/people.jpg')" subTitle="" abImg=""
			:item="uid*1" type="id" :show='QrcodePoster' @show='showQrcodePoster'></QrcodePoster>
		<!-- <share :show="isShow" @hide="hide" :url="'caseShare?id='+id"></share> -->
	</view>
</template>
<script>
	import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'
	import share from '@/components/share/share.vue'
	import searchList from '../../components/searchList.vue'
	import zsyCalendar from '@/components/zsy-calendar/zsy-calendar'
	import {
		getTimeWeex
	} from '../../plugin/time.js'
	export default {
		components: {
			searchList,
			zsyCalendar,
			share,
			QrcodePoster
		},
		data() {
			return {
				array1: [
					'请选择',
					'小班',
					'大班',
					'学前班',
					'一年级',
					'二年级',
					'三年级',
					'四年级',
					'五年级',
					'六年级',
					'初一',
					'初二',
					'初三',
					'高一',
					'高二',
					'高三'
				],
				// isShow:false,
				del: 'clear',
				whichone: 0,
				datetimesingle: '',
				bool: false,
				flags : false,
				bool1: false,
				newPlan: '',
				newPlanTime: '',
				newreMarks: '',
				flag: false,
				calendarTimeLoad: new Date().getTime(), //判断是否需要重新加载
				addMembers: [{
						portrait: '/static/erzi1.png'
					},
					{
						portrait: '/static/nver1.png'
					},
					{
						portrait: '/static/erzi1.png'
					},
					{
						portrait: '/static/nver1.png'
					},
					{
						portrait: '/static/fuqin1.png'
					},
					{
						portrait: '/static/mom1.png'
					},
					{
						portrait: '/static/yeye1.png'
					},
					{
						portrait: '/static/nainai1.png'
					},
					{
						portrait: '/static/yeye1.png'
					},
					{
						portrait: '/static/nainai1.png'
					}
				],
				show: false,
				show1: false,
				listUrl: {
					nick: '',
					phone: '',
					avatar_url: ''
				},
				single: '2021-04-3',
				selected: [
					// {
					// 	date: '2022-03-14',
					// 	info: '有课',
					// 	color: 'red'
					// },
					// {
					// 	date: '2022-03-15',
					// 	info: '班课',
					// 	color: 'blue'
					// }
				],
				status: 0,
				calssList: [],
				handwritingList: [],
				checkedlist: [],
				whichone: [],
				times: getTimeWeex(0).yearMonth,
				day: getTimeWeex(0).day,
				page: 1,
				totalCount: 0,
				dataTime: getTimeWeex(0).time,
				member_id: 0,
				uid: '',
				is_show_model: false,
				lists: '',
				current: 0,
				selectDate:undefined,
				items: [
					{
						value: '0',
						name: '子女任务'
					},{
						value: '1',
						name: '家长任务',
						checked: 'true'
					},

				],
				tabItems: ['子女任务','家长任务'],
				tabCurrent: 0,
				QrcodePoster:false

			}
		},
		onLoad() {},
		onUnload() {
			if (this.$store.state.username != '') {
				uni.reLaunch({
					url: '/pages/my/my'
				})
				this.$store.commit('changeusername', '')
			}
		},
		onShow() {
			this.getCourse()
			this.getClassDayList()
			this.$nextTick(() => {
				this.showMember()
			})
			// this.flag=false
			this.calendarTimeLoad = new Date().getTime()
		},
		mounted() {
			this.$axios({
				url: this.$url[6]
			}).then(res => {
				if (res.code == 0) {
					this.listUrl = res.data
					this.lists = res.data
					uni.setStorageSync('peoplenumber', 0);
				}
			})
			this.getlist()
			this.getpeople()
		},
		onShareAppMessage(res) {
			return {
				title: '添加新成员',
				path: '/packgeA/login/login?id=' + this.uid
			}
		},
		onShareTimeline() {
			return {
				title: '添加新成员',
				path: '/packgeA/login/login?id=' + this.uid
			}
		},
		methods: {
			showQrcodePoster(){
				this.QrcodePoster=false
			},
			sharefriend() {
				this.flag = false
				this.is_show_model = true
				this.QrcodePoster=true
				// this.$refs.poster.showCanvas(this.listUrl.avatar_url)
			},
			getpeople() {
				this.$axios({
					url: this.$url[82]
				}).then(res => {
					if (res.code == 0) {
						this.uid = res.data.invite_id
					}
				})
			},
			sharepeople() {
				this.$axios({
					url: this.$url[82]
				}).then(res => {
					if (res.code == 0) {
						uni.share({
							provider: 'weixin',
							scene: 'WXSceneSession',
							type: 0,
							href: this.$base_url + '/h5/packgeA/login/login?uid=' + res.data.invite_id,
							title: 'AI成长计划分享',
							summary: '我正在使用千芒商汇俱乐部，赶紧跟我一起来体验！',
							imageUrl: this.common.imgUrl('/static/images/logo.png'),
							success: function(res) {
								// console.log('success:' + JSON.stringify(res))
								uni.showToast({
									title: '分享成功',
									icon: 'none'
								})
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err))
							}
						})
					}
				})
			},
			// share(){
			// 	this.isShow = true;
			// },
			// hide(e) {
			// 	this.isShow = e;
			// },
			getlist(e) {
				if (e == undefined) {
					var date = new Date()
					var month = date.getMonth() + 1
					var year = date.getFullYear()
					var day = date.getDate()
					var nowdate = `${year}-${month}-${day}`
				} else {
					var nowdate = e
				}

				this.$axios({
					url: this.$url[74],
					data: {
						query: {
							member_id: this.member_id,
							time: nowdate,
							type:this.tabCurrent
						}
					}
				}).then(res => {
					if (res.code == 0) {
						// console.log('res', res)
						let zerolist = []
						let firstlist = []
						for (let index = 0; index < res.data.data.length; index++) {
							if (res.data.data[index].status == 0) {
								zerolist.push(res.data.data[index])
							} else {
								firstlist.push(res.data.data[index])
							}
						}
						this.handwritingList = zerolist.sort(function(a, b) {
							//正序a-b
							return new Date(a.remind_time) - new Date(b.remind_time)
						})
						this.checkedlist = firstlist.sort(function(a, b) {
							return new Date(a.remind_time) - new Date(b.remind_time)
						})
					}
				})
			},
			//删除计划
			removeitem(i, index) {
				const _this = this
				uni.showModal({
					title: '提示',
					content: '您确定删除此计划吗?',
					success: res => {
						if (res.confirm) {
							_this
								.$axios({
									url: this.$url[75],
									data: {
										member_id: this.member_id,
										id: i.id
									}
								})
								.then(res => {
									if (res.code == 0) {
										uni.showToast({
											title: '删除成功',
											icon: 'none'
										})
										if (i.status == 1) {
											this.checkedlist.splice(index, 1)
										} else {
											this.handwritingList.splice(index, 1)
										}
									}
								})
						}
					}
				})
			},
			//删除成员
			removeite(i) {
				this.flag = false
				const _this = this
				uni.showModal({
					title: '提示',
					content: '您确定删除该成员吗?',
					success: res => {
						if (res.confirm) {
							_this
								.$axios({
									url: this.$url[84],
									data: {
										id: i.id
									}
								})
								.then(res => {
									if (res.code == 0) {
										this.showMember()
										uni.showToast({
											title: '删除成功',
											icon: 'none'
										})
									}
								})
						}
					}
				})
			},
			chackA(item, index) {
				console.log(item, index)
				if (item.status == 0) {
					item.status = 1
					this.checkedlist.push(item)
					this.handwritingList.splice(index, 1)
					this.checkedlist = this.checkedlist.sort(function(a, b) {
						//正序a-b
						return new Date(a.remind_time) - new Date(b.remind_time)
					})
				} else {
					item.status = 0
					this.handwritingList.push(item)
					this.checkedlist.splice(index, 1)
					this.handwritingList = this.handwritingList.sort(function(a, b) {
						//正序a-b
						return new Date(a.remind_time) - new Date(b.remind_time)
					})
				}
				console.log(77)
				this.$axios({
					url: this.$url[77],
					data: {
						member_id: this.member_id,
						id: item.id,
						status: item.status
					}
				}).then(res => {
					if (item.status == 1) {
						uni.showToast({
							title: '已完成此任务',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '未完成此任务',
							icon: 'none'
						})
					}
				})
			},
			AddNew() {
				if (this.newPlan == '' || this.newPlanTime == '' || this.newreMarks == '') {
					this.$u.toast('信息填写不全')
					return
				}
				this.$axios({
					url: this.$url[73],
					data: {
						plan_title: this.newPlan,
						remind_time: this.newPlanTime,
						content: this.newreMarks,
						member_id: this.member_id,
						type: this.current,
					}
				}).then(res => {
					if (res.code == 0) {
						// this.handwritingList.push({
						// 	plan_title: this.newPlan,
						// 	remind_time: this.newPlanTime,
						// 	content: this.newreMarks
						// })
						this.calendarTimeLoad = new Date().getTime() //重复加载日历
						this.getlist()
						this.newPlan = ''
						this.newPlanTime = ''
						this.newreMarks = ''
						this.show1 = false
					}
				})
			},
			planDetails(item) {
				uni.navigateTo({
					url: `/packgeB/timetable/planDetails?member_id=${item.member_id}&id=${item.id}`
				})
			},
			memberDetails(item) {
				uni.navigateTo({
					url: `/packgeB/timetable/informationModification/informationModification?id=${item.id}`
				})
			},
			personalHomepage() {
				uni.navigateTo({
					url: '/packgeB/timetable/personalHomepage'
				})
			},
			choiceQuestion() {
				uni.navigateTo({
					url: '/packgeB/timetable/choiceQuestion'
				})
			},
			aiGrowUp() {
				uni.navigateTo({
					url: '/packgeB/timetable/aiGrowUpPlan'
				})
			},
			changepiker(e) {
				console.log(e.result)
				this.$refs.myName.goToDate(e.result)
			},
			picker() {
				this.show = true
			},
			change(e) {
				this.getlist(e.selectedDate)
				this.selectDate = e.selectedDate
				this.common.loading()
				this.$axios({
					url: this.$url[28],
					data: {
						page: this.page,
						limit: 8,
						query: {
							member_id: this.member_id,
							time: e.selectedDate
						}
					}
				}).then(res => {
					res.data.data.forEach(item => {
						item.end_time = item.start_time.split(' ')[0] + ' ' + item.end_time
					})
					this.calssList = []
					this.calssList = res.data.data
					this.totalCount = res.data.totalCount
					this.getCourse(`${e.year}-${e.month}`)
					uni.hideLoading()
				})
			},
			selectChange(value) {
				this.page = 1
				this.calssList = []
				this.day = value.fulldate
				this.getClassDayList()
			},
			monthChange(value) {
				console.log(value)
				this.calssList = []
				let month = value.month < 10 ? '0' + value.month : value.month
				this.times = value.year + '-' + month
				this.getCourse(this.times)
			},
			// 获取每月的课表
			getCourse(time) {
				this.common.loading()
				this.$axios({
					url: this.$url[27],
					data: {
						time: time,
						query: {
							member_id: this.member_id,
						}
					}
				}).then(res => {
					let arrays=[]
					for (let i in res.data) {
						let date=Number(i.substring(8,10))
						if (res.data[i].count) {
							arrays.push({
								date: date,
								color: '#FF6638'
							})
						}else{
							arrays.push({
								date: date,
								color: '#FFFFFF'
							})
						}
					}
					this.selected=arrays
					uni.hideLoading()
				})
			},
			//添加计划
			navUrl(item) {
				item.course = {
					img: item.course_img,
					name: item.course_name,
					index: item.index
				}
				uni.navigateTo({
					url: '/packgeB/sectionDetails/sectionDetails?id=' +
						item.id +
						'&course=' +
						encodeURIComponent(JSON.stringify(item.course)) +
						'&orderId=' +
						item.order_id +
						'&index=' +
						item.index
				})
			},
			//下拉加载更多
			onReachBottom() {
				const pageNum = Math.ceil(this.totalCount / 8)
				if (this.page < pageNum) {
					this.page++
					this.getClassDayList()
				}
			},
			// 获取当天的课表课节
			getClassDayList() {
				this.common.loading()
				this.$axios({
					url: this.$url[28],
					data: {
						page: this.page,
						limit: 8,
						query: {
							member_id: this.member_id,
							time: this.day
						}
					}
				}).then(res => {
					res.data.data.forEach(item => {
						item.end_time = item.start_time.split(' ')[0] + ' ' + item.end_time
					})
					this.calssList = []
					this.calssList = this.calssList.concat(res.data.data)
					this.totalCount = res.data.totalCount
					uni.hideLoading()
				})
			},
			toSign() {
				uni.navigateTo({
					url: '/packgeA/sign/sign'
				})
			},
			showMember() {
				this.$axios({
					url: this.$url[66],
					data: {}
				}).then(res => {
					this.addMembers = res.data
					this.addMembers[0].school = this.lists.school
					console.log('this.addMembers', this.addMembers)
					// this.flag = true
				})
			},
			coursePlan(item, i) {
				console.log(item)
				this.whichone = i
				if (i == 0) {
					this.listUrl = {
						nick: item.name,
						school: this.lists.school,
						avatar_url: item.portrait,
						id: 0
					}
					uni.setStorageSync('peoplenumber', 0);
				} else {
					this.listUrl = {
						nick: item.name,
						school: item.school,
						avatar_url: item.portrait,
						id: item.id
					}
					uni.setStorageSync('peoplenumber', item.id);
				}
				this.calendarTimeLoad = new Date().getTime() //重新加载日历
				this.member_id = item.id
				this.getClassDayList()
				this.flag = false
			},
			changeType(e) {
				this.current = e.detail.value
			},
			//分段器
			onClickItem(e) {
				if (this.tabCurrent != e.currentIndex) {
					this.tabCurrent = e.currentIndex;
				}
				//获取时间
				
				this.getlist(this.selectDate)
			}
		}
	}
</script>
<style scoped lang="scss">
	.arrow{
		position: fixed;
		top: 10rpx;
		right: 150rpx;
		transform: rotate(45deg);
	}
	.arrow-content{
		position: fixed;
		top: 250rpx;
		right: 150rpx;
		font-size: 40rpx;
		color: white;
	}
	.button{
		width: 96%;
		margin: 0 auto;
		height: 100rpx;
		background: #FF6638;
		border-radius: 10rpx;
		text-align: center;
		line-height: 100rpx;
		color: white;
	}
	/deep/  .uni-radio-input-checked{
		background-color: #FF6638 !important ;
		border-color:#FF6638 !important ;
	}
	.paymentMethod-btn {
		width: 45rpx;
		height: 45rpx;
		background-color: gainsboro;

		border-radius: 40rpx;
	}

	.plan {
		width: 80rpx;
		height: 40rpx;
		color: white;
		background-color: #ff6638;
		line-height: 40rpx;
		text-align: center;
		border-radius: 50rpx;
		font-size: 20rpx;
		float: right;
	}

	.content {
		z-index: 999;
	}

	.deleteModification {
		margin-right: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		opacity: 0.5;
	}

	.deleteModification img {
		width: 24rpx;
		height: 24rpx;
	}

	/deep/.u-btn--primary {
		border-color: #ff6638 !important;
		background-color: #ff6638 !important;
	}

	/deep/ .u-primary-hover {
		background-color: #ff6638 !important;
	}

	.n img {
		width: 100%;
		height: 100%;
	}

	/deep/.uni-calendar__weeks-day[data-v-94becebc] {
		height: 30px;
	}

	/deep/.dialog-close {
		margin-top: 0px;
	}

	/deep/.uni-calendar__header-mobile {
		padding: 0px;
	}

	/deep/.uni-calendar__weeks {
		height: 70rpx;
	}

	/deep/.uni-calendar__header {
		height: 70rpx;
	}

	/deep/.uni-date-changed--time-date {
		line-height: 70rpx;
	}

	/deep/.uni-date-changed {
		height: 70rpx;
	}

	/deep/.uni-date-btn--ok {
		padding: 5px 15px;
	}

	/deep/.uni-calendar--fixed {
		bottom: 0rpx;
	}

	.cur1 {
		text-decoration: line-through;
		color: grey !important;
	}

	.cur {
		border: 5rpx #ffb521 solid !important;
	}

	/deep/ .uni-checkbox-input {
		margin-right: 5rpx;
		-webkit-appearance: none;
		appearance: none;
		outline: 0;
		background-color: gainsboro;
		border-radius: 30rpx;
		width: 40rpx;
		height: 40rpx;
		position: relative;
	}

	/deep/ uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: white !important;
	}

	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		
		background: url(../../static/success.png);
		background-size: 100% 100%;
	}
    /deep/ .uni-checkbox-input-checked {
        background-color: white !important;
	}
	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		font: normal normal normal 14px/1 uni;
		content: '\EA08';
		font-size: 22px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -48%) scale(0.73);
		-webkit-transform: translate(-50%, -48%) scale(0.73);
		display: none;
	}

	/deep/uni-checkbox .uni-checkbox-input {
		border: 1rpx white solid;
	}

	/deep/.uni-date-editor--x .uni-date__icon-clear {
		display: none !important;
	}

	/deep/.uni-date__x-input[data-v-6e13d7e2] {
		height: 37rpx;
	}

	.releasePlan {
		text-align: center;
		height: 80rpx;
		width: 100%;
		line-height: 100rpx;
		font-size: 33rpx;
	}

	.dynamic2 {
		width: 104rpx;
		height: 104rpx;
		position: fixed;
		right: 30rpx;
		bottom: 300rpx;
		border-radius: 50%;
		background-color: #FFF;
		image {
			width: 100%;
			height: 100%;
		}

		&:hover {
			transform: rotate(180deg);
		}
	}

	/deep/ .u-calendar__action {
		display: inline-flex;
		margin-left: 160rpx;
	}

	.calendar {
		margin: 20rpx 20rpx 0;
		padding: 0 20rpx;
		background: #fff;
		border-radius: 20rpx 20rpx 0 0;
	}

	.box {
		/*  padding:0 32rpx; */
		padding-bottom: 40rpx;
	}

	.searchBox {
		background-color: #ffffff;
		padding: 21rpx 32rpx;
	}

	.keBox {
		// margin-top: 30rpx;
		/* #ifdef H5 */
		// margin-top: 330rpx;
		/* #endif */
		border-radius: 0 0 20rpx 20rpx;
		padding: 30rpx 32rpx;
	}

	.paddingBox {
		clear: both;
		padding: 0 20rpx;
	}

	.title {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: rgba(21, 28, 42, 0.87);
	}

	.item {
		margin-top: 25rpx;
		border-bottom: 1px solid #f1f1f1;
		padding-bottom: 25rpx;
	}

	.selectQuan {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-right: 24rpx;
	}

	.itemName {
		width: 400rpx;
		font-size: 28rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2d2d2d;
	}

	.time {
		font-size: 22rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #989898;
		margin-top: 15rpx;
	}

	.statueBox {
		width: 118rpx;
		height: 50rpx;
		background: #19aaff;
		text-align: center;
		line-height: 50rpx;
		border-radius: 25rpx;
		font-size: 26rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #ffffff;
		margin-top: 16rpx;
	}

	.dynamic {
		width: 104rpx;
		// height: 100rpx;
		line-height: 104rpx;
		text-align: center;
		color: #ffffff;
		background: linear-gradient(180deg, #ff9a7c 0%, #ff6638 100%);
		box-shadow: 0px 10px 20px rgba(255, 102, 56, 0.3);
		position: fixed;
		right: 30rpx;
		bottom: 180rpx;
		border-radius: 50%;
	}

	.headBox {
		background: #fff;
		margin: 20rpx 20rpx 0;
		padding: 20rpx 20rpx;
		border-radius: 12rpx 12rpx 0 0;
	}

	.head {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.headCenter {
		margin-left: 27rpx;

		.name {
			font-size: 34rpx;
			font-family: Source Han Sans SC;
			font-weight: bold;
			color: #4d505f;
		}

		.lable {
			width: 74rpx;
			height: 28rpx;
			background: #ffb521;
			border-radius: 4rpx;
			margin-left: 13rpx;

			.lableIcon {
				width: 15rpx;
				height: 16rpx;
			}

			.lableName {
				font-size: 24rpx;
				color: white;
			}
		}
	}

	.classBox {
		margin-top: 8rpx;

		.classIcon {
			width: 24rpx;
			height: 24rpx;
			margin-right: 9rpx;
		}

		.class {
			font-size: 24rpx;
			font-family: Source Han Sans SC;
			font-weight: 400;
			color: #91939b;
		}
	}
	.RadioDistance{
		margin-right: 20rpx;
	}
	.personnel {
		cursor: pointer;
		display: flex;
		font-size: 28rpx;
		font-family: Source Han Sans CN-Regular, Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}

	.setUp {
		width: 40rpx;
		height: 40rpx;
		margin-right: 8rpx;
	}

	.gorwup {
		display: flex;
		margin: 0 20rpx;
		padding: 20rpx 20rpx;
		background: #fff;
		border-radius: 0 0 12rpx 12rpx;
		justify-content: space-between;

		>view {
			width: 326rpx;
			height: 142rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-size: cover;

			view {
				font-size: 32rpx;
				color: #ffffff;
				font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			}

			image {
				width: 48rpx;
				height: 38rpx;
				margin-right: 16rpx;
			}
		}

		.record {
			image {
				width: 48rpx;
				height: 40rpx;
			}
		}
	}

	.members {
		width: 400rpx;
		z-index: 100;

		.membersList {
			width: 90%;
			height: 186rpx;
			margin: 20rpx auto;
			border-radius: 16rpx;
			background: #f6fafd;
			overflow: hidden;
			border: 2rpx solid #efefef;
			display: flex;
			justify-content: space-around;
		}
	}

	.membersList-img {
		width: 100rpx;
		height: 100rpx;
		margin-top: 45rpx;
		margin-left: 10rpx;
		float: left;
	}

	.membersList-img img {
		width: 100rpx;
		height: 100rpx;
		opacity: 1;
		filter: blur(undefinedpx);
		border-radius: 50%;
	}

	.membersList-content {
		width: 65%;
		height: 55%;
		margin-top: 45rpx;
		margin-left: 7rpx;
		float: left;
	}

	.membersList-content1 {
		width: 100%;
		height: 55%;
		line-height: 52rpx;
		color: #262626;
		overflow: hidden;
	}

	.membersList-content2 {
		width: 100%;
		height: 55%;
		line-height: 52rpx;
		overflow: hidden;
		font-size: 10rpx;
	}

	.membersList-content2 image {
		width: 23rpx;
		height: 23rpx;
	}

	.membersList-content1 img {
		width: 20rpx;
		height: 20rpx;
	}

	.members-footer {
		width: 80%;
		height: 70rpx;
		background-color: #19aaff;
		border-radius: 25px;
		margin-left: 8%;
		margin-top: 100rpx;
	}

	.members-footer1 {
		width: 80%;
		height: 70rpx;
		background-color: pink;
		border-radius: 25px;
		margin-left: 8%;
		margin-top: 30rpx;
	}

	.members-footer,
	.members-footer1 {
		width: 264rpx;
		height: 76rpx;
		box-shadow: 0px 3px 12px 1px rgba(255, 102, 56, 0.6);
		border-radius: 38px 38px 38px 38px;
		opacity: 1;
		text-align: center;
		line-height: 76rpx;
		background-color: #ff6638;
		font-size: 27rpx;
		color: #ffffff;
		margin-left: 74rpx;
	}

	.qunxing {
		font-size: 20rpx;
		margin-left: 30rpx;
		color: #666666;
	}

	.mengxin {
		float: right;
		color: #ffffff;
		margin-right: 50rpx;
		text-align: center;
		margin-top: 10rpx;
		line-height: 30rpx;
		font-size: 20rpx;
		border-radius: 5px;
		width: 80rpx;
		height: 30rpx;
		background: #ff6638;
		border-radius: 4px 4px 4px 4px;
		opacity: 1;
	}

	.xm {
		font-size: 34rpx;
		font-weight: bold;
		color: #262626;
		line-height: 0px;
	}
</style>
