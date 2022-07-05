<template>
	<view>
		<view class="uni-edit-form">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item name="name">
					<uni-easyinput v-model="valiFormData.name" />
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit('valiForm')">提交</button>
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
					id: '',
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
		onLoad(e){
			if(e.id){
				console.log(e.id)
				this.id = e.id;
				this.value = e.name
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
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
