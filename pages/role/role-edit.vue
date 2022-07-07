<template>
	<view>
		<uni-section :title="valiFormData.id===0?'添加':'编辑'+'角色'" type="line">
		<view class="uni-edit-form">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" label-position="top" label-width="200" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="角色名称" name="name">
					<uni-easyinput v-model="valiFormData.company" />
				</uni-forms-item>
				<uni-forms-item label="角色权限" name="role">
					<checkbox-group @change="checkAllChange" v-for="group in permissionList">
						<label class="uni-list-cell uni-list-cell-pd">
							<view>
								<checkbox :value="group.id" :checked="group.checked" />
							</view>
							<view>{{item.label}}</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in group.child" :key="item.value">
							<view>
								<checkbox :value="item.value" :checked="item.checked" />
							</view>
							<view>{{item.name}}</view>
						</label>
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
		created() {
			this.getPermission()
		},
		onLoad(e){
			if(e.id){
				console.log(e.id)
				this.$set(this.valiFormData,'id', e.id)
				this.getRoleInfo(e.id)
			}
		},
		methods: {
			roleCheckbox(){
			},
			getRoleInfo(id){
				this.$http.httpGet('/admin/role/'+id+'/').then((res) => {
					console.log(res)
					this.valiFormData = res
					console.log(this.valiFormData)
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			getPermission(){
				this.$http.httpGet('/admin/permission/').then((res) => {
					console.log(res)
					this.permissionList = res.data
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			resetPermissionList(){
				let _permissionList=[]
				let _permissionItem={}
				let _permissionChild=[]
				let _permissionChildItem={}
				for (let i in this.permissionList) {
					_permissionItem.text=this.permissionList[i].label
					_permissionItem.value=this.permissionList[i].id
					_permissionChild=[]
					for (let i in this.permissionList[i].child) {
						
					}
				}
			},
			submit(ref){
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					this.valiFormData.id===0?this.addAdmin():this.editAdmin()
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
	uni-picker{
		.uni-input{
			border: 1px solid rgb(229, 229, 229);
			border-radius: 4px;
		}
	}
</style>
