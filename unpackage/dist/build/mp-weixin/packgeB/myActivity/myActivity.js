require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packgeB/myActivity/myActivity"],{"09df":function(t,i,n){"use strict";n.r(i);var a=n("81cd"),e=n("a6a3");for(var c in e)["default"].indexOf(c)<0&&function(t){n.d(i,t,(function(){return e[t]}))}(c);n("c88b");var u=n("828b"),o=Object(u["a"])(e["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);i["default"]=o.exports},"20d3":function(t,i,n){},"81cd":function(t,i,n){"use strict";n.d(i,"b",(function(){return e})),n.d(i,"c",(function(){return c})),n.d(i,"a",(function(){return a}));var a={uEmpty:function(){return n.e("uview-ui/components/u-empty/u-empty").then(n.bind(null,"87a0"))}},e=function(){var t=this,i=t.$createElement,n=(t._self._c,t.activityList.length),a=0!=n?t.__map(t.activityList,(function(i,n){var a=t.__get_orig(i),e=t.common.imgUrl(i.img[0]);return{$orig:a,g1:e}})):null;t.$mp.data=Object.assign({},{$root:{g0:n,l0:a}})},c=[]},8488:function(t,i,n){"use strict";(function(t,i){var a=n("47a9");n("6103");a(n("3240"));var e=a(n("09df"));t.__webpack_require_UNI_MP_PLUGIN__=n,i(e.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},a6a3:function(t,i,n){"use strict";n.r(i);var a=n("b60b"),e=n.n(a);for(var c in a)["default"].indexOf(c)<0&&function(t){n.d(i,t,(function(){return a[t]}))}(c);i["default"]=e.a},b60b:function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{activityList:[],page:1}},onLoad:function(){this.getList()},onReachBottom:function(){this.page++,this.getList()},methods:{getList:function(){var i=this;this.$axios({url:this.$url[119],data:{page:this.page,limit:10,application:!0}}).then((function(n){if(0==n.code){if(1==i.page&&(i.activityList=[]),0==n.data.data.length)return void t.showToast({title:"暂无更多活动",icon:"none"});n.data.data.forEach((function(t){i.activityList.push(t)}))}}))},goActivity:function(i){t.navigateTo({url:"/packgeB/activityDetail/activityDetail?id="+i})}}};i.default=n}).call(this,n("df3c")["default"])},c88b:function(t,i,n){"use strict";var a=n("20d3"),e=n.n(a);e.a}},[["8488","common/runtime","common/vendor"]]]);