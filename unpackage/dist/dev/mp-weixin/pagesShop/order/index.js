require('../common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesShop/order/index"],{

/***/ 1469:
/*!***************************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/main.js?{"page":"pagesShop%2Forder%2Findex"} ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pagesShop/order/index.vue */ 1470));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 1470:
/*!********************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/order/index.vue ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=f4e34304&scoped=true& */ 1471);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 1473);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_f4e34304_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=f4e34304&scoped=true&lang=scss& */ 1475);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "f4e34304",
  null,
  false,
  _index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pagesShop/order/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1471:
/*!***************************************************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/order/index.vue?vue&type=template&id=f4e34304&scoped=true& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=f4e34304&scoped=true& */ 1472);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_f4e34304_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1472:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/order/index.vue?vue&type=template&id=f4e34304&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uCheckbox: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-checkbox/u-checkbox */ "uview-ui/components/u-checkbox/u-checkbox").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-checkbox/u-checkbox.vue */ 1963))
    },
    uIcon: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-icon/u-icon */ "uview-ui/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-icon/u-icon.vue */ 1616))
    },
    uImage: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-image/u-image */ "uview-ui/components/u-image/u-image").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-image/u-image.vue */ 1991))
    },
    uInput: function () {
      return Promise.all(/*! import() | uview-ui/components/u-input/u-input */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uview-ui/components/u-input/u-input")]).then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-input/u-input.vue */ 1672))
    },
    uPopup: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-popup/u-popup */ "uview-ui/components/u-popup/u-popup").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-popup/u-popup.vue */ 1665))
    },
    uNumberBox: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-number-box/u-number-box */ "uview-ui/components/u-number-box/u-number-box").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-number-box/u-number-box.vue */ 1855))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = !_vm.is_pickup ? _vm.address.length : null
  var l4 = _vm.__map(_vm.purchaseInfo, function (row, idx) {
    var $orig = _vm.__get_orig(row)
    var g1 = row.total.isFullGift ? row.fullGiftList.length : null
    var l1 = _vm.__map(row.list, function (item, index) {
      var $orig = _vm.__get_orig(item)
      var g2 = _vm.common.imgUrl(item.product.img)
      var m0 = _vm.specificationsStatus(item)
      var g3 = item.gift.length
      var l0 = _vm.__map(item.gift, function (j, i) {
        var $orig = _vm.__get_orig(j)
        var g4 = _vm.common.imgUrl(j.img)
        var g5 = j.specifications.join("/")
        return {
          $orig: $orig,
          g4: g4,
          g5: g5,
        }
      })
      return {
        $orig: $orig,
        g2: g2,
        m0: m0,
        g3: g3,
        l0: l0,
      }
    })
    var g6 = row.additionalPurchaseList.length
    var l2 = g6
      ? _vm.__map(row.additionalPurchaseList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g7 = _vm.common.imgUrl(item.product.img)
          var m1 = _vm.specificationsStatus(item)
          return {
            $orig: $orig,
            g7: g7,
            m1: m1,
          }
        })
      : null
    var g8 = row.fullGiftList.length
    var l3 = g8
      ? _vm.__map(row.fullGiftList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g9 = _vm.common.imgUrl(item.product.img)
          var m2 = _vm.specificationsStatus(item)
          return {
            $orig: $orig,
            g9: g9,
            m2: m2,
          }
        })
      : null
    var g10 =
      !_vm.is_pickup &&
      row.total.postage * 100 + row.total.postage_amount * 100 > 0
        ? (
            (row.total.postage * 100 + row.total.postage_amount * 100) /
            100
          ).toFixed(2)
        : null
    var g11 = row.total.total_price.toFixed(2)
    return {
      $orig: $orig,
      g1: g1,
      l1: l1,
      g6: g6,
      l2: l2,
      g8: g8,
      l3: l3,
      g10: g10,
      g11: g11,
    }
  })
  var l5 = _vm.__map(_vm.paymentList, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var g12 = _vm.common.imgUrl(item.img)
    return {
      $orig: $orig,
      g12: g12,
    }
  })
  var g13 = _vm.giftInfo.length
  var l7 = g13
    ? _vm.__map(_vm.giftStockList.type, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var l6 = _vm.__map(item.list, function (j, idx) {
          var $orig = _vm.__get_orig(j)
          var m3 = _vm.usableGiftListChange(j, index)
          var g14 = m3 && j.img ? _vm.common.imgUrl(j.img) : null
          return {
            $orig: $orig,
            m3: m3,
            g14: g14,
          }
        })
        return {
          $orig: $orig,
          l6: l6,
        }
      })
    : null
  if (!_vm._isMounted) {
    _vm.e0 = function (index) {
      var args = [],
        len = arguments.length - 1
      while (len-- > 0) args[len] = arguments[len + 1]

      var _temp = args[args.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        index = _temp2.index
      var _temp, _temp2
      return (_vm.payment = index)
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l4: l4,
        l5: l5,
        g13: g13,
        l7: l7,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1473:
/*!*********************************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/order/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 1474);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1474:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/order/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _order = __webpack_require__(/*! @/plugin/api/order.js */ 293);
var _personal = __webpack_require__(/*! @/plugin/api/personal.js */ 231);
var _product = __webpack_require__(/*! @/plugin/api/product.js */ 78);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PAYMENT = {
  WECHAT: 0x1,
  WECHAT_CH: "微信",
  ALIPAY: 0x2,
  ALIPAY_CH: "支付宝"
};
var _default = {
  components: {},
  data: function data() {
    return {
      isios: false,
      productTotal: 0,
      ordertotal: 0,
      orderId: 0,
      isShowGift: false,
      isSingle: 0,
      giftInfo: [],
      giftSpecification: [],
      giftIndex: 0,
      giftStockList: [],
      usableGiftList: [],
      isShowGiftCategory: false,
      integralInfo: {},
      isSeparate: false,
      purchaseInfo: [],
      idx: -1,
      addressId: 0,
      idList: [],
      address: [],
      isIntegral: false,
      integralText: "",
      discount_amount: "",
      postage: 0,
      is_pickup: false,
      paymentList: [{
        id: PAYMENT.WECHAT,
        img: "/static/wechat.png",
        name: PAYMENT.WECHAT_CH,
        styles: "width:30rpx;height:30rpx"
      }

      // {
      // 	img: '/static/yinlian.png',
      // 	name: '银联',
      // 	styles: 'width:30rpx;height:18rpx'
      // },
      ],

      payment: 0
    };
  },
  onLoad: function onLoad(options) {
    uni.showLoading({
      title: "加载中"
    });
    if (options.id) {
      this.addressId = options.id;
    }
    this.paymentList = [{
      id: PAYMENT.WECHAT,
      img: "/static/wechat.png",
      name: PAYMENT.WECHAT_CH,
      styles: "width:30rpx;height:30rpx"
    }];
    this.isSeparate = this.$store.state.isSeparate;
    this.idList = this.$store.state.orderIdList;
    this.getIntegral();
    this.purchaseInfoData();
    this.purchasedData();
    this.getAddress();
    this.postageData();
    this.discountsData();
  },
  onShow: function onShow() {
    var _this = this;
    uni.getSystemInfo({
      success: function success(res) {
        if (res.platform == 'ios') {
          _this.$axios({
            url: _this.$url[103]
          }).then(function (res) {
            _this.isios = res.data;
          });
        } else {
          _this.isios = true;
        }
      }
    });
  },
  methods: {
    // 订单金额
    orderFeeChange: function orderFeeChange() {
      var _this2 = this;
      var data = {
        productList: this.purchaseInfo
      };
      (0, _order.orderFee)(data).then(function (res) {
        if (res.code == 0) {
          res.data.forEach(function (item) {
            _this2.purchaseInfo.forEach(function (v, i) {
              if (v.oid == item.oid) {
                if (!item.total.isFullGift) {
                  _this2.purchaseInfo[i].fullGiftList = [];
                }
                _this2.purchaseInfo[i].total = item.total;
              }
            });
          });
        }
        var price = 0;
        var postagetotal = 0;
        var discount_amount = 0;
        var productTotal = 0;
        _this2.purchaseInfo.forEach(function (item) {
          price += item.total.total_price * 100;
          productTotal += item.total.price * 100;
          postagetotal += item.total.postage * 100;
          discount_amount += item.total.coupons_amount * 100 + item.total.postage_amount * 100;
        });
        _this2.postage = postagetotal / 100;
        _this2.ordertotal = price / 100;
        _this2.productTotal = productTotal / 100;
        _this2.discount_amount = discount_amount / 100;
        if (_this2.integralInfo.max > 0 && _this2.integralInfo.proportion > 0 && _this2.integralInfo.integral > 0) {
          var max = parseInt(price * _this2.integralInfo.max / 100 / 100);
          var deductible = parseInt(_this2.integralInfo.integral / _this2.integralInfo.proportion);
          deductible = deductible > max ? max : deductible;
          _this2.integralText = "现有积分" + _this2.integralInfo.integral + ",可使用" + deductible * _this2.integralInfo.proportion + "积分抵用" + +deductible + "元";
          if (_this2.isIntegral) {
            _this2.ordertotal = (price - deductible * 100) / 100;
            _this2.discount_amount = (discount_amount + deductible * 100) / 100;
          }
        }
      });
    },
    // 拨打电话
    call: function call(phone) {
      uni.makePhoneCall({
        phoneNumber: phone
      });
    },
    // 单个商品价格
    commodityPrice: function commodityPrice(data) {
      return (data.specificationsStatus.price * 100 * data.number / 100).toFixed(2);
    },
    //邮费券
    postageData: function postageData() {
      var postageInfo = this.$store.state.postageCoupon;
      if (postageInfo.id) {
        this.purchaseInfo = this.purchaseInfo.map(function (v) {
          if (v.oid === postageInfo.oid) {
            v.postageId = postageInfo.id;
            v.postageInfo = postageInfo;
          }
          return v;
        });
        this.orderFeeChange();
      }
    },
    //优惠券
    discountsData: function discountsData() {
      var couponInfo = this.$store.state.discountCoupon;
      if (couponInfo.id) {
        this.purchaseInfo = this.purchaseInfo.map(function (v) {
          if (v.oid === couponInfo.oid) {
            v.couponsId = couponInfo.id;
            v.couponInfo = couponInfo;
          }
          return v;
        });
        this.orderFeeChange();
      }
    },
    //初始化订单信息
    purchaseInfoData: function purchaseInfoData() {
      var purchaseInfo = [];
      var data = this.$store.state.purchaseInfo;
      var indexList = [];
      var additionalPurchaseList = [];
      var fullGiftList = [];
      var purchasedSource = this.$store.state.purchasedSource;
      if (purchasedSource) {
        additionalPurchaseList = purchasedSource.additionalPurchaseList;
        fullGiftList = purchasedSource.fullGiftList;
      }
      this.$store.state.purchaseInfo.forEach(function (item) {
        if (indexList[item.org.oid] !== undefined) {
          purchaseInfo[indexList[item.org.oid]].list.push(_objectSpread(_objectSpread({}, item), {}, {
            remarks: ""
          }));
        } else {
          indexList[item.org.oid] = indexList.length;
          purchaseInfo.push({
            remarks: '',
            oid: item.org.oid,
            name: item.org.name,
            fullGiftList: fullGiftList[item.org.oid] ? fullGiftList[item.org.oid] : [],
            isAdditionalPurchase: item.isAdditionalPurchase,
            additionalPurchaseList: additionalPurchaseList[item.org.oid] ? additionalPurchaseList[item.org.oid] : [],
            couponsId: 0,
            postageId: 0,
            postageInfo: {},
            total: {
              modeAct: 0,
              isSingle: 0,
              isFullGift: false,
              coupons_amount: 0,
              discount_amount: 0,
              postage: 10,
              postage_amount: 0,
              price: 100,
              total_price: 110
            },
            list: [_objectSpread(_objectSpread({}, item), {}, {
              remarks: ""
            })]
          });
        }
      });
      this.purchaseInfo = purchaseInfo;
      this.orderFeeChange();
    },
    //加购信息
    purchasedData: function purchasedData() {
      var _this$$store$state = this.$store.state,
        addPurchasedList = _this$$store$state.addPurchasedList,
        purchasedSource = _this$$store$state.purchasedSource;
      this.purchaseInfo = this.purchaseInfo.map(function (v) {
        if (v.oid === purchasedSource.oid) {
          v.additionalPurchaseList = [];
          addPurchasedList.forEach(function (item) {
            v.additionalPurchaseList.push({
              product: item.product,
              product_id: item.product_id,
              specificationsStatus: item.specificationsStatus,
              specifications: item.specificationsStatus.name.map(function (item) {
                return item.name;
              }),
              id: item.id ? item.id : 0,
              number: item.number
            });
          });
        }
        return v;
      });
      this.orderFeeChange();
    },
    // 选择邮费券
    discounts: function discounts(type, idx) {
      var data = {};
      var detail = this.purchaseInfo[idx];
      if (type === "postage") {
        data = {
          isPostage: true,
          oid: detail.oid
        };
      } else {
        var product = [];
        detail.list.forEach(function (item) {
          var specifications = item.specificationsStatus.name.map(function (j) {
            return j.name;
          });
          product.push({
            id: item.id ? item.product.id : item.product_id,
            specifications: specifications
          });
        });
        detail.additionalPurchaseList.forEach(function (item) {
          var specifications = item.specificationsStatus.name.map(function (j) {
            return j.name;
          });
          product.push({
            id: item.product_id || item.id,
            specifications: specifications
          });
        });
        data = {
          product: product,
          isPostage: false,
          price: detail.total.total_price,
          oid: detail.oid
        };
      }
      this.$store.commit("filterCoupon", data);
      var additionalPurchaseList = [];
      var fullGiftList = [];
      this.purchaseInfo.forEach(function (rect) {
        additionalPurchaseList[rect.oid] = rect.additionalPurchaseList;
        fullGiftList[rect.oid] = rect.fullGiftList;
      });
      this.$store.commit("purchasedSource", {
        oid: detail.oid,
        type: "order",
        additionalPurchaseList: additionalPurchaseList,
        fullGiftList: fullGiftList
      });
      uni.navigateTo({
        url: "/pagesShop/members/discountCoupon?use=true"
      });
    },
    // 加购跳转
    purchased: function purchased(idx) {
      var additionalPurchaseList = [];
      var fullGiftList = [];
      this.purchaseInfo.forEach(function (rect) {
        additionalPurchaseList[rect.oid] = rect.additionalPurchaseList;
        fullGiftList[rect.oid] = rect.fullGiftList;
      });
      var detail = this.purchaseInfo[idx];
      this.$store.commit("addPurchasedList", detail.additionalPurchaseList);
      this.$store.commit("purchasedSource", {
        oid: detail.oid,
        type: "order",
        additionalPurchaseList: additionalPurchaseList,
        fullGiftList: fullGiftList
      });
      uni.navigateTo({
        url: "/pagesShop/order/purchased"
      });
    },
    // 满赠
    fullGift: function fullGift(idx) {
      var _this3 = this;
      this.idx = idx;
      var detail = this.purchaseInfo[idx];
      var fullGiftList = [];
      detail.fullGiftList.forEach(function (rect) {
        fullGiftList[rect.product_id] = rect;
      });
      this.giftInfo = detail.total.fullGiftList;
      this.giftInfo.map(function (item) {
        item.content = "请选择";
        item.specifications = [];
        item.checked = false;
        item.number = 1;
        if (fullGiftList[item.id]) {
          item.content = "已选：" + _this3.specificationsStatus(fullGiftList[item.id]);
          item.specifications = fullGiftList[item.id].specificationsStatus.name.map(function (item) {
            return item.name;
          });
          item.checked = true;
          item.number = fullGiftList[item.id].number;
        }
        return item;
      });
      this.isShowGift = true;
    },
    close: function close() {
      this.isShowGift = false;
    },
    addCartChange: function addCartChange() {
      var _this4 = this;
      var fullGiftList = [];
      this.purchaseInfo[this.idx].fullGiftList.forEach(function (rect) {
        fullGiftList[rect.product_id] = rect;
      });
      this.purchaseInfo[this.idx].fullGiftList = [];
      this.giftInfo.forEach(function (item) {
        if (item.checked && item.specifications.length > 0) {
          var specificationsStatus = [];
          item.specifications.forEach(function (v, k) {
            specificationsStatus.push({
              type: item.stock_list.type[k].name,
              name: v
            });
          });
          _this4.purchaseInfo[_this4.idx].fullGiftList.push({
            product: {
              img: item.img,
              name: item.name
            },
            product_id: item.id,
            specificationsStatus: {
              name: specificationsStatus
            },
            specifications: specificationsStatus.map(function (item) {
              return item.name;
            }),
            number: item.number,
            remarks: fullGiftList[item.id] ? fullGiftList[item.id].remarks : ""
          });
        }
      });
      this.isShowGift = false;
    },
    pitchOn: function pitchOn(e) {
      this.giftInfo.map(function (item) {
        if (item.id === e.name) {
          if (!e.value) {
            item.content = "请选择";
            item.specifications = [];
          }
          item.checked = e.value;
        }
        return item;
      });
      this.$forceUpdate();
    },
    giftCategory: function giftCategory(item, index) {
      var _this5 = this;
      if (!item.checked) {
        uni.showToast({
          icon: "none",
          title: "请先选中该赠品"
        });
        return;
      }
      this.giftStockList = item.stock_list;
      this.usableGiftList = item.list;
      this.isShowGiftCategory = true;
      this.giftSpecification = [];
      this.giftStockList.type.map(function (item, idx) {
        _this5.giftSpecification.push({
          index: 0,
          name: item.list[0].name
        });
      });
      this.giftIndex = index;
    },
    gifeChange: function gifeChange(index, idx, item) {
      this.giftSpecification[index] = {
        index: idx,
        name: item.name
      };
      this.$forceUpdate();
    },
    isShowGiftCategoryChange: function isShowGiftCategoryChange() {
      var _this6 = this;
      if (this.giftSpecification.length === this.giftInfo[this.giftIndex].stock_list.type.length) {
        this.giftInfo[this.giftIndex].content = "已选：" + this.giftSpecification.map(function (item) {
          return item.name;
        }).join("/");
        this.giftInfo[this.giftIndex].specifications = this.giftSpecification.map(function (item) {
          return item.name;
        });
        this.giftInfo[this.giftIndex].checked = true;
      } else {
        this.giftInfo[this.giftIndex].content = "请选择";
        this.giftInfo[this.giftIndex].specifications = [];
        this.giftInfo[this.giftIndex].checked = false;
      }
      if (this.isSingle === 1) {
        this.giftInfo.map(function (item) {
          if (_this6.giftInfo[_this6.giftIndex].id !== item.id) {
            item.content = "请选择";
            item.specifications = [];
            item.checked = false;
          }
          return item;
        });
      }
      this.isShowGiftCategory = false;
    },
    isShowGiftCategoryClose: function isShowGiftCategoryClose() {
      this.giftInfo.map(function (item) {
        if (item.specifications.length === 0) {
          item.checked = false;
        }
        return item;
      });
      this.isShowGiftCategory = false;
    },
    usableGiftListChange: function usableGiftListChange(item, index) {
      return this.usableGiftList[index].indexOf(item.name) > -1 ? true : false;
    },
    // 积分信息
    getIntegral: function getIntegral() {
      var _this7 = this;
      (0, _order.getIntegral)().then(function (res) {
        if (res.code === 0) {
          _this7.isAdditionalPurchase = res.data.isAdditionalPurchase;
          _this7.integralInfo = {
            integral: res.data.integral,
            max: res.data.max,
            proportion: res.data.proportion
          };
        } else {
          uni.showToast({
            icon: "none",
            title: res.msg
          });
        }
      });
    },
    // 商品规格
    specificationsStatus: function specificationsStatus(item) {
      return item.specificationsStatus.name.map(function (item) {
        return item.name;
      }).join("/");
    },
    skip: function skip(id) {
      console.log(id, "id");
      if (id) {
        uni.navigateTo({
          url: "/pagesShop/commodity/detail?id=" + id + "&forbid=true"
        });
      } else {
        uni.redirectTo({
          url: "/pagesShop/address/index?mode=change"
        });
      }
    },
    // 收货地址
    getAddress: function getAddress() {
      var _this8 = this;
      (0, _personal.getDetail)({
        id: this.addressId
      }).then(function (res) {
        uni.hideLoading();
        if (res.data.id) {
          _this8.address = res.data;
          _this8.addressId = res.data.id;
        }
      });
    },
    // 支付
    goPay: function goPay() {
      var _this9 = this;
      uni.showLoading({
        title: "加载中"
      });
      if (this.orderId > 0) {
        this.payOrder();
        uni.hideLoading();
        return;
      }
      if (!this.is_pickup) {
        if (!this.addressId) {
          uni.showToast({
            icon: "none",
            title: "请选择地址"
          });
          uni.hideLoading();
          return;
        }
      }
      var data = {};
      if (this.is_pickup) {
        data = {
          productList: this.purchaseInfo,
          is_pickup: this.is_pickup,
          isIntegral: this.isIntegral
        };
      } else {
        data = {
          productList: this.purchaseInfo,
          addressId: this.addressId,
          isIntegral: this.isIntegral
        };
      }
      ;
      (0, _order.orderAdd)(data).then(function (res) {
        uni.hideLoading();
        if (res.code === 0) {
          _this9.$store.commit("filterCoupon", {});
          _this9.$store.commit("postageCoupon", {});
          _this9.$store.commit("addPurchasedList", []);
          _this9.$store.commit("discountCoupon", {});
          _this9.orderId = res.data.id;
          _this9.payOrder();
        } else {
          uni.showToast({
            icon: "error",
            title: res.msg
          });
        }
      }).catch(function () {
        uni.hideLoading();
      });
    },
    payOrder: function payOrder() {
      var _this10 = this;
      uni.showLoading({
        title: "加载中"
      });
      var payment = this.paymentList[this.payment].id;
      if (payment === PAYMENT.WECHAT) {
        var status = 0;

        // let _this = this
        // uni.login({
        // 	provider: 'weixin',
        // 	success: (res) => {
        // 		_this.payment(0, res.code)
        // 	},
        // 	fail: () => {
        // 		errdata.errlist("微信授权失败")
        // 	}
        // })
        // return

        (0, _order.WxPayOrder)({
          id: this.orderId,
          status: status,
          openId: uni.getStorageSync("openId")
        }).then(function (res) {
          uni.hideLoading();
          if (res.code === 0) {
            if (status === 2) {
              window.location.href = res.data.url;
            } else {
              _this10.common.payment(res.data).then(function (res) {
                if (res.code === 0) {
                  _this10.paymentSuccess();
                }
              }).catch(function (err) {});
            }
          }
        }).catch(function () {
          uni.hideLoading();
        });
      } else if (payment === PAYMENT.ALIPAY) {
        (0, _order.AliPayOrder)({
          id: this.orderId
        }).then(function (res) {
          uni.hideLoading();
          document.querySelector('body').innerHTML = res.data.resp;
          document.forms[0].submit();
        }).catch(function () {
          uni.hideLoading();
        });
      } else {
        uni.hideLoading();
      }
    },
    paymentSuccess: function paymentSuccess() {
      uni.showModal({
        title: "提示",
        content: "支付成功",
        showCancel: false,
        confirmText: "关闭",
        success: function success(res) {
          uni.switchTab({
            url: '/pages/my/my'
          });
        }
      });
    },
    // 购物车角标
    getCartList: function getCartList() {
      (0, _product.getCartList)().then(function (res) {
        if (res.data.length) {
          uni.setTabBarBadge({
            index: 2,
            text: res.number
          });
        } else {
          uni.removeTabBarBadge({
            index: 2
          });
        }
      });
    },
    // 是否抵扣积分
    creditPoints: function creditPoints(e) {
      this.isIntegral = e.value;
      this.orderFeeChange();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1475:
/*!******************************************************************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/order/index.vue?vue&type=style&index=0&id=f4e34304&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_f4e34304_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&id=f4e34304&scoped=true&lang=scss& */ 1476);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_f4e34304_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_f4e34304_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_f4e34304_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_f4e34304_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_f4e34304_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1476:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/order/index.vue?vue&type=style&index=0&id=f4e34304&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[1469,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesShop/order/index.js.map