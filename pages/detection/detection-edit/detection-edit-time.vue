<template>
	<view>
		<uni-section class="uni-section-detection" title="编辑工作时间" type="line">
			<view class="uni-edit-form">
				<uni-group mode="card" :title="'工作时段'+(index+1)" v-for="(item, index) in times" :key="index">
					<timeRegion :times="item" :index="index" @bindTimeChange="bindTimeChange"
						@bindTimeDelete="bindTimeDelete" />
				</uni-group>
				<button type="primary" @click="submit('valiForm')">提交</button>
			</view>
		</uni-section>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pattern="pattern" @fabClick="addOne" />
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
				times: [],
				pattern: {
					selectedColor: '#0260a2',
					buttonColor: '#0260a2',
				}
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
		},
		onShow() {
			for (let i in this.data.time) {
				this.times.push(this.data.time[i])
			}
			if (this.times.length === 0) {
				this.times = [{
					startAt: '',
					endAt: ''
				}]
			}
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
				if (this.addValidate()) return
				this.times.push({
					startAt: '',
					endAt: ''
				})
			},
			addValidate() {
				if (this.times.length === 0) return false
				if (this.times[this.times.length - 1].startAt === '' || this.times[this.times.length - 1].endAt === '') {
					uni.showToast({
						title: '起始时间和结束时间不能为空',
						icon: 'none',
						duration: 2000
					})
					return true
				}
				return false
			},
			submit() {
				if (this.id === '') {
					this.$store.commit("update_detectionData_time", this.times);
					this.cancel()
				} else  this.updateAjax()
			},
			async updateAjax() {
				const data = await this.$http.httpPut('/admin/point/' + this.id + '/', {
					...this.valiFormData
				})
				uni.showToast({
					title: '修改成功',
					icon: 'none',
					duration: 2000
				})
				this.$store.commit("update_detectionData_time", this.times);
				this.cancel()
			},
			cancel() {
				uni.navigateTo({
					url: '/pages/detection/detection-edit/detection-edit',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-group--card{
		position: relative;
		margin: 0;
	}
	uni-button{
		margin-top: 40rpx;
	}
</style>
