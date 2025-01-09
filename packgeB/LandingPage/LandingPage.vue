<template>
	<view class="LandingPage">
		<view class="navbar">
			<image :src="common.imgUrl('/static/samll-logo.png')" mode="widthFix" class="logo"></image>
			<view class="navbarR">
				<view class="experience">
					免费体验
				</view>
				<image :src="common.imgUrl('/static/icon/tabulation.png')" mode="widthFix" class="tabulation"></image>
			</view>
		</view>
		<u-swiper :list="list" height='300'></u-swiper>
		<view class="LandingTitleBox">
			<image :src="common.imgUrl('/static/landing/QIANMANG.png')" mode="widthFix" class="QIANMANG"></image>
			<view class="LandingTitleAbs">
				<view class="LandingText">
					提供教培机构日常运营全维度解决方案
					<view class="LandingTitleL">
						<image :src="common.imgUrl('/static/landing/ToLeft.png')" mode="heightFix" class="ToLeft" style="opacity: .3;">
						</image>
						<image :src="common.imgUrl('/static/landing/ToLeft.png')" mode="heightFix" class="ToLeft" style="opacity: .6;">
						</image>
					</view>
					<view class="LandingTitleR">
						<image :src="common.imgUrl('/static/landing/ToRight.png')" mode="heightFix" class="ToRight" style="opacity: .6;">
						</image>
						<image :src="common.imgUrl('/static/landing/ToRight.png')" mode="heightFix" class="ToRight" style="opacity: .3;">
						</image>
					</view>
				</view>

			</view>
		</view>
		<view class="Solution">
			<view class="SolutionBox">
				<view class="SolutionTitleBox">
					<image :src="common.imgUrl('/static/landing/Solution.png')" mode="widthFix" class="SolutionImg"></image>
					<view class="">
						全场景帮你引流招生
					</view>
				</view>
				<view class="recruitStudentBox">
					<view class="characteristicBox">
						<view class="characteristic" v-for="(item,idx) in recruitStudentList" :key="idx"
							:style="{'margin-bottom':idx==recruitStudentList.length-1 ? '0' : '20rpx'}">
							<view class="characteristicTitle">
								{{item.title}}
							</view>
							<view class="characteristicDescribe">
								{{item.describe}}
							</view>
						</view>
					</view>
					<view class="PreviewBox">
						<view class="PreviewBoxT">
							<view class="hdyxImg">
								<image :src="common.imgUrl('/static/landing/hdyx.png')" mode="aspectFill" class="hdyx"></image>
							</view>
							<view class="hdyxImg">
								<image :src="common.imgUrl('/static/landing/hdyx1.png')" mode="aspectFill" class="hdyx"></image>
							</view>
							<view class="hdyxBox">
								<image :src="common.imgUrl('/static/landing/chatting.png')" mode="widthFix" class="chatting"></image>
								<view class="">
									互动营销
								</view>
							</view>
						</view>
						<view class="PreviewBoxB">
							<image :src="common.imgUrl('/static/landing/wsc.png')" mode="aspectFill" class="PreviewBoxBImg"></image>
							<image :src="common.imgUrl('/static/landing/zbyl.png')" mode="aspectFill" class="PreviewBoxBImg"></image>
							<image :src="common.imgUrl('/static/landing/kdbfx.png')" mode="aspectFill" class="PreviewBoxBImg"></image>
							<view class="chattingRBox">
								<image :src="common.imgUrl('/static/landing/chattingR.png')" mode="widthFix" class="chattingR"></image>
								<view class="">
									微商城
								</view>
							</view>
							<view class="chattingTBox">
								<image :src="common.imgUrl('/static/landing/chattingT.png')" mode="widthFix" class="chattingT"></image>
								<view class="">
									直播引流
								</view>
							</view>
							<view class="chattingRBox1">
								<image :src="common.imgUrl('/static/landing/chattingR1.png')" mode="widthFix" class="chattingR1"></image>
								<view class="">
									课代表分销
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="SolutionTitleBox">
					<image :src="common.imgUrl('/static/landing/Solution.png')" mode="widthFix" class="SolutionImg"></image>
					<view class="">
						灵活搞定教务痛点
					</view>
				</view>
				<view class="flexibleBox">
					<view class="flexibleInnerBox" v-for="(item,idx) in advantageList" :key="idx"
						:style="{'margin-bottom':idx==advantageList.length-1 ? 0 : '50rpx','padding-left':idx%2==0? '30rpx' : '17rpx','padding-right':idx%2==0? '17rpx' : '30rpx','flex-direction':idx%2==0? 'row' : 'row-reverse'}">
						<view class="flexibleContent">
							{{item.content}}
						</view>
						<view class="flexibleImgBox">
							<image :src="item.img" mode="aspectFill" class="flexibleImg"></image>
						</view>
						<view class="flexiblePopup" :style="{left:idx%2==0? '0' : 'auto',right:idx%2==1? '0' : 'auto'}">
							<image :src="common.imgUrl('/static/landing/flexible.png')" mode="widthFix" class="flexible"
								:style="{transform:idx%2==0? 'rotateY(0deg)' : 'rotateY(180deg)'}"></image>
							<view class="">
								{{item.title}}
							</view>
						</view>
					</view>
				</view>
				<view class="SolutionTitleBox">
					<image :src="common.imgUrl('/static/landing/Solution.png')" mode="widthFix" class="SolutionImg"></image>
					<view class="">
						助力提升家校服务体验
					</view>
				</view>
				<view class="HomeSchoolBox">
					<view class="xsdBox">
						<image :src="common.imgUrl('/static/landing/xsd.png')" mode="widthFix" class="xsd"></image>
						<view class="CheckBox">
							<image :src="common.imgUrl('/static/landing/checkboxBG.png')" mode="widthFix" class="checkboxBG"></image>
							<view class="CheckBoxTitle">
								学生端
							</view>
							<view class="CheckInnerBox">
								<view class="" v-for="item in checkList">
									<view class="CheckInnerBoxT">
										<image :src="common.imgUrl('/static/landing/check.png')" mode="widthFix" class="check"></image>
										<view class="">
											{{item.title}}
										</view>
									</view>
