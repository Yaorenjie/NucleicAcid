<template>
	<view class="container">
		<uni-section title="管理中心" type="line">
			<uni-list v-if="list.length>0">
				<uni-list-item v-for="(item,index) in list" :key="index" showArrow :title="item.label" clickable @click="urlCk(item.path)"/>
			</uni-list>
			<uni-list v-else>
				<uni-list-item v-for="(item,index) in permisson" :key="index" showArrow :title="item.label" clickable @click="urlCk(item.path)"/>
			</uni-list>
		</uni-section>
		<uni-section title="基本信息" type="line">
			<uni-list>
				<uni-list-item title="姓名" :rightText="user.name"/>
				<uni-list-item title="手机号" :rightText="user.account"/>
				<uni-list-item title="退出" showArrow clickable @click="logOut"/>
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				permisson: [
					{
						label: "用户管理",
						path: "/pages/admin/admin"
					},
					{
						label: "角色管理",
						path: "/pages/role/role"
					},
					{
						label: "权限管理",
						path: "/pages/permission/permission"
					}
				],
				loading: false
			}
		},
		computed: {
			user() {
				return this.$store.state.users
			},
			list() {
				return this.$store.state.permission
			}
		},
		onShow(){
			this.getPermission()
		},
		methods: {
			urlCk (url) {
				uni.navigateTo({
				    url: url	
				})
			},
			async getPermission() {
				const data = await this.$http.httpGet('/permission/')
				this.$store.commit("UPDATEPERMISSION", data);
			},
			logOut() {
				if (this.loading) return
				this.loading = true
				this.$http.httpPost('/logout/').then((res) => {
					this.loading = false
					this.$store.commit("UPDATEUSERS", {});
					this.$store.commit("update_last_route", '')
					uni.navigateTo({
					    url: '/pages/login/login'
					});
				})
				.catch((error) => {
					this.loading = false
				    console.log(error);
				});
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.uni-section{
			margin-top: 20rpx;
			&:nth-child(1){
				margin-top: 0;
			}
		}
	}
</style>
