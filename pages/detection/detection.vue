<template>
	<view class="container">
		<uni-nav-bar dark left-icon="left" right-icon="more-filled" background-color="#0260a2" @clickLeft="clickLeft" @clickRight="clickRight">
			<selectCity @change="cityChange" />
		</uni-nav-bar>
		<view class="detection-body">
			<view class="flex-end">
				<button size="mini" type="primary" @click="addFile()">批量导入</button>
			</view>
			<uni-card v-for="(item, index) in detectionList" :key="index" @click="actionsEdit(item.id)" class="detection-list"
				:title="item.name" :isFull="true" :sub-title="item.fullAddress"
				:extra="item.distance === -1 ? '' : item.distance * 0.001 + '公里'">
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
			</uni-card>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		<uni-fab ref="fab":content="content" horizontal="right" vertical="bottom" :pattern="pattern" @trigger="trigger" />
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
				pattern: {
					selectedColor: '#0260a2',
					buttonColor: '#0260a2',
				},
				search: {
					page: 1,
					size: 10,
					province: '',
					city: '',
					area: '',
					latitude: '',
					longitude: ''
				},
				content: [{
						iconPath: '/static/add.png',
						selectedIconPath: '/static/add-active.png',
						text: '添加',
						active: false
					},
					{
						iconPath: '/static/import.png',
						selectedIconPath: '/static/import-active.png',
						text: '导入',
						active: false
					}
				],
				totalPage: 0,
				loadMoreText: "加载中...",
				showLoadMore: false
			}
		},
		onShow() {
			this.getLocation()
			this.initData()
		},
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
				this.$set(this.search,'page',this.search.page++)
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
			trigger(e) {
				console.log(e)
				this.content[e.index].active = !e.item.active
				switch(e.index){
					case 0:
						this.addCk()
						break
					case 1:
						console.log('导入')
						break
					default:
						break
				}
			},
			getLocation() {
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
			initData(){
				this.detectionList = []
				this.$set(this.search, 'page', 1)
				this.getList()
			},
			async getList() {
				const res = await this.$http.httpGet('/admin/point/', this.search)
				this.totalPage = res.total
				if(res.data)this.detectionList.push.apply(this.detectionList,res.data)
				uni.stopPullDownRefresh()
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
					url: 'detection-edit/detection-edit',
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
				thi.initData()
			},
			addFile () {
				uni.chooseFile({
					count: 1,
					extension:['.xls','.xlsx'],
					success: (res) => {
						this.ipt(res.tempFilePaths[0])
						console.log(JSON.stringify(res.tempFilePaths))
					}
				})
			},
			async ipt (file) {
				const res = await this.$http.httpPost('/admin/point_ipt/', {
					file: file
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
		// padding: 20rpx;
	}
	.detection-body{
		padding: 0 20rpx;
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
