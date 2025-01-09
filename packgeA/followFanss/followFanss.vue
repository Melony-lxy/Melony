<template>
	<view>
		<nav-tab class="nav-tab" :navTab="navTab" :activeIndex.sync="activeIndex" @tabEvent="tabEvent" />
		<view class="notUsed" v-show="n == 1">
			<view class="search">
				<u-search class="search-u" placeholder="搜索已关注的人" :show-action="false" :height="66"></u-search>
			</view>
			<view class="following">正在关注</view>
			<view v-for="(item,i) in peoplelist" :key='i'>
				<view class="tab_Content">
					<view class="tab_img"><img :src="common.imgUrl('/static/portrait.png')" alt="" /></view>
					<view class="tab_content">
						<p class="tab_content1">{{item.nick}}</p>
						<p class="tab_content2">我的简介我的简介我的简介</p>
					</view>
					<view class="tab_content3">已关注</view>
				</view>
			</view>
		</view>
		<view class="used" v-show="n == 2">
			<view>
				<view class="tab_Content">
					<view class="tab_img"><img :src="common.imgUrl('/static/portrait.png')" alt="" /></view>
					<view class="tab_content">
						<p class="tab_content1">用户123564</p>
						<p class="tab_content2">粉丝：10</p>
					</view>
					<view class="tab_content3">互相关注</view>
				</view>
			</view>
		</view>
		<view class="expired" v-show="n == 3"></view>
	</view>
</template>

<script>
import navTab from '@/components/nav-tab'
export default {
	components: {
		navTab
	},
	mounted() {
		this.$axios({
			url:this.$url[80]
		}).then(res=>{
			this.peoplelist=res.data.data
		})
	},
	data() {
		return {
			n: 0,
			activeIndex: 0,
			navTab: [
				{
					name: '关注'
				},
				{
					name: '粉丝'
				},
				{
					name: '推荐'
				}
			],
			peoplelist:[]
		}
	},
	methods: {
		// 切换nav 将重新搜索热点
		tabEvent(index) {
			this.n = index + 1
			let i = 0
			let List = document.getElementsByClassName('nav-one')
			for (let i = 0; i < List.length; i++) {
				if (i == index) {
					List[i].className += ' choosewhich'
				} else {
					List[i].className = 'nav-one'
				}
			}
		}
	}
}
</script>
<style lang="scss">
.search {
	background: #fff;
	padding: 21rpx 32rpx;
	display: flex;
	justify-content: space-between;
}
.following {
	font-size: 30rpx;
	font-weight: bold;
	color: #2d2d2d;
	height: 50rpx;
	line-height: 50rpx;
	padding: 21rpx 32rpx;
	text-align: left;
}
.nav-tab {
	/deep/.nav-one {
		font-size: 35rpx;
	}
}
/deep/.line {
	height: 4rpx;
	background: #ff5e00;
	box-shadow: 0 1rpx 5rpx white;
	position: absolute;
	bottom: 6rpx;
	z-index: 1;
	opacity: 0.7;
	transition: 0.3s;
	border-radius: 4rpx;
}
/deep/.nav-one {
	font-size: 35rpx;
	font-family: Source Han Sans CN-Medium, Source Han Sans CN;
	font-weight: 500;
	color: #2d2d2d;
}
/deep/ .success {
	color: #ff6638 !important;
}
/deep/ .choosewhich {
	font-size: 35rpx !important;
	font-family: Source Han Sans CN-Medium, Source Han Sans CN !important;
	font-weight: bold !important;
	color: #ff6638;
}

.notUsed,
.used,
.expired {
	width: 100%;
	height: auto;
	overflow: hidden;
}
.tab_Content {
	width: 90%;
	height: 130rpx;
	margin-left: 5%;
	margin-top: 15rpx;
	overflow: hidden;
	border-bottom: 2rpx gainsboro solid;
}
.tab1_Content {
	width: 90%;
	height: 130rpx;
	margin-left: 5%;
	margin-top: 15rpx;
	overflow: hidden;
	border-bottom: 2rpx gainsboro solid;
}
.tab_img,
.tab1_img {
	width: 90rpx;
	height: 90rpx;
	border-radius: 6rpx;
	margin-top: 18rpx;
	float: left;
}
.tab_content,
.tab1_content {
	float: left;
	text-align: left;
	line-height: 40rpx;
	margin-left: 20rpx;
	margin-top: 22rpx;
}
.tab_img img {
	width: 100%;
	height: 100%;
}
.tab1_img img {
	width: 100%;
	height: 100%;
}
.tab_content1,
.tab1_content1 {
	white-space: nowrap;
	width: 300rpx;
	font-weight: bold;
	font-size: 28rpx;
	color: #333333;
	overflow: hidden;
	text-overflow: ellipsis;
}
.tab_content2,
.tab1_content2 {
	font-size: 22rpx;
	color: #999999;
}
.tab_content3,
.tab1_content3 {
	width: 130rpx;
	height: 49rpx;
	border-radius: 25rpx 25rpx 25rpx 25rpx;
	opacity: 1;
	border: 2rpx solid #cccccc;
	font-size: 26rpx;
	opacity: 1;
	line-height: 46rpx;
	text-align: center;
	margin-left: 20rpx;
	margin-top: 35rpx;
	float: right;
	color: #9c9c9c;
}
</style>
