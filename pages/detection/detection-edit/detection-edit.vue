<template>
	<view>
		<uni-list>
			<uni-list-item showArrow title="检测点名称" :rightText="data.name" clickable @click="actionsName"/>
			<uni-list-item showArrow title="详细地址" :note="data.address" clickable @click="actionsAdress"/>
			<uni-list-item showArrow title="工作时间" clickable @click="actionsTime">
				<template v-slot:footer>
					<text v-if="data.time.length > 0">{{data.time[0].startAt}}-{{data.time[0].endAt}} {{data.time[1].startAt}}-{{data.time[1].endAt}}</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow title="检测窗口" :rightText="data.window ? `${data.window}个` : ''" clickable @click="actionsWindow" />
			<uni-list-item showArrow title="检测时间" :rightText="data.rate ? `${data.rate}秒/人` : ''" clickable @click="actionsRate" />
			<uni-list-item showArrow title="总排队人数" :rightText="data.wait ? `${data.wait}个` : ''" clickable @click="actionsWait" />
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
				id: ''
			}
		},
		computed: {
			data () {
				return this.$store.state.detectionData
			}
		},
		onLoad(e){
			if(e.id){
				this.id = e.id;
			}
		},
		methods: {
			actionsEnable(e){
				console.log('switch2 发生 change 事件，携带值为', e.detail.value)
			},
			actionsName(){
				uni.navigateTo({
					url: 'detection-edit-name?id=' + this.id +'&name=' + this.data.name || '',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsAdress(){
				uni.navigateTo({
					url: 'detection-edit-address?id='+this.id+'&address=' + this.data.address + '&lat=' + this.data.latitude + '&long=' + this.data.longitude,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsWindow() {
				uni.navigateTo({
					url: 'detection-edit-window?id='+this.id+'&window=' + this.data.window,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsRate() {
				uni.navigateTo({
					url: 'detection-edit-rate?id='+this.id+'&rate=' + this.data.rate,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsWait() {
				uni.navigateTo({
					url: 'detection-edit-wait?id='+this.id+'&wait=' + this.data.wait,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsTime() {
				uni.navigateTo({
					url: 'detection-edit-time?id='+this.id+'&time=' + this.data.time,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
		}
	}
</script>

<style>

</style>
