<template>
	<view class="container">
		<uni-card v-for="item in adminList" :title="item.company" :isFull="true" :sub-title="item.comment" :extra="item.contractStartAt+' 至 '+item.contractEndAt">
			<view class="uni-flex uni-row uni-align-center">
				<uni-icons type="person" size="24"></uni-icons>
				<text class="uni-h4 uni-ml5">{{item.name}}</text>
				<text class="text uni-ml5">{{item.account}}</text>
			</view>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="accountLogin(item.id,item.account,item.password)">
					<uni-icons type="auth-filled" size="24" color="#999"></uni-icons>
					<text class="card-actions-item-text">无痕登录</text>
				</view>
				<button class="mini-btn" type="default" size="mini" @click="adminEdit(item.id)">基本设置</button>
				<button class="mini-btn" type="default" size="mini" @click="adminUser(item.id)">管理员配置</button>
			</view>
		</uni-card>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pattern="pattern" @fabClick="addAdmin" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				size: 10,
				totalPage: 0,
				keyword: "",
				adminList: [],
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
			this.getAdminList()
		},
		onUnload() {
			this.totalPage = 0
			this.adminList = []
			this.loadMoreText = "加载更多"
			this.showLoadMore = false
		},
		onPullDownRefresh() {
			this.adminList = []
			this.page = 1
			this.getAdminList()
		},
		onReachBottom() {
			if (this.adminList.length < this.total) {
				this.showLoadMore = true
				this.page++;
				this.getAdminList()
			} else {
				this.loadMoreText = "没有更多数据了"
			}
		},
		methods: {
			getAdminList(){
				this.$http.httpGet('/admin',{
					page: this.page,
					size: this.size,
					keyword: this.keyword
				}).then((res) => {
					let _adminList=[]
					if(res.data)this.adminList.push.apply(this.adminList,res.data)
					this.total = res.total
					uni.stopPullDownRefresh()
				})
				.catch((error) => {
				    console.log(error);
				});
			},
			adminEdit(id){
				uni.navigateTo({
					url: 'admin-edit?id='+id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			adminUser(id){
				uni.navigateTo({
					url: 'admin-user?id='+id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			accountLogin(_id,_account,_password){
				this.$http.httpPost('/admin/fake/'+_id+'/',this.valiFormData).then(res => {
					this.$store.commit("UPDATEUSERS", res);
					this.getPermission()
					uni.navigateTo({
					    url: '/pages/person/index'
					});
				})
			},
			async getPermission() {
				const data = await this.$http.httpGet('/permission/')
				this.$store.commit("UPDATEPERMISSION", data);
			},
			addAdmin(){
				uni.navigateTo({
				    url: 'admin-add',
				    animationType: 'slide-in-right',
				    animationDuration: 200
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
		padding: 20rpx;
	}
	
	.uni-card{
		margin-bottom: 20rpx !important;
	}
	
	.custom-cover {
		flex: 1;
		flex-direction: row;
		position: relative;
	}

	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background-color: rgba($color: #000000, $alpha: 0.4);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
	}

	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		height: 45px;
		uni-button[size=mini]{
			margin: 0 10rpx;
		}
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 10rpx;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}
	.uni-ml5{
		margin-left: 5px;
	}
</style>