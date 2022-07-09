<template>
	<view class="container">
		<view class="uni-form-item uni-column">
			<uni-easyinput suffixIcon="search" v-model="search.keyWord" placeholder="请输入姓名/手机号" @confirm="initList" @change="initList" @iconClick="initList"></uni-easyinput>
		</view>
		<button size="mini" class="mini-btn" type="default"  @click="addCk()">新增</button>
		<uni-card class="card-one" v-for="(item, index) in adminList" :key="index" :title="item.role" :isFull="true">
			<view class="uni-flex uni-row uni-align-center">
				<uni-icons type="person" size="24"></uni-icons>
				<text class="uni-h4 uni-ml5">{{item.name}}</text>
				<text class="text uni-ml5">{{item.account}}</text>
			</view>
			<view slot="actions" class="card-actions">
				<button class="mini-btn" type="default" size="mini" @click="resetPwd(item)">重置密码</button>
				<button class="mini-btn" type="default" size="mini" @click="enableCk(item, index)">{{item.state === 1 ? '禁' : '启'}}用</button>
				<button class="mini-btn" type="default" size="mini" @click="editCk(item)">编辑</button>
			</view>
		</uni-card>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adminListUrl: "http://hsc.zhaomaomao.net/admin/",
				adminList: [
					{
						company: "公司名称",
						contractStartAt: "2022-06-28",
						contractEndAt: "2022-07-01",
						comment: "备注信息",
						name: "张三",
						account: "13588888888",
					}
				],
				status: 'more',
				search: {
					page: 1,
					size: 10,
					keyword: "",
				},
				total: 0
			}
		},
		created() {
			// this.getAdminList()
		},
		onLoad() {
			uni.startPullDownRefresh()
		},
		onPullDownRefresh () {
		    this.detectionList = []
			this.search.page = 1
		    this.getList()
		    setTimeout(() => {
		      uni.stopPullDownRefresh ()
		    }, 1000);
		},
		onReachBottom(){
			if(this.detectionList.length < this.total){
				this.search.page ++
			    this.getList()
			}
		},		
		methods: {
			initList () {
				this.search.page = 1
				this.getList()
			},
			async getList(){
				this.status = 'loading';
				const data = await this.$http.httpGet('/manager/', this.search)
				this.total = data.total
				this.adminList = data.data
				if(this.adminList.length >= this.total) this.status = 'noMore'
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
				const data = await this.$http.httpPost(`/manager/${item.id}/pwd/`)
				console.log(data)
			},
			async enableCk (item, index) {
				const changeState = item.state === 1 ? 0 : 1
				const data = await this.$http.httpPost(`/manager/${item.id}/state/`, {
					state: changeState
				})
				uni.showToast({
					title: 操作成功,
					icon: 'none',
					duration: 2000
				})
				this.adminList[index].state = changeState
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
		padding: 20rpx;
	}
	
	.detection-list{
		margin-top: 10px !important;
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
	.card-one {
		margin-bottom: 20px!important;
	}
</style>