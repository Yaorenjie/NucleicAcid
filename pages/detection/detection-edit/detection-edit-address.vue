<template>
	<view>
		<uni-section title="编辑详细地址" type="line">
			<view class="uni-edit-form">
				<uni-forms ref="valiForm" :modelValue="valiFormData">
					<uni-list-item :note="valiFormData.address" clickable @click="openLocation">
						<template v-slot:footer>
							<view class="card-actions-item">
								<uni-icons type="location-filled" size="18" color="#999"></uni-icons>
							</view>
						</template>
					</uni-list-item>
				</uni-forms>
				<button type="primary" @click="submit()">提交</button>
			</view>
		</uni-section>
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
				valiFormData: {
					province: 0,
					city: 0,
					area: 0,
					address: '',
					latitude: '',
					longitude: ''
				}
			}
		},
		computed: {
			data() {
				return this.$store.state.detectionData
			}
		},
		onLoad(e) {
			if (e.id) this.id = e.id
			if (e.address) this.valiFormData.address = e.address || 0
			if (e.address) this.valiFormData.latitude = e.lat || ''
			if (e.address) this.valiFormData.longitude = e.long || ''
		},
		methods: {
			togglePopup(type) {
				this.type = type;
			},
			showConfirm() {
				this.type = 'showpopup';
			},
			hideConfirm() {
				this.type = '';
			},
			openLocation() {
				uni.chooseLocation({
					keyword: this.valiFormData.address,
					// address: this.valiFormData.address,
					latitude: this.valiFormData.latitude,
					longitude: this.valiFormData.longitude,
					// name: this.valiFormData.name,
					success: (res) => {
						this.$set(this.valiFormData, 'address', res.address)
						this.$set(this.valiFormData, 'latitude', res.latitude)
						this.$set(this.valiFormData, 'longitude', res.longitude)
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
						console.log(res.address)
						console.log(res.altitude)
						console.log(res.horizontalAccuracy)
						console.log(res.latitude)
						console.log(res.speed)
						console.log(res.verticalAccuracy)
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
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
				console.log(status)
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
			},
			submit() {
				if (this.valiFormData.addres === '') {
					uni.showToast({
						title: '详细地址不能为空',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.id === '' || this.id === '0') {
					console.log(this.valiFormData, 'this.valiFormData')
					this.$store.commit("update_detectionData_address", this.valiFormData)
					this.cancel()
				} else  this.updateAjax()
			},
			async updateAjax() {
				const data = await this.$http.httpPut('/admin/point/' + this.id + '/address/', {
					...this.valiFormData
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
				this.$store.commit("update_detectionData_address", this.valiFormData)
				setTimeout(() => {
					this.cancel()
				}, 2000)
			},
			cancel () {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.list-box{
		margin: 20px;
		width: calc(100% - 40px);
	}
</style>
