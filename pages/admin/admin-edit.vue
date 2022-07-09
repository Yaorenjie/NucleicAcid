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
					<picker mode="date" :value="valiFormData.contractStartAt" @change="bindContractStartAt">
						<view class="uni-input">{{valiFormData.contractStartAt}}</view>
					</picker>
				</uni-forms-item>
				<uni-forms-item label="合同结束日期" name="contractEndAt">
					<picker mode="date" :value="valiFormData.contractEndAt" @change="bindContractEndAt">
						<view class="uni-input">{{valiFormData.contractEndAt}}</view>
					</picker>
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
				this.getAdminInfo(e.id)
			}
		},
		methods: {
			getAdminInfo(id){
				this.$http.httpGet('/admin/'+id+'/').then((res) => {
					this.$set(this.valiFormData,'id',id)
					this.$set(this.valiFormData,'company',res.company)
					this.$set(this.valiFormData,'comment',res.comment)
					this.$set(this.valiFormData,'contractStartAt',res.contractStartAt)
					this.$set(this.valiFormData,'contractEndAt',res.contractEndAt)
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			bindContractStartAt(e){
				this.$set(this.valiFormData,'contractStartAt',e.detail.value)
			},
			bindContractEndAt(e){
				this.$set(this.valiFormData,'contractEndAt',e.detail.value)
			},
			submit(ref){
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					this.valiFormData.id===0?this.addAdmin():this.editAdmin()
				}).catch(err => {
					console.log('err', err);
				})
			},
			addAdmin(){
				this.$http.httpPost('/admin/',this.valiFormData).then(res => {
					uni.showModal({
						content: '添加成功！',
						showCancel: false
					})
					uni.navigateTo({
						url: 'admin',
						animationType: 'slide-in-left',
						animationDuration: 200
					})
				})
			},
			editAdmin(){
				this.$http.httpPut('/admin/'+this.valiFormData.id+'/company/',this.valiFormData).then(res => {
					uni.showModal({
						content: '基本信息修改成功！',
						showCancel: false
					})
					uni.navigateTo({
						url: 'admin',
						animationType: 'slide-in-left',
						animationDuration: 200
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-edit-form{
		padding: 0 20rpx;
	}
	uni-picker{
		.uni-input{
			border: 1px solid rgb(229, 229, 229);
			border-radius: 4px;
		}
	}
</style>
