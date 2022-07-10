<template>
	<view>
		<uni-section :title="(form.id===''?'添加':'编辑')+'管理员'" type="line">
			<view class="uni-edit-form">
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
					<uni-forms-item label="核酸检测点" name="point">
						<selectMore :value="form.point" :list="pointList" @change="changePoint" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('valiForm')">提交</button>	
			</view>
		</uni-section>
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
				this.$set(this.form,'id',e.id.toString())
			}
			this.initData()
		},
		onPullDownRefresh() {
			this.initData()
		},
		methods: {
			async initData(){
				await this.getRole()
				await this.getPoint()
				if(this.form.id!=='')await this.getData()
			},
			async getRole() {
				const data = await this.$http.httpGet('/admin/role_opt/')
				this.roleList = data
			},
			async getPoint() {
				const data = await this.$http.httpGet('/admin/point_opt/')
				this.pointList = data
				console.log(this.pointList)
			},
			async getData() {
				const data = await this.$http.httpGet('/manager/' + this.form.id + '/')
				this.form = data
				console.log(this.form)
			},
			cancel() {
				uni.navigateTo({
					url: '/pages/administrators/list',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			submit() {
				this.form.id === '' ? this.addAjax() : this.editAjax()
			},
			async editAjax () {
				this.$http.httpPut('/manager/' + this.form.id + '/',this.form).then(res => {
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
				})			
			},
			async addAjax () {
				const password = this.randChar()
				await this.$http.httpPut('/manager/',{
					password,
					...this.form
				}).then(res => {
					uni.showModal({
						title: '温馨提示',
						showCancel: false,
						content: '添加成功，请记住密码为' + password,
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/administrators/list',
									animationType: 'slide-in-left',
									animationDuration: 200
								})
							}
						}
					})
				})
			},
			toggleRole() {
				this.$refs.selectRole.open()
			},
			changeRole(e) {
				this.form.role = e
			},
			changePoint(e) {
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

<style lang="scss" scoped>
	.uni-edit-form{}
</style>
