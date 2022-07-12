<template>
<view class="container">
	<web-view :src="url"></web-view>
	<view class="btn" @click="markertap">
		<img src="/static/navigation.png" />
		开始导航
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				latitude: 0,
				longitude: 0,
				reportInfo: {
					latitude: 0,
					longitude: 0,
				},
				name: '',
				fullAddress: ''
			}
		},
		onLoad(e) {
			if (e.latitude) {
				this.latitude = e.latitude
			}
			if (e.longitude) {
				this.longitude = e.longitude
			}
			if (e.personLatitude) {
				this.reportInfo.latitude = e.personLatitude
			}
			if (e.personlongitude) {
				this.reportInfo.longitude = e.personlongitude
			}
			if (e.name) {
				this.name = e.name
			}
			if (e.fullAddress) {
				this.fullAddress = e.fullAddress
			}
			const url =`https://apis.map.qq.com/uri/v1/routeplan?type=drive
						&from=我的位置&fromcoord=${this.reportInfo.latitude},${this.reportInfo.longitude}
						&to=${this.name}&tocoord=${this.latitude},${this.longitude}
						&policy=1&referer=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU`;
			// const url = `https://detection.heshengshe.com/map.html?startLat=${this.reportInfo.latitude}&startLong=${this.reportInfo.longitude}&endLat=${this.latitude}&endLong=${this.longitude}&endName=${this.name}`
			this.url = url
		},
		methods: {
			markertap() {
				uni.openLocation({
					latitude: parseFloat(this.latitude),
					longitude: parseFloat(this.longitude),
					name: this.name,
					address: this.fullAddress,
					success: function() {
						console.log('success');
					},
					fail: function() {
						uni.showModal({
							title: '错误',
							content: '请检查定位是否打开',
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn{
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		border-radius: 45px;
		box-shadow: 0 1px 8px 1px rgab(165,165,165, 0.2);
		left: 40px;
		right: 40px;
		bottom: calc(30px + var(--window-bottom));
		z-index: 100;
		background-color: rgb(2, 96, 162);
		font-size: 14px;
		color: #fff;
		padding: 10px 0;
		img {
			width: 20px;
			height: 20px;
			margin-right: 5px;
		}
	}
</style>