<template>
	<view class="container">
		<view class="input" type="text" placeholder="请选择地区">
		        <picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" range-key="text" :value="multiIndex"
		            @change="pickerChange" @columnchange="pickerColumnchange">
		            <view class="">{{select}}</view>
		        </picker>
		    </view>
		<button type="default" @click="addCk">添加采样点</button>
		<uni-card v-for="item in detectionList" @click="editCk(item.id)" class="detection-list" :title="item.name" :isFull="true" :sub-title="item.fullAddress" :extra="item.distance">
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
	export default {
		data() {
			return {
				title: "核酸检测点",
				detectionList: [
					{
						name: "圣熙8号（索真）社会化点位",
						address: "海淀区学清路8号物美圣熙8号购物中心正门西侧",
						time: "8:00-19:30",
						people: "20",
						point: "1",
						distance: "1.4公里",
						wait: '20'
					},
					{
						name: "凯时广场（索真）社会化点位",
						address: "海淀区清华东路甲1号凯时广场",
						time: "9:00-11:30 13:00-17:30",
						people: "30",
						point: "1",
						distance: "1.6公里",
						wait: '30'
					},
					{
						name: "学清嘉创大厦（谱尼）社会化点位",
						address: "海淀区学清嘉创大厦西北角",
						time: "9:00-11:30 13:00-17:30",
						people: "10",
						point: "1",
						distance: "1.8公里",
						wait: '10'
					},
					{
						name: "中国石油化工科学研究院西门（谱尼）社会化点位",
						address: "海淀区学院路18号中国石油化工科学研究院西门",
						time: "9:00-11:30 13:00-17:30",
						people: "30",
						point: "1",
						distance: "3.6公里",
						wait: '30'
					}
				],
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
				total: 0,
				oldpProvinceDataList: [],
				newProvinceDataList: [[],[],[]],
				multiIndex: [0, 0, 0],
				select: '选择地区'
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
			this.getList()
			this.init()
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
			async init() {
				await this.getCity(0, 0)
				await this.getCity(1, this.newProvinceDataList[0][0].value)
				await this.getCity(2, this.newProvinceDataList[1][0].value)
			},
			async getCity(index, pid) {
				const data = await this.$http.httpGet('/admin/location_opt/', {
					pid: pid
				})
				this.$set(this.newProvinceDataList, index, data)
				console.log(data)
			},
			async getList() {
				this.status = 'loading';
				const data = await this.$http.httpGet('/admin/point/', this.search)
				console.log(data)
				this.total = data.total
				this.detectionList = data.data
				if(this.detectionList.length >= this.total) this.status = 'noMore'
			},
			actionsEdit(id){
				uni.navigateTo({
					url: 'detection-edit/detection-edit?id='+id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
		    pickerChange (e) {
			    var _this = this
			    _this.multiIndex = e.detail.value
			    _this.select =
			        _this.newProvinceDataList[0][_this.multiIndex[0]].value + "---" +
			        _this.newProvinceDataList[1][_this.multiIndex[1]].value + "---" +
			        _this.newProvinceDataList[2][_this.multiIndex[2]].value
			},
			async pickerColumnchange(e) {
				if (e.detail.column === 0) {
					this.multiIndex[0] = e.detail.value
					this.multiIndex[1] = 0
					this.multiIndex[2] = 0
					await this.getCity(1, this.newProvinceDataList[0][this.multiIndex[0]].value)
					await this.getCity(2, this.newProvinceDataList[1][0].value)
				}
				if (e.detail.column === 1) {
					this.multiIndex[1] = e.detail.value
					this.multiIndex[2] = 0
					await this.getCity(2, this.newProvinceDataList[1][e.detail.value].value)
				}
				if (e.detail.column === 2) {
					this.multiIndex[2] = e.detail.value
				}
				console.log(this.multiIndex)
			},
			addCk () {
				uni.navigateTo({
					url: 'detection-edit/detection-edit',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			editCk (id) {
				uni.navigateTo({
					url: 'detection-edit/detection-edit?id=' + id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
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
