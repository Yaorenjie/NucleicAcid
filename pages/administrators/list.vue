<template>
	<view class="container">
		<uni-card v-for="item in adminList" :title="item.company" :isFull="true" :sub-title="item.comment" :extra="item.contractStartAt+' 至 '+item.contractEndAt">
			<view class="uni-flex uni-row uni-align-center">
				<uni-icons type="person" size="24"></uni-icons>
				<text class="uni-h4 uni-ml5">{{item.name}}</text>
				<text class="text uni-ml5">{{item.account}}</text>
			</view>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsEdit(1)">
					<uni-icons type="auth-filled" size="24" color="#999"></uni-icons>
					<text class="card-actions-item-text">无痕登录</text>
				</view>
				<button class="mini-btn" type="default" size="mini">基本设置</button>
				<button class="mini-btn" type="default" size="mini">管理员配置</button>
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
			this.getList()
		},
		onPullDownRefresh () {
		    this.detectionList = []
			this.search.page = 1
		    this.getList()
		    setTimeout(() => {
		      uni.stopPullDownRefresh ();
		    }, 1000);
		},
		onReachBottom(){
			if(this.detectionList.length < this.total){
				this.search.page ++;
			    this.getList()
			}
		},		
		methods: {
			async getList(){
				this.status = 'loading';
				const data = await this.$http.httpGet('/manager/', this.search)
				console.log(data)
				this.total = data.total
				this.detectionList = data.data
				if(this.detectionList.length >= this.total) this.status = 'noMore'
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
</style>