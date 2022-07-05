<template>
	<view>
		<uni-list>
			<uni-list-item showArrow title="检测点名称" :rightText="data.name" clickable @click="actionsName"/>
			<uni-list-item showArrow title="详细地址" :note="data.address" clickable @click="actionsAdress"/>
			<uni-list-item showArrow title="工作时间">
				<template v-slot:footer>
					<text v-if="data.time.length > 0">{{data.time[0].startAt}}-{{data.time[0].endAt}} {{data.time[1].startAt}}-{{data.time[1].endAt}}</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow title="检测窗口" :rightText="data.window ? `${data.window}个` : ''" />
			<uni-list-item showArrow title="检测时间" :rightText="data.rate ? `${data.rate}秒/人` : ''" />
			<uni-list-item showArrow title="总排队人数" :rightText="data.wait ? `${data.wait}个` : ''" />
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
			this.init()
		},
		methods: {
			init () {
				// uni.$on("updateDetection", (data) => {
				// 	console.log(data.name)
				// 	if (data.name) this.$set(this.data, 'name', data.name)
				// 	if (data.address) this.$set(this.data, 'address', data.address)
				// 	if (data.window) this.$set(this.data, 'window', data.window)
				// 	if (data.wait) this.$set(this.data, 'wait', data.wait)
				// 	if (data.rate) this.$set(this.data, 'rate', data.rate)
				// 	if (data.time) this.$set(this.data, 'time', data.time)
				// 	if (data.lat) this.$set(this.data, 'latitude', data.lat)
				// 	if (data.long) this.$set(this.data, 'longitude', data.long)
				// 	console.log(this.data)
				// 	console.log("监听到事件来自 update ，携带参数 msg 为：" + data); 
				// })
			},
			actionsEnable(e){
				console.log('switch2 发生 change 事件，携带值为', e.detail.value)
			},
			actionsName(){
				console.log(this.data, '3434')
				uni.navigateTo({
					url: 'detection-edit-name?id=' + this.id +'&name=' + this.data.name || '',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			actionsAdress(){
				console.log(this.data, '1212')
				uni.navigateTo({
					url: 'detection-edit-address?id='+this.id+'&address=' + this.data.address + '&lat=' + this.data.latitude + '&long=' + this.data.longitude,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>

</style>
