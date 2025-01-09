<template>
  <view :style="'padding-bottom:' + padding + 'px'" class="recommend">
    <view class="circle"><circleList /></view>
    <view class="special"><special /></view>
    <!-- <view class="dynamicList"><dynamic /></view> -->
    <!-- <view class="dynamicInformationList"><dynamicInformation /></view> -->
    <!-- <banner :list="bannerList" @swiperClick="swiperClick"></banner> -->
    <!-- 中间菜单栏 -->
    <!-- <view class="menu">
			<swiper style="height:420rpx">
				<swiper-item v-for="(item,index1) in menu" :key="index1" style="height:420rpx;background-color: #fff;">
					<view class="menu-item">
						<view class="menu-list " v-for="(res,index) in item" :key="index" @tap="change(res.id)">
							<view class="menu-image u-skeleton-circle">
								<image :src="common.imgUrl(res.icon)" mode="" />
							</view>
							<view class="menu-name u-skeleton-fillet">
								{{res.name?res.name:"暂无标题"}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view> -->
    <!-- 热门任务 -->
    <!-- <view>
			<view class="line" />
			<view class="margin">
				<view class="title" style="margin-bottom: 0;">
					<view class="left">
						<view class="radio" />
						动态
					</view>
				</view> -->
    <!-- 列表 -->
    <!-- <view>
					<caseList :list="list" @pressEdit="pressEdit" />
				</view>
			</view>
		</view>
		<casePopup ref='casePopup' :id="editId" @isDelete="isDelete" /> -->
  </view>
</template>

<script>
import banner from "@/components/banner.vue";
import casePopup from "@/components/case-list/case-popup.vue";
import caseList from "@/components/case-list/case-list.vue";
import circleList from "@/components/circleList.vue";
import special from "@/components/special.vue";
import dynamic from "../../components/dynamic.vue";
// import dynamicInformation from "../../components/dynamicInformation.vue";
export default {
  name: "index",
  components: {
    banner,
    casePopup,
    caseList,
    circleList,
    special,
    dynamic,
    // dynamicInformation,
  },
  props: {
    comHeight: Number,
    padding: Number,
  },
  data() {
    return {
      list: [],
      menu: [],
      height: 0,
      banner: [],
      bannerList: [],
      loading: true,
      editId: 0,
    };
  },
  mounted() {
    this.getList();
    this.getCard();
    this.getBanner();
  },
  methods: {
    // 用户长按操作
    pressEdit(item) {
      this.editId = item;
      this.$refs.casePopup.share();
    },

    // 删除指定数据
    isDelete(id) {
      this.$refs.casePopup.cancel();
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "您确定删除该晒一晒吗?",
        success: (res) => {
          if (res.confirm) {
            _this
              .$axios({
                url: this.$url[48],
                data: {
                  id,
                },
              })
              .then((data) => {
                if (data.code == 0) {
                  uni.showToast({
                    title: "删除成功",
                    icon: "none",
                  });
                  _this.getList();
                }
              });
          }
        },
      });
    },
    swiperClick(index) {
      const rediect_url = this.banner[0][index].rediect_url;
      this.navTo(rediect_url);
    },
    navTo(item) {
      uni.navigateTo({
        url:
          "/packgeA/commodityList/commodityList?id=" +
          item.id +
          "&curricuName=" +
          item.name,
      });
    },
    getBanner() {
      this.bannerList = [];
      this.banner = [];
      this.$axios({
        url: this.$url[8],
      }).then((res) => {
        if (res.code == 0) {
          for (const item of res.data[0]) {
            this.bannerList.push(this.common.imgUrl(item.img));
          }
          this.banner = res.data;
        }
      });
    },
    // 标签列表
    getCard() {
      let menuIndex = 0;
      this.menu = [];
      this.$axios({
        url: this.$url[50],
        data: {
          type: 0,
        },
      }).then((res) => {
        if (res.code == 0) {
          for (var i = 0, len = res.data.length; i < len; i += 8) {
            this.menu.push(res.data.slice(i, i + 8));
          }
          this.loading = false;
        }
      });
    },
    // 获取
    change(id) {
      uni.setStorageSync("type_id", id);
      this.$emit("indexClick", id);
    },
    getList() {
      this.list = [];
      this.$axios({
        url: this.$url[48],
        data: {
          page: 1,
          limit: 8,
        },
      }).then((res) => {
        if (res.code == 0) {
          this.list = res.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
.recommend {
  background-color: #f6f6f6;
}
.circle,
.special {
  padding-top: 20rpx;
}
/deep/.circle .circle_img[data-v-30a19a09] {
  display: flex;
  margin-top: 20rpx;
}
/deep/.circle[data-v-30a19a09] {
  padding: 40rpx 20rpx;
  background: #fff;
}
/deep/.special[data-v-5d7c6cce] {
  padding: 40rpx 20rpx;
  background: #fff;
}
.dynamicList{
  padding: 0 18rpx;
  background: #fff;
  margin-top: 20rpx;
}
.padding-bottom {
  padding-bottom: 20rpx;
}

.margin {
  margin-left: 32upx;
  margin-right: 32upx;
}

.swiper-item {
  width: 100%;
  height: 100%;
}

.swiper-item > image {
  width: 100%;
  height: 100%;
}

/* 中间菜单 */
.menu {
  margin: 29upx 32upx;
  border-radius: 10upx;
  overflow: hidden;
  box-shadow: 0 3upx 10upx #00000005;
}

.menu-item {
  display: flex;
  /* 	justify-content: space-around; */
  flex-wrap: wrap;
  align-items: center;
  background: #fff;
  padding-bottom: 47upx;
}

.menu-list {
  width: 25%;
  height: 150rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 47upx;
}

.menu-image {
  width: 98upx;
  height: 98upx;
  border-radius: 50%;
}

.menu-image > image {
  width: 100%;
  height: 100%;
}

/* 热门任务 */
.line {
  height: 20upx;
  background: #ededed;
}

.radio {
  width: 12upx;
  height: 12upx;
  border-radius: 50%;
  background: linear-gradient(to bottom, #ff5e00, #ff5e00);
  margin-right: 10upx;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 26upx 0;
}

.left {
  display: flex;
  font-weight: 700;
  align-items: center;
  color: #4d505f;
  font-size: 32upx;
}

.right > image {
  width: 32upx;
  height: 28upx;
}

.right {
  color: #4d505f;
  font-size: 24upx;
  display: flex;
  align-items: center;
  line-height: 1;
}
</style>
