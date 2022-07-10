<template>
	<view class="container">
		<uni-nav-bar dark left-icon="left" right-icon="more-filled" background-color="#0260a2" @clickLeft="clickLeft" @clickRight="clickRight">
			<location @change="locationChange"></location>
		</uni-nav-bar>
		
		<uni-card v-for="(item, index) in detectionList" :key="index" class="detection-list"
			:title="item.name" :isFull="true" :sub-title="item.fullAddress"
			:extra="item.distance === -1 ? '' : item.distance * 0.001 + '公里'">
			<view class="uni-flex uni-row uni-justify-center uni-align-center">
				<view class="text">预计等待时间</view>
					<text class="uni-h1 color-important">{{getHour(item.waitTime)}}</text>
					<view class="text">{{getHourType(item.waitTime)}}</view>
					<text class="uni-h1 color-important">{{getMinute(item.waitTime)}}</text>
					<view class="text">{{getMinuteType(item.waitTime)}}</view>
					<text class="uni-h1 color-important">{{getTime(item.waitTime)}}</text>
					<view class="text">{{getTimeType(item.waitTime)}}</view>
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
			async getList() {
				this.status = 'loading';
				const data = await this.$http.httpGet('/api/point/', this.search)
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
			},
			getHour(time) {
				if (time < (60 * 60)) return ''
				return parseInt(time / 60 / 60 % 24)
			},
			getHourType (time) {
				return time < (60 * 60) ? '' : '小时'
			},
			getMinute (time) {
				if (time < 60 || parseInt(time / 60 % 60) === 0) return ''
				return parseInt(time / 60 % 60)
			},
			getMinuteType (time) {
				if (time < 60 || parseInt(time / 60 % 60) === 0) return ''
				return '分钟'
			},
			getTime (time) {
				if ((time % 60 === 0 && time !== 0) || time >= 60) return ''
				return time % 60
			},
			getTimeType (time) {
				if ((time % 60 === 0 && time !== 0) || time >= 60) return ''
				return '秒'
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
		// padding: 20rpx;
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
