<template>
  <view>
    <view
      class="topic-header"
	  :class="{topic:!navDetail.content}"
      :style="{
        'background-image': `url(${common.imgUrl(
          '/static/images/hhbeijing.png'
        )})`,
      }"
      v-if="navDetail"
    >
      <view class="header-img"
        ><img :src="common.imgUrl(navDetail.fileList[0])" alt=""
      /></view>
      <view class="header-name" v-if='showwhich'>
        {{ navDetail.title }}
        <view class="text_cell">{{ navDetail.total_number }} 人关注</view>
      </view>
	  <view class="headers-name" v-else>
	    {{ navDetail.title }}
	    <view class="text_cell">{{ navDetail.total_number }} 人关注</view>
	  </view>
      <view
        class="header-follow-first"
        v-if="navDetail.is_join"
        @click="isDelete"
        >已加入</view
      >
      <view class="header-follow-second" v-else @click="indDtermine"
        >未加入</view
      >

      <view class="header-details" v-if="navDetail">
        <u-read-more :toggle="true" ref="uReadMore" @close="closeDetails()">
          <!-- #ifdef H5 -->
          <rich-text
            :nodes="navDetail.content"
            style="color: white"
            class="text_rich"
          ></rich-text>
          <!-- #endif -->
		  <!-- #ifdef APP -->
		  <rich-text
		    :nodes="navDetail.content"
		    style="color: white"
		    class="text_rich"
		  ></rich-text>
		  <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <view v-html="common.content(navDetail.content)" class="navDetailText"></view>
          <!-- #endif -->
        </u-read-more>
      </view>
    </view>
   
	<!-- #ifndef MP-WEIXIN -->
	<!-- :style="{ height: comHeight - swiperheight - padding + 'px' }" -->
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
					<nullData v-if="TallList.length<=0" :paddingTop="300"/>
	          <view
	            class="dynamicList"
	            v-for="(item, index) in TallList"
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
	  :style="{ height: comHeight - swiperheight - padding1 + 'px' }"
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
	    :style="{ height: height - 260 +'px' }"
	   :current="activeIndex"
	   @change="changeIndex"
	   :duration="durations"
	   @animationfinish="animationfinish"
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
	 				<nullData v-if="TallList.length<=0" :paddingTop="300"/>
	           <view
	             class="dynamicList"
	             v-for="(item, index) in TallList"
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
     
              <!-- 							<scroll-view
								scroll-y="true"
								style="height: 100%;"
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
								<!-- <view class="dynamic">
									<view class="dynamic_ul">
										<view class="dynamic_li">
											<view class="li_text">
												伦敦是一座怎样的城市?与其他国际大都市相比有什么独特之处?
											</view>
											<view class="li_content">
												<view class="content_left">
													<view class="content_icon">
														<img :src="common.imgUrl('/static/portrait.png')" alt="" />
														旅行游记
													</view>
													<view class="content_text">
														原因是一步错，步步错，目前来说我们更不
														能承受人口负增长的后果。现在为什么要...
													</view>
												</view>
												<view class="content_right">
													<img :src="common.imgUrl('/static/hhbeijing.png')" alt="" />
												</view>
											</view>
											<view class="commont">
												<view>播放</view>
												<view class="full">·</view>
												<view>222 评论</view>
											</view>
										</view>
									</view>

								</view>
							</scroll-view> -->
            </view>
          </swiper-item>
        </block>
      </swiper>
      <addvlog :circleId="this.urltype.id" />
    </view>
  </view>
</template>

