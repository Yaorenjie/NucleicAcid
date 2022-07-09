<template>
	<view>
		<uni-collapse accordion ref="collapse" @change="change">
			<uni-collapse-item showArrow v-for="item in permissionList" :title="item.label" clickable>
				<view class="content">
					<!-- 基础表单校验 -->
					<uni-forms :ref="'valiForm-'+item.id" label-position="top" label-width="200" :modelValue="valiFormData">
						<uni-forms-item label="父级" name="pid">
							<uni-data-select v-model="valiFormData.pid" :localdata="permissionOpt" @change="setPid"></uni-data-select>
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
					<button type="primary" @click="submit('valiForm-'+item.id)">提交</button>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pattern="pattern" @fabClick="addPermission" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				permissionList:[],
				permissionOpt:[],
				valiFormData:{},
				pattern: {
					selectedColor: '#0260a2',
					buttonColor: '#0260a2',
				},
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/person/index',
				animationType: 'slide-in-right',
				animationDuration: 200
			})
		},
		onLoad() {
			this.getPermission()
		},
		onPullDownRefresh() {
			this.permissionList = []
			this.getPermission()
		},
		methods: {
			getPermission(){
				this.$http.httpGet('/admin/permission/').then((res) => {
					this.resetPermission(res)
					this.resetPermissionList(res)
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			change(index){
				this.valiFormData=this.permissionList[index]
				console.log(this.valiFormData)
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
				this.permissionOpt=_permissionList
				console.log(this.permissionOpt)
			},
			resetPermissionList(permissionList){
				let _permissionList=[]
				let _permissionItem={}
				for (let i in permissionList) {
					_permissionItem={}
					_permissionItem.id=permissionList[i].id.toString()
					_permissionItem.pid=permissionList[i].pid.toString()
					_permissionItem.name=permissionList[i].name
					_permissionItem.label=permissionList[i].label
					_permissionItem.path=permissionList[i].path
					_permissionList.push(_permissionItem)
					for (let j in permissionList[i].child){
						_permissionItem={}
						_permissionItem.id=permissionList[i].child[j].id.toString()
						_permissionItem.pid=permissionList[i].child[j].pid.toString()
						_permissionItem.name=permissionList[i].child[j].name
						_permissionItem.label=permissionList[i].child[j].label
						_permissionItem.path=permissionList[i].child[j].path
						_permissionList.push(_permissionItem)
					}
				}
				this.permissionList=_permissionList
			},
			setPid(value){
				this.$set(this.valiFormData,'pid',value?value:'0')
			},
			submit(ref){
				console.log(ref)
				this.$refs[ref][0].validate().then(res => {
					this.editPermisson()
				}).catch(err => {
					console.log('err', err);
				})
			},
			editPermisson(){
				this.$http.httpPut('/admin/permission/'+this.valiFormData.id+'/',{
					pid: this.valiFormData.pid,
					label: this.valiFormData.label,
					name: this.valiFormData.name,
					path: this.valiFormData.path
				}).then(res => {
					uni.showModal({
						content: '权限修改成功！',
						showCancel: false
					})
				})
			},
			addPermission(){
				uni.navigateTo({
					url: 'permission-add',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-collapse-item__wrap-content{
		.content{
			background: $uni-bg-color-grey;
			padding: 20rpx;
			.uni-stat__select{
				width: 100%;
				padding: 0;
			}
		}
	}
</style>
