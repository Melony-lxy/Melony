(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-verification-code/u-verification-code"],{3209:function(e,t,n){"use strict";n.r(t);var i=n("8f64"),c=n("5e13");for(var s in c)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return c[e]}))}(s);n("6f83");var u=n("828b"),a=Object(u["a"])(c["default"],i["b"],i["c"],!1,null,"a608dcec",null,!1,i["a"],void 0);t["default"]=a.exports},"5e13":function(e,t,n){"use strict";n.r(t);var i=n("a4cc"),c=n.n(i);for(var s in i)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=c.a},"6f83":function(e,t,n){"use strict";var i=n("cc46"),c=n.n(i);c.a},"8f64":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){}));var i=function(){var e=this.$createElement;this._self._c},c=[]},a4cc:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"u-verification-code",props:{seconds:{type:[String,Number],default:60},startText:{type:String,default:"获取验证码"},changeText:{type:String,default:"X秒重新获取"},endText:{type:String,default:"重新获取"},keepRunning:{type:Boolean,default:!1},uniqueKey:{type:String,default:""}},data:function(){return{secNum:this.seconds,timer:null,canGetCode:!0}},mounted:function(){this.checkKeepRunning()},watch:{seconds:{immediate:!0,handler:function(e){this.secNum=e}}},methods:{checkKeepRunning:function(){var t=Number(e.getStorageSync(this.uniqueKey+"_$uCountDownTimestamp"));if(!t)return this.changeEvent(this.startText);var n=Math.floor(+new Date/1e3);this.keepRunning&&t&&t>n?(this.secNum=t-n,e.removeStorageSync(this.uniqueKey+"_$uCountDownTimestamp"),this.start()):this.changeEvent(this.startText)},start:function(){var e=this;this.timer&&(clearInterval(this.timer),this.timer=null),this.$emit("start"),this.canGetCode=!1,this.changeEvent(this.changeText.replace(/x|X/,this.secNum)),this.setTimeToStorage(),this.timer=setInterval((function(){--e.secNum?e.changeEvent(e.changeText.replace(/x|X/,e.secNum)):(clearInterval(e.timer),e.timer=null,e.changeEvent(e.endText),e.secNum=e.seconds,e.$emit("end"),e.canGetCode=!0)}),1e3)},reset:function(){this.canGetCode=!0,clearInterval(this.timer),this.secNum=this.seconds,this.changeEvent(this.endText)},changeEvent:function(e){this.$emit("change",e)},setTimeToStorage:function(){if(this.keepRunning&&this.timer&&this.secNum>0&&this.secNum<=this.seconds){var t=Math.floor(+new Date/1e3);e.setStorage({key:this.uniqueKey+"_$uCountDownTimestamp",data:t+Number(this.secNum)})}}},beforeDestroy:function(){this.setTimeToStorage(),clearTimeout(this.timer),this.timer=null}};t.default=n}).call(this,n("df3c")["default"])},cc46:function(e,t,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-verification-code/u-verification-code-create-component',
    {
        'uview-ui/components/u-verification-code/u-verification-code-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("3209"))
        })
    },
    [['uview-ui/components/u-verification-code/u-verification-code-create-component']]
]);