<script>
import nullData from '@/components/nullData.vue'
import scoll from "@/components/scolls/scolls.vue";
import casePopup from "@/components/case-list/case-popup.vue";
import caseList from "@/components/case-list/case-list.vue";
import addvlog from "@/components/addvlog.vue";
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
      isShow: false,
      content: "",
      isCenterStyle: {},
      refresherTriggered: false,
      _refresherTriggered: false, //是否开启下拉刷新
      more: false, //没有更多了
      loadding: false,
      durations: 500,
      activeIndex: 0,
      swiperheight: 0,
      navDetail: "",
      show: false,
      getLists: "",
      TallList: [],
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
	  showwhich:true,
      page: 1,
      limit: 20,
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
      showtoast: false,
      urltype: "",
    };
  },
  onShow() {
	 
  	 let getWindowInfo = uni.getWindowInfo()
	 this.height = getWindowInfo.screenHeight;
  },
  onLoad(option) {
    this.urltype = option;
    this.getLists = {
      is_best: 1,
      exchange_id: this.urltype.id,
    };
    // 模拟后端请求
    setTimeout(() => {
      (this.content = this.navDetail.content),
        // 请注意上方已在组件中添加ref-uReadMore
        this.$nextTick(() => {
          // this.$refs.uReadMore.init()
        });
    }, 0);
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
    this.getDetail();
    this.getTalllist();
  },
  onReachBottom() {
    this.page++;
    this.getTalllist();
  },
  methods: {
    // 卡片跳转详情
    details(index) {
      // console.log(index)
      uni.navigateTo({
        url: `/packgeA/case/caseDetails/caseDetails?id=${index}&type=${this.urltype.id}`,
        animationType: "slide-in-bottom",
        animationDuration: 300,
      });
    },
    closeDetails() {
      uni.pageScrollTo({
        scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0
        duration: 300, // 滚动动画的时长
      });
    },
    // 删除指定数据
    isDelete() {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "您确定退出该交流圈么?",
        success: (res) => {
          if (res.confirm) {
            _this
              .$axios({
                url: "/communication/exitExchange",
                data: {
                  id: this.navDetail.id,
                },
              })
              .then((data) => {
                if (data.code == 0) {
                  uni.showToast({
                    title: "退出成功",
                    icon: "none",
                  });
                  this.getDetail();
                }
              });
          }
        },
      });
    },
    // 加入交流圈
    indDtermine() {
      this.$axios({
        method: "POST",
        url: "/communication/addExchange",
        data: {
          id: this.navDetail.id,
        },
      }).then((res) => {
        this.getDetail();
      });
    },
    // 退出交流圈
    outdDtermine() {
      this.$axios({
        method: "POST",
        url: "/communication/exitExchange",
        data: {
          id: this.navDetail.id,
        },
      }).then((res) => {
        this.getDetail();
        this.show = false;
      });
    },
    // 是否开启遮罩
    openPo() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    // 获取swiper内蓉
    getTalllist() {
      this.$axios({
        url: this.$url[48],
        data: {
          page: this.page,
          limit: this.limit,
          query: this.getLists,
        },
      }).then((res) => {
        if (this.refresherTriggered) {
          this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
          this._refresherTriggered = false;
          uni.showToast({
            title: "刷新成功",
            icon: "none",
          });
        }
        if (this.showtoast) {
          uni.showToast({
            title: "已显示全部",
            icon: "none",
          });
          return;
        }
        if (res.data.data.length < this.limit) {
          this.showtoast = true;
        }
        // this.TallList=res.data.data
        // console.log('页面内容', res.data)
        res.data.data.forEach((item) => {
          this.TallList.push(item);
        });
        console.log("this.TallList", this.TallList);
      });
    },
    // 获取页面的内容
    getDetail() {
      this.$axios({
        url: this.$url[71],
        data: {
          id: this.urltype.id,
        },
      }).then((res) => {
        this.navDetail = res.data;
		if(this.navDetail.title.length<=8){
			this.showwhich=true
		}else{
			this.showwhich=false
		}
      });
    },
    load() {
      // this.$refs.uReadMore.init()
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
        _this.page = 1;
        _this.showtoast = false;
        // swiper切换时判断
        _this.TallList = [];
        _this.getTalllist();
      }, 1);
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
      this.page = 1;
      this.showtoast = false;
      // swiper切换时判断
      this.TallList = [];
      if (res.detail.current == 0) {
        this.getLists = {
          is_best: 1,
          exchange_id: this.urltype.id,
        };
      } else if (res.detail.current == 1) {
        this.getLists = {
          exchange_id: this.urltype.id,
        };
      } else {
        this.getLists = {
          type: res.detail.current - 2,
          exchange_id: this.urltype.id,
        };
      }
      this.getTalllist();
      this.label_id = this.$refs.scoll1.changeIndex(res.detail.current);
      this.activeIndex = res.detail.current;
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
<style lang="scss">
  /* .dynamic-content {
  	padding-left: 0rpx !important;
  	padding-right: 0rpx !important;
  } */


.dynamicList {
  padding: 10rpx 30rpx !important;
}

.determineBut {
  width: 48%;
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

swiper {
  height: 1500rpx;
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
/* .topic{
	margin-bottom: 20px;
} */
.topic-header {
  width: 100%;
  height: 300rpx;
  background-size: 100% 500rpx;
  overflow: hidden;
}


.header-img {
  width: 165rpx;
  height: 165rpx;
  float: left;
  margin-top: 40rpx;
  margin-left: 32rpx;
  overflow: hidden;
}

.header-img img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.headers-name{
	width: 350rpx;
		/* height: 65rpx; */
	line-height: 65rpx;
	float: left;
	margin-top: 36rpx;
	margin-left: 30rpx;
	font-size: 40rpx;
	color: #ffffff;
	text-align: left;
	display: inline-block;
	overflow: hidden;
	/* white-space: nowrap; */
	/* text-overflow: ellipsis; */
}
.header-name {
  	width: 350rpx;
	/* height: 65rpx; */
  line-height: 65rpx;
  float: left;
  margin-top: 90rpx;
  margin-left: 30rpx;
  font-size: 40rpx;
  color: #ffffff;
  text-align: left;
  display: inline-block;
  overflow: hidden;
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
}

.header-follow-first {
  width: 110rpx;
  height: 65rpx;
  line-height: 65rpx;
  float: right;
  margin-top: 90rpx;
  margin-right: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #989898;
  border-radius: 5rpx;
  background: #f5f5f5;
  opacity: 1;
}

.header-follow-second {
  width: 110rpx;
  height: 65rpx;
  line-height: 65rpx;
  float: right;
  margin-top: 90rpx;
  margin-right: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: white;
  border-radius: 5rpx;
  background: $project-color;
  opacity: 1;
}

.text_cell {
  font-size: 25rpx;
  color: #ffffff;
}

.peopl {
  /* width: 100rpx; */
  float: left;
  height: 65rpx;
  line-height: 65rpx;
}

.header-details {
  width: 100%;
  height: auto;
  margin-top: 10rpx;
  /* margin-left: 4%; */
  font-size: 30rpx;
  color: red;
  line-height: 40rpx;
  z-index: 1000000;
  display: flex;
  justify-content: center;
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
  /* background-color: red; */
}
</style>
<style lang="scss" scoped>
/deep/ .u-content {
  display: flex;
  justify-content: center;
}

.text_rich {
  width: 700rpx !important;
}

/deep/ .u-content__showmore-wrap {
  width: 750rpx;
  background-image: none !important;
}

/deep/.u-content__showmore-wrap__readmore-btn {
  color: #ff6100 !important;
}

/deep/ .header-details .u-icon__icon {
  color: white !important;
}

.uni-scroll-view-content {
  height: auto !important;
}
.navDetailText {
  color: white;
  padding: 0 20rpx;
}
</style>
