<template>
	<view>
		<!-- 分享示例 -->
		<uni-popup ref="popup" backgroundColor="#fff">
			<uni-list>
				<uni-list-item title="腾讯" clickable @click="openTx"></uni-list-item>
				<uni-list-item title="百度" clickable @click="openBd"></uni-list-item>
				<uni-list-item title="高德" clickable @click="openGd"></uni-list-item>
			</uni-list>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		methods: {
			open () {
				this.$refs.popup.open('bottom')
			},
			openTx () {
				const url = `https://apis.map.qq.com/uri/v1/routeplan?type=drive
				&from=我的位置&fromcoord=${this.data.search.latitude},${this.data.search.longitude}
				&to=${this.data.name}&tocoord=${this.data.latitude},${this.data.longitude}
				&policy=1&referer=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU`;
				window.location.href = url
			},
			openBd () {
				var queryStr = '?origin=name:我的位置|latlng:' + this.data.search.latitude + ',' + this.data.search.longitude 
				+ '&destination=' + this.data.latitude + ',' + this.data.longitude + '&region=' + this.data.name + '&coord_type=bd09ll&mode=driving';
				window.location.href = 'http://api.map.baidu.com/direction' + queryStr + '&output=html'
				
			},
			openGd () {
				const url = `https://uri.amap.com/navigation
				?from=${this.data.search.longitude },${this.data.search.latitude},我的位置
				&to=${this.data.longitude},${this.data.latitude},${this.data.name}
				&mode=car&callnative=1&coordinate=gcj02&src=mypage`
				window.location.href = url
			}
		}
	}
</script>

<style>
</style>