(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/dynamicInformation"],{"3b17d":function(t,n,e){"use strict";var i=e("6406"),a=e.n(i);a.a},6406:function(t,n,e){},"8a45":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;e("babc");var i={name:"dynamicInformation",props:{data:Object},data:function(){return{isLogin:!0}},onShow:function(){},mounted:function(){},methods:{godetails:function(n){n.rediect_url?t.navigateTo({url:"/pages/webview/webview?src="+n.rediect_url}):t.navigateTo({url:"/packgeA/case/caseDetails/caseDetails?id="+n.id,animationType:"slide-in-bottom",animationDuration:300})},gocenter:function(n){this.isLogin?t.navigateTo({url:"/packgeA/PersonalCenter/PersonalCenter?uid="+n}):(t.showToast({icon:"none",title:"请登录",position:"bottom"}),setTimeout((function(n){t.reLaunch({url:"/packgeA/login/login"})}),1e3))}}};n.default=i}).call(this,e("df3c")["default"])},"8c73":function(t,n,e){"use strict";e.r(n);var i=e("8a45"),a=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},a7ea:function(t,n,e){"use strict";e.r(n);var i=e("e94c"),a=e("8c73");for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("3b17d");var c=e("828b"),u=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"e0115ddc",null,!1,i["a"],void 0);n["default"]=u.exports},e94c:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){}));var i=function(){var t=this.$createElement,n=(this._self._c,this.data?this.common.imgUrl(this.data.user.avatar_url):null),e=this.common.imgUrl(this.data.file[0]);this.$mp.data=Object.assign({},{$root:{g0:n,g1:e}})},a=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/dynamicInformation-create-component',
    {
        'components/dynamicInformation-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("a7ea"))
        })
    },
    [['components/dynamicInformation-create-component']]
]);