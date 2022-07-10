<template>
	<view class="container">
		<uni-nav-bar leftWidth="0" rightWidth="180rpx" dark right-icon="more-filled" background-color="#0260a2" @clickLeft="clickLeft">
			<view class="header-logo">
				<img class="slot-image" src="/static/logo.png"></img>
			</view>
			<block slot="right">
				<location @change="locationChange"></location>
			</block>
		</uni-nav-bar>
		<view class="detection-body">
			<uni-card v-for="(item, index) in detectionList" :key="index" class="detection-list"
				:title="item.name" :isFull="true" :sub-title="item.fullAddress"
				:extra="item.distance === -1 ? '' : Math.round(item.distance) / 1000 + '公里'">
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
					<view><label>总排队人数：</label><label>{{item.wait}}人</label></view>
					<view>
						<label>检测窗口：</label><label>{{item.window}}</label>个
					</view>
					<view>
						<label>采样时间：</label>
						<label v-for="(item1, index1) in item.time">
							{{item1.startAt}} - {{item1.endAt}}
						</label>
					</view>
				</view>
			</uni-card>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
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
				totalPage: 0,
				loadMoreText: "加载中...",
				showLoadMore: false
			}
		},
		// onShow() {
		// 	this.initData()
		// },
		onUnload() {
			this.totalPage = 0
			this.detectionList = []
			this.loadMoreText = "加载更多"
			this.showLoadMore = false
		},
		onPullDownRefresh() {
			this.initData()
		},
		onReachBottom() {
			if (this.detectionList.length < this.totalPage) {
				this.showLoadMore = true
				let _page=this.search.page
				_page++
				this.$set(this.search,'page',_page)
				this.getList()
			} else {
				this.loadMoreText = "没有更多数据了"
			}
		},
		methods: {
			initData(){
				this.detectionList = []
				this.$set(this.search, 'page', 1)
				this.getList()
			},
			async getList() {
				const res = await this.$http.httpGet('/api/point/', this.search)
				this.totalPage = res.total
				if(res.data)this.detectionList.push.apply(this.detectionList,res.data)
				uni.stopPullDownRefresh()
			},
			locationChange(item) {
				this.$set(this.search, 'latitude', item.latitude)
				this.$set(this.search, 'longitude', item.longitude)
				this.initData()
			},
			getHour(time) {
				if (time < (60 * 60)) return ''
				return Math.ceil(time / 60 / 60 % 24)
			},
			getHourType (time) {
				return time < (60 * 60) ? '' : '小时'
			},
			getMinute (time) {
				console.log(time, Math.ceil(time / 60))
				if (time < 60 || Math.ceil(time / 60 % 60) === 0) return ''
				return Math.ceil((time / 60) % 60)
			},
			getMinuteType (time) {
				if (time < 60 || Math.ceil(time / 60 % 60) === 0) return ''
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

<style lang="scss" scoped>
	.container {
		overflow: hidden;
		// padding: 20rpx;
	}
	.uni-navbar__header-btns-right{
		width: 100px;
	}
	.header-logo{
		display: flex;
		align-items: center;
		.slot-image{
			width: auto;
			height: 26px;
		}
	}
	.uni-navbar__header-container {
		padding-left: 0;
	}
	.detection-body{
		padding: 0 20rpx !important;
	}
	.detection-list {
		margin-top: 20rpx !important;
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
	.uni-body{
		label{
			padding-right: 5rpx;
		}
		uni-view{
			padding: 10rpx 0;
		}
	}
</style>
