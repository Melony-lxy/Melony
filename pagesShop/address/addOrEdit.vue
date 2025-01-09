<template>
	<view class="main whiteBg">
		<view class="content">
			<u-form :model="model" ref="uForm">
				<u-form-item label="姓名" prop="name" label-width="150">
					<u-input v-model="model.name" placeholder="请输入姓名" :border="false" />
				</u-form-item>
				<u-form-item label="手机号" prop="phone" label-width="150">
					<u-input v-model="model.phone" placeholder="请输入手机号" :border="false" />
				</u-form-item>
				<u-form-item label="选择地区" prop="region" label-width="150">
					<u-input
						type="select"
						:select-open="pickerShow"
						v-model="model.region"
						placeholder="省、市、区"
						@click="pickerShow = true"
						:border="false"
					></u-input>
				</u-form-item>
				<u-form-item label="详细地址" prop="details" label-width="150">
					<u-input
						v-model="model.details"
						placeholder="街道小区楼栋/乡村名称"
						type="textarea"
						:border="false"
					/>
				</u-form-item>
				<u-form-item label="备注信息" prop="remarks" label-width="150">
					<u-input
						v-model="model.remarks"
						placeholder="请输入备注信息(选填)"
						type="textarea"
						:border="false"
					/>
				</u-form-item>
				<u-form-item label="设为默认收货地址" label-width="240">
					<u-switch
						size="40"
						v-model="model.is_default"
						slot="right"
						@change="change"
						active-color="#FF7F36"
					></u-switch>
				</u-form-item>
			</u-form>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		</view>
		<view class="footer"><view class="submit center size32" @click="submit">提交</view></view>
	</view>
</template>

<script>
import { addOrEdit, getDetail } from '@/plugin/api/personal.js'
export default {
	data() {
		return {
			mode: 'add',
			id: '',
			pickerShow: false,
			model: {
				name: '',
				phone: '',
				region: '',
				details: '',
				remarks: '',
				is_default: false
			},
			rules: {
				name: [
					{
						required: true,
						message: '请填写名称',
						trigger: 'change'
					}
				],
				phone: [
					{
						required: true,
						message: '请填写手机号',
						trigger: 'change'
					}
				],
				region: [
					{
						required: true,
						message: '请填写地区',
						trigger: 'change'
					}
				],
				details: [
					{
						required: true,
						message: '请填写详细地址',
						trigger: 'change'
					}
				]
			}
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules)
	},
	onLoad(options) {
		this.mode = options.mode
		this.id = options.id
		if (options.mode === 'edit') {
			this.getDetail()
		}
	},
	methods: {
		change(status) {
			this.model.is_default = status
			this.$forceUpdate()
		},
		getDetail() {
			getDetail({
				id: this.id
			}).then(res => {
				this.model = {
					name: res.data.name,
					phone: res.data.phone,
					remarks: res.data.remarks,
					region: res.data.province + '-' + res.data.city + '-' + res.data.district,
					details: res.data.details,
					is_default: res.data.is_default === '1' ? true : false
				}
			})
		},
		regionConfirm(e) {
			this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label
		},
		submit() {
			let model = this.model
			let address = this.model.region.split('-')
			this.$refs.uForm.validate(valid => {
				if (valid) {
					let data = {
						name: model.name,
						area_code: 86,
						phone: model.phone,
						province: address[0],
						city: address[1],
						district: address[2],
						street: 'xxxx',
						details: model.details,
						remarks: model.remarks,
						is_default: model.is_default ? '1' : '0'
					}
					if (this.mode === 'edit') {
						data.id = this.id
					}
					addOrEdit(data).then(res => {
						if (res.code === 0) {
							if (this.mode === 'add') {
								uni.showToast({
									icon: 'none',
									title: '添加成功'
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '修改成功'
								})
							}

							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						}
					})
					console.log('验证通过')
				} else {
					console.log('验证失败')
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
/deep/.u-input__textarea[data-v-460c1d26] {
	line-height: 100rpx;
}
.main {
	.u-form-item{
		// display: flex;
		// align-items: center;
		align-content: center;
	}
	.content {
		padding: 0 28rpx;
	}

	.footer {
		width: 90%;
		margin-left: 5%;
		margin-top: 40rpx;
		text-align: center;
		.submit {
			background-image: linear-gradient(to right, #ff7f36, #ffaf00);
			color: #ffffff;
			padding: 17rpx 0;
		}
	}
}
</style>
