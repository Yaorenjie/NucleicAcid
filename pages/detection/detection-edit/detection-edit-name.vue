<template>
	<view>
		<uni-section title="编辑检测点名称" type="line">
			<view class="uni-edit-form">
				<!-- 基础表单校验 -->
				<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item name="name">
						<uni-easyinput v-model="valiFormData.name" />
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
				id: '',
				value: '',
				// 校验表单数据
				valiFormData: {
					name: '',
				},
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '检测点名称不能为空'
						}]
					}
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
			if (e.name) {
				this.$set(this.valiFormData, 'name', e.name)
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					if (this.id === '') {
						this.$store.commit("update_detectionData_name", this.valiFormData.name)
						this.cancel()
					} else  this.updateAjax()
				}).catch(err => {
					console.log('err', err);
				})
			},
			async updateAjax() {
				const data = await this.$http.httpPut('/admin/point/' + this.id + '/', {
					name: this.valiFormData.name
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
				this.$store.commit("update_detectionData_name", this.valiFormData.name)
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
</style>
