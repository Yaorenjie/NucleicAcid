<template>
	<view>
		<uni-section title="编辑检测窗口" type="line">
			<view class="uni-edit-form">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="valiForm" :modelValue="valiFormData">
					<uni-forms-item>
						<uni-number-box v-model="valiFormData.window" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>
		<view class="button-group">
			<button type="primary" size="mini" @click="cancel()">取消</button>
			<button type="primary" size="mini" @click="submit('valiForm')">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				value: '',
				// 校验表单数据
				valiFormData: {
					window: '',
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

<style lang="scss">
	.uni-edit-form {
		padding: 0 20rpx;
	}
</style>
