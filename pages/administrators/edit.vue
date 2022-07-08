<template>
	<view>
		<uni-forms ref="valiForm" :rules="rules" :modelValue="form" label-position="top" padding>
			<uni-forms-item label="姓名" name="name">
				<uni-easyinput v-model="form.name" />
			</uni-forms-item>
			<uni-forms-item label="手机" name="account">
				<uni-easyinput v-model="form.account" />
			</uni-forms-item>
			<uni-forms-item label="角色" name="role">
				<selectMore :value="form.role" :list="roleList" @change="changeRole" />
			</uni-forms-item>
			<uni-forms-item label="采样点" name="point">
				<selectMore :value="form.point" :list="pointList" @change="changePointe" />
			</uni-forms-item>
		</uni-forms>
		<view class="btn-list">
			<button size="mini" type="primary" @click="cancel()">取消</button>
			<button size="mini" type="primary" @click="submit('valiForm')">提交</button>	
		</view>
	</view>
</template>

<script>
	import selectMore from '@/components/select/more.vue'
	export default {
		components: {
			selectMore
		},
		data() {
			return {
				id: '',
				form: {
					id: '',
					account: '',
					name: '',
					point: [],
					role: []
				},
				rules: {},
				pointList: [],
				roleList: []
			}
		},
		computed: {
			data() {
				return this.$store.state.detectionData
			}
		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id
				this.getData()
			}
			this.getRole()
			this.getPoint()
		},
		methods: {
			async getRole() {
				const data = await this.$http.httpGet('/admin/role_opt/')
				this.roleList = data
			},
			async getPoint() {
				const data = await this.$http.httpGet('/admin/point_opt/')
				this.pointList = data
			},
			async getData() {
				const data = await this.$http.httpGet('/manager/' + this.id + '/')
				this.form = data
			},
			cancel() {
				uni.navigateTo({
					url: '/pages/administrators/list',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			submit() {
				this.id === '' ? this.addAjax() : this.editAjax()
			},
			async editAjax () {
				const data = await this.$http.httpPut('/manager/' + this.id + '/', {
					...this.form
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
				uni.navigateTo({
					url: '/pages/administrators/list',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			async addAjax () {
				const password = this.randChar()
				const data = await this.$http.httpPost('/manager/', {
					password,
					...this.form
				})
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '添加成功, 密码为：' + password,
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/administrators/list',
								animationType: 'slide-in-right',
								animationDuration: 200
							})
						}
					}
				});
			},
			toggleRole() {
				this.$refs.selectRole.open()
			},
			changeRole(e) {
				this.form.role = e
			},
			changePointe(e) {
				this.form.point = e
			},
			randChar () {
				const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
				const character = characters.split("")
				let result = ""
				while (result.length < 8) result+=characters[Math.round(Math.random() * characters.length)]
				return result
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.btn-list {
		display: flex;
		justify-content: center;
		>button{
			&:nth-child(1){
				margin-right: 20px;
			}
		}
	}
</style>
