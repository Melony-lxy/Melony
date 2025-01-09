<template>
  <view>
    <view
      class="topic-header"
      v-if="detailList"
      :style="{
        'background-image': `url(${common.imgUrl(
          '/static/images/hhbeijing.png'
        )})`,
      }"
    >
      <view class="header-img"
        ><img :src="common.imgUrl(detailList.fileList[0])" alt=""
      /></view>
      <view class="header-name">{{ detailList.title }}</view>
      <view
        class="header-follow-on"
        v-if="detailList.is_join"
        @click="outSpecial()"
        >已关注</view
      >
      <view class="header-follow-off" v-else @click="joinSpecial()">关注</view>
    </view>
	<!-- #ifndef MP-WEIXIN -->
	<view
	  class="q"
	>
	  <scoll
	    :list="scoll1"
	    @getIndex="getIndex1"
	    :activeIndex.sync="activeIndex"
	    class="padding"
	    ref="scoll1"
	  />
	  <swiper
	    :style="{ height: height - 215 +'px' }"
	    :current="activeIndex"
	    @change="changeIndex"
	    :duration="durations"
	    @animationfinish="animationfinish"
		
	  >
	    <block>
	      <swiper-item v-for="i in 5" :key="i">
	        <view
	          class="swiper-item"
	        >
	          <scroll-view
	            scroll-y="true"
	            style="height: 100%"
	            @scrolltolower="getList"
	            scroll-anchoring
	            @refresherrefresh="refresherrefresh"
	            @refresherrestore="refresherrestore"
	            @refresherabort="refresherrestore"
	            :refresher-triggered="refresherTriggered"
	            :refresher-threshold="45"
	            :refresher-enabled="true"
	            refresher-background="#f9f9f9"
	          >
				<nullData v-if="SpecialList.length<=0" :paddingTop="300"/>
	            <view
	              class="dynamicList"
	              v-for="(item, index) in SpecialList"
	              :key="index"
	            >
	              <view>
	                <dynamicpicture v-if="item.type === 0" :data="item" />
	                <dynamicInformation
	                  v-else-if="item.type === 1"
	                  :data="item"
	                />
	                <dynamicpicture v-else-if="item.type === 2" :data="item" />
	              </view>
	            </view>
	          </scroll-view>
	<!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <view
      class="q"
    >
      <scoll
        :list="scoll1"
        @getIndex="getIndex1"
        :activeIndex.sync="activeIndex"
        class="padding1"
        ref="scoll1"
      />
      <swiper
        :current="activeIndex"
        @change="changeIndex"
        :duration="durations"
        @animationfinish="animationfinish"
		:style="{ height: height - 260 +'px' }"
      >
        <block>
          <swiper-item v-for="i in 5" :key="i">
            <view
              class="swiper-item"
              :style="{ 'padding-bottom': padding1 + 10 + 'px' }"
            >
              <scroll-view
                scroll-y="true"
                style="height: 100%"
                @scrolltolower="getList"
                scroll-anchoring
                @refresherrefresh="refresherrefresh"
                @refresherrestore="refresherrestore"
                @refresherabort="refresherrestore"
                :refresher-triggered="refresherTriggered"
                :refresher-threshold="45"
                :refresher-enabled="true"
                refresher-background="#f9f9f9"
              >
    			<nullData v-if="SpecialList.length<=0" :paddingTop="300"/>
                <view
                  class="dynamicList"
                  v-for="(item, index) in SpecialList"
                  :key="index"
                >
                  <view>
                    <dynamicpicture v-if="item.type === 0" :data="item" />
                    <dynamicInformation
                      v-else-if="item.type === 1"
                      :data="item"
                    />
                    <dynamicpicture v-else-if="item.type === 2" :data="item" />
                  </view>
                </view>
              </scroll-view>
    <!-- #endif -->
            </view>
          </swiper-item>
        </block>
      </swiper>
      <addvlog :topicId="this.urlOption.id" />
    <!-- <casePopup ref="casePopup" :id="editId" @isDelete="isDelete" /> -->
    </view>
  </view>
</template>

