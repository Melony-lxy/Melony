require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packgeA/studentRegistration1/studentRegistration1"],{"32d3":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var a={uCountDown:function(){return e.e("uview-ui/components/u-count-down/u-count-down").then(e.bind(null,"929d"))},uModal:function(){return e.e("uview-ui/components/u-modal/u-modal").then(e.bind(null,"31b2"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.common.imgUrl(t.list.img)),a=t.__map(t.list.content,(function(n,e){var a=t.__get_orig(n),i=0!==n.type?t.common.imgUrl(n.data):null;return{$orig:a,g1:i}}));t._isMounted||(t.e0=function(){t.show=!1}),t.$mp.data=Object.assign({},{$root:{g0:e,l0:a}})},o=[]},"4f21":function(t,n,e){"use strict";var a=e("e319"),i=e.n(a);i.a},5161:function(t,n,e){"use strict";e.r(n);var a=e("32d3"),i=e("fe6b");for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("4f21");var u=e("828b"),c=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"4ace2f58",null,!1,a["a"],void 0);n["default"]=c.exports},"63fc":function(t,n,e){"use strict";(function(t,n){var a=e("47a9");e("6103");a(e("3240"));var i=a(e("5161"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(i.default)}).call(this,e("3223")["default"],e("df3c")["createPage"])},baa8:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{timestamp:0,timestamp1:0,list:{},id:"",type:"",show:!1}},onLoad:function(n){var e=this;this.id=n.id,n.type&&(this.type=n.type),this.$axios({url:this.$url[107],data:{id:n.id,type:n.type}}).then((function(n){console.log(n),e.list=n.data,e.list.content.map((function(t){if(1!=t.type)return t.data=t.data.replace(/[\n\r]/g,"<br>")}));var a="".concat(n.data.effective_start_time," 24:00:00"),i=new Date;e.timestamp1=Math.round(parseInt(new Date(a)-i)/1e3);var o="".concat(n.data.effective_end_time," 24:00:00"),u=new Date;e.timestamp=Math.round(parseInt(new Date(o)-u)/1e3),"0"==e.list.status?t.showModal({title:"提示",content:"活动未开始"}):"2"==e.list.status?(t.showModal({title:"提示",content:"活动已结束"}),e.timestamp=0):"3"==e.list.status&&(t.showModal({title:"提示",content:"活动已下架"}),e.timestamp=0)}))},methods:{consulting:function(){this.show=!0},go:function(){t.navigateTo({url:"/packgeA/application/application?id=".concat(this.id,"&type=").concat(this.type," ")})},share:function(){}}};n.default=e}).call(this,e("df3c")["default"])},e319:function(t,n,e){},fe6b:function(t,n,e){"use strict";e.r(n);var a=e("baa8"),i=e.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a}},[["63fc","common/runtime","common/vendor"]]]);