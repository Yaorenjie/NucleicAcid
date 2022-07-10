<template>
	<view class="time-one">
		<view class="row">
			<picker mode="time" :value="times.startAt"
				@change="bindTimeChange($event, 'start')">
				<view class="uni-input">{{times.startAt}}</view>
			</picker>
			<span>-</span>
			<picker mode="time" :value="times.endAt"
				@change="bindTimeChange($event, 'end')">
				<view class="uni-input">{{times.endAt}}</view>
			</picker>
		</view>
		<view class="card-actions-item" @click="deleteCk">
			<uni-icons type="trash" size="18" color="#666"></uni-icons>
			<text class="card-actions-item-text">删除</text>
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
				this.times[key] = e.detail.value
				if (key === 'start') {
					this.$emit('bindTimeChange', {
						data: {
							startAt: e.detail.value,
							endAt: this.times.endAt
						},
						index: this.index
					})
				} else {
					if (!this.compareTime(this.times.startAt, e.detail.value)) {
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
								endAt: e.detail.value
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
					s = Number(hour * 3600) + Number(min * 60);
					return s;
				}
			}
		}
	}
</script>

<style scoped>
	.row{
		display: flex;
		justify-content: space-between;
		align-items: center;
		span{
			padding: 0 20rpx;
		}
	}
	.card-actions-item{
		position: absolute;
		top: 8px;
		right: 20px;
		display: flex;
		align-items: center;
		color: #666666;
	}
	uni-picker{
		width: calc(50% - 40rpx);
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		margin: 20rpx 0;
		text-align: center;
	}
</style>
