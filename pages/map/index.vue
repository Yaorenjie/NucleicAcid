<template>
<view class="container">
	<web-view :src="url"></web-view>
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
				name: ''
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
			const url =`https://apis.map.qq.com/uri/v1/routeplan?type=drive
						&from=我的位置&fromcoord=${this.reportInfo.latitude},${this.reportInfo.longitude}
						&to=${this.name}&tocoord=${this.latitude},${this.longitude}
						&policy=1&referer=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU`;
			this.url = url
		}
	}
</script>

<style lang="scss" scoped>
</style>