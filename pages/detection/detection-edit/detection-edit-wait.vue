<template>
	<view>
		<uni-section title="编辑目前总排队人数" type="line">
			<view class="uni-edit-form">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="valiForm" :modelValue="valiFormData">
					<uni-forms-item>
						<uni-number-box v-model="valiFormData.wait" :step="10" />
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
					wait: 10,
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
			if (e.wait) {
				this.$set(this.valiFormData, 'wait', e.wait)
			}
		},
		methods: {
			submit() {
				if (this.id === '' || this.id === '0') {
					this.$store.commit("update_detectionData_wait", this.valiFormData.wait);
					this.cancel()
				} else  this.updateAjax()
			},
			async updateAjax() {
				const data = await this.$http.httpPut('/admin/point/' + this.id + '/wait/', {
					wait: this.valiFormData.wait
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
				this.$store.commit("update_detectionData_wait", this.valiFormData.wait);
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