<!-- 									<view class="CheckInnerBoxB">
										{{item.content}}
									</view> -->
								</view>
							</view>
						</view>
					</view>
					<view class="phoneBox">
						<image :src="common.imgUrl('/static/landing/khzy.png')" mode="widthFix" class="phoneImg"></image>
						<image :src="common.imgUrl('/static/landing/stcs.png')" mode="widthFix" class="phoneImg"></image>
						<image :src="common.imgUrl('/static/landing/sshp.png')" mode="widthFix" class="phoneImg"></image>
						<view class="phoneTBox">
							<view class="" v-for='item in photoDetailList'>
								<view class="phoneTBoxTitle">
									{{item.title}}
								</view>
								<view class="phoneTBoxLine">
									
								</view>
								<view class="phoneTBoxDetail">
									{{item.detail}}
								</view>
							</view>
						</view>
						<view class="TphotoBox">
							<image :src="common.imgUrl('/static/landing/rcdt.png')" mode="widthFix" class="phoneImg"></image>
							<image :src="common.imgUrl('/static/landing/qtcz.png')" mode="widthFix" class="phoneImg"></image>
						</view>
						<view class="phoneBottomBox">
							<view class="phoneBottomBoxL">
								<view class="phoneBottomtitle">
									日常动态
								</view>
								<view class="phoneBottomLine">
									
								</view>
								<view class="phoneBottomDetail">
									支持图片 / 视频拍摄分享日常学习交流心得。
								</view>
							</view>
							<view class="">
								<view class="phoneBottomtitle">
									其他操作
								</view>
								<view class="phoneBottomLine">
									
								</view>
								<view class="phoneBottomDetail">
									在线约课、调课、课前提醒等等。
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				recruitStudentList: [{
						title: '互动营销',
						describe: '微单页、团购、秒杀等基于微信生态社交营销活动,迅速裂变低成本招生。'
					},
					{
						title: '微商城',
						describe: '课程、学习周边用品在线售卖,增加营收。'
					},
					{
						title: '直播引流',
						describe: '网上公开课，吸引学员报名,收集意向线索进行销售转化。'
					},
					{
						title: '课代表分销',
						describe: '将学员转变为"推广员",轻松实现老生带新生。'
					},
				],
				advantageList: [{
						title: '课程管理',
						content: '1V1课程/班级课程，模式丰富，支持多样化付费，课消模式选择更自由。',
						img: this.common.imgUrl('/static/landing/kcgl.png')
					},
					{
						title: '班级管理',
						content: '灵活便捷，分班调班一键操作，效率大幅提升。',
						img: this.common.imgUrl('/static/landing/bjgl.png')
					},
					{
						title: '智能排课',
						content: '批量排课，支持规律性/非规律性排课，实时自动冲突检测，零出错',
						img: this.common.imgUrl('/static/landing/znpk.png')
					},
					{
						title: '可视化课表',
						content: '自动生成日历式可视化课表',
						img: this.common.imgUrl('/static/landing/kshkb.png')
					},
					{
						title: '考勤',
						content: '高效准确，点名考勤准确记录课时上课情况一目了然。',
						img: this.common.imgUrl('/static/landing/kq.png')
					},
				],
				checkList:[
					{title:'更省时',content:'只学高频题型大招,节省时间和精力'},
					{title:'更科学',content:'利用大数据方法进行分析决策'},
					{title:'更高效',content:'大数据分析,AI诊断定制化学习方案'},
					{title:'更超值',content:'精品录播高性价比,支持分期'},
				],
				photoDetailList:[
					{title:'课后作业',detail:'支持上传图片、文字附件等作业形式。'},
					{title:'随堂测试',detail:'主观题 / 客观题，检验学习成果。'},
					{title:'师生互评',detail:'学员评价老师，查看老师课堂点评。'}
				]
			};
		}
	}
