<template>
	<view>
		<uni-section :title="(id===0?'添加':'编辑')+'核酸检测点'" type="line">
			<uni-list>
				<uni-list-item showArrow title="检测点名称" :rightText="data.name" clickable @click="actionsName" />
				<uni-list-item showArrow title="详细地址" :note="data.address" clickable @click="actionsAdress" />
				<uni-list-item showArrow title="工作时间" clickable @click="actionsTime">
					<template v-slot:footer>
						<view class="time-list">
							<view class="time-one" v-for="(item, index) in data.time" :key="index">{{$utils.getHourMin(item.startAt)}} -
								{{$utils.getHourMin(item.endAt)}}</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item showArrow title="检测窗口" :rightText="data.window ? `${data.window}个` : ''" clickable
					@click="actionsWindow" />
				<uni-list-item showArrow title="检测时间" :rightText="data.rate ? `${data.rate}秒/人` : ''" clickable
					@click="actionsRate" />
				<uni-list-item showArrow title="总排队人数" :rightText="data.wait ? `${data.wait}个` : ''" clickable
					@click="actionsWait" />
				<uni-list-item title="是否启用">
					<template v-slot:footer>
						<switch :checked="data.state === 1 ? true : false" @change="actionsEnable" />
					</template>
				</uni-list-item>
			</uni-list>
			<view class="list-button" v-if="id===0">
				<button type="primary" @click="submit()">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '核酸检测点',
				id: 0
			}
		},
		computed: {
			data() {
				return this.$store.state.detectionData
			}
		},
		onShow(e) {
			if (e) {
				this.id = parseInt(e.id)
				this.getData()
			}
		},
		onLoad(e) {
			if (parseInt(e.id)) {
				this.id = e.id
				this.getData()
			} else {
				this.$store.commit("update_detectionData", {
					name: '',
					address: '',
					window: '',
					wait: '',
					rate: '',
					time: [],
					state: 1,
					latitude: '',
					longitude: ''
				})
			}
		},
		methods: {
			async getData() {
				const data = await this.$http.httpGet('/admin/point/' + this.id + '/')
				this.$store.commit("update_detectionData", data)
			},
			actionsEnable(e) {
				if (this.id === '' || this.id === 0) {
					this.$store.commit("update_detectionData_state", e.detail.value ? 1 : 0);
				} else {
					this.$store.commit("update_detectionData_state", e.detail.value ? 1 : 0);
					this.editState()
				}
			},
			async editState(){
				await this.$http.httpPut('/admin/point/'+this.id+'/state/',{
					state: this.data.state
				}).then((res) => {
					uni.showToast({
						title: '修改成功',
						icon: 'none',
						duration: 2000
					})
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			async updateAjax() {
				const data = await this.$http.httpPut('/admin/point/' + this.id + '/', {
					...this.data
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
			},
			actionsName() {
				uni.navigateTo({
					url: 'detection-edit-name?id=' + this.id + '&name=' + this.data.name || '',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsAdress() {
				uni.navigateTo({
					url: 'detection-edit-address?id=' + this.id + '&address=' + this.data.address + '&lat=' + this
						.data.latitude + '&long=' + this.data.longitude,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsWindow() {
				uni.navigateTo({
					url: 'detection-edit-window?id=' + this.id + '&window=' + this.data.window,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsRate() {
				uni.navigateTo({
					url: 'detection-edit-rate?id=' + this.id + '&rate=' + this.data.rate,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsWait() {
				uni.navigateTo({
					url: 'detection-edit-wait?id=' + this.id + '&wait=' + this.data.wait,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsTime() {
				uni.navigateTo({
					url: 'detection-edit-time?id=' + this.id + '&time=' + this.data.time,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			submit() {
				if (this.validateForm()) return
				if (this.id === 0 || this.id === '') this.addAjax()
				else this.updateAjax()
			},
			async addAjax() {
				await this.$http.httpPost('/admin/point/', {
					...this.data,
					...{
						province: 0,
						city: 0,
						area: 0
					}
				}).then(res => {
					uni.showToast({
						title: '添加成功',
						icon: 'none',
						duration: 2000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/detection/detection',
							animationType: 'slide-in-left',
							animationDuration: 200
						})	
					}, 2000)
				})
			},
			validateForm() {
				if (this.data.name.trim() === '') {
					uni.showToast({
						title: '检测点名称不能为空',
						icon: 'none',
						duration: 2000
					})
					return true
				}
				if (this.data.address.trim() === '') {
					uni.showToast({
						title: '详细地址不能为空',
						icon: 'none',
						duration: 2000
					})
					return true
				}
				if (this.data.time.length === 0) {
					uni.showToast({
						title: '工作时间不能为空',
						icon: 'none',
						duration: 2000
					})
					return true
				}
				if (!this.data.rate) {
					uni.showToast({
						title: '检测窗口不能为空',
						icon: 'none',
						duration: 2000
					})
					return true
				}
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-list {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 30px;
		display: flex;
		justify-content: center;

		>button {
			&:nth-child(1) {
				margin-right: 20px;
			}
		}
	}

	uni-switch {
		transform: scale(0.8);
	}

	.list-button {
		padding: 40rpx 20rpx;
	}

	.time-list {
		font-size: 12px;
		color: #999;
	}
</style>
