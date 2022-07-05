<template>
	<view>
		<uni-section :title="valiFormData.id===0?'添加':'编辑'+'管理员'" type="line">
		<view class="uni-edit-form">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" label-position="top" label-width="200" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="单位名称" name="company">
					<uni-easyinput v-model="valiFormData.company" />
				</uni-forms-item>
				<uni-forms-item label="备注信息" name="comment">
					<uni-easyinput type="textarea"  v-model="valiFormData.comment" />
				</uni-forms-item>
				<uni-forms-item label="合同开始日期" name="contractStartAt">
					<uni-datetime-picker type="datetime" return-type="timestamp"
						v-model="valiFormData.contractStartAt" />
				</uni-forms-item>
				<uni-forms-item label="合同结束日期" name="contractEndAt">
					<uni-datetime-picker type="datetime" return-type="timestamp"
						v-model="valiFormData.contractEndAt" />
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
				// 校验表单数据
				valiFormData: {
					id: 0,
					company: '',
					comment: '',
					contractStartAt: '',
					contractEndAt: ''
				},
				// 校验规则
				rules: {
					company: {
						rules: [{
							required: true,
							errorMessage: '单位名称不能为空'
						}]
					}
				}
			}
		},
		onLoad(e){
			if(e.id){
				console.log(e.id)
				this.$set(this.valiFormData,'id', e.id)
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
