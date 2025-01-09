<template>
	<view>
		<u-swiper :list="list" @click='swiperClick' :height="300"></u-swiper>
	</view>
</template>

<script>
	export default{
		props: {
			list: Array,
		},
		methods:{
			swiperClick(value){
				this.$emit('swiperClick',value)
			}
		}
	}
</script>

<style>
</style>
