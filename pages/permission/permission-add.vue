<template>
	<view>
		<uni-section title="权限配置" type="line">
		<view class="uni-edit-form">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" label-position="top" label-width="200" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="父级" name="pid">
					<uni-data-select v-model="valiFormData.pid" :localdata="permissionList" @change="setPid"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="名称" name="label">
					<uni-easyinput v-model="valiFormData.label" />
				</uni-forms-item>
				<uni-forms-item label="标识" name="name">
					<uni-easyinput v-model="valiFormData.name" />
				</uni-forms-item>
				<uni-forms-item label="路由地址" name="path">
					<uni-easyinput v-model="valiFormData.path" />
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
				permissionList:[],
				role: [],
				// 校验表单数据
				valiFormData: {
					id: 0,
					pid: 0,
					label: '',
					name: '',
					path: ''
				},
				// 校验规则
				rules: {
					label: {
						rules: [{
							required: true,
							errorMessage: '权限名称不能为空'
						}]
					},
					name: {
						rules: [{
							required: true,
							errorMessage: '权限标识不能为空'
						}]
					}
				}
			}
		},
		onLoad(e){
			this.getPermission()
			if(e.id){
				console.log(e.id)
				this.$set(this.valiFormData,'id', e.id)
				this.getPermissionInfo(e.id)
			}
		},
		methods: {
			getPermission(){
				this.$http.httpGet('/admin/permission/').then((res) => {
					this.resetPermission(res)
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			resetPermission(permissionList){
				let _permissionList=[]
				let _permissionItem={}
				for (let i in permissionList) {
					_permissionItem={}
					_permissionItem.text=permissionList[i].label
					_permissionItem.value=permissionList[i].id.toString()
					_permissionList.push(_permissionItem)
				}
				this.permissionList=_permissionList
			},
			setPid(value){
				this.$set(this.valiFormData,'pid',value?value:'0')
			},
			submit(ref){
				this.$refs[ref].validate().then(res => {
					this.editPermission()
				}).catch(err => {
					console.log('err', err);
				})
			},
			editPermission(){
				this.$http.httpPost('/admin/permission/',this.valiFormData).then(res => {
					uni.showModal({
						content: '权限配置成功！',
						showCancel: false
					})
					uni.navigateTo({
						url: 'permission',
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
		.uni-stat__select{
			width: 100%;
			padding: 0;
		}
	}
	uni-picker{
		.uni-input{
			border: 1px solid rgb(229, 229, 229);
			border-radius: 4px;
		}
	}
</style>
