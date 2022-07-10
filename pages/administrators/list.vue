<template>
	<view class="container">
		<uni-nav-bar dark left-icon="left" right-icon="more-filled" background-color="#0260a2" @clickLeft="clickLeft" @clickRight="clickRight">
			<uni-easyinput suffixIcon="search" v-model="search.keyWord" placeholder="请输入姓名/手机号" @confirm="initList" @change="initList" @iconClick="initList" :styles="styles" :placeholderStyle="placeholderStyle"></uni-easyinput>
		</uni-nav-bar>
		<view class="admin-body">
			<uni-card class="admin-list" :class="item.state===0?'disabled':''" v-for="(item, index) in adminList" :key="index" :title="item.role" :isFull="true">
				<view class="uni-flex uni-row uni-align-center">
					<uni-icons type="person" size="24"></uni-icons>
					<text class="uni-h4 uni-ml5">{{item.name}}</text>
					<text class="text uni-ml5">{{item.account}}</text>
				</view>
				<view slot="actions" class="card-actions">
					<button class="mini-btn" type="default" size="mini" @click="resetPwd(item)">修改密码</button>
					<button class="mini-btn" type="default" size="mini" @click="enableCk(item, index)">{{item.state === 1 ? '禁' : '启'}}用</button>
					<button class="mini-btn" type="default" size="mini" @click="editCk(item)">编辑</button>
				</view>
			</uni-card>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pattern="pattern" @fabClick="addCk" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adminList: [],
				status: 'more',
				search: {
					page: 1,
					size: 10,
					keyword: "",
				},
				totalPage: 0,
				pattern: {
					selectedColor: '#0260a2',
					buttonColor: '#0260a2',
				},
				styles: {
					borderColor: 'transparent',
					color: '#ffffff'
				},
				placeholderStyle: 'color: #ffffff',
				loadMoreText: "加载中...",
				showLoadMore: false
			}
		},
		onShow() {
			this.initList()
		},
		onUnload() {
			this.totalPage = 0
			this.adminList = []
			this.loadMoreText = "加载更多"
			this.showLoadMore = false
		},
		onPullDownRefresh () {
		    this.initList()
		},
		onReachBottom(){
			if(this.adminList.length < this.totalPage){
				let _page=this.search.page
				_page++
				this.$set(this.search,'page',_page)
			    this.getList()
			} else {
				this.loadMoreText = "没有更多数据了"
			}
		},		
		methods: {
			clickLeft(){
				uni.navigateBack()
			},
			clickRight(){
				uni.navigateTo({
					url: '/pages/person/index',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			initList () {
				this.adminList = []
				this.$set(this.search,'page',1)
				this.getList()
			},
			async getList(){
				this.status = 'loading';
				const res = await this.$http.httpGet('/manager/', this.search)
				if(res.data)this.adminList.push.apply(this.adminList,res.data)
				this.totalPage = res.total
				uni.stopPullDownRefresh()
			},
			editCk (item) {
				uni.navigateTo({
					url: '/pages/administrators/edit?id=' + item.id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			addCk () {
				uni.navigateTo({
					url: '/pages/administrators/edit',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			async resetPwd (item) {
				uni.navigateTo({
					url: '/pages/administrators/password?id=' + item.id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			async enableCk (item, index) {
				const changeState = item.state === 1 ? 0 : 1
				console.log(item.state, changeState)
				const data = await this.$http.httpPost(`/manager/${item.id}/state/`, {
					state: changeState
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
				this.adminList[index].state = changeState
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		overflow: hidden;
	}
	.uni-easyinput {
		width: 100%;
		display: flex;
		position: relative;
		align-items: center;
	}
	.admin-body{
		padding: 0 20rpx;
	}
	.admin-list{
		margin-top: 20rpx !important;
		padding: 20rpx;
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
		padding: 20rpx 0 40rpx 0;
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
	.card-one {
		margin-bottom: 20px!important;
	}
</style>