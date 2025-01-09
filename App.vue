<script>
	export default {
		onLaunch: function() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	@import '/common/css/flex.css';
	@import 'uview-ui/theme.scss';
	/*每个页面公共css */
	image {
		// vertical-align: bottom;
	}

	uni-toast {
		z-index: 99999;
	}

	@font-face {
		font-family: fontXZJ;
		src: url('https://swan.imlimit.com/bahnschrift.ttf');
	}

	.priceItem,
	.xprice {
		font-family: fontXZJ;
	}

	/deep/ .uni-tabbar-border {
		height: 1rpx !important;
		background-color: rgba(0, 0, 0, 0.2) !important;
	}

	.u-swiper-indicator {
		padding: 0 !important;
	}

	.u-btn--success {
		color: #ffffff;
		white-space: nowrap;
		border-color: $project-color !important;
		background-color: $project-color !important;
	}

	.u-success-hover {
		background: $project-color !important;
		color: #fff;
	}

	.uni-checkbox-input {
		border-radius: 50% !important;
		width: 35rpx !important;
		height: 35rpx !important;
	}

	.uni-checkbox-input-checked {
		background-color: $project-color !important;
		color: #fff !important;
		border-color: $project-color !important;
	}

	.LandingPage {
		.u-indicator-item-round {
			background-color: $project-color !important;
			opacity: .2;
		}

		.u-indicator-item-round-active {
			background-color: $project-color !important;
			opacity: 1;
		}

	}

	.uni-checkbox-input:hover {
		border-color: #fff !important;
	}

	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		width: 35rpx !important;
		height: 35rpx !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background-color: $project-color !important;
		color: #fff !important;
		border-color: $project-color !important;
	}

	.vjs-custom-skin>.video-js .vjs-big-play-button {
		background-color: #fffc !important;
	}

	/* #ifdef APP */
	.agreement {
		.u-checkbox__icon-wrap__icon {

			position: relative !important;
		}

		.uicon-checkbox-mark {
			top: 50% !important;
			left: 50% !important;
			transform: translate(-50%, 0) !important;
			position: absolute !important;
		}
	}

	/* #endif */
</style>