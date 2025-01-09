import Vue from "vue";

const url = {
	0: "/user/login", // 登录
	/**
	 * phone: 手机号
	 * password: 密码
	 * code: 验证码
	 * type： 0:密码登录, 1:验证码登录
	 */
	1: "/user/modifyPwd", // 忘记密码
	/**
	 * new_password: 新密码
	 * old_password: 确认新密码
	 * phone: 手机号
	 */
	2: "/common/getRegisterPhoneVerifyCode", // 获取验证码
	/**
	 * phone: 手机号
	 */
	3: "/wx/oauthLogin", // 微信小程序登录
	4: "/wx/register", // 注册
	5: "/user/validatePhone", // 验证手机号
	/**
	 * phone: 手机号
	 * code: 验证码
	 */
	6: "/user/info", // 用户详情
	/**
	 * 获取
	 * phone: 手机号
	 * nick: 昵称
	 * avatar_url: 头像
	 */
	7: "/course/info", //课程详情
	8: "/wx/bannerList", //首页banner
	9: "/course/listJson", //课程列表
	10: "/course/addOrder", //添加订单
	11: "/course/orderList", //订单列表
	12: "/course/orderInfo", //订单详情
	13: "/course/studyInfo", //授课详情
	14: "/course/dayList", //课节列表
	15: "/course/dayInfo", //科节详情
	16: "/course/dayResources", //预习 复习 作业 检测
	17: "/course/taskInfo", //作业详情
	18: "/course/taskSubmit", //作业提交
	19: "/uploadImg", //上传图片
	20: "/course/taskList", //作业列表
	21: "/test/getList", //我的测验
	22: "/user/changeInfo", //更改用户信息
	23: "/user/changePhone", //更改手机号
	24: "/user/modifyPwd", //更改密码
	25: "/course/schedule", //约课
	26: "/course/teacherTimeList", //约课列表
	27: "/course/monthList", //当月课表
	28: "/course/timetableList", //当天课表
	29: "/teacher/getList", //精英导师
	30: "/test/info", //检测详情
	31: "/message/getList", //消息列表
	32: "/wx/wxqrcode", //h5授权登录
	33: "/wx_order/buildOrderInfo", //课程微信支付
	34: "/test/submit", //提交测验
	36: "/test/submitInfo", //提交测验详情
	37: "/statistics/index", //课程/作业/测验/消息统计
	38: "/course/adjustment", //调课接口
	39: "/common/consult", //咨询接口
	40: "/course/refundOrder", //订单申请退课
	41: "/course/cancelOrder", //取消订单
	42: "/pc/h5Register", //微信h5注册
	43: "/share", //分享
	44: '/user/bindingPhone', // 手机号绑定
	45: '/course/subjectList', //课程类型
	46: '/teacher/info', //教师详情
	47: '/org/listJson', //机构详情
	48: '/communication/listJson', //动态列表
	49: '/communication/getDetail', //动态详情
	50: '/communication/getLabelList', //动态标签
	51: '/user/changeEvaluation', // 点赞|收藏
	52: '/communication/delete', // 删除动态
	53: '/user/getRelease', // 评论
	54: '/communication/commentsDelete', // 删除评论
	55: '/communication/search', // 搜索列表
	56: '/communication/searchAdd', // 添加搜索
	57: '/communication/searchRemove', // 清空搜索
	58: '/communication/addOrEdit', // 添加或编辑动态
	59: '/communication/addLabel', // 添加动态标签
	60: '/sign_in/sign', // 签到
	61: '/sign_in/getDetail', // 签到记录
	62: '/sign_in/getSummary', // 汇总
	63: '/sign_in/getSignList', // 签到记录列表
	64: '/communication/exchangeList', //交流圈列表
	65: '/communication/addExchange', //加入交流圈
	66: '/member_relation/memberList', //成员列表
	67: '/member_relation/addMember', //添加新成员
	68: '/communication/exchangeDetail', //交流表详情
	69: '/communication/exitSpecial', //退出交流圈
	70: "/ali_order/buildOrderInfo", //课程支付宝支付
	71: '/communication/exchangeDetail', //获取交流圈内容
	72: '/user/membersInfo', //会员详情页
	73: '/course/addOrEditMemorandum', //添加计划
	74: '/course/memorandumList', //计划列表
	75: '/course/deleteMemorandum', //删除计划
	76: '/member/type', //会员价格
	77: '/course/changeMemorandum', //修改计划状态
	78: '/course/memorandumInfo', //计划详情
	79: '/communication/getUserDetail', //个人用户中心
	80: '/communication/getFollowList', //收藏用户
	81: '/communication/getFansList', //收藏用户
	82: '/shares/setSecret',
	83: '/shares/addMember', //分享添加成员
	84: '/member_relation/deleteRealtion', //删除成员
	85: '/member_relation/detail', //成员信息详情
	86: '/member_relation/editMember', //成员信息修改
	87: '/qrcode/creatQrcode', //获取二维码
	88: '/user/getUserMemberInfo' ,//签到页面获取用户信息
	89: '/org/isRepresentive' ,//是否开启课代表
	90: '/apply/applyStatus' ,//课代表申请进度
	91: '/apply/getBankList' ,//银行列表
	92:'/apply/apply' ,//提交课代表申请
	93: '/wallet/info' ,//钱包余额
	94:'/wallet/listJson' ,//钱包流水记录
	95:'/wallet/cashOut' ,//余额提现
	96:'/wallet/getOrderList' ,//累计订单列表
	97:'/wallet/getUserList' ,//累计客户列表
	98:'/common/articleDetail' ,//隐私政策or用户协议
	99:'/wallet/scoreRecordList' ,//积分列表
	99:'/wallet/scoreRecordList', //积分列表
	100:'/course/worksList', //作品列表
	101:'/course/worksinfo' ,//作品详情
	102:'/wallet/scoreRecordRule'  ,//积分规则
	103:'/common/payStatus', //上架判断
	104:'/user/unsubscribe',//注销账号
	105:'/user/decode',//合伙人转义 
	106: "/wx/thirdPartyLogin", // APP微信登录
	107: "/marketing_treasure/info", // 学员报名详情页
	108: "/marketing_treasure/application", // 学员报名
	109: "/user/feedback ", // 老师评价
	110: "/org/info",//报名机构信息
	111: "/marketing_treasure/share", // 分享营销宝
	112: "/common/getUploadParams" ,//获取路径
	113: "/store/info",
	114: "/store/userList",
	115: "/store/orderList",
	116: "/store/listJson",
	117: "/store/cashOut",
	118: "/activity/categoryList" ,//活动分类
	119: "/activity/listJson" ,//活动列表
	120: "/activity/info" ,//活动详情
	121: "/activity/application" ,//活动报名
	122: "/activity/signIn", //活动签到
	123: "/activity/applicationInfo", //报名详情
	124: "/activity/orderAdd", //报名支付
	125: "/wx/login", // 微信小程序手机号登录
	126: "/user/list"
};
Vue.prototype.$url = url;
export default url;
