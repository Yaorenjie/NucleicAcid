<template>
	<view>
		<uni-card :is-shadow="false">
			<uni-forms ref="valiForm"  :modelValue="form" label-position="top" padding :label-width="200">
				<uni-forms-item label="请输入新密码" required>
					<uni-easyinput type="password" v-model="form.pwd" />
				</uni-forms-item>
				<uni-forms-item label="请重复输入新密码" required>
					<uni-easyinput type="password" v-model="form.newPwd" />
				</uni-forms-item>
			</uni-forms>
			<view class="btn-list">
				<button size="mini" type="primary" @click="cancel()">取消</button>
				<button size="mini" type="primary" @click="submit('valiForm')">提交</button>	
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				form: {
					pwd: '',
					newPwd: ''
				}
			}
		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id
			}
		},
		methods: {
			cancel() {
				this.form = {
					pwd: '',
					newPwd: ''
				}
				uni.navigateTo({
					url: '/pages/administrators/list',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			submit() {
				this.editAjax()
			},
			async editAjax () {
				if (this.form.newPwd !== this.form.pwd) {
					uni.showToast({
						title: '两次密码不一样',
						icon: 'none',
						duration: 2000
					})
					return
				}
				const data = await this.$http.httpPost('/manager/' + this.id + '/pwd/', {
					newPwd: this.form.newPwd
				})
				uni.showToast({
					title: '密码修改成功',
					icon: 'none',
					duration: 2000
				})
				this.cancel()
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
