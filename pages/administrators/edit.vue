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
		<button type="primary" @click="cancel()">取消</button>
		<button type="primary" @click="submit('valiForm')">提交</button>
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
			cancel() {},
			submit() {
				this.id === '' ? this.addAjax() : this.editAjax()
			},
			async editAjax () {
				const data = await this.$http.httpPut('/manager/' + this.id + '/', this.form)
				console.log(data)
			},
			async addAjax () {},
			toggleRole() {
				this.$refs.selectRole.open()
			},
			changeRole(e) {
				this.form.role = e
			},
			changePointe(e) {
				this.form.point = e
			}
		}
	}
</script>

<style  lang="scss">

</style>
