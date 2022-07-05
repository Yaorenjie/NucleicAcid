<template>
	<view>
		<uni-list>
			<uni-list-item showArrow title="检测点名称" rightText="核酸检测点名称" clickable @click="actionsName"/>
			<uni-list-item showArrow title="详细地址" note="北京市xx区xxx街道xxx号北京市xx区xxx街道xxx号北京市xx区xxx街道xxx号北京市xx区xxx街道xxx号" @click="actionsAdress"/>
			<uni-list-item showArrow title="工作时间">
				<template v-slot:footer>
					<text>17:00-19:00 19:00-21:00</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow title="检测窗口" rightText="1个" />
			<uni-list-item showArrow title="检测时间" rightText="30秒/人" />
			<uni-list-item showArrow title="总排队人数" rightText="右侧文字" />
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">是否启用</view>
				<switch checked @change="actionsEnable" />
			</view>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'核酸检测点',
				id: 1
			}
		},
		onLoad(e){
			if(e.id){
				console.log(e.id)
				this.id = e.id;
			}
		},
		methods: {
			actionsEnable(e){
				console.log('switch2 发生 change 事件，携带值为', e.detail.value)
			},
			actionsName(){
				console.log(1)
				uni.navigateTo({
					url: 'detection-edit-name?id='+this.id+'&name=核酸检测点名称',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsAdress(){
				uni.navigateTo({
					url: 'detection-edit-address?id='+this.id+'&val=核酸检测点名称',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>

</style>
