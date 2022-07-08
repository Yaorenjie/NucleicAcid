<template>
	<view class="time-one">
		<view class="uni-title uni-common-pl">
			<view>工作时间段</view>
			<view @click="deleteCk">删除</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					起始时间
				</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="times.startAt"
						@change="bindTimeChange($event, 'start')">
						<view class="uni-input">{{times.startAt}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					结束时间
				</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="times.endAt"
						@change="bindTimeChange($event, 'end')">
						<view class="uni-input">{{times.endAt}}</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			times: {
				type: Object,
				default: () => {
					return {
						startAt: '',
						endAt: ''
					}
				}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			deleteCk() {
				this.$emit('bindTimeDelete', this.index)
			},
			bindTimeChange(e, key) {
				console.log(e.detail.value)
				this.times[key] = e.detail.value
				if (key === 'start') {
					this.$emit('bindTimeChange', {
						data: {
							startAt: e.detail.value + ':00',
							endAt: this.times.endAt
						},
						index: this.index
					})
				} else {
					if (!this.compareTime(this.times.startAt, e.detail.value + ':00')) {
						uni.showToast({
							title: '结束时间不能比起始时间大',
							icon: 'none',
							duration: 2000
						})
						this.times[key] = ''
						return
					}
						this.$emit('bindTimeChange', {
							data: {
								startAt: this.times.startAt,
								endAt: e.detail.value + ':00'
							},
							index: this.index
						})
				}
			},
			compareTime(time1, time2) {
			 if (this.time_to_sec(time2) - this.time_to_sec(time1) > 0) {
					return true;
				}
				return false;
			},
			time_to_sec(time) {
				if (time !== null) {
					var s = "";
					var hour = time.split(":")[0];
					var min = time.split(":")[1];
					var sec = time.split(":")[2];
					s = Number(hour * 3600) + Number(min * 60) + Number(sec);
					return s;
				}
			}
		}
	}
</script>

<style scoped>
	.time-one {
		padding-bottom: 20px;
	}

	.uni-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
