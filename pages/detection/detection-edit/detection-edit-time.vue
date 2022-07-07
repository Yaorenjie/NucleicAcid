<template>
	<view>
		<uni-section title="编辑采样点" type="line">
			<view class="uni-edit-form" v-for="(item, index) in times" :key="index">
				<timeRegion :times="item" :index="index" @bindTimeChange="bindTimeChange"
					@bindTimeDelete="bindTimeDelete" />
			</view>
		</uni-section>
		<button type="primary" @click="addOne">添加工作时间段</button>
		<button type="primary" @click="submit('valiForm')">提交</button>
	</view>
</template>

<script>
	import timeRegion from '@/components/time/region.vue'
	export default {
		components: {
			timeRegion
		},
		data() {
			return {
				id: '',
				value: '',
				// 校验表单数据
				times: [{
					startAt: '',
					endAt: ''
				}]
			}
		},
		computed: {
			data() {
				return this.$store.state.detectionData
			}
		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id;
			}
			if (e.window) {
				this.$set(this.valiFormData, 'window', e.window)
			}
		},
		onShow() {
			this.times = this.data.time
		},
		methods: {
			bindTimeChange(item) {
				this.$set(this.times, item.index, item.data)
				console.log(this.times)
			},
			bindTimeDelete(index) {
				this.times.splice(index, 1)
			},
			addOne() {
				this.times.push({
					startAt: '',
					endAt: ''
				})
			},
			submit(ref) {
				this.$store.commit("update_detectionData_time", this.times);
				uni.navigateTo({
					url: '/pages/detection/detection-edit/detection-edit?id=' + this.id,
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-edit-form {
		padding: 0 20rpx;
	}
</style>
