<template>
	<view class="container">
		<uni-forms label-width="0" :modelValue="formData" ref="form" :rules="rules">
			<view class="login-logo">
				<image class="slot-image" src="/static/login-logo.png" mode="widthFix"></image>
			</view>
			<uni-forms-item name="phonenumber" maxlength="11">
				<uni-easyinput type="number" v-model="formData.phone" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item  name="password">
				<uni-easyinput type="password" v-model="formData.password" password="true" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-button type="primary" @tap="login">登录</uni-button>
		</uni-forms>
		<view class="login-bottom">
			<image class="slot-image" src="/static/login-bottom.png" mode="heightFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 表单数据
				formData: {
					phone: '',
					password: ''
				},
				rules: {
					password: {
						rules: [
						{
							min: 6,
							max: 18,
							message: '密码字数6-18之间',
							trigger: 'change'
						}, {
							required: true,
							errorMessage: '请输入密码',
							trigger: ['change', 'blur']
						}
					]},
					phonenumber: {
						rules: [{
							required: true,
							errorMessage: '请输入手机号码',
							trigger: ['change', 'blur']
						},
						{
							max: 11,
							errorMessage: '手机号码不正确',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.phonenumber(value);
							},
							errorMessage: '手机号码不正确',
							trigger: ['change', 'blur']
						}, {
							pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
							transform(value) {
								return String(value);
							},
							errorMessage: '手机号码输入不正确',
							trigger: ['change', 'blur']
						}
					]}
				}
			}
		},
		created() {
		},
		methods: {
			login() {
				this.$refs.form.validate().then(valid=>{
					if (valid) {
						this.loginAjax()
				    }
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			loginAjax() {
				this.$http.httpPost('/login/pwd/', {
					username: this.formData.phone,
					password: this.formData.password
				}).then((res) => {
					res.account = this.formData.phone
					this.$store.commit("UPDATEUSERS", res);
					this.getPermission()
					uni.navigateTo({
					    url: '/pages/person/index'
					});
				})
				.catch((error) => {
				  console.log(error);
				});
			},
			async getPermission() {
				const data = await this.$http.httpGet('/permission/')
				this.$store.commit("UPDATEPERMISSION", data);
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body{
		height: 100%;
		overflow: hidden;
	}
	.container {
		display: flex;
		height: 100%;
		overflow: hidden;
		flex-direction: column;
		justify-content: space-between;
		.login-logo{
			display: flex;
			justify-content: center;
			align-items:center;
			width: 100%;
			margin: 100rpx 0;
			text-align: center;
			.slot-image{
				width: 400rpx;
				height: auto;
			}
		}
		.login-bottom{
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;
			width: 100%;
			height: 33.3%;
			text-align: right;
			.slot-image{
				width: auto;
				height: 100%;
			}
		}
		.title {
			font-size: 60rpx;
			text-align: center;
			padding: 100rpx 0 60rpx 0;
		}
		.uni-forms{
			padding: 20rpx;
			.uni-forms-item__label{
				height: 0;
			}
		}
	}
</style>
