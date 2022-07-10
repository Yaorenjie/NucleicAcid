<template>
	<view>
		<uni-section title="编辑检测时长 (秒/人)" type="line">
			<view class="uni-edit-form">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="valiForm" :modelValue="valiFormData">
					<uni-forms-item>
						<uni-number-box v-model="valiFormData.rate" :step="10" /> 
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
					rate: 30,
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
			if (e.rate) {
				this.$set(this.valiFormData, 'rate', e.rate)
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					if (this.id === '') {
						this.$store.commit("update_detectionData_rate", this.valiFormData.rate);
						this.cancel()
					} else  this.updateAjax()
				}).catch(err => {
					console.log('err', err);
				})
			},
			async updateAjax() {
				const data = await this.$http.httpPut('/admin/point/' + this.id + '/', {
					rate: this.valiFormData.rate
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
				this.$store.commit("update_detectionData_rate", this.valiFormData.rate);
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
