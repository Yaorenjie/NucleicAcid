<template>
	<view>
		<uni-section :title="valiFormData.id===0?'添加':'编辑'+'角色'" type="line">
		<view class="uni-edit-form">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" label-position="top" label-width="200" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="角色名称" name="label">
					<uni-easyinput v-model="valiFormData.label" />
				</uni-forms-item>
				<uni-forms-item label="角色权限" name="permission">
					<checkbox-group @change="checkboxChange">
						<view v-for="group in permissionList" :key="'role-'+group.value">
							<label class="uni-list-cell uni-list-cell-pd">
								<view>
									<checkbox :value="group.value" :checked="group.checked" />
								</view>
								<view>{{group.text}}</view>
							</label>
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in group.child" :key="item.value">
								<view>
									<checkbox :value="item.value" :checked="item.checked" />
								</view>
								<view>{{item.text}}</view>
							</label>
						</view>
					</checkbox-group>
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
				// 校验表单数据
				valiFormData: {
					id: 0,
					label: '',
					name: '',
					permission: []
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
			this.getPermission()
			if(e.id){
				this.$set(this.valiFormData,'id', e.id)
				this.getRoleInfo(e.id)
			}
		},
		methods: {
			getRoleInfo(id){
				this.$http.httpGet('/admin/role/'+id+'/').then((res) => {
					this.valiFormData = res
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			getPermission(){
				this.$http.httpGet('/admin/permission/').then((res) => {
					this.resetPermissionList(res)
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			resetPermissionList(permissionList){
				let _permissionList={}
				let _permissionItem={}
				let _permissionChild={}
				let _permissionChildItem={}
				for (let i in permissionList) {
					_permissionItem={}
					_permissionItem.text=permissionList[i].label
					_permissionItem.value=permissionList[i].id.toString()
					_permissionItem.checked=this.valiFormData.permission.indexOf(permissionList[i].id)>-1
					_permissionItem.child={}
					_permissionChild={}
					for (let j in permissionList[i].child) {
						_permissionChildItem={}
						_permissionChildItem.text=permissionList[i].child[j].label
						_permissionChildItem.value=permissionList[i].child[j].id.toString()
						_permissionChildItem.checked=this.valiFormData.permission.indexOf(permissionList[i].child[j].id)>-1
						_permissionChild[permissionList[i].child[j].id]=_permissionChildItem
						if(parseInt(j)===(permissionList[i].child.length-1)){
							// _permissionChildItem.child=_permissionChild
							_permissionItem.child=_permissionChild
							// console.log('结果',_permissionItem)
							// 一级标签id为key值
							_permissionList[permissionList[i].id]=_permissionItem
							
						}
					}
					if(parseInt(i)===(permissionList.length-1)){
						this.permissionList=_permissionList
						console.log('结果',this.permissionList)
					}
				}
				
			},
			checkboxChange(e){
				this.$set(this.valiFormData,'permission',e.detail.value)
				console.log(this.valiFormData)
			},
			submit(ref){
				this.$refs[ref].validate().then(res => {
					this.valiFormData.id===0?this.addRole():this.editRole()
				}).catch(err => {
					console.log('err', err);
				})
			},
			addRole(){
				this.$http.httpPost('/admin/role/',this.valiFormData).then(res => {
					uni.showModal({
						content: '添加角色成功！',
						showCancel: false
					})
					uni.navigateTo({
						url: 'role',
						animationType: 'slide-in-left',
						animationDuration: 200
					})
				})
			},
			editRole(){
				this.$http.httpPut('/admin/role/'+this.valiFormData.id+'/',this.valiFormData).then(res => {
					uni.showModal({
						content: '编辑角色成功！',
						showCancel: false
					})
					uni.navigateTo({
						url: 'role',
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
		.uni-list-cell{
			justify-content:flex-start;
		}
	}
	uni-picker{
		.uni-input{
			border: 1px solid rgb(229, 229, 229);
			border-radius: 4px;
		}
	}
</style>
