<template>
	<view>
		<uni-list>
			<uni-list-item title="详细地址" :note="valiFormData.address" clickable @click="openLocation">
				<template v-slot:footer>
					<view class="card-actions-item">
						<uni-icons type="location-filled" size="18" color="#999"></uni-icons>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
			<button type="primary" @click="submit">提交</button>
		</view>
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
					id: 0,
					name: '雅居乐花园',
					address: '四川省成都市天府新区麓山大道二段19号成都雅居乐花园',
					lat: 39.9085,
					long: 116.39747,
				},
				// 校验规则
				rules: {
					rules: [{
							format: 'array'
						},
						{
							validateFunction: function(rule, value, data, callback) {
								if (value.length < 2) {
									callback('请至少勾选两个兴趣爱好')
								}
								return true
							}
						}
					]
				}
			}
		},
		onLoad(e){
			if(e.id){
				console.log(e.id)
				this.id = e.id;
				this.value = e.name
			}
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
					// latitude: this.valiFormData.lat,
					// longitude: this.valiFormData.long,
					// name: this.valiFormData.name,
					success: (res) => {
						this.$set(this.valiFormData, 'address', res.address)
						this.$set(this.valiFormData, 'lat', res.latitude)
						this.$set(this.valiFormData, 'long', res.longitude)
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
				console.log(status)
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
			            success: function(res) {
			            }
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
				uni.showToast({
					title: `校验通过`
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-edit-form{
		padding: 0 20rpx;
	}
</style>
