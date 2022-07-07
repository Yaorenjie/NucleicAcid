<template>
	<view>
		<uni-list>
			<uni-list-item v-for="item in roleList" showArrow :title="item.name" :rightText="item.state===0?'超级管理员':''" clickable @click="roleEdit(item.id)"/>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roleList: [],
				page: 1,
				size: 10
			}
		},
		created() {
			this.getRole()
		},
		methods: {
			getRole() {
				this.$http.httpGet('/admin/role',{
					page: this.page,
					size: this.size
				}).then((res) => {
					this.roleList=res.data
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			roleEdit(id){
				uni.navigateTo({
					url: 'role-edit?id='+id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
		}
	}
</script>

<style>

</style>
