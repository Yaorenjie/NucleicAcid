<template>
	<view>
		<uni-section title="管理员配置" type="line">
		<view class="uni-edit-form">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" label-position="top" label-width="200" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput v-model="valiFormData.name" />
				</uni-forms-item>
				<uni-forms-item label="手机" name="account">
					<uni-easyinput v-model="valiFormData.account" />
				</uni-forms-item>
				<uni-forms-item label="角色" name="role">
					<uni-data-checkbox multiple v-model="valiFormData.role" :localdata="role"></uni-data-checkbox>
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
				role: [],
				// 校验表单数据
				valiFormData: {
					id: 0,
					account: '',
					name: '',
					role: []
				},
				// 校验规则
				rules: {
					account: {
						rules: [{
							required: true,
							errorMessage: '手机号码不能为空'
						}]
					},
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					}
				}
			}
		},
		created() {
			this.getRole()
		},
		onLoad(e){
			if(e.id){
				console.log(e.id)
				this.$set(this.valiFormData,'id', e.id)
				this.getAdminInfo(e.id)
			}
		},
		methods: {
			getRole(){
				this.$http.httpGet('/admin/role_opt/').then((res) => {
					this.role = res
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			getAdminInfo(id){
				this.$http.httpGet('/admin/'+id+'/').then((res) => {
					this.$set(this.valiFormData,'id',id)
					this.$set(this.valiFormData,'account',res.account)
					this.$set(this.valiFormData,'name',res.name)
					this.$set(this.valiFormData,'role',res.role)
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
					this.editAdmin()
				}).catch(err => {
					console.log('err', err);
				})
			},
			async editAdmin(){
				await this.$http.httpPut('/admin/'+this.valiFormData.id+'/',this.valiFormData).then(res => {
					uni.showModal({
						content: '管理员配置成功！',
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