</script>

<style lang="scss">
	.LandingPage {
		background: #FFE7DD;
		.Solution {
			width: 692rpx;
			background: #FF6638;
			box-shadow: -5rpx -5rpx 20rpx 1rpx rgba(255, 255, 255, 0.8);
			border-radius: 16rpx;
			border: 1rpx solid #FFFFFF;
			margin: 0 auto;
			display: flex;
			justify-content: flex-end;
			.HomeSchoolBox{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 30rpx 182rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0,0,0,0.1);
				border-radius: 13rpx;
				.phoneBox{
					padding: 234rpx 0 330rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					position: relative;
					.TphotoBox{
						width: 367rpx;
						position: absolute;
						display: flex;
						justify-content: space-between;
						left: 50%;
						bottom:215rpx;
						transform: translateX(-50%);
					}
					.phoneBottomBox{
						position: absolute;
						display: flex;
						width: 100%;
						align-items: center;
						justify-content: space-between;
						bottom: 18rpx;
						.phoneBottomBoxL{
							&::before{
								content: ''; 
								
							}
						}
						>view{
							width: 231rpx;
							height:180rpx;
							border-radius: 18rpx;
							box-sizing: border-box;
							padding: 12rpx;
							border: 1rpx solid #FF6638;
							.phoneBottomtitle{
								text-align: center;
								font-size: 26rpx;
								font-weight: bold;
								color: #FF6638;
							}
							.phoneBottomLine{
								width: 36rpx;
								height: 3rpx;
								background: #FF6638;
								margin: 10rpx auto;
							}
							.phoneBottomDetail{
								font-size: 24rpx;
								font-weight: bold;
								color: #333333;
							}
						}
					}
					.phoneImg{
						width: 179rpx;
					}
					.phoneTBox{
						position: absolute;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						left: 0;
						top: 34rpx;
						>view{
							position: relative;
							width: 179rpx;
							box-sizing: border-box;
							border-radius: 18rpx;
							padding: 12rpx;
							border: 1rpx solid #FF6638;
							&::before{
								content: '';
								position: absolute;
								width: 2rpx;
								height: 80rpx;
								left: 50%;
								bottom: 0;
								transform: translate(-50%,100%);
								background:#FF6638;
							}
							&::after{
								content: '';
								position: absolute;
width: 7rpx;
height: 7rpx;
								left: 50%;
								bottom: -80rpx;
								transform: translate(-50%,-50%);
								background:#FF6638;
							}
							.phoneTBoxTitle{
								text-align: center;
								font-size: 26rpx;
								font-weight: bold;
								color: #FF6638;
							}
							.phoneTBoxLine{
								width: 36rpx;
								height: 3rpx;
								background: #FF6638;
								margin: 10rpx auto;
							}
							.phoneTBoxDetail{
								font-size: 24rpx;
								font-weight: bold;
								color: #333333;
							}
						}
					}
				}
				.xsdBox{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.xsd{
						width: 179rpx;
					}
					.CheckBox{
						position: relative;
						.CheckBoxTitle{
							position: absolute;
							font-size: 28rpx;
							font-weight: bold;
							color: #FFFFFF;
							left: 16rpx;
							top: 11rpx;
						}
						.CheckInnerBox{
							display: flex;
							flex-direction: column;
							width: 337rpx;
							height: 304rpx;
							background: #FFFFFF;
							border-radius: 12rpx;
							box-sizing: border-box;
							padding-left: 20rpx;
							position: absolute;
							justify-content: space-evenly;
							right: 0;
							bottom: 0;
							.CheckInnerBoxT{
								display: flex;
								align-items: center;
								font-size: 24rpx;
								font-weight: bold;
								color: #333333;
								.check{
									margin-right: 10rpx;
									width: 21rpx;
								}
							}
							.CheckInnerBoxB{
								font-size: 18rpx;
								font-weight: bold;
								color: #666666;
							}
						}
					}
					.checkboxBG{
						width: 353rpx;
					}
				}
			}
			.flexibleBox {
				padding: 20rpx 0 40rpx;

				.flexibleInnerBox {
					width: 100%;
					height: 220rpx;
					background: #FFFFFF;
					border-radius: 13rpx 13rpx 13rpx 13rpx;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					justify-content: space-between;
					position: relative;

					.flexibleContent {
						font-size: 18rpx;
						font-weight: bold;
						color: #333333;
						line-height: 1.5;
						width: 284rpx;
					}

					.flexiblePopup {
						position: absolute;
						top: -20rpx;
						font-size: 24rpx;
						font-weight: bold;
						color: #FFFFFF;

						>view {
							position: absolute;
							left: 50%;
							white-space: nowrap;
							top: 14rpx;
							transform: translateX(-50%);
						}

						.flexible {
							width: 170rpx;
						}
					}

					.flexibleImgBox {
						width: 258rpx;
						height: 156rpx;
						background: #FFFFFF;
						box-shadow: 0rpx 0rpx 20rpx 1rpx rgba(0, 0, 0, 0.1);
						border-radius: 13rpx;
						border: 1rpx solid #FF6638;
						display: flex;
						align-items: center;
						justify-content: center;

						.flexibleImg {
							width: 240rpx;
							height: 138rpx;
						}
					}
				}
			}

			.PreviewBox {
				width: 100%;
				padding-top: 73rpx;

				.PreviewBoxB {
					width: 572rpx;
					height: 309rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 0rpx 20rpx 1rpx rgba(0, 0, 0, 0.1);
					border-radius: 13rpx;
					border: 1rpx solid #FF6638;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					position: relative;

					.PreviewBoxBImg {
						width: 178rpx;
						height: 291rpx;
					}

					.chattingTBox {
						position: absolute;
						left: 240rpx;
						bottom: -35rpx;

						.chattingT {
							width: 150rpx;
						}

						>view {
							position: absolute;
							bottom: 24rpx;
							white-space: nowrap;
							left: 50%;
							transform: translateX(-50%);
							font-size: 24rpx;
							font-weight: bold;
							color: #FFFFFF;
						}
					}

					.chattingRBox1 {
						position: absolute;
						right: 35rpx;
						top: -70rpx;

						.chattingR1 {
							width: 150rpx;
						}

						>view {
							position: absolute;
							top: 20rpx;
							white-space: nowrap;
							left: 50%;
							transform: translateX(-50%);
							font-size: 24rpx;
							font-weight: bold;
							color: #FFFFFF;
						}
					}

					.chattingRBox {
						position: absolute;
						left: 40rpx;
						top: -70rpx;

						.chattingR {
							width: 150rpx;
						}

						>view {
							position: absolute;
							top: 20rpx;
							white-space: nowrap;
							left: 50%;
							transform: translateX(-50%);
							font-size: 24rpx;
							font-weight: bold;
							color: #FFFFFF;
						}
					}
				}

				.PreviewBoxT {
					margin-bottom: 20rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					position: relative;

					.hdyxImg {
						width: 268rpx;
						height: 178rpx;
						background: #FFFFFF;
						box-shadow: 0rpx 0rpx 20rpx 1rpx rgba(0, 0, 0, 0.1);
						border-radius: 13rpx;
						border: 1rpx solid #FF6638;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.hdyxBox {
						position: absolute;
						font-size: 24rpx;
						font-weight: bold;
						color: #FFFFFF;
						top: -70rpx;
						left: 50%;
						transform: translateX(-50%);

						.chatting {
							width: 150rpx;
						}

						>view {
							position: absolute;
							top: 20rpx;
							white-space: nowrap;
							left: 50%;
							transform: translateX(-50%);
						}
					}

					.hdyx {
						width: 248rpx;
						height: 160rpx;
					}
				}
			}

			.SolutionBox {
				width: 674rpx;
				background: #FFF7F0;
				box-shadow: 5rpx 5rpx 20rpx 1rpx rgba(255, 102, 56, 0.2), inset 0rpx 0rpx 6rpx 1rpx #FFFFFF;
				border-radius: 16rpx;
				box-sizing: border-box;
				padding: 40rpx 40rpx 40rpx 20rpx;

				.SolutionTitleBox {
					position: relative;
					margin-bottom: 30rpx;

					.SolutionImg {
						width: 100%;
					}

					>view {
						position: absolute;
						top: 8rpx;
						left: 36rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: #FFFFFF;
					}
				}

				.recruitStudentBox {
					width: 100%;
					background-color: #FFF;
					padding: 20rpx 20rpx 35rpx;
					box-sizing: border-box;
					margin-bottom: 40rpx;
					box-shadow: 0rpx 0rpx 20rpx 1rpx rgba(0, 0, 0, 0.1);
					border-radius: 14rpx;

					.characteristicBox {
						.characteristic {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.characteristicTitle {
								width: 150rpx;
								line-height: 56rpx;
								background: linear-gradient(131deg, #FF6638 0%, #FE9C8A 100%);
								box-shadow: 0rpx 0rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);
								border-radius: 13rpx;
								text-align: center;
								font-size: 24rpx;
								font-weight: bold;
								color: #FFFFFF;
							}

							.characteristicDescribe {
								width: 400rpx;
								line-height: 1.5;
								font-size: 18rpx;
								font-weight: bold;
								color: #333333;
							}
						}
					}
				}
			}
		}

		.LandingTitleBox {
			padding: 70rpx 0 18rpx;
			display: flex;
			justify-content: center;
			position: relative;
			margin-bottom: 38rpx;

			.QIANMANG {
				width: 293rpx;
			}

			.LandingTitleAbs {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				justify-content: center;

				.LandingText {
					font-size: 36rpx;
					font-weight: bold;
					color: #FF6638;
					text-shadow: 0px 3px 6px rgba(255, 255, 255, 0.16);
					position: relative;
					white-space: nowrap;

					.LandingTitleL {
						display: flex;
						position: absolute;
						left: -12rpx;
						top: 50%;
						transform: translate(-100%, -50%);

						.ToLeft {
							height: 20rpx;
						}
					}

					.LandingTitleR {
						display: flex;
						position: absolute;
						right: -12rpx;
						top: 50%;
						transform: translate(100%, -50%);

						.ToRight {
							height: 20rpx;
						}
					}
				}
			}
		}

		.navbar {
			position: fixed;
			top: 0;
			z-index: 9999;
			left: 0;
			width: 750rpx;
			padding: 12rpx 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;

			.logo {
				width: 130rpx;
			}

			.navbarR {
				display: flex;
				align-items: center;

				.tabulation {
					width: 25rpx;
				}

				.experience {
					padding: 5rpx 12rpx;
					background: #FFFFFF;
					border-radius: 24rpx;
					font-size: 20rpx;
					color: #FF6638;
					margin-right: 40rpx;
				}
			}
		}
	}
</style>