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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				size: 10,
				keyword: "",
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
				]
			}
		},
		created() {
			// this.getAdminList()
		},
		methods: {
			async getAdminList(){
				let res, err
				// #ifndef VUE3
				[err, res] = await uni.request({
					url: this.adminListUrl,
					dataType: 'text',
					header:{
						Authentication: "hdlpwT6abxrBCLb9VYx4PKa7Op2b53JikSbEZP2vGzd7YIFY2XQL3msinffEFv8p"
					},
					data: {
						page: this.page,
						size: this.size,
						keyword: this.keyword,
						noncestr: Date.now()
					}
				});
				// #endif
				// #ifdef VUE3
				try {
				res = await uni.request({
					url: requestUrl,
					dataType: 'text',
					data: {
						noncestr: Date.now()
					}
				});
				} catch(e){
					err=e
				}
				// #endif
				if (err) {
					console.log('request fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
				} else {
					console.log('request success', res)
				}
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