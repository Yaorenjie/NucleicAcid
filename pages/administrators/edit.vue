<template>
	<view>
		<uni-forms ref="valiForm" :rules="rules" :modelValue="form" label-position="top" padding>
			<uni-forms-item label="姓名" name="name">
				<uni-easyinput v-model="form.name" />
			</uni-forms-item>
			<uni-forms-item label="手机" name="account">
				<uni-easyinput v-model="form.account" />
			</uni-forms-item>
			<uni-forms-item label="角色" name="account">
				<uni-easyinput v-model="form.role" />
			</uni-forms-item>
			<uni-forms-item label="采样点" name="account">
				<uni-easyinput v-model="form.point" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submit('valiForm')">取消</button>
		<button type="primary" @click="submit('valiForm')">提交</button>
	</view>
</template>

<script>
	export default {
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
				rules: {}
			}
		},
		computed: {
			data () {
				return this.$store.state.detectionData
			}
		},
		onLoad(e){
			if(e.id){
				this.id = e.id
				this.getData()
			}
		},
		methods: {
			async getData () {
				const data = await this.$http.httpGet('/manager/' + this.id + '/')
				this.form = data
				console.log(data)
			},
			cancel () {
			},
			async submit () {
				const data = await this.$http.httpPost('/admin/point/', {
					...this.data,
					...{
						province: 0,
						city: 0,
						area: 0
					}
				})
				this.cancel()
				uni.navigateTo({
					url: '/pages/detection/detection',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>

</style>
