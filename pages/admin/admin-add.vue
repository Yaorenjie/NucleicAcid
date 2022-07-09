<template>
	<view>
		<view class="uni-edit-form">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" label-position="top" label-width="200" :rules="rules" :modelValue="valiFormData">
				<uni-section title="基本信息" type="line">
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
				</uni-section>
				<uni-section title="管理员配置" type="line">
					<uni-forms-item label="姓名" name="name">
						<uni-easyinput v-model="valiFormData.name" />
					</uni-forms-item>
					<uni-forms-item label="手机" name="account">
						<uni-easyinput v-model="valiFormData.account" />
					</uni-forms-item>
					<uni-forms-item label="角色" name="role">
						<uni-data-checkbox multiple v-model="valiFormData.role" :localdata="role"></uni-data-checkbox>
					</uni-forms-item>
				</uni-section>
			</uni-forms>
			<button type="primary" @click="submit('valiForm')">提交</button>
		</view>
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
					contractEndAt: '',
					password: '',
					account: '',
					name: '',
					role: []
				},
				role: [],
				// 校验规则
				rules: {
					company: {
						rules: [{
							required: true,
							errorMessage: '单位名称不能为空'
						}]
					},
					contractStartAt: {
						rules: [{
							required: true,
							errorMessage: '合同日期开始日期不能为空'
						}]
					},
					contractEndAt: {
						rules: [{
							required: true,
							errorMessage: '合同日期结束日期不能为空'
						}]
					},
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
		created(){
			this.getRole()
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
			getPassword(pasLen) {
				const pasArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
				let password = ''
				let pasArrLen = pasArr.length
				let x=''
				for (var i=0; i<pasLen; i++){
					x = Math.floor(Math.random()*pasArrLen)
					password += pasArr[x]
				}
				this.$set(this.valiFormData, 'password', password)
				console.log(password)
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
					this.addAdmin()
				}).catch(err => {
					console.log('err', err);
				})
			},
			addAdmin(){
				this.getPassword(8)
				this.$http.httpPost('/admin/',this.valiFormData).then(res => {
					uni.showModal({
						content: '添加成功，请记住密码为'+this.valiFormData.password,
						showCancel: true
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
	.uni-forms-item{
		padding: 0 20rpx;
	}
	uni-form{
		.uni-section{
			margin-top: 20rpx;
			&:nth-child(1){
				margin-top: 0;
			}
		}
	}
	uni-picker{
		.uni-input{
			border: 1px solid rgb(229, 229, 229);
			border-radius: 4px;
		}
	}
</style>
