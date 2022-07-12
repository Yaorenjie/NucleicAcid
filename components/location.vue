<template>
	<view @click="openLocation" class="location">
		<text class="location-text">{{data.address}}</text>
		<uni-icons type="location-filled" size="18" color="#ffffff"></uni-icons>
	</view>
</template>

<script>
	import * as util from '@/common/util.js'
	var formatLocation = util.formatLocation;
	// #ifdef APP-PLUS
	import permision from "@/common/permission.js"
	// #endif
	export default {
		data() {
			return {
				id: '',
				value: '',
				hasLocation: false,
				location: {},
				type: '',
				// 校验表单数据
				data: {
					address: '',
					lat: '',
					long: '',
				}
			}
		},
		mounted () {
			this.getLocation()
		},
		methods: {
			showConfirm() {
				this.type = 'showpopup';
			},
			hideConfirm() {
				this.type = '';
			},
			openLocation() {
				uni.chooseLocation({
					keyword: this.data.address,
					// address: this.valiFormData.address,
					latitude: this.data.lat,
					longitude: this.data.long,
					// name: this.valiFormData.name,
					success: (res) => {
						this.$set(this.data, 'address', res.address)
						this.$set(this.data, 'lat', res.latitude)
						this.$set(this.data, 'long', res.longitude)
						this.$emit('change', {
							latitude: res.latitude,
							longitude: res.longitude
						})
					}
				})
			},
			async getLocation() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
				// #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ
				let status = await this.getSetting();
				if (status === 2) {
					this.showConfirm();
					return;
				}
				// #endif
				this.doGetLocation();
			},
			doGetLocation() {
				uni.getLocation({
					geocode: true,
					success: (res) => {
						this.hasLocation = true;
						this.$emit('change', {
							latitude: res.latitude,
							longitude: res.longitude
						})
						this.$set(this.data, 'address', res.address)
						this.$set(this.data, 'lat', res.latitude)
						this.$set(this.data, 'long', res.longitude)
						this.location = formatLocation(res.longitude, res.latitude);
						console.log(this.location)
					},
					fail: (err) => {
						// #ifdef MP-BAIDU
						if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
							this.showConfirm();
						}
						// #endif
						// #ifndef MP-BAIDU
						if (err.errMsg.indexOf("auth deny") >= 0) {
							uni.showToast({
								title: "访问位置被拒绝"
							})
						} else {
							uni.showToast({
								title: err.errMsg
							})
						}
						// #endif
					}
				})
			},
			getSetting: function() {
				return new Promise((resolve, reject) => {
					uni.getSetting({
						success: (res) => {
							if (res.authSetting['scope.userLocation'] === undefined) {
								resolve(0);
								return;
							}
							if (res.authSetting['scope.userLocation']) {
								resolve(1);
							} else {
								resolve(2);
							}
						}
					});
				});
			},
			openSetting: function() {
				this.hideConfirm();
				uni.openSetting({
					success: (res) => {
						if (res.authSetting && res.authSetting['scope.userLocation']) {
							this.doGetLocation();
						}
					},
					fail: (err) => {}
				})
			},
			async checkPermission() {
				let status = permision.isIOS ? await permision.requestIOS('location') :
					await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');
				if (status === null || status === 1) {
					status = 1;
				} else if (status === 2) {
					uni.showModal({
						content: "系统定位已关闭",
						confirmText: "确定",
						showCancel: false,
						success: function(res) {}
					})
				} else if (status.code) {
					uni.showModal({
						content: status.message
					})
				} else {
					uni.showModal({
						content: "需要定位权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			},
			clear: function() {
				this.hasLocation = false
			}
		}
	}
</script>

<style lang="scss">
	.location{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.location-text{
			width: calc(100% - 18px);
			word-wrap: break-word; 
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: left;
		}
	}
</style>
