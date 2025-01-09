<template>
    <view>
        <web-view :src="url" @message="getMessage"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                url: this.$base_url + '/authorize'

            }
        },
        onLoad(options) {
				console.log(this.url)
            if (options && options.url) {
                this.url = options.url;
            }
        },
        methods: {
			getMessage(e){
			console.log(event.detail.data);
				uni.showModal({
					content: event.detail.data
				})
			}
        }
    }
</script>