<template>
	<view class="container">
		<uni-card v-for="item in detectionList" class="detection-list" :title="item.name" :isFull="true" :sub-title="item.address" :extra="item.distance">
			<view class="uni-flex uni-row uni-justify-center uni-align-center">
				<view class="text">预计等待时间</view>
				<text class="uni-h1 color-important">{{item.wait}}</text>
				<view class="text">分钟</view>
			</view>
			<view class="uni-body">
				<div>总排队人数：{{item.people}}人</div>
				<div>检测窗口：{{item.point}}个</div>
				<div>采样时间：
					{{item.time}}
				</div>	
			</view>
<!-- 			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsEdit(1)">
					<uni-icons type="compose" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">编辑</text>
				</view>
			</view> -->
		</uni-card>
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
				]
			}
		},
		methods: {
			actionsEdit(id){
				uni.navigateTo({
					url: 'detection-edit/detection-edit?id='+id,
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
