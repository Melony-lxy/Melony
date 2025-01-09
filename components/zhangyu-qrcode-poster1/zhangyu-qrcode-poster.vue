<template>
	<view class="contentt" v-if="isShow" @click.stop="shopImg()">
		<canvas @click.stop="" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" canvas-id="my-canvas"
			v-if="showCanva"></canvas>
		<image :src="canvasImg.replace(/[\r\n]/g,'')" mode="widthFix" v-else></image>
		<!-- #ifdef MP-WEIXIN -->
		<view class="save-btn" @click.stop="saveImage">保存图片</view>
		<!-- #endif -->
	</view>
</template>
<script>
	export default {
		props: {
			headerImg: {
				type: String
			},
			title: {
				type: String
			},
			subTitle: {
				type: String
			},
			price: {
				type: Number
			},
			abImg: {
				type: String
			},
			url: {
				type: String,
				default: ''
			},
			item: Number,
			type: String,
			show: Boolean
		},
		data() {
			return {
				canvasW: 0,
				canvasH: 0,
				ctx: null,
				isShow: false,
				qrcode: '',
				img: '',
				tempFilePath: '',
				userimg: '',
				text: '',
				canvasImg: '',
				showCanva: true
			}
		},
		watch: {
			show(newValue, oldValue) {
				if (newValue) {
					this.getVip()
				}
			}
		},
		// destroyed() {
		// 	this.type = ''
		// },
		methods: {
			shopImg() {
				this.isShow = false
				this.$emit('show')
			},
			/*
			 *  参数说明
			 *  ctx Canvas实例
			 *  img 图片地址
			 *   x  x轴坐标
			 *   y  y轴坐标
			 *   r  圆形半径
			 */
			circleImgOne(ctx, img, x, y, r) {
				// 如果在绘制图片之后还有需要绘制别的元素，需启动 save() 、restore() 方法，否则 clip() 方法会导致之后元素都不可见
				//    save()：保存当前 Canvas 画布状态
				// restore()：恢复到保存时的状态
				ctx.save();
				let d = r * 2;
				let cx = x + r;
				let cy = y + r;
				ctx.arc(cx, cy, r, 0, 2 * Math.PI);
				ctx.strokeStyle = '#FFF'; // 设置绘制圆形边框的颜色
				ctx.clip();
				ctx.drawImage(img, x, y, d, d);
				ctx.stroke(); // 绘制出圆形，默认为黑色，可通过 ctx.strokeStyle = '#FFFFFF'， 设置想要的颜色
				ctx.restore();
			},
			getVip() {
				this.getimg()
			},
			getimg() {
				let data = ''
				// if (this.type == 'type') {
				// 	this.text = '—— 分享课程 ——'
				// 	data = {
				// 		type: this.item
				// 	}
				// } else if (this.type == 'id') {
				// 	this.text = '—— 添加成员 ——'
				// 	data = {
				// 		id: this.item
				// 	}
				// } else if (this.type == 'page') {
				// 	this.text = '—— 分享动态 ——'
				// 	data = {
				// 		page: this.item
				// 	}
				// }
				if (this.url) {
					this.img = this.url
					this.showCanvas(this.headerImg)
				} else {
					this.$axios({
						url: this.$url[87],
						data
					}).then(res => {
						if (res.code == 0) {
							this.img = res.data.qrcode
							this.showCanvas(this.headerImg)
						}
					})
				}
			},
			//显示
			showCanvas(qrcode) {
				this.isShow = true
				this.qrcode = qrcode
				this.__init()
			},
			//初始化画布
			async __init() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				this.ctx = uni.createCanvasContext('my-canvas', this)
				this.canvasW = uni.upx2px(550);
				this.canvasH = uni.upx2px(780);
				//设置画布背景透明
				this.ctx.setFillStyle('rgba(255, 255, 255, 0)')
				//设置画布大小
				this.ctx.fillRect(0, 0, this.canvasW, this.canvasH)
				//绘制圆角背景
				this.drawRoundRect(this.ctx, 0, 0, this.canvasW, this.canvasH, uni.upx2px(18), '#FFFFFF')
				//获取标题图片
				let headerImg = await this.getImageInfo(this.headerImg)
				let hW = uni.upx2px(500);
				let hH = uni.upx2px(320);
				//绘制标题图
				this.drawRoundImg(this.ctx, headerImg.path, ((this.canvasW - hW) / 2), ((this.canvasW - hW) / 2), hW,
					hH, uni.upx2px(16))
				//绘制标题
				this.ctx.setFontSize(this.canvasW / 15); //设置标题字体大小
				this.ctx.setFillStyle('#333'); //设置标题文本颜色
				this.ctx.fillText(this.title, (this.canvasW / 3), (
					((this.canvasW - hW) / 2) + hH + uni.upx2px(80)))
				//绘制副标题
				// this.ctx.setFontSize(14);
				// this.ctx.setFillStyle('#858585');
				// let sWidth = this.ctx.measureText(this.subTitle).width
				// if (sWidth > hW) {
				// 	this.ctx.fillText(this.subTitle.slice(0, 17) + '...', ((this.canvasW - hW) / 2), (
				// 		((this.canvasW - hW) / 2) + hH + uni.upx2px(110)))
				// } else {
				// 	this.ctx.fillText(this.subTitle, ((this.canvasW - hW) / 2), (
				// 		((this.canvasW - hW) / 2) + hH + uni.upx2px(110)))
				// }
				//绘制价格
				// this.ctx.setFontSize(14);
				// this.ctx.setFillStyle('#f54545');
				// this.ctx.fillText('￥',((this.canvasW-hW) / 2),(
				// ((this.canvasW-hW) / 2) + hH + uni.upx2px(180)))
				// this.ctx.setFontSize(18);
				// this.ctx.fillText(this.price,(((this.canvasW-hW) / 2) + uni.upx2px(36)),(
				// ((this.canvasW-hW) / 2) + hH + uni.upx2px(180)))
				//绘制虚线
				// this.drawDashLine(this.ctx, uni.upx2px(20), (((this.canvasW - hW) / 2) + hH + uni.upx2px(240)), (this
				// 	.canvasW - uni.upx2px(20)), (((this.canvasW - hW) / 2) + hH + uni.upx2px(240)), 5)
				//左边实心圆
				this.drawEmptyRound(this.ctx, 0, (((this.canvasW - hW) / 2) + hH + uni.upx2px(300)), uni.upx2px(20))
				//右边实心圆
				this.drawEmptyRound(this.ctx, this.canvasW, (((this.canvasW - hW) / 2) + hH + uni.upx2px(300)), uni
					.upx2px(20))
				//提示文案
				this.ctx.setFontSize(this.canvasW / 23);
				this.ctx.setFillStyle('#858585');
				this.ctx.fillText('长按保存图片或者扫描二维码', (this.canvasW / 4.3), (this.canvasW / 0.75))
				//底部广告
				// let BottomAdImg = await this.getImageInfo(this.abImg)
				// this.ctx.drawImage(BottomAdImg.path,(((this.canvasW-hW) / 2)),(((this.canvasW-hW) / 2) + hH + uni.upx2px(310)),uni.upx2px(350),uni.upx2px(110))
				//小程序码
				let qrcodeImg = await this.getImageInfo(this.img)
				this.ctx.drawImage(qrcodeImg.path, uni.upx2px(168), (((this.canvasW - hW) / 2) + hH + uni.upx2px(120)),
					uni.upx2px(220), uni.upx2px(220))
				//绘制用户头像
				// let userImg = await this.getImageInfo(this.userimg)
				// this.ctx.fillStyle = "#FFFFFF";
				// this.ctx.fillRect(0, 0, uni.upx2px(0), uni.upx2px(0));
				// this.circleImgOne(this.ctx, userImg.path, uni.upx2px(225), uni.upx2px(300), uni.upx2px(50));
				//延迟渲染
				setTimeout(() => {
					this.ctx.draw(true, () => {
						// #ifdef H5
						let _this = this
						uni.canvasToTempFilePath({
							x: 0,
							y: 0,
							canvasId: 'my-canvas',
							success: function(res) {
								// 在H5平台下，tempFilePath 为 base64
								_this.showCanva = false
								_this.canvasImg = res.tempFilePath
							},
						})
						//#endif
					})
					uni.hideLoading()
				}, 500)
			},
			//绘制实心圆
			drawEmptyRound(ctx, x, y, radius) {
				ctx.save()
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
				ctx.setFillStyle('rgba(0, 0, 0, .4)')
				ctx.fill();
				ctx.restore()
				ctx.closePath()
			},
			//绘制虚线
			drawDashLine(ctx, x1, y1, x2, y2, dashLength) {
				ctx.setStrokeStyle("#cccccc") //设置线条的颜色
				ctx.setLineWidth(1) //设置线条宽度
				var dashLen = dashLength,
					xpos = x2 - x1, //得到横向的宽度;
					ypos = y2 - y1, //得到纵向的高度;
					numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
				//利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
				for (var i = 0; i < numDashes; i++) {
					if (i % 2 === 0) {
						ctx.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
						//有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
					} else {
						ctx.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
					}
				}
				ctx.stroke();
			},
			//带圆角图片
			drawRoundImg(ctx, img, x, y, width, height, radius) {
				console.log('height', height)
				ctx.beginPath()
				ctx.save()
				// 左上角
				ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
				// 右上角
				ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2)
				// 右下角
				ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
				// 左下角
				ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)
				ctx.stroke()
				ctx.clip()
				let h = height + 100
				let w = width
				ctx.drawImage(img, x, y, w, h);
				ctx.restore()
				ctx.closePath()
			},
			//圆角矩形
			drawRoundRect(ctx, x, y, width, height, radius, color) {
				ctx.save();
				ctx.beginPath();
				ctx.setFillStyle(color);
				ctx.setStrokeStyle(color)
				ctx.setLineJoin('round'); //交点设置成圆角
				ctx.setLineWidth(radius);
				ctx.strokeRect(x + radius / 2, y + radius / 2, width - radius, height - radius);
				ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
				ctx.stroke();
				ctx.closePath();
			},
			//获取图片
			getImageInfo(imgSrc) {
				let url = this.common.imgUrl(imgSrc) + '?t=' + new Date().getTime();
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: url,
						success: (image) => {
							resolve(image);
							console.log('获取图片成功', image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败', err)
						}
					});
				});
			},
			
			//保存图片到相册
			saveImage() {
				//判断用户授权
				uni.getSetting({
					success(res) {
						console.log('获取用户权限', res.authSetting)
						if (Object.keys(res.authSetting).length > 0) {
							//判断是否有相册权限
							if (res.authSetting['scope.writePhotosAlbum'] == undefined) {
								//打开设置权限
								uni.openSetting({
									success(res) {
										console.log('设置权限', res.authSetting)
									}
								})
							} else {
								if (!res.authSetting['scope.writePhotosAlbum']) {
									//打开设置权限
									uni.openSetting({
										success(res) {
											console.log('设置权限', res.authSetting)
										}
									})
								}
							}
						} else {
							return
						}
					}
				})
				var that = this
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					quality: 1,
					complete: (res) => {
						console.log('保存到相册', res);
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
								setTimeout(() => {
									that.isShow = false
								}, 2000)
							}
						})
					}
				}, this);
			}
		}
	}
</script>
<style scoped lang="scss">
	.contentt {
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .4);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.save-btn {
			margin-top: 35rpx;
			color: #FFFFFF;
			background: linear-gradient(to right, #FE726B, #FE956B);
			padding: 15rpx 40rpx;
			border-radius: 50rpx;
		}
	}
</style>