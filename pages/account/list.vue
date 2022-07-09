<template>
	<view class="container">
		<location @change="locationChange"></location>
		<uni-card v-for="(item, index) in detectionList" :key="index" class="detection-list"
			:title="item.name" :isFull="true" :sub-title="item.fullAddress"
			:extra="item.distance === -1 ? '' : item.distance + '公里'">
			<view class="uni-flex uni-row uni-justify-center uni-align-center">
				<view class="text">预计等待时间</view>
				<text class="uni-h1 color-important">{{item.waitTime}}</text>
				<view class="text">分钟</view>
			</view>
			<view class="uni-body">
				<view>总排队人数：{{item.wait}}人</view>
				<view>检测窗口：{{item.window}}个</view>
				<view>采样时间：
					<view v-for="(item1, index1) in item.time">
						{{item1.startAt}} - {{item1.endAt}}
					</view>
				</view>
			</view>
			<!-- 			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsEdit(1)">
					<uni-icons type="compose" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">编辑</text>
				</view>
			</view> -->
		</uni-card>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import location from '@/components/location.vue'
	export default {
		components: {
			location
		},
		data() {
			return {
				title: "核酸检测点",
				detectionList: [],
				search: {
					page: 1,
					size: 10,
					latitude: '',
					longitude: ''
				},
				status: 'more',
				total: 0
			}
		},
		onLoad() {
			// uni.startPullDownRefresh()
		},
		onShow() {
		},
		onPullDownRefresh() {
			this.detectionList = []
			this.search.page = 1
			this.getList()
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			if (this.detectionList.length < this.total) {
				this.search.page++;
				this.getList()
			}
		},
		methods: {
			async getList() {
				this.status = 'loading';
				const data = await this.$http.httpGet('/api/point/', this.search)
				console.log(data)
				this.total = data.total
				this.detectionList = [
					...this.detectionList,
					...data.data
				]
				if (this.detectionList.length >= this.total) this.status = 'noMore'
			},
			locationChange(item) {
				this.$set(this.search, 'latitude', item.latitude)
				this.$set(this.search, 'longitude', item.longitude)
				this.$set(this.search, 'page', 1)
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
		padding: 20rpx;
	}

	.detection-list {
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
		border-top: 1px #eee solid;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}

	.cover-image {
		flex: 1;
		height: 150px;
	}

	.no-border {
		border-width: 0;
	}
</style>
