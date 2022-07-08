<template>
	<view class="container">
		<selectCity @change="cityChange" />
		<view class="flex-end">
			<button size="mini" type="default" @click="addCk">添加采样点</button>
		</view>
		<uni-card v-for="(item, index) in detectionList" :key="index" @click="editCk(item.id)" class="detection-list"
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
	import selectCity from '@/components/select/city.vue'
	export default {
		components: {
			selectCity
		},
		data() {
			return {
				title: "核酸检测点",
				detectionList: [],
				search: {
					page: 1,
					size: 10,
					province: '',
					city: '',
					area: '',
					latitude: '',
					longitude: ''
				},
				status: 'more',
				total: 0
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
		},
		onShow() {
			this.getLocation()
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
			getLocation() {
				console.log(121212)
				uni.getLocation({
					type: 'wgs84',
					geocode: true, //设置该参数为true可直接获取经纬度及城市信息
					success: function(res) {
						console.log(res)
					},
					fail: function() {
						uni.showToast({
							title: '获取地址失败，将导致部分功能不可用',
							icon: 'none'
						});
					}
				});
			},
			async getList() {
				this.status = 'loading';
				const data = await this.$http.httpGet('/admin/point/', this.search)
				console.log(data)
				this.total = data.total
				this.detectionList = data.data
				if (this.detectionList.length >= this.total) this.status = 'noMore'
			},
			actionsEdit(id) {
				uni.navigateTo({
					url: 'detection-edit/detection-edit?id=' + id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			addCk() {
				uni.navigateTo({
					url: 'detection-edit/detection-edit?id=0',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			editCk(id) {
				uni.navigateTo({
					url: 'detection-edit/detection-edit?id=' + id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			cityChange(item) {
				if (item.length > 0) {
					this.$set(this.search, 'province', item[0])
					this.$set(this.search, 'city', item[1])
					this.$set(this.search, 'area', item[2])
				} else {
					this.$set(this.search, 'province', '')
					this.$set(this.search, 'city', '')
					this.$set(this.search, 'area', '')
				}
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