<script>
import scoll from "@/components/scolls/scolls.vue";
import casePopup from "@/components/case-list/case-popup.vue";
import caseList from "@/components/case-list/case-list.vue";
import addvlog from "@/components/addvlog.vue";
import nullData from '@/components/nullData.vue'
import dynamicInformation from "../../components/dynamicInformation.vue";
import dynamicpicture from "../../components/dynamicpicture.vue";
export default {
  components: {
    caseList,
    scoll,
    casePopup,
    dynamicInformation,
    dynamicpicture,
    addvlog,
	nullData
  },
  props: {
    comHeight: Number,
    padding: Number,
  },
  data() {
    return {
	  height:'',
      isCenterStyle: {},
      refresherTriggered: false,
      _refresherTriggered: false, //是否开启下拉刷新
      more: false, //没有更多
      loadding: false,
      durations: 500,
      activeIndex: 0,
      swiperheight: 0,
      arctanList: [
        {
          data: [],
          page: 1,
          ctime: "",
          totalCount: 0,
          hackReset: true,
          deleteId: 0,
        },
      ],
      label_id: 0,
      limit: 20,
      showtoast: false,
      scoll1: [
        {
          id: 0,
          name: "精华",
          type: false,
        },
        {
          id: 0,
          name: "全部",
          type: false,
        },
        {
          id: 0,
          name: "动态",
          type: false,
        },
        {
          id: 0,
          name: "文章",
          type: false,
        },
        {
          id: 0,
          name: "视频",
          type: false,
        },
      ],
      totalCount: 0,
      editId: 0,
      detailList: "",
      SpecialList: [],
      selectPage: 1,
      selectQuery: "",
      urlOption: "",
    };
  },
  onLoad(option) {
    this.showtoast = false;
    this.urlOption = option;
    this.selectQuery = {
      is_best: 1,
      special_id: Number(this.urlOption.id),
    };
  },
  onShow() {
    this.showtoast = false;
	let getWindowInfo = uni.getWindowInfo()
	this.height = getWindowInfo.screenHeight;
  },
  mounted() {
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".padding")
      .boundingClientRect((res) => {
        this.swiperheight = res.height;
      })
      .exec();
    this.getList();
    this.getCard();
    this.getDetails();
    this.getListSpecial();
    console.log(this.activeIndex);
  },
  onReachBottom() {
    this.selectPage++;
    this.getListSpecial();
  },
  methods: {
    // 卡片跳转详情
    details(index) {
      // console.log(index)
      uni.navigateTo({
        url: "/packgeA/case/caseDetails/caseDetails?id=" + index,
        animationType: "slide-in-bottom",
        animationDuration: 300,
      });
    },
    getListSpecial() {
      this.$axios({
        url: this.$url[48],
        data: {
          page: this.selectPage,
          limit: this.limit,
          query: this.selectQuery,
        },
      }).then((res) => {
        console.log("获取列表", res);
        if (res.code == 0) {
          if (this.showtoast) {
            uni.showToast({
              title: "已全部加载",
              icon: "none",
            });
            return;
          }
          if (res.data.data.length < this.limit) {
            this.showtoast = true;
          }
          res.data.data.forEach((item) => {
            this.SpecialList.push(item);
          });
          if (this.refresherTriggered) {
            this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
            this._refresherTriggered = false;
            uni.showToast({
              title: "刷新成功",
              icon: "none",
            });
          }
        }
      });
    },
    outSpecial() {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "您确定取消关注该专题么?",
        success: (res) => {
          if (res.confirm) {
            _this
              .$axios({
                url: this.$url[69],
                data: {
                  id: this.detailList.id,
                },
              })
              .then((data) => {
                if (data.code == 0) {
                  uni.showToast({
                    title: "取消成功",
                    icon: "none",
                  });
                  this.showtoast = false;
                  this.getDetails();
                }
              });
          }
        },
      });
    },
    joinSpecial() {
      this.$axios({
        method: "POST",
        url: "/communication/addSpecial",
        data: {
          id: this.detailList.id,
        },
      }).then((res) => {
        if (res.code == 0) {
          this.showtoast = false;
          this.getDetails();
        }
      });
    },
    getDetails() {
      this.$axios({
        methood: "POST",
        url: "/communication/specialDetail",
        data: {
          id: Number(this.urlOption.id),
        },
      }).then((res) => {
        console.log("专题详情", res);
        if (res.code == 0) {
          this.detailList = res.data;
        }
      });
    },
    // 用户长按操作
    pressEdit(item) {
      console.log(item);
      this.editId = item;
      this.$refs.casePopup.share();
    },
    // 自定义下拉刷新被触发
    refresherrefresh() {
      uni.pageScrollTo({
        scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0
        duration: 300, // 滚动动画的时长
      });
      let _this = this;
      if (_this._refresherTriggered) {
        return;
      }
      _this._refresherTriggered = true;
      //界面下拉触发，triggered可能不是true，要设为true
      if (!_this.refresherTriggered) {
        _this.refresherTriggered = true;
      }
      this.loadStoreData();
    },
    // 自定义下拉刷新被复位 自定义下拉刷新被中止
    refresherrestore() {
      let _this = this;
      _this.refresherTriggered = false;
      _this._refresherTriggered = false;
    },
    loadStoreData() {
      let _this = this;
      _this.arctanList[_this.activeIndex] = {
        data: [],
        page: 1,
        ctime: "",
        totalCount: 1,
        hackReset: false,
      };
      setTimeout((res) => {
        _this.showtoast = false;
        _this.selectPage = 1;
        _this.SpecialList = [];
        _this.getListSpecial();
      }, 1);
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
                  this.arctanList[this.activeIndex].deleteId = id;
                }
              });
          }
        },
      });
    },
    // 获取列表
    getCard() {
      this.$axios({
        url: this.$url[50],
        data: {
          type: 0,
        },
      }).then((res) => {
        if (res.code == 0) {
          let typeList = [];
          for (let i = 0; i < 4; i++) {
            this.scoll1.push({
              id: res.data.id,
              name: res.data.name,
              type: false,
            });
            this.arctanList[i + 1] = {
              data: [],
              page: 1,
              ctime: "",
              totalCount: 0,
              hackReset: true,
            };
          }
        }
      });
    },
    animationfinish(res) {
      // if (this.arctanList[this.activeIndex].data.length == 0) {
      // 	this.getList()
      // }
    },
    // 滑动切换
    changeIndex(res) {
      this.showtoast = false;
      this.SpecialList = [];
      this.selectPage = 1;
      this.label_id = this.$refs.scoll1.changeIndex(res.detail.current);
      this.activeIndex = res.detail.current;
      if (res.detail.current == 0) {
        this.selectQuery = {
          is_best: 1,
          special_id: Number(this.urlOption.id),
        };
      } else if (res.detail.current == 1) {
        this.selectQuery = {
          special_id: Number(this.urlOption.id),
        };
      } else {
        this.selectQuery = {
          type: res.detail.current - 2,
          special_id: Number(this.urlOption.id),
        };
      }
      this.getListSpecial();

      if (this.arctanList[this.activeIndex].data.length == 0) {
        this.getList("Refresh");
      }
      this.$refs.scoll1.scollChange(res.detail.current);
    },
    getIndex1(res, item) {
      this.label_id = item;
      this.durations = 0;
      this.activeIndex = res;
      setTimeout((res) => {
        this.durations = 500;
      }, 30);
    },
    getList(Refresh) {
      let arctanList = this.arctanList[this.activeIndex];
      if (
        (arctanList.page - 1) * this.limit >= arctanList.totalCount &&
        arctanList.page > 1
      ) {
        return;
      }
      this.loadding = true;
      this.$axios({
        url: this.$url[48],
        data: {
          page: arctanList.page,
          limit: this.limit,
          query: {
            label_id: this.label_id,
            ctime: arctanList.ctime,
          },
        },
      }).then((data) => {
        if (data.code == 0) {
          const res = data.data;
          this.loadding = false;
          if (this.refresherTriggered) {
            this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
            this._refresherTriggered = false;
            uni.showToast({
              title: "刷新成功",
              icon: "none",
            });
          }
          arctanList.hackReset = true;
          if (arctanList.page === 1) {
            arctanList.ctime = res.ctime;
          }
          arctanList.page++;
          arctanList.totalCount = res.totalCount;
          res.data.forEach((item) => {
            arctanList.data.push({
              ...item,
            });
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.dynamicList {
  padding: 10rpx 30rpx !important;
}

swiper {
  height: 1500rpx;
}

.popur-class {
  background: #fff;
  padding: 20rpx;
  border-radius: 20rpx;
}

.uninterested-title {
  font-size: 30rpx;
  font-weight: 700;
}

.uninterested-title > text {
  margin-left: 10rpx;
}

.uninterested-item {
  height: 2000rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.uninterested-list {
  border: 2rpx solid #d3d4d6;
  background: #f4f4f5;
  color: #909399;
  padding: 0 20rpx;
  width: 48%;
  text-align: center;
  margin-bottom: 10rpx;
}

.uninterested-list:nth-child(2n + 0) {
  margin-left: 17rpx;
}

.swiper-item {
  height: 100%;
}

.padding {
  width: 750rpx;
  padding: 0 30upx;
}
.padding1 {
  width: 750rpx;
}

.topic-header {
  width: 100%;
  height: 300rpx;
  background-size: 100% 500rpx;
  overflow: hidden;
}

.header-img {
  width: 165rpx;
  height: 110rpx;
  float: left;
  margin-top: 40rpx;
  margin-left: 30rpx;
  border-radius: 12rpx;
  object-fit: cover;
  overflow: hidden;
}

.header-img img {
  width: 100%;
  height: 100%;
}

.header-name {
  width: 350rpx;
  /* height: 65rpx; */
  /* line-height: 65rpx; */
  float: left;
  margin-top: 40rpx;
  margin-left: 30rpx;
  font-size: 36rpx;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
  display: inline-block;
  overflow:hidden;   /* 溢出部分进行隐藏 */
  display: -webkit-box;  
  -webkit-box-orient: vertical;  /* 盒模型元素从顶部向底部垂直排列子元素 */
  -webkit-line-clamp: 2;  /* 显示两行 */
  text-overflow: ellipsis; 
  /* 	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis; */
}

.header-follow-on {
  width: 120rpx;
  height: 65rpx;
  line-height: 65rpx;
  background-color: #f5f5f5;
  float: right;
  margin-top: 90rpx;
  margin-right: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #989898;
  border-radius: 5rpx;
}

.header-follow-off {
  width: 120rpx;
  height: 65rpx;
  line-height: 65rpx;
  background-color: $project-color;
  color: #ffffff;
  float: right;
  margin-top: 80rpx;
  margin-right: 30rpx;
  text-align: center;
  font-size: 26rpx;
  border-radius: 5rpx;
}

.q {
  width: 100%;
  margin-top: -50rpx;
  border-radius: 20rpx 20rpx 0 0;
  background-color: white;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.content_right img {
  width: 100%;
  height: 100%;
}

.content_right {
  margin-top: 16rpx;
  width: 250rpx;
  height: 126rpx;
  background-color: red;
}
</style>
<style lang="scss" scoped></style>
