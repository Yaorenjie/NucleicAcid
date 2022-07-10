<template>
	<view>
		<uni-section title="编辑检测窗口" type="line">
			<view class="uni-edit-form">
				<uni-forms ref="valiForm" :modelValue="valiFormData">
					<uni-forms-item>
						<uni-number-box v-model="valiFormData.window" :step="1" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('valiForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				// 校验表单数据
				valiFormData: {
					window: 1,
				}
			}
		},
		computed: {
			data() {
				return this.$store.state.detectionData
			}
		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id;
			}
			if (e.window) {
				this.$set(this.valiFormData, 'window', e.window)
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					if (this.id === '') {
						this.$store.commit("update_detectionData_window", this.valiFormData.window);
						this.cancel()
					} else  this.updateAjax()
				}).catch(err => {
					console.log('err', err);
				})
			},
			async updateAjax() {
				const data = await this.$http.httpPut('/admin/point/' + this.id + '/', {
					window: this.valiFormData.window
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
				this.$store.commit("update_detectionData_window", this.valiFormData.window);
				setTimeout(() => {
					this.cancel()
				}, 2000)
			},
			cancel() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-numbox{
		justify-content: center;
	}
</style>
