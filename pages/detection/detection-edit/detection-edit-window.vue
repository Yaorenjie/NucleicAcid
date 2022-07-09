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
					this.$store.commit("update_detectionData_window", this.valiFormData.window);
					this.cancel()
				}).catch(err => {
					console.log('err', err);
				})
			},
			cancel() {
				uni.navigateTo({
					url: '/pages/detection/detection-edit/detection-edit',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-numbox{
		justify-content: center;
	}
</style>
