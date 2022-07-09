<template>
	<view>
		<uni-list>
			<uni-list-item v-for="item in roleList" showArrow :title="item.name" :rightText="item.state===0?'超级管理员':''" clickable @click="editRole(item.id)"/>
		</uni-list>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pattern="pattern" @fabClick="addRole" />
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roleList: [],
				page: 1,
				size: 10,
				totalPage: 0,
				pattern: {
					selectedColor: '#0260a2',
					buttonColor: '#0260a2',
				},
				loadMoreText: "加载中...",
				showLoadMore: false
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
			this.getRoleList()
		},
		onUnload() {
			this.totalPage = 0
			this.roleList = []
			this.loadMoreText = "加载更多"
			this.showLoadMore = false
		},
		onPullDownRefresh() {
			this.roleList = []
			this.page = 1
			this.getRoleList()
		},
		onReachBottom() {
			if (this.roleList.length < this.total) {
				this.showLoadMore = true
				this.page++;
				this.getRoleList()
			} else {
				this.loadMoreText = "没有更多数据了"
			}
		},
		methods: {
			getRoleList() {
				this.$http.httpGet('/admin/role',{
					page: this.page,
					size: this.size
				}).then((res) => {
					if(res.data)this.roleList.push.apply(this.roleList,res.data)
					this.total = res.total
					uni.stopPullDownRefresh()
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			editRole(id){
				uni.navigateTo({
					url: 'role-edit?id='+id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			addRole(){
				uni.navigateTo({
					url: 'role-edit',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>

</style>
