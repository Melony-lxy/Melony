<template>
	<view class="box">
		<u-form :model="form" ref="uForm" :label-style='{color:"#2D2D2D",fontSize:"32rpx",fontWeight:"400"}'>
			<u-form-item label="新密码" label-width='183rpx'>
				<u-input placeholder="6-16位字符 数字/字母/汉字" :clearable='false' type="password"
					v-model="form.new_password" />
			</u-form-item>
			<u-form-item label="确认新密码" label-width='183rpx'>
				<u-input placeholder="6-16位字符 数字/字母/汉字" :clearable='false' type="password"
					v-model="form.old_password" />
			</u-form-item>
		</u-form>
		<view class="buttonBox">
			<u-button @click="submit"
				:custom-style='{height:"90rpx",background:"#FF6638",fontWeight:"bold",marginTop:"80rpx"}'
				type="success">确认修改</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: '',
					new_password: '',
					old_password: '',
					code: '',
				}
			}
		},
		onLoad(option) {
			this.form.phone = option.phone
			this.form.code = option.code
		},
		methods: {
			submit() {
				let data = this.form;
				if (!data.new_password) {
					this.$u.toast('密码必填');
					return;
				} else if (data.new_password != data.old_password) {
					this.$u.toast('两次密码输入不一致');
					return;
				}

				this.$axios({
					url: this.$url[1],
					data: {
						...data
					}
				}).then((res) => {
					if (res.code == 0) {
						uni.hideLoading();
						this.$u.toast('密码修改成功');
						uni.navigateBack({
							delta: 3
						})

					}
				})
			}
		}
	}
</script>

<style>
	.box {
		padding: 66rpx 72rpx;
	}

	.buttonBox {
		margin-top: 59rpx;
	}
</style>
