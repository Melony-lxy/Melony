require('../common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesShop/commodity/detail"],{

/***/ 1398:
/*!********************************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/main.js?{"page":"pagesShop%2Fcommodity%2Fdetail"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pagesShop/commodity/detail.vue */ 1399));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 1399:
/*!*************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/commodity/detail.vue ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=5c67bbd4&scoped=true& */ 1400);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 1402);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_id_5c67bbd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&id=5c67bbd4&lang=scss&scoped=true& */ 1406);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5c67bbd4",
  null,
  false,
  _detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pagesShop/commodity/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1400:
/*!********************************************************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/commodity/detail.vue?vue&type=template&id=5c67bbd4&scoped=true& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=5c67bbd4&scoped=true& */ 1401);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_5c67bbd4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1401:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/commodity/detail.vue?vue&type=template&id=5c67bbd4&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uImage: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-image/u-image */ "uview-ui/components/u-image/u-image").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-image/u-image.vue */ 1991))
    },
    uIcon: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-icon/u-icon */ "uview-ui/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-icon/u-icon.vue */ 1616))
    },
    uPopup: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-popup/u-popup */ "uview-ui/components/u-popup/u-popup").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-popup/u-popup.vue */ 1665))
    },
    uNumberBox: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-number-box/u-number-box */ "uview-ui/components/u-number-box/u-number-box").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-number-box/u-number-box.vue */ 1855))
    },
    uCheckbox: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-checkbox/u-checkbox */ "uview-ui/components/u-checkbox/u-checkbox").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-checkbox/u-checkbox.vue */ 1963))
    },
    uBadge: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-badge/u-badge */ "uview-ui/components/u-badge/u-badge").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-badge/u-badge.vue */ 2117))
    },
    uModal: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-modal/u-modal */ "uview-ui/components/u-modal/u-modal").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-modal/u-modal.vue */ 1644))
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
  var l0 = _vm.detail
    ? _vm.__map(_vm.detail.picture, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var g0 = item.type.indexOf("image")
        var g1 = g0 >= 0 ? _vm.common.imgUrl(item.url) : null
        return {
          $orig: $orig,
          g0: g0,
          g1: g1,
        }
      })
    : null
  var g2 = _vm.detail ? _vm.detail.activityList.length : null
  var g3 = _vm.detail
    ? _vm.common.imgUrl("/static/shop/common/inventory.png")
    : null
  var g4 = _vm.detail
    ? _vm.common.imgUrl("/static/shop/common/sales.png")
    : null
  var g5 = _vm.detail ? _vm.giftInfo.length && !_vm.purchased : null
  var g6 = _vm.detail ? _vm.detail.introduction.length : null
  var g7 = _vm.detail ? _vm.commentList.length : null
  var g8 = _vm.detail ? _vm.commentList.length : null
  var l2 =
    _vm.detail && g8
      ? _vm.__map(_vm.commentList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g9 = _vm.common.imgUrl(item.user.avatar_url)
          var g10 = item.file.length
          var l1 = g10
            ? _vm.__map(item.file, function (j, idx) {
                var $orig = _vm.__get_orig(j)
                var g11 = _vm.common.imgUrl(j.url)
                return {
                  $orig: $orig,
                  g11: g11,
                }
              })
            : null
          return {
            $orig: $orig,
            g9: g9,
            g10: g10,
            l1: l1,
          }
        })
      : null
  var g12 = _vm.detail ? _vm.common.content(_vm.detail.content) : null
  var g13 = _vm.detail ? _vm.commodityList.length : null
  var l3 =
    _vm.detail && g13
      ? _vm.__map(_vm.commodityList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g14 = _vm.common.imgUrl(item.img)
          return {
            $orig: $orig,
            g14: g14,
          }
        })
      : null
  var g15 = _vm.detail ? _vm.common.imgUrl(_vm.commodityInfo.img) : null
  var l5 = _vm.detail
    ? _vm.__map(_vm.detail.stock_list.type, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var l4 = _vm.__map(item.list, function (j, idx) {
          var $orig = _vm.__get_orig(j)
          var m0 = _vm.usableSpecificationChange(j, index)
          var g16 = m0 && j.img ? _vm.common.imgUrl(j.img) : null
          return {
            $orig: $orig,
            m0: m0,
            g16: g16,
          }
        })
        return {
          $orig: $orig,
          l4: l4,
        }
      })
    : null
  var g17 = _vm.detail ? _vm.giftInfo.length : null
  var l7 =
    _vm.detail && g17
      ? _vm.__map(_vm.giftStockList.type, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var l6 = _vm.__map(item.list, function (j, idx) {
            var $orig = _vm.__get_orig(j)
            var m1 = _vm.usableGiftListChange(j, index)
            var g18 = m1 && j.img ? _vm.common.imgUrl(j.img) : null
            return {
              $orig: $orig,
              m1: m1,
              g18: g18,
            }
          })
          return {
            $orig: $orig,
            l6: l6,
          }
        })
      : null
  var m2 = _vm.detail && g17 ? _vm.maxNumber() : null
  var g19 =
    _vm.detail && !_vm.forbid && !_vm.purchased
      ? _vm.common.imgUrl("/static/pageShop/index.png")
      : null
  var g20 =
    _vm.detail && !_vm.forbid && !_vm.purchased
      ? _vm.common.imgUrl("/static/pageShop/chat.png")
      : null
  var g21 =
    _vm.detail && !_vm.forbid && !_vm.purchased
      ? _vm.common.imgUrl("/static/pageShop/car.png")
      : null
  var g22 =
    _vm.detail && !_vm.base64
      ? _vm.common.imgUrl(_vm.detail.picture[0].url)
      : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.sharePopup = true
    }
    _vm.e1 = function ($event) {
      _vm.isShowCategory = true
    }
    _vm.e2 = function ($event) {
      _vm.isShowGiftCategory = false
    }
    _vm.e3 = function () {
      _vm.show = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        g2: g2,
        g3: g3,
        g4: g4,
        g5: g5,
        g6: g6,
        g7: g7,
        g8: g8,
        l2: l2,
        g12: g12,
        g13: g13,
        l3: l3,
        g15: g15,
        l5: l5,
        g17: g17,
        l7: l7,
        m2: m2,
        g19: g19,
        g20: g20,
        g21: g21,
        g22: g22,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1402:
/*!**************************************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/commodity/detail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 1403);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1403:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/commodity/detail.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _html2canvas = _interopRequireDefault(__webpack_require__(/*! html2canvas */ 1404));
var _vuex = __webpack_require__(/*! vuex */ 41);
var _product = __webpack_require__(/*! @/plugin/api/product.js */ 78);
var _code = _interopRequireDefault(__webpack_require__(/*! @/components/code.js */ 1405));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var storeInformation = function storeInformation() {
  __webpack_require__.e(/*! require.ensure | components/storeInformation */ "components/storeInformation").then((function () {
    return resolve(__webpack_require__(/*! @/components/storeInformation.vue */ 1862));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
//引入uqrcode.js
var _default = {
  components: {
    storeInformation: storeInformation
  },
  watch: {
    sharePopup: function sharePopup(newValue, oldValue) {
      if (newValue) {
        if (!this.base64) {
          this.generateQrCode();
        }
      }
    }
  },
  data: function data() {
    return {
      showphone: false,
      titlephone: '联系方式',
      contentphone: '1',
      sharePopup: false,
      show: false,
      forbid: false,
      isDiscount: false,
      mode: '',
      shoppingNumber: 0,
      purchasedList: [],
      purchased: false,
      isShowGife: false,
      videoplay: '',
      id: 0,
      base64: '',
      detail: null,
      isShowDiscounts: false,
      isShowCategory: false,
      isShowGift: false,
      isShowGiftCategory: false,
      specification: [],
      usableSpecificationList: [],
      // 赠品
      activity: {
        is_single: 0,
        proportion: '',
        fixed: ''
      },
      // 选中的分类信息
      commodityInfo: {
        uid: 0,
        id: '',
        img: '',
        number: 0,
        stock: 0,
        price: '',
        sale_price: '',
        content: '',
        selectedIndex: '',
        selectedText: [],
        serialNumber: '',
        priceList: [0, 0],
        is_discount: 0,
        discount_price: ''
      },
      giftStockList: [],
      usableGiftList: [],
      giftText: '请选择',
      giftSpecification: [],
      giftIndex: 0,
      giftInfo: [],
      giftStatus: true,
      selectiveGift: [],
      // 可能需要的商品
      commodityList: [],
      currCategory: {},
      // 评论
      commentList: [],
      windowWidth: 0
    };
  },
  onReady: function onReady() {
    this.videoplay = uni.createVideoContext('myVideo');
  },
  onLoad: function onLoad(option) {
    var token = uni.getStorageSync('token');
    this.windowWidth = uni.getWindowInfo().windowWidth;
    this.purchasedList = this.$store.state.addPurchasedList;
    if (option.purchased) {
      this.purchased = true;
    }
    if (option.forbid) {
      this.forbid = true;
    }
    this.id = parseInt(option.id);
    this.getDetail();
    if (this.token) {
      this.getCartList();
    }
    this.commnentList();
    var that = this;
  },
  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: this.detail.name,
      imageUrl: this.detail.picture ? this.common.imgUrl(this.detail.picture[0].url) : '',
      path: '/pagesShop/commodity/detail?id=' + this.id
    };
  },
  onShareTimeline: function onShareTimeline() {
    return {
      title: this.detail.name,
      imageUrl: this.detail.picture ? this.common.imgUrl(this.detail.picture[0].url) : '',
      path: '/pagesShop/commodity/detail?id=' + this.id
    };
  },
  methods: _objectSpread(_objectSpread({
    phonesucc: function phonesucc() {
      wx.makePhoneCall({
        phoneNumber: this.commodityInfo.phone,
        success: function success() {
          console.log(1);
        },
        fail: function fail() {
          console.log(0);
        }
      });
    },
    toImage: function toImage() {
      var _this = this;
      var id = window.document.getElementById('imageWrapper');
      (0, _html2canvas.default)(id, {
        backgroundColor: null,
        //画出来的图片有白色的边框,不要可设置背景为透明色（null）
        useCORS: true,
        //支持图片跨域
        scale: 5 //设置放大的倍数
      }).then(function (canvas) {
        var url = canvas.toDataURL("image/png");
        _this.base64 = url.toString();
      });
    },
    generateQrCode: function generateQrCode() {
      var that = this;
      _code.default.make({
        canvasId: 'qrcode',
        componentInstance: this,
        text: " /h5/packgeA/login/login?commodityId=".concat(this.commodityInfo.id, "&store_id=").concat(this.commodityInfo.uid),
        size: 60,
        margin: 0,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        errorCorrectLevel: _code.default.errorCorrectLevel.H,
        success: function success(res) {
          that.toImage();
        }
      });
    },
    errorimg: function errorimg(i) {
      this.commodityList[i].img = this.common.imgUrl('/static/images/default.png');
    },
    imgerror: function imgerror(i) {
      this.detail.picture[i].url = this.common.imgUrl('/static/images/default.png');
      this.detail.picture[i].type = 'image/jpeg';
    }
  }, (0, _vuex.mapMutations)(['commodity'])), {}, {
    init: function init() {
      var _this2 = this;
      this.detail.stock_list.type.forEach(function (item, index) {
        console.log(item.list, 'item.list');
        if (item.list.length === 1) {
          _this2.commodityChange(index, 0, item.list[0]);
        }
      });
    },
    // 加购跳转
    purchasedSkip: function purchasedSkip() {
      this.$store.commit('purchasedSource', {
        type: 'detail'
      });
      uni.navigateTo({
        url: '/pagesShop/order/purchased'
      });
    },
    getDetail: function getDetail() {
      var _this3 = this;
      (0, _product.productInfo)({
        id: this.id,
        isAdditionalPurchase: this.purchased
      }).then(function (res) {
        console.log(res.data, 'data');
        if (res.code == 0) {
          _this3.detail = res.data;
          res.data.picture.map(function (item) {
            item.url = _this3.common.imgUrl(item.url);
          });
          var content = '请选择 ' + res.data.stock_list.type.map(function (item) {
            return item.name;
          }).join('/');
          var price = res.data.sale_price === res.data.max_sale_price ? res.data.sale_price : res.data.sale_price + '~' + res.data.max_sale_price;
          var discount_price = res.data.discount_price === res.data.discount_price_max ? res.data.discount_price : res.data.discount_price + '~' + res.data.discount_price_max;
          if (res.data.activityList.length) {
            var data = res.data.activityList.filter(function (item) {
              return item.mode === 0;
            });
            if (data.length) {
              data = data[0].giftList.map(function (item) {
                item.checked = false;
                item.content = '请选择';
                item.specifications = [];
                item.number = 1;
                return item;
              });
              _this3.giftInfo = data;
            }
            res.data.activityList.forEach(function (item) {
              if (item.mode === 0) {
                _this3.activity.is_single = item.is_single;
                _this3.activity.giftList = item.giftList.map(function (j) {
                  return j.name;
                });
              }
              if (item.mode === 1) {
                _this3.activity.fixed = item.mode_act;
              }
              if (item.mode === 2) {
                _this3.activity.proportion = item.mode_act;
              }
            });
          }
          if (_this3.purchased && res.data.productList) {
            _this3.usableSpecificationList = res.data.productList;
          }
          _this3.isDiscount = res.data.activityList.some(function (item) {
            return item.mode === 2;
          });
          _this3.commodityInfo = {
            selectedIndex: '',
            id: res.data.id,
            img: res.data.img,
            number: res.data.min_count,
            stock: res.data.stock,
            sale_price: price ? price : res.data.price,
            price: res.data.price,
            original_price: res.data.original_price,
            content: content,
            priceList: res.data.priceList,
            uid: res.data.uid,
            is_discount: res.data.is_discount,
            discount_price: discount_price,
            ismianyi: res.data.mianyi,
            phone: res.data.phone,
            name: res.data.contact
          };
          console.log('this.commodityInfo', _this3.commodityInfo);
          if (res.data.recommend_id && res.data.recommend_id.length) {
            _this3.listJson(res.data.recommend_id);
          }
          _this3.init();
          _this3.$forceUpdate();
        }
      });
    },
    onPreviewImage: function onPreviewImage(item) {
      uni.previewImage({
        urls: [this.common.imgUrl(item)],
        success: function success(res) {
          console.log(res, 'res');
        },
        fail: function fail(err) {
          console.log(err, 'err');
        }
      });
    },
    ShowCategoryChange: function ShowCategoryChange() {
      this.isShowCategory = false;
      if (this.giftInfo.length && !this.purchased) {
        uni.showToast({
          icon: 'none',
          title: '请选择赠品规格'
        });
        this.isShowGift = true;
      }
      if (!this.giftInfo.length && !this.purchased) {
        if (this.mode === 'immediately') {
          this.purchase();
        }
        if (this.mode === 'add') {
          this.addCart();
        }
      }
    },
    getCartList: function getCartList() {
      var _this4 = this;
      (0, _product.getCartList)().then(function (res) {
        _this4.shoppingNumber = res.number;
      });
    },
    listJson: function listJson(id) {
      var _this5 = this;
      (0, _product.listJson)({
        pages: 1,
        limit: 20,
        query: {
          idList: id
        }
      }).then(function (res) {
        console.log(res, 'res');
        _this5.commodityList = res.data.data;
      });
    },
    usableGiftListChange: function usableGiftListChange(item, index) {
      return this.usableGiftList[index].indexOf(item.name) > -1 ? true : false;
    },
    usableSpecificationChange: function usableSpecificationChange(item, index) {
      return this.usableSpecificationList.length && this.purchased ? this.usableSpecificationList[index].indexOf(item.name) > -1 ? true : false : true;
    },
    isShowGiftChange: function isShowGiftChange() {
      if (this.detail.activityList.length) {
        this.isShowGife = false;
        var _iterator = _createForOfIteratorHelper(this.detail.activityList),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            if (item.mode === 0) {
              this.isShowGife = true;
              for (var i in item.list) {
                if (item.list[i].indexOf(this.commodityInfo.selectedText[i]) == -1) {
                  this.isShowGife = false;
                }
              }
            }
          }
          // this.isShowGife = this.detail.activityList.filter(item => item.mode === 0)[0].list.some(item =>
          // 	item.index === this.commodityInfo.selectedIndex)
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (!this.isShowGife) {
          this.selectiveGift = [];
        }
      }
    },
    maxNumber: function maxNumber() {
      var specificationIndex = this.giftSpecification.map(function (item) {
        return item.index;
      }).join('-');
      var stock = this.detail.activityList.filter(function (item) {
        return item.mode === 0;
      });
      stock = stock.length ? stock[0].giftList[this.giftIndex].stock_list.list.filter(function (item) {
        return item.index === specificationIndex;
      })[0] : false;
      // let max_number = this.giftInfo[this.giftIndex].max_count * (this.commodityInfo.number / this.detail
      // 	.min_count)
      var max_number = this.giftInfo[this.giftIndex].max_count;
      return stock ? stock.stock > max_number ? max_number : stock.stock : 0;
      // return 6
    },
    commnentList: function commnentList() {
      var _this6 = this;
      (0, _product.commnentList)({
        id: this.id,
        page: 1,
        limit: 3
      }).then(function (res) {
        if (res.code === 0) {
          _this6.commentList = res.data.data;
        } else {
          uni.showToast({
            icon: 'none',
            title: res.msg
          });
        }
      });
    },
    close: function close() {
      var data = [];
      this.giftInfo.filter(function (item) {
        if (item.checked) {
          data.push({
            product_id: item.id,
            number: item.number,
            name: item.name,
            specifications: item.specifications,
            img: item.img
          });
        }
      });
      var value = data.every(function (item) {
        return item.specifications.length;
      });
      if (!value) {
        uni.showToast({
          icon: 'none',
          title: '请选择赠品规格'
        });
        this.giftStatus = false;
        return;
      }
      var test = this.giftInfo.filter(function (item) {
        return item.checked;
      }).map(function (item) {
        return item.name;
      }).join('/');
      this.giftText = test.length ? '已选：' + test : '请选择';
      this.giftStatus = true;
      this.selectiveGift = data;
    },
    giftCategory: function giftCategory(item, index) {
      if (!item.checked) {
        uni.showToast({
          icon: 'none',
          title: '请先选中该赠品'
        });
        return;
      }
      this.giftStockList = item.stock_list;
      this.usableGiftList = item.list;
      this.isShowGiftCategory = true;
      if (this.giftIndex !== index) {
        this.giftSpecification = [];
      }
      this.giftIndex = index;
    },
    pitchOn: function pitchOn(e) {
      if (this.activity.is_single === 0) {
        this.giftInfo.map(function (item) {
          if (item.id === e.name) {
            if (!e.value) {
              item.content = '请选择';
              item.specifications = [];
            }
            item.checked = e.value;
          }
          return item;
        });
      } else {
        this.giftInfo.map(function (item) {
          if (item.id === e.name) {
            if (!e.value) {
              item.content = '请选择';
              item.specifications = [];
            }
            item.checked = e.value;
          } else {
            item.content = '请选择';
            item.specifications = [];
            item.checked = false;
          }
          return item;
        });
      }
      this.$forceUpdate();
    },
    showGift: function showGift() {
      if (this.commodityInfo.content === '请选择 规格/颜色') {
        uni.showToast({
          icon: 'none',
          title: '请先选择商品规格'
        });
        return;
      }
      this.isShowGift = true;
    },
    addCartChange: function addCartChange() {
      this.isShowGift = false;
      if (this.mode === 'add') {
        this.close();
        this.addCart();
      } else {
        this.close();
        this.purchase();
      }
    },
    addCart: function addCart() {
      var _this7 = this;
      this.mode = 'add';
      var gift = [];
      console.log(this.selectiveGift, 'selectiveGift');
      if (this.selectiveGift.length) {
        this.selectiveGift.forEach(function (item) {
          gift.push({
            product_id: item.product_id,
            number: item.number,
            specifications: item.specifications,
            img: item.img
          });
        });
      }
      var data = {
        product_id: this.id,
        number: this.commodityInfo.number,
        specifications: this.commodityInfo.selectedText,
        gift: gift,
        type: 0
      };
      if (!this.commodityInfo.selectedIndex && this.detail.stock_list.type.length !== 0) {
        uni.showToast({
          icon: 'none',
          title: '请选择商品属性'
        });
        this.isShowCategory = true;
        return;
      }
      // console.log(this.giftInfo,!data.gift.length, !this.giftStatus)
      if (!data.gift.length && this.giftInfo.length) {
        uni.showToast({
          icon: 'none',
          title: '请选择赠品'
        });
        this.isShowGift = true;
        return;
      }
      // console.log(data,'data')
      // return
      (0, _product.addCart)(data).then(function (res) {
        if (res.code == 0) {
          uni.showToast({
            icon: 'none',
            title: '添加成功',
            duration: 2000
          });
          _this7.getCartList();
          _this7.isShowCategory = false;
        } else {
          uni.showToast({
            icon: 'none',
            title: '添加失败：' + res.msg,
            duration: 2000
          });
          _this7.isShowCategory = false;
        }
      });
    },
    skip: function skip(url) {
      uni.navigateTo({
        url: url
      });
    },
    homeSkip: function homeSkip(url) {
      uni.switchTab({
        url: url
      });
    },
    commentLink: function commentLink() {
      uni.navigateTo({
        url: '/pagesShop/commodity/commentList?id=' + this.id
      });
    },
    numberChange: function numberChange(e) {
      this.commodityInfo.number = e.value;
    },
    gifeChange: function gifeChange(index, idx, item) {
      this.giftSpecification[index] = {
        index: idx,
        name: item.name
      };
      if (this.giftSpecification.length === this.giftInfo[this.giftIndex].stock_list.type.length) {
        this.giftInfo[this.giftIndex].content = '已选：' + this.giftSpecification.map(function (item) {
          return item.name;
        }).join('/');
        this.giftInfo[this.giftIndex].specifications = this.giftSpecification.map(function (item) {
          return item.name;
        });
      }
      this.$forceUpdate();
    },
    commodityChange: function commodityChange(index, idx, item) {
      var _this8 = this;
      this.specification[index] = {
        index: idx,
        name: item.name
      };
      this.commodityInfo.number = this.detail.min_count;
      if (index === 0 && item.img) {
        this.commodityInfo.img = item.img;
      }
      if (this.specification.length === this.detail.stock_list.type.length) {
        this.commodityInfo.selectedIndex = this.specification.map(function (item) {
          return item.index;
        }).join('-');
        var value = this.detail.stock_list.list.find(function (item) {
          return item.index === _this8.commodityInfo.selectedIndex;
        });
        this.commodityInfo.content = '已选：' + this.specification.map(function (item) {
          return item.name;
        }).join('/');
        this.commodityInfo.price = value.price;
        this.commodityInfo.sale_price = value.sale_price ? value.sale_price : value.price;
        this.commodityInfo.stock = value.stock;
        this.commodityInfo.original_price = value.original_price;
        this.commodityInfo.serialNumber = value.number;
        this.commodityInfo.selectedText = this.specification.map(function (item) {
          return item.name;
        });
      }
      this.isShowGiftChange();
      this.$forceUpdate();
    },
    addPurchasedList: function addPurchasedList() {
      var _this9 = this;
      if (!this.commodityInfo.selectedIndex && this.detail.stock_list.type.length !== 0) {
        uni.showToast({
          icon: 'none',
          title: '请选择商品属性'
        });
        this.isShowCategory = true;
        return;
      }
      this.isShowCategory = false;
      var name = [];
      this.commodityInfo.selectedText.forEach(function (item) {
        return name.push({
          name: item
        });
      });
      console.log(this.detail, 'this.detail');
      var data = [{
        product_id: this.detail.id,
        number: this.commodityInfo.number,
        product: {
          activityList: this.detail.activityList,
          img: this.detail.img,
          name: this.detail.name,
          min_count: this.detail.min_count,
          postage: this.detail.postage
        },
        gift: this.selectiveGift,
        specificationsStatus: {
          img: this.commodityInfo.img,
          name: name,
          price: this.commodityInfo.price
        }
      }];
      var addPurchasedList = this.purchasedList;
      if (this.purchasedList.length) {
        this.purchasedList.forEach(function (item, index) {
          if (item.product_id === _this9.detail.id) {
            addPurchasedList.splice(index, 1, data[0]);
          }
        });
        var flag = addPurchasedList.every(function (item) {
          return item.product_id !== _this9.detail.id;
        });
        if (flag) {
          addPurchasedList = addPurchasedList.concat(data);
        }
      } else {
        addPurchasedList = data;
      }
      this.$store.commit('addPurchasedList', addPurchasedList);
      uni.navigateBack();
    },
    purchase: function purchase(mianyi) {
      if (mianyi == 1) {
        this.showphone = true;
        return;
      }
      this.mode = 'immediately';
      if (!this.commodityInfo.selectedIndex && this.detail.stock_list.type.length !== 0) {
        uni.showToast({
          icon: 'none',
          title: '请选择商品属性'
        });
        this.isShowCategory = true;
        return;
      }
      this.isShowCategory = false;
      var name = [];
      this.commodityInfo.selectedText.forEach(function (item) {
        return name.push({
          name: item
        });
      });
      var data = [{
        org: {
          oid: this.detail.org.id,
          name: this.detail.org.name
        },
        product_id: this.detail.id,
        number: this.commodityInfo.number,
        product: {
          activityList: this.detail.activityList,
          img: this.detail.img,
          name: this.detail.name,
          min_count: this.detail.min_count,
          postage: this.detail.postage
        },
        gift: this.selectiveGift,
        specificationsStatus: {
          img: this.commodityInfo.img,
          name: name,
          price: this.commodityInfo.price
        },
        specifications: name.map(function (item) {
          return item.name;
        })
      }];
      this.$store.commit('purchaseInfo', data);
      this.$store.commit('isSeparate', true);
      uni.navigateTo({
        url: '/pagesShop/order/index'
      });
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 1406:
/*!***********************************************************************************************************************************!*\
  !*** D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/commodity/detail.vue?vue&type=style&index=0&id=5c67bbd4&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_5c67bbd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Downloads/HBuilderX.3.4.18.20220630/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&id=5c67bbd4&lang=scss&scoped=true& */ 1407);
/* harmony import */ var _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_5c67bbd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_5c67bbd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_5c67bbd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_5c67bbd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_3_4_18_20220630_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_5c67bbd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1407:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Melony/千芒/duvclub.7mango.cn-vue/pagesShop/commodity/detail.vue?vue&type=style&index=0&id=5c67bbd4&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[1398,"common/runtime","common/vendor","pagesShop/common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesShop/commodity/detail.js.map